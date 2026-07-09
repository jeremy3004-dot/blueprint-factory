// Prospects filtering, favorites, and manual add for Operator Console.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { slugify } from "./blueprint.ts";
import { rootDir, type ConsoleProspect } from "./console-data.ts";

export type ProspectRegion = {
  id: string;
  label: string;
};

export type ProspectSector = {
  id: string;
  label: string;
};

export type ProspectTier = 0 | 1 | 2;

export type ProspectOverride = {
  starred: boolean;
  tier: ProspectTier;
  favoritedAt: string | null;
};

export type ProspectOverridesFile = {
  version: 1;
  favorites: Record<string, ProspectOverride>;
};

export type ProspectFilterParams = {
  region?: string;
  sector?: string | string[];
  starred?: boolean;
  since?: "today" | "week" | "month" | "year";
  minScore?: number;
  q?: string;
  view?: "all" | "favorites" | "recent";
};

export type ProspectFilterMeta = {
  regions: ProspectRegion[];
  sectors: ProspectSector[];
  regionCounts: Record<string, number>;
  sectorCounts: Record<string, number>;
};

export type ManualProspectInput = {
  name: string;
  website: string;
  location?: string;
  category?: string;
  mapsUrl?: string;
};

export type ManualProspectResult = {
  prospect: ConsoleProspect;
  ratedAutomatically: boolean;
  needsCursorRating: boolean;
  taskFilename?: string;
  message: string;
};

const OVERRIDES_PATH = path.join(rootDir, "prospects", "overrides.json");
const PROSPECT_DATA_DIR = path.join(rootDir, ".blueprint-search-nepal");
const NEPAL_LEADS_CSV = path.join(rootDir, "prospects", "nepal-leads.csv");

export const PROSPECT_REGIONS: ProspectRegion[] = [
  { id: "kathmandu", label: "Kathmandu" },
  { id: "pokhara", label: "Pokhara" },
  { id: "chitwan", label: "Chitwan" },
  { id: "lalitpur", label: "Lalitpur" },
  { id: "bandipur", label: "Bandipur" },
  { id: "bardia", label: "Bardia" },
  { id: "other", label: "Other" }
];

export const PROSPECT_SECTORS: ProspectSector[] = [
  { id: "trekking", label: "Trekking" },
  { id: "tourism", label: "Tourism" },
  { id: "hospitality", label: "Hospitality" },
  { id: "wellness", label: "Wellness" },
  { id: "adventure", label: "Adventure" },
  { id: "food", label: "Food & dining" },
  { id: "tech", label: "Tech / AI" },
  { id: "business", label: "Business" },
  { id: "other", label: "Other" }
];

const REGION_PATTERNS: Record<string, RegExp[]> = {
  kathmandu: [/kathmandu/i, /thamel/i, /goldhunga/i, /jyatha/i, /paknajol/i, /raniban/i, /saat ghumti/i],
  pokhara: [/pokhara/i],
  chitwan: [/chitwan/i, /sauraha/i, /narayani/i],
  lalitpur: [/lalitpur/i, /patan/i],
  bandipur: [/bandipur/i],
  bardia: [/bardia/i, /bheri/i]
};

const SECTOR_PATTERNS: Record<string, RegExp[]> = {
  trekking: [/trek/i, /expedition/i, /climbing/i, /peak/i, /mountain/i, /mustang/i, /annapurna/i, /everest/i],
  tourism: [/tour/i, /travel/i, /operator/i, /attraction/i],
  hospitality: [/hotel/i, /boutique/i, /resort/i, /inn/i, /stay/i, /heritage home/i, /lodge/i],
  wellness: [/yoga/i, /ayurveda/i, /meditation/i, /retreat/i, /spa/i, /wellness/i, /detox/i],
  adventure: [/paragliding/i, /rafting/i, /bungee/i, /heli/i, /safari/i, /adventure/i],
  food: [/cooking/i, /restaurant/i, /cafe/i, /food/i, /dining/i],
  tech: [/tech/i, /saas/i, /software/i, /\bai\b/i, /digital/i, /startup/i],
  business: [/ngo/i, /nonprofit/i, /export/i, /real estate/i, /education/i, /fitness/i, /gym/i, /wedding/i]
};

