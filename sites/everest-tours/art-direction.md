# Art Direction: Everest Tours

Date: 2026-07-07
Status: draft
Owner sign-off: pending

## 1. What this site is

A premium editorial travel site for a fictional Kathmandu trekking company selling small-group treks and cultural tours to foreign travelers. It should make Everest Tours feel calm, deeply local, and operationally competent.

## 2. The visual world

Cinematic Himalayan editorial: quiet, high-contrast, image-led, and expert without luxury cliches.

## 3. The signature moment (required)

The "Altitude Line" moment: as the hero settles, a fine marigold route line draws from Kathmandu toward Everest across the image, then resolves into the first trek card label.

## 4. Motion language

- Pace: slow and weighted on hero/media, crisp on controls.
- Easing feel: smooth and gliding, never bouncy.
- Scroll feel: native scroll with light reveal timing; no heavy scroll hijack.
- Restraint: text and cards reveal once; the route line is the only signature flourish.

## 5. Typography

- Display typeface: Oswald, an open condensed sans that substitutes the donor's narrow uppercase display role.
- Body typeface: Inter for readable itinerary and planning copy.
- Typographic move: uppercase compressed headings paired with small, calm body text in narrow editorial measures.

## 6. Color world

- Base and background: deep Himalayan slate-blue for dark sections, snow off-white for editorial surfaces.
- Accent: marigold/saffron used sparingly for CTAs, fine rules, and route-line highlights.
- Overall feel: mostly calm dark/snow contrast with one warm signal color.
- Contrast rule: the accent should guide action, not wash the page in gold.

## 6b. Token translation (donor → brand)

- Colors changed from donor → brand: donor black/white/orange becomes `#132B3A` deep slate, `#F7F3EA` snow, `#D99A2B` marigold, `#6F7F86` glacial muted, and `#223F50` elevated slate.
- Fonts changed from donor → brand: donor `AlternateGotNo1D` and `Brandon Grotesque` are substituted with open `Oswald` for display and `Inter` for body/UI.
- Kept from donor (structure/rhythm to preserve): oversized hero display, condensed uppercase section titles, narrow editorial body measure, alternating white/dark/full-bleed media bands, and dense footer rhythm.

## 7. Layout system

- Grid feel: editorial and structured, with generous whitespace and occasional asymmetric image splits.
- Section variety: full-bleed hero, centered intro, image taxonomy grid, dark carousel, cinematic story band, split editorial panels, icon row, warm CTA, dense footer.
- First-screen plan: a full-viewport Himalayan hero with centered uppercase headline and the Altitude Line route draw, establishing place before asking for action.

## 8. Reference comparanda

- Primary donor: Black Tomato / blacktomato.com. Clone-derived structure: cinematic hero, restrained editorial intro, image-card journey taxonomy, dark trip carousel, split editorial panels, warm CTA, dense footer.
- Donor screenshots captured: desktop `references/reference-first/donor-1440.png`; mobile `references/reference-first/donor-390.png`.
- Donor topology notes: `references/reference-first/topology.md`.
- Donor clone plan: `references/reference-first/clone-plan.md`. Stack decision: TypeScript + Next.js App Router + React + global CSS/Tailwind, with CSS transitions and small React state for filters/accordions/reveals.
- Reference 1: Aman. Steal: quiet luxury restraint and calm image-first pacing.
- Reference 2: Much Better Adventures. Steal: clear trip-card information hierarchy and group-trip clarity.
- Reference 3: Nepal trekking operator field notes. Steal: practical confidence around altitude, guide ratios, permits, and contingency planning.

## 9. Anti-goals

- No donor copy or donor images in shipping app code.
- No invented awards, press logos, or named testimonials.
- No hype words, exclamation marks, or filler such as "world-class" or "best-in-class."
- No generic travel-grid homepage that loses the donor's editorial rhythm.
- No motion that fights scrolling or ignores reduced-motion preferences.

## 10. Deploy and backend expectation

- Deploy profile expected: Vercel preview.
- Backend expected: none.

## 11. What must be true before this site is called ready

- Homepage, Signature Treks, and Everest Base Camp detail pages are built and covered in `pages.json`.
- The Altitude Line signature moment is visible on the homepage hero and referenced in QA.
- All imagery is openly licensed or clearly AI-generated and logged.
- Factory check, compare, verify, and preview deploy have been run or honestly logged if blocked.
