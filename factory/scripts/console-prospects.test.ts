import test from "node:test";
import assert from "node:assert/strict";
import {
  applyOverrides,
  buildProspectFilterMeta,
  filterProspects,
  inferRegion,
  inferSectors,
  parseProspectQuery
} from "./console-prospects.ts";
import { prospectFromRow, prospectIdFromRow, type ConsoleProspect } from "./console-data.ts";

function sampleProspect(overrides: Partial<ConsoleProspect> = {}): ConsoleProspect {
  return {
    id: "url:nepalyogahome.com",
    csvId: "1",
    name: "Nepal Yoga Home",
    category: "yoga and meditation retreat",
    location: "Goldhunga, Kathmandu",
    region: "kathmandu",
    sectors: ["wellness"],
    websiteUrl: "https://nepalyogahome.com",
    mapsUrl: null,
    rating: "5.0",
    reviewCount: "796",
    status: "new",
    score: 88,
    scores: { websitePain: 30, demand: 28, premiumFit: 20, access: 10 },
    websiteNotes: "dated layout",
    websiteIssues: null,
    businessNotes: "International yoga training",
    contactEmail: null,
    phone: null,
    thumbnail: null,
    starred: false,
    tier: 0,
    favoritedAt: null,
    updatedAt: "2026-07-09T00:00:00+00:00",
    firstSeenAt: "2026-06-30T01:15:48+00:00",
    ...overrides
  };
}

test("inferRegion maps Kathmandu valley locations", () => {
  assert.equal(inferRegion("Thamel, Kathmandu"), "kathmandu");
  assert.equal(inferRegion("Pokhara"), "pokhara");
  assert.equal(inferRegion("Sauraha, Chitwan"), "chitwan");
});

test("inferSectors maps trekking and wellness categories", () => {
  assert.deepEqual(inferSectors("trekking and expedition operator"), ["trekking", "tourism"]);
  assert.deepEqual(inferSectors("yoga retreat"), ["wellness"]);
});

test("prospectIdFromRow prefers canonical_key", () => {
  const id = prospectIdFromRow({
    id: "9",
    canonical_key: "url:nepalyogahome.com",
    name: "Nepal Yoga Home"
  });
  assert.equal(id, "url:nepalyogahome.com");
});

test("filterProspects supports region, sector, starred, and min score", () => {
  const items = [
    sampleProspect(),
    sampleProspect({
      id: "url:opensky.com",
      name: "Open Sky",
      region: "pokhara",
      sectors: ["adventure"],
      score: 60,
      starred: true,
      tier: 1,
      favoritedAt: "2026-07-08T00:00:00+00:00"
    })
  ];

  const pokhara = filterProspects(items, { region: "pokhara" });
  assert.equal(pokhara.length, 1);
  assert.equal(pokhara[0].name, "Open Sky");

  const favorites = filterProspects(items, { view: "favorites" });
  assert.equal(favorites.length, 1);
  assert.equal(favorites[0].starred, true);

  const highScore = filterProspects(items, { minScore: 80 });
  assert.equal(highScore.length, 1);
  assert.equal(highScore[0].name, "Nepal Yoga Home");
});

test("applyOverrides merges favorites without touching CSV", () => {
  const base = sampleProspect();
  const merged = applyOverrides(base, {
    version: 1,
    favorites: {
      [base.id]: { starred: true, tier: 2, favoritedAt: "2026-07-09T12:00:00Z" }
    }
  });
  assert.equal(merged.starred, true);
  assert.equal(merged.tier, 2);
});

test("parseProspectQuery reads API filter params", () => {
  const url = new URL("http://localhost/api/prospects?region=pokhara&sector=trekking,adventure&starred=true&since=week&minScore=70&view=favorites&q=yoga");
  const params = parseProspectQuery(url);
  assert.equal(params.region, "pokhara");
  assert.equal(params.sector, "trekking,adventure");
  assert.equal(params.starred, true);
  assert.equal(params.since, "week");
  assert.equal(params.minScore, 70);
  assert.equal(params.view, "favorites");
  assert.equal(params.q, "yoga");
});

test("buildProspectFilterMeta counts regions and sectors", () => {
  const meta = buildProspectFilterMeta([
    sampleProspect(),
    sampleProspect({ id: "b", region: "pokhara", sectors: ["adventure"] })
  ]);
  assert.ok(meta.regionCounts.kathmandu >= 1);
  assert.ok(meta.regionCounts.pokhara >= 1);
  assert.ok(meta.sectorCounts.wellness >= 1);
});

test("prospectFromRow uses total_score when present", () => {
  const prospect = prospectFromRow({
    name: "Nepal Yoga Home",
    category: "yoga retreat",
    location: "Kathmandu",
    website_url: "https://nepalyogahome.com/",
    website_pain_score: "30",
    demand_score: "28",
    premium_fit_score: "20",
    access_score: "10",
    total_score: "93"
  });
  assert.equal(prospect.score, 93);
});
