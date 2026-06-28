import { routeOptions } from "@/data/ops-demo";
import type { BookingFormValues, OpsDashboard } from "@/lib/ops-types";

export type AssistedBookingDraft = Partial<BookingFormValues>;

export type AssistedGuideDraft = {
  name?: string;
  role?: string;
  regions?: string[];
  languages?: string[];
  certifications?: string[];
};

function plural(count: number, singular: string, pluralLabel = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralLabel}`;
}

function splitList(value: string) {
  return value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const blockedGuidePattern = /\b(male|man|men|boy|boys|mixed[\s-]?team|mixed[\s-]?gender)\b/i;

export function isWomenOnlyGuideText(value: string) {
  return !blockedGuidePattern.test(value);
}

export function sanitizeWomenGuideText(value: string, fallback: string) {
  if (!value.trim() || !isWomenOnlyGuideText(value)) return fallback;

  return value.toLowerCase().includes("women") ? value : `Women-only ${value}`;
}

export function validRouteSlug(value: string) {
  return routeOptions.some((route) => route.slug === value);
}

function fieldAfter(text: string, labels: string[]) {
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\s*[:\\-]\\s*([^\\n;]+)`, "i");
    const match = text.match(pattern)?.[1]?.trim();

    if (match) return match;

    const loosePattern = new RegExp(`${label}\\s+([^,.;\\n]+)`, "i");
    const looseMatch = text.match(loosePattern)?.[1]?.trim();

    if (looseMatch) return looseMatch;
  }

  return "";
}

function detectRouteSlug(text: string) {
  const normalized = text.toLowerCase();
  const direct = routeOptions.find(
    (route) =>
      normalized.includes(route.slug.replace(/-/g, " ")) ||
      normalized.includes(route.name.toLowerCase()),
  );

  return direct?.slug;
}

function detectEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
}

function detectGroupSize(text: string) {
  return (
    text.match(/(?:group|party|women|travelers|trekkers)\D{0,12}(\d{1,2})/i)?.[1] ??
    text.match(/(\d{1,2})\s+(?:women|travelers|trekkers|friends)/i)?.[1]
  );
}

export function inferBookingDraft(text: string): AssistedBookingDraft {
  const fullName = fieldAfter(text, ["name", "traveler", "woman traveler", "client"]);
  const departureWindow = fieldAfter(text, ["departure", "window", "dates", "season"]);
  const style = fieldAfter(text, ["style", "trip style", "pace"]);
  const addons = fieldAfter(text, ["addons", "add-ons", "support"]);

  return {
    fullName,
    email: detectEmail(text) ?? "",
    departureWindow,
    routeSlug: detectRouteSlug(text) ?? "",
    groupSize: fieldAfter(text, ["group size", "group", "travelers"]) || detectGroupSize(text) || "",
    style,
    addons: addons ? splitList(addons) : [],
    notes: text.trim(),
  };
}

export function inferGuideDraft(text: string): AssistedGuideDraft {
  const role = sanitizeWomenGuideText(
    fieldAfter(text, ["role", "title", "position"]),
    "Women-only trekking guide",
  );
  const regions = splitList(fieldAfter(text, ["regions", "routes", "specialties", "areas"])).filter(
    isWomenOnlyGuideText,
  );
  const languages = splitList(fieldAfter(text, ["languages", "speaks"])).filter(
    isWomenOnlyGuideText,
  );
  const certifications = splitList(fieldAfter(text, ["certifications", "certs", "licenses"])).filter(
    isWomenOnlyGuideText,
  );

  return {
    name: fieldAfter(text, ["name", "guide"]),
    role,
    regions,
    languages,
    certifications: certifications.length ? certifications : ["Licensed women trekking guide"],
  };
}

export function generateOpsBrief(dashboard: OpsDashboard) {
  const firstContact = dashboard.bookings.filter(
    (booking) => booking.pipelineStage === "first_contact",
  );
  const scheduled = dashboard.bookings.filter((booking) => booking.pipelineStage === "scheduled");
  const unassignedTrips = dashboard.trips.filter(
    (trip) => trip.assignedGuides.length === 0 && trip.status !== "cancelled",
  );
  const activeGuides = dashboard.guides.filter((guide) => guide.active);

  const lines = [
    `${dashboard.tenantName} ops brief: ${plural(firstContact.length, "first-contact women traveler lead")}, ${plural(dashboard.trips.length, "women-only departure")} on the board, and ${plural(activeGuides.length, "active women guide")}.`,
  ];

  if (dashboard.conflicts.length > 0) {
    lines.push(
      `Resolve ${plural(dashboard.conflicts.length, "women guide coverage watch item")} before confirming more departures.`,
    );
  }

  if (unassignedTrips.length > 0) {
    lines.push(
      `Match women guides for ${unassignedTrips
        .slice(0, 3)
        .map((trip) => trip.name)
        .join(", ")}.`,
    );
  }

  if (firstContact.length > 0) {
    lines.push(
      `Reply to ${firstContact
        .slice(0, 3)
        .map((booking) => `${booking.fullName} about ${booking.departureWindow}`)
        .join("; ")} with pacing, altitude, and women guide reassurance.`,
    );
  }

  if (scheduled.length > 0) {
    lines.push(
      `Scheduled women-only departures need permit, lodge, transport, and emergency-contact checks next.`,
    );
  }

  if (lines.length === 1) {
    lines.push("No urgent operational gaps are visible. Keep the women guide calendar current.");
  }

  return lines.join(" ");
}
