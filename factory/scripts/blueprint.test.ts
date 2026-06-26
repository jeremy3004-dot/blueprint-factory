import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { hasNamedSignatureMoment, requiredSiteFiles, slugify } from "./blueprint";

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

describe("hasNamedSignatureMoment", () => {
  it("passes when the required section has concrete content", () => {
    const markdown = "## 3. The signature moment (required)\nA hero object rotates as the page scrolls.\n\n## 4. Motion language";
    assert.equal(hasNamedSignatureMoment(markdown), true);
  });

  it("fails when the required section is blank", () => {
    const markdown = "## 3. The signature moment (required)\n\n## 4. Motion language";
    assert.equal(hasNamedSignatureMoment(markdown), false);
  });

  it("fails when the required section only contains template guidance", () => {
    const markdown = [
      "## 3. The signature moment (required)",
      "",
      "The single interaction or visual that makes someone stop scrolling. Describe it in one sentence, concretely enough that a developer knows what to build.",
      "",
      "Examples of the right level of detail:",
      "- Example",
      "",
      "## 4. Motion language"
    ].join("\n");
    assert.equal(hasNamedSignatureMoment(markdown), false);
  });
});
