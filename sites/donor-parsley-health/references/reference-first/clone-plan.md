# Clone Plan: donor-parsley-health

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: parsleyhealth.com
Donor URL: https://www.parsleyhealth.com

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

Auto-drafted by `blueprint capture` on 2026-07-07T17:08:42.104Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 15 (see `references/reference-first/sections/`)
- Assets inventoried: 105 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: EuclidCircularB, Teodor
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #284849 (2112), #ffffff (256), #4a786a (249), #f8f6f2 (134), oklab(0.377494 -0.0359052 -0.0118361 / 0.4) (48), #fcfbfa (47), #6fb29f (37), oklab(0.377494 -0.0359052 -0.0118361 / 0.7) (27), #737373 (18), #132d2e (14)
- Heading font: EuclidCircularB · Body font: EuclidCircularB
- Type scale (px, desc): 260, 64, 61, 48, 40, 38, 32, 30, 28, 26, 21, 20

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — (no label) [nav]
- `/accessibility-statement` — Accessibility Statement [footer]
- `/blog` — Blog [footer]
- `/blog/functional-testing-at-parsley-health` — It's Not "All In Your Head." Diagnose Unexplained Symptoms with Functional Testing at Parsley Health. [body]
- `/blog/is-functional-medicine-legit` — Is Functional Medicine Legit? Your Ultimate Guide To How It Works [body]
- `/blog/parsley-health-primary-care-provider-difference` — What’s the Difference Between a Primary Care Provider (PCP) and Parsley Health? [body]
- `/care` — Complete Care [nav]
- `/care/autoimmune-disease-treatment` — Autoimmune & Inflammation [body]
- `/care/conditions` — Conditions [nav]
- `/care/detox` — Detox & Environmental Exposure [body]
- `/care/hormonal-imbalance-treatment` — Hormone Health & Balance [body]
- `/care/improve-gut-health` — Gut & Digestive Health [body]
- `/care/longevity` — Longevity & Healthspan [body]
- `/care/menopause-peri` — Perimenopause & Menopause [body]
- `/care/mental-health` — Mental & Emotional Health [body]
- `/care/metabolic-health` — Metabolic Health [body]
- `/care/metabolic-heart-rate` — Heart Health [body]
- `/care/reproductive-health` — Fertility, Pregnancy, & Postpartum [body]
- `/care/unexplained-illness` — Unexplained Symptoms [body]
- `/careers` — Careers [footer]
- `/clinical-membership-terms` — Clinical Membership [footer]
- `/company` — About Parsley [footer]
- `/contact` — Contact Us [footer]
- `/faq` — FAQs [footer]
- `/how-it-works` — How It Works [footer]
- `/insurance` — Pricing & Insurance [footer]
- `/join/care` — Join Now [nav]
- `/join/get-labs` — Book a lab review [footer]
- `/la` — Los Angeles [footer]
- `/labs` — Clinical Lab Review [nav]
- `/labs/how-it-works` — How It Works [footer]
- `/labs/what-we-test` — What We Test [footer]
- `/labs/why-our-providers` — Why Our Providers [footer]
- `/locations` — Virtual [footer]
- `/lp/create` — Creators [footer]
- `/membership-terms` — Terms & Conditions [footer]
- `/notice-of-privacy-practices` — Notice of Privacy Practices [footer]
- `/nutrition-coaching` — Nutrition Coaching [footer]
- `/ny` — NYC [footer]
- `/our-services` — What We Offer [footer]
- `/press` — Press [footer]
- `/privacy-policy` — Privacy Policy [footer]
- `/providers` — Our Clinicians [footer]
- `/quiz` — Parsley Symptom Index [footer]
- `/reviews` — Reviews [footer]
- `/robin-berzin-md` — Dr. Robin Berzin [footer]
- `/store` — Supplements [nav]
- `/store/collections/best-sellers` — See all [body]
- `/terms-of-use` — Terms of Use [footer]
- `/why-it-works` — Our Approach [nav]
