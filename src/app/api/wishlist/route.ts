import { NextResponse } from "next/server";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

type WishlistRequest = {
  name: string;
  email: string;
  turnstileToken: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WishlistRequest;
    const { name, email, turnstileToken } = body;

    // Validate required fields
    if (!(name?.trim() && email?.trim())) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { success: false, error: "Turnstile token is required" },
        { status: 400 }
      );
    }

    // Verify Turnstile token with Cloudflare
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
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
        { success: false, error: "Security verification failed" },
        { status: 403 }
      );
    }

    // Forward to Google Sheets
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
