# Editorial Sections Specification

## Overview

- Targets: `StoryBand.tsx`, `SensoryCollage.tsx`, `ProofGrid.tsx`
- Screenshots: donor sections 08–10
- Interaction model: static editorial layout plus one-shot scroll reveals

## Measured Donor Values At 1280×720

- Each split story section: 1280×625px, `display:flex`.
- Split headings: 36.375px / 40.013px.
- Sensory section: 1280×1872px.
- Sensory headline: 775×286px, 129.911px / 142.902px, weight 300, tracking -2.5px.
- Press/proof section: 1280×993px.

## San Chon Translation

- Story 1: a calm room after a long day; interior image.
- Story 2: shared tables and reservations; feast/grill image.
- Sensory statement: `A table worth slowing down for.`
- Collage reuses original crops at distinct aspect ratios, ending with `shared-feast.png` as the dominant square.
- Proof grid uses documented reasons to visit (tabletop fire, banchan, quiet room, Street 16) without fake quotes or awards.

## Responsive

- Desktop alternates image/copy order and uses 50/50 bands.
- Mobile stacks image then copy, 58vw media height.
- Collage shifts from 12-column absolute composition to a two-column masonry-like grid; headline max 68px.
