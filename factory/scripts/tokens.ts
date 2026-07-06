import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { DonorTokens } from "./capture-donor";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ---------------------------------------------------------------------------
// Color parsing + classification (pure)
// ---------------------------------------------------------------------------

export type Rgb = { r: number; g: number; b: number };

export function parseColor(input: string): Rgb | null {
  const value = input.trim().toLowerCase();
  const hex = value.match(/^#([0-9a-f]{6})$/);
  if (hex) {
    return {
      r: parseInt(hex[1].slice(0, 2), 16),
      g: parseInt(hex[1].slice(2, 4), 16),
      b: parseInt(hex[1].slice(4, 6), 16)
    };
  }
  const rgb = value.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(",").map((p) => Number.parseFloat(p.trim()));
    if (parts.length >= 3 && parts.slice(0, 3).every((n) => !Number.isNaN(n))) {
      return { r: parts[0], g: parts[1], b: parts[2] };
    }
  }
  return null;
}

/** Perceived relative luminance (0 dark – 255 light). */
export function luminance({ r, g, b }: Rgb): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Chroma / colorfulness (0 grey – 1 vivid). Neutrals score ~0. */
export function saturation({ r, g, b }: Rgb): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

export type Palette = { background: string; foreground: string; primary: string; accent: string; muted: string; palette: string[] };

/** Classify a frequency-sorted donor color list into semantic roles. */
export function pickPalette(colors: { value: string; count: number }[]): Palette {
  const parsed = colors
    .map((c) => ({ ...c, rgb: parseColor(c.value) }))
    .filter((c): c is { value: string; count: number; rgb: Rgb } => c.rgb !== null);

  if (parsed.length === 0) {
    return { background: "#111312", foreground: "#f5f1e8", primary: "#d5b970", accent: "#79b8d1", muted: "rgba(245,241,232,0.72)", palette: [] };
  }

  // Background = the most frequent color (usually the dominant page surface).
  const background = parsed[0];
  // Foreground = the frequent color with the greatest luminance distance from the background (main text).
  const bgLum = luminance(background.rgb);
  const foreground = [...parsed]
    .sort((a, b) => Math.abs(luminance(b.rgb) - bgLum) - Math.abs(luminance(a.rgb) - bgLum))[0];
  // Primary = most saturated color (the brand accent); accent = next most saturated distinct color.
  const bySaturation = [...parsed].sort((a, b) => saturation(b.rgb) - saturation(a.rgb));
  const primary = bySaturation[0];
  const accent = bySaturation.find((c) => c.value !== primary.value) ?? primary;
  // Muted = a mid-luminance neutral, else the foreground softened.
  const muted =
    [...parsed].find((c) => saturation(c.rgb) < 0.15 && c.value !== background.value && c.value !== foreground.value)?.value ??
    foreground.value;

  return {
    background: background.value,
    foreground: foreground.value,
    primary: primary.value,
    accent: accent.value,
    muted,
    palette: parsed.slice(0, 12).map((c) => c.value)
  };
}

// ---------------------------------------------------------------------------
// Font matching (pure)
// ---------------------------------------------------------------------------

export type FontChoice = {
  role: string;
  donor: string | null;
  family: string;
  stack: string;
  source: string;
  license: string;
  substituted: boolean;
  note?: string;
};

// Fonts that are already freely usable (Google Fonts / open license) — keep as-is.
const OPEN_FONTS = new Set(
  [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Work Sans", "Nunito",
    "Source Sans Pro", "Source Serif Pro", "Raleway", "Playfair Display", "Lora", "Merriweather",
    "PT Serif", "PT Sans", "EB Garamond", "Cormorant Garamond", "Fraunces", "Libre Baskerville",
    "Jost", "Manrope", "Sora", "Space Grotesk", "DM Sans", "DM Serif Display", "Archivo",
    "Hind", "Karla", "Rubik", "Mulish", "Figtree", "Instrument Serif", "Inter Variable"
  ].map((f) => f.toLowerCase())
);

