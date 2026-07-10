# Footer Specification
## Overview
- Target file: `app/src/components/SiteFooter.tsx` (Task 3).
- Evidence: `../donor-1440.png`, `../donor-390.png`, DOM `.wp-block-rf-footer`, Avya captured footer/contact content.
- Interaction model: static link columns on desktop/tablet; click-driven accordions on mobile.

## DOM Structure
`footer > logo/about + nav groups + contact block + legal/social row`. Use semantic headings/lists; mobile group buttons control adjacent lists with `aria-expanded`.

## Computed Styles
- 1440: footer `1440×708.8px`, padding `57.6px`, cream `rgb(242,231,216)`, ink `rgb(34,38,33)`; four donor columns each `302.4px`; group heading `16px/19.04px`.
- 768: footer `768×1165.6px`, padding `61.44px 30.72px`; two-column wrap.
- 390: footer `390×639.5px`, padding `96px 16px`; accordion buttons `358×68.6px`.

## States and Behaviors
Desktop groups are always open. Mobile groups default closed and expand/collapse by click/Enter/Space; no content depends on animation. Social links are external with safe target behavior.

## Assets
Logged Avya logo only. Republic wordmark and footer symbol are reference-only.

## Text Mapping
Source: Avya capture. Include Gharipatan, Pokhara, Nepal; Open 24/7; `061-590648`; `9802855271`; `info@avya.club`; six scoped pages; verified Facebook/Instagram/YouTube/TikTok links. Do not copy Republic/HW Group columns.

## Responsive Behavior
Four/compact columns at 1440, two columns at 768, one accordion stack at 390. Preserve 16px mobile edge padding.

## Reduced Motion
Accordion content appears immediately; no height animation required.

## Acceptance Checks
- All visible contact actions use `tel:`/`mailto:` and captured values.
- Mobile accordion is keyboard/screen-reader operable.
- No donor legal/social destination survives.
