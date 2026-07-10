import assert from "node:assert/strict";
import test from "node:test";

import { siteContent } from "./site";

test("uses the captured visible Pokhara contact details", () => {
  assert.equal(siteContent.contact.city, "Pokhara");
  assert.equal(siteContent.contact.email, "info@avya.club");
  assert.deepEqual(siteContent.contact.phones, ["061-590648", "9802855271"]);
});

test("defines the six approved routes", () => {
  assert.equal(siteContent.routes.length, 6);
});

test("includes the captured core services", () => {
  assert.ok(siteContent.services.some((service) => service.slug === "physiotherapy"));
  assert.ok(siteContent.services.some((service) => service.slug === "swimming-pool"));
});

test("includes source-backed membership groups", () => {
  assert.ok(siteContent.memberships.length > 0);
});
