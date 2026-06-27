import { NextResponse } from "next/server";

import { fetchOpsDashboard } from "@/lib/ops-client";

export async function POST() {
  const dashboard = fetchOpsDashboard();

  return NextResponse.json(
    {
      ...dashboard,
      message: "Guide creation is preview-only in this demo slice. Connect storage before persisting roster changes.",
    },
    { status: 202 },
  );
}
