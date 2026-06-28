import OpenAI from "openai";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { trekRoutes } from "@/data/treks";
import { getAdminIdentityFromHeaders } from "@/lib/admin-auth";
import {
  ANTHROPIC_API_VERSION,
  DEFAULT_OPENAI_MODEL,
  resolveConciergeProvider,
} from "@/lib/concierge-provider";

const draftRequestSchema = z.object({
  mode: z.enum(["booking", "guide"]),
  text: z.string().min(2).max(4_000),
});

const bookingDraftSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  departureWindow: z.string().optional(),
  routeSlug: z.string().optional(),
  groupSize: z.string().optional(),
  style: z.string().optional(),
  addons: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const guideDraftSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  gender: z.string().optional(),
  regions: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
});

async function requireAdmin() {
  const identity = await getAdminIdentityFromHeaders(await headers());

  if (!identity) {
    return null;
  }

  return identity;
}

function systemPrompt(mode: "booking" | "guide") {
  const routeCatalog = trekRoutes.map((route) => `${route.slug}: ${route.name}`).join("\n");

  return [
    "You extract structured operations drafts for a Nepal trekking admin backend.",
    "Return only valid JSON. Do not include markdown or explanation.",
    "Use empty strings or empty arrays when the note does not contain a value.",
    "Never invent contact details, dates, or certifications.",
    mode === "booking"
      ? `Booking JSON keys: fullName, email, departureWindow, routeSlug, groupSize, style, addons, notes.\nRoute catalog:\n${routeCatalog}`
      : "Guide JSON keys: name, role, gender, regions, languages, certifications.",
  ].join("\n");
}

function parseJsonObject(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const jsonText = fenced ?? trimmed.match(/\{[\s\S]*\}/)?.[0] ?? trimmed;

  return JSON.parse(jsonText) as unknown;
}

async function generateDraft(mode: "booking" | "guide", text: string) {
  const provider = resolveConciergeProvider();

  if (!provider.connected || !provider.provider || !provider.apiKey) {
    return null;
  }

  if (provider.provider === "openai") {
    const openai = new OpenAI({ apiKey: provider.apiKey });
    const response = await openai.responses.create({
      model: provider.model ?? DEFAULT_OPENAI_MODEL,
      instructions: systemPrompt(mode),
      input: text,
      max_output_tokens: 700,
      text: {
        format: {
          type: "text",
        },
      },
    });

    return parseJsonObject(response.output_text ?? "{}");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": provider.apiKey,
      "anthropic-version": ANTHROPIC_API_VERSION,
    },
    body: JSON.stringify({
      model: provider.model,
      max_tokens: 700,
      system: systemPrompt(mode),
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Draft model request failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const output =
    payload.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("\n") ?? "{}";

  return parseJsonObject(output);
}

export async function POST(request: Request) {
  const identity = await requireAdmin();

  if (!identity) {
    return NextResponse.json({ message: "Admin access required." }, { status: 401 });
  }

  const parsed = draftRequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ message: "Draft notes are required." }, { status: 400 });
  }

  try {
    const draft = await generateDraft(parsed.data.mode, parsed.data.text);

    if (!draft) {
      return NextResponse.json({ draft: null, provider: "local" });
    }

    const draftSchema = parsed.data.mode === "booking" ? bookingDraftSchema : guideDraftSchema;
    const checked = draftSchema.safeParse(draft);

    if (!checked.success) {
      return NextResponse.json({ draft: null, provider: "local" });
    }

    return NextResponse.json({ draft: checked.data, provider: "model" });
  } catch (error) {
    console.error("Admin draft assist failed", error);

    return NextResponse.json({ draft: null, provider: "local" });
  }
}
