import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const bookings = db.getBookings();
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      projectType,
      preferredDate,
      preferredTimeSlot,
      budgetRange,
      projectDescription,
      referenceImageUrl,
      preferredContactMethod,
    } = body;

    if (!fullName || !email || !phone || !preferredDate || !preferredTimeSlot || !projectDescription) {
      return NextResponse.json(
        { error: "Please provide your name, contact details, date, time slot, and project description." },
        { status: 400 }
      );
    }

    const result = db.createBooking({
      fullName,
      email,
      phone,
      projectType: projectType || "Custom Resin Project",
      preferredDate,
      preferredTimeSlot,
      budgetRange: budgetRange || "Open Discussion",
      projectDescription,
      referenceImageUrl,
      preferredContactMethod: preferredContactMethod || "Video Call (Google Meet)",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, booking: result.booking });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to book consultation";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const updated = db.updateBookingStatus(id, status, adminNotes);
    if (!updated) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update booking";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
