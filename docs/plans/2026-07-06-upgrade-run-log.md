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

---

## Phase 3 — Design tokens + fonts ✅

Date: 2026-07-06

### What shipped

Donor DNA now flows mechanically into the build instead of through prose.

- `factory/scripts/tokens.ts` (new) — `blueprint tokens <slug>`:
  - Reads the donor `extraction/tokens.json` and curates it into `app/tokens.json`: a semantic palette
    (`pickPalette` classifies frequency-sorted donor colors into background/foreground/primary/accent/
    muted by luminance + saturation), heading/body font choices, type scale, spacing, radii.
  - Font matcher (`matchFont`): keeps already-open fonts, substitutes licensed donor fonts (SF Pro,
    Helvetica, Canela, Freight, Circular…) for the closest open Google-Fonts equivalent, and
    heuristically substitutes unmapped fonts (serif→Lora, sans→Inter) with a "verify" flag. Decisions
    are appended to the site's `asset-log.md`.
  - Also writes `app/tokens.donor.json` (immutable donor baseline) so brand translation can diff
    donor vs brand later.
- `factory/qa/font-substitutes.md` (new) — the curated licensed→open font map (the substitution
  rationale), referenced from the asset log.
- Template wiring (`factory/templates/next-site/`): ships a default `tokens.json`; `layout.tsx` injects
  the tokens as `:root` CSS custom properties; `globals.css` reads `var(--color-*)` / `var(--font-*)`
  with fallbacks. Every new site reads from tokens on day one.
- `art-direction.template.md` gained a "Token translation (donor → brand)" section documenting the
  `tokens.donor.json` → `tokens.json` diff workflow.
- Tests: `tokens.test.ts` (10 new — color parsing, luminance/saturation, palette classification, font
  matching, curation, CSS-var emission). `pnpm test` → 67 pass.

### How it was verified

- Unit: `pnpm test` → 67 pass (57 + 10 new).
- `blueprint tokens demo-clone` (real Apple donor from Phase 1): curated background `#f5f5f7`,
  primary `#0071e3` (Apple action blue), accent `#2997ff`; substituted SF Pro Display/Text → Inter;
  the font decisions were written to `demo-clone/asset-log.md`; `tokens.json` + `tokens.donor.json`
  written. (Acceptance part 3.)
- Fresh site from the template (`blueprint new phase3-demo`), served: screenshotted the default render,
  then changed only `app/tokens.json` (background `#111312`→`#f4efe6`, primary gold→`#d2361e` red),
  re-screenshotted — the whole site visibly restyled (dark→light surface, gold→red accent/eyebrow/
  hero line) with no code change. (Acceptance parts 1 + 2; before/after PNGs shown to the operator.)
  Scratch site deleted after.
- Regression: all prior gates/tests still pass.

### What's next

Phase 4 — Reference Library: create `factory/reference-library/` with ≥10 self-contained, copy-paste
motion/component/section patterns (each with code + README + reduced-motion behavior), seeded by
extracting proven work from `four-seasons`, `one-and-only-resorts`, `bigmart`, `alpine-bloom`; add the
"copy from the library before inventing; contribute passing patterns back" rule to `AGENTS.md`.

---

## Phase 4 — The Reference Library ✅

Date: 2026-07-06

### What shipped

`factory/reference-library/` — **12 self-contained, copy-paste patterns**, each extracted (not
reinvented) from real builds that passed the Beauty Pass. Every folder has: the code, a `README.md`
(donor lineage, when to use, how it works, reduced-motion behavior, usage), and a standalone
`demo.html` runnable by opening it in a browser (no build).

- `motion/`: `scroll-reveal` (alpine-bloom + four-seasons), `text-reveal` (one-and-only),
  `hero-settle` (bigmart — reduced-motion guard added, which bigmart lacked), `masthead-reveal`
  (one-and-only aperture-iris flagship), `parallax-media` (one-and-only), `lenis-smooth-scroll`
  (alpine-bloom).
- `components/`: `carousel` (four-seasons — CSS + vanilla JS + React `.tsx`), `media-gallery`
  (one-and-only — CSS + JS + `.tsx`), `accordion` (one-and-only footer, upgraded to real
  aria-expanded semantics), `marquee` (new to the library — honestly labeled, not extracted).
- `sections/`: `collage-rhythm` (alpine-bloom), `story-band` (bigmart).
- `factory/reference-library/README.md` (index + ethos) and `demo/index.html` (links every pattern demo).
- `AGENTS.md`: added the explicit Reference Library Rule — "check the library before writing any motion
  or interactive component from scratch; contribute passing patterns back; copy from, never import;
  keep reduced-motion handling."

