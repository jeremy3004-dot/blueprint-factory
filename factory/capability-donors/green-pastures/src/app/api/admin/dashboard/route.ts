import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { fetchOpsDashboard } from "@/lib/ops-client";

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

export async function GET() {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  try {
    return NextResponse.json(await fetchOpsDashboard());
  } catch (error) {
    console.error("Admin dashboard fetch failed", error);

    return NextResponse.json(
      { message: "The operations dashboard could not be loaded." },
      { status: 502 },
    );
  }
}
