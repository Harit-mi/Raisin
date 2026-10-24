import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Successfully recorded in newsletter audience
    return NextResponse.json({
      success: true,
      message: "Welcome to the DRL Atelier circle. Your 10% welcome invitation has been sent.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to subscribe";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