Seeded by dispatching four parallel read-only extraction agents (one per donor site) that returned the
verbatim proven code, then three parallel authoring agents that wrote the 12 faithful pattern folders.

### How it was verified

- Structure: 12 folders each with README + code + demo; **every `*.css` contains a
  `@media (prefers-reduced-motion: reduce)` block** (checked programmatically).
- Runnable in isolation: served the library statically and confirmed HTTP 200 for `demo/index.html` and
  every pattern demo; screenshotted the index, `carousel`, `masthead-reveal`, and `collage-rhythm` demos
  — all render correctly (the vanilla-JS carousel builds its 3-slot stage/tabs/dots; the masthead intro
  plays on load; the collage shows the asymmetric feature tile + rotated seal). No build step needed.
- Extraction (not rewrite): patterns carry documented donor lineage and reuse the sites' real class
  logic (e.g. four-seasons' key-remount entrance, alpine-bloom's `[data-reveal]`/`--delay` reveal,
  one-and-only's `apertureLift` box-shadow iris).
- `pnpm test` → 67 pass (no script changes; regression clean). No new dependencies.

### What's next

Phase 5 — Multi-page coverage: make the clone plan's page inventory machine-readable with per-page
status (`planned | built | deferred`), add a `pagesReady` gate to `siteStatus`, and make
`blueprint screenshots` capture every built route (not just `/`).

---

## Phase 5 — Multi-page coverage enforcement ✅

Date: 2026-07-06

### What shipped

Clone plans stop being aspirational — the factory now refuses to pass to Beauty while donor-critical
pages are neither built nor explicitly deferred.

- `factory/scripts/pages.ts` (new) — machine-readable page inventory (`sites/<slug>/pages.json`:
  `{ pages: [{ route, title, status: planned|built|deferred, reason? }] }`) plus pure helpers:
  `routeToDir`, `summarizePageCoverage` (ready = every page built-or-deferred AND every built page has
  screenshots), `pageCoverageMessage`, and `buildPagePlan` (seeds a draft plan from the captured donor
  nav inventory).
- `blueprint.ts`: `SiteStatus` gains `pagesReady`; `nextActionForStatus` gains `NEEDS_PAGE_COVERAGE`,
  inserted after motion and **before** `RUN_BEAUTY`. Coverage is enforced only when `pages.json`
  exists (absent → single-page site, backward compatible — legacy sites are unaffected). `run` and
  `status` print the coverage detail; `printStatus` shows a `pages:` line.
- `blueprint screenshots <slug> <url>` now captures every **built** route from `pages.json` into
  `screenshots/pages/<route>/` (desktop + mobile), in addition to the homepage shots.
- `blueprint capture` seeds `pages.json` (all planned) from the harvested donor nav inventory, without
  clobbering an existing curated plan on re-capture. This makes the "missing donor-critical pages"
  Beauty Pass fail condition mechanically checkable.
- Tests: `pages.test.ts` (7 new) + a new `nextActionForStatus` case; existing `SiteStatus` fixtures
  updated with `pagesReady`. `pnpm test` → 74 pass.

### How it was verified

- Unit: `pnpm test` → 74 pass (67 + 7 new). `nextActionForStatus` returns `NEEDS_PAGE_COVERAGE` when
  `pagesReady` is false and everything else is ready.
- Live end-to-end on a throwaway fully-gated scratch site with a 5-page plan (1 built, 4 planned):
  `blueprint status` reported `STATUS: NEEDS_PAGE_COVERAGE` and
  `NEEDS_PAGE_COVERAGE: 4 pages planned but not built or deferred (/stay, /dine, /spa, /contact)` —
  exactly the acceptance wording — instead of passing to Beauty. Marking 2 built (with shots) + 2
  deferred flipped it to `RUN_BEAUTY`; deleting one built page's screenshot flipped it back with
  `1 built page missing screenshots (/stay)`. Scratch site deleted after.
- Backward compatibility: `bigmart` and `alpine-bloom` (no `pages.json`) still report `pages: covered`
  — no existing gate was tightened for legacy single-page sites.

### What's next

Phase 6 — Preview deploy + operator dashboard: `blueprint deploy <slug> --preview` (real Vercel
preview, never production, records URL in `deploy.md`) and `blueprint status` with no slug printing an
all-sites table + writing `factory/STATUS.md`. The first Vercel preview deploy needs explicit approval.

---

## Phase 6 — Preview deploy + operator dashboard ✅

Date: 2026-07-06

### What shipped

The non-technical owner can now see every site at a glance and share a real preview link.

- `factory/scripts/deploy.ts` (new) — `blueprint deploy <slug> --preview`: builds locally (gate), runs
  `vercel deploy` (default target is PREVIEW — the code never passes `--prod`), verifies the URL returns
  200, and records it in `deploy.md` (sets `Preview URL:` + a dated note, without touching the
  production line). `blueprint deploy <slug> --prod` is a hard block (production stays behind the human
  gate, always). Pure helpers `extractDeployUrl` / `recordPreviewUrl` are unit-tested.
- `factory/scripts/status.ts` (new) + `blueprint status` with no slug — the all-sites dashboard: one
  markdown table (next action, pages summary, compare desktop/mobile, last screenshot date, preview
  URL) printed to the console and written to `factory/STATUS.md`. Pure helpers `parseCompareScore` /
  `parsePreviewUrl` / `renderStatusTable` are unit-tested.
- `blueprint run` now ends with a plain-language, non-technical summary of what happened and what the
  next step is (matching `verify`/`compare`/`capture`/`tokens`/`deploy`).
- Tests: `status.test.ts` + `deploy.test.ts` (9 new). `pnpm test` → 83 pass.

### How it was verified

- Unit: `pnpm test` → 83 pass (74 + 9 new).
- Dashboard: `pnpm blueprint:status` (no slug) printed the 6-site table and wrote `factory/STATUS.md`
  (e.g. four-seasons compare 51.7%/46.2%, one-and-only-resorts READY_FOR_HUMAN_REVIEW).
- Live preview deploy (approved by the owner): `blueprint deploy example-site --preview` built locally,
  created a Vercel **preview** at `https://app-ixotuibod-jeremys-projects-379e354f.vercel.app`, verified
  HTTP 200, recorded it in `example-site/deploy.md`, and the dashboard then surfaced the URL. Production
  path confirmed hard-blocked (`--prod` exits with a "requires explicit human approval" error).

Note: the `--prod` guard means production is never automated. The ephemeral preview URL above is a
share link only; nothing is in production.

### What's next

Phase 7 — Production asset + copy pipeline: make the deploy gate block while a production build contains
`reference-only` assets; add the asset-replacement playbook and the donor→brand `copy-deck.md` workflow.

---

## Phase 7 — Production asset + copy pipeline ✅

Date: 2026-07-06

### What shipped

The translation pass (donor → brand) gets the same discipline as the clone pass, and the legal posture
becomes mechanical.

- `factory/scripts/assets.ts` (new):
  - Reference-only asset gate: `findReferenceOnlyAssets` flags any production asset staged under a
    `reference-only/` path or marked `reference-only` in `asset-log.md` and still present in
    `app/public/`. `blueprint deploy` runs `checkProductionAssets` first and **hard-blocks** while any
    remain (production always; preview too, unless `--allow-reference-only` downgrades preview to a
    warning). Reference-only assets can never reach production.
  - Copy deck: `parseCopyRows` + `buildCopyDeck` turn `extraction/copy.md` into a two-column
    `copy-deck.md` (donor copy → brand copy, with `<!-- TODO -->` placeholders), generated by
    `blueprint copydeck <slug>`.
- `factory/playbooks/asset-replacement.md` (new): the replacement priority (client-provided > licensed
  stock > AI-generated), a reproducible generated-media prompt template derived from `art-direction.md`,
  and how the gate detects reference-only assets.
- `blueprint.ts` / `package.json`: wired the asset gate into `deploy`, added the `copydeck` command +
  npm script.
- Tests: `assets.test.ts` (7 new). `pnpm test` → 90 pass.

### How it was verified

- Unit: `pnpm test` → 90 pass (83 + 7 new).
- Asset gate (acceptance): placed a donor image at `example-site/app/public/reference-only/donor-hero.png`
  and ran `blueprint deploy example-site --preview` → **BLOCKED** with
  `example-site still ships 1 reference-only asset(s) ... reference-only/donor-hero.png` (exit 1),
  pointing at the playbook. Removed the asset after.
- Copy deck (acceptance): `blueprint copydeck demo-clone` generated `sites/demo-clone/copy-deck.md` — a
  1,154-line two-column donor→brand worksheet from the Apple capture, ready for line-by-line translation.

### Mission status

Phases 1–7 are complete. Phase 8 is explicitly deferred (not built). Final step: update `README.md` and
the callbook with the new commands and write the whole-upgrade summary.
