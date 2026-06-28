import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import { removeOpsGuideAssignment } from "@/lib/ops-client";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ assignmentId: string }> },
) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const { assignmentId } = await params;

  return NextResponse.json(removeOpsGuideAssignment(assignmentId));
}
