import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { buildCopyDeck, copyDeckRoutes, findReferenceOnlyAssets, parseCopyRows } from "./assets";

describe("findReferenceOnlyAssets", () => {
  it("flags assets staged under a reference-only path", () => {
    const files = ["reference-only/hero.jpg", "logo.svg", "images/team.webp"];
    assert.deepEqual(findReferenceOnlyAssets(files, ""), ["reference-only/hero.jpg"]);
  });

  it("flags an asset the asset-log marks reference-only that still ships in public/", () => {
    const files = ["hero.jpg", "brand-shot.webp"];
    const log = "## Images\n- hero.jpg — donor hero, reference-only until replaced\n- brand-shot.webp — client provided, cleared";
    assert.deepEqual(findReferenceOnlyAssets(files, log), ["hero.jpg"]);
  });

  it("passes clean when nothing is reference-only", () => {
    const files = ["hero.jpg", "logo.svg"];
    const log = "## Images\n- hero.jpg — client provided\n- logo.svg — brand asset";
    assert.deepEqual(findReferenceOnlyAssets(files, log), []);
  });

  it("does not flag a reference-only log entry whose asset is absent from public/", () => {
    const files = ["hero.jpg"];
    const log = "- donor-banner.jpg — reference-only"; // not in public/
    assert.deepEqual(findReferenceOnlyAssets(files, log), []);
  });
});

describe("parseCopyRows", () => {
  it("classifies headings, CTAs, and body, skipping title/provenance", () => {
    const md = [
      "# Donor Copy: demo",
      "",
      "Extracted from https://x.com on 2026-07-06. Reference-only.",
      "",
      "## Your escape, your way",
      "Where every stay unfolds with effortless freedom.",
      "- [button] Book now",
      "- [a] Explore resorts"
    ].join("\n");
    const rows = parseCopyRows(md);
    assert.deepEqual(rows, [
      { kind: "Heading", donor: "Your escape, your way" },
      { kind: "Body", donor: "Where every stay unfolds with effortless freedom." },
      { kind: "CTA", donor: "Book now" },
      { kind: "CTA", donor: "Explore resorts" }
    ]);
  });

  it("tracks route markers when donor copy contains page sections", () => {
    const rows = parseCopyRows(["<!-- route: / -->", "## Home hero", "<!-- route: /about -->", "## About hero"].join("\n"));
    assert.deepEqual(rows.map((row) => row.route), ["/", "/about"]);
  });
});

describe("buildCopyDeck", () => {
  it("produces a two-column donor→brand table with TODO placeholders", () => {
    const md = "## Headline\nSome body copy.\n- [button] Buy";
    const deck = buildCopyDeck(md, "demo");
    assert.ok(deck.includes("# Copy Deck: demo"));
    assert.ok(deck.includes("| # | Type | Donor copy | Brand copy |"));
    assert.ok(deck.includes("| 1 | Heading | Headline | <!-- TODO --> |"));
    assert.ok(deck.includes("| 3 | CTA | Buy | <!-- TODO --> |"));
  });

  it("escapes pipes in donor copy", () => {
    const deck = buildCopyDeck("Price | value", "demo");
    assert.ok(deck.includes("Price \\| value"));
  });

  it("defaults to planned/built routes and excludes deferred route copy", () => {
    const md = ["<!-- route: / -->", "## Home", "<!-- route: /privacy -->", "## Privacy"].join("\n");
    const deck = buildCopyDeck(md, "demo", { routes: ["/"] });
    assert.ok(deck.includes("Home"));
    assert.equal(deck.includes("Privacy"), false);
  });
});

describe("copyDeckRoutes", () => {
  it("uses planned and built routes by default, with --all disabling filtering", () => {
    const pages = {
      pages: [
        { route: "/", status: "built" as const },
        { route: "/about", status: "planned" as const },
        { route: "/privacy", status: "deferred" as const }
      ]
    };
    assert.deepEqual(copyDeckRoutes(pages, false), ["/", "/about"]);
    assert.equal(copyDeckRoutes(pages, true), null);
  });
});
