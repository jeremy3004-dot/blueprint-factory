import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { detectProtectedPreview, protectedPreviewMessage } from "./protected-preview";

describe("detectProtectedPreview", () => {
  it("detects Vercel deployment protection from status", () => {
    const result = detectProtectedPreview("https://demo.vercel.app", 403, "<html></html>");
    assert.equal(result.protected, true);
    assert.equal(result.code, "PREVIEW_PROTECTED");
  });

  it("detects the Vercel login interstitial from fixture HTML", () => {
    const html = "<main><h1>Authentication Required</h1><p>Vercel Deployment Protection</p><button>Continue with GitHub</button></main>";
    const result = detectProtectedPreview("https://demo.vercel.app", 200, html);
    assert.equal(result.protected, true);
  });

  it("does not flag a normal local preview", () => {
    const result = detectProtectedPreview("http://127.0.0.1:3000", 200, "<main><h1>Everest Tours</h1></main>");
    assert.equal(result.protected, false);
  });
});

describe("protectedPreviewMessage", () => {
  it("gives the required owner action", () => {
    assert.equal(
      protectedPreviewMessage(),
      "PREVIEW_PROTECTED: owner must disable Vercel Deployment Protection"
    );
  });
});
