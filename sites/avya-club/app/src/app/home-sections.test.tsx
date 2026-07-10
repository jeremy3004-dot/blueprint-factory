import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { ExperienceGrid } from "../components/home/ExperienceGrid";
import { siteContent, type Testimonial } from "../content/site";
import Home from "./page";

test("renders the complete source-traceable Avya homepage sections", () => {
  const markup = renderToStaticMarkup(<Home />);

  assert.match(markup, new RegExp(String(siteContent.about.foundedYear)));
  assert.match(markup, /110,000(?:-| )square-foot/);
  assert.match(markup, /Himalayan views/i);
  assert.match(markup, /all ages and fitness levels/i);

  for (const service of siteContent.services) {
    const renderedName = renderToStaticMarkup(<>{service.name}</>);
    assert.match(markup, new RegExp(renderedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(markup, /href="\/membership"/);
  assert.match(markup, new RegExp(`href="${siteContent.registrationUrl}"`));

  const renderedTestimonialNames = Array.from(
    markup.matchAll(/data-testimonial-name="([^"]+)"/g),
    (match) => match[1]
  );
  assert.deepEqual(
    renderedTestimonialNames,
    (siteContent.testimonials as readonly Testimonial[]).map((testimonial) => testimonial.name)
  );
});

test("uses three distinct source-backed Experience Grid media assets", () => {
  const experienceMarkup = renderToStaticMarkup(<ExperienceGrid />);
  const experienceMediaSources = Array.from(
    experienceMarkup.matchAll(/<img src="([^"]+)"/g),
    (match) => match[1]
  );

  assert.equal(experienceMediaSources.length, 3);
  assert.equal(new Set(experienceMediaSources).size, 3);
  for (const src of experienceMediaSources) {
    const sourceAsset = siteContent.media.find((asset) => asset.src === src);
    assert.ok(sourceAsset?.sourceUrl, `${src} must retain source provenance`);
  }
});
