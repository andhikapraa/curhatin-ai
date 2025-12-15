import { type NextRequest, NextResponse } from "next/server";
import type { SupportedLanguage } from "@/components/chatbot/system-prompts";
import {
  getAgentId,
  getParlantClient,
  type ParlantClient,
} from "@/lib/parlant-client";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 sessions per minute

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
 * POST /api/v1/parlant/sessions
 * Create a new Parlant session with the appropriate agent based on language
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Please wait ${rateLimitResult.waitSeconds} seconds before trying again.`,
          code: "RATE_LIMIT",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.waitSeconds),
          },
        }
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

    const { language, turnstileToken, customerId, title } = (body ?? {}) as {
      language?: string;
      turnstileToken?: string;
      customerId?: string;
      title?: string;
    };

    // Validate Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        {
          error: "Security token required",
          message: "Turnstile token is required for session creation",
        },
        { status: 400 }
      );
    }

    // Verify Turnstile token with Cloudflare
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY not configured");
      return NextResponse.json(
        {
          error: "Configuration error",
          message: "Server security configuration error",
        },
        { status: 500 }
      );
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult =
      (await turnstileResponse.json()) as TurnstileVerifyResponse;

    if (!turnstileResult.success) {
      console.error("Turnstile verification failed:", turnstileResult);
      return NextResponse.json(
        {
          error: "Security verification failed",
          message: "Please refresh and try again",
          code: "TURNSTILE_FAILED",
        },
        { status: 403 }
      );
    }

    // Validate language
    if (!language || (language !== "id" && language !== "en")) {
      return NextResponse.json(
        {
          error: "Invalid language",
          message: 'Language must be "id" or "en"',
        },
        { status: 400 }
      );
    }

    // Get agent ID based on language
    let agentId: string;
    try {
      agentId = getAgentId(language as SupportedLanguage);
      console.log(`Using agent ID for language ${language}: ${agentId}`);
    } catch (error) {
      console.error("Failed to get agent ID:", error);
      return NextResponse.json(
        {
          error: "Configuration error",
          message:
            error instanceof Error
              ? error.message
              : "Agent ID not configured for this language",
        },
        { status: 500 }
      );
    }

    // Initialize Parlant client
    let client: ParlantClient | undefined;
    try {
      client = getParlantClient();
      const serverUrl =
        process.env.PARLANT_SERVER_URL ||
        process.env.NEXT_PUBLIC_PARLANT_SERVER_URL;
      console.log(`Initializing Parlant client with server: ${serverUrl}`);
    } catch (error) {
      console.error("Failed to initialize Parlant client:", error);
      return NextResponse.json(
        {
          error: "Configuration error",
          message:
            error instanceof Error
              ? error.message
              : "Parlant server URL not configured",
        },
        { status: 500 }
      );
    }

    // Create session
    try {
      console.log(`Creating Parlant session with agentId: ${agentId}`);
      const session = await client.sessions.create({
        agentId,
        customerId: customerId || undefined,
        title:
          title || `Curhatin Chat Session - ${new Date().toLocaleString()}`,
      });

      console.log(`Session created successfully: ${session.id}`);

      // Return session details
      const sessionResponse: {
        sessionId: string;
        agentId: string;
        customerId: string | null;
        createdAt?: string;
      } = {
        sessionId: session.id,
        agentId: session.agentId,
        customerId: session.customerId,
      };
      if ("createdAt" in session && session.createdAt) {
        sessionResponse.createdAt = session.createdAt as string;
      }
      return NextResponse.json(sessionResponse);
    } catch (error) {
      console.error("Parlant API error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        agentId,
        serverUrl:
          process.env.PARLANT_SERVER_URL ||
          process.env.NEXT_PUBLIC_PARLANT_SERVER_URL,
      });

      return NextResponse.json(
        {
          error: "Failed to create session",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error occurred while connecting to Parlant server",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in Parlant session creation:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : undefined
    );

    return NextResponse.json(
      {
        error: "Failed to create session",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