function resolveProspectScript(): string | null {
  const candidates = [
    process.env.BLUEPRINT_SEARCH_NEPAL_SCRIPT,
    path.join(os.homedir(), ".codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py"),
    path.join(os.homedir(), ".agents/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py")
  ].filter((p): p is string => typeof p === "string" && p.length > 0);
  return candidates.find((p) => existsSync(p)) ?? null;
}

export function inferRegion(location: string): string {
  const text = location.trim();
  if (!text) return "other";
  for (const [id, patterns] of Object.entries(REGION_PATTERNS)) {
    if (patterns.some((p) => p.test(text))) return id;
  }
  return "other";
}

export function inferSectors(category: string, businessNotes?: string | null): string[] {
  const text = `${category} ${businessNotes ?? ""}`.toLowerCase();
  const matched = Object.entries(SECTOR_PATTERNS)
    .filter(([, patterns]) => patterns.some((p) => p.test(text)))
    .map(([id]) => id);
  return matched.length ? [...new Set(matched)] : ["other"];
}

export function regionLabel(regionId: string): string {
  return PROSPECT_REGIONS.find((r) => r.id === regionId)?.label ?? regionId;
}

export function sectorLabel(sectorId: string): string {
  return PROSPECT_SECTORS.find((s) => s.id === sectorId)?.label ?? sectorId;
}

function defaultOverrides(): ProspectOverridesFile {
  return { version: 1, favorites: {} };
}

export async function readProspectOverrides(): Promise<ProspectOverridesFile> {
  try {
    const raw = await readFile(OVERRIDES_PATH, "utf8");
    const parsed = JSON.parse(raw) as ProspectOverridesFile;
    if (!parsed || parsed.version !== 1 || typeof parsed.favorites !== "object") {
      return defaultOverrides();
    }
    return parsed;
  } catch {
    return defaultOverrides();
  }
}