// Proprietary / licensed donor fonts → closest open equivalent + a fallback generic.
const SUBSTITUTES: Record<string, { family: string; generic: "serif" | "sans-serif"; note: string }> = {
  "sf pro display": { family: "Inter", generic: "sans-serif", note: "SF Pro is Apple-proprietary" },
  "sf pro text": { family: "Inter", generic: "sans-serif", note: "SF Pro is Apple-proprietary" },
  "sf pro": { family: "Inter", generic: "sans-serif", note: "SF Pro is Apple-proprietary" },
  "helvetica": { family: "Inter", generic: "sans-serif", note: "Helvetica is licensed" },
  "helvetica neue": { family: "Inter", generic: "sans-serif", note: "Helvetica Neue is licensed" },
  "arial": { family: "Archivo", generic: "sans-serif", note: "Arial is licensed/system" },
  "times new roman": { family: "PT Serif", generic: "serif", note: "Times New Roman is licensed/system" },
  "times": { family: "PT Serif", generic: "serif", note: "Times is licensed/system" },
  "georgia": { family: "Lora", generic: "serif", note: "Georgia is licensed/system" },
  "futura": { family: "Jost", generic: "sans-serif", note: "Futura is licensed" },
  "didot": { family: "Playfair Display", generic: "serif", note: "Didot is licensed" },
  "bodoni": { family: "Playfair Display", generic: "serif", note: "Bodoni is licensed" },
  "garamond": { family: "EB Garamond", generic: "serif", note: "Garamond is licensed/system" },
  "baskerville": { family: "Libre Baskerville", generic: "serif", note: "Baskerville is licensed/system" },
  "gill sans": { family: "Hind", generic: "sans-serif", note: "Gill Sans is licensed" },
  "canela": { family: "Fraunces", generic: "serif", note: "Canela is a commercial license" },
  "freight": { family: "Cormorant Garamond", generic: "serif", note: "Freight is a commercial license" },
  "gt sectra": { family: "Fraunces", generic: "serif", note: "GT Sectra is a commercial license" },
  "gt america": { family: "Archivo", generic: "sans-serif", note: "GT America is a commercial license" },
  "circular": { family: "Manrope", generic: "sans-serif", note: "Circular is a commercial license" },
  "graphik": { family: "Inter", generic: "sans-serif", note: "Graphik is a commercial license" }
};

const SERIF_HINT = /(serif|times|georgia|garamond|didot|bodoni|caslon|baskerville|playfair|lora|freight|canela|sectra)/i;

function genericFallback(family: string): "serif" | "sans-serif" {
  return SERIF_HINT.test(family) ? "serif" : "sans-serif";
}

