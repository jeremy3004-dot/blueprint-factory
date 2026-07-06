import { chromium } from "@playwright/test";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  autoScroll,
  CAPTURE_VIEWPORTS,
  dismissCookieConsent,
  installEvalShim,
  resilientGoto,
  scriptedScrollThrough
} from "./browser-utils";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ---------------------------------------------------------------------------
// Pure logic (unit-tested, no browser). This is the "measurement" that turns a
// donor page into a mechanical evidence pack.
// ---------------------------------------------------------------------------

export type RawStyleHarvest = {
  colorCounts: Record<string, number>;
  headingFonts: string[];
  bodyFonts: string[];
  uiFonts: string[];
  fontSizesPx: number[];
  sectionPaddingsPx: number[];
  radiiPx: number[];
  shadows: string[];
};

export type DonorTokens = {
  colors: { value: string; count: number }[];
  fonts: { heading: string | null; body: string | null; ui: string | null };
  typeScale: number[];
  spacing: number[];
  radii: number[];
  shadows: string[];
};

/** Normalize a CSS color to a stable, comparable form. rgb()→hex when opaque; hex lowercased. */
export function normalizeColor(input: string): string | null {
  const value = input.trim().toLowerCase();
  if (!value || value === "transparent" || value.startsWith("rgba(0, 0, 0, 0)")) return null;

  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hexMatch) {
    const hex = hexMatch[1];
    return hex.length === 3
      ? `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
      : `#${hex}`;
  }

  const rgb = value.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(",").map((p) => p.trim());
    const [r, g, b] = parts.map((p) => Number.parseFloat(p));
    const a = parts.length > 3 ? Number.parseFloat(parts[3]) : 1;
    if ([r, g, b].some((n) => Number.isNaN(n))) return null;
    if (a === 0) return null;
    if (a < 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return value;
}

/** The most common first-family in a list of CSS font-family declarations. Deterministic tie-break. */
export function mostCommonFamily(families: string[]): string | null {
  const counts = new Map<string, number>();
  for (const declaration of families) {
    if (!declaration) continue;
    const first = declaration.split(",")[0]?.trim().replace(/^['"]|['"]$/g, "");
    if (!first) continue;
    counts.set(first, (counts.get(first) ?? 0) + 1);
  }
  if (counts.size === 0) return null;
  return [...counts.entries()]
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))[0][0];
}

/** Normalize a raw in-page style harvest into curated donor tokens. */
export function extractTokens(harvest: RawStyleHarvest): DonorTokens {
  const colors = Object.entries(harvest.colorCounts)
    .map(([raw, count]) => ({ value: normalizeColor(raw), count }))
    .filter((entry): entry is { value: string; count: number } => entry.value !== null)
    .reduce<Map<string, number>>((map, { value, count }) => {
      map.set(value, (map.get(value) ?? 0) + count);
      return map;
    }, new Map());

  const sortedColors = [...colors.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => (b.count - a.count) || a.value.localeCompare(b.value))
    .slice(0, 24);

  const uniqueSortedDesc = (nums: number[], limit: number) =>
    [...new Set(nums.map((n) => Math.round(n)))].filter((n) => n > 0).sort((a, b) => b - a).slice(0, limit);
  const uniqueSortedAsc = (nums: number[], limit: number) =>
    [...new Set(nums.map((n) => Math.round(n)))].filter((n) => n > 0).sort((a, b) => a - b).slice(0, limit);

  return {
    colors: sortedColors,
    fonts: {
      heading: mostCommonFamily(harvest.headingFonts),
      body: mostCommonFamily(harvest.bodyFonts),
      ui: mostCommonFamily(harvest.uiFonts)
    },
    typeScale: uniqueSortedDesc(harvest.fontSizesPx, 12),
    spacing: uniqueSortedAsc(harvest.sectionPaddingsPx, 12),
    radii: uniqueSortedAsc(harvest.radiiPx, 8),
    shadows: [...new Set(harvest.shadows)].filter((s) => s && s !== "none").slice(0, 8)
  };
}

// --- Page inventory harvesting ---------------------------------------------

