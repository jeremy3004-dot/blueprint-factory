// Operator console data layer — reads live factory state for the visual dashboard.

import { access, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  hasConcreteClonePlan,
  hasNamedSignatureMoment,
  hasPassingVisualReview,
  nextActionForStatus,
  slugify
} from "./blueprint";
import { parseCompareScore, parsePreviewUrl, isDonorShelfSlug } from "./status";
import { routeToDir, summarizePageCoverage, type PagePlanEntry, type PagesFile } from "./pages";
import {
  buildRestockCallPhrase,
  buildStructuredJobCardMarkdown,
  formatCommissionSummary,
  type ShelfRestockCommission
} from "./shelf-restock-commission";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export type NextAction =
  | "CREATE_SITE"
  | "REPAIR_REQUIRED_FILES"
  | "NEEDS_REFERENCE_FIRST"
  | "NEEDS_ART_DIRECTION"
  | "CREATE_APP"
  | "NEEDS_PREVIEW_URL"
  | "CAPTURE_SCREENSHOTS"
  | "CAPTURE_MOTION"
  | "NEEDS_PAGE_COVERAGE"
  | "RUN_BEAUTY"
  | "READY_FOR_HUMAN_REVIEW";

export type SiteStatus = {
  exists: boolean;
  missingFiles: string[];
  referenceReady: boolean;
  artReady: boolean;
  appExists: boolean;
  screenshotsReady: boolean;
  motionReady: boolean;
  pagesReady: boolean;
  beautyReady: boolean;
};

export type ConsoleSite = {
  slug: string;
  kind: "client";
  title: string;
  nextAction: NextAction;
  nextActionPlain: string;
  status: SiteStatus;
  pages: string;
  compareDesktop: number | null;
  compareMobile: number | null;
  previewUrl: string | null;
  lastScreenshot: string | null;
  thumbnail: string | null;
  briefExcerpt: string | null;
  donorSlug: string | null;
  donorUrl: string | null;
};

export type ConsoleDonor = {
  slug: string;
  kind: "donor";
  field: string;
  url: string;
  captureDate: string | null;
  teaches: string | null;
  nepalFit: string | null;
  pages: string;
  thumbnail: string | null;
  hasEvidence: boolean;
};

export type ConsoleTask = {
  id: string;
  filename: string;
  createdAt: string;
  status: "pending" | "in_progress" | "done";
  type: string;
  title: string;
  slug: string | null;
  callPhrase: string;
};

export type ConsoleProspect = {
  id: string;
  csvId: string | null;
  name: string;
  category: string;
  location: string;
  region: string;
  sectors: string[];
  websiteUrl: string;
  mapsUrl: string | null;
  rating: string | null;
  reviewCount: string | null;
  status: string;
  score: number;
  scores: {
    websitePain: number;
    demand: number;
    premiumFit: number;
    access: number;
  };
  websiteNotes: string | null;
  websiteIssues: string | null;
  businessNotes: string | null;
  contactEmail: string | null;
  phone: string | null;
  thumbnail: string | null;
  starred: boolean;
  tier: 0 | 1 | 2;
  favoritedAt: string | null;
  updatedAt: string | null;
  firstSeenAt: string | null;
  manuallyAdded?: boolean;
};

export type NewTaskInput = {
  clientName: string;
  clientWebsite?: string;
  donorShelfSlug?: string;
  notes?: string;
  taskType?: "new_site" | "continue_site" | "review" | "custom" | "stock_donor" | "restock_shelf";
  sector?: string;
  donorUrl?: string;
  whyThisDonor?: string;
  restockRequest?: string;
  restockCommission?: ShelfRestockCommission;
};

const REQUIRED_SITE_FILES = (siteSlug: string) => [
  `sites/${siteSlug}/brief.md`,
  `sites/${siteSlug}/art-direction.md`,
  `sites/${siteSlug}/asset-log.md`,
  `sites/${siteSlug}/deploy.md`,
  `sites/${siteSlug}/qa/run-log.md`,
  `sites/${siteSlug}/qa/visual-review.md`
];

