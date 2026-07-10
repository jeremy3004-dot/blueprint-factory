# Experience Grid Specification
## Overview
- Target file: `app/src/components/home/ExperienceGrid.tsx` (Task 5).
- Evidence: `../donor-1440.png`, `../donor-390.png`, donor DOM `.wp-block-rf-triptych--3`, and normal-motion capture.
- Interaction model: hover/focus selects a card and crossfades the corresponding media; horizontal native exploration at narrower widths.

## DOM Structure
`section > media figures (one per card) + div[role=list] > article/card button/link`. Each card contains service title, short Avya copy, and `/services` action. Selection must be keyboard operable and reflected with an accessible current state.

## Computed Styles
- 1440 section `1440×798.4px`, background `rgb(89,93,87)`, overflow hidden; inner flex padding `144px 28.8px`; each card `403.2×510.4px`, padding `72px 43.2px`.
- 768 section `768×742.1px`; inner padding `92.16px 15.36px`; card `293.7×557.8px`, padding `38.4px 23.04px`.
- 390 section `390×671.8px`; inner padding `64px 8px`, `overflow:auto`; card `264.5×543.8px`, padding `20px 12px`.
- Active card is `rgb(255,248,240)` / `rgb(34,38,33)`; inactive is transparent / `rgb(255,248,240)`.

## States and Behaviors
- Initial first card active. Hovering/focusing card 3 removes active state from card 1 and applies it to card 3.
- Media figures transition `opacity 0.75s`; observed at 100ms old/new opacities were `0.868307/0.131693`, reaching `0/1` after 1.3s. Active card persists after pointer leave.
- No timer/autoplay, scroll snap, transforms, or heavy library. On touch, tap selects; horizontal scroll remains native.

## Assets
One cleared Avya image per featured service. Republic fitness-floor/MOVE/STRENGTH images are reference-only.

## Text Mapping
Source: Avya “What We Provide” capture. Feature Fitness, Recovery, and Club Life using only captured labels; the full eight-label inventory is Swimming Pool, GYM & Fitness, Functional Fitness, Tennis Court, Physiotherapy, Massage & Spa, Club House, Well-being & Nutrition.

## Responsive Behavior
All three cards visible across desktop rhythm; narrower widths expose a horizontal strip with visible next-card edge. Do not add mandatory scroll snap because donor computed `scrollSnapType` is `none`.

## Reduced Motion
Selection swaps immediately with no opacity interpolation. All card text remains visible and the active relationship remains announced.

## Acceptance Checks
- Hover, focus, and tap all select media; active state persists.
- Crossfade is 0.75s normal motion and immediate reduced motion.
- Mobile horizontal strip is keyboard/touch accessible and has no forced snap.
- Only cleared Avya media and captured service labels ship.
