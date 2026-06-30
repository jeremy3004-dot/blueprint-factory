# One&Only Motion Brief

Date: 2026-06-30
Skills: `blueprint-animate`, frontend design, design taste

## Business / Brand Goal

Make the visitor feel they have entered a calm luxury resort world: spacious, cinematic, and personally arranged rather than sold to.

## Primary Donor

One&Only Resorts homepage. It was chosen because the user supplied it directly and it is already a strong 10/10 hospitality donor for video-led arrival, sparse typography, editorial section rhythm, and mobile resort browsing.

Exact motion moves to borrow:

- Living hero media as the opening emotional signal.
- Slow headline/copy arrival over the hero.
- Section reveals that feel like editorial pages, not generic fades.
- Folding gallery with side-image peeks.
- Calm overlay movement for menu and booking surfaces.

## Secondary References

- Four Seasons Blueprint Factory clone: focus-safe overlays and reduced-motion handling.
- Blueprint Factory Beauty Pass: verify against donor screenshots and motion capture before judging taste.
- CSS/React primitives: no new animation dependency needed for this pass.

## Signature Moment

Resort Aperture Reveal: on load, the white page opens into the living resort hero video while the One&Only headline lifts in two calm lines over the water.

## Motion System

- Hero: video/fallback brightens from blur, page aperture opens, label/headline/body lift in order.
- Scroll: major sections reveal once with transform and opacity only.
- Gallery: active panel gently raises while side panels stay visible.
- Overlays: menu and booking fade in with a slow upward settle.
- Microinteractions: header controls, text links, and gallery controls move one pixel at most.
- Reduced motion: animation durations collapse and all content remains visible.

## Implementation Path And Rights Boundary

Use the existing Next.js/React/TypeScript app with CSS keyframes, CSS transitions, `IntersectionObserver`, and local React state. GSAP and Lenis are installed but intentionally unused for this small credible pass.

Rights checks are required before production use of donor media, logo, or copy. Motion grammar, layout rhythm, and interaction sequencing are used as reference.

## Verification Path

- Build with `pnpm --filter one-and-only-resorts build`.
- Typecheck with `pnpm --filter one-and-only-resorts typecheck`.
- Start local preview and capture desktop/mobile screenshots.
- Capture motion video through the factory helper.
- Compare implementation screenshots to donor screenshots in Beauty Pass.
