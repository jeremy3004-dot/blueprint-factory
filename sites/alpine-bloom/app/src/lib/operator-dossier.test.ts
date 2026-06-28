import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeSourceCopy } from "./operator-dossier.ts";
import { operatorSourceRoutes } from "../data/operator-source.ts";

test("sanitizes donor and male-coded source copy for Alpine Bloom", () => {
  assert.equal(
    sanitizeSourceCopy("Green Pastures uses our local female guides and male assistants."),
    "Alpine Bloom uses local women guides and women assistant guides.",
  );
  assert.equal(
    sanitizeSourceCopy("3 Sisters GH is near our office for our clients."),
    "the lodge partner is near the Alpine Bloom desk for travelers.",
  );
  assert.equal(sanitizeSourceCopy("male assistant and male assistants"), "women assistant guide and women assistant guides");
});

test("source snapshot copy does not expose donor or male-coded terms", () => {
  const visibleCopy = operatorSourceRoutes
    .flatMap((route) => [
      route.title,
      route.groupSize ?? "",
      route.accommodation ?? "",
      route.activity ?? "",
      ...route.description,
      ...route.highlights,
      ...route.includeItems,
      ...route.excludeItems,
      ...route.facts.flatMap((fact) => [fact.label, fact.value]),
      ...route.itinerary.flatMap((item) => [
        item.title,
        item.details,
        item.duration ?? "",
        item.distance ?? "",
        item.ascent ?? "",
      ]),
    ])
    .map(sanitizeSourceCopy)
    .join(" ");

  assert.equal(/Green Pastures|3 Sisters|male assistant|male guide|mixed-gender|mixed team/i.test(visibleCopy), false);
});
