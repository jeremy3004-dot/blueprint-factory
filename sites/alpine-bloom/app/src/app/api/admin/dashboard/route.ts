import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import { fetchOpsDashboard } from "@/lib/ops-client";

export async function GET() {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  return NextResponse.json(await fetchOpsDashboard());
}
