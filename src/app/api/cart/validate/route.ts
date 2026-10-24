import { NextRequest, NextResponse } from "next/server";
import { calculateOrderTotals } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, couponCode } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items payload" }, { status: 400 });
    }

    const result = calculateOrderTotals(items, couponCode);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error validating cart";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
