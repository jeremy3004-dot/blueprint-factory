import assert from "node:assert/strict";
import test from "node:test";

import { nextSequenceIndex, sequenceProgress } from "./experience-sequence";

test("wraps sequence indexes in both directions", () => {
  assert.equal(nextSequenceIndex(0, 1, 3), 1);
  assert.equal(nextSequenceIndex(2, 1, 3), 0);
  assert.equal(nextSequenceIndex(0, -1, 3), 2);
});

test("formats sequence progress as a two-decimal percentage", () => {
  assert.equal(sequenceProgress(0, 3), "33.33%");
  assert.equal(sequenceProgress(2, 3), "100.00%");
});
