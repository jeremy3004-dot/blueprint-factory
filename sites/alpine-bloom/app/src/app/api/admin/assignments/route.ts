import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import {
  assignOpsGuideToTrip,
  opsBackendReadiness,
  opsSetupRequiredMessage,
} from "@/lib/ops-client";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const payload = await request.json().catch(() => null);
  const tripId =
    payload && typeof payload === "object" && typeof (payload as { tripId?: unknown }).tripId === "string"
      ? (payload as { tripId: string }).tripId
      : "";
  const guideId =
    payload && typeof payload === "object" && typeof (payload as { guideId?: unknown }).guideId === "string"
      ? (payload as { guideId: string }).guideId
      : "";

  if (!tripId || !guideId) {
    return NextResponse.json({ message: "tripId and guideId are required." }, { status: 400 });
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await assignOpsGuideToTrip(tripId, guideId));
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
