import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { siteContent } from "../content/site";

test("renders the complete Avya shared shell", () => {
  const markup = renderToStaticMarkup(
    <>
      <SiteHeader />
      <main>Page content</main>
      <SiteFooter />
    </>
  );

  assert.match(markup, /Avya Club/);

  for (const route of siteContent.routes) {
    assert.match(markup, new RegExp(`href="${route.href}"`));
    assert.match(markup, new RegExp(`>${route.label}<`));
  }

  for (const phone of siteContent.contact.phones) {
    assert.match(markup, new RegExp(phone));
  }

  assert.match(markup, new RegExp(siteContent.contact.email));
  assert.match(markup, />Membership</);
});
