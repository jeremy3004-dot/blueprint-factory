import { NextResponse } from "next/server";

import { assignOpsGuideToTrip } from "@/lib/ops-client";

export async function POST(request: Request) {
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

  return NextResponse.json(assignOpsGuideToTrip(tripId, guideId));
}
