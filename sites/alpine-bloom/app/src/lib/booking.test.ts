import assert from "node:assert/strict";
import test from "node:test";

import { validateBookingPayload } from "./booking.ts";

const validBooking = {
  fullName: "Maya Collins",
  email: "maya@example.com",
  departureWindow: "October 2026",
  routeSlug: "annapurna-circuit",
  groupSize: "3",
  style: "Private comfort trek",
  addons: ["Women guide match"],
  notes: "Three friends want a steady pace and altitude support.",
};

test("accepts a complete women-only trek booking payload", () => {
  const parsed = validateBookingPayload(validBooking);

  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;

  assert.deepEqual(parsed.values, validBooking);
});

test("rejects missing, malformed, and unknown booking fields", () => {
  const parsed = validateBookingPayload({
    ...validBooking,
    fullName: "A",
    email: "not-email",
    routeSlug: "unknown-route",
    departureWindow: "",
    groupSize: "",
    style: "",
    notes: "x".repeat(1501),
  });

  assert.equal(parsed.ok, false);
  if (parsed.ok) return;

  assert.deepEqual(Object.keys(parsed.issues).sort(), [
    "departureWindow",
    "email",
    "fullName",
    "groupSize",
    "notes",
    "routeSlug",
    "style",
  ]);
});

test("rejects non-object booking payloads", () => {
  assert.deepEqual(validateBookingPayload(null), {
    ok: false,
    issues: { form: "Send booking details as JSON." },
  });
});
