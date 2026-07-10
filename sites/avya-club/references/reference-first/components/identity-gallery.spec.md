# Identity Gallery Specification
## Overview
- Target file: `app/src/components/home/IdentityGallery.tsx` (Task 5).
- Evidence: `../donor-1440.png`, `../donor-390.png`, DOM `.wp-block-rf-triptych--2` immediately after the three-card experience strip.
- Interaction model: two-card hover/focus media switch matching the experience system, without autoplay.

## DOM Structure
`section > two media figures + two identity cards`. Avya translation pairs `Fitness & performance` with `Recovery & wellbeing`; each card links to `/services` or `/about`.

## Computed Styles
- Donor section height about `686.8px` at 1440, full-bleed; two equal card columns inside the same grey/ink media stage.
- Card typography follows triptych: H2 `34.456px/41.3472px`, body `18px/27.9px`; active cream `rgb(255,248,240)`, inactive light-on-media.
- Full-bleed gutters remain `-57.6px` at 1440, `-30.72px` at 768, and `-16px` at 390.

## States and Behaviors
First card begins active. Hover/focus/tap switches active card and crossfades figures with the donor's `opacity 0.75s`; state persists after pointer leave. No timed rotation or transform.

## Assets
Use two logged Avya images representing training and recovery. Republic Personal Training/Restore Spa media are reference-only.

## Text Mapping
Source: Avya hero and about capture: modern gym/dynamic training/expert nutrition; physiotherapy/massage/spa; fitness/healing/mindfulness. Do not reuse Republic award or facility claims.

## Responsive Behavior
Two columns on desktop; horizontal or stacked touch-friendly cards on smaller screens using the same 16px mobile gutter. Preserve visible labels even when media is not selected.

## Reduced Motion
Swap selected media instantly; no hidden or delayed text.

## Acceptance Checks
- Exactly two source-traceable Avya identity chapters.
- Keyboard and pointer selection match; 0.75s crossfade only in normal motion.
- No donor asset/copy survives.
