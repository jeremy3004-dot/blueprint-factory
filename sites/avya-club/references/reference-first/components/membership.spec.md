# Membership Specification
## Overview
- Target file: `app/src/app/membership/page.tsx` (Task 6).
- Evidence: donor membership split/form in `../donor-1440.png` / `donor-390.png`, Avya brand-source pricing cards and registration route.
- Interaction model: grouped membership information with verified external registration CTA; no checkout/auth.

## DOM Structure
`InnerHero + membership group sections + offer panel + registration CTA + contact fallback`. Each group lists only captured option labels; absent amounts receive a plain “Contact Avya for current pricing” note.

## Computed Styles
Use donor CTA geometry: desktop `1440px` split with `720px` halves and display statement `94.928px/104.421px`; content padding `57.6px 86.4px`. At 768 stack with `61.44px 46.08px`; at 390 use `32px 24px`. Use ink `rgb(34,38,33)`, cream `rgb(242,231,216)`, light `rgb(255,248,240)`; button reference height `38.5px`.

## States and Behaviors
Primary external action: `https://avya.club/register`. Contact fallbacks use captured telephone/email. No modal, payment, account, custom form, or fabricated price. Hover/focus uses donor-observed 0.25s transition.

## Assets
Logged Avya identity/facility media only; no Republic membership SVG/form assets.

## Text Mapping
Allowed captured groups/options: Gym & Functional Fitness (Daily Pass, Monthly, 3-Month, 6-Month, Yearly); Spa & Wellness therapies; Yoga/Meditation/Zumba/Aerobics; Swimming Pool (Adults, Kids); Club House (Single, Couple); Limited Time Offer labels. The live `.price-options` elements contain no amounts/currency, so numeric price is needs-client-input.

## Responsive Behavior
Editorial two-column groups at 1440, one column at 768/390; CTA remains visible without horizontal scroll.

## Reduced Motion
All groups render expanded/static; no animated counters or delayed pricing.

## Acceptance Checks
- Captured labels only; zero invented numbers/currency.
- Registration URL and contact fallbacks are verified.
- No checkout/auth/backend and no donor form.
