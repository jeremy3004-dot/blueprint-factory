import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import { opsBackendReadiness, opsSetupRequiredMessage, updateOpsGuide } from "@/lib/ops-client";

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
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

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
    certifications?: unknown;
  };

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(await updateOpsGuide(guideId, {
      active: typeof values.active === "boolean" ? values.active : undefined,
      certifications: values.certifications === undefined
        ? undefined
        : Array.isArray(values.certifications)
          ? values.certifications.map(String)
          : splitList(values.certifications),
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
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
