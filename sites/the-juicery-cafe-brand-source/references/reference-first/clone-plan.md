# Clone Plan: the-juicery-cafe-brand-source

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: thejuicerycafe.com
Donor URL: https://www.thejuicerycafe.com

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

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind with CSS transitions and a small IntersectionObserver layer. No GSAP/Three.js/CMS detected on the donor.
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

Auto-drafted by `blueprint capture` on 2026-07-10T16:55:09.181Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 4 (see `references/reference-first/sections/`)
- Assets inventoried: 8 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: avenir-lt-w01_85-heavy1475544, courier-ps-w01, dancing script, dancingscript-regular, din-next-w01-light, helvetica-w01-roman, raleway, raleway-semibold, marck script
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #000000 (219), #3e603b (28), #0000ee (9), #ffffff (7), #5c5c5c (6), #174165 (4), #ffe042 (4), #f2e3dc (2), #fafafa (2), #116dff (1)
- Heading font: raleway-semibold · Body font: courier new
- Type scale (px, desc): 66, 62, 55, 45, 30, 21, 15, 14, 13, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — #comp-jf6il93h svg [data-color="1"] {fill: #FFFFFF;} [body]
