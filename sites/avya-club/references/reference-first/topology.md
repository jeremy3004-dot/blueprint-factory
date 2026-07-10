# Avya Club Reference-First Topology

Status: complete
Primary donor: Republic Fitness Boston
Donor URL: https://republicbos.com
Brand source: https://avya.club
Captured: 2026-07-10

## Evidence Index

- Canonical desktop/tablet/mobile: `donor-1440.png`, `donor-768.png`, `donor-390.png`; extra desktop `donor-1920.png`.
- Motion: `donor-motion.webm` and `donor-motion-reduced.webm`.
- Mechanical extraction: `extraction/dom.html`, `copy.md`, `tokens.json`, `assets.json`, `animation-hints.json`, `pages.json`.
- Brand truth: `../../../avya-club-brand-source/references/reference-first/`.
- Component contracts: `components/*.spec.md` (13 files).

## Donor Structure, Top To Bottom

1. Static 84.25px site header: logo, three desktop dropdown groups, News, Member Login, Trial, Pricing; compact menu toggle at 768/390.
2. Full-bleed image hero: 815.3px at 1440, 816px at 390; large italic display, short support line, two pill CTAs.
3. Dark announcement band: 322.8px desktop / 363px mobile, large editorial statement plus link.
4. Editorial story 1: 900px full-bleed media with left cream text card.
5. Editorial story 2: 900px full-bleed media with right cream text card.
6. Editorial story 3: 900px full-bleed media with left cream text card.
7. Three-card experience triptych: 798.4px desktop; active cream card drives background media crossfade.
8. Two-card identity triptych: about 687px desktop; same active-card/media model.
9. Split membership close: 798.3px desktop, dark brand statement left and light lead form right; stacks at 768/390.
10. Cream footer: four columns at 1440, two-column wrap at 768, four accordion rows at 390.
11. Donor brand-end field below the footer is reference identity only and is not part of Avya production.

The factory mechanically detected two high-level blocks because WordPress wraps the homepage in a single post-content container; browser and screenshot inspection above is the authoritative section topology.

## Desktop Interaction Model (1440)

- Header is `position: static`; it has no before/after scroll transition. At scrollY 769 its top is -769px.
- Native smooth scroll is set on `html`; no scroll snap, sticky story, parallax, or pinned section.
- Desktop header dropdowns are donor route discovery only; Avya ships a flat six-route nav.
- Triptych cards are hover/focus-driven: first card begins active; a newly targeted card becomes cream/ink and its media crossfades from opacity 0 to 1 in 0.75s. Selection persists after pointer leave.
- Editorial links transition color/background over 0.25s; observed link color changes from `rgb(34,38,33)` to donor accent `rgb(217,62,26)`.
- No timer, carousel autoplay, video autoplay, modal, or checkout occurs on the homepage. Donor membership form posts externally to ActiveCampaign and is not reproduced.

## Tablet And Mobile Interaction Model (768 / 390)

- Header remains 84.25px and scrolls away. A 32px toggle opens a viewport-filling overlay; `aria-expanded` changes false→true and body overflow becomes `hidden auto`.
- Hero/bands escape 4vw gutters (`30.72px` at 768; `16px` at 390).
- Editorial cards center/layer over media; mobile uses a 358px inset card.
- Triptychs become native horizontally scrollable strips. Computed `scrollSnapType` is `none`; do not add mandatory snap.
- Footer becomes 358×68.6px accordion buttons at 390.
- Donor cookie banner is third-party fixed UI and excluded.

## Typography Hierarchy

- Display reference: proprietary Geller Headline Medium/Bold Italic; substitute with an open high-contrast editorial serif.
- Body/UI reference: proprietary Indivisible Regular/Bold; substitute with an open geometric/grotesk sans.
- Exact donor scale: 95 / 69 / 46 / 35 / 34 / 30 / 24 / 20 / 18 / 16 / 14px.
- Key values: hero H1 `94.928/113.914px` desktop, `81.488/97.7856px` tablet, `75/90px` mobile; editorial H2 `46.144/54.796px`; body `18/27.9px`.

## Color And Spacing Rhythm

- Ink `#222621` (`rgb(34,38,33)`), light `#fff8f0`, cream `#f2e7d8`, utility grey `#595d57`, donor hover red `#d93e1a` (translate to Avya accent).
- Constrained wrapper is 4vw: `57.6px` at 1440 and `30.72px` at 768; mobile is `16px`.
- Full-bleed blocks cancel wrapper padding with equal negative margins.
- Story grid is two equal half-viewport tracks (`720/720`, `384/384`, computed `195/195` on mobile layering).
- Major vertical beats are 64/92/144px in triptychs and 48/57.6/92.16px in bands.

## Captured Routes And Flows

- Donor extraction found 30 same-origin routes; the complete disposition is in `clone-plan.md`.
- Donor external flows: Trainerize Member Login, Formsite gift cards, ActiveCampaign membership lead form, related HW Group sites, and social networks. All are deferred.
- Avya source routes: `/`, `/about`, `/service`, `/team`, `/faq`, `/blog`, `/gallery`, `/contact`, `/register`, plus six database-ID `/service-details/*` routes. Only six translated routes are planned.
- Avya conversion destination: `https://avya.club/register`; contact fallbacks are `mailto:info@avya.club`, `tel:061590648`, and `tel:9802855271`.

## Moves To Borrow

1. Tall full-bleed image hero with a large italic editorial statement.
2. Dark announcement band that sharply resets page rhythm.
3. Three alternating 50/50 media stories with warm inset cards.
4. Hover/focus-selected experience cards crossfading a shared media stage over 0.75s.
5. Dark/light split membership close that stacks cleanly before the cream footer.
