# Clone Plan: Everest Tours from Black Tomato

Status: complete
Primary donor: Black Tomato
Donor URL: https://www.blacktomato.com
Client: Everest Tours

This plan is the donor-forensics contract. The clone stage should match Black Tomato's structure, section rhythm, responsive behavior, and restraint before the Everest Tours translation pass replaces copy, color, and imagery.

## 1. Page And Route Inventory

- Homepage: `/` built. Clone the donor's full editorial homepage rhythm: hero, intro, journey taxonomy, dark trip band, proof strip, cinematic story banner, editorial splits, reason icons, CTA, footer.
- Inner pages: `/signature-treks` built. Translate the donor's destination/trip browsing logic into a premium small-group trek listing page with filters and image-led cards.
- Detail pages: `/signature-treks/everest-base-camp` built. Translate the donor destination/detail pattern into one focused itinerary page with hero, overview, day rhythm, inclusions, guides, and enquiry CTA.
- Form, booking, checkout, account, or dashboard paths: deferred. This test client needs a static preview and enquiry CTAs only; no checkout/auth/database.
- Routes intentionally excluded, and why: awards, press, testimonials, account, trip finder results, country archive, blog/inspiration archive, legal pages, and booking checkout are deferred because the scope is homepage plus two support pages.

## 2. Flow Map

- Primary navigation: logo/brand, Signature Treks, Cultural Tours, Guides, Why Everest Tours, Enquire. Mobile uses a compact menu panel or stacked links.
- Conversion path: hero CTA -> journey taxonomy -> trek cards -> itinerary detail -> enquiry CTA -> final CTA/footer.
- Forms and validation states: no live form in this job; enquiry CTAs link to contact anchors or email-style actions.
- Menus, modals, tabs, accordions, filters, carousels, or media controls: journey filter tabs, dark trip carousel/scroll strip, footer accordions on mobile, detail-page itinerary accordion.
- Success, error, empty, and loading states: not required for static preview; avoid fake booking/account flows.

## 3. Section And Responsive Rhythm

- Desktop structure: 12-section homepage sequence matching the donor topology with full-bleed hero, centered editorial copy, image card grid, dark horizontal trip band, proof strip, full-bleed story banner, split editorial sections, icon reasons, warm CTA, and dense footer.
- Tablet structure: keep the same order, reduce card count per row, preserve the dark trip band as horizontal scroll.
- Mobile structure: single-column stack, full-width image cards, lighter motion, footer accordions, and no pinned interaction that fights scroll.
- Section order and spacing rhythm: preserve donor alternation of immersive media, white editorial space, dark feature band, white editorial panels, warm CTA, and dense footer.
- Typography hierarchy: condensed uppercase display for titles and card labels; clean sans for body and navigation; no negative tracking.

## 4. Interaction And Animation Audit

For each meaningful interaction, name the trigger, visual states, timing, and mechanism.

- Scroll-driven: one-shot reveal for text and cards using copied `scroll-reveal` and `text-reveal` reference patterns.
- Click-driven: journey filter tabs and detail itinerary accordion use React state with accessible controls.
- Hover/focus: media card hover zoom/darken from the `parallax-media` pattern, gated to `hover:hover`.
- Timed or autoplay: none required.
- Sticky, scroll-snap, parallax, or pinned sections: horizontal trip strip uses native overflow/snap on mobile; no heavy pinned sections.
- Video, Lottie, Rive, canvas, WebGL, or Three.js: none required.
- Reduced-motion expectation: all reveal/hover motion disabled or simplified under `prefers-reduced-motion`.

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets: may remain only inside `references/reference-first/` or a clearly named `reference-only` path during clone measurement; they must not ship.
- Production replacement assets: use openly licensed remote Unsplash images through `images.unsplash.com` and log every URL in `asset-log.md`. No donor images in app code.
- Fonts: substitute licensed donor fonts with open alternatives. Use `Oswald` or equivalent condensed sans for display, `Inter` for body/UI unless the token tool chooses a better open substitute.
- Icons and SVGs: small inline CSS/icon glyphs only; no external icon dependency needed.
- Video or generated media: no production video required.
- Licensing or rights notes: no invented awards, real testimonials, or press logos. Proof language should be operational and factual.

## 6. Implementation Stack Decision

Decision: Build in TypeScript + Next.js App Router + React + global CSS/Tailwind, with CSS transitions and a small client-side React state layer for filters, accordions, and scroll-reveal classes. No GSAP, Three.js, Lottie, CMS, Supabase, auth, checkout, or database is needed for this donor and test-client scope.

## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger: not needed; donor evidence does not require heavy timeline animation.
- Three.js / WebGL / canvas: not needed; imagery and layout carry the experience.
- Lottie / Rive: not needed.
- Supabase / database: not needed for static preview.
- CMS: not needed for test build.
- Auth: not needed.
- Other: no paid image/video service, no booking engine, no analytics integration.

## 8. Builder Handoff

- Components to build: Header, Hero, EditorialIntro, JourneyGrid, TripCarousel, PressProofStrip, CinematicStoryBand, SplitFeature, GuideSection, ReasonsRow, CtaBand, Footer, TrekListing, TrekDetail, ItineraryAccordion.
- Shared tokens and global CSS: `app/tokens.json` drives slate-blue, snow, marigold, typography, spacing, and motion constants.
- Highest fidelity risks: donor hero image/video quality, dark carousel proportions, mobile footer density, and keeping brand translation from becoming generic travel-site layout.
- QA checks required before translation: `blueprint:check`, `blueprint:compare`, desktop/mobile screenshots, and run-log score entries. If compare cannot reach 85 after focused iterations, record plateau honestly.

## Auto-Captured Evidence

Auto-drafted by `blueprint capture` on 2026-07-07T09:54:27.805Z and reviewed manually for this job.

- Sections captured: 12 (see `references/reference-first/sections/`)
- Assets inventoried: 152 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Brandon Grotesque, Chronicle Display, AlternateGotNo1D, Aesthico, Cabin, Josefin Sans, League Gothic, siq-float, siq
- Animation libraries: none detected via script/global signatures
- Dominant colors: #000000, #52575c, #ffffff, #444444, #2f2f2f, #adadad
- Heading font: AlternateGotNo1D
- Body font: Brandon Grotesque
- Type scale (px, desc): 60, 45, 35, 34, 30, 26, 25, 23, 22, 20, 18, 17
