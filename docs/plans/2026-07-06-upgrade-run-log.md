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
