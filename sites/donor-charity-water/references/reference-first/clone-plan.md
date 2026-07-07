# Clone Plan: donor-charity-water

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: charitywater.org
Donor URL: https://www.charitywater.org

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:20:04.827Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 6 (see `references/reference-first/sections/`)
- Assets inventoried: 66 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Proxima Nova, Kazimir Text, Anonymous Pro, Founders Grotesk, Gabriel Sans, cw-icons, Proxima Nova Regular, Kazimir Text Regular, Roboto, swiper-icons
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #222520 (412), #000000 (306), #a1a1aa (170), #ffffff (138), #71716c (134), #333232 (78), #003366 (59), #2d2d2d (41), #ffca0a (21), #9b9b94 (17)
- Heading font: Kazimir Text · Body font: Proxima Nova
- Type scale (px, desc): 56, 46, 35, 29, 28, 24, 21, 20, 18, 17, 16, 15

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — (no label) [nav]
- `/about` — Explore charity: water at a glance [nav]
- `/about/executive-team` — Meet the executive team [footer]
- `/about/financials` — See our financialsLearn how your gift is being used to bring clean water to people who need it. [nav]
- `/about/jobs` — Careers [footer]
- `/about/request-speaker` — Request a Speaker [footer]
- `/about/scott-harrison-story` — Meet the founderSee how Scott Harrison's decision to reset his life inspired charity: water. [nav]
- `/account/login` — Sign in [nav]
- `/account/register` — Create an account [footer]
- `/advisor-toolkit/advisor` — Advisors [footer]
- `/brand-partnerships` — Partner with us [body]
- `/contact` — Contact Us [footer]
- `/crypto` — Donate crypto [body]
- `/donate` — Give [footer]
- `/donate/in-honor-of` — Give in Someone's Honor [footer]
- `/donate/the-spring` — Give monthlyJoin the global community serving people with clean water every month. [nav]
- `/donate/water-project-sponsorship` — Sponsor a water projectTransform an entire community or school with a gift of $10,000 or more. [nav]
- `/experience` — Visit the Experience LabExplore humanity’s search for water through virtual reality, holograms, and immersive video. [nav]
- `/football` — Join us [body]
- `/fundraise` — Fundraise for clean waterSupport clean water projects by raising funds for people in need. [nav]
- `/get-involved` — See all ways to make an impact [nav]
- `/get-involved/kids` — Students & Teachers [footer]
- `/global-water-crisis` — Why Water? [nav]
- `/how-we-work` — How we workLearn about how we build long-term sustainable water projects. [nav]
- `/mailing_list_subscribers/new` — Get our emails to stay in the know [nav]
- `/our-approach/100-percent-model` — The 100% ModelLearn how donors cover our operations, so 100% of donations fund clean water. [nav]
- `/our-work` — Our workSee our funded water projects and proof of impact. [nav]
- `/partnerships` — Become a brand partnerWork closely with our team to develop initiatives with undeniable impact. [nav]
- `/privacy` — Privacy policy [footer]
- `/responsible-disclosure-process` — responsible disclosure process [footer]
- `/the-tributary` — Explore legacy and asset givingMake a lasting gift through legacy or non‑cash giving to help ensure everyone has access to clean water. [nav]
- `/tiny-heroes` — Tiny Heroes [footer]
