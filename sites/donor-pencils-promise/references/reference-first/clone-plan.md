# Clone Plan: donor-pencils-promise

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: pencilsofpromise.org
Donor URL: https://pencilsofpromise.org

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:21:59.722Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 9 (see `references/reference-first/sections/`)
- Assets inventoried: 5 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: freight-text-pro, swiper-icons, proxima-nova, proxima-nova-condensed, brother-xs, brother-xl, eicons, Font Awesome 5 Brands, Font Awesome 5 Free, element-pack
- Animation libraries: Swiper
- Dominant colors (by frequency): #0e0e0e (743), #333333 (74), #f5b233 (61), #ffffff (55), #585858 (25), #000000 (19), #898989 (6), #666666 (4), #d9d9d9 (3), #fffaeb (3)
- Heading font: proxima-nova-condensed · Body font: proxima-nova
- Type scale (px, desc): 69, 48, 39, 38, 24, 22, 20, 19, 18, 17, 16, 15

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Skip to content [header]
- `/about` — About Us [header]
- `/about/financials` — Financials [header]
- `/about/our-people` — Our People [header]
- `/about/press` — Press [header]
- `/accessibility` — Accessibility [nav]
- `/blog` — Blog [header]
- `/contact` — Contact [header]
- `/es` — Español [body]
- `/founding-story` — Founding Story [header]
- `/gala` — Get Your Gala Tickets Now [header]
- `/jobs` — Jobs [header]
- `/lo` — ພາສາລາວ [body]
- `/marathon` — Run a Marathon [header]
- `/our-work` — Our Work [header]
- `/our-work/school-builds` — School Builds [header]
- `/our-work/teacher-support` — Teacher Support [header]
- `/our-work/wash` — WASH [header]
- `/privacy-donor-policy` — Privacy & Gift Policy [nav]
- `/site-map` — Site Map [nav]
- `/take-action/campaign` — Start a Campaign [header]
- `/take-action/partner` — Partner with Us [header]
- `/take-action/spread-the-word` — Brand Assets [nav]
- `/the-cornerstone-fund` — Recurring Giving [header]
- `/ways-to-support` — Ways to Support [header]
