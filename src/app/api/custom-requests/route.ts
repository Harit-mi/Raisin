import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const requests = db.getCustomRequests();
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      email,
      phone,
      productType,
      preferredSize,
      shape,
      primaryColor,
      secondaryColor,
      metallicAccents,
      designStyle,
      personalizationText,
      occasion,
      quantity,
      budgetRange,
      requiredDeliveryDate,
      inspirationImageUrl,
      additionalInstructions,
      estimatedPrice,
    } = body;

    if (!customerName || !email || !phone || !productType) {
      return NextResponse.json({ error: "Please fill in all required contact and product fields." }, { status: 400 });
    }

    const created = db.createCustomRequest({
      customerName,
      email,
      phone,
      productType,
      preferredSize: preferredSize || "Standard Custom",
      shape: shape || "Custom Shape",
      primaryColor: primaryColor || "Custom Hue",
      secondaryColor: secondaryColor || "None",
      metallicAccents: metallicAccents || "Champagne Gold",
      designStyle: designStyle || "Organic Swirl",
      personalizationText,
      occasion: occasion || "Personal Decor",
      quantity: Number(quantity) || 1,
      budgetRange: budgetRange || "Not Specified",
      requiredDeliveryDate: requiredDeliveryDate || "Flexible",
      inspirationImageUrl,
      additionalInstructions,
      estimatedPrice: Number(estimatedPrice) || 5000,
    });

    return NextResponse.json({ success: true, request: created });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit custom studio request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminQuotePrice, adminNotes } = body;
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const updated = db.updateCustomRequest(id, { status, adminQuotePrice, adminNotes });
    if (!updated) return NextResponse.json({ error: "Request not found" }, { status: 404 });

    return NextResponse.json({ success: true, request: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update custom request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