export type RawLink = { href: string; label: string; area: string };
export type PageEntry = { path: string; url: string; label: string; area: string };

const NON_PAGE_EXTENSIONS = /\.(pdf|jpe?g|png|gif|webp|svg|avif|mp4|mov|webm|usdz|glb|gltf|zip|dmg|pkg|exe|css|js|mjs|xml|json|rss|ico|woff2?|ttf|otf)$/i;
const AREA_RANK: Record<string, number> = { header: 0, nav: 1, footer: 2, body: 3 };

/** Turn raw same-origin links into a deduped, normalized page inventory. */
export function harvestPageInventory(links: RawLink[], donorUrl: string): PageEntry[] {
  let origin: string;
  try {
    origin = new URL(donorUrl).origin;
  } catch {
    return [];
  }

  const byPath = new Map<string, PageEntry>();
  for (const link of links) {
    let resolved: URL;
    try {
      resolved = new URL(link.href, donorUrl);
    } catch {
      continue;
    }
    if (resolved.origin !== origin) continue;
    if (!/^https?:$/.test(resolved.protocol)) continue;
    if (NON_PAGE_EXTENSIONS.test(resolved.pathname)) continue;

    let normalizedPath = resolved.pathname.replace(/\/+$/, "");
    if (normalizedPath === "") normalizedPath = "/";

    const label = link.label.replace(/\s+/g, " ").trim();
    const area = link.area in AREA_RANK ? link.area : "body";
    const candidate: PageEntry = { path: normalizedPath, url: `${origin}${normalizedPath}`, label, area };

    const existing = byPath.get(normalizedPath);
    if (!existing) {
      byPath.set(normalizedPath, candidate);
      continue;
    }
    // Prefer a labeled link from a higher-ranked area (header/nav over footer/body).
    const better =
      (AREA_RANK[area] < AREA_RANK[existing.area]) ||
      (AREA_RANK[area] === AREA_RANK[existing.area] && !existing.label && !!label);
    if (better) byPath.set(normalizedPath, { ...existing, label: label || existing.label, area });
  }

  return [...byPath.values()].sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

// --- Animation library detection -------------------------------------------

const LIBRARY_SIGNATURES: { name: string; scriptHints: RegExp; globals: string[] }[] = [
  { name: "GSAP", scriptHints: /gsap|greensock|scrolltrigger/i, globals: ["gsap", "ScrollTrigger", "TweenMax"] },
  { name: "Lenis", scriptHints: /lenis|@studio-freight/i, globals: ["Lenis", "lenis"] },
  { name: "Framer Motion", scriptHints: /framer-motion|framerusercontent/i, globals: ["FramerMotion"] },
  { name: "Swiper", scriptHints: /swiper/i, globals: ["Swiper"] },
  { name: "Lottie", scriptHints: /lottie|bodymovin/i, globals: ["lottie", "bodymovin"] },
  { name: "Three.js", scriptHints: /three(\.min)?\.js|three\.module/i, globals: ["THREE"] },
  { name: "Locomotive Scroll", scriptHints: /locomotive-scroll/i, globals: ["LocomotiveScroll"] },
  { name: "Barba.js", scriptHints: /barba/i, globals: ["barba", "Barba"] },
  { name: "AOS", scriptHints: /\baos\b|animate-on-scroll/i, globals: ["AOS"] },
  { name: "Splitting.js", scriptHints: /splitting/i, globals: ["Splitting"] },
  { name: "ScrollMagic", scriptHints: /scrollmagic/i, globals: ["ScrollMagic"] },
  { name: "Rive", scriptHints: /rive-(js|react)|@rive-app/i, globals: ["rive"] }
];

/** Detect animation libraries from script srcs and present window globals. */
export function detectAnimationLibraries(scripts: string[], globals: string[]): string[] {
  const globalSet = new Set(globals);
  const found = new Set<string>();
  for (const sig of LIBRARY_SIGNATURES) {
    if (scripts.some((src) => sig.scriptHints.test(src))) found.add(sig.name);
    else if (sig.globals.some((g) => globalSet.has(g))) found.add(sig.name);
  }
  return [...found].sort();
}

// --- Draft generation -------------------------------------------------------

export type DonorDraftData = {
  siteSlug: string;
  donorName: string;
  donorUrl: string;
  capturedAt: string;
  pages: PageEntry[];
  tokens: DonorTokens;
  libraries: string[];
  assetCount: number;
  fontFamilies: string[];
  sectionCount: number;
  cookieBannerHandled: boolean | null;
};

function replaceFieldLine(markdown: string, label: string, value: string): string {
  const lines = markdown.split("\n");
  const index = lines.findIndex((line) => line.trim().toLowerCase() === label.toLowerCase());
  if (index >= 0) lines[index] = `${label} ${value}`;
  return lines.join("\n");
}

function autoEvidenceSection(data: DonorDraftData): string {
  const pageList = data.pages.length
    ? data.pages.map((p) => `- \`${p.path}\` — ${p.label || "(no label)"} [${p.area}]`).join("\n")
    : "- (no same-origin nav links harvested)";
  const colorList = data.tokens.colors.slice(0, 10).map((c) => `${c.value} (${c.count})`).join(", ") || "(none)";
  const libs = data.libraries.length ? data.libraries.join(", ") : "none detected via script/global signatures";

  return [
    "",
    "## Auto-Captured Evidence",
    "",
    `Auto-drafted by \`blueprint capture\` on ${data.capturedAt}. Mechanical fields are pre-filled; every`,
    "field below is a starting point the builder must verify against the screenshots and video.",
    "",
    `- Sections captured: ${data.sectionCount} (see \`references/reference-first/sections/\`)`,
    `- Assets inventoried: ${data.assetCount} (see \`extraction/assets.json\`, all reference-only until replaced)`,
    `- Fonts loaded: ${data.fontFamilies.length ? data.fontFamilies.join(", ") : "(none detected)"}`,
    `- Animation libraries: ${libs}`,
    `- Dominant colors (by frequency): ${colorList}`,
    `- Heading font: ${data.tokens.fonts.heading ?? "(unknown)"} · Body font: ${data.tokens.fonts.body ?? "(unknown)"}`,
    `- Type scale (px, desc): ${data.tokens.typeScale.join(", ") || "(none)"}`,
    "",
    "### Harvested page inventory (verify + set per-page status in section 1)",
    "",
    pageList,
    ""
  ].join("\n");
}

/**
 * Draft clone-plan.md from the template with mechanical fields pre-filled.
 * IMPORTANT: the `Decision:` line in section 6 is intentionally left blank. Filling it
 * is agent judgment; leaving it blank keeps the existing clone-plan concreteness gate
 * meaningful (capture never auto-passes a gate). A suggested stack is offered as a hint.
 */
export function draftClonePlan(templateText: string, data: DonorDraftData): string {
  let md = templateText.replaceAll("{{siteSlug}}", data.siteSlug);
  md = replaceFieldLine(md, "Primary donor:", data.donorName);
  md = replaceFieldLine(md, "Donor URL:", data.donorUrl);
  md = replaceFieldLine(md, "Status: draft | complete", "-> draft (auto-captured; agent must verify)");

  const suggestedStack = data.libraries.length
    ? `Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind, plus the donor's detected motion stack (${data.libraries.join(", ")}) or the smallest equivalent.`
    : "Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind with CSS transitions and a small IntersectionObserver layer. No GSAP/Three.js/CMS detected on the donor.";

  // Insert the suggestion right after the blank Decision: line, without satisfying the gate.
  md = md.replace(/(\nDecision:\s*\n)/, `\nDecision:\n\n> ${suggestedStack}\n`);

  return `${md}\n${autoEvidenceSection(data)}`;
}

/** Draft topology.md from the template with mechanical fields pre-filled. */
export function draftTopology(templateText: string, data: DonorDraftData): string {
  let md = templateText.replaceAll("{{siteSlug}}", data.siteSlug);
  md = replaceFieldLine(md, "Primary donor:", data.donorName);
  md = replaceFieldLine(md, "Donor URL:", data.donorUrl);
  md = replaceFieldLine(md, "Captured:", data.capturedAt);

  const colorRhythm = data.tokens.colors.slice(0, 6).map((c) => c.value).join(", ") || "(see tokens.json)";
  const typeScale = data.tokens.typeScale.join(" / ") || "(see tokens.json)";
  const libs = data.libraries.length ? data.libraries.join(", ") : "none detected (likely CSS/IO-driven motion)";

  const mechanical = [
    "",
    "## Auto-Captured Mechanical Facts",
    "",
    `Auto-drafted by \`blueprint capture\` on ${data.capturedAt}. Verify against the captured screenshots and video.`,
    "",
    `- Sections detected: ${data.sectionCount}`,
    `- Heading font: ${data.tokens.fonts.heading ?? "(unknown)"}`,
    `- Body font: ${data.tokens.fonts.body ?? "(unknown)"}`,
    `- Type scale (px): ${typeScale}`,
    `- Color rhythm (dominant): ${colorRhythm}`,
    `- Section spacing rhythm (px): ${data.tokens.spacing.join(", ") || "(see tokens.json)"}`,
    `- Interaction/motion stack: ${libs}`,
    `- Same-origin pages found: ${data.pages.length}`,
    "",
    "## Moves To Borrow",
    "",
    "> AGENT: name the exact 3-5 moves to borrow after watching `donor-motion.webm`. This is judgment, not mechanical.",
    ""
  ].join("\n");

  return `${md}\n${mechanical}`;
}

// ---------------------------------------------------------------------------
// Browser orchestration
// ---------------------------------------------------------------------------

export type CaptureDonorResult = {
  slug: string;
  donorUrl: string;
  referenceDir: string;
  viewportsCaptured: string[];
  sectionCount: number;
  assetCount: number;
  pageCount: number;
  libraries: string[];
  cookieBannerHandled: boolean;
  tokens: DonorTokens;
};

async function loadTemplate(name: string): Promise<string> {
  return readFile(path.join(rootDir, "factory/templates", name), "utf8");
}

export async function captureDonor(
  slug: string,
  donorUrl: string,
  options: { pages?: number; capturedAt?: string } = {}
): Promise<CaptureDonorResult> {
  const capturedAt = options.capturedAt ?? new Date().toISOString();
  const referenceDir = path.join(rootDir, "sites", slug, "references", "reference-first");
  const sectionsDir = path.join(referenceDir, "sections");
  const extractionDir = path.join(referenceDir, "extraction");
  await mkdir(sectionsDir, { recursive: true });
  await mkdir(extractionDir, { recursive: true });

  const browser = await chromium.launch();
  const viewportsCaptured: string[] = [];
  let cookieBannerHandled = false;
  let harvest: RawStyleHarvest = {
    colorCounts: {},
    headingFonts: [],
    bodyFonts: [],
    uiFonts: [],
    fontSizesPx: [],
    sectionPaddingsPx: [],
    radiiPx: [],
    shadows: []
  };
  let rawLinks: RawLink[] = [];
  let assets: unknown[] = [];
  let fontFamilies: string[] = [];
  let animationHints: Record<string, unknown> = {};
  let libraries: string[] = [];
  let sectionCount = 0;

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await context.newPage();
    await installEvalShim(page);

    await resilientGoto(page, donorUrl);
    cookieBannerHandled = await dismissCookieConsent(page);
    await autoScroll(page);

    // Full-page screenshots at every viewport (canonical aliases for the existing gate).
    for (const viewport of CAPTURE_VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await resilientGoto(page, donorUrl);
      if (!cookieBannerHandled) cookieBannerHandled = await dismissCookieConsent(page);
      await autoScroll(page);
      await page.screenshot({ path: path.join(referenceDir, `donor-${viewport.name}.png`), fullPage: true });
      viewportsCaptured.push(viewport.name);
      if (viewport.canonical === "desktop") {
        await page.screenshot({ path: path.join(referenceDir, `${slug}-desktop.png`), fullPage: true });
      }
      if (viewport.canonical === "mobile") {
        await page.screenshot({ path: path.join(referenceDir, `${slug}-mobile.png`), fullPage: true });
      }
    }

    // Back to desktop-canonical for section shots + extraction.
    await page.setViewportSize({ width: 1440, height: 1100 });
    await resilientGoto(page, donorUrl);
    if (!cookieBannerHandled) cookieBannerHandled = await dismissCookieConsent(page);
    await autoScroll(page);

    // Per-section screenshots.
    const sectionHandles = await page.$$(
      "main > section, main > div, body > section, [data-section], section[class]"
    );
    let index = 0;
    for (const handle of sectionHandles) {
      if (index >= 20) break;
      const box = await handle.boundingBox();
      if (!box || box.height < 120 || box.width < 200) continue;
      const id = (await handle.getAttribute("id")) || (await handle.evaluate((el) => el.tagName.toLowerCase()));
      const safeId = String(id).replace(/[^a-z0-9-]+/gi, "-").slice(0, 40) || "section";
      const name = `${String(index + 1).padStart(2, "0")}-${safeId}.png`;
      try {
        await handle.screenshot({ path: path.join(sectionsDir, name) });
        index += 1;
      } catch {
        // element not screenshottable (off-screen/detached) — skip
      }
    }
    sectionCount = index;

    // Style harvest.
    harvest = await page.evaluate(() => {
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
        const bump = (key: string) => {
          if (key) colorCounts[key] = (colorCounts[key] ?? 0) + 1;
        };
        bump(cs.color);
        bump(cs.backgroundColor);
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

    // Links for the page inventory.
    rawLinks = await page.evaluate(() => {
      const out: { href: string; label: string; area: string }[] = [];
      const areaOf = (el: Element): string => {
        if (el.closest("header")) return "header";
        if (el.closest("nav")) return "nav";
        if (el.closest("footer")) return "footer";
        return "body";
      };
      for (const a of Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))) {
        out.push({ href: a.getAttribute("href") || "", label: (a.textContent || "").trim(), area: areaOf(a) });
      }
      return out;
    });

    // Copy extraction in document order.
    const copyBlocks = await page.evaluate(() => {
      const out: string[] = [];
      const nodes = document.querySelectorAll("h1, h2, h3, h4, p, li, a, button");
      for (const node of Array.from(nodes)) {
        const tag = node.tagName.toLowerCase();
        const text = (node.textContent || "").replace(/\s+/g, " ").trim();
        if (!text || text.length < 2) continue;
        if (tag === "a" || tag === "button") out.push(`- [${tag}] ${text}`);
        else if (tag.startsWith("h")) out.push(`\n${"#".repeat(Number(tag[1]) || 3)} ${text}`);
        else out.push(text);
      }
      return out.slice(0, 1200);
    });

    // Asset inventory.
    assets = await page.evaluate(() => {
      const out: Record<string, unknown>[] = [];
      for (const img of Array.from(document.querySelectorAll<HTMLImageElement>("img"))) {
        out.push({
          type: "image",
          src: img.currentSrc || img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
          alt: img.alt || "",
          referenceOnly: true
        });
      }
      for (const video of Array.from(document.querySelectorAll<HTMLVideoElement>("video"))) {
        const source = video.querySelector("source");
        out.push({
          type: "video",
          src: video.currentSrc || video.src || source?.getAttribute("src") || "",
          autoplay: video.autoplay,
          referenceOnly: true
        });
      }
      return out;
    });

    // Fonts + animation hints.
    const scriptSrcs = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]")).map((s) => s.src)
    );
    const globals = await page.evaluate(() => {
      const candidates = [
        "gsap", "ScrollTrigger", "TweenMax", "Lenis", "lenis", "FramerMotion", "Swiper",
        "lottie", "bodymovin", "THREE", "LocomotiveScroll", "barba", "Barba", "AOS",
        "Splitting", "ScrollMagic", "rive"
      ];
      return candidates.filter((name) => name in window);
    });
    fontFamilies = await page.evaluate(() => {
      const set = new Set<string>();
      try {
        (document as unknown as { fonts: FontFaceSet }).fonts.forEach((f) => set.add(f.family.replace(/^['"]|['"]$/g, "")));
      } catch {
        // document.fonts may be unavailable
      }
      return Array.from(set);
    });
    libraries = detectAnimationLibraries(scriptSrcs, globals);
    animationHints = {
      libraries,
      scriptSignals: scriptSrcs.filter((s) => /gsap|lenis|swiper|lottie|three|framer|locomotive|barba|aos|splitting|scrollmagic|rive/i.test(s)),
      globalsPresent: globals,
      hasAutoplayVideo: assets.some((a) => (a as { type?: string; autoplay?: boolean }).type === "video" && (a as { autoplay?: boolean }).autoplay),
      stickyOrFixedCount: await page.evaluate(() =>
        Array.from(document.querySelectorAll("body *")).slice(0, 4000)
          .filter((el) => ["sticky", "fixed"].includes(getComputedStyle(el).position)).length
      )
    };

    // DOM snapshot.
    const dom = await page.content();
    await writeFile(path.join(extractionDir, "dom.html"), dom, "utf8");
    await writeFile(
      path.join(extractionDir, "copy.md"),
      `# Donor Copy: ${slug}\n\nExtracted from ${donorUrl} on ${capturedAt}. Reference-only; translate to brand copy in copy-deck.md.\n\n${copyBlocks.join("\n")}\n`,
      "utf8"
    );

    // Motion capture: real scripted scroll-through + reduced-motion variant.
    await recordDonorMotion(browser, donorUrl, referenceDir, "donor-motion.webm", false);
    await recordDonorMotion(browser, donorUrl, referenceDir, "donor-motion-reduced.webm", true);

    await context.close();
  } finally {
    await browser.close();
  }

  const tokens = extractTokens(harvest);
  const pages = harvestPageInventory(rawLinks, donorUrl);

  await writeFile(path.join(extractionDir, "tokens.json"), JSON.stringify(tokens, null, 2), "utf8");
  await writeFile(path.join(extractionDir, "assets.json"), JSON.stringify(assets, null, 2), "utf8");
  await writeFile(path.join(extractionDir, "animation-hints.json"), JSON.stringify(animationHints, null, 2), "utf8");
  await writeFile(path.join(extractionDir, "pages.json"), JSON.stringify(pages, null, 2), "utf8");

  const draftData: DonorDraftData = {
    siteSlug: slug,
    donorName: safeDonorName(donorUrl),
    donorUrl,
    capturedAt,
    pages,
    tokens,
    libraries,
    assetCount: assets.length,
    fontFamilies,
    sectionCount,
    cookieBannerHandled
  };

  const clonePlanTemplate = await loadTemplate("clone-plan.template.md");
  const topologyTemplate = await loadTemplate("topology.template.md");
  await writeFile(path.join(referenceDir, "clone-plan.md"), draftClonePlan(clonePlanTemplate, draftData), "utf8");
  await writeFile(path.join(referenceDir, "topology.md"), draftTopology(topologyTemplate, draftData), "utf8");

  return {
    slug,
    donorUrl,
    referenceDir,
    viewportsCaptured,
    sectionCount,
    assetCount: assets.length,
    pageCount: pages.length,
    libraries,
    cookieBannerHandled,
    tokens
  };
}

async function recordDonorMotion(
  browser: import("@playwright/test").Browser,
  url: string,
  outputDir: string,
  fileName: string,
  reducedMotion: boolean
) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
    recordVideo: { dir: outputDir, size: { width: 1440, height: 1100 } }
  });
  const page = await context.newPage();
  await installEvalShim(page);
  await resilientGoto(page, url);
  await dismissCookieConsent(page);
  await scriptedScrollThrough(page);
  const video = page.video();
  await context.close();
  if (video) {
    const rawPath = await video.path();
    await rename(rawPath, path.join(outputDir, fileName)).catch(() => {});
  }
}

function safeDonorName(donorUrl: string): string {
  try {
    return new URL(donorUrl).hostname.replace(/^www\./, "");
  } catch {
    return donorUrl;
  }
}
