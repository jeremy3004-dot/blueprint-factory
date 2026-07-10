# Gallery Specification
## Overview
- Target file: `app/src/app/gallery/page.tsx` (Task 6).
- Evidence: donor media rhythm in `../donor-1440.png`, mobile crop behavior in `../donor-390.png`, and Avya brand-source gallery/home captures.
- Interaction model: responsive media gallery; optional lightbox only if implemented accessibly and backed by captured behavior.

## DOM Structure
`InnerHero + figure grid`; each figure has explicit dimensions/aspect ratio, image, and useful alt text. Default implementation needs no modal.

## Computed Styles
Borrow donor full-bleed/asymmetric rhythm: 4vw desktop gutters (`57.6px` at 1440), `30.72px` at 768, `16px` at 390; large media rows around `900px` desktop and cards with cream/ink captions. Images use `object-fit: cover`; backgrounds use `rgb(34,38,33)` and `rgb(242,231,216)`.

## States and Behaviors
No donor evidence for timed carousel, auto-advance, sticky gallery, or scroll snap; do not add them. Image links have focus-visible styling and 0.25s color transition where captions are interactive.

## Assets
Only cleared/logged Avya images from brand-source capture or subsequently logged client-owned URLs. Republic images are reference-only; a missing image uses a logged placeholder.

## Text Mapping
Source: `https://avya.club/gallery` and captured Avya alt labels. Do not invent event names, dates, or member identities.

## Responsive Behavior
Asymmetric 2/3-column desktop composition, 2 columns at 768, single column at 390. Explicit dimensions prevent layout shift; crops preserve subjects.

## Reduced Motion
No reveal required; if used, render all figures immediately.

## Acceptance Checks
- Every image has Avya provenance and alt text.
- No autoplay/lightbox trap/scroll snap.
- 1440/768/390 grids avoid overflow and layout shift.
