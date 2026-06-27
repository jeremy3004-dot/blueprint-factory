import { NextResponse } from "next/server";

import { validateBookingPayload } from "@/lib/booking";
import { createOpsBooking } from "@/lib/ops-client";

export async function POST(request: Request) {
  const parsed = validateBookingPayload(await request.json().catch(() => null));

  if (!parsed.ok) {
    return NextResponse.json(
      {
        accepted: false,
        stored: false,
        provider: "demo",
        message: "Some proposal fields need attention before Alpine Bloom can shape the trip.",
        issues: parsed.issues,
      },
      { status: 400 },
    );
  }

  const dashboard = createOpsBooking(parsed.values, "web");
  const booking = dashboard.bookings[0];

  return NextResponse.json({
    accepted: true,
    stored: false,
    bookingId: booking?.id,
    provider: "demo",
    message:
      "Proposal captured in Alpine Bloom preview mode. A connected ops backend can store this request and notify the team.",
  });
}
