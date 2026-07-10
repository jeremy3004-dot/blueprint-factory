# Art Direction: Avya Club

Date: 2026-07-10
Status: approved
Owner sign-off: yes (approved design specification)

## 1. What this site is

An editorial club experience for Avya's fitness, recovery, sport, and wellbeing community in Pokhara.

## 2. The visual world

Himalayan first light meets serious athletic craft: cinematic full-bleed media, warm mineral surfaces, deep ink fields, and precise editorial typography.

## 3. The signature moment (required)

**Pure Energy / First Light Sequence:** the first screen moves through three complete Avya states—Pure Energy, Deep Recovery, First Light—with slow media crossfades and restrained type reveals; reduced motion renders the first state fully visible with no timer or hidden content.

## 4. Motion language

- Pace: weighted 600-750ms transitions; no ambient looping except the deliberate first-light sequence.
- Easing: smooth `cubic-bezier(0.22, 1, 0.36, 1)` for reveals; linear opacity interpolation is acceptable for media crossfades.
- Scroll: native scrolling with small IntersectionObserver reveals; no smoothing library.
- Restraint: story cards stay quiet so the hero sequence and experience-media crossfade carry the motion identity.

## 5. Typography

- Display: a rights-cleared high-contrast editorial serif replacing Republic's proprietary Geller Headline.
- Body/UI: a rights-cleared geometric/grotesk sans replacing proprietary Indivisible.
- Character move: large multiline italic display statements paired with compact uppercase utility labels.

## 6. Color world

- Warm cream/paper grounds and deep green-black ink; Avya brand accents are introduced during token curation.
- Preserve Republic's high-contrast section alternation and light-on-image scrims.
- Never use donor red as a default Avya accent without brand evidence.

## 6b. Token translation (donor → brand)

- Colors: preserve donor roles `#222621` ink, `#fff8f0` light, `#f2e7d8` cream, and `#595d57` utility grey, then translate accent roles from captured Avya evidence.
- Fonts: Geller Headline and Indivisible are reference-only; replace with open alternatives in Task 2.
- Keep: 95/69/46/34px desktop hierarchy, full-bleed blocks, 4vw page gutters, half-viewport editorial grid, and 64-144px section breathing room.

## 7. Layout system

- Full-bleed media bands escape a constrained 4vw wrapper; story cards occupy one half-grid cell.
- Alternate text/media alignment; follow with a horizontally explorable experience strip and a split membership close.
- First screen: Avya media, one large first-light statement, a short support line, and one membership action.

## 8. Reference comparanda

- Primary donor: Republic BOS, `https://republicbos.com`. Borrow full-bleed hero, dark editorial band, alternating 50/50 media stories, hover-led media triptych, split CTA/form rhythm, and compact-to-overlay navigation.
- Donor screenshots: `references/reference-first/donor-1440.png`, `donor-768.png`, `donor-390.png`.
- Donor topology: `references/reference-first/topology.md`.
- Donor clone plan: `references/reference-first/clone-plan.md`.
- Brand source: Avya Club, `https://avya.club`; borrow only verified identity, facts, copy, destinations, and logged client assets.

## 9. Anti-goals

- No generic centered gradient hero, glossy SaaS cards, or invented wellness claims.
- No donor logos/copy/images/fonts in production.
- No sticky header, scroll hijacking, decorative carousel, or heavy animation library without evidence.
- No numeric price, testimonial, or credential absent from the captured Avya source.

## 10. Deploy and backend expectation

- Deploy profile: Vercel preview.
- Backend: none.

## 11. What must be true before this site is called ready

The six routes are responsive; all Avya facts/assets are traceable; the first-light and experience transitions work with reduced motion; asset/build/link/accessibility/visual gates pass; and the human Beauty Pass approves the preview.
