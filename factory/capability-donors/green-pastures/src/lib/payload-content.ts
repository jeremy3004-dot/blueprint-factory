import config from "@payload-config";
import { getPayload } from "payload";

import { guideProfiles, type GuideProfile } from "@/data/guides";
import {
  getOperatorSourceRoute as getStaticOperatorSourceRoute,
  operatorSourceRoutes,
  type OperatorSourceRoute,
} from "@/data/operator-source";
import { nepalPhotoLibrary } from "@/data/nepal-photo-library";
import {
  featuredTreks as staticFeaturedTreks,
  getTrekBySlug as getStaticTrekBySlug,
  trekRoutes,
  type TrekRoute,
} from "@/data/treks";
import { payloadConfigured } from "@/lib/payload-env";

export type PhotoLibraryItem = {
  key: keyof typeof nepalPhotoLibrary | string;
  label: string;
  src: string;
  alt?: string;
  credit?: string;
};

function listValues<T extends { value?: string }>(items?: T[] | null) {
  return items?.flatMap((item) => (item.value ? [item.value] : [])) ?? [];
}

async function getPayloadClient() {
  if (!payloadConfigured()) {
    return null;
  }

  try {
    return await getPayload({ config });
  } catch (error) {
    console.warn("Payload content unavailable; using static content fallback.", error);
    return null;
  }
}

function mapTrekDocument(doc: Record<string, any>): TrekRoute {
  return {
    slug: doc.slug,
    name: doc.name,
    region: doc.region,
    durationDays: doc.durationDays,
    maxAltitudeM: doc.maxAltitudeM,
    difficulty: doc.difficulty,
    bestSeasons: listValues(doc.bestSeasons),
    permits: listValues(doc.permits),
    access: listValues(doc.access),
    signature: doc.signature,
    summary: doc.summary,
    stayStyle: doc.stayStyle,
    fromUsd: doc.fromUsd ?? null,
    image: doc.image,
    bundle: doc.bundle ?? {},
    highlights: listValues(doc.highlights),
    prep: listValues(doc.prep),
    sourceSlug: doc.sourceSlug ?? undefined,
  };
}

function mapGuideDocument(doc: Record<string, any>): GuideProfile {
  return {
    slug: doc.slug,
    name: doc.name,
    title: doc.title,
    focus: doc.focus,
    gender: doc.gender,
    languages: listValues(doc.languages),
    specialties: listValues(doc.specialties),
    image: doc.image,
    bio: doc.bio,
  };
}

function mapOperatorSourceDocument(doc: Record<string, any>): OperatorSourceRoute {
  return {
    slug: doc.slug,
    title: doc.title,
    updatedAt: doc.sourceUpdatedAt ?? null,
    minDurationDays: doc.minDurationDays ?? null,
    maxDurationDays: doc.maxDurationDays ?? null,
    durationType: doc.durationType ?? "",
    costUsd: doc.costUsd ?? null,
    sourceDifficulty: doc.sourceDifficulty ?? "",
    highestAltitudeM: doc.highestAltitudeM ?? null,
    seasonWindow: doc.seasonWindow ?? null,
    groupSize: doc.groupSize ?? null,
    accommodation: doc.accommodation ?? null,
    activity: doc.activity ?? null,
    description: listValues(doc.description),
    pagedescription: doc.pagedescription ?? null,
    highlights: listValues(doc.highlights),
    includeItems: listValues(doc.includeItems),
    excludeItems: listValues(doc.excludeItems),
    facts: doc.facts ?? [],
    itinerary: doc.itinerary ?? [],
  };
}

export async function getPayloadTreks() {
  const payload = await getPayloadClient();

  if (!payload) {
    return trekRoutes;
  }

  const result = await payload.find({
    collection: "treks",
    depth: 0,
    limit: 200,
    sort: "name",
  });

  return result.docs.map(mapTrekDocument);
}

export async function getPayloadFeaturedTreks(limit = 6) {
  const treks = await getPayloadTreks();
  return treks.slice(0, limit) || staticFeaturedTreks;
}

export async function getPayloadTrekBySlug(slug: string) {
  const payload = await getPayloadClient();

  if (!payload) {
    return getStaticTrekBySlug(slug);
  }

  const result = await payload.find({
    collection: "treks",
    depth: 0,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs[0] ? mapTrekDocument(result.docs[0]) : getStaticTrekBySlug(slug);
}

export async function getPayloadGuides() {
  const payload = await getPayloadClient();

  if (!payload) {
    return guideProfiles;
  }

  const result = await payload.find({
    collection: "guides",
    depth: 0,
    limit: 100,
    sort: "name",
  });

  return result.docs.map(mapGuideDocument);
}

export async function getPayloadPhotos() {
  const payload = await getPayloadClient();

  if (!payload) {
    return Object.entries(nepalPhotoLibrary).map(([key, src]) => ({
      key,
      label: key,
      src,
    }));
  }

  const result = await payload.find({
    collection: "photos",
    depth: 0,
    limit: 200,
    sort: "label",
  });

  return result.docs.map((doc) => ({
    key: doc.key,
    label: doc.label,
    src: doc.src,
    alt: doc.alt ?? undefined,
    credit: doc.credit ?? undefined,
  }));
}

export async function getPayloadOperatorSources() {
  const payload = await getPayloadClient();

  if (!payload) {
    return operatorSourceRoutes;
  }

  const result = await payload.find({
    collection: "operator-sources",
    depth: 0,
    limit: 300,
    sort: "title",
  });

  return result.docs.map(mapOperatorSourceDocument);
}

export async function getPayloadOperatorSourceRoute(slug?: string | null) {
  if (!slug) {
    return null;
  }

  const payload = await getPayloadClient();

  if (!payload) {
    return getStaticOperatorSourceRoute(slug);
  }

  const result = await payload.find({
    collection: "operator-sources",
    depth: 0,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs[0]
    ? mapOperatorSourceDocument(result.docs[0])
    : getStaticOperatorSourceRoute(slug);
}
