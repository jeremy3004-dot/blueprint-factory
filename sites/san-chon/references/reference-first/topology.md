# San Chon Reference-First Topology

Status: complete
Primary donor: COTE Korean Steakhouse
Donor URL: `https://www.cotekoreansteakhouse.com/`
Captured: 2026-07-11 (four viewports, 12 section captures, normal/reduced motion)

## Evidence

- Desktop: `donor-1440.png` (canonical), `donor-1920.png`.
- Tablet: `donor-768.png`.
- Mobile: `donor-390.png`.
- Section crops: `sections/`.
- Motion: `donor-motion.webm` and `donor-motion-reduced.webm`.
- Mechanical extraction: `extraction/`.

## Section Order

1. Thin green announcement rail.
2. Black/brass desktop navigation with centered crest, menus, social, and boxed booking CTA; compact mobile crest/menu.
3. Full-bleed autoplay hero media built around a central tabletop grill, centered wordmark, pause control, and booking CTA.
4. Narrow newsletter/conversion band touching the hero.
5. Centered cream-on-black positioning statement, small mantra line, emoji equation, and concise brand explanation.
6. Narrow multi-location/category rail of outlined buttons.
7. Editorial news introduction and a three-up card carousel with one dominant center card.
8. Full-bleed experience photograph with three clickable category tabs and one light information panel layered over media.
9. Repeated narrow newsletter/conversion band.
10. Two asymmetric editorial split sections: careers/team and private/group dining.
11. Long black sensory chapter: oversized two-line serif statement, irregular image collage, and one dominant square feast image.
12. Press card grid.
13. Visit section with map, location tabs, dense operational information, and paired CTAs.
14. Multi-column footer, repeated newsletter, and oversized outlined wordmark.

## Desktop Interaction Model

- The announcement and navigation remain visually anchored at the top while the hero begins immediately beneath them.
- Hero video autoplays, loops, and exposes a pause control.
- Primary path: `Book a Table` → location choice → reservation provider. Secondary paths: menus, experience, events, visit/contact.
- The news region is a Swiper carousel with previous/next controls.
- The experience region is click-driven tabs; copy panel updates over one full-bleed image.
- Press/news cards zoom subtly on hover; buttons use thin-brass frame movement.
- Visit uses location tabs to swap map, address, hours, contact, and CTAs.
- Reveal motion is restrained; the page's drama comes from huge photography, density changes, and long black pauses.

## Mobile Interaction Model

- Announcement rail remains; navigation compresses to a centered crest with a compact menu control and separate booking CTA.
- Hero image crops tightly around the central grill; booking button remains above the first text.
- Newsletter becomes a stacked form.
- Location/category pills stack as bordered rows.
- News carousel shows one card at a time.
- Experience tabs become stacked cards over a vertically cropped image.
- Split sections alternate image and copy vertically.
- Sensory collage becomes a controlled single-column masonry rhythm.
- Visit information stacks before the map; footer columns become accordions/rows.

## Typography, Color, And Spacing

- Captured heading/body role: SangBleu Sans; Baxter also loads. Production substitutes open Cormorant Garamond and DM Sans.
- Major scale jumps: 150 / 58 / 48 / 42 / 40 / 30 / 24 / 18px.
- Dominant field: black. Main text: cream `#f2e7d8`. Borders/frames: muted brass. Campaign green/red appear sparingly.
- Rhythm alternates compact conversion rails (70–110px), editorial statements (320–520px), full-screen media (70–100vh), and a very long collage chapter.

## Image And Motion Strategy

- Donor imagery is reference-only and does not ship.
- Production uses five original generated restaurant images logged in `asset-log.md`, cropped into multiple donor-matched roles.
- Swiper behavior is implemented with a small React state/scroll-snap rail rather than adding Swiper.
- Hero entrance copies the factory masthead aperture pattern; section entrances copy the factory one-shot scroll reveal.

## Exact Moves To Borrow

1. Black/brass framing and centered crest across desktop navigation.
2. Central tabletop-grill hero with a logo over the circular fire source.
3. Thin conversion rails used as breathing-space resets between dense chapters.
4. Full-bleed experience image with a light tabbed story panel floating over it.
5. The long sensory collage: oversized serif statement, asymmetric image fragments, then a dominant shared-table image.
6. Dense visit/footer close that answers operational questions without sending visitors elsewhere.
