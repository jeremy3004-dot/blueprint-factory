import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { siteContent, type Testimonial } from "../content/site";
import Home from "./page";

test("renders the complete source-traceable Avya homepage sections", () => {
  const markup = renderToStaticMarkup(<Home />);

  assert.match(markup, new RegExp(String(siteContent.about.foundedYear)));
  assert.match(markup, /110,000(?:-| )square-foot/);

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
