import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { isDonorShelfSlug, parseCompareScore, parsePreviewUrl, renderStatusTable, type DonorShelfRow, type SiteRow } from "./status";

describe("parseCompareScore", () => {
  it("reads desktop/mobile overall match from a report", () => {
    const md = [
      "## Overall Pixel Match",
      "",
      "- desktop: 88.4% (close)",
      "- mobile: 71.2% (loose)"
    ].join("\n");
    assert.deepEqual(parseCompareScore(md), { desktop: 88.4, mobile: 71.2 });
  });
  it("returns nulls when absent", () => {
    assert.deepEqual(parseCompareScore("no scores here"), { desktop: null, mobile: null });
  });
});

describe("parsePreviewUrl", () => {
  it("reads a recorded https preview URL", () => {
    assert.equal(parsePreviewUrl("Preview URL: https://demo-abc.vercel.app\n"), "https://demo-abc.vercel.app");
  });
  it("ignores an empty or non-URL field", () => {
    assert.equal(parsePreviewUrl("Preview URL:\n"), null);
    assert.equal(parsePreviewUrl("Preview URL: tbd\n"), null);
  });
});

describe("renderStatusTable", () => {
  it("renders client sites with scores and preview URL", () => {
    const rows: SiteRow[] = [
      { slug: "four-seasons", nextAction: "NEEDS_REFERENCE_FIRST", lastScreenshot: "2026-07-06T10:00:00.000Z", compareDesktop: 51.9, compareMobile: 27.1, previewUrl: null, pages: "single-page" },
      { slug: "demo-clone", nextAction: "RUN_BEAUTY", lastScreenshot: null, compareDesktop: null, compareMobile: null, previewUrl: "https://demo.vercel.app", pages: "2b/3p/0d" }
    ];
    const table = renderStatusTable(rows, "2026-07-06T12:00:00.000Z");
    assert.ok(table.includes("| four-seasons | NEEDS_REFERENCE_FIRST |"));
    assert.ok(table.includes("51.9% / 27.1%"));
    assert.ok(table.includes("2026-07-06")); // short date
    assert.ok(table.includes("https://demo.vercel.app"));
    assert.ok(table.includes("—")); // em-dash for missing values
  });

  it("renders donor shelf rows separately from client sites", () => {
    const rows: SiteRow[] = [
      { slug: "four-seasons", nextAction: "NEEDS_REFERENCE_FIRST", lastScreenshot: null, compareDesktop: null, compareMobile: null, previewUrl: null, pages: "single-page" }
    ];
    const donorRows: DonorShelfRow[] = [
      { slug: "donor-aman", field: "Boutique hotels", url: "https://www.aman.com", pages: "0b/8p/0d" }
    ];
    const table = renderStatusTable(rows, "2026-07-06T12:00:00.000Z", donorRows);
    assert.ok(table.includes("## Client Sites"));
    assert.ok(table.includes("## Donor Shelf"));
    assert.ok(table.includes("| donor-aman | Boutique hotels | https://www.aman.com | 0b/8p/0d |"));
    assert.ok(table.includes("reference evidence packs, not client builds"));
  });
});

describe("isDonorShelfSlug", () => {
  it("detects donor shelf slugs", () => {
    assert.equal(isDonorShelfSlug("donor-aman"), true);
    assert.equal(isDonorShelfSlug("four-seasons"), false);
  });
});
