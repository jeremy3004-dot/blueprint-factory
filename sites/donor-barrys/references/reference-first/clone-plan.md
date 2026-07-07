# Clone Plan: donor-barrys

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: barrys.com
Donor URL: https://www.barrys.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:17:46.365Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 11 (see `references/reference-first/sections/`)
- Assets inventoried: 31 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: webflow-icons, Benton Sans Pro Book, Benton Sans Pro, Unitedsansreg, Antenna, Inter
- Animation libraries: Swiper
- Dominant colors (by frequency): #000000 (1456), #ffffff (150), #757575 (135), #2d62ff (85), #111111 (68), #555659 (16), #020202 (13), #d6001a (12), #333333 (11), #dbd9d6 (6)
- Heading font: Antenna · Body font: Antenna
- Type scale (px, desc): 48, 32, 28, 24, 22, 20, 16, 15, 14, 13, 12, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — download the app [nav]
- `/about` — About Us [body]
- `/accessibility-statement` — Accessibility Statement [body]
- `/ar` — Arabic [nav]
- `/become-a-global-partner` — Franchise [body]
- `/blog` — Blogs [body]
- `/booking` — Gift Cards [body]
- `/careers` — Careers [body]
- `/community-events` — Community Events [body]
- `/contact-us` — Contact Us [body]
- `/cookie-policy` — Cookie Policy [body]
- `/corporate-events` — Corporate Events [body]
- `/da` — Danish [nav]
- `/es` — Spanish [nav]
- `/faq` — FAQ [body]
- `/fr` — French [nav]
- `/fuel-bar` — Fuel Bar [body]
- `/instructors` — Instructors [body]
- `/it` — Italian [nav]
- `/my-account` — my account [nav]
- `/privacy-policy` — Privacy Policy [body]
- `/ride-faq` — Barrys Ride [body]
- `/studios` — Book Your First Class [nav]
- `/studios-coming-soon` — Global Expansion [body]
- `/sv` — Swedish [nav]
- `/terms-of-service` — Terms of Service [body]
- `/the-lifestyle` — THE LIFESTYLE [nav]
- `/the-workout` — THE WORKOUT [nav]
