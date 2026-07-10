import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { siteContent } from "../content/site";
import { ClubOverview } from "../components/home/ClubOverview";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import GalleryPage from "./gallery/page";
import MembershipPage from "./membership/page";
import Home from "./page";
import ServicesPage from "./services/page";

function imageSources(markup: string): string[] {
  return Array.from(markup.matchAll(/<img[^>]+src="([^"]+)"/g), (match) => match[1]);
}

test("uses distinct local production media for every first-light experience", () => {
  const markup = renderToStaticMarkup(<Home />);
  const experiences = ["Pure energy", "Deep recovery", "First light"];
  const sources = experiences.map((experience) => {
    const escaped = experience.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = markup.match(
      new RegExp(`<img[^>]+data-experience="${escaped}"[^>]+src="([^"]+)"`)
    );
    assert.ok(match, `${experience} must identify its production image`);
    return match[1];
  });

  assert.equal(new Set(sources).size, experiences.length);
  assert.ok(sources.every((src) => src.startsWith("/")), "experience images must be local");
});

test("ships no remote runtime image sources in content or planned routes", () => {
  assert.ok(
    siteContent.media.every((asset) => asset.src.startsWith("/")),
    "siteContent media must resolve from app/public"
  );

  const markup = [Home, AboutPage, ServicesPage, GalleryPage, ContactPage, MembershipPage]
    .map((Page) => renderToStaticMarkup(<Page />))
    .join("\n");
  const remoteSources = imageSources(markup).filter((src) => /^https?:\/\//.test(src));

  assert.deepEqual(remoteSources, []);
});

test("uses three distinct local Avya photographs across the editorial overview", () => {
  const sources = imageSources(renderToStaticMarkup(<ClubOverview />));

  assert.equal(sources.length, 3);
  assert.equal(new Set(sources).size, 3);
  assert.ok(sources.every((src) => src.startsWith("/media/")));
});
