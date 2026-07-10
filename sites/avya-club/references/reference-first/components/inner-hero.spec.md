# Inner Hero Specification
## Overview
- Target file: `app/src/components/InnerHero.tsx` (Task 6), shared by `/about`, `/services`, `/gallery`, `/contact`, `/membership`.
- Evidence: `../donor-1440.png` hero/band hierarchy, `../donor-390.png`, and brand-source `../../../../avya-club-brand-source/references/reference-first/donor-1440.png` / `donor-390.png`.
- Interaction model: static page introduction with optional one-time reveal.

## DOM Structure
`section.inner-hero > media/scrim (optional) + eyebrow + h1 + summary + primary action (optional)`. The page owns its copy; component owns hierarchy and geometry.

## Computed Styles
Derive from donor hero/band: full-bleed margins `-57.6px/-30.72px/-16px`; ink/light roles `rgb(34,38,33)` / `rgb(255,248,240)`; display reference scales from `69.216px/69.216px` desktop to approximately `46px/1` mobile; body `18px/27.9px`. Inner hero should be shorter than home hero: target `min-height: 520px` desktop, `420px` tablet/mobile, with 4vw/16px gutters.

## States and Behaviors
No sticky, parallax, carousel, or timed media. Links use the donor-observed `0.25s` color/background transition and an equivalent focus-visible state.

## Assets
Only logged Avya images; allow a solid ink variant where no cleared route-specific image exists. Republic hero media is reference-only.

## Text Mapping
Headings/summaries come from the corresponding visible Avya route captured under `../avya-club-brand-source`; source URLs remain in typed content. Never use donor Boston/location wording.

## Responsive Behavior
Keep left alignment and full-bleed stage. At 390, constrain text to `358px` within 16px gutters and prevent heading overflow.

## Reduced Motion
Render text/media fully visible; no opacity/translate delay.

## Acceptance Checks
- One H1 per route with source-traceable copy.
- Shared geometry is recognizably donor-led at 1440/768/390.
- No donor asset or proprietary font ships.
