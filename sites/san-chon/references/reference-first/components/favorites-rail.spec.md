# FavoritesRail Specification

## Overview

- Target: `app/src/components/FavoritesRail.tsx`
- Screenshot: donor section 05
- Interaction model: click-driven previous/next plus horizontal scroll-snap

## Measured Donor Values At 1280×720

- Section: 1280×833px, `overflow:hidden`.
- Intro heading: 986px wide, 36.375px / 40.013px, weight 400, centered.
- Donor shows three cards with a dominant center card and previous/next controls.

## San Chon Content

- Cards: Tabletop Pork Belly, Bibimbap & Rice, Gimbap & Share Plates, Tteokbokki & Chicken.
- Card imagery comes from original production assets and crops.
- Copy must be qualified as publicly documented favorites, not a complete current menu.

## States And Behaviors

- Buttons move active index modulo card count and scroll the active card into view.
- Active card opacity 1 and translateY(-10px); inactive 0.62 and saturate(.82).
- Mobile is a swipeable one-card scroll-snap strip; no vertical lift.
- Reduced motion removes transform and smooth scrolling.
