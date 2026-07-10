# Visual Review: Dorje's Resort & Spa

## Latest Verdict

Status: READY_FOR_REVIEW

The adversarial review agent passes the second implementation pass. No automated or agent-review fail condition remains; the factory's owner/human approval gate is still required before any production deployment.

## Signature Moment Check

**Pass.** The Lake Aperture is implemented in `LakeAperture.tsx`: the photographic resort frame expands from 1260px to the viewport over the first 300px of desktop scroll, the Dorje's wordmark remains centered, and the illustrated 60-second resort film is available through an explicit watch control. Reduced motion disables the aperture expansion, and the content remains complete.

Evidence:

- Normal motion: `qa/motion/motion.webm`
- Reduced motion: `qa/motion/motion-reduced.webm`
- Clean desktop/mobile stills: `screenshots/desktop.png`, `screenshots/mobile.png`

## Reference Comparison

Latest objective translation comparison (`qa/compare/report.md`):

- Structure score: **86.3%** (target >=85%)
- Raw pixel match: desktop **47.5%**, mobile **55.1%** — expected translated range
- Section count: build **8** vs donor **8**
- Worst band: section band 3 at **30.5%** raw pixel match; this is the client-media/experience rail region and does not represent a structural miss
- Media/text band agreement remains high and all Aman media/copy is absent from the shipped app

Primary donor comparison:

- Aman uses a quiet masthead, framed cinematic media, asymmetric 2/3–1/3 feature pair, clipped horizontal story rail, centered interlude, three portrait stories, conversion strip and dense footer.
- Dorje's preserves that sequence and interaction hierarchy while replacing the skin with its own warm ivory/olive palette, lake/room/food imagery, founder story and booking/contact paths.
- The reviewer initially failed the illustrated first frame, missing aperture behavior, oversized typography, long rhythm and capture artifacts. The second pass replaces the opening with property photography, makes film opt-in, implements the aperture, tightens type/spacing, improves body readability and recaptures clean proof.

## Clone Plan Coverage

- Pages/routes: `/`, `/accommodation-in-pokhara`, and `/tastes` built; every other current route is explicitly deferred with a reason in `pages.json`.
- Flows/states: menu open/close/Escape/focus-return verified; external booking remains the source of truth; film play/pause state verified; rails are touch/keyboard scrollable.
- Animation mechanisms: CSS transitions, one IntersectionObserver reveal helper, native video and the bounded Lake Aperture scroll calculation. No heavy library is used.
- Stack fit: TypeScript + Next.js App Router + React + global CSS is sufficient; no CMS, auth, database, GSAP, WebGL, Lottie or Rive is required.
- Rights: all production media is Dorje's client-owned material from the current site; Aman assets remain reference-only.

## Scores

- First-screen impact: 4
- Signature moment: 4
- Typography: 4
- Layout and rhythm: 4
- Motion craft: 4
- Color and imagery: 4
- Mobile: 4
- Coherence: 4

## Highest Impact Next Fix

No implementation blocker remains. Before a real production launch, the client should confirm the current phone number, live room rates and spa availability language; these truth checks should precede any production copy expansion.

