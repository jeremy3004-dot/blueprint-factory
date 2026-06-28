import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { bookingSchema } from "@/lib/booking";
import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { createAdminOpsBooking, opsBackendReadiness } from "@/lib/ops-client";

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
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before creating bookings." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "The booking draft has missing or invalid fields.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(await createAdminOpsBooking(parsed.data), { status: 201 });
  } catch (error) {
    console.error("Admin booking creation failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "The booking could not be created.",
      },
      { status: 502 },
    );
  }
}
