import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync(new URL("./DemoCarousel.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("carousel cards have a responsive width before hydration", () => {
  assert.doesNotMatch(component, /style=\{\{ width:/);
  assert.match(styles, /\.carouselCard\s*\{[\s\S]*?width:\s*min\(58vw,\s*760px\)/);
  assert.match(styles, /\.carouselCard\s*\{[\s\S]*?min-width:\s*0/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.carouselCard\s*\{[\s\S]*?width:\s*calc\(100vw - 48px\)/);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*?\.carouselCard\s*\{[\s\S]*?flex-basis:\s*calc\(100vw - 48px\)/);
});
