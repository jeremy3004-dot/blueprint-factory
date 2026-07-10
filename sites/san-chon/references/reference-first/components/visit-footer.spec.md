# VisitPanel And Footer Specification

## Overview

- Targets: `VisitPanel.tsx`, `SiteFooter.tsx`
- Screenshot: donor sections 11–12 and mobile footer
- Interaction model: static operational information and external links

## Measured Donor Values At 1280×720

- Visit section: 1280×871px.
- Donor uses a map half, dense address/hours/contact half, location tabs, and paired CTAs.
- Footer repeats navigation, newsletter, and an oversized outlined wordmark.

## San Chon Translation

- One location only: Street 16, Lakeside, Pokhara 33700.
- Online-listed hours: daily noon–10 PM with `Please confirm on Instagram` qualifier.
- Phone: +977 982-4147894.
- CTAs: Call to reserve, Open directions, Instagram.
- Map is an original CSS street-grid abstraction labeled Lakeside / Street 16, not a copied map image.
- Footer repeats Home, Menu, Experience, Visit and displays oversized outlined `SAN CHON`.

## Responsive And Accessibility

- Desktop 52/48 map/info grid; mobile info first, map second.
- External links identify their purpose; Instagram and directions open a new tab with safe rel values.
- Footer wordmark is decorative where repeated and hidden from screen readers.
