import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PagesFile } from "./pages";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const IMAGE_VIDEO = /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|mov)$/i;

// ---------------------------------------------------------------------------
// Reference-only asset gate (pure)
// ---------------------------------------------------------------------------

/**
 * Find reference-only assets that would ship in a production build. Two signals:
 *  1. Any public asset under a `reference-only/` segment (the staging convention).
 *  2. Any asset the asset-log marks "reference-only" that is actually present in public/.
 * `publicFiles` are paths relative to the app's public/ directory.
 */
export function findReferenceOnlyAssets(publicFiles: string[], assetLog: string): string[] {
  const offenders = new Set<string>();

  for (const file of publicFiles) {
    if (IMAGE_VIDEO.test(file) && /(^|\/)reference-only(\/|-)/i.test(file)) {
      offenders.add(file);
    }
  }

  const flagged = assetLog
    .split("\n")
    .filter((line) => /reference-only/i.test(line))
    .map((line) => line.match(/([\w./-]+\.(?:jpe?g|png|gif|webp|avif|svg|mp4|webm|mov))/i)?.[1])
    .filter((asset): asset is string => Boolean(asset));

  for (const asset of flagged) {
    const base = asset.split("/").pop()!;
    if (publicFiles.some((file) => file === asset || file.endsWith(`/${base}`) || file === base)) {
      offenders.add(asset);
    }
  }

  return [...offenders].sort();
}

async function listFilesRelative(dir: string, base = dir): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listFilesRelative(full, base)));
    } else {
      out.push(path.relative(base, full));
    }
  }
  return out;
}

/** Reference-only assets present in a site's production build (public/). Empty = clean. */
export async function checkProductionAssets(slug: string): Promise<string[]> {
  const publicDir = path.join(rootDir, "sites", slug, "app", "public");
  const publicFiles = await listFilesRelative(publicDir);
  let assetLog = "";
  try {
    assetLog = await readFile(path.join(rootDir, "sites", slug, "asset-log.md"), "utf8");
  } catch {
    assetLog = "";
  }
  return findReferenceOnlyAssets(publicFiles, assetLog);
}

// ---------------------------------------------------------------------------
// Copy deck (pure)
// ---------------------------------------------------------------------------

export type CopyRow = { kind: "Heading" | "CTA" | "Body"; donor: string; route?: string };

/** Parse an extraction/copy.md into ordered copy rows (headings, CTAs, body). */
export function parseCopyRows(copyMd: string): CopyRow[] {
  const rows: CopyRow[] = [];
  let currentRoute: string | undefined;
  const row = (kind: CopyRow["kind"], donor: string): CopyRow =>
    currentRoute ? { kind, donor, route: currentRoute } : { kind, donor };
  for (const raw of copyMd.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const routeMarker = line.match(/^<!--\s*route:\s*([^>]+?)\s*-->$/i) ?? line.match(/^##\s*Route:\s*(\S+)/i);
    if (routeMarker) {
      currentRoute = routeMarker[1].trim();
      continue;
    }
    if (line.startsWith("# ")) continue; // the file's own title
    if (/^extracted from /i.test(line)) continue; // provenance note
    const heading = line.match(/^#{2,6}\s+(.*)$/);
    if (heading) {
      rows.push(row("Heading", heading[1].trim()));
      continue;
    }
    const cta = line.match(/^-\s*\[(?:a|button)\]\s*(.*)$/i);
    if (cta) {
      rows.push(row("CTA", cta[1].trim()));
      continue;
    }
    if (line.startsWith("- [")) continue; // other tagged list markers
    rows.push(row("Body", line));
  }
  return rows;
}

/** Build a donor→brand two-column copy deck from extracted donor copy. */
export function buildCopyDeck(copyMd: string, slug: string, options: { limit?: number; routes?: string[] | null } | number = {}): string {
  const normalized = typeof options === "number" ? { limit: options, routes: null } : options;
  const routeSet = normalized.routes ? new Set(normalized.routes) : null;
  const rows = parseCopyRows(copyMd)
    .filter((row) => !routeSet || !row.route || routeSet.has(row.route))
    .slice(0, normalized.limit ?? 400);
  const lines: string[] = [];
  lines.push(`# Copy Deck: ${slug}`);
  lines.push("");
  lines.push("Donor copy on the left, brand copy on the right. Translate every line — the right column is");
  lines.push("where brand rules (tone, audience, exclusions) get applied and reviewed line by line. Never");
  lines.push("ship donor copy, names, or claims to production; replace them here first.");
  lines.push("");
  lines.push("| # | Type | Donor copy | Brand copy |");
  lines.push("| - | ---- | ---------- | ---------- |");
  rows.forEach((row, i) => {
    const donor = row.donor.replace(/\|/g, "\\|").slice(0, 300);
    lines.push(`| ${i + 1} | ${row.kind} | ${donor} | <!-- TODO --> |`);
  });
  lines.push("");
  return lines.join("\n");
}

export type CopyDeckResult = { slug: string; deckPath: string; rowCount: number };

export function copyDeckRoutes(pages: PagesFile | null, all: boolean): string[] | null {
  if (all || !pages) return null;
  return pages.pages.filter((page) => page.status === "planned" || page.status === "built").map((page) => page.route);
}

export async function runCopyDeck(slug: string, options: { all?: boolean; pages?: PagesFile | null } = {}): Promise<CopyDeckResult> {
  const copyPath = path.join(rootDir, "sites", slug, "references", "reference-first", "extraction", "copy.md");
  let copyMd: string;
  try {
    copyMd = await readFile(copyPath, "utf8");
  } catch {
    throw new Error(`No donor copy at ${path.relative(rootDir, copyPath)}. Run \`blueprint capture ${slug} <donor-url>\` first.`);
  }
  const routes = copyDeckRoutes(options.pages ?? null, Boolean(options.all));
  const rowCount = parseCopyRows(copyMd).filter((row) => !routes || !row.route || routes.includes(row.route)).length;
  const deck = buildCopyDeck(copyMd, slug, { routes });
  const deckPath = path.join(rootDir, "sites", slug, "copy-deck.md");
  await writeFile(deckPath, deck, "utf8");
  return { slug, deckPath, rowCount };
}
