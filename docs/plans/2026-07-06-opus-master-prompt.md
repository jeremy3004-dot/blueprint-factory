# Opus Execution Prompt — Blueprint Factory Upgrade

How to run: open Claude Code in the Blueprint Factory repo, switch the model to Opus, and paste
everything below the line as your first message. When a session ends mid-mission, start a new one and
say: "Continue the Blueprint Factory upgrade. Read docs/plans/2026-07-06-blueprint-factory-master-plan.md
and the run log in docs/plans/, find the last completed phase, and continue with the next one."

---

You are upgrading Blueprint Factory, the website-cloning factory in this repo. A full review and
roadmap has already been written. Your job is to execute it, phase by phase, without breaking the
existing process layer. Work autonomously; only stop for the checkpoints listed under Working Rules.

## Read first, in this order

1. `AGENTS.md` — the factory's operating rules. Follow them even though you are Claude, not Codex.
2. `docs/plans/2026-07-06-blueprint-factory-master-plan.md` — this is your specification. Part 4 is
   the phase plan, Part 7 is your guardrails, and the acceptance criteria under each phase are your
   definition of done.
3. `factory/playbooks/blueprint-factory-callbook.md`
4. `factory/qa/beauty-pass-rubric.md`
5. `factory/scripts/blueprint.ts` and `factory/scripts/capture.ts`

Do not start coding until you have read all five.

## Mission

Turn the factory's manual cloning steps into commands, in this order:

- **Phase 1 — Donor Capture Engine.** New `blueprint capture <slug> <donor-url>` that produces the
  complete reference-first evidence pack automatically: multi-viewport full-page screenshots (with
  auto-scroll so lazy-loaded content renders, and cookie-consent dismissal), per-section screenshots,
  a real scripted scroll-through video of the donor (plus reduced-motion variant), DOM snapshot, copy
  extraction, design-token extraction (colors, fonts, type scale, spacing), asset inventory, animation
  library detection, same-origin page inventory — and auto-drafted `topology.md` + `clone-plan.md`
  from the existing templates with mechanical fields pre-filled. Also fix the existing preview capture
  in `capture.ts` (auto-scroll before full-page shots, resilient navigation waits instead of bare
  networkidle, add 768px viewport, real scroll-through motion capture).
- **Phase 2 — Visual Compare + real verification.** New `blueprint compare <slug> <preview-url>`
  producing per-section pixel-diff scores, side-by-side composites, and a `qa/compare/report.md` with
  a "worst section first" fix list. Upgrade `blueprint check` to actually run typecheck, build,
  console-error scan, internal link check, and an axe-core accessibility quick pass. New
  `blueprint verify <slug> <preview-url>` chaining everything and ending with a plain-language report.
- **Phase 3 — Tokens + fonts.** `blueprint tokens <slug>` normalizes extracted tokens into
  `app/tokens.json` wired into the Tailwind theme (update the `next-site` template too), plus a
  donor-font → open-alternative substitution workflow recorded in `asset-log.md`.
- **Phase 4 — Reference Library.** Create `factory/reference-library/` with 10+ self-contained,
  copy-paste motion/component/section patterns, seeded by extracting the proven work already in
  `sites/four-seasons`, `sites/one-and-only-resorts`, `sites/bigmart`, and `sites/alpine-bloom`. Each
  pattern: code + README (when to use, donor lineage) + reduced-motion behavior. Update `AGENTS.md`
  with the "copy from the library before inventing; contribute passing patterns back" rule.
- **Phase 5 — Page coverage.** Make the clone plan's page inventory machine-readable with per-page
  status (`planned | built | deferred`), add a `pagesReady` gate to the status machine, and make
  `blueprint screenshots` capture every built route.
- **Phase 6 — Preview deploy + dashboard.** `blueprint deploy <slug> --preview` does a real Vercel
  preview deploy (never production), verifies the URL, and records it in `deploy.md`. `blueprint
  status` with no slug prints an all-sites table and writes `factory/STATUS.md`.
