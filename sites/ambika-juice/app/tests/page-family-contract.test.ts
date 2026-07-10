import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { referenceRoutes } from "../src/content/onyx-reference.ts";
import { routeParamsForFamily } from "../src/content/route-helpers.ts";

test("dynamic page families cover every harvested reference route", () => {
  for (const family of ["collection", "product", "editorial", "policy"] as const) {
    const expected = referenceRoutes.filter((route) => route.family === family).length;
    const params = routeParamsForFamily(family);
    assert.equal(params.length, expected, `${family} static params drifted`);
    assert.equal(new Set(params.map((param) => param.slug)).size, params.length);
  }
});

test("catalogue controls expose accessible filter and product semantics", async () => {
  const [filter, grid, detail] = await Promise.all([
    readFile(new URL("../src/components/catalogue/CategoryFilter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/catalogue/ProductGrid.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/catalogue/ProductDetail.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(filter, /aria-label="Filter products"/);
  assert.match(filter, /aria-pressed=/);
  assert.match(grid, /role="list"/);
  assert.match(detail, /aria-label="Product media"/);
});

test("cart and login routes remain non-transactional reference shells", async () => {
  const [cart, login] = await Promise.all([
    readFile(new URL("../src/app/cart/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/account/login/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(cart, /Reference-only cart state/);
  assert.match(login, /Reference-only account state/);
});