export async function writeProspectOverrides(data: ProspectOverridesFile): Promise<void> {
  await mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await writeFile(OVERRIDES_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function applyOverrides(
  prospect: ConsoleProspect,
  overrides: ProspectOverridesFile
): ConsoleProspect {
  const entry = overrides.favorites[prospect.id];
  if (!entry) {
    return { ...prospect, starred: false, tier: 0, favoritedAt: null };
  }
  return {
    ...prospect,
    starred: entry.starred,
    tier: entry.tier,
    favoritedAt: entry.favoritedAt
  };
}

export async function toggleProspectStar(
  prospectId: string,
  options: { tier?: ProspectTier } = {}
): Promise<ProspectOverride | null> {
  const overrides = await readProspectOverrides();
  const existing = overrides.favorites[prospectId];
  const nextTier = options.tier;

  if (existing?.starred && nextTier === undefined) {
    delete overrides.favorites[prospectId];
    await writeProspectOverrides(overrides);
    return null;
  }

  const tier: ProspectTier =
    nextTier !== undefined ? nextTier : existing?.starred ? 0 : 1;

  if (tier === 0) {
    delete overrides.favorites[prospectId];
    await writeProspectOverrides(overrides);
    return null;
  }

  const entry: ProspectOverride = {
    starred: true,
    tier,
    favoritedAt: existing?.favoritedAt ?? new Date().toISOString()
  };
  overrides.favorites[prospectId] = entry;
  await writeProspectOverrides(overrides);
  return entry;
}

function sinceCutoff(since: ProspectFilterParams["since"]): Date | null {
  if (!since) return null;
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (since === "today") return start;
  if (since === "week") {
    start.setDate(start.getDate() - 7);
    return start;
  }
  if (since === "month") {
    start.setMonth(start.getMonth() - 1);
    return start;
  }
  if (since === "year") {
    start.setFullYear(start.getFullYear() - 1);
    return start;
  }
  return null;
}

function parseSectorsParam(sector?: string | string[]): string[] {
  if (!sector) return [];
  const raw = Array.isArray(sector) ? sector : sector.split(",");
  return raw.map((s) => s.trim().toLowerCase()).filter(Boolean);
}

export function filterProspects(
  prospects: ConsoleProspect[],
  params: ProspectFilterParams
): ConsoleProspect[] {
  let items = [...prospects];
  const view = params.view ?? "all";

  if (view === "favorites") {
    items = items.filter((p) => p.starred);
  } else if (view === "recent") {
    items = [...items].sort((a, b) => {
      const aTime = a.updatedAt ?? a.firstSeenAt ?? "";
      const bTime = b.updatedAt ?? b.firstSeenAt ?? "";
      return bTime.localeCompare(aTime);
    });
  }

  if (params.starred) {
    items = items.filter((p) => p.starred);
  }

  if (params.region && params.region !== "all") {
    items = items.filter((p) => p.region === params.region);
  }

  const sectors = parseSectorsParam(params.sector);
  if (sectors.length) {
    items = items.filter((p) => p.sectors.some((s) => sectors.includes(s)));
  }

  if (params.minScore != null && !Number.isNaN(params.minScore)) {
    items = items.filter((p) => p.score >= params.minScore!);
  }

  const cutoff = sinceCutoff(params.since);
  if (cutoff) {
    items = items.filter((p) => {
      const stamp = p.updatedAt ?? p.firstSeenAt;
      if (!stamp) return false;
      return new Date(stamp) >= cutoff;
    });
  }

  const q = params.q?.trim().toLowerCase();
  if (q) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.websiteIssues ?? "").toLowerCase().includes(q) ||
        (p.businessNotes ?? "").toLowerCase().includes(q)
    );
  }

  if (view === "favorites") {
    items.sort((a, b) => {
      if (b.tier !== a.tier) return b.tier - a.tier;
      const aFav = a.favoritedAt ?? "";
      const bFav = b.favoritedAt ?? "";
      if (aFav !== bFav) return bFav.localeCompare(aFav);
      return b.score - a.score;
    });
  } else if (view !== "recent") {
    items.sort((a, b) => b.score - a.score);
  }

  return items;
}

export function buildProspectFilterMeta(prospects: ConsoleProspect[]): ProspectFilterMeta {
  const regionCounts: Record<string, number> = {};
  const sectorCounts: Record<string, number> = {};

  for (const region of PROSPECT_REGIONS) regionCounts[region.id] = 0;
  for (const sector of PROSPECT_SECTORS) sectorCounts[sector.id] = 0;

  for (const p of prospects) {
    regionCounts[p.region] = (regionCounts[p.region] ?? 0) + 1;
    for (const s of p.sectors) {
      sectorCounts[s] = (sectorCounts[s] ?? 0) + 1;
    }
  }

  return {
    regions: PROSPECT_REGIONS,
    sectors: PROSPECT_SECTORS,
    regionCounts,
    sectorCounts
  };
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function normalizeWebsiteUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isMapsUrl(input: string): boolean {
  return /google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(input);
}

function runCommand(
  command: string,
  args: string[],
  cwd = rootDir
): Promise<{ code: number; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, FORCE_COLOR: "0" },
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stderr = "";
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("close", (code) => resolve({ code: code ?? 1, stderr }));
    child.on("error", (err) => resolve({ code: 1, stderr: err.message }));
  });
}

