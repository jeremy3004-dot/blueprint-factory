import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/lib/admin-api";
import {
  type AssistedBookingDraft,
  type AssistedGuideDraft,
  inferBookingDraft,
  inferGuideDraft,
  isWomenOnlyGuideText,
  sanitizeWomenGuideText,
  validRouteSlug,
} from "@/lib/ops-ai";

type DraftMode = "booking" | "guide";

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-5.4-mini";
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";
const ANTHROPIC_VERSION = "2023-06-01";

function parseRequest(payload: unknown): { mode: DraftMode; text: string } | null {
  if (!payload || typeof payload !== "object") return null;

  const values = payload as { mode?: unknown; text?: unknown };
  const mode = values.mode === "booking" || values.mode === "guide" ? values.mode : null;
  const text = typeof values.text === "string" ? values.text.trim() : "";

  if (!mode || text.length < 2 || text.length > 4_000) return null;

  return { mode, text };
}

function systemPrompt(mode: DraftMode) {
  return [
    "Extract structured operations drafts for Alpine Bloom, a women-only Himalayan trekking agency.",
    "Return only valid JSON. Do not include markdown or explanation.",
    "Never invent contact details, dates, or certifications.",
    "All travelers are women. All guides must be women or Nepali women guides.",
    mode === "booking"
      ? "Booking JSON keys: fullName, email, departureWindow, routeSlug, groupSize, style, addons, notes."
      : "Guide JSON keys: name, role, regions, languages, certifications. Do not return gender.",
  ].join("\n");
}

function parseJsonObject(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const jsonText = fenced ?? trimmed.match(/\{[\s\S]*\}/)?.[0] ?? trimmed;

  return JSON.parse(jsonText) as unknown;
}

function cleanBookingDraft(value: unknown): AssistedBookingDraft | null {
  if (!value || typeof value !== "object") return null;

  const draft = value as Record<string, unknown>;
  return {
    fullName: typeof draft.fullName === "string" ? draft.fullName : "",
    email: typeof draft.email === "string" ? draft.email : "",
    departureWindow: typeof draft.departureWindow === "string" ? draft.departureWindow : "",
    routeSlug:
      typeof draft.routeSlug === "string" && validRouteSlug(draft.routeSlug)
        ? draft.routeSlug
        : "",
    groupSize: typeof draft.groupSize === "string" ? draft.groupSize : "",
    style: typeof draft.style === "string" ? draft.style : "",
    addons: Array.isArray(draft.addons) ? draft.addons.filter((item): item is string => typeof item === "string") : [],
    notes: typeof draft.notes === "string" ? draft.notes : "",
  };
}

function cleanGuideDraft(value: unknown): AssistedGuideDraft | null {
  if (!value || typeof value !== "object") return null;

  const draft = value as Record<string, unknown>;
  const name = typeof draft.name === "string" ? draft.name : "";
  const role = sanitizeWomenGuideText(
    typeof draft.role === "string" ? draft.role : "",
    "Women-only trekking guide",
  );
  const regions = Array.isArray(draft.regions)
    ? draft.regions.filter((item): item is string => typeof item === "string" && isWomenOnlyGuideText(item))
    : [];
  const languages = Array.isArray(draft.languages)
    ? draft.languages.filter((item): item is string => typeof item === "string" && isWomenOnlyGuideText(item))
    : [];
  const certifications = Array.isArray(draft.certifications)
    ? draft.certifications.filter((item): item is string => typeof item === "string" && isWomenOnlyGuideText(item))
    : [];

  return {
    name,
    role,
    regions,
    languages,
    certifications: certifications.length ? certifications : ["Licensed women trekking guide"],
  };
}

async function generateOpenAiDraft(mode: DraftMode, text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: systemPrompt(mode),
      input: text,
      max_output_tokens: 700,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI draft request failed with ${response.status}`);

  const payload = (await response.json()) as { output_text?: string };
  return parseJsonObject(payload.output_text ?? "{}");
}

async function generateAnthropicDraft(mode: DraftMode, text: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 700,
      system: systemPrompt(mode),
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!response.ok) throw new Error(`Anthropic draft request failed with ${response.status}`);

  const payload = (await response.json()) as { content?: Array<{ type: string; text?: string }> };
  const output =
    payload.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("\n") ?? "{}";

  return parseJsonObject(output);
}

async function generateModelDraft(mode: DraftMode, text: string) {
  const preferred = process.env.AI_PROVIDER;
  const errors: unknown[] = [];

  if (preferred === "anthropic") {
    try {
      const draft = await generateAnthropicDraft(mode, text);
      if (draft) return draft;
    } catch (error) {
      errors.push(error);
    }

    try {
      return await generateOpenAiDraft(mode, text);
    } catch (error) {
      errors.push(error);
      throw errors[0];
    }
  }

  try {
    const draft = await generateOpenAiDraft(mode, text);
    if (draft) return draft;
  } catch (error) {
    errors.push(error);
  }

  try {
    return await generateAnthropicDraft(mode, text);
  } catch (error) {
    errors.push(error);
    throw errors[0];
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiAccess();
  if (unauthorized) return unauthorized;

  const parsed = parseRequest(await request.json().catch(() => null));

  if (!parsed) {
    return NextResponse.json({ message: "Paste or dictate intake notes first." }, { status: 400 });
  }

  try {
    const modelDraft = await generateModelDraft(parsed.mode, parsed.text);
    const checked =
      parsed.mode === "booking" ? cleanBookingDraft(modelDraft) : cleanGuideDraft(modelDraft);

    if (checked) {
      return NextResponse.json({ draft: checked, provider: "model" });
    }
  } catch (error) {
    console.error("Admin draft assist model failed", error);
  }

  return NextResponse.json({
    draft:
      parsed.mode === "booking"
        ? inferBookingDraft(parsed.text)
        : inferGuideDraft(parsed.text),
    provider: "local",
  });
}
