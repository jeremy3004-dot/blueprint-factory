import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import { opsBackendReadiness, opsSetupRequiredMessage, updateOpsBooking } from "@/lib/ops-client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const { bookingId } = await params;
  const updates = await request.json().catch(() => ({}));

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await updateOpsBooking(bookingId, updates));
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
