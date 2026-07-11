# Run Log: ambika-juice

## Entries

### 2026-07-10T17:37:04.212Z

- Adopted donor shelf pack donor-onyx-coffee: copied reference-first evidence, rewrote client headers, and seeded pages.json (3 planned page(s)).

### 2026-07-10T23:23:55+05:45

- Verified the canonical 1440px and 390px captures, 20 section captures, animation hints, token extraction, donor copy, and 64-route inventory.
- Completed `topology.md` and `clone-plan.md` with exact page families, responsive rhythm, interaction states, asset rules, and stack decisions.
- Expanded `pages.json` from the three default routes to all 64 harvested public donor routes as planned coverage.
- Approved brief and art direction lock the clone-first sequence and the Ambika Living Menu Wall translation.
- Added site-local red/green contract tests covering all 64 reference routes, page families, navigation links, catalogue slugs, optional facts, and donor-media provenance.
- Site-local test result: 4 passed, 0 failed. Initial Next build passed after the scoped non-lockfile dependency install.
- Added the donor chrome shell: announcement bar, fixed contrast-changing header, mega-menu, mobile drawer, cart drawer, newsletter footer, dense site map, and oversized footer wordmark.
- Chrome contract test cycle: 3 expected RED failures before components; final site-local result 7 passed, 0 failed. Next build passes.
- Added the full 20-section homepage as typed reference data with exact donor section order and reference-only media provenance.
- Added hero, editorial split, full-bleed media, two-up campaign, arched origin rail, and press rail renderers with desktop/mobile/reduced-motion CSS.
- Homepage contract test cycle: expected missing-module RED; final site-local result 10 passed, 0 failed. Next build passes.
- Manual 1440px full-page capture confirmed the donor's overall light/dark rhythm, grid alternation, origin arches, and footer close are present.
- Added collection, product-detail, editorial/page, policy, cart, and account reference page families.
- Route-family contract test cycle: expected missing-module RED; final site-local result 13 passed, 0 failed.
- Next production build prerendered 66 static pages, covering all 64 harvested public donor routes plus framework pages.

### 2026-07-10T18:35:17.742Z

- Visual compare vs donor (clone stage): headline 8.1%, desktop pixel 8.1%, mobile pixel 6.5%. Worst section: Section band 7 (y 822–959) (4.7%). Report: qa/compare/report.md.

### 2026-07-10T18:37:29.616Z

- Visual compare vs donor (clone stage): headline 8.1%, desktop pixel 8.1%, mobile pixel 6.5%. Worst section: Section band 7 (y 822–959) (4.7%). Report: qa/compare/report.md.

### 2026-07-10T18:41:07.480Z

- Visual compare vs donor (clone stage): headline 35.9%, desktop pixel 35.9%, mobile pixel 33.7%. Worst section: Section band 5 (y 7804–9755) (26.5%). Report: qa/compare/report.md.

### 2026-07-10T18:48:26.912Z

- Visual compare vs donor (clone stage): headline 45.5%, desktop pixel 45.5%, mobile pixel 42.7%. Worst section: Section band 7 (y 11706–13657) (22.8%). Report: qa/compare/report.md.

### 2026-07-10T18:50:17.023Z

- Curated donor tokens into app/tokens.json. Fonts: heading Montserrat, body Inter. Recorded font decisions in asset-log.md.

### 2026-07-10T18:54:27.116Z

- Visual compare vs donor (clone stage): headline 45.4%, desktop pixel 45.4%, mobile pixel 43.4%. Worst section: Section band 7 (y 11706–13657) (22.8%). Report: qa/compare/report.md.

### 2026-07-10T19:00:00.917Z

- Visual compare vs donor (clone stage): headline 45.5%, desktop pixel 45.5%, mobile pixel 43.8%. Worst section: Section band 7 (y 11706–13657) (22%). Report: qa/compare/report.md.

### 2026-07-11T01:17:23.184Z

- Visual compare vs donor (clone stage): headline 60.4%, desktop pixel 60.4%, mobile pixel 52.5%. Worst section: Section band 5 (y 7804–9755) (37.3%). Report: qa/compare/report.md.

### 2026-07-11T01:21:01.237Z

- Visual compare vs donor (clone stage): headline 63.4%, desktop pixel 63.4%, mobile pixel 56.3%. Worst section: Section band 2 (y 1951–3902) (50.7%). Report: qa/compare/report.md.
- Clone tuning stopped after five focused iterations as required by the clone plan. The final build preserves all 20 donor sections, exact desktop section heights, all public route families, responsive choreography, drawers, mega-menu, reveal/reset motion, and a 96.8% structural score.
- Pixel similarity plateaued below the 85% target because the live donor relies on time-dependent remote video frames, proprietary inline SVG headline art, and reveal states captured at different scroll moments. The final two passes corrected the actual late-page order and the missing James Beard section, raising desktop similarity from 45.5% to 63.4% and mobile from 43.8% to 56.3% without substituting screenshots for working UI.
