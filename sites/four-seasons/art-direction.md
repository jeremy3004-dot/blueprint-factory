# Art Direction: four-seasons

Date: 2026-06-30
Status: draft
Owner sign-off: pending

## 1. What this site is

A Four Seasons-style luxury hospitality homepage clone focused on cinematic arrival, immediate booking utility, and editorial property discovery.

## 2. The visual world

Quiet global luxury: full-bleed resort media, restrained typography, precise black/white contrast, warm image-led editorial sections, and calm booking interactions.

## 3. The signature moment (required)

Voyage Wake Reveal: on load, the yacht image brightens from a soft blur, a thin wake line draws across the lower hero, headline lines lift in sequence, and the booking bar/category rail settle into place.

## 4. Motion language

- Pace: slow, polished, and confident.
- Easing: smooth and weighted.
- Scroll feel: native, with once-only editorial reveals and measured carousel movement.
- Restraint: motion supports hospitality calm; no decorative animation beyond the Voyage Wake Reveal, carousel, menu, search, and booking sheet transitions.

## 5. Typography

- Display: elegant high-contrast serif or refined hospitality serif fallback.
- Body/UI: clean sans for booking controls and navigation.
- Character move: small uppercase labels paired with spacious editorial headlines.

## 6. Color world

- Base: white, black, and soft warm neutrals.
- Accents: bronze/gold used sparingly for luxury emphasis.
- Mood: light editorial sections contrasted by black promo/footer bands.
- Rule: media provides color; UI stays restrained.

## 7. Layout system

- Grid feel: centered, generous, and editorial.
- Sections alternate between full-bleed media, narrow utility strips, and structured card grids.
- First-screen plan: transparent nav, full-bleed yacht/destination hero, clear booking/search control, and minimal copy.

## 8. Reference comparanda

- Primary donor: Four Seasons homepage. Clone-derived structure: video hero, transparent sticky nav, booking bar, dark promo strip, destination image band, featured tabbed carousel, editorial cards, centered CTA, black footer.
- Donor screenshots captured: desktop `sites/four-seasons/references/reference-first/four-seasons-desktop.png`; mobile `sites/four-seasons/references/reference-first/four-seasons-mobile.png`.
- Donor topology notes: `sites/four-seasons/references/reference-first/topology.md`.

## 9. Anti-goals

- No generic hotel template look.
- No oversized marketing hero card over the video.
- No card-heavy SaaS layout.
- No loud gradients, blobs, or decorative animation.
- No production use of protected donor media without replacement/licensing review.

## 10. Deploy and backend expectation

- Deploy profile expected: Vercel.
- Backend expected: none for clone preview.

## 11. What must be true before this site is called ready

- Desktop hero reads as full-bleed luxury media with transparent/sticky nav.
- Mobile includes compact header, full-screen menu, booking bottom sheet, search suggestions, and scroll-snap property cards.
- Featured Properties tabs and carousel behavior are tested.
- Visual review compares the build directly against donor screenshots.
- Reduced-motion mode keeps all content visible without timed choreography.
