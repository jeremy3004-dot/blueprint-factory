# Clone Plan: donor-six-senses

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: kamalaya.com
Donor URL: https://www.kamalaya.com

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

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind, plus the donor's detected motion stack (GSAP, Swiper) or the smallest equivalent.
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

Auto-drafted by `blueprint capture` on 2026-07-07T16:28:06.457Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 20 (see `references/reference-first/sections/`)
- Assets inventoried: 101 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: eicons, brandon-grotesque, BrandonGrotesque-Light, Font Awesome 5 Brands, Font Awesome 5 Free, swiper-icons, revicons, WistiaPlayerInterNumbersSemiBold
- Animation libraries: GSAP, Swiper
- Dominant colors (by frequency): #333333 (1711), #ffffff (454), #444444 (258), #000000 (77), #54595f (50), #f0f0f0 (20), #e3a215 (19), rgba(0, 0, 0, 0.7) (18), #2277ff (12), #822127 (10)
- Heading font: brandon-grotesque · Body font: brandon-grotesque
- Type scale (px, desc): 50, 36, 34, 32, 30, 25, 22, 20, 18, 17, 16, 15

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — HOME [header]
- `/about` — About Kamalaya [header]
- `/dining-at-kamalaya` — Restaurants & Cuisine [header]
- `/immunity-resilience` — Resilience & Immunity [header]
- `/services-facilities` — FACILITIES [header]
- `/special-offer-kamalaya` — OFFERS [header]
- `/wellness-retreats` — Explore Wellness Programs by selecting your Personal Wellness Goals [header]
