import { NextResponse } from "next/server";

import { validateBookingPayload } from "@/lib/booking";
import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import {
  createAdminOpsBooking,
  opsBackendReadiness,
  opsSetupRequiredMessage,
} from "@/lib/ops-client";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

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

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await createAdminOpsBooking(parsed.values), { status: 201 });
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
