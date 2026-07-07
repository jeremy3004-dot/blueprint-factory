# Clone Plan: donor-onyx-coffee

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: onyxcoffeelab.com
Donor URL: https://onyxcoffeelab.com

This file is written before art direction or build work. It is the donor-forensics contract: if a builder would still need to guess pages, states, motion, assets, or stack, this plan is not complete.

## 1. Page And Route Inventory

- Homepage:
- Inner pages:
- Detail pages:
- Form, booking, checkout, account, or dashboard paths:
- Routes intentionally excluded, and why:

## 2. Flow Map

- Primary navigation:
- Conversion path:
- Forms and validation states:
- Menus, modals, tabs, accordions, filters, carousels, or media controls:
- Success, error, empty, and loading states:

## 3. Section And Responsive Rhythm

- Desktop structure:
- Tablet structure:
- Mobile structure:
- Section order and spacing rhythm:
- Typography hierarchy:

## 4. Interaction And Animation Audit

For each meaningful interaction, name the trigger, visual states, timing, and mechanism.

- Scroll-driven:
- Click-driven:
- Hover/focus:
- Timed or autoplay:
- Sticky, scroll-snap, parallax, or pinned sections:
- Video, Lottie, Rive, canvas, WebGL, or Three.js:
- Reduced-motion expectation:

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets:
- Production replacement assets:
- Fonts:
- Icons and SVGs:
- Video or generated media:
- Licensing or rights notes:

## 6. Implementation Stack Decision

Write one plain sentence naming the smallest correct stack.

Example:

```text
Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions and a tiny IntersectionObserver/React state layer for scroll reveals. No GSAP, Three.js, CMS, auth, or database needed for this donor.
```

Decision:

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind, plus the donor's detected motion stack (Swiper) or the smallest equivalent.
## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger:
- Three.js / WebGL / canvas:
- Lottie / Rive:
- Supabase / database:
- CMS:
- Auth:
- Other:

## 8. Builder Handoff

- Components to build:
- Shared tokens and global CSS:
- Highest fidelity risks:
- QA checks required before translation:


## Auto-Captured Evidence

Auto-drafted by `blueprint capture` on 2026-07-07T16:49:10.823Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 20 (see `references/reference-first/sections/`)
- Assets inventoried: 44 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: swiper-icons, Andale, Room-205, Bajern, Kapra, Montserrat, Gotham Book, Juniper, Poppins-Klaviyo-Hosted, Warbler, Inter, Instrument Serif, Maison Neue Extended
- Animation libraries: Swiper
- Dominant colors (by frequency): #000000 (589), #fbfaf3 (390), #ffffff (309), #fcfaf2 (71), #808080 (14), #7d7d7a (10), #eee9df (5), #efefef (4), rgba(0, 0, 0, 0.6) (2), #191919 (1)
- Heading font: Montserrat · Body font: Bajern
- Type scale (px, desc): 115, 68, 40, 36, 24, 22, 21, 16, 14, 13, 12, 11

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Skip to content [header]
- `/account/login` — Login [header]
- `/cart` — 0 [header]
- `/collections/accessories` — Accessories [body]
- `/collections/all-merch` — All Merch [body]
- `/collections/apparel` — Apparel [footer]
- `/collections/barista-provisions` — Barista Provisions [body]
- `/collections/chocolate-covered` — Chocolate Covered [body]
- `/collections/coffee` — Coffee [footer]
- `/collections/coffee-archive` — Archive [footer]
- `/collections/collaborations` — Collaborations [body]
- `/collections/colombia-coffees` — Colombia Known for innovation and resilience, Colombia's coffee history dates back to the early 19th century. View Coffees → [body]
- `/collections/cometeer` — Cometeer [body]
- `/collections/doyenne` — Doyenne [footer]
- `/collections/drinkware` — Drinkware [footer]
- `/collections/ecuador-coffees` — Ecuador Ecuador’s coffee production is shaped by its incredible biodiversity, volcanic soils, and varied microclimates across the Andes, Amazon, and coastal regions. View Coffees → [body]
- `/collections/equipment` — Equipment [footer]
- `/collections/gift-subscriptions` — Subscriptions [footer]
- `/collections/instant-coffee` — Specialty Instant [body]
- `/collections/matcha` — Matcha [body]
- `/collections/peru-coffees` — Peru Peru offers some of the best offerings for us to enjoy. Known for care and craftsmanship, these offerings are sure to be enjoyed. View Coffees → [body]
- `/collections/red` — Explore (ONYX)RED [body]
- `/collections/special` — Box Sets [footer]
- `/collections/tea` — Tea [footer]
- `/collections/tea-box-sets` — Box Sets [body]
- `/collections/terroir` — Chocolate [footer]
- `/collections/traditional-bars` — Traditional Bars [body]
- `/pages/bentonville` — Bentonville [footer]
- `/pages/brew-guides` — Brew Guides [footer]
- `/pages/doyenne-cafe` — Doyenne [body]
- `/pages/equipment-repair` — Espresso Repair [footer]
- `/pages/faq` — FAQ [footer]
- `/pages/fay-square` — Fay Square [footer]
- `/pages/fayetteville` — Gregg St [footer]
- `/pages/find-my-roast` — Find My Roast [footer]
- `/pages/grind-size-calculator` — Grind Sizes [footer]
- `/pages/help-me-brew` — Help Me Brew [body]
- `/pages/help-me-choose` — Help Me Choose [footer]
- `/pages/jobs` — Careers [footer]
- `/pages/locations` — See Our Cafes [body]
- `/pages/our-story` — Awards [footer]
- `/pages/privacy` — Privacy Statement [body]
- `/pages/private-events` — Private Events [footer]
- `/pages/quick-order` — In a hurry? [body]
- `/pages/rogers` — Rogers [footer]
- `/pages/springdale` — Springdale [footer]
- `/pages/subscribe` — Subscriptions [body]
- `/pages/subscribe-tea` — Tea [footer]
- `/pages/support` — Help Center [footer]
- `/pages/terms` — Terms & Conditions [body]
- `/pages/the-momentary` — Momentary [footer]
- `/pages/wholesale` — Wholesale [footer]
- `/policies/privacy-policy` — Privacy Policy [footer]
- `/policies/terms-of-service` — Terms of Use [footer]
- `/products/cafe-expressions` — Cafe Expressions [body]
- `/products/circadian` — Circadian [body]
- `/products/colombia-la-riviera-sudan-rume-26` — Explore The Offering [body]
- `/products/decaf-ethiopia-suke-quto-26` — Explore This Offering [body]
- `/products/echelon` — Echelon [footer]
- `/products/echelon-2025` — Echelon 2026 [body]
- `/products/gift-card` — Gift Cards [footer]
- `/products/roasters-choice` — Roaster's Choice [footer]
- `/products/sipping-chocolate-powder` — Sipping Chocolate [body]
- `/products/usa-cycling` — EXPLORE THE COLLAB [body]
