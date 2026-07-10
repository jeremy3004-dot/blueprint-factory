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
