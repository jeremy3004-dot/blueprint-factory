import { chromium } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { autoScroll, dismissCookieConsent, installEvalShim, resilientGoto } from "./browser-utils";
import { detectAnimationLibraries, extractTokens, type DonorTokens, type RawStyleHarvest } from "./capture-donor";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ---------------------------------------------------------------------------
// Pure comparison logic (unit-tested)
// ---------------------------------------------------------------------------

export type BandScore = { index: number; label: string; y0: number; y1: number; diffPixels: number; totalPixels: number; matchPercent: number };

/** Match percent from a pixel diff. 100 = identical, 0 = every pixel differs. */
export function matchPercent(diffPixels: number, totalPixels: number): number {
  if (totalPixels <= 0) return 0;
  const pct = 100 * (1 - diffPixels / totalPixels);
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
}

/** Overall match = mean of per-section band matches. */
export function overallMatch(bands: { matchPercent: number }[]): number {
  if (bands.length === 0) return 0;
  const sum = bands.reduce((acc, b) => acc + b.matchPercent, 0);
  return Math.round((sum / bands.length) * 10) / 10;
}

/** Worst-scoring sections first (the fix list). */
export function worstSections<T extends { matchPercent: number }>(bands: T[], limit: number): T[] {
  return [...bands].sort((a, b) => a.matchPercent - b.matchPercent).slice(0, limit);
}

export type TokenComparison = {
  paletteOverlapPercent: number;
  sharedColors: string[];
  missingDonorColors: string[];
  headingFontMatch: boolean;
  bodyFontMatch: boolean;
  donorHeadingFont: string | null;
  buildHeadingFont: string | null;
};

/** Structure/style comparison from both token sets. Palette overlap = donor top colors present in build. */
export function compareTokens(donor: DonorTokens, build: DonorTokens, topN = 8): TokenComparison {
  const donorTop = donor.colors.slice(0, topN).map((c) => c.value);
  const buildSet = new Set(build.colors.map((c) => c.value));
  const shared = donorTop.filter((c) => buildSet.has(c));
  const missing = donorTop.filter((c) => !buildSet.has(c));
  const norm = (f: string | null) => (f ? f.toLowerCase().trim() : null);
  return {
    paletteOverlapPercent: donorTop.length ? Math.round((shared.length / donorTop.length) * 1000) / 10 : 0,
    sharedColors: shared,
    missingDonorColors: missing,
    headingFontMatch: norm(donor.fonts.heading) !== null && norm(donor.fonts.heading) === norm(build.fonts.heading),
    bodyFontMatch: norm(donor.fonts.body) !== null && norm(donor.fonts.body) === norm(build.fonts.body),
    donorHeadingFont: donor.fonts.heading,
    buildHeadingFont: build.fonts.heading
  };
}

export type StructureComparison = {
  donorSectionCount: number;
  buildSectionCount: number;
  sectionCountDelta: number;
  donorHeadingCount: number;
  buildHeadingCount: number;
  headingHierarchyMatchPercent: number;
};

/** Structural checks: section counts and heading-hierarchy overlap (order-sensitive prefix match). */
export function compareStructure(
  donorSectionCount: number,
  buildSectionCount: number,
  donorHeadings: string[],
  buildHeadings: string[]
): StructureComparison {
  const len = Math.max(donorHeadings.length, buildHeadings.length);
  let matched = 0;
  for (let i = 0; i < Math.min(donorHeadings.length, buildHeadings.length); i += 1) {
    if (donorHeadings[i].trim().toLowerCase() === buildHeadings[i].trim().toLowerCase()) matched += 1;
  }
  return {
    donorSectionCount,
    buildSectionCount,
    sectionCountDelta: buildSectionCount - donorSectionCount,
    donorHeadingCount: donorHeadings.length,
    buildHeadingCount: buildHeadings.length,
    headingHierarchyMatchPercent: len ? Math.round((matched / len) * 1000) / 10 : 0
  };
}

export type ViewportReport = { viewport: string; overall: number; bands: BandScore[]; note?: string };

export type CompareReportData = {
  slug: string;
  donorUrl: string;
  previewUrl: string;
  comparedAt: string;
  viewports: ViewportReport[];
  tokens: TokenComparison | null;
  structure: StructureComparison | null;
};

