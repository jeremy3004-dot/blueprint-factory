import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { PNG } from "pngjs";
import {
  buildCompareReport,
  compareStructure,
  compareTokens,
  compositeSideBySide,
  detectCompareStage,
  diffByBands,
  headingStructure,
  matchPercent,
  overallMatch,
  structureScore,
  worstSections,
  type CompareReportData
} from "./compare";
import type { DonorTokens } from "./capture-donor";

describe("matchPercent", () => {
  it("is 100 when nothing differs", () => {
    assert.equal(matchPercent(0, 1000), 100);
  });
  it("is 0 when everything differs", () => {
    assert.equal(matchPercent(1000, 1000), 0);
  });
  it("is 50 at half", () => {
    assert.equal(matchPercent(500, 1000), 50);
  });
  it("guards divide-by-zero", () => {
    assert.equal(matchPercent(0, 0), 0);
  });
});

describe("overallMatch", () => {
  it("averages band matches", () => {
    assert.equal(overallMatch([{ matchPercent: 90 }, { matchPercent: 80 }]), 85);
  });
  it("is 0 for no bands", () => {
    assert.equal(overallMatch([]), 0);
  });
});

describe("worstSections", () => {
  it("returns lowest matches first, capped", () => {
    const bands = [{ matchPercent: 90 }, { matchPercent: 20 }, { matchPercent: 55 }];
    const worst = worstSections(bands, 2);
    assert.deepEqual(worst.map((b) => b.matchPercent), [20, 55]);
  });
});

function tokens(overrides: Partial<DonorTokens> = {}): DonorTokens {
  return {
    colors: [
      { value: "#000000", count: 10 },
      { value: "#ffffff", count: 8 },
      { value: "#ff0000", count: 4 }
    ],
    fonts: { heading: "Playfair Display", body: "Inter", ui: "Inter" },
    typeScale: [48, 24, 16],
    spacing: [40, 80],
    radii: [8],
    shadows: [],
    ...overrides
  };
}

describe("compareTokens", () => {
  it("computes palette overlap and font matches", () => {
    const donor = tokens();
    const build = tokens({ colors: [{ value: "#000000", count: 5 }, { value: "#00ff00", count: 3 }] });
    const cmp = compareTokens(donor, build, 3);
    // donor top3 = black/white/red; build has only black -> 1/3
    assert.equal(cmp.paletteOverlapPercent, 33.3);
    assert.deepEqual(cmp.sharedColors, ["#000000"]);
    assert.equal(cmp.headingFontMatch, true);
  });
  it("flags a font mismatch", () => {
    const cmp = compareTokens(tokens(), tokens({ fonts: { heading: "Georgia", body: "Inter", ui: "Inter" } }), 3);
    assert.equal(cmp.headingFontMatch, false);
    assert.equal(cmp.bodyFontMatch, true);
  });
});

describe("compareStructure", () => {
  it("computes section delta and heading-order match", () => {
    const cmp = compareStructure(7, 5, ["Hero", "Stay", "Dine"], ["Hero", "Stay", "Spa"]);
    assert.equal(cmp.sectionCountDelta, -2);
    // 2 of 3 headings match in order
    assert.equal(cmp.headingHierarchyMatchPercent, 66.7);
  });

  it("matches translated headings by level/order instead of exact text", () => {
    const cmp = compareStructure(3, 3, ["h1: Luxury treks", "h2: Featured journeys"], ["h1: Everest Tours", "h2: Signature departures"]);
    assert.equal(cmp.headingHierarchyMatchPercent, 100);
    assert.equal(cmp.headingTextOverlapPercent, 0);
  });
});

describe("detectCompareStage", () => {
  it("uses an explicit stage when supplied", () => {
    assert.equal(detectCompareStage("translation", ""), "translation");
  });

  it("auto-detects translation when copy deck has filled brand rows", () => {
    const deck = [
      "| # | Type | Donor copy | Brand copy |",
      "| - | ---- | ---------- | ---------- |",
      "| 1 | Heading | Donor line | Everest Tours line |"
    ].join("\n");
    assert.equal(detectCompareStage(undefined, deck), "translation");
  });

  it("defaults to clone when brand rows are still TODO", () => {
    const deck = "| 1 | Heading | Donor line | <!-- TODO --> |";
    assert.equal(detectCompareStage(undefined, deck), "clone");
  });
});

