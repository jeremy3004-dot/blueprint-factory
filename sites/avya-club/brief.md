# Brief: Avya Club

Status: ready for art/tokens/build

## What This Site Is

A six-route public website for Avya Club, the Pokhara fitness, recovery, sport, and wellbeing club founded in 2018. Republic Fitness Boston (`https://republicbos.com`) is the structural and interaction donor; Avya's live site (`https://avya.club`) is the only source for production facts, copy, destinations, and client-owned media.

## Audience

People in Pokhara seeking a gym, functional/group fitness, swimming, tennis, physiotherapy, massage/spa, clubhouse, and nutrition/wellbeing services, plus prospective members comparing access options.

## Inputs Provided

- Approved design: `docs/superpowers/specs/2026-07-10-avya-club-republic-clone-design.md`.
- Republic donor capture: `references/reference-first/` at 1440, 768, and 390 CSS pixels, plus normal/reduced-motion video and DOM/token/page extraction.
- Avya brand-source capture: `../avya-club-brand-source/references/reference-first/`.

## Source Notes

- Republic fits because its full-bleed editorial media, cream cards, restrained dark/cream palette, and workout-to-recovery narrative map naturally to Avya's fitness/healing/mindfulness offer.
- Republic copy, logos, imagery, icons, and Geller/Indivisible fonts are reference-only and must not ship.
- Visible Avya contact content is authoritative: Gharipatan, Pokhara; `info@avya.club`; `061-590648`; `9802855271`. Stale homepage JSON-LD says Kathmandu and a placeholder phone; do not use it.
- Avya's live pricing cards expose option labels but no numeric prices or currency. Do not invent amounts; list them as needs-client-input.

## Required Pages Or Sections

Planned routes are exactly `/`, `/about`, `/services`, `/gallery`, `/contact`, and `/membership`. The homepage follows the donor's hero, announcement/intro, three editorial media stories, three-card experience system, two-card identity gallery, membership CTA, and footer rhythm. All other captured donor and Avya routes are deferred in `pages.json` and `references/reference-first/clone-plan.md`.

## Deploy Expectation

Preview-only Vercel deployment after Tasks 2-7 pass. No backend, production deploy, auth, checkout, CMS, or database in scope.

## Ready Criteria

- Six routes use only traceable Avya facts/assets.
- Pure Energy / First Light Sequence works with a complete reduced-motion state.
- Donor structure and responsive rhythm meet the factory comparison gate.
- All code/test/build/link/accessibility gates pass or baseline failures are documented.
- Human Beauty Pass approves the preview before any production action.
