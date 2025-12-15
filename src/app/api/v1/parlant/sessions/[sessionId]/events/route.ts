import { type NextRequest, NextResponse } from "next/server";
import { getParlantClient } from "@/lib/parlant-client";

/**
 * Parlant event structure as returned by the SDK
 * Note: The Parlant SDK types are incomplete, so we define our own interface
 */
type ParlantEvent = {
  id: string;
  offset: number;
  kind: string;
  source?: string;
  data?: {
    message?: string;
    status?: string;
    participant?: string;
  };
  creation_utc?: string;
  createdAt?: string;
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 messages/polls per minute

function checkRateLimit(ip: string): {
  allowed: boolean;
  waitSeconds?: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const waitSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  record.count += 1;
  return { allowed: true };
}

/**
 * POST /api/v1/parlant/sessions/[sessionId]/events
 * Send a customer message to the Parlant session
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded", code: "RATE_LIMIT" },
        { status: 429 }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON body",
          message: "Request body must be valid JSON",
        },
        { status: 400 }
      );
    }
    const { message } = (body ?? {}) as { message?: unknown };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        {
          error: "Message is required",
          message: "Message must be a non-empty string",
        },
        { status: 400 }
      );
    }

    // Basic input sanitization - strip potentially harmful content
    const sanitizedMessage = message.trim().slice(0, 2000); // Max 2000 characters

    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        {
          error: "Message is required",
          message: "Message cannot be empty",
        },
        { status: 400 }
      );
    }

    // Initialize Parlant client
    const client = getParlantClient();

    // Create message event
    await client.sessions.createEvent(sessionId, {
      kind: "message",
      source: "customer",
      message: sanitizedMessage,
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Parlant message send error:", error);

    return NextResponse.json(
      {
        error: "Failed to send message",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/v1/parlant/sessions/[sessionId]/events
 * Poll for new events in the Parlant session (long polling)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded", code: "RATE_LIMIT" },
        { status: 429 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const minOffset = Number.parseInt(searchParams.get("minOffset") || "0", 10);
    const waitForData = Number.parseInt(
      searchParams.get("waitForData") || "30",
      10
    );

    // Initialize Parlant client
    const client = getParlantClient();

    // Poll for events with long polling
    // CRITICAL: Don't pass 'kinds' parameter - it causes the SDK to filter out message events
    console.log(
      `[PARLANT-DEBUG] Fetching events with minOffset=${minOffset}, waitForData=${waitForData}`
    );

    const events = await client.sessions.listEvents(sessionId, {
      minOffset,
      waitForData: Math.min(waitForData, 30), // Max 30 seconds
      // DON'T pass kinds parameter - let it default to all event types
    });

    // Transform events to match expected format
    // Cast to ParlantEvent[] since SDK types are incomplete
    const parlantEvents = events as unknown as ParlantEvent[];
    const transformedEvents = parlantEvents.map((event) => ({
      id: event.id,
      offset: event.offset,
      kind: event.kind,
      source: event.source,
      message: event.data?.message,
      status: event.data?.status,
      participant: event.data?.participant,
      createdAt: event.creation_utc || event.createdAt,
    }));

    console.log(
      `[PARLANT-DEBUG] Returning ${transformedEvents.length} events:`,
      JSON.stringify(transformedEvents, null, 2)
    );

    return NextResponse.json({
      events: transformedEvents,
      count: transformedEvents.length,
    });
  } catch (error) {
    console.error("Parlant event polling error:", error);

    const statusCode =
      typeof error === "object" && error !== null && "statusCode" in error
        ? Number((error as { statusCode?: number }).statusCode)
        : undefined;
    const message = error instanceof Error ? error.message : "";

    // Handle gateway timeout responses gracefully
    if (statusCode === 504 || message.includes("GatewayTimeout")) {
      return NextResponse.json(
        {
          events: [],
          count: 0,
          timeout: true,
        },
        { status: 200, headers: { "X-Parlant-Timeout": "1" } }
      );
    }

    // Handle generic timeout wording (defensive)
    if (message.toLowerCase().includes("timeout")) {
      return NextResponse.json(
        {
          events: [],
          count: 0,
          timeout: true,
        },
        { status: 200, headers: { "X-Parlant-Timeout": "1" } }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to poll events",
        message: message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
