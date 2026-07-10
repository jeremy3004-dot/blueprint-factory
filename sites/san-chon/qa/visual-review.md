# Visual Review: San Chon

## Latest Verdict

Status: NEEDS_HUMAN_BEAUTY_PASS

The automated evidence pack is complete. A human still needs to watch both motion files and approve the Ember Seal signature moment before this can become `READY_FOR_REVIEW`.

## Signature Moment Check

- Named moment: **Ember Seal**.
- Build location: homepage hero.
- Evidence: `screenshots/pages/home/desktop.png`, `screenshots/pages/home/mobile.png`, `qa/motion/motion.webm`, and `qa/motion/motion-reduced.webm`.
- Automated/browser preflight: the brass seal, circular aperture, headline rise, and reduced-motion static state are implemented.
- Human judgment still required: whether the reveal lands with sufficient weight and whether the single ring pulse feels restrained.

## Reference Comparison

- Primary donor: COTE Korean Steakhouse, captured under `references/reference-first/`.
- Borrowed moves: black/brass navigation, central-grill hero, narrow conversion rails, tabbed full-bleed experience, split editorial bands, long sensory collage, dense visit/footer close.
- Translation structure score: **85.5%** (target ≥85%).
- Raw pixel match: **55.4% desktop / 52.6% mobile**, correctly inside the expected 40–60% translation range.
- Worst objective band: section band 3, 17.5% raw pixel similarity; this contains translated favorites/experience material with intentionally different imagery and copy.
- Structure: **12 build sections vs 12 donor sections**.
- Media/text band agreement: **100%**.
- Heading hierarchy match: 18.4% (16 build headings vs 49 donor headings; donor extraction includes repeated/hidden carousel and tab headings).
- Palette coverage: 25%; donor utility/campaign colors were intentionally translated to the San Chon brass/ember/celadon system.
- Font match: intentionally no; proprietary donor roles were replaced with open Cormorant Garamond and DM Sans.

## Clone Plan Coverage

- Pages/routes: `/`, `/menu`, and `/visit` are built and captured at desktop, tablet, and mobile.
- Flows/states: mobile menu, phone reservation links, directions, Instagram, favorite previous/next, experience tabs, and reduced motion are implemented.
- Animation mechanisms: CSS aperture/settle, living-still scale, one-shot IntersectionObserver reveals, and CSS scroll snap; no unnecessary heavy animation runtime.
- Stack fit: Next.js App Router + React + TypeScript + global CSS; no CMS, auth, database, GSAP, Swiper dependency, WebGL, Lottie, or Rive.
- Rights: donor assets remain reference-only; all production images are original generated media.

## Human Scores

Not assigned by the worker. The owner should score first-screen impact, signature moment, typography, layout/rhythm, motion, imagery, mobile, and coherence from 1–5 after watching the captures.

## Highest-Impact Human Review Question

Does the Ember Seal reveal feel memorable enough to carry the first screen without becoming theatrical? If not, adjust only its timing/contrast before reconsidering the rest of the page.

## Beauty Gate Record

- 2026-07-10T19:45:28.940Z: factory confirmed all required evidence and stopped at the human Beauty Pass.
