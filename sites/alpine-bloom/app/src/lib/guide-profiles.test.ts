import assert from "node:assert/strict";
import test from "node:test";

import { guideProfiles } from "../data/green-pastures.ts";

const blockedVisibleTerms = /\b(male|men-led|men led|mixed-gender|mixed gender|masculine)\b/i;

test("guide profiles are women-only Nepali guide records with complete public fields", () => {
  assert.ok(guideProfiles.length >= 6);

  for (const guide of guideProfiles) {
    assert.equal(guide.gender, "woman");
    assert.equal(guide.label, "Nepali woman guide");
    assert.ok(guide.focus.length > 20);
    assert.ok(guide.bio.length > 40);
    assert.ok(guide.avatar.length >= 2);
    assert.ok(guide.regions.length > 0);
    assert.ok(guide.languages.includes("Nepali"));
    assert.ok(guide.certifications.length > 0);
    assert.ok(guide.specialties.length > 0);

    const visibleText = [
      guide.name,
      guide.role,
      guide.label,
      guide.focus,
      guide.bio,
      ...guide.regions,
      ...guide.languages,
      ...guide.certifications,
      ...guide.specialties,
    ].join(" ");

    assert.equal(blockedVisibleTerms.test(visibleText), false, guide.name);
  }
});
