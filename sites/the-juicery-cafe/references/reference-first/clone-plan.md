# Clone Plan: The Juicery Cafe from Gymkhana

Status: complete
Primary donor: Gymkhana
Donor URL supplied: https://gymkhanarestaurants.com
Captured donor evidence: https://gymkhanalondon.com

## 1. Page And Route Inventory

- Homepage: `/` with hero, story, food, community/events, visit band, and footer.
- Inner pages: `/food`, `/weekend-market`, `/fresh-baskets`, `/events`, `/faq-s`, `/contact`.
- Detail/legacy page: `/events-1` redirects to `/events` so the indexed current URL remains valid.
- Form, booking, checkout, account, or dashboard paths: no authenticated or transactional flow is
  supported by evidence. Contact actions are phone, WhatsApp, email, and map links.
- Intentionally excluded: `/my-account` is deferred because the current page only exposes a failed
  Wix widget and no evidenced customer value. The unrelated Gymkhana location/news/career routes
  are donor structure only and do not map to the client.

## 2. Flow Map

- Primary navigation: compact masthead trigger → full-screen menu → page route; direct home link
  through the wordmark; footer repeats all public routes.
- Conversion path: visual story → food/community proof → Visit Us CTA → contact details, map,
  WhatsApp, phone, or email.
- Forms and validation states: no fake form. Newsletter and general inquiry widgets are omitted
  until a real endpoint exists.
- Menus/modals: accessible full-screen navigation with escape key, close button, focus management,
  and route links. FAQ uses a semantic accordion. No tabs, filters, or carousels required.
- Success/error/empty/loading: links use native browser behavior; unsupported market/basket details
  display a clear "contact for current details" state, not fabricated content.

## 3. Section And Responsive Rhythm

- Desktop: 100svh hero; 120-160px story fields; 16:10 framed media; one asymmetric editorial split;
  80-90svh place band; compact red/green footer.
- Tablet: preserve the visual order and large media, reduce text measure and section padding, keep
  split layouts only when each column remains at least 320px.
- Mobile: portrait hero and image crops; one-column content; information card spans the lower hero;
  72-96px section padding; footer stacks.
- Section order/rhythm: hero → story → framed food → food statement → community split → visit band → footer.
- Typography: small tracked uppercase labels, warm display serif, plain sans body/UI; fluid sizes
  with `clamp()` and 60-70ch maximum reading measure.

## 4. Interaction And Animation Audit

- Scroll-driven: one-shot IntersectionObserver opacity/translate reveals; restrained media scale.
- Click-driven: menu open/close, FAQ accordion, floating-card dismiss.
- Hover/focus: underlines, button inversion, slight image scale only on precise-pointer devices;
  visible focus rings on every control.
- Timed/autoplay: hero aperture, wordmark settle, and information-card rise run once after load.
- Sticky/scroll-snap/parallax/pinned: fixed masthead only. No scroll snap or pinned storytelling.
- Video/Lottie/Rive/canvas/WebGL/Three.js: none.
- Reduced motion: remove smooth transitions/transforms and render all content in its final state.

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets: all Gymkhana screenshots, DOM, copy, videos, and extracted asset URLs
  remain under `references/reference-first/` and never enter `app/public`.
- Production replacements: local copies of photographs from the client's own Wix site; one semantic
  crop assignment per section, logged in `asset-log.md`.
- Fonts: open Cormorant Garamond (display) and Manrope (body/UI), with serif/sans fallbacks.
- Icons/SVGs: original inline leaf/citrus mark, menu lines, arrow, and social glyphs built in code.
- Video/generated media: none required.
- Rights: client-site photographs are treated as client-owned inputs under the factory rules.
  No Gymkhana asset, wording, or protected identity ships.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS, with CSS transitions and a
small IntersectionObserver/React state layer for navigation, FAQ, card dismissal, and scroll reveals.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: not needed; the donor's motion is light enough for CSS and IntersectionObserver.
- Three.js / WebGL / canvas: not needed; there is no 3D or particle interaction.
- Lottie / Rive: not needed; the signature aperture is a CSS clip-path transition.
- Supabase / database: not needed; no stored customer data or transaction is evidenced.
- CMS: not needed for this static first release; content changes are infrequent.
- Auth: not needed; current account widget is broken and unsupported by an evidenced workflow.
- Tailwind, Lenis, and new runtime dependencies: not needed.

## 8. Builder Handoff

- Components: masthead/menu, hero aperture, floating details card, section label, framed media,
  editorial split, visit band, FAQ accordion, footer, and shared inner-page hero/layout.
- Shared tokens/global CSS: brand palette, serif/sans typography, 120-160px desktop rhythm,
  ornamental line work, focus styles, reveal utilities, reduced-motion overrides.
- Highest fidelity risks: hero wordmark timing, portrait crop on mobile, keeping the framed-image
  proportions, and avoiding content density that breaks the donor's generous rhythm.
- QA: typecheck/build, desktop/mobile screenshots for every built route, console/link/axe scan,
  clone pixel comparison, translation structure comparison, motion capture, reduced-motion capture,
  and donor-asset gate.

## Donor Mechanical Facts

- 7 captured sections; 11 reference-only assets.
- Baskerville hierarchy; type scale 36 / 32 / 28 / 20 / 18 / 16 / 12.
- Dominant colors: cream `#fff1d6`, club green `#27372f`, burgundy `#66090f`.
- No animation library detected; four fixed/sticky elements; no autoplay video.
