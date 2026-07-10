# Worker Notes: San Chon

## 2026-07-11 00:34 +0545

- Started in an isolated worktree on branch `job/san-chon` because the main workspace was on `job/example-site-supabase` with unrelated modified and untracked files.
- `pnpm install --frozen-lockfile` failed before installing: `ERR_PNPM_OUTDATED_LOCKFILE` for `sites/donor-ace-hotel/app/package.json` (12 missing dependency specifiers). Per the job rules, the factory lockfile was not repaired here.
- `pnpm test` could not start immediately because `tsx` was absent after the failed frozen install.
- Workaround: `pnpm install --no-frozen-lockfile --lockfile=false`; dependencies installed without reading or writing the lockfile.
- Baseline `pnpm test`: 145 passed, 3 failed. The failures are pre-existing console prospect-thumbnail tests (`prospectFromRow`, `resolveProspectThumbnail`, `readProspects`) caused by unavailable screenshot paths in this isolated checkout. No factory test files were changed.
- `pnpm blueprint:capture san-chon <COTE URL>` succeeded: four viewport captures, 12 sections, normal/reduced motion, 24 routes, 271 reference-only assets, and Swiper detection.
- The supplied Tripadvisor page served a verification iframe to browser automation. No verification challenge was bypassed. Public indexed Tripadvisor content plus corroborating listings were used and recorded under `references/brand-source/`.
- Public sources disagree on phone and hours. Production copy uses Tripadvisor's phone, qualifies online-listed hours, and records both conflicts as client-confirmation items.
- Reference library gap: no restaurant-specific crest/border motif exists. The build will use simple CSS/SVG geometry; motion still comes from the existing masthead-reveal, scroll-reveal, and media-gallery patterns.
