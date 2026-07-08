import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { extractDeployUrl, recordPreviewUrl } from "./deploy";

describe("extractDeployUrl", () => {
  it("pulls the vercel preview URL from CLI output", () => {
    const out = [
      "Vercel CLI 50.4.6",
      "Inspect: https://vercel.com/team/demo/abc",
      "Production: https://demo.vercel.app [copied to clipboard]",
      "https://demo-clone-abc123.vercel.app"
    ].join("\n");
    assert.equal(extractDeployUrl(out), "https://demo-clone-abc123.vercel.app");
  });
  it("returns null when no vercel URL is present", () => {
    assert.equal(extractDeployUrl("error: not logged in"), null);
  });
});

describe("recordPreviewUrl", () => {
  it("sets the Preview URL field and appends a dated note", () => {
    const deployMd = "# Deploy: demo\n\nProfile: Vercel\nProduction URL:\nPreview URL:\nBackend: none\n\n## Notes\n";
    const out = recordPreviewUrl(deployMd, "https://demo-abc.vercel.app", "2026-07-06T12:00:00.000Z", "shareable");
    assert.ok(out.includes("Preview URL: https://demo-abc.vercel.app"));
    assert.ok(out.includes("### Preview deploy 2026-07-06T12:00:00.000Z"));
    assert.ok(out.includes("verified HTTP 200"));
    assert.ok(out.includes("Public shareability: shareable"));
    // must NOT touch the production URL line
    assert.ok(out.includes("Production URL:\n"));
  });
  it("adds a Preview URL line when none exists", () => {
    const out = recordPreviewUrl("# Deploy: demo\n\nProfile: Vercel\n", "https://x.vercel.app", "2026-07-06", "protected");
    assert.ok(out.includes("Preview URL: https://x.vercel.app"));
    assert.ok(out.includes("Public shareability: protected"));
  });
});
