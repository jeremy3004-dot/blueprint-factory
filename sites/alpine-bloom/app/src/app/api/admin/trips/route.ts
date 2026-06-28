import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import { createOpsTripFromBooking } from "@/lib/ops-client";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const payload = await request.json().catch(() => null);
  const bookingId =
    payload && typeof payload === "object" && "bookingId" in payload
      ? String((payload as { bookingId: unknown }).bookingId)
      : "";

  return NextResponse.json(createOpsTripFromBooking(bookingId));
}
