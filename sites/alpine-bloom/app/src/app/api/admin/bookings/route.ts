import { NextResponse } from "next/server";

import { validateBookingPayload } from "@/lib/booking";
import { createOpsBooking } from "@/lib/ops-client";

export async function POST(request: Request) {
  const parsed = validateBookingPayload(await request.json().catch(() => null));

  if (!parsed.ok) {
    return NextResponse.json(
      {
        message: "The booking draft has missing or invalid fields.",
        issues: parsed.issues,
      },
      { status: 400 },
    );
  }

  return NextResponse.json(createOpsBooking(parsed.values, "admin"), { status: 201 });
}
