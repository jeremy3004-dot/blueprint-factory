import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("reveal controller resets offscreen content and respects reduced motion", async () => {
  const source = await readFile(new URL("../src/components/motion/RevealController.tsx", import.meta.url), "utf8");
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /classList\.remove\("is-visible"\)/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /data-reveal/);
});

test("editorial and campaign copy opt into reveal motion", async () => {
  const [copy, campaign] = await Promise.all([
    readFile(new URL("../src/components/sections/SectionCopy.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/sections/CampaignGrid.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(copy, /data-reveal/);
  assert.match(campaign, /data-reveal/);
});

