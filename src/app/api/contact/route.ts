import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json(db.getMessages());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: "Please fill in all required message fields." }, { status: 400 });
    }

    const saved = db.createMessage({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json({ success: true, messageId: saved.id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to submit enquiry";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
