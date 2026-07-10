import assert from "node:assert/strict";
import test from "node:test";

import { referenceNavigation, referenceRoutes } from "../src/content/onyx-reference.ts";

test("reference routes are unique internal paths covering every page family", () => {
  assert.equal(referenceRoutes.length, 64);
  assert.equal(new Set(referenceRoutes.map((route) => route.path)).size, referenceRoutes.length);
  assert.ok(referenceRoutes.every((route) => route.path.startsWith("/")));

  const families = new Set(referenceRoutes.map((route) => route.family));
  for (const family of ["home", "collection", "product", "editorial", "cart", "account", "policy"]) {
    assert.ok(families.has(family), `missing ${family} route family`);
  }
});

test("navigation points only to registered internal routes", () => {
  const registered = new Set(referenceRoutes.map((route) => route.path));
  for (const group of referenceNavigation) {
    assert.ok(group.label.trim());
    for (const item of group.items) {
      assert.ok(registered.has(item.href), `${item.href} is not registered`);
    }
  }
});
