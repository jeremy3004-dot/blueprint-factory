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
