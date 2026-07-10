# Run Log: dorjes

## 2026-07-11 — reference and brand capture

- Adopted `donor-aman` into `dorjes` and captured `https://dorjes.com` at 1920, 1440, 768 and 390 widths.
- Brand capture found 9 sections, 23 public routes and 42 media assets.
- Verified Aman at 4 widths plus normal/reduced-motion scroll captures; completed the previously placeholder topology and clone plan.

## 2026-07-11 — implementation pass 1

- Downloaded 28 client-owned production assets, including the 1920×1080 resort film.
- Built `/`, `/accommodation-in-pokhara` and `/tastes` with an accessible shared shell.
- `pnpm --dir sites/dorjes/app exec tsc --noEmit`: pass.
- `pnpm --dir sites/dorjes/app build`: pass; 3 static routes plus not-found generated.
- Local production preview: `http://127.0.0.1:4317`.

## 2026-07-11 — visual pass 1

- `blueprint:check`: typecheck, build, console, internal links and axe passed after raising footer legal-text contrast.
- Translation comparison: 70.7% structure, 48.1% desktop pixel, 48.9% mobile pixel. Root cause: 6 major bands versus Aman's 8.
- Added two purposeful donor-aligned bands: a full-bleed Phewa Lake interlude and a slim personal-enquiry strip.
- Translation comparison after the focused change: **88.8% structure**, 53.6% desktop pixel, 52.9% mobile pixel; 8 build bands versus 8 donor bands.

## 2026-07-11 — isolated final verification

- Found another worktree binding a different site to IPv4 port 4317 while Dorje's used IPv6. Although saved captures were visibly Dorje's, moved the final audit to loopback-only `127.0.0.1:4337` and rechecked all routes.
- HTTP 200: `/`, `/accommodation-in-pokhara`, `/tastes`.
- `blueprint:verify dorjes http://127.0.0.1:4337`: all automated checks pass; translation structure 88.8%; desktop pixel 53.6%; mobile pixel 52.9%.
- Route-by-route Playwright + axe audit: zero console errors and zero critical/serious WCAG A/AA violations after fixing one decorative dining numeral contrast issue.
- Recaptured desktop/tablet/mobile screenshots for all three built routes from the isolated port.

## 2026-07-11 — antagonistic review and second pass

- First antagonistic review: FAIL (illustrated default hero, absent scroll aperture, overlong rhythm, fragile body copy and capture artifacts).
- Rebuilt the opening around `resort-view.jpg`, made the illustrated film opt-in, implemented the 1260px-to-viewport Lake Aperture, tightened vertical spacing and type scale, raised body copy to 15px/400, improved stay/dining hero art direction and removed major image repetition.
- Re-review: PASS, no Critical findings, 4/5 across first screen, signature, typography, rhythm, motion, imagery, mobile and coherence.
- Final isolated `blueprint:verify`: all checks pass; **86.3% structure**, **47.5% desktop pixel**, **55.1% mobile pixel**, 8 sections vs 8 donor sections.
- Final clean proof capture hides the focused skip-link only in screenshots, leaves runtime keyboard behavior intact, and removes sticky-header stitching artifacts.

## 2026-07-11 — preview

- Vercel preview deployed: `https://dorjes-k2ow015ll-jeremys-projects-379e354f.vercel.app`.
- Shareability: public/shareable. Production untouched.
- Live route check after deploy: home, accommodation and dining all HTTP 200.

## Entries

### 2026-07-10T18:43:15.997Z

- Adopted donor shelf pack donor-aman: copied reference-first evidence, rewrote client headers, and seeded pages.json (8 planned page(s)).

### 2026-07-10T18:50:05.791Z

- Curated donor tokens into app/tokens.json. Fonts: heading Inter, body Inter. Recorded font decisions in asset-log.md.

### 2026-07-10T19:02:08.908Z

- Ran verify: Every automated check passed for dorjes: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems. The translation-stage structure score is 70.7%; raw pixel match is 48.1% on desktop and 48.9% on mobile, which is informational after brand translation. The weakest area is "Section band 8 (y 4270–4881)" at 5.9% — fix that first. Structurally the build has 6 sections vs the donor's 8, which is what should stay close even after the brand translation drops the color/imagery match. Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.

### 2026-07-10T19:04:39.980Z

- Visual compare vs donor (translation stage): headline 88.8%, desktop pixel 53.7%, mobile pixel 52.9%. Worst section: Section band 3 (y 1220–1830) (30.2%). Report: qa/compare/report.md.

### 2026-07-10T19:10:38.213Z

- Ran verify: Every automated check passed for dorjes: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems. The translation-stage structure score is 88.8%; raw pixel match is 53.6% on desktop and 52.9% on mobile, which is informational after brand translation. The weakest area is "Section band 3 (y 1220–1830)" at 30.2% — fix that first. Structurally the build has 8 sections vs the donor's 8, which is what should stay close even after the brand translation drops the color/imagery match. Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.

### 2026-07-10T19:28:17.858Z

- Visual compare vs donor (translation stage): headline 86.2%, desktop pixel 47%, mobile pixel 55.1%. Worst section: Section band 3 (y 1220–1830) (30.3%). Report: qa/compare/report.md.

### 2026-07-10T19:32:52.688Z

- Ran verify: Every automated check passed for dorjes: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems. The translation-stage structure score is 86.3%; raw pixel match is 47.5% on desktop and 55.1% on mobile, which is informational after brand translation. The weakest area is "Section band 3 (y 1220–1830)" at 30.5% — fix that first. Structurally the build has 8 sections vs the donor's 8, which is what should stay close even after the brand translation drops the color/imagery match. Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.

### 2026-07-10T19:38:20.562Z

- Deployed Vercel preview: https://dorjes-k2ow015ll-jeremys-projects-379e354f.vercel.app (verified 200, shareable). Recorded in deploy.md. Not production.
