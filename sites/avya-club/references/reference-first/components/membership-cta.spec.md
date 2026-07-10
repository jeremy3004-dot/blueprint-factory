# Membership CTA Specification
## Overview
- Target file: `app/src/components/home/MembershipCta.tsx` (Task 5).
- Evidence: `../donor-1440.png`, `../donor-390.png`, DOM `.wp-block-rf-diptych`, and Avya brand-source pricing capture.
- Interaction model: static split conversion block; no modal or custom checkout.

## DOM Structure
`section > brand statement panel + membership summary/action panel`. Do not reproduce donor's lead form; use captured Avya membership labels, `/membership`, and verified external registration action.

## Computed Styles
- 1440: split block `1440×798.3px`; left/right `720px`; left ink `rgb(34,38,33)` with light text; right light `rgb(255,248,240)`, padding `57.6px 86.4px`; donor statement H2 `94.928px/104.421px`.
- 768: stacked block `768×1404.7px`; brand panel `532.3px`, content panel `872.4px`, padding `61.44px 46.08px`.
- 390: stacked `390×1512.1px`; brand panel `512px`, content panel about `1000.2px`, padding `32px 24px`.
- Donor field geometry is evidence only: desktop inputs `547.2×41.8px`; mobile `342×41.8px`.

## States and Behaviors
Primary `/membership` link and secondary `https://avya.club/register` action. No form submission, validation, modal, auth, account, or checkout. Hover/focus uses a 0.25s color/background transition.

## Assets
No donor logo/SVG. Avya logo may be used only from the logged source variants.

## Text Mapping
Source: Avya live pricing cards. Allowed labels: Daily Pass, Monthly Membership, 3-Month Membership, 6-Month Membership, Yearly Membership, therapy/yoga/zumba/swimming/clubhouse group labels. Numeric amounts are absent because `.price-options` is empty; mark as contact/client-input and never invent currency.

## Responsive Behavior
50/50 split at 1440; stack brand panel before content at 768/390. Keep CTA reachable without requiring a form.

## Reduced Motion
Static final state; remove any reveal delay.

## Acceptance Checks
- No custom form/backend and no invented price.
- `/membership` and verified Avya registration URL work.
- Split/stack geometry follows donor captures.