async function exportProspectsCsv(): Promise<number> {
  const prospectScript = resolveProspectScript();
  if (!prospectScript) return 0;

  await mkdir(path.dirname(NEPAL_LEADS_CSV), { recursive: true });
  const { code } = await runCommand("python3", [
    prospectScript,
    "--data-dir",
    PROSPECT_DATA_DIR,
    "export",
    "--format",
    "csv",
    "--output",
    NEPAL_LEADS_CSV
  ]);

  if (code !== 0) return 0;

  try {
    const csv = await readFile(NEPAL_LEADS_CSV, "utf8");
    return Math.max(0, csv.trim().split(/\r?\n/).length - 1);
  } catch {
    return 0;
  }
}

async function importManualRow(row: Record<string, string>): Promise<boolean> {
  const prospectScript = resolveProspectScript();
  if (!prospectScript) return false;

  const tempDir = path.join(rootDir, "factory", "inbox", "jobs");
  await mkdir(tempDir, { recursive: true });
  const tempCsv = path.join(tempDir, `manual-add-${Date.now()}.csv`);
  const headers = [
    "name",
    "category",
    "location",
    "website_url",
    "maps_url",
    "source",
    "source_query",
    "status",
    "website_notes",
    "business_notes"
  ];
  const line = headers.map((h) => escapeCsv(row[h] ?? "")).join(",");
  await writeFile(tempCsv, `${headers.join(",")}\n${line}\n`, "utf8");

  const runName = `Manual add — ${row.name}`;
  const { code } = await runCommand("python3", [
    prospectScript,
    "--data-dir",
    PROSPECT_DATA_DIR,
    "import",
    "--run",
    runName,
    "--input",
    tempCsv,
    "--query-scope",
    row.category || "manual",
    "--source",
    "Operator Console manual add",
    "--notes",
    "Added from Prospects tab — may need full scout rating in Cursor"
  ]);

  return code === 0;
}

export function validateManualProspectInput(body: unknown): ManualProspectInput {
  if (!body || typeof body !== "object") throw new Error("Invalid body");
  const { name, website, location, category, mapsUrl } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) throw new Error("name is required");

  const websiteRaw = typeof website === "string" ? website.trim() : "";
  const mapsRaw = typeof mapsUrl === "string" ? mapsUrl.trim() : "";
  if (!websiteRaw && !mapsRaw) throw new Error("website or mapsUrl is required");

  const resolvedWebsite = websiteRaw
    ? normalizeWebsiteUrl(websiteRaw)
    : mapsRaw && !isMapsUrl(mapsRaw)
      ? normalizeWebsiteUrl(mapsRaw)
      : "";

  const resolvedMaps = mapsRaw || (websiteRaw && isMapsUrl(websiteRaw) ? websiteRaw : "");

  if (!resolvedWebsite && !resolvedMaps) {
    throw new Error("Enter a business website URL or Google Maps link");
  }

  return {
    name: name.trim(),
    website: resolvedWebsite,
    location: typeof location === "string" ? location.trim() : undefined,
    category: typeof category === "string" ? category.trim() : undefined,
    mapsUrl: resolvedMaps || undefined
  };
}

