import assert from "node:assert/strict";
import test from "node:test";

import { referenceCategories, referenceProducts } from "../src/content/onyx-reference.ts";

test("reference catalogue uses unique slugs and explicit media provenance", () => {
  assert.ok(referenceCategories.length >= 3);
  assert.equal(new Set(referenceCategories.map((category) => category.slug)).size, referenceCategories.length);
  assert.equal(new Set(referenceProducts.map((product) => product.slug)).size, referenceProducts.length);

  for (const category of referenceCategories) {
    assert.ok(category.name.trim());
  }

  for (const product of referenceProducts) {
    assert.ok(product.name.trim());
    assert.ok(referenceCategories.some((category) => category.slug === product.category));
    assert.equal(product.media.provenance, "reference-only");
    assert.ok(product.media.src.startsWith("/reference-only/"));
  }
});

test("optional product facts may be omitted without placeholder values", () => {
  const withoutPrice = referenceProducts.find((product) => product.price === undefined);
  assert.ok(withoutPrice);
  assert.equal(withoutPrice.price, undefined);
});

