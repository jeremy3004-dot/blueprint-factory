import sourceRoutes from "@/data/operator-source.json";

export type OperatorSourceFact = {
  label: string;
  value: string;
};

export type OperatorSourceItinerary = {
  day: number | null;
  title: string;
  details: string;
  ascent: string;
  distance: string;
  duration: string;
};

export type OperatorSourceRoute = {
  slug: string;
  title: string;
  updatedAt: string | null;
  minDurationDays: number | null;
  maxDurationDays: number | null;
  durationType: string;
  costUsd: number | null;
  sourceDifficulty: string;
  highestAltitudeM: number | null;
  seasonWindow: string | null;
  groupSize: string | null;
  accommodation: string | null;
  activity: string | null;
  description: string[];
  pagedescription: string | null;
  highlights: string[];
  includeItems: string[];
  excludeItems: string[];
  facts: OperatorSourceFact[];
  itinerary: OperatorSourceItinerary[];
};

export const operatorSourceRoutes = sourceRoutes as OperatorSourceRoute[];

export const operatorSourceBySlug = Object.fromEntries(
  operatorSourceRoutes.map((route) => [route.slug, route]),
) as Record<string, OperatorSourceRoute>;

export function getOperatorSourceRoute(sourceSlug?: string | null) {
  if (!sourceSlug) {
    return null;
  }

  return operatorSourceBySlug[sourceSlug] ?? null;
}
