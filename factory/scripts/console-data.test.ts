import test from "node:test";
import assert from "node:assert/strict";
import {
  buildMatchmakerTaskInput,
  buildTaskMarkdown,
  prospectFromRow,
  prospectThumbnailFromPath,
  readProspects,
  resolveProspectThumbnail
} from "./console-data.ts";

const MASTER_PROMPT = "factory/playbooks/master-clone-job-prompt.md";
const MASTER_SHELF_PROMPT = "factory/playbooks/master-shelf-stocking-prompt.md";

test("buildTaskMarkdown creates master clone job call phrase with two blanks", () => {
  const { slug, callPhrase, markdown } = buildTaskMarkdown({
    clientName: "Everest Tours",
    clientWebsite: "https://everesttours.com.np"
  });

  assert.equal(slug, "everest-tours");
  assert.match(callPhrase, /Run the Everest Tours clone job/);
  assert.match(callPhrase, new RegExp(MASTER_PROMPT.replace(/\//g, "\\/")));
  assert.match(callPhrase, /Client name: Everest Tours/);
  assert.match(callPhrase, /Client's current website: https:\/\/everesttours\.com\.np/);
  assert.match(markdown, /## Job Card/);
  assert.match(markdown, /## Worker prompt/);
  assert.match(markdown, new RegExp(MASTER_PROMPT.replace(/\//g, "\\/")));
});

test("buildTaskMarkdown includes optional donor override and notes", () => {
  const { callPhrase, markdown } = buildTaskMarkdown({
    clientName: "Everest Tours",
    clientWebsite: "https://everesttours.com.np",
    donorShelfSlug: "donor-black-tomato",
    notes: "they need a WhatsApp button"
  });

  assert.match(callPhrase, /Copy the look of a specific site\? donor-black-tomato/);
  assert.match(callPhrase, /Anything else: they need a WhatsApp button/);
  assert.match(markdown, /donor-black-tomato/);
  assert.match(markdown, /WhatsApp button/);
});

test("buildTaskMarkdown supports continue_site task type", () => {
  const { callPhrase } = buildTaskMarkdown({
    clientName: "Everest Tours",
    taskType: "continue_site"
  });

  assert.match(callPhrase, /Continue the Everest Tours clone job/);
  assert.match(callPhrase, /sites\/everest-tours\/qa\/run-log\.md/);
});

test("buildTaskMarkdown supports review task type", () => {
  const { callPhrase } = buildTaskMarkdown({
    clientName: "Everest Tours",
    taskType: "review"
  });

  assert.match(callPhrase, /run a beauty pass for Everest Tours/);
});

test("prospectFromRow computes total score from component columns", () => {
  const prospect = prospectFromRow({
    name: "Nepal Yoga Home",
    category: "yoga and meditation retreat",
    location: "Goldhunga, Kathmandu",
    website_url: "https://nepalyogahome.com/",
    maps_url: "https://maps.example.com",
    rating: "5.0",
    review_count: "796",
    status: "new",
    website_pain_score: "30",
    demand_score: "28",
    premium_fit_score: "20",
    access_score: "10",
    website_issues: "cluttered navigation, dated layout",
    website_notes: "Large course inventory",
    business_notes: "International yoga teacher training",
    contact_email: "test@example.com",
    phone: "+977-9849521819"
  });

  assert.equal(prospect.id, "nepal-yoga-home");
  assert.equal(prospect.score, 88);
  assert.equal(prospect.scores.websitePain, 30);
  assert.equal(prospect.scores.demand, 28);
  assert.equal(prospect.scores.premiumFit, 20);
  assert.equal(prospect.scores.access, 10);
  assert.equal(prospect.websiteIssues, "cluttered navigation, dated layout");
});

test("prospectFromRow includes thumbnail when screenshot_path exists on disk", () => {
  const prospect = prospectFromRow({
    name: "Nepal Yoga Home",
    category: "yoga and meditation retreat",
    location: "Goldhunga, Kathmandu",
    website_url: "https://nepalyogahome.com/",
    screenshot_path:
      ".blueprint-search-nepal/runs/2026-06-30T064726-nepal-prospect-search/screenshots/nepal-yoga-home/desktop.png",
    website_pain_score: "30",
    demand_score: "28",
    premium_fit_score: "20",
    access_score: "10"
  });

  assert.ok(prospect.thumbnail);
  assert.match(prospect.thumbnail, /^\/assets\//);
  assert.match(prospect.thumbnail, /nepal-yoga-home\/desktop\.png$/);
});

test("prospectThumbnailFromPath rejects path traversal", () => {
  assert.equal(prospectThumbnailFromPath("../etc/passwd"), null);
  assert.equal(prospectThumbnailFromPath("sites/../../etc/passwd"), null);
});

test("prospectThumbnailFromPath returns null for missing files", () => {
  assert.equal(prospectThumbnailFromPath("prospects/screenshots/does-not-exist/desktop.png"), null);
});

test("resolveProspectThumbnail reads screenshot_path column aliases", async () => {
  const thumbnail = await resolveProspectThumbnail({
    name: "Nepal Cooking School",
    screenshot_path:
      ".blueprint-search-nepal/runs/2026-06-30T064726-nepal-prospect-search/screenshots/nepal-cooking-school/desktop.png"
  });

  assert.ok(thumbnail);
  assert.match(thumbnail, /nepal-cooking-school\/desktop\.png$/);
});

test("resolveProspectThumbnail returns null when no capture exists", async () => {
  const thumbnail = await resolveProspectThumbnail({
    name: "Open Sky Paragliding",
    website_url: "https://www.openskyparagliding.com.np/"
  });

  assert.equal(thumbnail, null);
});

test("readProspects loads nepal-leads.csv sorted by score descending", async () => {
  const prospects = await readProspects();
  assert.ok(prospects.length > 0);
  const top = prospects[0];
  assert.ok(top.name);
  assert.ok(top.websiteUrl);
  assert.ok(top.score > 0);
  assert.ok("thumbnail" in top);
  const withThumbs = prospects.filter((p) => p.thumbnail).length;
  assert.ok(withThumbs >= 20, `expected most prospects to have thumbnails, got ${withThumbs}`);
  for (let i = 1; i < prospects.length; i++) {
    assert.ok(prospects[i - 1].score >= prospects[i].score);
  }
});

test("buildMatchmakerTaskInput pairs donor slug with prospect fields", () => {
  const prospect = prospectFromRow({
    name: "Nepal Yoga Home",
    category: "yoga retreat",
    location: "Kathmandu",
    website_url: "https://nepalyogahome.com/",
    website_pain_score: "30",
    demand_score: "28",
    premium_fit_score: "20",
    access_score: "10"
  });

  const input = buildMatchmakerTaskInput("donor-black-tomato", prospect, "show prices in NPR");
  const { callPhrase, markdown } = buildTaskMarkdown(input);

  assert.equal(input.clientName, "Nepal Yoga Home");
  assert.equal(input.clientWebsite, "https://nepalyogahome.com/");
  assert.equal(input.donorShelfSlug, "donor-black-tomato");
  assert.equal(input.taskType, "new_site");
  assert.match(callPhrase, /Run the Nepal Yoga Home clone job/);
  assert.match(callPhrase, /donor-black-tomato/);
  assert.match(callPhrase, /show prices in NPR/);
  assert.match(markdown, new RegExp(MASTER_PROMPT.replace(/\//g, "\\/")));
});

test("buildTaskMarkdown creates structured restock shelf task with JSON Job Card", () => {
  const commission = {
    targets: [
      { field: "Trekking / luxury adventure", count: 2 },
      { field: "Boutique hotels / ultra-luxury", count: 1 }
    ],
    notes: "fill emptiest sectors"
  };
  const { slug, callPhrase, markdown } = buildTaskMarkdown({
    taskType: "restock_shelf",
    restockCommission: commission,
    restockRequest: "Find 2 donors for trekking; 1 for hotels",
    notes: "fill emptiest sectors"
  });

  assert.match(slug, /trekking/);
  assert.match(callPhrase, /Restock the donor shelf/);
  assert.match(callPhrase, /Structured commission/);
  assert.match(callPhrase, /beauty audition/i);
  assert.match(markdown, /Type: restock_shelf/);
  assert.match(markdown, /```json/);
  assert.match(markdown, /Trekking \/ luxury adventure/);
  assert.match(markdown, new RegExp(MASTER_SHELF_PROMPT.replace(/\//g, "\\/")));
});

test("buildTaskMarkdown creates restock shelf task with one-blank Job Card", () => {
  const { slug, callPhrase, markdown } = buildTaskMarkdown({
    taskType: "restock_shelf",
    restockRequest: "paragliding companies",
    notes: "fill emptiest sectors"
  });

  assert.equal(slug, "paragliding-companies");
  assert.match(callPhrase, /Restock the donor shelf/);
  assert.match(callPhrase, new RegExp(MASTER_SHELF_PROMPT.replace(/\//g, "\\/")));
  assert.match(callPhrase, /Restock request: paragliding companies/);
  assert.match(callPhrase, /Notes: fill emptiest sectors/);
  assert.match(markdown, /Type: restock_shelf/);
  assert.match(markdown, /\*\*Restock request:\*\* paragliding companies/);
  assert.match(markdown, new RegExp(MASTER_SHELF_PROMPT.replace(/\//g, "\\/")));
});

test("buildTaskMarkdown accepts URL list in restock request", () => {
  const { callPhrase, markdown } = buildTaskMarkdown({
    taskType: "restock_shelf",
    restockRequest: "https://example.com\nhttps://other.com"
  });

  assert.match(callPhrase, /https:\/\/example\.com/);
  assert.match(markdown, /https:\/\/other\.com/);
});

test("buildTaskMarkdown maps legacy stock_donor to restock one-blank format", () => {
  const { callPhrase, markdown } = buildTaskMarkdown({
    clientName: "paragliding operators",
    taskType: "stock_donor",
    sector: "paragliding operators",
    donorUrl: "https://www.example-adventure.com",
    whyThisDonor: "best safety-first booking flow"
  });

  assert.match(callPhrase, /Restock the donor shelf/);
  assert.match(callPhrase, /Restock request: paragliding operators — https:\/\/www\.example-adventure\.com/);
  assert.match(callPhrase, /Notes: best safety-first booking flow/);
  assert.match(markdown, /Type: stock_donor/);
});