- **Phase 7 — Asset + copy pipeline.** Deploy gate blocks while production builds contain
  `reference-only` assets; add the asset-replacement playbook and the donor→brand `copy-deck.md`
  workflow.

Phase 8 items in the master plan are explicitly deferred — do not build them.

## Working rules

1. **One phase at a time, in order.** Land each phase fully — including its acceptance criteria from
   the master plan demonstrated and recorded — before starting the next. Small, focused commits with
   clear messages. After each phase, append a short entry to
   `docs/plans/2026-07-06-upgrade-run-log.md`: what shipped, how it was verified, what's next. That
   file is the handoff between sessions.
2. **Never weaken an existing gate.** Reference-first, signature moment, clone-plan concreteness,
   human beauty gate, ask-before-production: all stay. You add gates; you never remove them.
3. **Keep `blueprint.ts` the single CLI entrypoint**, but split new functionality into modules under
   `factory/scripts/` (e.g. `capture-donor.ts`, `compare.ts`, `tokens.ts`, `verify.ts`, `status.ts`).
   Pure logic gets unit tests next to the existing ones; `pnpm test` must pass after every phase.
4. **Test against reality.** For Phase 1, validate capture against at least two real external sites,
   one of them heavy with lazy-loading. For Phase 2, prove the diff works by deliberately breaking one
   section of an existing site, showing the report catches it, then reverting the break. Use
   `sites/example-site` as the sandbox for pipeline testing; do not rewrite the other sites' content.
5. **Sites stay self-contained.** The reference library is copied from, never imported. No shared
   runtime packages.
6. **Legal posture:** donor captures are reference evidence only; reference-only assets never ship to
   production; never clone logos, brand names, or protected copy into production output. Capture is a
   single low-volume pass of public pages — no scale crawling, no bypassing logins.
7. **Dependencies:** you may add focused devDependencies to the factory root (e.g. an image-diff
   library like pixelmatch/odiff, axe-core for Playwright). Justify each in the commit message. Do not
   add heavyweight frameworks. Never use paid cloud services; everything runs locally except the
   Vercel preview deploy in Phase 6, which requires explicit approval the first time.
8. **Plain-language output.** Every command you build ends by printing 3–6 sentences a non-technical
   owner can read: what happened, what's ready, what's not, what to do next.
9. **If a phase wanders** (you notice you're improvising away from the master plan), stop, write a
   short forensic note in `docs/plans/` explaining the divergence, and re-align before continuing.
10. **Stop and ask before:** production deploys, paid services, deleting anything, or changing the
    factory's process documents beyond what the master plan specifies. Everything else, proceed.
11. **Housekeeping** (one small commit, anytime): move `fourseasons-desktop-1440-full.png` from the
    repo root into `sites/four-seasons/references/`.

## Definition of done for the whole mission

From the repo root, this sequence works end to end with no manual file authoring:

```bash
pnpm blueprint:capture demo-clone https://<a-real-marketing-site>
# → evidence pack + drafted topology.md and clone-plan.md appear under sites/demo-clone/references/
pnpm blueprint:run demo-clone
# → gates advance; build follows the clone plan and copies patterns from the reference library
pnpm blueprint:compare demo-clone http://localhost:3000
# → qa/compare/report.md with per-section match scores
pnpm blueprint:verify demo-clone http://localhost:3000
# → typecheck, build, a11y, links, screenshots, motion, compare — plain-language summary
pnpm blueprint:status
# → all-sites table
```

…and every pre-existing test and gate still passes. When done, update `README.md` and the callbook
with the new commands, and summarize the whole upgrade in `docs/plans/` with dates, what shipped per
phase, and verification evidence.

Begin with Phase 1. Before writing code, post a short plan for Phase 1 only (files you'll create,
libraries you'll add, how you'll test), then execute it.
