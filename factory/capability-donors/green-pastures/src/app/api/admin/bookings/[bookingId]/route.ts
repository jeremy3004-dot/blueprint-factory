import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { bookingSchema } from "@/lib/booking";
import { opsBackendReadiness, updateOpsBookingStatus } from "@/lib/ops-client";
import type { BookingRequestStatus, PipelineStage } from "@/lib/ops-types";

const bookingStatuses: BookingRequestStatus[] = [
  "new",
  "contacted",
  "proposal_sent",
  "confirmed",
  "lost",
];

const pipelineStages: PipelineStage[] = [
  "first_contact",
  "qualified",
  "proposal",
  "scheduled",
  "on_trek",
  "completed",
  "lost",
];

const bookingPatchSchema = bookingSchema.partial().extend({
  status: z.enum(bookingStatuses).optional(),
  pipelineStage: z.enum(pipelineStages).optional(),
});

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ bookingId: string }> },
) {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before changing booking status." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = bookingPatchSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "The booking update has missing or invalid fields.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ message: "No booking update was provided." }, { status: 400 });
  }

  try {
    const { bookingId } = await context.params;
    return NextResponse.json(await updateOpsBookingStatus(bookingId, parsed.data));
  } catch (error) {
    console.error("Admin booking status update failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "The booking status could not be updated.",
      },
      { status: 502 },
    );
  }
}
