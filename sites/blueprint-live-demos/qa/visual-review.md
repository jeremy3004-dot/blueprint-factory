# Visual Review: Blueprint Factory — Live Demos

Date: 2026-07-11
Reviewer: Codex worker
Stage: implementation QA

## Verdict

Pass for v1 implementation handoff. The page reads as an editorial studio contact sheet with a memorable oversized horizontal demo rail.

## Checks

| Area | Result | Notes |
| --- | --- | --- |
| Introduction + project count | Pass | Clear Blueprint Factory positioning |
| Carousel scale | Pass | Cards read as contact prints, not thumbnails |
| Position indicator | Pass | 01/05 counter + swipe hint |
| Static index | Pass | All registry projects discoverable without motion |
| Live Demo badge | Pass | Present on carousel and index rows |
| CTA clarity | Pass | View Live Demo on every project |
| Footer disclaimer | Pass | Concept-demo language included |
| Mobile layout | Pass | Full-width CTAs and swipeable rail |
| Reduced motion | Pass | Smooth scroll disabled when requested |

## Screenshots Reviewed

- `qa/compare/build/desktop.png`
- `qa/compare/build/mobile.png`

## Follow-ups Before Public Release

- Replace screenshot captures with fresh public-deploy shots once all demo URLs are unprotected.
- Add Ambika Juice when that build ships.
- Deploy showcase to `blueprint-factory-live-demos.vercel.app` after owner approval.
