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
  assert.match(markup, /href="\/services"/);
});

test("renders every captured Avya service and its contact action", () => {
  const markup = render(ServicesPage);

  assert.match(markup, /<h1[^>]*>Services<\/h1>/);
  for (const service of siteContent.services) {
    assert.match(markup, new RegExp(service.name.replace("&", "&amp;")));
  }
  assert.match(markup, /href="\/contact"/);
});

test("renders a source-backed Avya gallery and visit action", () => {
  const markup = render(GalleryPage);

  assert.match(markup, /<h1[^>]*>Gallery<\/h1>/);
  assert.match(markup, /About Avya Club/);
  assert.match(markup, /Avya Club House/);
  assert.match(markup, /href="\/contact"/);
});

test("renders direct contact actions without a placeholder form", () => {
  const markup = render(ContactPage);

  assert.match(markup, /<h1[^>]*>Contact Avya Club<\/h1>/);
  assert.match(markup, /href="mailto:info@avya.club"/);
  assert.match(markup, /href="tel:061590648"/);
  assert.match(markup, /href="tel:9802855271"/);
  assert.match(markup, /Get directions/);
  assert.doesNotMatch(markup, /<form/);
});

test("renders captured membership groups with verified registration action", () => {
  const markup = render(MembershipPage);

  assert.match(markup, /<h1[^>]*>Membership<\/h1>/);
  for (const group of siteContent.memberships) {
    assert.match(markup, new RegExp(group.name.replace("&", "&amp;")));
  }
  assert.match(markup, /Contact Avya for current pricing/);
  assert.match(markup, /href="https:\/\/avya.club\/register"/);
});

test("records exactly six built public routes and specific deferrals", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../../../pages.json", import.meta.url), "utf8")
  ) as { pages: { route: string; status: string; reason?: string }[] };
  const built = manifest.pages.filter((page) => page.status === "built");
  const deferred = manifest.pages.filter((page) => page.status === "deferred");

  assert.deepEqual(built.map((page) => page.route), [
    "/",
    "/about",
    "/services",
    "/gallery",
    "/contact",
    "/membership"
  ]);
  assert.ok(deferred.length > 0);
  assert.ok(deferred.every((page) => Boolean(page.reason?.trim())));
});
