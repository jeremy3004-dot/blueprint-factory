import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import { generateOpsBrief } from "@/lib/ops-ai";
import { fetchOpsDashboard } from "@/lib/ops-client";

export async function GET() {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  try {
    const dashboard = await fetchOpsDashboard();

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      brief: generateOpsBrief(dashboard),
    });
  } catch (error) {
    console.error("Admin brief generation failed", error);

    return NextResponse.json(
      { message: "The Alpine Bloom operations brief could not be generated." },
      { status: 502 },
    );
  }
}
