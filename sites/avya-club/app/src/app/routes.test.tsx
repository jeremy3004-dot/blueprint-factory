import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import GalleryPage from "./gallery/page";
import MembershipPage from "./membership/page";
import ServicesPage from "./services/page";
import { siteContent } from "../content/site";

function render(Page: () => React.JSX.Element) {
  return renderToStaticMarkup(<Page />);
}

test("renders the About route with Avya's sourced story and services action", () => {
  const markup = render(AboutPage);

  assert.match(markup, /<h1[^>]*>A Holistic Haven for Health, Fitness &amp; Well-being<\/h1>/);
  assert.match(markup, /Founded in 2018/);
  assert.match(markup, /110,000-square-foot/);
  assert.match(markup, /<h2[^>]*>About Avya Club<\/h2>/);
  assert.doesNotMatch(markup, /Wellbeing with room to grow/);
  assert.match(markup, /href="\/services"/);
});

test("renders every captured Avya service and its contact action", () => {
  const markup = render(ServicesPage);

  assert.match(markup, /<h1[^>]*>What We Provide<\/h1>/);
  assert.match(markup, /Achieve peak fitness with our modern gym/);
  assert.doesNotMatch(markup, /Fitness, recovery, recreation/);
  for (const service of siteContent.services) {
    assert.match(markup, new RegExp(service.name.replace("&", "&amp;")));
  }
  assert.match(markup, /href="\/contact"/);
});

test("renders a source-backed Avya gallery and visit action", () => {
  const markup = render(GalleryPage);

  assert.match(markup, /<h1[^>]*>Gallery<\/h1>/);
  assert.match(markup, /Avya Club blends fitness, healing, and mindfulness/);
  assert.doesNotMatch(markup, /A look at the spaces/);
  assert.match(markup, /About Avya Club/);
  assert.match(markup, /Avya Club House/);
  assert.match(markup, /href="\/contact"/);
});

test("renders direct contact actions without a placeholder form", () => {
  const markup = render(ContactPage);

  assert.match(markup, /<h1[^>]*>CONTACT US<\/h1>/);
  assert.match(markup, /<h2[^>]*>Get In Touch<\/h2>/);
  assert.doesNotMatch(markup, /Come as you are/);
  assert.match(markup, /href="mailto:info@avya.club"/);
  assert.match(markup, /href="tel:061590648"/);
  assert.match(markup, /href="tel:9802855271"/);
  assert.match(markup, /Get directions/);
  assert.doesNotMatch(markup, /<form/);
});

test("renders captured membership groups with verified registration action", () => {
  const markup = render(MembershipPage);

  assert.match(markup, /<h1[^>]*>Our Services &amp; Pricing<\/h1>/);
  for (const group of siteContent.memberships) {
    assert.match(markup, new RegExp(group.name.replace("&", "&amp;")));
    for (const option of group.options) {
      assert.ok(
        markup.includes(option.replace("&", "&amp;")),
        `missing captured membership option: ${option}`
      );
    }
  }
  assert.doesNotMatch(markup, /Contact Avya for current pricing/);
  assert.match(markup, /<h2[^>]*>Join Us Today<\/h2>/);
  assert.doesNotMatch(markup, /Make Avya part of your rhythm/);
  assert.match(markup, /href="https:\/\/avya.club\/register"/);
});

test("keeps all route marketing copy in source-traceable pageCopy records", () => {
  const content = siteContent as typeof siteContent & {
    pageCopy?: Record<string, { sourceUrl?: string }>;
  };

  assert.ok(content.pageCopy, "siteContent.pageCopy must exist");
  assert.deepEqual(Object.keys(content.pageCopy), [
    "about",
    "services",
    "gallery",
    "contact",
    "membership"
  ]);
  assert.ok(
    Object.values(content.pageCopy).every((page) => Boolean(page.sourceUrl?.trim())),
    "every pageCopy record must keep source URL provenance"
  );
});

test("records exactly six built public routes and specific deferrals", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../../../pages.json", import.meta.url), "utf8")
  ) as { pages: { route: string; status: string; reason?: string }[] };
  const built = manifest.pages.filter((page) => page.status === "built");
  const deferred = manifest.pages.filter((page) => page.status === "deferred");
  const expectedAvyaDeferrals = [
    "/register",
    "/team",
    "/faq",
    "/blog",
    "/service",
    "/service-details/68773c703c8435ff6fa735d0",
    "/service-details/68773b963c8435ff6fa73563",
    "/service-details/68773b1f3c8435ff6fa734ee",
    "/service-details/687739d43c8435ff6fa7342a",
    "/service-details/687739583c8435ff6fa733bd",
    "/service-details/6870f061d8eb8cd5d618a2bf"
  ];
  const expectedDonorDeferrals = [
    "https://republicbos.com/",
    "https://republicbos.com/about-us",
    "https://republicbos.com/app",
    "https://republicbos.com/careers",
    "https://republicbos.com/club-status",
    "https://republicbos.com/corporate-partnerships",
    "https://republicbos.com/davis-square",
    "https://republicbos.com/davis-square/classes",
    "https://republicbos.com/davis-square/classes/fitness-floor",
    "https://republicbos.com/davis-square/classes/move-studio",
    "https://republicbos.com/davis-square/classes/restore-spa",
    "https://republicbos.com/davis-square/classes/strength-studio",
    "https://republicbos.com/financial-district",
    "https://republicbos.com/financial-district/classes",
    "https://republicbos.com/financial-district/classes/fit-studio",
    "https://republicbos.com/financial-district/classes/restore-spa",
    "https://republicbos.com/member-policies",
    "https://republicbos.com/membership-promotion",
    "https://republicbos.com/membership-promotion/davis-square",
    "https://republicbos.com/membership-promotion/financial-district",
    "https://republicbos.com/membership-requests",
    "https://republicbos.com/news",
    "https://republicbos.com/nutrition",
    "https://republicbos.com/personal-training-suite",
    "https://republicbos.com/privacy-policy",
    "https://republicbos.com/recovery",
    "https://republicbos.com/ref",
    "https://republicbos.com/restore-spa-landing",
    "https://republicbos.com/resubscribe",
    "https://republicbos.com/trial-pass"
  ];

  assert.deepEqual(built.map((page) => page.route), [
    "/",
    "/about",
    "/services",
    "/gallery",
    "/contact",
    "/membership"
  ]);
  assert.deepEqual(
    deferred.map((page) => page.route),
    [...expectedAvyaDeferrals, ...expectedDonorDeferrals]
  );
  assert.equal(manifest.pages.length, built.length + deferred.length);
  assert.equal(deferred.length, 41);
  assert.ok(deferred.every((page) => !page.route.includes("*")));
  assert.ok(deferred.every((page) => Boolean(page.reason?.trim())));
});
