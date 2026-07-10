# Worker Notes: ambika-juice

## 2026-07-10T23:23:55+05:45

- `pnpm install --frozen-lockfile` failed before site work because the committed root lockfile did not match `sites/donor-ace-hotel/app/package.json` (12 dependencies missing from the lockfile). Used `pnpm install --no-frozen-lockfile --lockfile=false` so the Ambika branch did not rewrite unrelated lockfile state.
- Baseline `pnpm test`: 149 passed, 3 failed. All failures are in `factory/scripts/console-data.test.ts` and depend on missing prospect thumbnail files; Ambika work does not modify those factory files.
- The existing `donor-onyx-coffee` pack had strong raw capture evidence (4 viewports, 20 section images, two motion recordings, 64 routes) but both topology and clone plan were still mechanical drafts with blank agent prompts.
- The donor asset inventory records dimensions but several source URLs are absent/null in the extracted JSON. Live inspection or page-source extraction may be needed for exact clone-stage media.
- User explicitly approved the broad clone scope and asked the agent to stop asking questions. Ambiguous implementation choices are resolved conservatively and logged here.
- The adopted site scaffold uses `app/src/app`, while the initial implementation plan assumed `app/app`; all implementation follows the real scaffold and retains the planned component boundaries under `app/src/`.
- The first site build failed with `next: command not found` because the site was created after the root dependency install. `pnpm install --filter ambika-juice --no-frozen-lockfile --lockfile=false` created only the needed workspace links without rewriting the unrelated lockfile.
