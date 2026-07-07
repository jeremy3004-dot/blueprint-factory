# Clone Plan: donor-jose-villa

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: abbyjiu.com
Donor URL: https://www.abbyjiu.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:26:24.273Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 10 (see `references/reference-first/sections/`)
- Assets inventoried: 56 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: squarespace-ui-font, social-icon-font, Ogg-Light, script, GaramondRR-LightItalic, Questrial-Regular, FreightBig-Pro-Book, Poppins-SemiBold, FreightSans-Pro-Book, minerva-modern, freight-big-pro, freight-display-pro, commuters-sans, ss-pro
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #222222 (794), #ffffff (97), #000000 (86), #252524 (51), #212121 (29), #111111 (24), #090606 (11), #fcfcfc (10), #1d1d1d (9), #5d5c56 (3)
- Heading font: ss-pro · Body font: freight-big-pro
- Type scale (px, desc): 37, 36, 32, 30, 20, 19, 18, 17, 16, 15, 14, 13

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Home [header]
- `/a-cancun-beach-wedding` — A Cancun Beach Wedding [body]
- `/a-chic-destination-wedding-on-the-amalfi-coast` — A Chic Wedding on the Amalfi Coast [body]
- `/a-love-shack-fancy-inspired-wedding` — Love Shack Fancy Inspired Wedding [body]
- `/abbys-portfolio` — Abby's Showcase [body]
- `/about` — About [header]
- `/blog` — Journal [header]
- `/contact` — Contact [header]
- `/estate-wedding-in-horse-country` — Estate Wedding in Horse Country [body]
- `/faq` — FAQ [header]
- `/iconic-meridian-house-wedding` — Iconic Wedding at Meridian House [body]
- `/planner-testimonials/493xomel2p2t6hampuwj6worm7rjti` — Bride, Kayla Calloway [body]
- `/planner-testimonials/79e7nniqcfwonewr0mcqx3196y0c4v` — Laura Ritchie of Grit and Grace Inc. [body]
- `/planner-testimonials/dc4r9hq2qu6hlv0dqpo03dnpqmfnwq` — Lauryn Prattes of Lauryn Prattes Events [body]
- `/planner-testimonials/mr12fney614qt075gzuxxaunp961bl` — Bride, Dani Mettel [body]
- `/planner-testimonials/wtpz4zt7wu2q3qz90pno6hlh23h1ey` — Bride, Chelsea Carrol [body]
- `/portfolio` — Portfolio [header]
- `/published` — Published [header]
- `/services` — Services [header]
- `/the-bride-wore-danielle-frankel-at-blue-hill-stone-barns` — The Bride Wore Danielle Frankel at Blue Hill Stone Barns [body]
