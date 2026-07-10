# ExperienceTabs Specification

## Overview

- Target: `app/src/components/ExperienceTabs.tsx`
- Screenshot: donor section 06
- Interaction model: click-driven accessible tablist

## Measured Donor Values At 1280×720

- Section: 1280×757px, `position:relative`, `overflow:hidden`.
- Eyebrow: 16.161px / 20.201px, bold.
- Tab titles: 20.786px / 22.864px, bold.
- Active content panel is cream with black text and brass double-line ornament over full-bleed grill photography.

## San Chon Tabs

- `At the Grill`: shared tabletop cooking and staff guidance.
- `Korean Staples`: bibimbap, gimbap, kimchi, noodles, and banchan.
- `Warm Hospitality`: spacious calm room and reading corner.

## States And Behaviors

- Use semantic tab/tablist/tabpanel and `aria-selected`.
- Active tab expands into the information panel; inactive titles remain simple cream buttons.
- Background image subtly repositions between states without swapping source.
- Mobile stacks the three tab triggers; active panel appears directly below selected trigger.
- Reduced motion makes state changes immediate.