function scoreLabel(pct: number): string {
  if (pct >= 90) return "strong";
  if (pct >= 75) return "close";
  if (pct >= 50) return "loose";
  return "weak";
}

/** Build the human-facing compare report. Structure and style scores are reported SEPARATELY
 * from raw pixel match, per the honesty rule: after brand translation, pixel/color match drops
 * on purpose while structure/rhythm should stay high. */
export function buildCompareReport(data: CompareReportData): string {
  const lines: string[] = [];
  lines.push(`# Visual Compare Report: ${data.slug}`);
  lines.push("");
  lines.push(`Donor: ${data.donorUrl}`);
  lines.push(`Build: ${data.previewUrl}`);
  lines.push(`Compared: ${data.comparedAt}`);
  lines.push("");
  lines.push("> Pixel match is a fidelity instrument for the CLONE stage. After brand translation,");
  lines.push("> color/imagery match is EXPECTED to drop while structure and rhythm should stay high.");
  lines.push("> Read the structure/style section below alongside the pixel scores, not instead of them.");
  lines.push("");

  const canonical = data.viewports.find((v) => v.viewport === "desktop") ?? data.viewports[0];
  lines.push("## Overall Pixel Match");
  lines.push("");
  for (const vp of data.viewports) {
    lines.push(`- ${vp.viewport}: ${vp.overall}% (${scoreLabel(vp.overall)})${vp.note ? ` — ${vp.note}` : ""}`);
  }
  lines.push("");

  if (data.structure) {
    lines.push("## Structure (should stay high through translation)");
    lines.push("");
    lines.push(`- Donor sections: ${data.structure.donorSectionCount} · Build sections: ${data.structure.buildSectionCount} (delta ${data.structure.sectionCountDelta >= 0 ? "+" : ""}${data.structure.sectionCountDelta})`);
    lines.push(`- Heading hierarchy match: ${data.structure.headingHierarchyMatchPercent}% (${data.structure.buildHeadingCount} build vs ${data.structure.donorHeadingCount} donor headings)`);
    lines.push("");
  }

  if (data.tokens) {
    lines.push("## Style tokens");
    lines.push("");
    lines.push(`- Donor-palette coverage in build: ${data.tokens.paletteOverlapPercent}%`);
    lines.push(`- Heading font match: ${data.tokens.headingFontMatch ? "yes" : "no"} (donor ${data.tokens.donorHeadingFont ?? "?"} vs build ${data.tokens.buildHeadingFont ?? "?"})`);
    lines.push(`- Body font match: ${data.tokens.bodyFontMatch ? "yes" : "no"}`);
    if (data.tokens.missingDonorColors.length) {
      lines.push(`- Donor colors absent from build: ${data.tokens.missingDonorColors.join(", ")}`);
    }
    lines.push("");
  }

  // Worst-section-first fix list, driven by the canonical viewport.
  if (canonical) {
    lines.push("## Worst Sections First (fix list)");
    lines.push("");
    const worst = worstSections(canonical.bands, 5);
    if (worst.length === 0) {
      lines.push("- No section bands were compared (missing donor or build screenshot).");
    } else {
      worst.forEach((band, rank) => {
        lines.push(`${rank + 1}. ${band.label} — ${band.matchPercent}% match (${scoreLabel(band.matchPercent)}). Crop: \`crops/${data.slug}-${canonical.viewport}-band-${String(band.index + 1).padStart(2, "0")}.png\``);
      });
    }
    lines.push("");
    lines.push("## Per-Section Match — " + canonical.viewport);
    lines.push("");
    lines.push("| # | Section band | Match % |");
    lines.push("| - | ------------ | ------- |");
    for (const band of canonical.bands) {
      lines.push(`| ${band.index + 1} | ${band.label} | ${band.matchPercent}% |`);
    }
    lines.push("");
  }

  lines.push("## Side-by-side composites");
  lines.push("");
  for (const vp of data.viewports) {
    lines.push(`- ${vp.viewport}: \`side-by-side-${vp.viewport}.png\``);
  }
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// PNG helpers (band diff + composite) — pngjs + pixelmatch, no resize needed
// ---------------------------------------------------------------------------

function cropRegion(src: PNG, x: number, y: number, w: number, h: number): PNG {
  const out = new PNG({ width: w, height: h });
  for (let row = 0; row < h; row += 1) {
    const srcStart = ((y + row) * src.width + x) * 4;
    const dstStart = row * w * 4;
    src.data.copy(out.data, dstStart, srcStart, srcStart + w * 4);
  }
  return out;
}

export type BandDiffResult = { bands: BandScore[]; diffImages: PNG[] };

/** Diff two same-width full-page screenshots by horizontal bands. Heights may differ; we compare
 * the shared height (top-aligned) sliced into `bandCount` equal bands. Each band is identical
 * dimensions on both sides, so pixelmatch runs with no resize. */
export function diffByBands(donor: PNG, build: PNG, bandCount: number): BandDiffResult {
  const width = Math.min(donor.width, build.width);
  const height = Math.min(donor.height, build.height);
  const bands: BandScore[] = [];
  const diffImages: PNG[] = [];
  if (width <= 0 || height <= 0) return { bands, diffImages };

  const bandHeight = Math.max(1, Math.floor(height / bandCount));
  for (let i = 0; i < bandCount; i += 1) {
    const y0 = i * bandHeight;
    if (y0 >= height) break;
    const h = i === bandCount - 1 ? height - y0 : bandHeight;
    const donorBand = cropRegion(donor, 0, y0, width, h);
    const buildBand = cropRegion(build, 0, y0, width, h);
    const diff = new PNG({ width, height: h });
    const diffPixels = pixelmatch(donorBand.data, buildBand.data, diff.data, width, h, { threshold: 0.15 });
    const total = width * h;
    bands.push({
      index: i,
      label: `Section band ${i + 1} (y ${y0}–${y0 + h})`,
      y0,
      y1: y0 + h,
      diffPixels,
      totalPixels: total,
      matchPercent: matchPercent(diffPixels, total)
    });
    diffImages.push(diff);
  }
  return { bands, diffImages };
}

/** Paste donor | build side by side into one PNG (white gutter). No resize; caps height for sanity. */
export function compositeSideBySide(donor: PNG, build: PNG, gap = 24, maxHeight = 8000): PNG {
  const height = Math.min(maxHeight, Math.max(donor.height, build.height));
  const width = donor.width + gap + build.width;
  const out = new PNG({ width, height });
  out.data.fill(255); // white background
  const paste = (src: PNG, dx: number) => {
    const rows = Math.min(height, src.height);
    for (let row = 0; row < rows; row += 1) {
      const srcStart = row * src.width * 4;
      const dstStart = (row * width + dx) * 4;
      src.data.copy(out.data, dstStart, srcStart, srcStart + src.width * 4);
    }
  };
  paste(donor, 0);
  paste(build, donor.width + gap);
  return out;
}

async function readPng(filePath: string): Promise<PNG> {
  const buffer = await readFile(filePath);
  return PNG.sync.read(buffer);
}

async function writePng(filePath: string, png: PNG): Promise<void> {
  await writeFile(filePath, PNG.sync.write(png));
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

async function firstExisting(dir: string, candidates: string[]): Promise<string | null> {
  for (const name of candidates) {
    const full = path.join(dir, name);
    try {
      await access(full);
      return full;
    } catch {
      // keep looking
    }
  }
  return null;
}

/** Find a donor screenshot for a viewport, tolerating both new (donor-1440.png) and legacy
 * (*-desktop.png / *-mobile.png) naming. */
async function findDonorShot(referenceDir: string, viewport: "desktop" | "mobile"): Promise<string | null> {
  const canonical = viewport === "desktop" ? "donor-1440.png" : "donor-390.png";
  const direct = await firstExisting(referenceDir, [canonical]);
  if (direct) return direct;
  try {
    const entries = await readdir(referenceDir);
    const suffix = viewport === "desktop" ? "-desktop.png" : "-mobile.png";
    const match = entries.find((e) => e.endsWith(suffix));
    return match ? path.join(referenceDir, match) : null;
  } catch {
    return null;
  }
}

export type CompareResult = {
  slug: string;
  reportPath: string;
  donorFound: boolean;
  overallDesktop: number | null;
  overallMobile: number | null;
  worstSectionLabel: string | null;
  worstSectionMatch: number | null;
  structure: StructureComparison | null;
  tokens: TokenComparison | null;
};

/** Recapture the build and produce the compare report + composites + crops. */
export async function runCompare(
  slug: string,
  previewUrl: string,
  options: { bands?: number; comparedAt?: string } = {}
): Promise<CompareResult> {
  const bandCount = options.bands ?? 8;
  const comparedAt = options.comparedAt ?? new Date().toISOString();
  const siteDir = path.join(rootDir, "sites", slug);
  const referenceDir = path.join(siteDir, "references", "reference-first");
  const compareDir = path.join(siteDir, "qa", "compare");
  const cropsDir = path.join(compareDir, "crops");
  const buildShotDir = path.join(compareDir, "build");
  await mkdir(cropsDir, { recursive: true });
  await mkdir(buildShotDir, { recursive: true });

  // Recapture the build at desktop + mobile with the same auto-scroll discipline, and harvest
  // the build's tokens + headings + section count for structural/style comparison.
  const browser = await chromium.launch();
  let buildTokens: DonorTokens | null = null;
  let buildHeadings: string[] = [];
  let buildSectionCount = 0;
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await context.newPage();
    await installEvalShim(page);

    await resilientGoto(page, previewUrl);
    await dismissCookieConsent(page);
    await autoScroll(page);
    await page.screenshot({ path: path.join(buildShotDir, "desktop.png"), fullPage: true });

    const facts = await harvestBuildFacts(page);
    buildTokens = extractTokens(facts.harvest);
    buildHeadings = facts.headings;
    buildSectionCount = facts.sectionCount;

    await page.setViewportSize({ width: 390, height: 844 });
    await resilientGoto(page, previewUrl);
    await autoScroll(page);
    await page.screenshot({ path: path.join(buildShotDir, "mobile.png"), fullPage: true });
    await context.close();
  } finally {
    await browser.close();
  }

  const viewports: ViewportReport[] = [];
  for (const viewport of ["desktop", "mobile"] as const) {
    const donorPath = await findDonorShot(referenceDir, viewport);
    const buildPath = path.join(buildShotDir, `${viewport}.png`);
    if (!donorPath) {
      viewports.push({ viewport, overall: 0, bands: [], note: "no donor screenshot found" });
      continue;
    }
    const donorPng = await readPng(donorPath);
    const buildPng = await readPng(buildPath);
    const { bands, diffImages } = diffByBands(donorPng, buildPng, bandCount);
    const overall = overallMatch(bands);
    const note =
      donorPng.width !== buildPng.width ? `widths differ (donor ${donorPng.width} vs build ${buildPng.width}); compared common width` : undefined;
    viewports.push({ viewport, overall, bands, note });

    // Save worst-band diff crops for the fix list.
    const worst = worstSections(bands.map((b, i) => ({ ...b, i })), 5);
    for (const band of worst) {
      const cropName = `${slug}-${viewport}-band-${String(band.index + 1).padStart(2, "0")}.png`;
      await writePng(path.join(cropsDir, cropName), diffImages[band.index]);
    }

    // Side-by-side composite.
    const composite = compositeSideBySide(donorPng, buildPng);
    await writePng(path.join(compareDir, `side-by-side-${viewport}.png`), composite);
  }

  // Token + structure comparison against the donor extraction (if present).
  let donorTokens: DonorTokens | null = null;
  try {
    donorTokens = JSON.parse(await readFile(path.join(referenceDir, "extraction", "tokens.json"), "utf8")) as DonorTokens;
  } catch {
    donorTokens = null;
  }
  let donorSectionCount = 0;
  try {
    const donorSections = await readdir(path.join(referenceDir, "sections"));
    donorSectionCount = donorSections.filter((f) => f.endsWith(".png")).length;
  } catch {
    donorSectionCount = 0;
  }
  const donorHeadings = await readDonorHeadings(referenceDir);

  const tokens = donorTokens && buildTokens ? compareTokens(donorTokens, buildTokens) : null;
  const structure =
    donorSectionCount || buildSectionCount || donorHeadings.length || buildHeadings.length
      ? compareStructure(donorSectionCount, buildSectionCount, donorHeadings, buildHeadings)
      : null;

  const reportData: CompareReportData = {
    slug,
    donorUrl: await readDonorUrl(referenceDir),
    previewUrl,
    comparedAt,
    viewports,
    tokens,
    structure
  };
  const reportPath = path.join(compareDir, "report.md");
  await writeFile(reportPath, buildCompareReport(reportData), "utf8");

  const desktop = viewports.find((v) => v.viewport === "desktop");
  const mobile = viewports.find((v) => v.viewport === "mobile");
  const worstBand = desktop && desktop.bands.length ? worstSections(desktop.bands, 1)[0] : null;

  return {
    slug,
    reportPath,
    donorFound: viewports.some((v) => v.bands.length > 0),
    overallDesktop: desktop ? desktop.overall : null,
    overallMobile: mobile ? mobile.overall : null,
    worstSectionLabel: worstBand ? worstBand.label : null,
    worstSectionMatch: worstBand ? worstBand.matchPercent : null,
    structure,
    tokens
  };
}

/** Harvest tokens + headings + section count from a live page (build side of the compare). */
async function harvestBuildFacts(page: import("@playwright/test").Page): Promise<{ harvest: RawStyleHarvest; headings: string[]; sectionCount: number }> {
  const harvest = await page.evaluate(() => {
    const colorCounts: Record<string, number> = {};
    const headingFonts: string[] = [];
    const bodyFonts: string[] = [];
    const uiFonts: string[] = [];
    const fontSizesPx: number[] = [];
    const sectionPaddingsPx: number[] = [];
    const radiiPx: number[] = [];
    const shadows: string[] = [];
    const all = Array.from(document.querySelectorAll<HTMLElement>("body *")).slice(0, 4000);
    for (const el of all) {
      const cs = getComputedStyle(el);
      if (cs.color) colorCounts[cs.color] = (colorCounts[cs.color] ?? 0) + 1;
      if (cs.backgroundColor) colorCounts[cs.backgroundColor] = (colorCounts[cs.backgroundColor] ?? 0) + 1;
      const tag = el.tagName.toLowerCase();
      const size = Number.parseFloat(cs.fontSize);
      if (!Number.isNaN(size)) fontSizesPx.push(size);
      if (/^h[1-3]$/.test(tag)) headingFonts.push(cs.fontFamily);
      else if (tag === "p" || tag === "li" || tag === "span") bodyFonts.push(cs.fontFamily);
      else if (tag === "button" || tag === "a" || tag === "nav") uiFonts.push(cs.fontFamily);
      if (tag === "section") {
        sectionPaddingsPx.push(Number.parseFloat(cs.paddingTop));
        sectionPaddingsPx.push(Number.parseFloat(cs.paddingBottom));
      }
      const radius = Number.parseFloat(cs.borderTopLeftRadius);
      if (!Number.isNaN(radius) && radius > 0) radiiPx.push(radius);
      if (cs.boxShadow && cs.boxShadow !== "none") shadows.push(cs.boxShadow);
    }
    return { colorCounts, headingFonts, bodyFonts, uiFonts, fontSizesPx, sectionPaddingsPx, radiiPx, shadows };
  });
  const headings = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1, h2, h3")).map((h) => (h.textContent || "").replace(/\s+/g, " ").trim()).filter(Boolean)
  );
  const sectionCount = await page.evaluate(
    () => document.querySelectorAll("main > section, main > div, body > section, section[class]").length
  );
  void detectAnimationLibraries; // reserved for future build-side library reporting
  return { harvest, headings, sectionCount };
}

async function readDonorHeadings(referenceDir: string): Promise<string[]> {
  try {
    const copy = await readFile(path.join(referenceDir, "extraction", "copy.md"), "utf8");
    return copy
      .split("\n")
      .filter((line) => /^#{1,3}\s+/.test(line))
      .map((line) => line.replace(/^#{1,3}\s+/, "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function readDonorUrl(referenceDir: string): Promise<string> {
  try {
    const clonePlan = await readFile(path.join(referenceDir, "clone-plan.md"), "utf8");
    const match = clonePlan.match(/^Donor URL:\s*(.+)$/m);
    if (match && match[1].trim()) return match[1].trim();
  } catch {
    // fall through
  }
  return "(donor URL not recorded)";
}
