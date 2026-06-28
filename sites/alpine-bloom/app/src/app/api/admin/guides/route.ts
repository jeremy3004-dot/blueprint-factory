import { NextResponse } from "next/server";

import { adminOpsUnavailable, requireAdminApiAccess } from "@/lib/admin-api";
import { createOpsGuide, opsBackendReadiness, opsSetupRequiredMessage } from "@/lib/ops-client";
import { isWomenOnlyGuideText } from "@/lib/ops-ai";

function splitList(value: unknown) {
  return String(value ?? "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Guide profile is required." }, { status: 400 });
  }

  const values = payload as {
    active?: unknown;
    languages?: unknown;
    name?: unknown;
    regions?: unknown;
    role?: unknown;
    certifications?: unknown;
  };
  const name = String(values.name ?? "").trim();
  const role = String(values.role ?? "").trim();
  const regions = Array.isArray(values.regions) ? values.regions.map(String) : splitList(values.regions);
  const languages = Array.isArray(values.languages) ? values.languages.map(String) : splitList(values.languages);
  const certifications = Array.isArray(values.certifications)
    ? values.certifications.map(String)
    : splitList(values.certifications).length
      ? splitList(values.certifications)
      : ["Licensed women trekking guide"];

  if (!name || !role) {
    return NextResponse.json({ message: "Guide name and role are required." }, { status: 400 });
  }

  if (![role, ...regions, ...languages, ...certifications].every(isWomenOnlyGuideText)) {
    return NextResponse.json(
      { message: "Alpine Bloom guide profiles must be women guides only." },
      { status: 400 },
    );
  }

  if (!opsBackendReadiness.connected) {
    return NextResponse.json(
      { message: opsSetupRequiredMessage(), readiness: opsBackendReadiness },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json(
      await createOpsGuide({
        name,
        role,
        regions,
        languages,
        certifications,
        active: values.active !== false,
      }),
      { status: 201 },
    );
  } catch (error) {
    return adminOpsUnavailable(error);
  }
}