describe("structureScore", () => {
  it("scores translated synthetic bands strongly when section count and rhythm match", () => {
    const score = structureScore({
      donorSectionCount: 12,
      buildSectionCount: 12,
      bandCorrelations: [0.9, 0.85, 0.8],
      mediaAgreementPercent: 100
    });
    assert.equal(score, 97.8);
  });

  it("penalizes section-count drift and mismatched band rhythm", () => {
    const score = structureScore({
      donorSectionCount: 12,
      buildSectionCount: 8,
      bandCorrelations: [0.2, 0.1],
      mediaAgreementPercent: 50
    });
    assert.equal(score < 70, true);
  });
});

describe("headingStructure", () => {
  it("keeps only heading levels for translation-stage matching", () => {
    assert.deepEqual(headingStructure(["h1: Hero", "h2: Proof", "Plain"]), ["h1", "h2"]);
  });
});

describe("diffByBands", () => {
  it("scores identical images at 100 and inverted images low", () => {
    const w = 20;
    const h = 40;
    const white = new PNG({ width: w, height: h });
    white.data.fill(255);
    const black = new PNG({ width: w, height: h });
    black.data.fill(0);
    // set alpha to opaque for black so pixels are visibly different
    for (let i = 3; i < black.data.length; i += 4) black.data[i] = 255;

    const same = diffByBands(white, white, 4);
    assert.equal(same.bands.length, 4);
    assert.ok(same.bands.every((b) => b.matchPercent === 100));

    const diff = diffByBands(white, black, 4);
    assert.ok(diff.bands.every((b) => b.matchPercent < 50));
  });

  it("returns no bands when a dimension is zero", () => {
    const empty = new PNG({ width: 0, height: 0 });
    const real = new PNG({ width: 10, height: 10 });
    assert.deepEqual(diffByBands(empty, real, 4).bands, []);
  });
});

describe("compositeSideBySide", () => {
  it("produces a wider canvas holding both images", () => {
    const a = new PNG({ width: 30, height: 50 });
    const b = new PNG({ width: 40, height: 60 });
    const out = compositeSideBySide(a, b, 10);
    assert.equal(out.width, 30 + 10 + 40);
    assert.equal(out.height, 60);
  });
});

describe("buildCompareReport", () => {
  const data: CompareReportData = {
    slug: "demo",
    donorUrl: "https://example.com",
    previewUrl: "http://localhost:3000",
    comparedAt: "2026-07-06T00:00:00.000Z",
    stage: "clone",
    viewports: [
      {
        viewport: "desktop",
        overall: 72.5,
        bands: [
          { index: 0, label: "Section band 1 (y 0–900)", y0: 0, y1: 900, diffPixels: 100, totalPixels: 1000, matchPercent: 90 },
          { index: 1, label: "Section band 2 (y 900–1800)", y0: 900, y1: 1800, diffPixels: 800, totalPixels: 1000, matchPercent: 20 }
        ]
      },
      { viewport: "mobile", overall: 40, bands: [] }
    ],
    tokens: {
      paletteOverlapPercent: 50,
      sharedColors: ["#000000"],
      missingDonorColors: ["#ff0000"],
      headingFontMatch: true,
      bodyFontMatch: false,
      donorHeadingFont: "Playfair Display",
      buildHeadingFont: "Playfair Display"
    },
    structure: {
      donorSectionCount: 7,
      buildSectionCount: 6,
      sectionCountDelta: -1,
      donorHeadingCount: 10,
      buildHeadingCount: 9,
      headingHierarchyMatchPercent: 80,
      headingTextOverlapPercent: 30,
      structureScorePercent: 88,
      bandCorrelationPercent: 75,
      mediaAgreementPercent: 90
    }
  };

  it("puts the worst section first and separates structure from pixel match", () => {
    const md = buildCompareReport(data);
    assert.ok(md.includes("desktop: 72.5%"));
    assert.ok(md.includes("Worst Sections First"));
    // band 2 (20%) must be listed before band 1 (90%)
    const idx2 = md.indexOf("Section band 2");
    const idx1 = md.indexOf("Section band 1 (y 0–900) — 90%");
    assert.ok(idx2 > -1 && idx2 < idx1);
    assert.ok(md.includes("Structure (should stay high"));
    assert.ok(md.includes("Structure score: 88%"));
    assert.ok(md.includes("Donor-palette coverage in build: 50%"));
  });

  it("omits exact heading text overlap in translation-stage reports", () => {
    const md = buildCompareReport({ ...data, stage: "translation" });
    assert.ok(md.includes("Heading hierarchy match"));
    assert.equal(md.includes("Heading text overlap"), false);
  });
});
