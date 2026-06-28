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

export function adminOpsUnavailable(error: unknown) {
  const detail = error instanceof Error ? error.message : "Ops backend request failed.";

  return NextResponse.json(
    {
      message: "Ops backend is unavailable. Admin changes were not saved.",
      detail,
    },
    { status: 503 },
  );
}
