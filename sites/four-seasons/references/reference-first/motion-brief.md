# Four Seasons Motion Brief

Date: 2026-06-30
Skill: `blueprint-animate` with `frontend-skill`

## Business / Brand Goal

Make the clone feel like an expensive hospitality arrival: calm, cinematic, and precise, with motion that supports booking confidence instead of calling attention to itself.

## Primary Donor

Four Seasons homepage. It was chosen because the existing clone is already structured around its yacht hero, sticky navigation, booking utility, category rail, featured-property carousel, editorial cards, story CTA, and black footer.

Moves to borrow:

- Ambient full-bleed hero media.
- Transparent-to-sticky navigation.
- Category rail settling into the bottom of the hero.
- Featured property carousel movement.
- Quiet editorial section rhythm.

## Signature Moment

**Voyage Wake Reveal:** on load, the yacht image brightens from a soft blur, a thin wake line draws across the lower hero, headline lines lift in sequence, and the booking bar/category rail settle into place.

## Motion System

- Hero: media entrance, wake line, staggered headline, booking/category settle.
- Scroll: Mexico, Featured, Explore, Story, and Footer reveal once as editorial spreads.
- Carousel: active image/card crossfade and settle on property changes.
- Overlays: menu/search/booking enter with restrained fade/rise.
- Microinteractions: hover/focus/press states for nav, buttons, category rail, suggestions, and editorial cards.
- Reduced motion: all major animations collapse to immediate state through `prefers-reduced-motion`.

## Implementation Path

No new dependency. Use the existing Next/React stack plus CSS transforms, opacity, keyframes, and a small IntersectionObserver in `page.tsx`.

## Verification Path

- Build and typecheck.
- Capture desktop/mobile screenshots.
- Capture motion video.
- Smoke test menu and booking overlays at mobile width.
- Verify reduced-motion state makes content visible without timed reveals.
