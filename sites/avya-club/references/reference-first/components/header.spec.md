# Header Specification
## Overview
- Target files: `app/src/components/SiteHeader.tsx` and `app/src/components/MobileMenu.tsx` (Task 3).
- Evidence: `../donor-1440.png`, `../donor-768.png`, `../donor-390.png`, and donor DOM `header.wp-template-part-header`.
- Interaction model: static desktop header; click-driven full-viewport mobile/tablet menu. The header scrolls away and never becomes sticky.

## DOM Structure
`header > nav` contains logo link, desktop primary groups, utility links, and one menu toggle below the desktop breakpoint. Avya output contains exactly six internal route links and a Membership CTA; the overlay repeats those destinations without donor submenus.

## Computed Styles
- All widths: header height `84.25px`, `position: static`, transparent background, Indivisible body reference at `18px/27.9px`; replace font, retain geometry.
- Desktop 1440: horizontal gutter `57.6px` (4vw); donor logo box `150×40.3px`; utility pill height `38.5px`.
- Tablet 768: gutter `30.72px`; 32×32px toggle at x `705.3px`.
- Mobile 390: gutter `16px`; 32×32px toggle at x `342px`; desktop utility links are hidden.

## States and Behaviors
- Before and after scroll: same classes/styles; at scrollY 769 the header rect is y `-769px`, proving it scrolls normally.
- Toggle closed: `aria-expanded="false"`. Open: `aria-expanded="true"`, full viewport overlay `768×900` or `390×900`, body overflow becomes `hidden auto`; Escape and toggle close it and restore overflow.
- Donor desktop dropdowns are hover/click groups, but Avya has no matching nested routes; do not recreate them.
- Focus-visible state must be clear. External registration opens the verified `https://avya.club/register` destination.

## Assets
Avya logo candidates are logged in `asset-log.md`; Republic logo and proprietary fonts are reference-only.

## Text Mapping
Source: `../../../../avya-club-brand-source/references/reference-first/extraction/pages.json` and visible Avya header. Map Home, About, Service → Services, Gallery, Contact, Join Us Today → Membership. Do not ship Republic Member Login, Trial, Pricing, Clubs, Classes, or Programs.

## Responsive Behavior
Desktop uses inline navigation. At 768 and 390, render logo + toggle; overlay fills viewport and remains usable without animation. Keep 4vw/16px gutters evidenced above.

## Reduced Motion
Menu opens/closes without required transforms; under reduced motion remove overlay transition while preserving focus management and every route.

## Acceptance Checks
- Header is not fixed/sticky and does not change after scroll.
- Six route destinations and verified registration CTA only.
- Toggle semantics, Escape, focus order, and scroll locking work at 768/390.
- No Republic logo, copy, or font ships.
