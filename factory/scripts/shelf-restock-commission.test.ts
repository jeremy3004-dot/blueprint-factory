import test from "node:test";
import assert from "node:assert/strict";
import {
  DONOR_SHELF_SECTORS,
  buildRestockCallPhrase,
  buildStructuredJobCardMarkdown,
  formatCommissionSummary,
  formatRestockRequestLine,
  validateShelfRestockCommission
} from "./shelf-restock-commission.ts";

test("DONOR_SHELF_SECTORS includes core shelf fields", () => {
  assert.ok(DONOR_SHELF_SECTORS.includes("Trekking / luxury adventure"));
  assert.ok(DONOR_SHELF_SECTORS.includes("Tech / SaaS"));
  assert.equal(DONOR_SHELF_SECTORS.length, 13);
});

test("validateShelfRestockCommission requires targets and validates counts", () => {
  assert.throws(() => validateShelfRestockCommission({}), /At least one target/);
  assert.throws(
    () =>
      validateShelfRestockCommission({
        targets: [{ field: "Restaurants / cafes", count: 0 }]
      }),
    /1–5/
  );

  const commission = validateShelfRestockCommission({
    targets: [
      { field: "Trekking / luxury adventure", count: 2 },
      { field: "Boutique hotels / ultra-luxury", count: 1 }
    ],
    notes: "fill gaps",
    totalCap: 5
  });

  assert.equal(commission.targets.length, 2);
  assert.equal(commission.targets[0].count, 2);
  assert.equal(commission.notes, "fill gaps");
  assert.equal(commission.totalCap, 5);
});

test("validateShelfRestockCommission rejects totalCap below sum", () => {
  assert.throws(
    () =>
      validateShelfRestockCommission({
        targets: [{ field: "Education", count: 3 }],
        totalCap: 2
      }),
    /less than sum/
  );
});

test("formatCommissionSummary builds human-readable line", () => {
  const summary = formatCommissionSummary({
    targets: [
      { field: "Trekking / luxury adventure", count: 2 },
      { field: "Boutique hotels / ultra-luxury", count: 1 }
    ]
  });
  assert.match(summary, /Find 2 × Trekking/);
  assert.match(summary, /Boutique hotels/);
  assert.match(summary, /3 total/);
});

test("buildStructuredJobCardMarkdown includes JSON commission", () => {
  const commission = validateShelfRestockCommission({
    targets: [{ field: "NGOs / nonprofits", count: 1 }]
  });
  const md = buildStructuredJobCardMarkdown(commission, "job-abc");
  assert.match(md, /```json/);
  assert.match(md, /NGOs \/ nonprofits/);
  assert.match(md, /job-abc/);
});

test("buildRestockCallPhrase references master shelf prompt", () => {
  const phrase = buildRestockCallPhrase({
    targets: [{ field: "Gyms / fitness", count: 2 }]
  });
  assert.match(phrase, /master-shelf-stocking-prompt/);
  assert.match(phrase, /beauty audition/i);
  assert.match(phrase, /Structured commission/);
});

test("formatRestockRequestLine summarizes per-field counts", () => {
  const line = formatRestockRequestLine({
    targets: [
      { field: "Real estate", count: 2 },
      { field: "Education", count: 1 }
    ]
  });
  assert.match(line, /2 donor\(s\) for Real estate/);
  assert.match(line, /1 donor\(s\) for Education/);
});
