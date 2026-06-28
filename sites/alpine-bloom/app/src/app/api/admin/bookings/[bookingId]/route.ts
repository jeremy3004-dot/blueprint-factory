import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import { updateOpsBooking } from "@/lib/ops-client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const { bookingId } = await params;
  const updates = await request.json().catch(() => ({}));

  return NextResponse.json(updateOpsBooking(bookingId, updates));
}
