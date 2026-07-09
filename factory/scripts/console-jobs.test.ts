import test from "node:test";
import assert from "node:assert/strict";
import {
  extractUrls,
  isSafeJobId,
  validateClonePairInput,
  validateProspectSearchInput,
  validateShelfCaptureInput,
  validateShelfRestockCommission
} from "./console-jobs.ts";

test("isSafeJobId rejects path traversal and invalid characters", () => {
  assert.equal(isSafeJobId("2026-07-09T05-30-00Z-prospect-search-pokhara"), true);
  assert.equal(isSafeJobId("job-123"), true);
  assert.equal(isSafeJobId("../etc/passwd"), false);
  assert.equal(isSafeJobId(".."), false);
  assert.equal(isSafeJobId(""), false);
  assert.equal(isSafeJobId("has/slash"), false);
  assert.equal(isSafeJobId("has space"), false);
});

test("validateProspectSearchInput requires lane", () => {
  assert.throws(() => validateProspectSearchInput({}), /lane is required/);
  const input = validateProspectSearchInput({
    lane: "Pokhara trekking agencies",
    region: "Pokhara",
    notes: "4.5+ reviews"
  });
  assert.equal(input.lane, "Pokhara trekking agencies");
  assert.equal(input.region, "Pokhara");
  assert.equal(input.notes, "4.5+ reviews");
});

test("validateShelfCaptureInput requires request and accepts url list", () => {
  assert.throws(() => validateShelfCaptureInput({ request: "" }), /request is required/);
  const input = validateShelfCaptureInput({
    request: "https://example.com",
    urls: ["https://example.com", "  "],
    notes: "batch"
  });
  assert.equal(input.request, "https://example.com");
  assert.deepEqual(input.urls, ["https://example.com"]);
});

test("validateClonePairInput requires client, website, and donor", () => {
  assert.throws(() => validateClonePairInput({ clientName: "A" }), /clientWebsite/);
  const input = validateClonePairInput({
    clientName: "Everest Tours",
    clientWebsite: "https://everesttours.com.np",
    donorShelfSlug: "donor-black-tomato",
    notes: "WhatsApp"
  });
  assert.equal(input.donorShelfSlug, "donor-black-tomato");
});

test("validateShelfRestockCommission is re-exported from console-jobs", () => {
  const input = validateShelfRestockCommission({
    targets: [{ field: "Tech / SaaS", count: 1 }]
  });
  assert.equal(input.targets[0].field, "Tech / SaaS");
});

test("extractUrls pulls http(s) links from free text", () => {
  const urls = extractUrls(
    "Try https://example.com and http://other.org/path.\nAlso https://third.co/page,"
  );
  assert.deepEqual(urls, ["https://example.com", "http://other.org/path", "https://third.co/page"]);
});
