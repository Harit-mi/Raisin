import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { calculateOrderTotals } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, couponCode } = body;

    const calculation = calculateOrderTotals(items, couponCode);
    if (calculation.total <= 0) {
      return NextResponse.json({ error: "Invalid total amount for payment" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Amount in Indian paise
    const amountInPaise = Math.round(calculation.total * 100);

    if (keyId && keySecret) {
      // Real Razorpay API call
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `drl_rcpt_${Date.now()}`,
          payment_capture: 1,
        }),
      });

      if (!rzpResponse.ok) {
        const errorData = await rzpResponse.json();
        return NextResponse.json({ error: errorData.error?.description || "Razorpay order creation failed" }, { status: 502 });
      }

      const rzpOrder = await rzpResponse.json();
      return NextResponse.json({
        isLiveGateway: true,
        keyId,
        orderId: rzpOrder.id,
        amount: calculation.total,
        currency: "INR",
      });
    }

    // Test / Demo Environment (when keys are not yet added to .env.local)
    const testOrderId = `order_test_${crypto.randomBytes(6).toString("hex")}`;
    return NextResponse.json({
      isLiveGateway: false,
      message: "Running in Sandbox Test Mode. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local for live processing.",
      orderId: testOrderId,
      amount: calculation.total,
      currency: "INR",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error initializing payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
