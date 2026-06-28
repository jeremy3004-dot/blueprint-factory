import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { opsBackendReadiness, updateOpsGuide } from "@/lib/ops-client";

const guidePatchSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  gender: z.string().optional(),
  regions: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  active: z.boolean().default(true),
});

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ guideId: string }> },
) {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before updating guides." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = guidePatchSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "The guide update has missing or invalid fields.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const { guideId } = await context.params;
    return NextResponse.json(await updateOpsGuide(guideId, parsed.data));
  } catch (error) {
    console.error("Admin guide update failed", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "The guide could not be updated.",
      },
      { status: 502 },
    );
  }
}
