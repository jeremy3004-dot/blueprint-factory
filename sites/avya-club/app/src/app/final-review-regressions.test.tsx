import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import GalleryPage from "./gallery/page";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

test("uses the Avya image logo accessibly in the shared shell", () => {
  const markup = renderToStaticMarkup(
    <>
      <SiteHeader />
      <SiteFooter />
    </>
  );

  assert.equal((markup.match(/src="\/brand\/avya-club-logo\.png"/g) ?? []).length, 2);
  assert.equal((markup.match(/alt="Avya Club"/g) ?? []).length, 2);
});

test("keeps the selected hero media matched to its copy in reduced motion", () => {
  const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

  assert.doesNotMatch(css, /\.firstLightMediaLayer:not\(:first-child\)/);
  assert.match(css, /\.firstLightMediaLayer:not\(\.isActive\)[\s\S]*?display:\s*none/);
  assert.match(css, /\.firstLightMediaLayer\.isActive[\s\S]*?display:\s*block[\s\S]*?opacity:\s*1/);
});

test("does not expose asset provenance links in the customer gallery", () => {
  const markup = renderToStaticMarkup(<GalleryPage />);

  assert.doesNotMatch(markup, />Source</);
  assert.doesNotMatch(markup, /serveravya\.onrender\.com/);
});

test("loads the declared display and body fonts from reproducible packages", () => {
  const layout = readFileSync(new URL("./layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /@fontsource-variable\/cormorant-garamond/);
  assert.match(layout, /@fontsource-variable\/space-grotesk/);
});
