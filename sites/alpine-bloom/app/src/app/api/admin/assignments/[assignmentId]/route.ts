import { NextResponse } from "next/server";

import { removeOpsGuideAssignment } from "@/lib/ops-client";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ assignmentId: string }> },
) {
  const { assignmentId } = await params;

  return NextResponse.json(removeOpsGuideAssignment(assignmentId));
}
