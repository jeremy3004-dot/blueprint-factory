import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { requiredSiteFiles, slugify } from "./blueprint";

describe("slugify", () => {
  it("normalizes names into site slugs", () => {
    assert.equal(slugify("Big Mart Nepal!"), "big-mart-nepal");
  });
});

describe("requiredSiteFiles", () => {
  it("lists factory gate files", () => {
    assert.deepEqual(requiredSiteFiles("demo"), [
      "sites/demo/brief.md",
      "sites/demo/art-direction.md",
      "sites/demo/asset-log.md",
      "sites/demo/deploy.md",
      "sites/demo/qa/run-log.md",
      "sites/demo/qa/visual-review.md"
    ]);
  });
});
