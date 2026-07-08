import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { plainLanguageSummary } from "./verify";
import type { CompareResult } from "./compare";

const compare: CompareResult = {
  slug: "demo",
  reportPath: "sites/demo/qa/compare/report.md",
  donorFound: true,
  stage: "clone",
  headlineScore: 88.4,
  overallDesktop: 88.4,
  overallMobile: 71.2,
  worstSectionLabel: "Section band 5 (y 3600–4500)",
  worstSectionMatch: 42.1,
  structure: {
    donorSectionCount: 8,
    buildSectionCount: 7,
    sectionCountDelta: -1,
    donorHeadingCount: 12,
    buildHeadingCount: 11,
    headingHierarchyMatchPercent: 75,
    headingTextOverlapPercent: 60,
    structureScorePercent: 82,
    bandCorrelationPercent: 75,
    mediaAgreementPercent: 80
  },
  tokens: null
};

describe("plainLanguageSummary", () => {
  it("reads plainly, cites the score and worst section, and never claims production", () => {
    const summary = plainLanguageSummary(
      "demo",
      [
        { name: "typecheck", pass: true, detail: "" },
        { name: "build", pass: true, detail: "" }
      ],
      compare
    );
    assert.ok(summary.includes("88.4%"));
    assert.ok(summary.includes("Section band 5"));
    assert.ok(summary.toLowerCase().includes("nothing has been deployed to production"));
  });

  it("says so plainly when no donor is on file (not a 0% match)", () => {
    const noDonor: CompareResult = { ...compare, donorFound: false, overallDesktop: 0, overallMobile: 0 };
    const summary = plainLanguageSummary("demo", [{ name: "build", pass: true, detail: "" }], noDonor);
    assert.ok(summary.includes("No donor screenshots are on file"));
    assert.ok(!summary.includes("matches the donor at 0%"));
  });

  it("surfaces failing checks", () => {
    const summary = plainLanguageSummary(
      "demo",
      [
        { name: "typecheck", pass: true, detail: "" },
        { name: "build", pass: false, detail: "boom" }
      ],
      null
    );
    assert.ok(summary.includes("need attention"));
    assert.ok(summary.includes("build"));
  });
});
