import { NextResponse } from "next/server";

import { bookingSchema } from "@/lib/booking";
import {
  createOpsBooking,
  opsBackendReadiness,
} from "@/lib/ops-client";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        accepted: false,
        stored: false,
        provider: "preview",
        message: "The proposal form has missing or invalid fields.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json({
      accepted: true,
      stored: false,
      provider: "preview",
      message:
        "Proposal captured in preview mode. Connect OPS_API_URL and OPS_API_TOKEN to send team email and save this request to the Cloudflare operations desk.",
    });
  }

  try {
    const result = await createOpsBooking(parsed.data, request);

    if (result) {
      return NextResponse.json(result, {
        status: result.stored ? 200 : 202,
      });
    }
  } catch (error) {
    console.error("Cloudflare ops booking handoff failed", error);
  }

  return NextResponse.json(
    {
      accepted: true,
      stored: false,
      provider: "preview",
      message:
        "The proposal was prepared, but the operations desk could not accept it just now. Please contact the team directly so we can hold your dates.",
    },
    { status: 202 },
  );
}