/** Map a donor font to a legally-usable choice for a role (heading/body). */
export function matchFont(donorFamily: string | null, role: "heading" | "body"): FontChoice {
  const clean = donorFamily ? donorFamily.trim().replace(/^['"]|['"]$/g, "") : null;
  const key = clean ? clean.toLowerCase() : null;

  const stackOf = (family: string, generic: "serif" | "sans-serif") =>
    generic === "serif"
      ? `"${family}", Georgia, "Times New Roman", serif`
      : `"${family}", Inter, ui-sans-serif, system-ui, -apple-system, sans-serif`;

  if (!key) {
    const family = role === "heading" ? "Playfair Display" : "Inter";
    const generic = role === "heading" ? "serif" : "sans-serif";
    return { role, donor: null, family, stack: stackOf(family, generic), source: "Google Fonts", license: "open", substituted: true, note: "no donor font detected; sensible default" };
  }

  if (OPEN_FONTS.has(key)) {
    const generic = genericFallback(clean!);
    return { role, donor: clean, family: clean!, stack: stackOf(clean!, generic), source: "Google Fonts / open license", license: "open", substituted: false };
  }

  const sub = SUBSTITUTES[key];
  if (sub) {
    return { role, donor: clean, family: sub.family, stack: stackOf(sub.family, sub.generic), source: "Google Fonts", license: "open", substituted: true, note: sub.note };
  }

  // Unmapped: substitute by serif/sans heuristic and flag for human verification.
  const generic = genericFallback(clean!);
  const family = generic === "serif" ? "Lora" : "Inter";
  return { role, donor: clean, family, stack: stackOf(family, generic), source: "Google Fonts", license: "open", substituted: true, note: "unmapped donor font; verify the substitution and add it to font-substitutes.md" };
}

// ---------------------------------------------------------------------------
// Token curation
// ---------------------------------------------------------------------------

export type AppTokens = {
  generatedFrom: string;
  colors: Palette;
  fonts: { heading: FontChoice; body: FontChoice };
  typeScale: number[];
  spacing: number[];
  radii: number[];
};

export function curateTokens(donor: DonorTokens, source = "extraction/tokens.json"): AppTokens {
  return {
    generatedFrom: source,
    colors: pickPalette(donor.colors),
    fonts: { heading: matchFont(donor.fonts.heading, "heading"), body: matchFont(donor.fonts.body, "body") },
    typeScale: donor.typeScale.slice(0, 8),
    spacing: donor.spacing.slice(0, 8),
    radii: donor.radii.slice(0, 6)
  };
}

/** The CSS custom-property block the site template injects at :root. */
export function tokensToCssVars(tokens: AppTokens): string {
  return [
    ":root {",
    `  --color-background: ${tokens.colors.background};`,
    `  --color-foreground: ${tokens.colors.foreground};`,
    `  --color-primary: ${tokens.colors.primary};`,
    `  --color-accent: ${tokens.colors.accent};`,
    `  --color-muted: ${tokens.colors.muted};`,
    `  --font-heading: ${tokens.fonts.heading.stack};`,
    `  --font-body: ${tokens.fonts.body.stack};`,
    "}"
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

export type TokensResult = { slug: string; tokensPath: string; tokens: AppTokens; fontDecisions: FontChoice[] };

export async function runTokens(slug: string): Promise<TokensResult> {
  const siteDir = path.join(rootDir, "sites", slug);
  const donorTokensPath = path.join(siteDir, "references", "reference-first", "extraction", "tokens.json");

  let donor: DonorTokens;
  try {
    donor = JSON.parse(await readFile(donorTokensPath, "utf8")) as DonorTokens;
  } catch {
    throw new Error(
      `No donor tokens at ${path.relative(rootDir, donorTokensPath)}. Run \`blueprint capture ${slug} <donor-url>\` first.`
    );
  }

  const tokens = curateTokens(donor);
  const appDir = path.join(siteDir, "app");
  await mkdir(appDir, { recursive: true });
  const tokensPath = path.join(appDir, "tokens.json");
  await writeFile(tokensPath, `${JSON.stringify(tokens, null, 2)}\n`, "utf8");
  // Keep an immutable donor snapshot so brand translation can diff donor vs brand later.
  await writeFile(path.join(appDir, "tokens.donor.json"), `${JSON.stringify(tokens, null, 2)}\n`, "utf8");

  // Record font decisions in the asset log.
  const fontDecisions = [tokens.fonts.heading, tokens.fonts.body];
  const assetLogPath = path.join(siteDir, "asset-log.md");
  const block = [
    "",
    `### Font decisions (blueprint tokens, ${new Date().toISOString()})`,
    "",
    ...fontDecisions.map(
      (f) =>
        `- ${f.role[0].toUpperCase()}${f.role.slice(1)}: donor \`${f.donor ?? "none"}\` → **${f.family}** ` +
        `(${f.substituted ? "substituted" : "kept — already open"}; ${f.source}; license: ${f.license})` +
        `${f.note ? ` — ${f.note}` : ""}`
    ),
    "",
    "See `factory/qa/font-substitutes.md` for the substitution rationale.",
    ""
  ].join("\n");
  await appendFile(assetLogPath, block).catch(() => {});

  return { slug, tokensPath, tokens, fontDecisions };
}
