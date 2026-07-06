# Blueprint Factory Upgrade — Run Log

This file is the handoff between sessions. Each phase appends: what shipped, how it was
verified, what's next. Spec: `docs/plans/2026-07-06-blueprint-factory-master-plan.md`.

---

## Phase 1 — Donor Capture Engine ✅

Date: 2026-07-06

### What shipped

New command `pnpm blueprint:capture <slug> <donor-url> [--pages N]` producing the complete
reference-first evidence pack automatically, plus fixes to the existing preview capture.

- `factory/scripts/browser-utils.ts` (new) — shared, resilient Playwright helpers:
  - `resilientGoto` — `load` then `domcontentloaded` fallback + settle delay + hard timeout.
    Never bare `networkidle` (which hangs on analytics/long-poll sites).
  - `autoScroll` — stepwise down-and-back scroll that waits for lazy content before any
    full-page screenshot (kills the "empty lazy-load box" problem).
  - `dismissCookieConsent` — best-effort consent dismissal (selectors + button text).
  - `scriptedScrollThrough` — real ~22s top-to-bottom scroll for motion capture.
  - `installEvalShim` — defines `globalThis.__name` in the page so tsx/esbuild's `__name`
    helper survives `page.evaluate` (otherwise every evaluate throws ReferenceError).
  - `CAPTURE_VIEWPORTS` — 1920 / 1440 (desktop-canonical) / 768 / 390 (mobile-canonical).
- `factory/scripts/capture-donor.ts` (new) — the engine. Pure, unit-tested logic
  (`normalizeColor`, `mostCommonFamily`, `extractTokens`, `harvestPageInventory`,
  `detectAnimationLibraries`, `draftClonePlan`, `draftTopology`) + `captureDonor()` browser
  orchestration. Writes: `donor-{1920,1440,768,390}.png` (+ `<slug>-desktop/-mobile.png`
  aliases so the existing gate keeps passing), `sections/NN-*.png`, `donor-motion.webm` +
  `donor-motion-reduced.webm`, and `extraction/{dom.html,copy.md,tokens.json,assets.json,
  animation-hints.json,pages.json}`, then auto-drafts `topology.md` + `clone-plan.md`.
- `factory/scripts/capture.ts` (rewritten) — preview capture now auto-scrolls, uses resilient
  waits, adds a 768 tablet pass, and records a real scripted scroll-through + reduced-motion
  variant instead of the old one-wheel-event 2-second clip.
- `factory/templates/topology.template.md` (new) — matches the existing clone-plan template so
  drafting uses templates consistently.
- `factory/scripts/capture-donor.test.ts` (new) — 19 unit tests.
- `factory/scripts/blueprint.ts`, `package.json` — wired the `capture` command + npm script,
  with a plain-language closing summary.

### Guardrail honored: capture never auto-passes a gate

The drafted `clone-plan.md` pre-fills mechanical fields (donor identity, page inventory, asset
count, detected libraries, palette/type hints) but leaves the section-6 `Decision:` line BLANK,
offering only a `> Suggested (VERIFY...)` hint. So `hasConcreteClonePlan` still returns false
until an agent completes it — capture adds evidence, it does not weaken the reference-first gate.
Confirmed live: after capturing, `blueprint:status demo-clone` still reports
`NEEDS_REFERENCE_FIRST` / `references: missing`.

### How it was verified

- Unit: `pnpm test` → 35 pass (16 original + 19 new). Token extraction, page-inventory
  harvesting, library detection, and draft generation all covered; one test asserts the draft
  does NOT satisfy `hasConcreteClonePlan`.
- Reality (2 real external sites, one lazy-heavy):
  - `apple.com/ipad-pro/` (lazy-heavy): 4 viewports, 20 sections, 163 pages, 173 assets.
    Screenshots 3–10MB (not blank). Extracted Apple's real DNA — fonts SF Pro Display/Text,
    palette `#f5f5f7 / #2997ff / #86868b`, 12-step type scale. A mid-page section screenshot
    visually confirmed lazy content (M5 iPad imagery, stats) fully rendered — no blank boxes.
    Two scroll-through videos (5.4MB each).
  - `linear.app` (animation-heavy marketing): 8 sections, 47 pages, clean page inventory
    (zero media-extension leaks after the filter fix), font "Inter Variable" detected.
- Regression: existing gate functions unchanged; existing tests still green.

Validation captures live at `sites/demo-clone/` (kept — it's the mission's definition-of-done
target) and `sites/capture-test-linear/` (throwaway; heavy binaries are NOT committed).

### What's next

