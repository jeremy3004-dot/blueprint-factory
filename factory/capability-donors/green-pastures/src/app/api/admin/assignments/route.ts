import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { assignOpsGuideToTrip, opsBackendReadiness } from "@/lib/ops-client";

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

export async function POST(request: Request) {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before assigning guides." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const tripId =
    payload && typeof payload === "object" && typeof payload.tripId === "string"
      ? payload.tripId
      : "";
  const guideId =
    payload && typeof payload === "object" && typeof payload.guideId === "string"
      ? payload.guideId
      : "";

  if (!tripId || !guideId) {
    return NextResponse.json(
      { message: "tripId and guideId are required." },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(await assignOpsGuideToTrip(tripId, guideId));
  } catch (error) {
    console.error("Admin guide assignment failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "The guide could not be assigned.",
      },
      { status: 502 },
    );
  }
}
