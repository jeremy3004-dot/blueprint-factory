# Art Direction: The Juicery Cafe

Date: 2026-07-10
Status: approved for build from supplied donor
Owner sign-off: donor and client explicitly supplied; final Beauty gate pending

## 1. What this site is

A cinematic hospitality site for a farm-to-table Lakeside cafe, designed to turn a curious traveler
into a visitor while preserving the Juicery's handmade, community-minded character.

## 2. The visual world

Sunlit botanical hospitality: deep leaf green, pressed-fruit gold, warm paper, documentary food
photography, and the composed confidence of a destination restaurant.

## 3. The signature moment (required)

On load, a warm sunrise aperture opens across the full-bleed cafe image while the oversized
"The Juicery Cafe" wordmark settles into the small masthead and a seasonal card rises from the
bottom edge.

## 4. Motion language

- Pace: slow and weighted on entry; crisp on controls.
- Easing: smooth, gliding, and organic, never bouncy.
- Scroll: native scroll with restrained IntersectionObserver reveals; no global smoothing dependency.
- Restraint: inner-page copy and contact information stay quiet so the hero and framed food images lead.
- Reduced motion: reveal content immediately and remove aperture, lift, and image-settle transforms.

## 5. Typography

- Display: Cormorant Garamond, an open serif with the donor's editorial elegance and more warmth.
- Body/UI: Manrope, open and highly legible for compact visit information.
- Character move: small uppercase labels with wide tracking above restrained serif headlines.

## 6. Color world

- Base: deep leaf green `#173c2c`; paper `#f3ead8`.
- Accents: pressed-fruit gold `#e8b84a`; hibiscus red `#8d2635`.
- Overall: dark, enveloping hospitality balanced by warm paper sections.
- Contrast rule: text is always cream on green/red or near-black on paper; yellow is an accent,
  never body-copy color.

## 6b. Token translation (donor → brand)

- Colors changed from donor → brand: green `#27372f` → `#173c2c`; cream `#fff1d6` → `#f3ead8`;
  red `#66090f` → `#8d2635`; added fruit gold `#e8b84a`.
- Fonts changed from donor → brand: licensed Baskerville → Cormorant Garamond + Manrope.
- Kept from donor: compact serif type scale, 120-160px desktop section rhythm, full-bleed image
  sections, thin cream rules, framed media, and small tracked labels.

## 7. Layout system

- Grid: composed, centered hospitality geometry with occasional asymmetric photo/copy pairings.
- Rhythm: full-bleed hero → quiet story field → framed food image → editorial split → full-bleed
  visit image → colored footer. Inner pages reuse the system without repeating identical cards.
- First screen: client photo, wordmark, farm-to-table promise, visit CTA, small live-details card,
  and a compact menu trigger.

## 8. Reference comparanda

- Primary donor: Gymkhana. Borrow the full-bleed hero, tiny fixed masthead, centered story field,
  framed dish media, destination image band, colored footer, and restrained hospitality motion.
- Donor screenshots captured: desktop `references/reference-first/donor-gymkhana-desktop.png`;
  mobile `references/reference-first/donor-gymkhana-mobile.png`.
- Donor topology notes: `references/reference-first/topology.md`.
- Donor clone plan: `references/reference-first/clone-plan.md`. Stack: TypeScript + Next.js App
  Router + React + global CSS with CSS transitions and a small IntersectionObserver layer.
- Reference 1: The Juicery's current site. Borrow its bamboo/leaf color memory and documentary photos.
- Reference 2: the reference-library `masthead-reveal`. Borrow the aperture-to-media reveal with
  reduced-motion support.
- Reference 3: the reference-library `scroll-reveal`. Borrow one-shot, low-amplitude section reveals.

## 9. Anti-goals

- No generic wellness gradient, floating leaves, or three identical feature cards.
- No donor wording, imagery, Michelin cues, reservation language, or location claims.
- No stale Wix demo content about California, San Francisco, invented staff, or fake phone numbers.
- No script font for paragraphs; the current site's legibility problem must not survive.
- No fake ordering, booking, account, newsletter, or form success states.

## 10. Deploy and backend expectation

- Deploy profile: Vercel preview only.
- Backend: none. WhatsApp, phone, email, and map links are direct actions.

## 11. What must be true before this site is called ready

- The sunrise aperture and wordmark settle land on desktop and mobile and disappear under reduced motion.
- The translated site retains Gymkhana's structure score without shipping Gymkhana assets or copy.
- All eight useful public routes render, with the legacy event URL preserved.
- Client images are local, optimized by Next, and recorded in `asset-log.md`.
- Visit details are consistent everywhere and all unsupported facts are listed for client input.

## 12. Second-pass refinement (2026-07-11)

- Kept the original 7-band donor topology; the added facts rail belongs to the opening chapter and
  the day sequence belongs to the community chapter.
- Replaced the homepage's empty community pause with an asymmetric documentary collage.
- Added a dark, image-backed morning-to-evening field that aligns with the donor's photographic
  destination rhythm without repeating its content.
- Shifted every public route from research/process language to warm, honest hospitality copy.
- Added restrained paper grain, richer menu-overlay cues, contextual contact pairs, and sharper
  exterior crops while preserving reduced-motion behavior.