export async function addManualProspect(
  input: ManualProspectInput,
  findProspect: (id: string) => Promise<ConsoleProspect | null>
): Promise<ManualProspectResult> {
  const category = input.category?.trim() || "manual prospect";
  const location = input.location?.trim() || "Nepal";
  const websiteNotes =
    "Manual add from Operator Console. Auto-scored from minimal fields — run full scout in Cursor for demand and website pain evidence.";

  const importRow: Record<string, string> = {
    name: input.name,
    category,
    location,
    website_url: input.website,
    maps_url: input.mapsUrl ?? "",
    source: "Operator Console manual add",
    source_query: "manual-add",
    status: "new",
    website_notes: websiteNotes,
    business_notes: "Added manually — needs scout verification for review counts and website audit."
  };

  const imported = await importManualRow(importRow);
  const ratedAutomatically = imported;
  let needsCursorRating = true;

  if (imported) {
    await exportProspectsCsv();
  }

  const prospectId = input.website
    ? `url:${new URL(input.website).hostname.replace(/^www\./, "")}`
    : slugify(input.name);

  let prospect = await findProspect(prospectId);
  if (!prospect) {
    prospect = await findProspect(slugify(input.name));
  }

  const callPhrase = [
    `Rate and enrich manual prospect: ${input.name}.`,
    input.website ? `Website: ${input.website}` : "",
    input.mapsUrl ? `Maps: ${input.mapsUrl}` : "",
    "Use blueprint-search-nepal skill for demand evidence, website audit, and screenshot capture.",
    "Re-export to prospects/nepal-leads.csv when done."
  ]
    .filter(Boolean)
    .join(" ");

  const inboxDir = path.join(rootDir, "factory", "inbox");
  await mkdir(inboxDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const slug = slugify(input.name);
  const taskFilename = `${timestamp}-${slug}-prospect-rating.md`;
  const taskMarkdown = `# Task: Rate manual prospect — ${input.name}

Created: ${new Date().toISOString()}
Status: pending
Type: prospect_rating
Slug: ${slug}

## Worker prompt

Full scout rating for a business added manually from the Operator Console.
Use \`/Users/dev/.codex/skills/blueprint-search-nepal/\` — gather review evidence, audit the website, capture screenshots, score 0–100, import, and export to \`prospects/nepal-leads.csv\`.

## Job Card

- **Business:** ${input.name}
- **Website:** ${input.website || "—"}
- **Maps:** ${input.mapsUrl || "—"}
- **Category:** ${category}
- **Location:** ${location}
- **Auto-rated:** ${imported ? "yes (placeholder scores only)" : "no — scout script unavailable"}

## Call phrase

${callPhrase}

## Cursor handoff

Paste the call phrase above into Cursor chat.
`;

  await writeFile(path.join(inboxDir, taskFilename), taskMarkdown, "utf8");

  if (!prospect) {
    needsCursorRating = true;
    prospect = {
      id: prospectId,
      name: input.name,
      category,
      location,
      region: inferRegion(location),
      sectors: inferSectors(category),
      websiteUrl: input.website,
      mapsUrl: input.mapsUrl ?? null,
      rating: null,
      reviewCount: null,
      status: "new",
      score: 0,
      scores: { websitePain: 0, demand: 0, premiumFit: 0, access: 0 },
      websiteNotes,
      websiteIssues: null,
      businessNotes: importRow.business_notes,
      contactEmail: null,
      phone: null,
      thumbnail: null,
      starred: false,
      tier: 0,
      favoritedAt: null,
      updatedAt: new Date().toISOString(),
      firstSeenAt: new Date().toISOString(),
      manuallyAdded: true
    };
  }

  const message = imported
    ? "Added with placeholder auto-scores. Full demand and website-pain rating still needs Cursor scout."
    : "Saved to inbox for rating — install blueprint-search-nepal skill for auto-import and scoring.";

  return {
    prospect,
    ratedAutomatically,
    needsCursorRating,
    taskFilename,
    message
  };
}

export function parseProspectQuery(url: URL): ProspectFilterParams {
  const params: ProspectFilterParams = {};
  const region = url.searchParams.get("region");
  const sector = url.searchParams.get("sector");
  const starred = url.searchParams.get("starred");
  const since = url.searchParams.get("since");
  const minScore = url.searchParams.get("minScore");
  const q = url.searchParams.get("q");
  const view = url.searchParams.get("view");

  if (region) params.region = region;
  if (sector) params.sector = sector;
  if (starred === "true" || starred === "1") params.starred = true;
  if (since === "today" || since === "week" || since === "month" || since === "year") {
    params.since = since;
  }
  if (minScore) {
    const n = Number(minScore);
    if (!Number.isNaN(n)) params.minScore = n;
  }
  if (q) params.q = q;
  if (view === "all" || view === "favorites" || view === "recent") params.view = view;

  return params;
}
