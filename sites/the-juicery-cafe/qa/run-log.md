# Run Log: the-juicery-cafe

## Entries

### 2026-07-10T16:55:08.492Z

- Adopted donor shelf pack donor-gymkhana: copied reference-first evidence, rewrote client headers, and seeded pages.json (1 planned page(s)).

### 2026-07-10 — evidence reconciliation

- Created isolated branch/worktree `job/the-juicery-cafe` from `5d5b37e` to preserve the unrelated
  dirty `job/example-site-supabase` checkout.
- `pnpm install --frozen-lockfile` failed before installation because the repository lockfile does
  not match `sites/donor-ace-hotel/app/package.json`. Reused the existing root dependency runtime
  through a worktree-local symlink; did not modify `pnpm-lock.yaml`.
- `pnpm blueprint:capture the-juicery-cafe-brand-source https://www.thejuicerycafe.com` completed:
  4 viewports, 4 section images, motion + reduced-motion video, and 8 homepage media assets.
- Live sitemap reconciliation found 9 public URLs. `/events-1` contains the credible event content;
  `/events`, `/weekend-market`, `/fresh-baskets`, and `/contact` contain unrelated Wix demo facts.
- Scope decision: build all useful public routes, redirect `/events-1`, defer only the nonfunctional
  `/my-account` route, and flag missing current details for client input.
- Owner supplied the claimed TripAdvisor listing as supplemental evidence. Saved six photos under
  `references/tripadvisor/` for reference-only use, updated hours from the claimed listing, and added
  three captioned menu examples without publishing old menu-board prices.

### 2026-07-10 — compare, verify, and preview

- Clone-stage comparison first pass: 49.4% desktop / 54.7% mobile pixel match. The build already
  used client imagery and brand tokens, so this is a conservative translation-first clone baseline.
- Translation iteration 1: 60.3% structure; 5 build sections vs 7 donor sections.
- Translation iteration 2: 81.4% after matching 7 semantic sections.
- Translation iterations 3-4: 81.3%, then 84.0% while aligning heading hierarchy and quiet/media bands.
- Translation iteration 5: 85.2%, clearing the >=85% structure target.
- Final clone-stage measurement: 68.0% desktop / 70.7% mobile pixel match. This remains below the
  85% clone target because client colors/images were already applied; the deviation is documented
  rather than relabeled as a pixel-perfect clone.
- Fresh `pnpm blueprint:verify`: PASS typecheck, build, console, 8 internal links, axe serious/critical,
  desktop/tablet/mobile screenshots, motion, reduced motion; 85.2% translation structure.
- `pnpm blueprint:run`: `RUN_BEAUTY`; all machine evidence ready, human Beauty Pass pending.
- Initial Vercel preview deployed and verified HTTP 200: `https://the-juicery-cafe-5xnzbrinz-jeremys-projects-379e354f.vercel.app`.
  Shareable, preview only, no production deployment.

### 2026-07-10T17:03:26.933Z

- Curated donor tokens into app/tokens.json. Fonts: heading Libre Baskerville, body Libre Baskerville. Recorded font decisions in asset-log.md.

### 2026-07-10T17:20:54.958Z

- Visual compare vs donor (clone stage): headline 49.4%, desktop pixel 49.4%, mobile pixel 54.7%. Worst section: Section band 1 (y 0–730) (20.1%). Report: qa/compare/report.md.

### 2026-07-10T17:21:23.055Z

- Visual compare vs donor (translation stage): headline 60.3%, desktop pixel 49.4%, mobile pixel 54.7%. Worst section: Section band 1 (y 0–730) (19.8%). Report: qa/compare/report.md.

### 2026-07-10T17:23:07.196Z

- Visual compare vs donor (translation stage): headline 81.4%, desktop pixel 54.7%, mobile pixel 54.8%. Worst section: Section band 6 (y 3755–4506) (28.9%). Report: qa/compare/report.md.

### 2026-07-10T17:24:39.029Z

- Visual compare vs donor (translation stage): headline 81.3%, desktop pixel 54.9%, mobile pixel 54.8%. Worst section: Section band 6 (y 3765–4518) (29%). Report: qa/compare/report.md.

### 2026-07-10T17:28:02.572Z

- Visual compare vs donor (translation stage): headline 84%, desktop pixel 65.9%, mobile pixel 70.6%. Worst section: Section band 1 (y 0–786) (39.3%). Report: qa/compare/report.md.

### 2026-07-10T17:28:49.936Z

- Visual compare vs donor (translation stage): headline 85.2%, desktop pixel 68%, mobile pixel 70.6%. Worst section: Section band 4 (y 2358–3144) (47%). Report: qa/compare/report.md.

### 2026-07-10T17:29:04.056Z

- Generated copy-deck.md (30 donor lines) for donor→brand translation.

### 2026-07-10T17:31:25.909Z

- Ran verify: Every automated check passed for the-juicery-cafe: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems. The translation-stage structure score is 85.3%; raw pixel match is 68.1% on desktop and 70.7% on mobile, which is informational after brand translation. The weakest area is "Section band 4 (y 2358–3144)" at 47% — fix that first. Structurally the build has 7 sections vs the donor's 7, which is what should stay close even after the brand translation drops the color/imagery match. Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.

### 2026-07-10T17:32:07.263Z

- Beauty evidence is present. Stopped at human beauty pass gate.

### 2026-07-10T17:35:32.059Z

- Ran verify: Every automated check passed for the-juicery-cafe: it compiles, builds, has no console errors, no broken internal links, and no critical accessibility problems. The translation-stage structure score is 85.2%; raw pixel match is 68% on desktop and 67.7% on mobile, which is informational after brand translation. The weakest area is "Section band 4 (y 2358–3144)" at 47% — fix that first. Structurally the build has 7 sections vs the donor's 7, which is what should stay close even after the brand translation drops the color/imagery match. Nothing has been deployed to production. The next human step is the Beauty Pass: watch the motion capture and compare against the donor before approving.

### 2026-07-10T17:36:36.175Z

- Deployed Vercel preview: https://the-juicery-cafe-5xnzbrinz-jeremys-projects-379e354f.vercel.app (verified 200, shareable). Recorded in deploy.md. Not production.

### 2026-07-10T17:37:13.232Z

- Visual compare vs donor (clone stage): headline 68%, desktop pixel 68%, mobile pixel 70.7%. Worst section: Section band 4 (y 2358–3144) (47%). Report: qa/compare/report.md.

### 2026-07-10T17:37:29.786Z

- Visual compare vs donor (translation stage): headline 85.1%, desktop pixel 68%, mobile pixel 67.7%. Worst section: Section band 4 (y 2358–3144) (47%). Report: qa/compare/report.md.

### 2026-07-10T17:41:04.730Z

- Deployed Vercel preview: https://the-juicery-cafe-qhriiphrc-jeremys-projects-379e354f.vercel.app (verified 200, shareable). Recorded in deploy.md. Not production.

### 2026-07-10 — independent preview audit

- The factory deploy command reported the replacement preview as shareable because its health check
  accepted the final 200 response after redirects.
- Independent `curl -I` returned HTTP 302 to `vercel.com/sso-api`; following it returned the Vercel
  login page. Correct status: protected, not publicly shareable.
- Handoff now directs the owner to disable Deployment Protection before external review.
