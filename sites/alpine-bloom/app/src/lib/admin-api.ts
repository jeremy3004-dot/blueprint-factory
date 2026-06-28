import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";

export async function requireAdminApiAccess() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  return null;
}
