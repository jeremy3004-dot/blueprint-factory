import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import { opsBackendReadiness, removeOpsGuideAssignment } from "@/lib/ops-client";

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ assignmentId: string }> },
) {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: "Connect OPS_API_URL and OPS_API_TOKEN before removing assignments." },
      { status: 503 },
    );
  }

  try {
    const { assignmentId } = await context.params;
    return NextResponse.json(await removeOpsGuideAssignment(assignmentId));
  } catch (error) {
    console.error("Admin assignment removal failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "The guide assignment could not be removed.",
      },
      { status: 502 },
    );
  }
}
