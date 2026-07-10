# Intro Story Specification
## Overview
- Target file: `app/src/components/home/IntroStory.tsx` (Task 5).
- Evidence: `../donor-1440.png`, `../donor-390.png`, `../sections/02-section.png`, DOM `.homepage-announcement-bar`.
- Interaction model: static editorial announcement; optional IntersectionObserver reveal only.

## DOM Structure
`section.intro-story > div.layout > h2 + editorial link`. Avya translation uses the donor's dark band as the concise first statement after the hero.

## Computed Styles
- 1440: band `1440×322.8px`, full-bleed margin `0 -57.6px`, padding `57.6px`, background `rgb(34,38,33)`; layout `display:flex`, gap `115.2px`, height `207.7px`; H2 reference `69.216px/69.216px`.
- 768: `768×368.3px`, padding `92.16px 30.72px`; layout gap `30.72px`, height `184px`.
- 390: `390×363px`, padding `48px 16px`; layout `358×267px`, gap `16px`.
- Text is `rgb(255,248,240)`.

## States and Behaviors
No click-only content, autoplay, sticky state, or scroll threshold. Editorial link hover changes donor ink to accent over `background-color 0.25s, color 0.25s`; preserve a rights-cleared Avya accent and identical focus affordance.

## Assets
No donor asset needed. A subtle Avya texture is allowed only if separately logged; default is solid ink.

## Text Mapping
Source: Avya visible homepage about copy. Use the “A Holistic Haven for Health, Fitness & Well-being” positioning and link to `/about`; retain source URL `https://avya.club` in typed content.

## Responsive Behavior
Desktop aligns statement and link horizontally; 768/390 may stack while preserving exact outer padding and generous band height.

## Reduced Motion
If reveal is enabled, show content immediately with no opacity/translate transition.

## Acceptance Checks
- Band follows hero and matches full-bleed dark rhythm.
- Avya positioning is source-traceable; no Republic promotion survives.
- Link works by keyboard and hover/focus states match.
