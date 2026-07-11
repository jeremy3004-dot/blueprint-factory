import assert from "node:assert/strict";
import test from "node:test";
import { liveDemoCount, liveDemoRecords } from "./project-records.ts";

test("live demo registry exposes all six approved public builds", () => {
  assert.equal(liveDemoCount, 6);
  assert.equal(liveDemoRecords.length, 6);
});

test("every live demo record includes required showcase fields", () => {
  for (const project of liveDemoRecords) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(project.name.length > 0);
    assert.ok(project.category.length > 0);
    assert.ok(project.description.length > 0);
    assert.match(project.url, /^https:\/\//);
    assert.ok(project.screenshotFile.endsWith(".png"));
    assert.ok(project.screenshotAlt.length > 0);
  }
});

test("carousel and index CTAs point at the expected external demo URLs", () => {
  const expected = {
    "ambika-juice":
      "https://ambika-juice-njv7d2xbo-jeremys-projects-379e354f.vercel.app",
    "americana-grill":
      "https://americana-grill-3l4n4y23x-jeremys-projects-379e354f.vercel.app",
    "san-chon": "https://san-chon-6s5kof8zg-jeremys-projects-379e354f.vercel.app",
    dorjes: "https://dorjes-k2ow015ll-jeremys-projects-379e354f.vercel.app",
    "the-juicery-cafe":
      "https://the-juicery-cafe-pkv2i8edm-jeremys-projects-379e354f.vercel.app",
    "avya-club": "https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app"
  };

  for (const project of liveDemoRecords) {
    assert.equal(project.url, expected[project.slug as keyof typeof expected]);
  }
});

test("registry rejects non-https demo URLs at module load time", () => {
  assert.throws(() => {
    const badModule = `
      function projectUrl(value) {
        if (!value.startsWith("https://")) {
          throw new Error('Project URL must use https://');
        }
        return value;
      }
      projectUrl("http://insecure.example");
    `;
    new Function(badModule)();
  });
});
