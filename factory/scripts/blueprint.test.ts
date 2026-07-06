import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  hasConcreteClonePlan,
  hasNamedSignatureMoment,
  hasPassingVisualReview,
  nextActionForStatus,
  requiredReferenceFirstFiles,
  requiredSiteFiles,
  slugify
} from "./blueprint";

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

describe("requiredReferenceFirstFiles", () => {
  it("requires donor screenshots, topology, and clone implementation planning", () => {
    assert.deepEqual(requiredReferenceFirstFiles("demo"), [
      "sites/demo/references/reference-first/topology.md",
      "sites/demo/references/reference-first/clone-plan.md"
    ]);
  });
});

describe("hasConcreteClonePlan", () => {
  it("fails when the implementation stack decision is still blank", () => {
    const markdown = [
      "# Clone Plan: demo",
      "",
      "## 6. Implementation Stack Decision",
      "",
      "Decision:",
      "",
      "## 7. Tooling Explicitly Not Needed"
    ].join("\n");

    assert.equal(hasConcreteClonePlan(markdown), false);
  });

  it("passes when the clone plan names a concrete build stack", () => {
    const markdown = [
      "# Clone Plan: demo",
      "",
      "## 6. Implementation Stack Decision",
      "",
      "Decision: Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions and a tiny IntersectionObserver layer for scroll reveals.",
      "",
      "## 7. Tooling Explicitly Not Needed"
    ].join("\n");

    assert.equal(hasConcreteClonePlan(markdown), true);
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

describe("nextActionForStatus", () => {
  it("creates missing sites first", () => {
    assert.equal(
      nextActionForStatus({
        exists: false,
        missingFiles: [],
        referenceReady: false,
        artReady: false,
        appExists: false,
        screenshotsReady: false,
        motionReady: false,
        pagesReady: false,
        beautyReady: false
      }),
      "CREATE_SITE"
    );
  });

  it("stops for art direction before build work", () => {
    assert.equal(
      nextActionForStatus({
        exists: true,
        missingFiles: [],
        referenceReady: true,
        artReady: false,
        appExists: true,
        screenshotsReady: false,
        motionReady: false,
        pagesReady: false,
        beautyReady: false
      }),
      "NEEDS_ART_DIRECTION"
    );
  });

  it("stops for reference-first research before art direction", () => {
    assert.equal(
      nextActionForStatus({
        exists: true,
        missingFiles: [],
        referenceReady: false,
        artReady: false,
        appExists: true,
        screenshotsReady: false,
        motionReady: false,
        pagesReady: false,
        beautyReady: false
      }),
      "NEEDS_REFERENCE_FIRST"
    );
  });

  it("runs beauty when evidence exists but review is not ready", () => {
    assert.equal(
      nextActionForStatus({
        exists: true,
        missingFiles: [],
        referenceReady: true,
        artReady: true,
        appExists: true,
        screenshotsReady: true,
        motionReady: true,
        pagesReady: true,
        beautyReady: false
      }),
      "RUN_BEAUTY"
    );
  });

  it("blocks on page coverage before beauty", () => {
    assert.equal(
      nextActionForStatus({
        exists: true,
        missingFiles: [],
        referenceReady: true,
        artReady: true,
        appExists: true,
        screenshotsReady: true,
        motionReady: true,
        pagesReady: false,
        beautyReady: false
      }),
      "NEEDS_PAGE_COVERAGE"
    );
  });
});

describe("hasPassingVisualReview", () => {
  it("fails when ready appears only in an appended beauty pass note", () => {
    const markdown = [
      "# Visual Review: demo",
      "",
      "## Latest Verdict",
      "",
      "Status: NOT_READY",
      "",
      "## Beauty Pass 2026-06-26T10:47:50.283Z",
      "",
      "Status: READY_FOR_REVIEW"
    ].join("\n");
    assert.equal(hasPassingVisualReview(markdown), false);
  });

  it("fails when the human beauty pass gate is still present", () => {
    const markdown = [
      "# Visual Review: demo",
      "",
      "## Latest Verdict",
      "",
      "Status: READY_FOR_REVIEW",
      "",
      "## Signature Moment Check",
      "Lands.",
      "",
      "## Reference Comparison",
      "Specific comparisons recorded.",
      "",
      "## Scores",
      "- First-screen impact: 4",
      "- Signature moment: 4",
      "- Typography: 4",
      "- Layout and rhythm: 4",
      "- Motion craft: 4",
      "- Color and imagery: 4",
      "- Mobile: 4",
      "- Coherence: 4",
      "",
      "## Highest Impact Next Fix",
      "None blocking.",
      "",
      "Status: NEEDS_HUMAN_BEAUTY_PASS"
    ].join("\n");
    assert.equal(hasPassingVisualReview(markdown), false);
  });

  it("fails when clone plan coverage is missing", () => {
    const markdown = [
      "# Visual Review: demo",
      "",
      "## Latest Verdict",
      "",
      "Status: READY_FOR_REVIEW",
      "",
      "## Signature Moment Check",
      "Lands in motion.",
      "",
      "## Reference Comparison",
      "Named reference gaps are closed.",
      "",
      "## Scores",
      "- First-screen impact: 4",
      "- Signature moment: 4",
      "- Typography: 4",
      "- Layout and rhythm: 4",
      "- Motion craft: 3",
      "- Color and imagery: 4",
      "- Mobile: 4",
      "- Coherence: 4",
      "",
      "## Highest Impact Next Fix",
      "Human review before production deploy."
    ].join("\n");
    assert.equal(hasPassingVisualReview(markdown), false);
  });

  it("passes only with an explicit latest verdict and eight acceptable scores", () => {
    const markdown = [
      "# Visual Review: demo",
      "",
      "## Latest Verdict",
      "",
      "Status: READY_FOR_REVIEW",
      "",
      "## Signature Moment Check",
      "Lands in motion.",
      "",
      "## Reference Comparison",
      "Named reference gaps are closed.",
      "",
      "## Clone Plan Coverage",
      "Pages, flows, motion mechanisms, and stack fit are covered.",
      "",
      "## Scores",
      "- First-screen impact: 4",
      "- Signature moment: 4",
      "- Typography: 4",
      "- Layout and rhythm: 4",
      "- Motion craft: 3",
      "- Color and imagery: 4",
      "- Mobile: 4",
      "- Coherence: 4",
      "",
      "## Highest Impact Next Fix",
      "Human review before production deploy."
    ].join("\n");
    assert.equal(hasPassingVisualReview(markdown), true);
  });
});
