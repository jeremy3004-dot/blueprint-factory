# Worker Notes: Avya Club

## 2026-07-10 — Task 1 baseline

- TDD: not applicable; this task creates capture evidence and documentation only.
- Docs discovery: `pnpm docs:list` is not available (`Command "docs:list" not found`); used the approved design and implementation plan directly.
- Lockfile baseline: preserve the committed `pnpm-lock.yaml`. Command `pnpm install --frozen-lockfile --ignore-scripts` exits with `ERR_PNPM_OUTDATED_LOCKFILE`; after the factory-created brand-source scaffold, the lock lacks the 12 dependencies declared by `sites/avya-club-brand-source/app/package.json`. No lockfile edit was made.
- Factory-test baseline command: `pnpm test`. Result: 152 tests, 149 pass, 3 fail, 0 cancelled/skipped/todo. All three failures are unrelated prospect-thumbnail tests in `factory/scripts/console-data.test.ts`:
  1. `prospectFromRow includes thumbnail when screenshot_path exists on disk`
  2. `resolveProspectThumbnail reads screenshot_path column aliases`
  3. `readProspects loads nepal-leads.csv sorted by score descending` (reported 0 thumbnails)
- Donor capture initially exposed screenshots before extraction/topology finished; after the capture process settled, the full evidence pack was present. Mechanical section detection found only 2 blocks even though visual/browser inspection found the complete homepage sequence; the concrete topology corrects this.
- Republic's cookie notice is a third-party fixed overlay and is excluded from the clone interaction model.
- Avya source conflict: homepage JSON-LD says Kathmandu and a placeholder `+977-123-456-7890`; visible page/contact content consistently says Gharipatan, Pokhara, `061-590648`, and `9802855271`. Visible content is authoritative.
- Avya pricing audit: option labels are rendered, but all `.pricing-plan-card .price-options` containers are empty. Do not publish invented numbers or currency.

## 2026-07-11 — Task 7 translation and asset clearance

- TDD RED: `pnpm --dir sites/avya-club/app exec tsx --test src/app/production-assets.test.tsx` failed `0/2`. The first test could not find a production image identified for `Pure energy`; the second failed because `siteContent.media` still used remote image paths.
- TDD GREEN: the focused asset suite passed `2/2` after localizing runtime media and assigning distinct gym, physiotherapy, and Club House photographs to the three hero states. A focused editorial-overview RED then failed because only two distinct images covered three rows; it passed `3/3` after the overview used the same three source-cleared Avya photographs.
- Asset source: Avya's public gallery API (`https://serveravya.onrender.com/api/photos?limit=1000`) and service API (`/api/services?limit=100`) exposed client media filenames, roles, dimensions, and public media URLs. Production files came only from those Avya endpoints or `avya.club/assets`; every runtime image now resolves locally under `app/public`.
- Copy deck: generated all 224 donor rows, replaced every TODO, supplied source-backed Avya copy for planned-route patterns, and explicitly marked 135 unsupported donor-only features as deferred rather than inventing Avya capabilities.
- Clone compare plateau: initial desktop/mobile pixel scores were `35.5% / 52.9%`. Three bounded media/geometry passes produced `36.0% / 52.5%`, `36.5% / 49.2%`, and `36.6% / 48.9%`. The 85% target was not attainable without undoing translation; the mechanical detector sees only 2 donor sections against 10 build sections.
- Translation compare: structure `27.7%`, heading hierarchy `55%`, grayscale rhythm `18%`, media/text band agreement `100%`; worst section remained desktop band 4 at `20.1%`. This is recorded as a tool/donor-evidence plateau, not hidden or gamed.
- Final gates: app tests `21/21`, `tsc --noEmit`, production build, and `blueprint:check` all passed. The controlled `127.0.0.1:4187` server was stopped and `next-env.d.ts` restored to SHA-1 `16f9ac398c0d5e5fe79b8d0973cb1c13ee21235d`.

## 2026-07-11 — Task 7 review correction

- Browser RED/GREEN isolated the sole defect to inherited desktop margins on the responsive `.overviewCard` flex item. Responsive margins now fit the intended card width exactly at 768px and 390px; desktop geometry is unchanged.
- The official translation report remains `27.7%` because extraction still counts 2 donor sections. The review-corrected ten-band interpretation is `87.7%`; no detector, DOM, or further visual tuning was used to manufacture that number.

## 2026-07-11 — Task 8 preview handoff

- The first quiet `blueprint:verify` process was still active when its wrapper yielded, so a second invocation briefly overlapped. The duplicate was stopped; one complete run then passed typecheck, build, console, six internal links, and axe checks.
- Fresh desktop, tablet, and mobile evidence covers all six public routes. Normal and reduced-motion recordings were regenerated; live mobile checks confirmed hero selection, timer suppression under reduced motion, menu Escape/focus restoration, valid CTA targets, and no horizontal overflow.
- `blueprint:status` and `blueprint:run` correctly stop at `RUN_BEAUTY`; the automated worker did not mark the human Beauty Pass approved.
- Two preview-only deployments were created while the handoff worker and supervisor overlapped. The deploy helper reported both as HTTP 200/shareable, but an independent unauthenticated `curl` proved both return `302` to `vercel.com/sso-api`; Vercel Deployment Protection is active and the helper's protection detector produced a false negative. The factory script was not changed. `deploy.md` records the exact owner action, and no production deployment was attempted.

## 2026-07-11 — Final review dependency and preview correction

- Restored the exact `b2b29a6` lockfile in an isolated temporary workspace, generated a lock slice containing only the two current Avya manifests, and deterministically merged only the two importer blocks plus package/snapshot keys absent from the baseline. No factory script or unrelated manifest changed.
- Reused exact dependency versions already present in the baseline where possible (`next@16.2.9`, Tailwind `4.3.1`, `tsx@4.22.4`) and used `eslint@9.39.4` with `typescript-eslint@8.62.1` for a real TypeScript-aware lint gate. The resulting lock diff is `+1064/-0` lines; it adds 2 importers, 113 package records, and 114 snapshot records.
- Isolated validation command: `pnpm install --frozen-lockfile --filter avya-club --filter avya-club-brand-source --ignore-scripts`. Result: pass, lockfile up to date, 168 packages resolved from the narrowed lock.
- Full-workspace validation with the same filtered command still exits `ERR_PNPM_OUTDATED_LOCKFILE` because pnpm validates unrelated current workspaces before applying the filter. The first mismatch is the pre-existing `sites/donor-ace-hotel/app`, whose 12 dependencies are absent from the `b2b29a6` baseline. This was not hidden or broadened into unrelated lock churn.
- Latest preview `https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app` is protected: unauthenticated `curl` returned HTTP `302` to `https://vercel.com/sso-api`. The deploy helper's HTTP 200/shareable label was authenticated and false for external reviewers.
