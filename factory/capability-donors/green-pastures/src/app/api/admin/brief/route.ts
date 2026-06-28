import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { generateOpsBrief } from "@/lib/ops-ai";
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
    const dashboard = await fetchOpsDashboard();

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      brief: generateOpsBrief(dashboard),
    });
  } catch (error) {
    console.error("Admin brief generation failed", error);

    return NextResponse.json(
      { message: "The operations brief could not be generated." },
      { status: 502 },
    );
  }
}