const PLAIN_LANGUAGE: Record<NextAction, (slug: string) => string> = {
  CREATE_SITE: (slug) => `${slug} does not exist yet — scaffold it first.`,
  REPAIR_REQUIRED_FILES: (slug) => `${slug} is missing required factory files.`,
  NEEDS_REFERENCE_FIRST: (slug) => `${slug} needs donor evidence — capture or adopt from the shelf.`,
  NEEDS_ART_DIRECTION: (slug) => `${slug} needs art direction with one named signature moment.`,
  CREATE_APP: (slug) => `${slug} needs its Next.js app scaffolded.`,
  NEEDS_PREVIEW_URL: (slug) => `${slug} built — start preview and capture screenshots.`,
  CAPTURE_SCREENSHOTS: (slug) => `${slug} needs desktop and mobile screenshots.`,
  CAPTURE_MOTION: (slug) => `${slug} needs scroll-through motion capture.`,
  NEEDS_PAGE_COVERAGE: (slug) => `${slug} has pages still to build or defer.`,
  RUN_BEAUTY: (slug) => `${slug} is ready for your Beauty Pass review.`,
  READY_FOR_HUMAN_REVIEW: (slug) => `${slug} passed automated gates — your taste call is next.`
};

async function fileExists(relativePath: string): Promise<boolean> {
  try {
    await access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function directoryHasFiles(relativePath: string): Promise<boolean> {
  try {
    const entries = await readdir(path.join(rootDir, relativePath));
    return entries.length > 0;
  } catch {
    return false;
  }
}

async function hasReferenceFirstEvidence(siteSlug: string): Promise<boolean> {
  for (const required of [
    `sites/${siteSlug}/references/reference-first/topology.md`,
    `sites/${siteSlug}/references/reference-first/clone-plan.md`
  ]) {
    if (!(await fileExists(required))) return false;
  }

  const clonePlan = await readFile(
    path.join(rootDir, "sites", siteSlug, "references", "reference-first", "clone-plan.md"),
    "utf8"
  );
  if (!hasConcreteClonePlan(clonePlan)) return false;

  const referenceDir = path.join(rootDir, "sites", siteSlug, "references", "reference-first");
  const entries = await readdir(referenceDir);
  return entries.some((e) => e.endsWith("-desktop.png")) && entries.some((e) => e.endsWith("-mobile.png"));
}

async function readPagesFile(siteSlug: string): Promise<PagesFile | null> {
  const relativePath = `sites/${siteSlug}/pages.json`;
  if (!(await fileExists(relativePath))) return null;
  try {
    const parsed = JSON.parse(await readFile(path.join(rootDir, relativePath), "utf8")) as PagesFile;
    return Array.isArray(parsed.pages) ? parsed : null;
  } catch {
    return null;
  }
}

async function pageCoverageForSite(siteSlug: string) {
  const file = await readPagesFile(siteSlug);
  if (!file) return null;
  const hasShots = (route: string) => {
    const dir = path.join(rootDir, "sites", siteSlug, "screenshots", "pages", routeToDir(route));
    return existsSync(path.join(dir, "desktop.png")) && existsSync(path.join(dir, "mobile.png"));
  };
  return summarizePageCoverage(file.pages, hasShots);
}

async function siteStatus(siteSlug: string): Promise<SiteStatus> {
  const exists = await fileExists(`sites/${siteSlug}`);
  if (!exists) {
    return {
      exists: false,
      missingFiles: [],
      referenceReady: false,
      artReady: false,
      appExists: false,
      screenshotsReady: false,
      motionReady: false,
      pagesReady: false,
      beautyReady: false
    };
  }

  const missingFiles: string[] = [];
  for (const required of REQUIRED_SITE_FILES(siteSlug)) {
    if (!(await fileExists(required))) missingFiles.push(required);
  }

  const artPath = path.join(rootDir, "sites", siteSlug, "art-direction.md");
  const artReady = existsSync(artPath)
    ? hasNamedSignatureMoment(await readFile(artPath, "utf8"))
    : false;

  const visualReviewPath = path.join(rootDir, "sites", siteSlug, "qa", "visual-review.md");
  const visualReview = existsSync(visualReviewPath) ? await readFile(visualReviewPath, "utf8") : "";
  const coverage = await pageCoverageForSite(siteSlug);

  return {
    exists,
    missingFiles,
    referenceReady: await hasReferenceFirstEvidence(siteSlug),
    artReady,
    appExists: await fileExists(`sites/${siteSlug}/app/package.json`),
    screenshotsReady:
      (await fileExists(`sites/${siteSlug}/screenshots/desktop.png`)) &&
      (await fileExists(`sites/${siteSlug}/screenshots/mobile.png`)),
    motionReady: await directoryHasFiles(`sites/${siteSlug}/qa/motion`),
    pagesReady: coverage ? coverage.ready : true,
    beautyReady: hasPassingVisualReview(visualReview)
  };
}

async function pagesSummary(siteSlug: string): Promise<string> {
  const file = await readPagesFile(siteSlug);
  if (!file) return "single-page";
  const built = file.pages.filter((p) => p.status === "built").length;
  const planned = file.pages.filter((p) => p.status === "planned").length;
  const deferred = file.pages.filter((p) => p.status === "deferred").length;
  return `${built}b/${planned}p/${deferred}d`;
}

function titleFromBrief(markdown: string): string | null {
  const match = markdown.match(/^#\s*Brief:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function excerptFromBrief(markdown: string): string | null {
  const section = markdown.match(/## What This Site Is\s+([\s\S]*?)(\n## |\n# |$)/);
  if (!section) return null;
  const line = section[1].trim().split("\n").find((l) => l.trim().length > 0);
  return line?.trim() ?? null;
}

function donorFromBrief(markdown: string): { slug: string | null; url: string | null } {
  const shelf = markdown.match(/Visual donor:\s*`?(donor-[^`\s.]+)`?/i);
  const url = markdown.match(/Visual donor:\s*(https?:\/\/\S+)/i);
  return { slug: shelf?.[1] ?? null, url: url?.[1] ?? null };
}

async function findThumbnail(siteSlug: string): Promise<string | null> {
  const candidates = [
    `sites/${siteSlug}/screenshots/desktop.png`,
    `sites/${siteSlug}/references/reference-first/donor-black-tomato-desktop.png`,
    `sites/${siteSlug}/references/reference-first/donor-1440.png`,
    `sites/${siteSlug}/references/reference-first/donor-desktop.png`
  ];

  const refDir = path.join(rootDir, "sites", siteSlug, "references", "reference-first");
  if (existsSync(refDir)) {
    const entries = await readdir(refDir);
    const desktop = entries.find((e) => e.endsWith("-desktop.png"));
    if (desktop) candidates.unshift(`sites/${siteSlug}/references/reference-first/${desktop}`);
  }

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return `/assets/${candidate}`;
  }
  return null;
}

async function donorUrlFromTopology(siteSlug: string): Promise<string | null> {
  try {
    const topology = await readFile(
      path.join(rootDir, "sites", siteSlug, "references", "reference-first", "topology.md"),
      "utf8"
    );
    return topology.match(/^Donor URL:\s*(\S+)\s*$/m)?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function buildConsoleSite(siteSlug: string): Promise<ConsoleSite> {
  const status = await siteStatus(siteSlug);
  const nextAction = nextActionForStatus(status) as NextAction;

  let lastScreenshot: string | null = null;
  try {
    const info = await stat(path.join(rootDir, "sites", siteSlug, "screenshots", "desktop.png"));
    lastScreenshot = info.mtime.toISOString();
  } catch {
    lastScreenshot = null;
  }

  let compareDesktop: number | null = null;
  let compareMobile: number | null = null;
  try {
    const report = await readFile(path.join(rootDir, "sites", siteSlug, "qa", "compare", "report.md"), "utf8");
    const parsed = parseCompareScore(report);
    compareDesktop = parsed.desktop;
    compareMobile = parsed.mobile;
  } catch {
    // no compare yet
  }

  let previewUrl: string | null = null;
  try {
    previewUrl = parsePreviewUrl(await readFile(path.join(rootDir, "sites", siteSlug, "deploy.md"), "utf8"));
  } catch {
    previewUrl = null;
  }

  let title = siteSlug;
  let briefExcerpt: string | null = null;
  let donorSlug: string | null = null;
  let donorUrl: string | null = null;
  try {
    const brief = await readFile(path.join(rootDir, "sites", siteSlug, "brief.md"), "utf8");
    title = titleFromBrief(brief) ?? siteSlug;
    briefExcerpt = excerptFromBrief(brief);
    const donor = donorFromBrief(brief);
    donorSlug = donor.slug;
    donorUrl = donor.url;
  } catch {
    // brief optional for partial sites
  }

  if (!donorUrl) donorUrl = await donorUrlFromTopology(siteSlug);

  return {
    slug: siteSlug,
    kind: "client",
    title,
    nextAction,
    nextActionPlain: PLAIN_LANGUAGE[nextAction](siteSlug),
    status,
    pages: await pagesSummary(siteSlug),
    compareDesktop,
    compareMobile,
    previewUrl,
    lastScreenshot,
    thumbnail: await findThumbnail(siteSlug),
    briefExcerpt,
    donorSlug,
    donorUrl
  };
}

export type DonorShelfMeta = {
  field: string;
  url: string;
  captureDate: string | null;
  teaches: string | null;
  nepalFit: string | null;
};

export async function readDonorShelfMeta(): Promise<Map<string, DonorShelfMeta>> {
  const map = new Map<string, DonorShelfMeta>();
  try {
    const markdown = await readFile(path.join(rootDir, "docs", "donor-shelf.md"), "utf8");
    for (const line of markdown.split("\n")) {
      const match = line.match(
        /^\|\s*`(donor-[^`]+)`\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/
      );
      if (!match) continue;
      map.set(match[1], {
        field: match[2].trim(),
        url: match[3].trim(),
        captureDate: match[4].trim(),
        teaches: match[5].trim(),
        nepalFit: match[6].trim()
      });
    }
  } catch {
    // shelf doc optional
  }
  return map;
}

export async function buildConsoleDonor(siteSlug: string, meta: DonorShelfMeta): Promise<ConsoleDonor> {
  const status = await siteStatus(siteSlug);
  const refDir = path.join(rootDir, "sites", siteSlug, "references", "reference-first");
  let hasEvidence = false;
  if (existsSync(refDir)) {
    const entries = await readdir(refDir);
    hasEvidence =
      entries.some((e) => e.endsWith("-desktop.png")) &&
      entries.some((e) => e.endsWith("-mobile.png")) &&
      entries.includes("topology.md") &&
      entries.includes("clone-plan.md");
  }

  return {
    slug: siteSlug,
    kind: "donor",
    field: meta.field,
    url: meta.url,
    captureDate: meta.captureDate,
    teaches: meta.teaches,
    nepalFit: meta.nepalFit,
    pages: await pagesSummary(siteSlug),
    thumbnail: await findThumbnail(siteSlug),
    hasEvidence: hasEvidence || status.referenceReady
  };
}

export async function listSiteSlugs(): Promise<string[]> {
  const sitesDir = path.join(rootDir, "sites");
  const entries = await readdir(sitesDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory() && !e.name.startsWith(".")).map((e) => e.name).sort();
}

export async function gatherConsoleData() {
  const slugs = await listSiteSlugs();
  const donorMeta = await readDonorShelfMeta();
  const clients: ConsoleSite[] = [];
  const donors: ConsoleDonor[] = [];

  for (const slug of slugs) {
    if (isDonorShelfSlug(slug)) {
      const meta = donorMeta.get(slug) ?? {
        field: "Donor shelf",
        url: (await donorUrlFromTopology(slug)) ?? "—",
        captureDate: null,
        teaches: null,
        nepalFit: null
      };
      donors.push(await buildConsoleDonor(slug, meta));
    } else {
      clients.push(await buildConsoleSite(slug));
    }
  }

  const tasks = await listTasks();
  const prospects = await readProspects();
  const { buildProspectFilterMeta } = await import("./console-prospects.ts");
  const prospectFilters = buildProspectFilterMeta(prospects);
  const { listJobs } = await import("./console-jobs.ts");
  const jobs = await listJobs();
  const activeJobs = jobs.filter((j) => j.status === "queued" || j.status === "running").length;
  return {
    generatedAt: new Date().toISOString(),
    clients,
    donors,
    prospects,
    prospectFilters,
    tasks,
    jobs,
    stats: {
      clientCount: clients.length,
      donorCount: donors.length,
      prospectCount: prospects.length,
      readyForReview: clients.filter((c) => c.nextAction === "READY_FOR_HUMAN_REVIEW").length,
      withPreview: clients.filter((c) => c.previewUrl).length,
      pendingTasks: tasks.filter((t) => t.status === "pending").length,
      activeJobs
    }
  };
}

export async function getSiteDetail(slug: string) {
  if (isDonorShelfSlug(slug)) {
    const meta = (await readDonorShelfMeta()).get(slug);
    if (!meta) return null;
    return buildConsoleDonor(slug, meta);
  }
  return buildConsoleSite(slug);
}

function taskStatusFromContent(content: string): ConsoleTask["status"] {
  const match = content.match(/^Status:\s*(pending|in_progress|done)\s*$/m);
  return (match?.[1] as ConsoleTask["status"]) ?? "pending";
}

function taskTypeFromContent(content: string): string {
  return content.match(/^Type:\s*(.+)$/m)?.[1]?.trim() ?? "custom";
}

function taskTitleFromContent(content: string): string {
  return content.match(/^#\s*Task:\s*(.+)$/m)?.[1]?.trim() ?? "Untitled task";
}

function taskSlugFromContent(content: string): string | null {
  return content.match(/^Slug:\s*(\S+)/m)?.[1] ?? null;
}

function callPhraseFromContent(content: string): string {
  const match = content.match(/## Call phrase\s+([\s\S]*?)(\n## |\n# |$)/);
  if (!match) return "";
  return match[1].trim();
}

export async function listTasks(): Promise<ConsoleTask[]> {
  const inboxDir = path.join(rootDir, "factory", "inbox");
  try {
    await access(inboxDir);
  } catch {
    return [];
  }

  const files = (await readdir(inboxDir)).filter((f) => f.endsWith(".md") && f !== "README.md").sort().reverse();
  const tasks: ConsoleTask[] = [];

  for (const filename of files) {
    const content = await readFile(path.join(inboxDir, filename), "utf8");
    const createdAt = filename.match(/^(\d{4}-\d{2}-\d{2}T[\d-]+Z?)/)?.[1] ?? filename;
    tasks.push({
      id: filename.replace(/\.md$/, ""),
      filename,
      createdAt,
      status: taskStatusFromContent(content),
      type: taskTypeFromContent(content),
      title: taskTitleFromContent(content),
      slug: taskSlugFromContent(content),
      callPhrase: callPhraseFromContent(content)
    });
  }

  return tasks;
}

const MASTER_PROMPT_PATH = "factory/playbooks/master-clone-job-prompt.md";
const MASTER_SHELF_PROMPT_PATH = "factory/playbooks/master-shelf-stocking-prompt.md";

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function parseCsv(content: string): Record<string, string>[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

const PROSPECT_SCREENSHOT_FIELDS = [
  "screenshot_path",
  "screenshot",
  "website_screenshot",
  "screenshot_file"
] as const;

function screenshotPathFromRow(row: Record<string, string>): string | null {
  for (const field of PROSPECT_SCREENSHOT_FIELDS) {
    const value = row[field]?.trim();
    if (!value) continue;
    if (value.startsWith("http://") || value.startsWith("https://")) continue;
    return value;
  }
  return null;
}

/** Map a workspace-relative screenshot path to a console asset URL when the file exists. */
export function prospectThumbnailFromPath(relativePath: string | null | undefined): string | null {
  if (!relativePath?.trim()) return null;
  const normalized = relativePath.trim().replace(/^\.\//, "");
  if (normalized.includes("..")) return null;
  const absolute = path.join(rootDir, normalized);
  if (!absolute.startsWith(rootDir)) return null;
  return existsSync(absolute) ? `/assets/${normalized}` : null;
}

export async function resolveProspectThumbnail(row: Record<string, string>): Promise<string | null> {
  const fromCsv = screenshotPathFromRow(row);
  if (fromCsv) {
    const url = prospectThumbnailFromPath(fromCsv);
    if (url) return url;
  }

  const slug = slugify(row.name?.trim() ?? "");
  if (!slug) return null;

  const fallbackCandidates = [
    `prospects/screenshots/${slug}/desktop.png`,
    `prospects/screenshots/${slug}/mobile.png`
  ];

  for (const candidate of fallbackCandidates.slice(0, 2)) {
    if (await fileExists(candidate)) return `/assets/${candidate}`;
  }

  const scoutDir = path.join(rootDir, ".blueprint-search-nepal", "runs");
  if (existsSync(scoutDir)) {
    const runs = await readdir(scoutDir, { withFileTypes: true });
    for (const run of runs.sort((a, b) => b.name.localeCompare(a.name))) {
      if (!run.isDirectory()) continue;
      const desktop = path.join(
        scoutDir,
        run.name,
        "screenshots",
        slug,
        "desktop.png"
      );
      if (existsSync(desktop)) {
        const relative = path.relative(rootDir, desktop);
        return `/assets/${relative}`;
      }
      const mobile = path.join(scoutDir, run.name, "screenshots", slug, "mobile.png");
      if (existsSync(mobile)) {
        const relative = path.relative(rootDir, mobile);
        return `/assets/${relative}`;
      }
    }
  }

  return null;
}

function scoreFromRow(row: Record<string, string>): ConsoleProspect["scores"] {
  return {
    websitePain: Number(row.website_pain_score) || 0,
    demand: Number(row.demand_score) || 0,
    premiumFit: Number(row.premium_fit_score) || 0,
    access: Number(row.access_score) || 0
  };
}

export function prospectIdFromRow(row: Record<string, string>): string {
  const canonical = row.canonical_key?.trim();
  if (canonical) return canonical;
  const csvId = row.id?.trim();
  if (csvId) return `id-${csvId}`;
  return slugify(row.name?.trim() ?? "unknown");
}

export function prospectFromRow(row: Record<string, string>): ConsoleProspect {
  const scores = scoreFromRow(row);
  const name = row.name?.trim() ?? "Unknown";
  const category = row.category?.trim() ?? "";
  const location = row.location?.trim() ?? "";
  const totalScore = Number(row.total_score) || scores.websitePain + scores.demand + scores.premiumFit + scores.access;

  // Lazy import avoided — infer inline via dynamic import at readProspects
  return {
    id: prospectIdFromRow(row),
    csvId: row.id?.trim() || null,
    name,
    category,
    location,
    region: "other",
    sectors: ["other"],
    websiteUrl: row.website_url?.trim() ?? "",
    mapsUrl: row.maps_url?.trim() || null,
    rating: row.rating?.trim() || null,
    reviewCount: row.review_count?.trim() || null,
    status: row.status?.trim() || "new",
    score: totalScore,
    scores,
    websiteNotes: row.website_notes?.trim() || null,
    websiteIssues: row.website_issues?.trim() || null,
    businessNotes: row.business_notes?.trim() || null,
    contactEmail: row.contact_email?.trim() || null,
    phone: row.phone?.trim() || null,
    thumbnail: prospectThumbnailFromPath(screenshotPathFromRow(row)),
    starred: false,
    tier: 0,
    favoritedAt: null,
    updatedAt: row.updated_at?.trim() || null,
    firstSeenAt: row.first_seen_at?.trim() || null
  };
}

export async function readProspects(): Promise<ConsoleProspect[]> {
  const csvPath = path.join(rootDir, "prospects", "nepal-leads.csv");
  try {
    const { applyOverrides, inferRegion, inferSectors, readProspectOverrides } = await import(
      "./console-prospects.ts"
    );
    const overrides = await readProspectOverrides();
    const content = await readFile(csvPath, "utf8");
    const rows = parseCsv(content);
    const prospects = await Promise.all(
      rows.map(async (row) => {
        const base = prospectFromRow(row);
        const thumbnail = (await resolveProspectThumbnail(row)) ?? base.thumbnail;
        const enriched = applyOverrides(
          {
            ...base,
            thumbnail,
            region: inferRegion(base.location),
            sectors: inferSectors(base.category, base.businessNotes)
          },
          overrides
        );
        return enriched;
      })
    );
    return prospects
      .filter((p) => p.name && (p.websiteUrl || p.mapsUrl))
      .sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

export async function findProspectById(id: string): Promise<ConsoleProspect | null> {
  const prospects = await readProspects();
  return prospects.find((p) => p.id === id) ?? null;
}

function buildCallPhrase(input: NewTaskInput, slug: string): string {
  if (input.taskType === "continue_site") {
    return `Continue the ${input.clientName} clone job. Read ${MASTER_PROMPT_PATH}, then sites/${slug}/qa/run-log.md and qa/worker-notes.md, find the last completed step, and continue.`;
  }
  if (input.taskType === "review") {
    return `run a beauty pass for ${input.clientName}`;
  }
  if (input.taskType === "restock_shelf") {
    if (input.restockCommission) {
      return buildRestockCallPhrase(input.restockCommission);
    }
    const parts = [
      `Restock the donor shelf. Read ${MASTER_SHELF_PROMPT_PATH}.`,
      `Job Card: Restock request: ${input.restockRequest?.trim() ?? ""}`
    ];
    if (input.notes?.trim()) {
      parts.push(`Notes: ${input.notes.trim()}`);
    }
    return parts.join(" ");
  }
  if (input.taskType === "stock_donor") {
    const request =
      input.sector?.trim() && input.donorUrl?.trim()
        ? `${input.sector.trim()} — ${input.donorUrl.trim()}`
        : input.sector?.trim() || input.donorUrl?.trim() || "";
    const parts = [
      `Restock the donor shelf. Read ${MASTER_SHELF_PROMPT_PATH}.`,
      `Job Card: Restock request: ${request}`
    ];
    if (input.whyThisDonor?.trim()) {
      parts.push(`Notes: ${input.whyThisDonor.trim()}`);
    }
    return parts.join(" ");
  }

  const parts = [
    `Run the ${input.clientName} clone job. Read ${MASTER_PROMPT_PATH}.`,
    `Job Card: Client name: ${input.clientName}, Client's current website: ${input.clientWebsite ?? ""}`
  ];
  if (input.donorShelfSlug) {
    parts.push(`Copy the look of a specific site? ${input.donorShelfSlug}`);
  }
  if (input.notes?.trim()) {
    parts.push(`Anything else: ${input.notes.trim()}`);
  }
  return parts.join(" ");
}

function buildJobCardMarkdown(input: NewTaskInput): string {
  if (input.taskType === "restock_shelf") {
    if (input.restockCommission) {
      return buildStructuredJobCardMarkdown(input.restockCommission);
    }
    const lines = [`- **Restock request:** ${input.restockRequest?.trim() ?? ""}`];
    if (input.notes?.trim()) {
      lines.push(`- **Notes:** ${input.notes.trim()}`);
    }
    return lines.join("\n");
  }
  if (input.taskType === "stock_donor") {
    const request =
      input.sector?.trim() && input.donorUrl?.trim()
        ? `${input.sector.trim()} — ${input.donorUrl.trim()}`
        : input.sector?.trim() || input.donorUrl?.trim() || "";
    const lines = [`- **Restock request:** ${request}`];
    if (input.whyThisDonor?.trim()) {
      lines.push(`- **Notes:** ${input.whyThisDonor.trim()}`);
    }
    return lines.join("\n");
  }

  const lines = [
    `- **Client name:** ${input.clientName}`,
    `- **Client's current website:** ${input.clientWebsite ?? ""}`
  ];
  if (input.donorShelfSlug) {
    lines.push(`- **Copy the look of a specific site?** ${input.donorShelfSlug}`);
  }
  if (input.notes?.trim()) {
    lines.push(`- **Anything else, in your own words:** ${input.notes.trim()}`);
  }
  return lines.join("\n");
}

/** Build a new_site task input from a Matchmaker donor + prospect pair. */
export function buildMatchmakerTaskInput(
  donorSlug: string,
  prospect: ConsoleProspect,
  notes?: string
): NewTaskInput {
  return {
    clientName: prospect.name,
    clientWebsite: prospect.websiteUrl,
    donorShelfSlug: donorSlug,
    notes: notes?.trim() || undefined,
    taskType: "new_site"
  };
}

export function buildTaskMarkdown(input: NewTaskInput): { slug: string; markdown: string; callPhrase: string } {
  const slug =
    input.taskType === "restock_shelf"
      ? slugify(
          input.restockCommission
            ? input.restockCommission.targets.map((t) => t.field).join("-")
            : input.restockRequest || "shelf-restock"
        )
      : input.taskType === "stock_donor"
        ? slugify(input.sector || input.donorUrl || input.clientName || "donor")
        : slugify(input.clientName);
  const callPhrase = buildCallPhrase(input, slug);

  if (input.taskType === "restock_shelf" || input.taskType === "stock_donor") {
    const title =
      input.taskType === "restock_shelf"
        ? input.restockCommission
          ? formatCommissionSummary(input.restockCommission)
          : input.restockRequest?.trim().split("\n")[0] || "Shelf restock"
        : input.sector?.trim() || input.donorUrl?.trim() || "Shelf restock";
    const type = input.taskType === "restock_shelf" ? "restock_shelf" : "stock_donor";
    const markdown = `# Task: Restock shelf — ${title}

Created: ${new Date().toISOString()}
Status: pending
Type: ${type}
Slug: ${slug}

## Worker prompt

Read and follow \`${MASTER_SHELF_PROMPT_PATH}\`.

## Job Card

${buildJobCardMarkdown(input)}

## Call phrase

${callPhrase}

## Cursor handoff

Paste the call phrase above into Cursor chat, or point a Cursor automation at this file in \`factory/inbox/\`.
`;
    return { slug, markdown, callPhrase };
  }

  if (input.taskType === "continue_site" || input.taskType === "review") {
    const markdown = `# Task: ${input.clientName}

Created: ${new Date().toISOString()}
Status: pending
Type: ${input.taskType}
Slug: ${slug}

## Call phrase

${callPhrase}

## Cursor handoff

Paste the call phrase above into Cursor chat, or point a Cursor automation at this file in \`factory/inbox/\`.
`;
    return { slug, markdown, callPhrase };
  }

  const markdown = `# Task: ${input.clientName}

Created: ${new Date().toISOString()}
Status: pending
Type: ${input.taskType ?? "new_site"}
Slug: ${slug}

## Worker prompt

Read and follow \`${MASTER_PROMPT_PATH}\`.

## Job Card

${buildJobCardMarkdown(input)}

## Call phrase

${callPhrase}

## Cursor handoff

Paste the call phrase above into Cursor chat, or point a Cursor automation at this file in \`factory/inbox/\`.
`;

  return { slug, markdown, callPhrase };
}

export async function createTask(input: NewTaskInput): Promise<{ filename: string; task: ConsoleTask }> {
  const inboxDir = path.join(rootDir, "factory", "inbox");
  await import("node:fs/promises").then((fs) => fs.mkdir(inboxDir, { recursive: true }));

  const { slug, markdown, callPhrase } = buildTaskMarkdown(input);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${timestamp}-${slug}.md`;
  await writeFile(path.join(inboxDir, filename), markdown, "utf8");

  const task: ConsoleTask = {
    id: filename.replace(/\.md$/, ""),
    filename,
    createdAt: new Date().toISOString(),
    status: "pending",
    type: input.taskType ?? "new_site",
    title:
      input.taskType === "restock_shelf"
        ? input.restockCommission
          ? `Restock shelf — ${formatCommissionSummary(input.restockCommission)}`
          : `Restock shelf — ${input.restockRequest?.trim().split("\n")[0] || "new"}`
        : input.taskType === "stock_donor"
          ? `Restock shelf — ${input.sector?.trim() || input.donorUrl?.trim() || "new"}`
          : input.clientName,
    slug,
    callPhrase
  };

  return { filename, task };
}

export function resolveAssetPath(urlPath: string): string | null {
  if (!urlPath.startsWith("/assets/")) return null;
  const relative = urlPath.slice("/assets/".length);
  if (relative.includes("..")) return null;
  const absolute = path.join(rootDir, relative);
  if (!absolute.startsWith(rootDir)) return null;
  return existsSync(absolute) ? absolute : null;
}

export { rootDir };
