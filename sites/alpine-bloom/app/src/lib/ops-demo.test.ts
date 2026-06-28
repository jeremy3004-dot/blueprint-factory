import assert from "node:assert/strict";
import test from "node:test";

import {
  createDemoDashboard,
  demoDashboardWithBooking,
  demoDashboardWithBookingUpdate,
  demoDashboardWithGuide,
  demoDashboardWithGuideAssignment,
  demoDashboardWithGuideUpdate,
  demoDashboardWithoutGuideAssignment,
} from "../data/ops-demo.ts";
import type { BookingFormValues } from "./ops-types.ts";

const blockedSeedTerms = /\b(male|man|men|boy|boys|mixed[\s-]?team|mixed[\s-]?gender|masculine)\b/i;

function visibleDashboardText() {
  const dashboard = createDemoDashboard();
  return [
    dashboard.tenantName,
    ...dashboard.bookings.flatMap((booking) => [
      booking.fullName,
      booking.style,
      booking.notes ?? "",
      ...booking.addons,
    ]),
    ...dashboard.guides.flatMap((guide) => [
      guide.name,
      guide.role,
      guide.label ?? "",
      guide.focus ?? "",
      guide.bio ?? "",
      ...guide.regions,
      ...guide.languages,
      ...guide.certifications,
      ...(guide.specialties ?? []),
    ]),
    ...dashboard.trips.flatMap((trip) => [
      trip.name,
      trip.notes ?? "",
      ...trip.assignedGuides.flatMap((guide) => [guide.guideName, guide.role]),
    ]),
    ...dashboard.conflicts.map((conflict) => conflict.reason),
  ].join(" ");
}

test("demo seed data remains women-only and operationally complete", () => {
  const dashboard = createDemoDashboard();

  assert.equal(dashboard.provider, "setup-required");
  assert.ok(dashboard.guides.length >= 6);
  assert.ok(dashboard.bookings.length >= 2);
  assert.ok(dashboard.trips.length >= 2);
  assert.equal(blockedSeedTerms.test(visibleDashboardText()), false);

  for (const guide of dashboard.guides) {
    assert.equal(guide.gender, "woman");
    assert.equal(guide.active, true);
    assert.ok(guide.languages.includes("Nepali"));
    assert.ok(guide.specialties?.length);
  }
});

test("demo booking mutations create, update, and trip-hold compatible leads", () => {
  const values: BookingFormValues = {
    fullName: "Priya Sharma",
    email: "priya@example.com",
    departureWindow: "November 2026",
    routeSlug: "langtang-valley",
    groupSize: "2",
    style: "Private steady trek",
    addons: ["Nepali woman guide match"],
    notes: "Two sisters want a flight-free first Nepal trek.",
  };
  const withBooking = demoDashboardWithBooking(values, "admin");
  const booking = withBooking.bookings.find((item) => item.fullName === values.fullName);

  assert.ok(booking);
  assert.equal(booking?.source, "admin");
  assert.equal(booking?.pipelineStage, "first_contact");

  const updated = demoDashboardWithBookingUpdate(booking!.id, {
    status: "proposal_sent",
    pipelineStage: "proposal",
    notes: "Proposal sent with Langtang pacing notes.",
  });
  const updatedBooking = updated.bookings.find((item) => item.id === booking!.id);

  assert.equal(updatedBooking?.status, "proposal_sent");
  assert.equal(updatedBooking?.pipelineStage, "proposal");
  assert.match(updatedBooking?.notes ?? "", /Langtang pacing/);
});

test("demo guide assignment and removal mutate trips without duplicates", () => {
  const tripId = "trip-everest-spring";
  const guideId = "maya-sherpa";

  const assigned = demoDashboardWithGuideAssignment(tripId, guideId);
  const trip = assigned.trips.find((item) => item.id === tripId);
  const assignments = trip?.assignedGuides.filter((item) => item.guideId === guideId) ?? [];

  assert.equal(assignments.length, 1);
  assert.equal(assignments[0].guideName, "Maya Sherpa");

  const assignedAgain = demoDashboardWithGuideAssignment(tripId, guideId);
  const duplicateCheckTrip = assignedAgain.trips.find((item) => item.id === tripId);
  assert.equal(
    duplicateCheckTrip?.assignedGuides.filter((item) => item.guideId === guideId).length,
    1,
  );

  const removed = demoDashboardWithoutGuideAssignment(assignments[0].id);
  const removedTrip = removed.trips.find((item) => item.id === tripId);
  assert.equal(removedTrip?.assignedGuides.some((item) => item.guideId === guideId), false);
});

test("demo guide mutations create women guides and update existing assignments", () => {
  const created = demoDashboardWithGuide({
    name: "Kanchi Gurung",
    role: "Women-only Annapurna guide",
    regions: ["Annapurna", "Pokhara"],
    languages: ["Nepali", "English", "Gurung"],
    certifications: ["Licensed women trekking guide"],
    specialties: ["First Nepal trek"],
    active: true,
    bio: "A Nepali woman guide for supportive Annapurna departures.",
    focus: "First-trek confidence and village pacing.",
    label: "Nepali woman guide",
    avatar: "KG",
    color: "#ff16a2",
    image: "/alpine-bloom-assets/generated-photos/annapurna-women-ridge.jpg",
  });
  const guide = created.guides.find((item) => item.id === "kanchi-gurung");

  assert.equal(guide?.gender, "woman");
  assert.equal(guide?.languages.includes("Nepali"), true);

  const assigned = demoDashboardWithGuideAssignment("trip-everest-spring", "kanchi-gurung");
  const updated = demoDashboardWithGuideUpdate("kanchi-gurung", {
    name: "Kanchi Gurung Rai",
    role: "Lead women-only Annapurna guide",
  });
  const trip = updated.trips.find((item) => item.id === "trip-everest-spring");
  const assignment = trip?.assignedGuides.find((item) => item.guideId === "kanchi-gurung");

  assert.ok(assigned.guides.some((item) => item.id === "kanchi-gurung"));
  assert.equal(assignment?.guideName, "Kanchi Gurung Rai");
  assert.equal(assignment?.role, "Lead women-only Annapurna guide");
});
