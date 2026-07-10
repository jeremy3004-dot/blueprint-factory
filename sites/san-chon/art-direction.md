# Art Direction: San Chon

Date: 2026-07-11
Status: approved from the owner's explicit donor selection
Owner sign-off: donor and client direction supplied in the job request

## 1. What This Site Is

San Chon's calm Lakeside hospitality presented with the confidence and sensory drama of a premium Korean grill, without pretending the restaurant has COTE's scale, awards, or claims.

## 2. The Visual World

Ember-lit Korean supper club: charcoal-black rooms, warm brass linework, celadon ceramics, fire-red food accents, generous darkness, and quiet editorial typography.

## 3. The signature moment (required)

Named moment: **Ember Seal**.

On load, a brass circular seal centered over the tabletop grill opens like an aperture to reveal the full feast while the `SAN CHON / 산촌다람쥐` wordmark rises into place and one restrained ember ring pulses outward.

## 4. Motion Language

- Pace: slow, weighted, and deliberate.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances; no elastic motion.
- Scroll: native scrolling with one-shot IntersectionObserver reveals.
- Interaction: the favorites rail and experience panels respond directly to click/tap; hover only adds restrained zoom and brass-edge movement.
- Restraint: inner pages remain mostly static so the Ember Seal and sensory collage carry the identity.
- Reduced motion: aperture, pulse, breathing zoom, and scroll reveals become immediate static end states.

## 5. Typography

- Display: Cormorant Garamond, an open serif substitute for COTE's proprietary SangBleu role.
- Body/UI: DM Sans with Korean system fallbacks.
- Character move: oversized two-line serif statements paired with tiny tracked uppercase labels and thin brass rules.

## 6. Color World

- Base: soot black `#050505` and charcoal `#12110f`.
- Text: rice cream `#f2e7d8` and muted parchment `#cfc3b1`.
- Accents: brass `#b8842a`, ember `#b63b24`, celadon `#7a8d74`, forest `#183c2a`.
- Rule: color appears as food, fire, or metal; the interface itself stays mostly black and cream.

## 6b. Token Translation

- Donor background `#000000` remains the structural base; donor cream `#f2e7d8` remains the main text color.
- Donor utility blue and bright campaign colors become brass, ember, celadon, and forest.
- SangBleu/Baxter roles become Cormorant Garamond/DM Sans.
- Preserve donor scale jumps, thin gold borders, full-bleed photography, compact mobile controls, and alternating long/short section rhythm.

## 7. Layout System

- A thin announcement rail and black navigation frame the hero.
- The homepage alternates full-bleed media, restrained centered statements, narrow conversion bands, split editorial sections, a deliberately irregular collage, and a dense visit footer.
- Desktop uses 12-column asymmetry and controlled overlap; mobile becomes a single cinematic column with horizontal rails and large tap targets.
- First screen: full-height overhead grill, centered Ember Seal wordmark, short positioning line, and one reservation CTA.

## 8. Reference Comparanda

- Primary donor: `https://www.cotekoreansteakhouse.com/`. Borrow the black/brass navigation, central-grill hero, oversized serif statements, tabbed experience image, sensory collage, content-density shifts, and visit-heavy footer.
- Desktop evidence: `references/reference-first/donor-1440.png`.
- Mobile evidence: `references/reference-first/donor-390.png`.
- Donor topology: `references/reference-first/topology.md`.
- Donor clone plan: `references/reference-first/clone-plan.md`.
- Motion pattern: factory `masthead-reveal` for the aperture/hero entrance.
- Motion pattern: factory `scroll-reveal` for one-shot section entrances.
- Component pattern: factory `media-gallery` for the click-to-focus experience rail, simplified to the donor's observed card/tab behavior.

## 9. Anti-Goals

- No generic centered restaurant template with three equal cards.
- No neon Seoul cliché, K-pop styling, fake Hangul, or mountain-photo tourism theme.
- No donor copy, donor photography, Michelin language, awards, review quotes, or fabricated history.
- No decorative motion competing with the Ember Seal.
- No menu prices or exact current availability without client confirmation.

## 10. Deploy And Backend Expectation

- Deploy profile: Vercel preview only.
- Backend: none.
- Reservations: phone and Instagram handoff; no fake booking form.

## 11. Ready Conditions

- Home, menu, and visit routes share one visual system and complete their visitor jobs.
- Header, tabs, favorites rail, mobile menu, phone links, Instagram link, and directions link are keyboard/touch usable.
- Desktop, tablet, and mobile preserve the donor's density and contrast without overflow.
- Normal and reduced-motion captures exist.
- Factory verification is honest; the result stops at the human Beauty Pass.