Phase 2 — Visual Compare + real verification: `blueprint compare <slug> <preview-url>`
(per-section pixel diff, side-by-side composites, worst-section-first report), upgraded
`blueprint check` (typecheck → build → console-error → link check → axe a11y), and
`blueprint verify` chaining the full QA loop with a plain-language report.

---

## Phase 2 — Visual Compare + real verification ✅

Date: 2026-07-06

### What shipped

Objective "how close is the clone?" measurement plus real build verification.

- `factory/scripts/compare.ts` (new) — `blueprint compare <slug> <preview-url>`:
  - Recaptures the build (desktop + mobile, same auto-scroll discipline) and harvests its tokens,
    headings, and section count.
  - Per-section pixel diff by horizontal bands over the shared height (pngjs + pixelmatch, no resize
    dep needed since donor/build share viewport width). Tolerates height differences by top-aligning
    and comparing common-height bands.
  - Side-by-side donor|build composites per viewport (`qa/compare/side-by-side-*.png`), worst-band
    diff crops (`qa/compare/crops/`), and `qa/compare/report.md`: overall + per-section match %,
    worst-sections-first fix list, and — per the honesty rule — structure and style-token scores
    reported SEPARATELY from raw pixel match (translation is expected to drop color/imagery, not
    structure). Tolerates legacy donor names (`*-desktop.png`) and missing donor evidence.
- `factory/scripts/checks.ts` (new) — upgraded `blueprint check`: typecheck (`tsc --noEmit`) → build
  (`next build`) → console-error scan → internal broken-link check → axe-core a11y quick pass, each
  reported pass/fail. Browser checks run only when a preview URL is supplied. File-existence gate
  (unchanged) still runs first.
- `factory/scripts/verify.ts` (new) — `blueprint verify <slug> <preview-url>` chains
  check → screenshots → motion → compare and ends with a plain-language, non-technical summary
  written to `qa/verify-report.md`.
- Tests: `compare.test.ts`, `checks.test.ts`, `verify.test.ts` (22 new, incl. real pixelmatch band
  diffing on synthetic PNGs). `pnpm test` → 57 pass.
- Docs/process: `beauty-pass-rubric.md` now requires the latest compare report as a Beauty Pass input
  and mandates citing the match scores (with the honesty caveat). `visual-review.template.md` gained a
  "Compare scores" block. No existing gate weakened — these add requirements.
- New deps (devDependencies, factory root, justified): `pixelmatch` + `pngjs` (image band diff),
  `@axe-core/playwright` (a11y). Also fixed a real template defect surfaced by the new typecheck:
  `next-site` (and example-site) were missing `@types/react`/`@types/react-dom`/`@types/node`.

### How it was verified

- Unit: `pnpm test` → 57 pass (35 + 22 new).
- Compare on four-seasons (served via `next dev`, compared against its donor screenshot):
  per-section report produced (desktop 51.9%, mobile 27.1%). Controlled A/B break: hiding the
  featured **carousel** (`propertyStage`, height preserved) dropped exactly that band —
  **band 5: 18.5% → 9.3%** — while every other in-range band stayed **identical** (61.4/68.5/45.7/
  8.5/95), overall dropped, and the broken section rose into the worst-sections fix list. The break
  was then fully reverted (four-seasons `page.tsx` is pristine — no diff). Honesty note: band 7 (8.5%)
  is a genuinely low-fidelity region of this loose stylistic clone and stays the standing #1 in every
  run — the instrument reports true fidelity rather than being gamed by an artificial blank. The
  height-truncation caveat (build taller than donor screenshot → footer below compared region) is a
  known limit of band-diff when donor `sections/` are absent; real donor captures include `sections/`.
- Verify end-to-end on example-site (the sandbox): all five checks PASS (typecheck, build,
  console-errors, internal-links, a11y-axe), screenshots + motion captured, compare ran (reports
  "no donor on file" honestly rather than a fake 0%), plain-language report written.
- Regression: all pre-existing gate tests still pass.

Notes: generated QA artifacts (composites, crops, build shots, videos, verify report) are left in the
working tree as evidence but NOT committed (regenerable binaries). Mid-phase, an external process wiped
`~/Library/Caches/ms-playwright`; reinstalled chromium + headless-shell + ffmpeg to continue.

### What's next

Phase 3 — Design tokens + fonts: `blueprint tokens <slug>` normalizes `extraction/tokens.json` into
`app/tokens.json` wired into the Tailwind theme (and the `next-site` template), plus a donor-font →
open-alternative substitution workflow recorded in `asset-log.md`.
