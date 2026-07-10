import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { homeSections } from "../src/content/home-sections.ts";

test("homepage contract keeps the captured 20-section order", () => {
  assert.equal(homeSections.length, 20);
  assert.deepEqual(homeSections.map((section) => section.order), Array.from({ length: 20 }, (_, index) => index + 1));
  assert.equal(new Set(homeSections.map((section) => section.id)).size, 20);
});

test("every donor homepage medium is explicitly reference-only", () => {
  const media = homeSections.flatMap((section) => section.media ?? []);
  assert.ok(media.length >= 20);
  assert.ok(media.every((asset) => asset.provenance === "reference-only"));
  assert.ok(media.every((asset) => asset.src.startsWith("https://")));
});

test("homepage provides the skip-link target and all section renderers", async () => {
  const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /id="main-content"/);
  assert.match(page, /homeSections\.map/);
  assert.match(page, /FullBleedMedia/);
  assert.match(page, /EditorialSplit/);
  assert.match(page, /CampaignGrid/);
  assert.match(page, /OriginRail/);
});

