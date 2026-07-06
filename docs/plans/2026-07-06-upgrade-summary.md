# Blueprint Factory Upgrade — Summary

Date: 2026-07-06
Author: Claude (Opus 4.8), executing the master plan `2026-07-06-blueprint-factory-master-plan.md`
Branch: `blueprint-factory-upgrade`
Spec: Part 4 (phase plan) + Part 7 (guardrails) of the master plan. Phase 8 explicitly deferred.

## The change in one line

The factory's manual cloning steps are now commands. It was a strong *process* with a thin *doing*
layer; it is now a machine — donor capture, objective visual comparison, real verification, a token
pipeline, a reference library, page-coverage enforcement, a preview-deploy + dashboard, and a
production asset/copy gate — all without weakening a single existing gate.

## What shipped, per phase

| Phase | Shipped | Key commands / files | Verified |
| ----- | ------- | -------------------- | -------- |
| 1 — Donor Capture Engine | Automated reference-first evidence pack + auto-drafted `topology.md`/`clone-plan.md`; fixed the naive preview capture (auto-scroll, resilient waits, 768 viewport, real scroll-through + reduced-motion) | `blueprint capture`; `capture-donor.ts`, `browser-utils.ts` | Live captures of `apple.com/ipad-pro` (lazy-heavy: 20 sections, 163 pages, no blank boxes, real SF Pro/palette) and `linear.app`; gate held (capture never auto-passes clone-plan concreteness) |
| 2 — Visual Compare + verification | Per-section pixel diff vs donor + composites + worst-first report; real `check` (typecheck→build→console→links→axe); `verify` chain | `blueprint compare` / `verify` / upgraded `check`; `compare.ts`, `checks.ts`, `verify.ts` | Per-section report on four-seasons; a controlled carousel break dropped exactly that band (18.5%→9.3%) with other bands identical, then reverted; `verify` green end-to-end on example-site |
| 3 — Tokens + fonts | Curate donor colors/fonts into `app/tokens.json` wired into the template theme; licensed→open font substitution logged in `asset-log.md` | `blueprint tokens`; `tokens.ts`, `font-substitutes.md` | `tokens demo-clone` curated Apple's `#f5f5f7`/`#0071e3` + SF Pro→Inter; a fresh templated site visibly restyled from a `tokens.json` edit alone |
| 4 — Reference Library | 12 self-contained, copy-paste patterns (code + README + reduced-motion + runnable demo), extracted from proven builds; "copy before inventing, contribute back" rule | `factory/reference-library/` (+ demos); `AGENTS.md` rule | Every pattern CSS has a reduced-motion block; demos render standalone (carousel/masthead/collage screenshotted) |
| 5 — Page coverage | Machine-readable `pages.json` (planned/built/deferred); `pagesReady` gate before Beauty; `screenshots` captures every built route | `blueprint screenshots`; `pages.ts`, `NEEDS_PAGE_COVERAGE` | Live: a 5-page plan (1 built) → `NEEDS_PAGE_COVERAGE: 4 pages planned…`; built+deferred → Beauty; missing a built shot → blocked; legacy sites unaffected |
| 6 — Preview deploy + dashboard | Real Vercel **preview** deploy (never production) recorded in `deploy.md`; all-sites table → `factory/STATUS.md`; plain-language `run` summary | `blueprint deploy --preview`, `blueprint status` (no slug); `deploy.ts`, `status.ts` | Dashboard printed 6-site table; approved live preview deploy of example-site verified 200 and recorded; `--prod` hard-blocked |
| 7 — Asset + copy pipeline | Deploy blocks while reference-only assets would ship; asset-replacement playbook; donor→brand `copy-deck.md` | `blueprint copydeck`, deploy asset gate; `assets.ts`, `asset-replacement.md` | A donor image in `public/reference-only/` BLOCKED `deploy --preview`; `copydeck demo-clone` produced a 1,154-line donor→brand worksheet |

## Guardrails honored

- **No existing gate weakened.** Reference-first, signature moment, clone-plan concreteness, the human
  Beauty gate, and ask-before-production all remain; new capability only *adds* gates (page coverage,
  a11y/build checks, reference-only asset gate). Capture drafts the clone plan but leaves the judgment
  `Decision:` line blank, so it never auto-passes.
- **Single CLI entrypoint.** `blueprint.ts` stays the entry; logic is split into modules
  (`capture-donor`, `compare`, `checks`, `verify`, `tokens`, `pages`, `status`, `deploy`, `assets`),
  each with unit tests. `pnpm test`: **16 → 90** passing, green after every phase.
- **Sites stay self-contained.** The reference library is copy-from, never import-from.
- **Legal posture is mechanical.** Reference-only assets and donor copy are gated out of production.
- **Dependencies:** only focused devDependencies added — `pixelmatch` + `pngjs` (image diff),
  `@axe-core/playwright` (a11y). Fixed a real template defect the new typecheck caught (missing
  `@types/react`/`@types/react-dom`/`@types/node`). No paid services except the approved Vercel preview.

## New commands (all end with a plain-language summary)

`capture · run · status · new · art · tokens · check · compare · verify · copydeck · screenshots ·
motion · beauty · deploy --preview`

See `README.md` and `factory/playbooks/blueprint-factory-callbook.md` for the full table.

## What's deferred (Phase 8, not built)

Intake from screenshots/video-only donors, scheduled report-only automations, an LLM-judge beauty
pre-pass, and additional capability packs. Per the master plan, these wait until Phases 1–7 are proven
on two real clones.

## Handoff

Per-phase detail, verification commands, and evidence live in
`docs/plans/2026-07-06-upgrade-run-log.md`. Work is on the `blueprint-factory-upgrade` branch, one
focused commit per phase, ready to merge to `main` once reviewed.
