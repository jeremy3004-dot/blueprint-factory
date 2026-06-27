import { NextResponse } from "next/server";

import { updateOpsBooking } from "@/lib/ops-client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const { bookingId } = await params;
  const updates = await request.json().catch(() => ({}));

  return NextResponse.json(updateOpsBooking(bookingId, updates));
}
