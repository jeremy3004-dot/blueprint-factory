# Second-Pass Design: The Juicery Cafe

Date: 2026-07-11
Status: owner-authorized self-directed Beauty Pass

## Audit

The first pass established a credible Gymkhana-derived shell, but it stops short of a finished
hospitality site in four places:

1. The homepage loses visual energy after the food frame; the community section is an oversized
   text field where documentary imagery should carry the story.
2. The food, market, basket, and event routes expose research/process language (for example,
   "claimed listing," "unsupported promises," and "needs client input") that belongs in QA notes,
   not customer-facing copy.
3. The cafe's range is technically present but not easy to scan. Visitors need a clearer sense of
   what they can eat, drink, join, and ask about before opening the menu.
4. Contact actions are concentrated at the end of routes instead of appearing at the moment a
   visitor decides to visit, ask what is on, or check seasonal availability.

## Approaches Considered

- **Surface polish only:** tighten spacing, typography, and hover states. Lowest risk, but it leaves
  the thin route content and empty homepage middle unresolved.
- **Editorial expansion (selected):** preserve the proven donor topology while adding documentary
  photo compositions, concise proof/details rails, more useful offer modules, and contextual contact
  actions. This creates the strongest improvement without inventing unverified business capabilities.
- **Full structural rewrite:** replace the existing topology with a new lifestyle-cafe concept. This
  would discard the donor-first work and make visual quality less defensible.

## Direction

Keep the existing "sunlit botanical hospitality" art direction, but make it feel more lived-in:
pressed-paper panels, editorial captions, asymmetric image crops, fruit-gold rules, and warm red
decision bands. Gymkhana remains the structural donor; The Juicery's food, people, open-air setting,
and community photography provide the emotional identity.

## Changes

- Add a compact facts rail after the hero so location, hours, and offer are immediately legible.
- Replace the empty homepage community field with an asymmetric documentary collage and anchored copy.
- Add a three-part "morning / table / evening" offer sequence that connects food and events without
  introducing prices, ordering, or booking.
- Turn the food menu glimpse into customer-facing seasonal favorites and strengthen image captions.
- Rewrite market and basket routes as honest, inviting seasonal inquiry pages; remove all internal
  audit language from the rendered site.
- Add contextual WhatsApp, phone, map, and contact actions where relevant.
- Refine responsive spacing, image crops, menu-overlay depth, hover/focus states, and reduced-motion
  behavior.

## Boundaries

- No invented prices, schedules, delivery promises, ordering, reservations, forms, or account flow.
- No production deployment. A protected Vercel preview is the live review target.
- Existing source and rights notes remain in QA files; user-facing copy stays hospitable and concise.

## Verification

- Clean dependency install, TypeScript check, and production build.
- Desktop and mobile screenshots of the homepage and every public route.
- Console, internal-link, and serious/critical accessibility checks through the factory verifier.
- Motion and reduced-motion capture.
- Fresh donor/build comparison and an honest visual review documenting remaining gaps.
- Vercel preview deployment must report `Ready`; preview protection is reported separately.
