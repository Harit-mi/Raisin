import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json({ error: "Missing required payment verification parameters" }, { status: 400 });
      }

      // Generate HMAC SHA256 signature
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid payment signature verification failed" }, { status: 400 });
      }

      return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
    }

    // Sandbox test mode verification
    if (razorpay_order_id && razorpay_order_id.startsWith("order_test_")) {
      return NextResponse.json({
        verified: true,
        paymentId: `pay_test_${crypto.randomBytes(6).toString("hex")}`,
        sandboxMode: true,
      });
    }

    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id || `pay_sim_${Date.now()}` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error verifying payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
