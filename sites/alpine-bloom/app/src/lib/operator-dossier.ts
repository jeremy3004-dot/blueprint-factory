import type { TrekRoute } from "../data/green-pastures.ts";
import type { OperatorSourceRoute } from "../data/operator-source.ts";
import { formatSnapshotRate, formatStartingRate } from "./route-pricing.ts";

const SOURCE_COPY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Green Pastures/gi, "Alpine Bloom"],
  [/3\s*Sisters\s*GH/gi, "the lodge partner"],
  [/3\s*Sisters/gi, "the women-led operator"],
  [/\bour office\b/gi, "the Alpine Bloom desk"],
  [/\bour local female guides\b/gi, "local women guides"],
  [/\bour clients\b/gi, "travelers"],
  [/\bmale assistant\b/gi, "women assistant guide"],
  [/\bmale assistants\b/gi, "women assistant guides"],
  [/\bmen\b/gi, "travelers"],
  [/\bman\b/gi, "traveler"],
];

function normalizeSourceDifficulty(value: string) {
  const trimmed = sanitizeSourceCopy(value);
  if (!trimmed) return null;
  const normalized = trimmed.replace(/streneous/gi, "Strenuous");
  return normalized.replace(/^./, (letter) => letter.toUpperCase());
}

function formatSourceDate(value: string | null) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function sanitizeSourceCopy(value: string) {
  let sanitized = value.trim();

  for (const [pattern, replacement] of SOURCE_COPY_REPLACEMENTS) {
    sanitized = sanitized.replace(pattern, replacement);
  }

  return sanitized.replace(/\s+/g, " ").trim();
}

export function getSanitizedSourceItems(items: string[], fallback: string[]) {
  const selected = items.length > 0 ? items : fallback;
  return selected.map(sanitizeSourceCopy).filter(Boolean);
}

export function getSourceUpdatedLabel(source: OperatorSourceRoute | null) {
  const formatted = formatSourceDate(source?.updatedAt ?? null);
  return formatted ? `Source snapshot updated ${formatted}` : "Source snapshot pending refresh";
}

export function getRouteDossierFacts(route: TrekRoute, source: OperatorSourceRoute | null) {
  const sourceDuration =
    source?.minDurationDays && source?.maxDurationDays
      ? source.minDurationDays === source.maxDurationDays
        ? `${source.minDurationDays} days`
        : `${source.minDurationDays}-${source.maxDurationDays} days`
      : source?.maxDurationDays
        ? `${source.maxDurationDays} days`
        : null;

  return [
    { label: "Alpine Bloom rate", value: formatStartingRate(route.fromUsd) },
    { label: "Snapshot rate", value: formatSnapshotRate(source?.costUsd) },
    sourceDuration ? { label: "Snapshot duration", value: sourceDuration } : null,
    source?.seasonWindow
      ? { label: "Snapshot season", value: sanitizeSourceCopy(source.seasonWindow) }
      : null,
    source?.groupSize ? { label: "Group size", value: sanitizeSourceCopy(source.groupSize) } : null,
    source?.accommodation
      ? { label: "Accommodation", value: sanitizeSourceCopy(source.accommodation) }
      : null,
    source?.highestAltitudeM
      ? { label: "Altitude reference", value: `${source.highestAltitudeM.toLocaleString()}m` }
      : null,
    normalizeSourceDifficulty(source?.sourceDifficulty ?? "")
      ? { label: "Difficulty reference", value: normalizeSourceDifficulty(source?.sourceDifficulty ?? "")! }
      : null,
    { label: "Catalog season", value: route.bestSeasons.join(" / ") },
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

export function getRouteNarrative(route: TrekRoute, source: OperatorSourceRoute | null) {
  const fromSource = source?.description?.filter(Boolean) ?? [];
  if (fromSource.length) return fromSource.slice(0, 3).map(sanitizeSourceCopy);
  return [route.summary];
}
