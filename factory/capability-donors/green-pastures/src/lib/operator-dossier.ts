import type { OperatorSourceRoute } from "@/data/operator-source";
import type { TrekRoute } from "@/data/treks";
import { formatOperatorRate, formatStartingRate } from "@/lib/route-pricing";

const SOURCE_COPY_REPLACEMENTS: Array<[RegExp, string]> = [
  [/3\s*Sisters\s*GH/gi, "the operator's guesthouse"],
  [/3\s*Sisters/gi, "the operator"],
  [/\bour office\b/gi, "the operator's office"],
  [/\bour local female guides\b/gi, "local female guides"],
  [/\bour clients\b/gi, "travelers"],
  [
    /Accommodation for the duration of the trek \(2 persons per room\)\.\s*However,\s*during high season one room per two clients may not always be available\.\s*If this should happen, we request (?:our clients|travelers) to be flexible and share a triple or room with four beds\./gi,
    "Accommodation is typically arranged on a twin-share basis, though peak-season departures may occasionally require a triple or four-bed room.",
  ],
  [
    /If this should happen, we request our clients to be flexible and share a triple or room with four beds\./gi,
    "During peak season, twin rooms are not always available, so travelers may occasionally need to share a triple or four-bed room.",
  ],
  [
    /If this should happen, we request travelers to be flexible and share a triple or room with four beds\./gi,
    "During peak season, twin rooms are not always available, so travelers may occasionally need to share a triple or four-bed room.",
  ],
];

function normalizeSourceDifficulty(value: string) {
  const trimmed = sanitizeSourceCopy(value);

  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.replace(/streneous/gi, "Strenuous");
  return normalized.replace(/^./, (letter) => letter.toUpperCase());
}

export function formatSourceUpdatedAt(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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

export function getRouteDossierFacts(
  route: TrekRoute,
  source: OperatorSourceRoute | null,
) {
  const sourceDuration =
    source?.minDurationDays && source?.maxDurationDays
      ? source.minDurationDays === source.maxDurationDays
        ? `${source.minDurationDays} days`
        : `${source.minDurationDays}-${source.maxDurationDays} days`
      : source?.maxDurationDays
        ? `${source.maxDurationDays} days`
        : null;

  const facts = [
    { label: "Catalog rate", value: formatStartingRate(route.fromUsd) },
    { label: "Snapshot rate", value: formatOperatorRate(source?.costUsd) },
    sourceDuration ? { label: "Snapshot duration", value: sourceDuration } : null,
    source?.seasonWindow
      ? { label: "Snapshot season", value: sanitizeSourceCopy(source.seasonWindow) }
      : null,
    source?.groupSize
      ? { label: "Group size", value: sanitizeSourceCopy(source.groupSize) }
      : null,
    source?.accommodation
      ? { label: "Accommodation", value: sanitizeSourceCopy(source.accommodation) }
      : null,
    source?.activity
      ? { label: "Activity", value: sanitizeSourceCopy(source.activity) }
      : null,
    source?.highestAltitudeM
      ? { label: "Altitude reference", value: `${source.highestAltitudeM.toLocaleString()}m` }
      : null,
    normalizeSourceDifficulty(source?.sourceDifficulty ?? "")
      ? {
          label: "Difficulty reference",
          value: normalizeSourceDifficulty(source?.sourceDifficulty ?? "")!,
        }
      : null,
    { label: "Catalog season", value: route.bestSeasons.join(" · ") },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return facts.slice(0, 7);
}

export function getRouteNarrative(
  route: TrekRoute,
  source: OperatorSourceRoute | null,
) {
  const fromSource = source?.description?.filter(Boolean) ?? [];

  if (fromSource.length > 0) {
    return fromSource.slice(0, 3).map(sanitizeSourceCopy);
  }

  return [route.summary];
}
