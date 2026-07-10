# Worker Notes: Dorje's

## 2026-07-11

- The generic `clone-website` skill points to `/Users/dev/Projects/Ai Website Cloner`, but that project does not exist on this machine. Used the same forensic extraction/spec/QA method inside the canonical Blueprint Factory workspace.
- The shared Playwright MCP Chrome profile was locked by another process (`Browser is already in use ... use --isolated`). Used Blueprint Factory's isolated Playwright capture pipeline instead; it produced the required four viewports, sections, motion, DOM, copy, tokens, assets and page inventory.
- `pnpm install --frozen-lockfile` failed before Dorje's work because committed `sites/open-sky-paragliding/app/package.json` and the root lockfile disagree. Installed with `--no-frozen-lockfile --lockfile=false` to avoid rewriting unrelated lock state.
- Baseline factory test result before Dorje's changes: 145 pass / 3 fail. All three failures are pre-existing prospect-thumbnail tests in `factory/scripts/console-data.test.ts`, apparently dependent on screenshot files absent from this clean worktree. No factory scripts were changed.
- The captured Aman topology/clone plan still contained agent placeholders despite a complete evidence pack. Rewrote both from the screenshots, motion evidence and extracted mechanical facts before art direction.
- Client contact numbers differ across current pages: the homepage uses `+977-9765653255` and `+977-61590735`; the accommodation page also shows `+977-9856016343`. The new shared shell uses the homepage pair and records the discrepancy for client confirmation.
- First local production port (4317) later collided with a server from the San Chon worktree bound on IPv4. Repeated final verification on an isolated loopback-only port (4337) and confirmed all three Dorje routes return 200 before trusting the evidence.
- The first translation compare scored 70.7% because the build had six semantic sections versus Aman's eight. Two focused, non-filler bands brought the structure score to 88.8% while keeping translated raw pixels in the expected 40–60% range.
- The adversarial reviewer rejected the client-owned animated banner as the default hero despite its provenance. The fix was to use the strongest client photograph first, keep the film available on demand, and implement the named aperture behavior. This materially improved the site rather than merely changing the documentation.
- Factory screenshot automation focused the skip link and stitched sticky headers into mobile full-page captures. Added a site-local proof capture script that first exercises the full page, then blurs utility focus and makes the header non-sticky for the still; runtime accessibility behavior is unchanged.
