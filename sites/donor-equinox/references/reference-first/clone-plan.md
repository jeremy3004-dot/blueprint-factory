# Clone Plan: donor-equinox

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: crossfit.com
Donor URL: https://www.crossfit.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:14:16.023Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 17 (see `references/reference-first/sections/`)
- Assets inventoried: 31 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Inter, ingra-condensed, PFDIN, PFDINExpanded
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #ffffff (366), #1a1a1a (267), #181818 (45), #000000 (26), #dcdcdc (22), #8e8e93 (14), #eeeeee (11), #6d6d6d (10), #075dc6 (8), #5f5f5f (7)
- Heading font: PFDIN · Body font: Inter
- Type scale (px, desc): 96, 72, 56, 36, 24, 20, 16, 14, 13, 12, 10

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — (no label) [header]
- `/260707` — Tuesday 260707 [header]
- `/army-ignited` — Military Resources [header]
- `/careers` — Careers [footer]
- `/certificate-courses` — Certificate Courses [footer]
- `/certificate-courses/level-1` — Level 1 Certificate Course [header]
- `/certifications` — Certifications [footer]
- `/contact-us` — Contact Us [footer]
- `/cookie-policy` — Cookie Policy [footer]
- `/courses-near-you` — Courses Near You [footer]
- `/crossfit-is-the-cure` — CrossFit Is the Cure [header]
- `/crossfit-movements` — Movements [header]
- `/disclaimer` — Disclaimer [footer]
- `/education/about` — Courses [header]
- `/education/explore-courses` — Explore All Courses [header]
- `/education/resources` — Coaching Resources [header]
- `/essentials/movements` — Movements [footer]
- `/essentials/the-crossfit-effect` — The CrossFit Effect [header]
- `/essentials/the-front-squat` — The Front Squat [body]
- `/faq` — FAQ [footer]
- `/field-leaders` — Field Leaders [footer]
- `/foundation` — Foundation [footer]
- `/get-started` — Get Started [footer]
- `/global-mentor-program` — Global Mentor Program [footer]
- `/heroes` — Hero Workouts [header]
- `/iptheft` — Report IP Theft [footer]
- `/map` — Find a Gym [header]
- `/media` — Media [header]
- `/open-crossfit-gym` — Open a CrossFit Gym [header]
- `/privacy-policy` — Privacy Policy [footer]
- `/private-course` — Private Courses [header]
- `/promotional-terms-and-conditions` — Promotional Terms and Conditions [footer]
- `/scholarship-program-inquiry` — Scholarship Program [footer]
- `/terms-and-conditions` — Terms & Conditions [footer]
- `/what-is-crossfit` — Getting Started [header]
- `/wod` — Workout of the Day [header]
- `/workout` — Workouts [header]
