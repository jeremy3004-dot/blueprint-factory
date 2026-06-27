import { NextResponse } from "next/server";

import { createOpsGuide } from "@/lib/ops-client";

function splitList(value: unknown) {
  return String(value ?? "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
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
  };
  const name = String(values.name ?? "").trim();
  const role = String(values.role ?? "").trim();

  if (!name || !role) {
    return NextResponse.json({ message: "Guide name and role are required." }, { status: 400 });
  }

  return NextResponse.json(createOpsGuide({
    name,
    role,
    regions: Array.isArray(values.regions) ? values.regions.map(String) : splitList(values.regions),
    languages: Array.isArray(values.languages) ? values.languages.map(String) : splitList(values.languages),
    active: values.active !== false,
  }), { status: 201 });
}
