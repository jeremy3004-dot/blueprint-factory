import { NextResponse } from "next/server";

import { fetchOpsDashboard } from "@/lib/ops-client";

export function GET() {
  return NextResponse.json(fetchOpsDashboard());
}
