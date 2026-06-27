# Art Direction: Alpine Bloom

Date: 2026-06-27
Status: draft
Owner sign-off: pending

## 1. What this site is

Alpine Bloom is a women-powered Himalayan adventure company rebuilt as a WHOA Travel-style homepage.

## 2. The visual world

White-page editorial collage, hot pink confidence, black utility type, and mint mountain-scale display words.

## 3. The signature moment (required)

The Himalayan WHOA collage: on load, a cut-paper mountain hero rises into place while the pink Alpine Bloom wordmark and left menu stay crisp over the white field.

## 4. Motion language

- Pace: light, quick, and poster-like.
- Easing: simple ease-out.
- Scroll: mostly native, because WHOA's page strength is composition and whitespace.
- Restraint: no complex parallax; the clone should feel graphic, not over-engineered.

## 5. Typography

- Display: Futura/Futura PT style via system fallbacks.
- Body: same geometric sans stack for consistency.
- Move: all-caps block words, wide micro-labels, and oversized mint display lines.

## 6. Color world

- White: `#ffffff`
- Black: `#000000`
- Hot pink: `rgb(255, 22, 162)` / `#ff16a2`
- Mint: `#75dec9`
- Occasional pale gray divider: `#eeeeee`

## 7. Layout system

- Clone WHOA's sparse vertical flow: hero image, intro two-column, collage, centered CTA, press logos, black media frame, huge whitespace, founder/contact/footer.
- Keep sections airy and separated by white space, not cards.
- First screen should be dominated by the Himalayan collage, small pink logo, and hamburger.

## 8. Reference comparanda

- Primary donor: WHOA Travel, `https://www.whoatravel.com/`. Clone-derived structure: exact homepage rhythm, pink/white/black color world, Futura-like typography, polaroid collage, press strip, black media frame, founder/contact close.
- Donor screenshots captured: desktop `sites/alpine-bloom/references/reference-first/whoa-desktop.png`; mobile `sites/alpine-bloom/references/reference-first/whoa-mobile.png`.
- Donor topology notes: `sites/alpine-bloom/references/reference-first/topology.md`.

## 9. Anti-goals

- No beige luxury trekking look.
- No generic travel agency cards.
- No complicated animation that hides the WHOA clone structure.
- No old Alpine Bloom styling from the first pass.

## 10. Deploy and backend expectation

- Deploy profile expected: Vercel or Cloudflare static.
- Backend expected: preview/demo mode only in this pass. The site now includes local Next API routes for booking, chat, and admin demo operations, but no production database, email, AI provider, paid service, or external deployment is configured.

## 11. What must be true before this site is called ready

- It should be obvious this was built from WHOA's visual grammar.
- Pink, white, black, mint, collage, and heavy uppercase type must dominate.
- The content must still clearly sell women exploring the Himalayas.
- The feature expansion should feel like Alpine Bloom product depth, not a Green Pastures visual transplant.
