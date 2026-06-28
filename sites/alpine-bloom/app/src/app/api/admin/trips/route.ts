import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import {
  createOpsTripFromBooking,
  opsBackendReadiness,
  opsSetupRequiredMessage,
} from "@/lib/ops-client";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const payload = await request.json().catch(() => null);
  const bookingId =
    payload && typeof payload === "object" && "bookingId" in payload
      ? String((payload as { bookingId: unknown }).bookingId)
      : "";

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await createOpsTripFromBooking(bookingId));
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
