import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  detectAnimationLibraries,
  draftClonePlan,
  draftTopology,
  extractTokens,
  harvestPageInventory,
  mostCommonFamily,
  normalizeColor,
  type DonorDraftData,
  type RawStyleHarvest
} from "./capture-donor";

describe("normalizeColor", () => {
  it("converts opaque rgb to hex", () => {
    assert.equal(normalizeColor("rgb(255, 0, 0)"), "#ff0000");
  });
  it("expands short hex and lowercases", () => {
    assert.equal(normalizeColor("#ABC"), "#aabbcc");
  });
  it("keeps translucent rgba", () => {
    assert.equal(normalizeColor("rgba(0, 0, 0, 0.5)"), "rgba(0, 0, 0, 0.5)");
  });
  it("drops fully transparent colors", () => {
    assert.equal(normalizeColor("rgba(0, 0, 0, 0)"), null);
    assert.equal(normalizeColor("transparent"), null);
  });
});

describe("mostCommonFamily", () => {
  it("returns the most frequent first family, stripping quotes", () => {
    const families = ['"Playfair Display", serif', "'Playfair Display', serif", "Arial, sans-serif"];
    assert.equal(mostCommonFamily(families), "Playfair Display");
  });
  it("returns null for an empty list", () => {
    assert.equal(mostCommonFamily([]), null);
  });
});

describe("extractTokens", () => {
  const harvest: RawStyleHarvest = {
    colorCounts: { "rgb(0, 0, 0)": 10, "#FFFFFF": 5, "rgb(0,0,0)": 2, "transparent": 99 },
    headingFonts: ['"Playfair Display", serif', '"Playfair Display", serif'],
    bodyFonts: ["Inter, sans-serif"],
    uiFonts: ["Inter, sans-serif"],
    fontSizesPx: [16, 16, 48, 48.4, 24, 12],
    sectionPaddingsPx: [80, 80, 120, 40],
    radiiPx: [8, 8, 16, 0],
    shadows: ["none", "0 2px 4px rgba(0,0,0,0.1)", "0 2px 4px rgba(0,0,0,0.1)"]
  };

  it("sorts colors by frequency and merges equivalent forms", () => {
    const tokens = extractTokens(harvest);
    // rgb(0,0,0) appears 10 + 2 = 12 times -> most frequent, and transparent is dropped
    assert.equal(tokens.colors[0].value, "#000000");
    assert.equal(tokens.colors[0].count, 12);
    assert.ok(tokens.colors.every((c) => c.value !== "transparent"));
  });

  it("assigns fonts per role", () => {
    const tokens = extractTokens(harvest);
    assert.equal(tokens.fonts.heading, "Playfair Display");
    assert.equal(tokens.fonts.body, "Inter");
  });

  it("builds a descending, deduped, rounded type scale", () => {
    const tokens = extractTokens(harvest);
    assert.deepEqual(tokens.typeScale, [48, 24, 16, 12]);
  });

  it("builds ascending spacing and drops zero radii and none shadows", () => {
    const tokens = extractTokens(harvest);
    assert.deepEqual(tokens.spacing, [40, 80, 120]);
    assert.deepEqual(tokens.radii, [8, 16]);
    assert.deepEqual(tokens.shadows, ["0 2px 4px rgba(0,0,0,0.1)"]);
  });
});

