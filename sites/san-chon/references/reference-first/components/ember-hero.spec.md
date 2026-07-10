# EmberHero Specification

## Overview

- Target: `app/src/components/EmberHero.tsx`
- Screenshot: `donor-1440.png` first 720px / `donor-390.png` first screen
- Interaction model: time-driven mount reveal; static CTA

## Measured Donor Values At 1280×720

- Hero section: 1280×720px, full width, `display:flex`, image/video edge-to-edge.
- Header consumes 174px before the hero at this viewport.
- Main palette: black, cream `#f2e7d8`, muted brass.

## Structure

- Full-bleed `hero-table.png`, `object-fit: cover`.
- Dark radial and bottom scrims.
- Centered circular Ember Seal over the physical grill.
- Wordmark lines: `SAN CHON`, `KOREAN RESTAURANT`, `산촌다람쥐`.
- Supporting line and one framed `Call to reserve` link.

## Motion

- Copy factory `masthead-reveal` concept: media settles from 1.04 scale/12px blur; circular aperture expands; copy rises 28px; one brass ring pulses.
- Total reveal about 1.2s with `cubic-bezier(0.16,1,0.3,1)`.
- Background breathing loop 18s, 1 → 1.025 scale.
- Reduced motion renders final state, removes blur/scale/pulse.

## Responsive

- Desktop: center grill and seal; minimum 720px height.
- Mobile: `min-height: calc(100svh - announcement/header)`, crop around grill, seal max 240px, CTA below logo.
