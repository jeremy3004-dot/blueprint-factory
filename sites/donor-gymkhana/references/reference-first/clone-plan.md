# Clone Plan: donor-gymkhana

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: gymkhanalondon.com
Donor URL: https://gymkhanalondon.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T16:19:51.097Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 7 (see `references/reference-first/sections/`)
- Assets inventoried: 11 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: baskerville, baskerville Fallback
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #fff1d6 (276), #27372f (180), #000000 (2), #66090f (1), oklab(0.962201 0.00417483 0.0382388 / 0.9) (1)
- Heading font: baskerville · Body font: baskerville
- Type scale (px, desc): 36, 32, 28, 20, 18, 16, 12

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Gymkhana [header]
- `/food-and-drink` — Learn more [body]
- `/impact-and-careers` — Impact & Careers [footer]
- `/locations` — Explore [body]
- `/news` — (no label) [body]
- `/news/42-reopens-after-winter-break-16th-january` — (no label) [body]
- `/news/february-late-night-dj-programme-at-42` — (no label) [body]
- `/news/gymkhana-announces-dubai-opening-this-september` — (no label) [body]
- `/news/gymkhana-sister-restaurant-ambassadors-clubhouse-earns-1-michelin-star` — (no label) [body]
- `/newsletter` — Newsletter Signup [footer]
- `/privacy-policy` — Privacy Policy [footer]
- `/story` — Read more [body]
