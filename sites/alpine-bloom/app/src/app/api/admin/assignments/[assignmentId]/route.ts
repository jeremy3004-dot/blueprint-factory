import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import {
  opsBackendReadiness,
  opsSetupRequiredMessage,
  removeOpsGuideAssignment,
} from "@/lib/ops-client";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ assignmentId: string }> },
) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const { assignmentId } = await params;

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await removeOpsGuideAssignment(assignmentId));
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
