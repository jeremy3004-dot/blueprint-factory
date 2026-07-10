# SiteHeader Specification

## Overview

- Target: `app/src/components/SiteHeader.tsx`
- Donor evidence: `donor-1440.png`, `donor-390.png`
- Interaction model: sticky navigation; click-driven mobile overlay

## Measured Donor Values At 1280×720

- Header box: 1280×174px, `position: sticky`, black background, cream text.
- Donor UI text: 13.857px / 20.786px.
- Desktop: thin announcement row, 1px brass frame, centered circular crest, balanced left/right nav, boxed primary CTA.
- Mobile: announcement row, 64px compact header, centered crest, menu control, booking CTA below hero.

## San Chon Translation

- Announcement: `Street 16, Lakeside · Online-listed hours 12–10 PM`.
- Links: Menu, Experience, Visit; Instagram icon; `Call to reserve`.
- Wordmark crest: circular brass seal with `산촌` and `SAN CHON` accessible label.
- Use real links only; no dropdowns without content.

## States And Behaviors

- Sticky desktop header keeps a solid black field.
- Mobile menu opens a full-screen black panel, traps visual focus within obvious controls, closes on link, close button, or Escape.
- Focus outline: 2px cream with 3px offset.
- Reduced motion removes menu-panel slide; state changes remain immediate.
