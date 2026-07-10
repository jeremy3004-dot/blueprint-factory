import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import Home from "./page";

test("renders the complete Avya first-light homepage hero", () => {
  const markup = renderToStaticMarkup(<Home />);

  assert.match(markup, /Pure energy/);
  assert.match(markup, /Deep recovery/);
  assert.match(markup, /First light/);
  assert.match(markup, /Explore membership/);
  assert.match(markup, /alt="Avya Club gym equipment"/);
});

test("renders matching copy and media labels for every selectable hero state", () => {
  const markup = renderToStaticMarkup(<Home />);

  for (const state of ["Pure energy", "Deep recovery", "First light"]) {
    assert.match(markup, new RegExp(`data-experience="${state}"`));
    assert.match(markup, new RegExp(`>${state}<`));
  }
});
