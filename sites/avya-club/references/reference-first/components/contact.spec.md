# Contact Specification
## Overview
- Target file: `app/src/app/contact/page.tsx` (Task 6).
- Evidence: donor split CTA geometry in `../donor-1440.png` / `donor-390.png`, Avya brand-source contact capture and visible header/footer facts.
- Interaction model: direct call/email/directions actions; no fake form.

## DOM Structure
`InnerHero + split contact section > address/hours + action list + optional cleared location media`. Use semantic `<address>` and accessible action links.

## Computed Styles
Borrow donor diptych: 1440 two `720px` halves with right padding `57.6px 86.4px`; 768 stacked with `61.44px 46.08px`; 390 stacked with `32px 24px`. Ink/light/cream: `rgb(34,38,33)`, `rgb(255,248,240)`, `rgb(242,231,216)`; labels/body `18px/27.9px` and display heading about `69px/1` desktop.

## States and Behaviors
Actions: `mailto:info@avya.club`, `tel:061590648`, `tel:9802855271`, and a directions link based on captured Gharipatan/Pokhara text. Hover/focus transition `0.25s`. No submission, validation, success/error/modal, or external CRM.

## Assets
Avya logo/location image only if logged. No donor form, reCAPTCHA, or ActiveCampaign asset.

## Text Mapping
Visible source truth: Gharipatan, Pokhara, Nepal; Open 24/7; `info@avya.club`; `061-590648`; `9802855271`. Explicitly reject stale JSON-LD values Kathmandu and `+977-123-456-7890`.

## Responsive Behavior
Split at 1440, stacked at 768/390; action targets meet touch sizing and do not wrap numbers ambiguously.

## Reduced Motion
Static content; no required animation.

## Acceptance Checks
- Both phone links, email, visible address, and hours match source exactly.
- No fake form or placeholder structured-data contact.
- Keyboard/touch actions work at all widths.
