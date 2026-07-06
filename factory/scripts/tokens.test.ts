import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  curateTokens,
  luminance,
  matchFont,
  parseColor,
  pickPalette,
  saturation,
  tokensToCssVars
} from "./tokens";
import type { DonorTokens } from "./capture-donor";

describe("parseColor", () => {
  it("parses hex and rgb(a)", () => {
    assert.deepEqual(parseColor("#2997ff"), { r: 41, g: 151, b: 255 });
    assert.deepEqual(parseColor("rgb(255, 0, 0)"), { r: 255, g: 0, b: 0 });
    assert.deepEqual(parseColor("rgba(0, 0, 0, 0.5)"), { r: 0, g: 0, b: 0 });
    assert.equal(parseColor("nonsense"), null);
  });
});

describe("luminance / saturation", () => {
  it("ranks white brighter than black", () => {
    assert.ok(luminance({ r: 255, g: 255, b: 255 }) > luminance({ r: 0, g: 0, b: 0 }));
  });
  it("scores grey as unsaturated and blue as saturated", () => {
    assert.ok(saturation({ r: 128, g: 128, b: 128 }) < 0.05);
    assert.ok(saturation({ r: 41, g: 151, b: 255 }) > 0.5);
  });
});

describe("pickPalette", () => {
  it("classifies an Apple-like palette into roles", () => {
    const palette = pickPalette([
      { value: "#f5f5f7", count: 2697 },
      { value: "#e8e8ed", count: 247 },
      { value: "#86868b", count: 242 },
      { value: "#2997ff", count: 131 },
      { value: "#000000", count: 59 }
    ]);
    assert.equal(palette.background, "#f5f5f7"); // most frequent
    assert.equal(palette.foreground, "#000000"); // furthest luminance from light bg
    assert.equal(palette.primary, "#2997ff"); // most saturated
  });

  it("falls back gracefully with no parseable colors", () => {
    const palette = pickPalette([]);
    assert.equal(palette.background, "#111312");
  });
});

describe("matchFont", () => {
  it("substitutes a proprietary donor font and flags it", () => {
    const choice = matchFont("SF Pro Display", "heading");
    assert.equal(choice.family, "Inter");
    assert.equal(choice.substituted, true);
    assert.equal(choice.license, "open");
    assert.ok(choice.stack.includes("Inter"));
  });

  it("keeps an already-open font", () => {
    const choice = matchFont("Playfair Display", "heading");
    assert.equal(choice.family, "Playfair Display");
    assert.equal(choice.substituted, false);
    assert.ok(choice.stack.includes("serif"));
  });

  it("heuristically substitutes an unmapped serif and asks for verification", () => {
    const choice = matchFont("Some Custom Serif", "heading");
    assert.equal(choice.family, "Lora");
    assert.ok(choice.note?.includes("verify"));
  });

  it("uses a sensible default when no donor font is known", () => {
    assert.equal(matchFont(null, "heading").family, "Playfair Display");
    assert.equal(matchFont(null, "body").family, "Inter");
  });
});

function donorTokens(): DonorTokens {
  return {
    colors: [
      { value: "#f5f5f7", count: 2697 },
      { value: "#2997ff", count: 131 },
      { value: "#000000", count: 59 }
    ],
    fonts: { heading: "SF Pro Display", body: "SF Pro Text", ui: "SF Pro Text" },
    typeScale: [80, 64, 48, 24, 17],
    spacing: [40, 80, 120],
    radii: [8, 16],
    shadows: []
  };
}

describe("curateTokens + tokensToCssVars", () => {
  it("produces app tokens with substituted fonts and a CSS var block", () => {
    const tokens = curateTokens(donorTokens());
    assert.equal(tokens.colors.background, "#f5f5f7");
    assert.equal(tokens.colors.primary, "#2997ff");
    assert.equal(tokens.fonts.heading.family, "Inter");
    assert.equal(tokens.fonts.heading.substituted, true);

    const css = tokensToCssVars(tokens);
    assert.ok(css.includes("--color-background: #f5f5f7;"));
    assert.ok(css.includes("--color-primary: #2997ff;"));
    assert.ok(css.includes("--font-heading:"));
  });
});
