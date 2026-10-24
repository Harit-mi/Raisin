import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateOrderTotals } from "@/lib/pricing";

export async function GET() {
  const orders = db.getOrders();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, couponCode, paymentMethod, paymentStatus, razorpayOrderId, razorpayPaymentId } = body;

    // Validate customer fields
    if (!customer || !customer.fullName || !customer.email || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      return NextResponse.json({ error: "Missing required shipping details." }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your shopping bag is empty." }, { status: 400 });
    }

    // Server-side price calculation — strictly prevent price tampering
    const calculation = calculateOrderTotals(items, couponCode);
    if (calculation.errors.length > 0 && calculation.items.length === 0) {
      return NextResponse.json({ error: calculation.errors.join(", ") }, { status: 400 });
    }

    // Determine estimated delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const estimatedDelivery = deliveryDate.toISOString().split("T")[0];

    const newOrder = db.createOrder({
      customer,
      items: calculation.items,
      subtotal: calculation.subtotal,
      discount: calculation.discount,
      couponCode: calculation.couponCode,
      shippingFee: calculation.shippingFee,
      tax: calculation.tax,
      total: calculation.total,
      paymentMethod: paymentMethod || "UPI",
      paymentStatus: paymentStatus || (paymentMethod === "Cash on Delivery" ? "Pending" : "Paid"),
      razorpayOrderId,
      razorpayPaymentId,
      orderStatus: paymentStatus === "Paid" ? "Payment Confirmed" : "Order Placed",
      estimatedDelivery,
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
