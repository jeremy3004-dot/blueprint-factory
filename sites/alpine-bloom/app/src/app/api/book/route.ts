import { NextResponse } from "next/server";

import { validateBookingPayload } from "@/lib/booking";
import { createPublicOpsBooking } from "@/lib/ops-client";

export async function POST(request: Request) {
  const parsed = validateBookingPayload(await request.json().catch(() => null));

  if (!parsed.ok) {
    return NextResponse.json(
      {
        accepted: false,
        stored: false,
        provider: "preview",
        message: "Some proposal fields need attention before Alpine Bloom can shape the trip.",
        issues: parsed.issues,
      },
      { status: 400 },
    );
  }

  const result = await createPublicOpsBooking(parsed.values, request);

  return NextResponse.json(result, { status: result.accepted ? 200 : 503 });
}
