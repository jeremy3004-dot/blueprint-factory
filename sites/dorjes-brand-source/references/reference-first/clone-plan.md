# Clone Plan: dorjes-brand-source

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: dorjes.com
Donor URL: https://dorjes.com

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

Auto-drafted by `blueprint capture` on 2026-07-10T18:43:16.751Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 9 (see `references/reference-first/sections/`)
- Assets inventoried: 42 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Gilda Display, Avenir, Avenir_Mediam
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): rgba(69, 68, 58, 0.86) (304), #fffce9 (224), #7d6b00 (206), #ffffff (21), #111111 (14), rgba(255, 255, 255, 0.9) (12), #cab431 (6), rgba(17, 17, 17, 0.9) (6), #8f7f21 (5), #eec969 (5)
- Heading font: Gilda Display · Body font: Avenir
- Type scale (px, desc): 173, 60, 52, 36, 28, 24, 20, 18, 17, 14, 13

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Skip to main content [header]
- `/about-dorje` — DORJE [header]
- `/accommodation-in-pokhara` — COMFORT [header]
- `/blogs` — BLOGS [header]
- `/booking` — BOOK NOW [header]
- `/category/blogs` — Blogs [footer]
- `/contact` — CONTACT [header]
- `/deluxe-room` — Deluxe Room [footer]
- `/dorje` — (no label) [header]
- `/dorje-suite` — Dorje Suite [footer]
- `/faqs` — FAQs [footer]
- `/index.php` — TASTE [header]
- `/jen-suite` — Jen Suite [footer]
- `/lakes-in-pokhara` — Famous Lakes in Pokhara to visit in 2026 [body]
- `/media-gallery` — MEDIA GALLERY [header]
- `/national-geographic-traveller` — (no label) [body]
- `/paragliding-in-pokhara` — Paragliding in Pokhara: Things You Should Know [body]
- `/resort` — RESORT [header]
- `/spa-and-wellness` — REJUVENATE [header]
- `/standard-room` — Standard Room [footer]
- `/sustainability` — SUSTAINABILITY [header]
- `/tastes` — TASTE [header]
- `/top-10-places-to-visit-in-pokhara` — Pokhara valley [body]
