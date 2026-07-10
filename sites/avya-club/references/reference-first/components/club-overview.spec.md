# Club Overview Specification
## Overview
- Target file: `app/src/components/home/ClubOverview.tsx` (Task 5).
- Evidence: `../donor-1440.png`, `../donor-768.png`, `../donor-390.png`, DOM first three `.wp-block-rf-section-text` blocks.
- Interaction model: static alternating editorial media/cards with optional viewport reveal.

## DOM Structure
Three `article` rows, each `media frame + text cell/card`; alternate left/right at desktop. Suggested Avya chapters: origin/scale, comprehensive club, fitness-healing-mindfulness identity.

## Computed Styles
- Each donor row is `1440×900px`; layout grid is `720px 720px`. First card `604.8×725.8px`, padding `86.4px`, cream `rgb(242,231,216)`; H2 `46.144px/54.796px`; body `18px/27.9px`.
- 768: row still `768×900px`, grid `384px 384px`; centered card `706.6×490.8px`, padding `46.08px`.
- 390: row `390×900px`, computed grid columns `195px 195px`; card `358×648.6px`, padding `24px`. Implement as layered full-bleed media with a readable 358px overlay rather than allowing horizontal overflow.
- Row background fallback `rgb(34,38,33)`; card ink `rgb(34,38,33)`.

## States and Behaviors
No donor hover transformation, carousel, pinning, or timed change. Links use 0.25s color transition; IntersectionObserver may add a one-time reveal without changing layout.

## Assets
Donor background URLs in DOM are reference-only. Use logged Avya `aboutphoto.png`, `avya.png`, or other cleared Avya media; record final object positions in `asset-log.md`.

## Text Mapping
Source: Avya homepage capture. Required facts: founded in 2018; Sanskrit Avya means “pure” and “first light”; 110,000 sq. ft.; Himalayan views; fitness, healing, mindfulness; all ages/fitness levels. Do not use Republic's Boston roots or awards.

## Responsive Behavior
Alternate at 1440; tablet centers one wide card over media; mobile uses full-width media with 16px inset card and never clips text. Keep three 900px editorial beats unless content requires a documented height adjustment.

## Reduced Motion
Cards and media render in final state; remove all reveal transforms/opacity delays.

## Acceptance Checks
- Three stories remain in donor order/rhythm and swap alignment on desktop.
- 2018 and 110,000-square-foot facts come from Avya capture.
- No donor media/copy ships; mobile remains readable at 390px.
