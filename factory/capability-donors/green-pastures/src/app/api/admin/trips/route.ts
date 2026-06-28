import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { createOpsTripFromBooking, opsBackendReadiness } from "@/lib/ops-client";

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
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before creating trips." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const bookingId =
    payload && typeof payload === "object" && typeof payload.bookingId === "string"
      ? payload.bookingId
      : "";

  if (!bookingId) {
    return NextResponse.json({ message: "bookingId is required." }, { status: 400 });
  }

  try {
    return NextResponse.json(await createOpsTripFromBooking(bookingId));
  } catch (error) {
    console.error("Admin trip creation failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "The trip could not be created.",
      },
      { status: 502 },
    );
  }
}
