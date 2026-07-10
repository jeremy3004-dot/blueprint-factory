# Hero Specification
## Overview
- Target files: `app/src/components/home/Hero.tsx` and `app/src/components/home/FirstLightSequence.tsx` (Task 4).
- Evidence: `../donor-1440.png`, `../donor-390.png`, `../donor-motion.webm`, `../donor-motion-reduced.webm`, DOM `.wp-block-rf-section-hero-cta`.
- Interaction model: donor hero is static; Avya translation adds the approved time/state-driven Pure Energy / First Light Sequence without changing donor geometry.

## DOM Structure
`section.hero > media-stage > image layers + scrim`, then `hero-layout > h1 + supporting p + CTA group`; one state label/progress control may sit inside the text layer. All three sequence states remain in accessible content.

## Computed Styles
- 1440: full-bleed `1440×815.3px`, margin `0 -57.6px`; layout padding `201.6px 57.6px`; H1 box `772.8×227.8px`, Geller reference `94.928px/113.914px`, light `rgb(255,248,240)`.
- 768: hero `768×665.4px`, margin `0 -30.72px`, padding `107.52px 30.72px`; H1 `81.488px/97.7856px`.
- 390: hero `390×816px`, margin `0 -16px`, layout `display:flex`, padding `56px 16px`; H1 `75px/90px`, box `358×270px`.
- Base ink/light roles: `rgb(34,38,33)` and `rgb(255,248,240)`.

## States and Behaviors
- Sequence states: `Pure energy` → `Deep recovery` → `First light`; media opacity crossfade, text reveal, and progress update use React state.
- No scroll pinning, parallax, GSAP, Lenis, canvas, or video autoplay is evidenced/required.
- CTA routes to `/membership`; secondary registration action may use `https://avya.club/register`.

## Assets
Use only logged Avya media from `../../../../avya-club-brand-source/references/reference-first/extraction/assets.json` or a logged placeholder. Donor `HVS09361.webp` is reference-only.

## Text Mapping
Avya source: visible homepage definition of Avya as Sanskrit for “pure” and “first light,” plus fitness/healing/mindfulness narrative. Required labels from approved plan: `Pure energy`, `Deep recovery`, `First light`, `Explore membership`. Never translate Republic's limited-time two-week claim.

## Responsive Behavior
Maintain full-bleed media and left-aligned text. Desktop/tablet use the exact scale/gutters above; mobile keeps the tall 816px first screen and stacks actions without clipping.

## Reduced Motion
Render the first complete state immediately; no timers, transforms, crossfade, or hidden text. All content and membership action remain visible/reachable.

## Acceptance Checks
- Exact desktop/tablet/mobile geometry is recognizable against donor captures.
- Three labels and one real Avya image alt are present.
- Sequence wraps deterministically; no heavy motion library.
- Reduced motion has no timer/transform and no missing content.
