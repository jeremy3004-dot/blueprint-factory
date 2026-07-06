import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { classifyLinkStatus, isInternalLink, summarizeChecks } from "./checks";

describe("summarizeChecks", () => {
  it("passes when every non-skipped check passes", () => {
    const summary = summarizeChecks([
      { name: "typecheck", pass: true, detail: "" },
      { name: "build", pass: true, detail: "" },
      { name: "a11y-axe", pass: true, detail: "", skipped: true }
    ]);
    assert.equal(summary.allPassed, true);
    assert.equal(summary.ran, 2);
  });

  it("reports failures and ignores skipped checks", () => {
    const summary = summarizeChecks([
      { name: "typecheck", pass: true, detail: "" },
      { name: "build", pass: false, detail: "boom" },
      { name: "internal-links", pass: false, detail: "", skipped: true }
    ]);
    assert.equal(summary.allPassed, false);
    assert.deepEqual(summary.failed, ["build"]);
  });
});

describe("isInternalLink", () => {
  const base = "http://localhost:3000/";
  it("accepts same-origin page links", () => {
    assert.equal(isInternalLink("/about", base), true);
    assert.equal(isInternalLink("http://localhost:3000/stay", base), true);
  });
  it("rejects external, non-http, and asset links", () => {
    assert.equal(isInternalLink("https://example.com/x", base), false);
    assert.equal(isInternalLink("mailto:a@b.com", base), false);
    assert.equal(isInternalLink("/logo.svg", base), false);
    assert.equal(isInternalLink("tel:123", base), false);
  });
});

describe("classifyLinkStatus", () => {
  it("treats 2xx/3xx as ok and 4xx/5xx as broken", () => {
    assert.equal(classifyLinkStatus(200), "ok");
    assert.equal(classifyLinkStatus(301), "ok");
    assert.equal(classifyLinkStatus(404), "broken");
    assert.equal(classifyLinkStatus(500), "broken");
  });
});