describe("harvestPageInventory", () => {
  const donor = "https://example.com/";
  it("keeps same-origin pages, normalizes paths, and dedupes", () => {
    const pages = harvestPageInventory(
      [
        { href: "/about/", label: "About", area: "header" },
        { href: "https://example.com/about", label: "About Us", area: "footer" },
        { href: "https://other.com/x", label: "External", area: "header" },
        { href: "mailto:hi@example.com", label: "Mail", area: "footer" },
        { href: "/about/#team", label: "Team", area: "body" },
        { href: "/brochure.pdf", label: "PDF", area: "footer" },
        { href: "/", label: "Home", area: "header" }
      ],
      donor
    );
    const paths = pages.map((p) => p.path);
    assert.deepEqual(paths, ["/", "/about"]);
    // root sorts first; external, mailto, hash-dupe, and pdf are excluded
    assert.equal(pages[0].path, "/");
  });

  it("prefers a header label over a footer label on dedupe", () => {
    const pages = harvestPageInventory(
      [
        { href: "/stay", label: "", area: "footer" },
        { href: "/stay", label: "Stay", area: "header" }
      ],
      donor
    );
    assert.equal(pages[0].label, "Stay");
    assert.equal(pages[0].area, "header");
  });

  it("returns empty for an invalid donor url", () => {
    assert.deepEqual(harvestPageInventory([{ href: "/x", label: "X", area: "header" }], "not a url"), []);
  });
});

describe("detectAnimationLibraries", () => {
  it("detects by script src", () => {
    assert.deepEqual(
      detectAnimationLibraries(["https://cdn/gsap.min.js", "https://cdn/lenis.js"], []),
      ["GSAP", "Lenis"]
    );
  });
  it("detects by window global when no script matches", () => {
    assert.deepEqual(detectAnimationLibraries([], ["Swiper", "THREE"]), ["Swiper", "Three.js"]);
  });
  it("returns empty when nothing matches", () => {
    assert.deepEqual(detectAnimationLibraries(["https://cdn/app.js"], ["jQuery"]), []);
  });
});

function draftData(overrides: Partial<DonorDraftData> = {}): DonorDraftData {
  return {
    siteSlug: "demo",
    donorName: "example.com",
    donorUrl: "https://example.com/",
    capturedAt: "2026-07-06T00:00:00.000Z",
    pages: [
      { path: "/", url: "https://example.com/", label: "Home", area: "header" },
      { path: "/about", url: "https://example.com/about", label: "About", area: "header" }
    ],
    tokens: {
      colors: [{ value: "#000000", count: 12 }, { value: "#ffffff", count: 5 }],
      fonts: { heading: "Playfair Display", body: "Inter", ui: "Inter" },
      typeScale: [48, 24, 16],
      spacing: [40, 80, 120],
      radii: [8],
      shadows: []
    },
    libraries: ["GSAP", "Lenis"],
    assetCount: 14,
    fontFamilies: ["Playfair Display", "Inter"],
    sectionCount: 7,
    cookieBannerHandled: true,
    ...overrides
  };
}

describe("draftClonePlan", () => {
  const template = [
    "# Clone Plan: {{siteSlug}}",
    "",
    "Status: draft | complete",
    "Primary donor:",
    "Donor URL:",
    "",
    "## 6. Implementation Stack Decision",
    "",
    "Decision:",
    "",
    "## 7. Tooling Explicitly Not Needed"
  ].join("\n");

  it("fills mechanical fields and the donor identity", () => {
    const md = draftClonePlan(template, draftData());
    assert.ok(md.includes("Primary donor: example.com"));
    assert.ok(md.includes("Donor URL: https://example.com/"));
    assert.ok(md.includes("`/about` — About"));
    assert.ok(md.includes("GSAP, Lenis"));
  });

  it("does NOT satisfy the concreteness gate — Decision line stays blank for the agent", async () => {
    const { hasConcreteClonePlan } = await import("./blueprint");
    const md = draftClonePlan(template, draftData());
    assert.equal(hasConcreteClonePlan(md), false);
  });
});

describe("draftTopology", () => {
  const template = [
    "# {{siteSlug}} Reference-First Topology",
    "",
    "Primary donor:",
    "Donor URL:",
    "Captured:"
  ].join("\n");

  it("fills donor identity and mechanical facts", () => {
    const md = draftTopology(template, draftData());
    assert.ok(md.includes("Primary donor: example.com"));
    assert.ok(md.includes("Captured: 2026-07-06T00:00:00.000Z"));
    assert.ok(md.includes("Sections detected: 7"));
    assert.ok(md.includes("Playfair Display"));
  });
});
