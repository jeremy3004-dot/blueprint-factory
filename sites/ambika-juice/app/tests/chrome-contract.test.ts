import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path: string) => readFile(new URL(path, import.meta.url), "utf8");

test("header exposes keyboard and screen-reader menu state", async () => {
  const header = await source("../src/components/chrome/Header.tsx");
  assert.match(header, /aria-expanded=/);
  assert.match(header, /aria-controls="site-menu"/);
  assert.match(header, /aria-label="Open menu"/);
  assert.match(header, /onKeyDown=/);
  assert.match(header, /Skip to content/);
});

test("drawers have labelled dialog semantics and close controls", async () => {
  const [menu, cart] = await Promise.all([
    source("../src/components/chrome/MobileDrawer.tsx"),
    source("../src/components/chrome/VisitDrawer.tsx"),
  ]);
  assert.match(menu, /role="dialog"/);
  assert.match(menu, /aria-modal="true"/);
  assert.match(menu, /aria-label="Close menu"/);
  assert.match(cart, /role="dialog"/);
  assert.match(cart, /aria-label="Close visit details"/);
});

test("global motion contract includes reduced-motion overrides", async () => {
  const css = await source("../src/app/globals.css");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /scroll-behavior: auto/);
});

