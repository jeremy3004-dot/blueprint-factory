import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import { getVisibleItineraryItems } from "./itinerary.ts";

const require = createRequire(import.meta.url);
const sourceRoutes = require("../data/operator-source.json");

test("shows the complete Tsum Valley and Manaslu itinerary", () => {
  const route = sourceRoutes.find(
    (sourceRoute: { slug: string }) =>
      sourceRoute.slug === "mount-manaslu-trek-tsum-valleymanaslu",
  );

  assert.ok(route);
  assert.equal(route.itinerary.length, 19);
  assert.equal(route.itinerary.at(0)?.title, "Kathmandu arrival");
  assert.equal(route.itinerary.at(-1)?.title, "Kathmandu departure");
  assert.equal(getVisibleItineraryItems(route.itinerary).length, route.itinerary.length);
});
