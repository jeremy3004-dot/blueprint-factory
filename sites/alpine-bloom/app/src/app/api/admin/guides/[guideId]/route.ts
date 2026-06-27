import { NextResponse } from "next/server";

import { updateOpsGuide } from "@/lib/ops-client";

function splitList(value: unknown) {
  return String(value ?? "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ guideId: string }> },
) {
  const { guideId } = await params;
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Guide update is required." }, { status: 400 });
  }

  const values = payload as {
    active?: unknown;
    languages?: unknown;
    name?: unknown;
    regions?: unknown;
    role?: unknown;
  };

  return NextResponse.json(updateOpsGuide(guideId, {
    active: typeof values.active === "boolean" ? values.active : undefined,
    languages: values.languages === undefined
      ? undefined
      : Array.isArray(values.languages)
        ? values.languages.map(String)
        : splitList(values.languages),
    name: values.name === undefined ? undefined : String(values.name).trim(),
    regions: values.regions === undefined
      ? undefined
      : Array.isArray(values.regions)
        ? values.regions.map(String)
        : splitList(values.regions),
    role: values.role === undefined ? undefined : String(values.role).trim(),
  }));
}
