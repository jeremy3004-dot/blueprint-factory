# Codex Clone-Job Prompt — Everest Tours (test run)

How to run: open Codex in the Blueprint Factory repo root and paste everything below the line as
your first message. If a session ends mid-job, start a new one and say: "Continue the Everest Tours
clone job. Read docs/plans/2026-07-07-codex-clone-job-prompt.md, read
sites/everest-tours/qa/run-log.md and qa/worker-notes.md, find the last completed step, and continue."

This is the reusable client-job prompt. For the next client, copy this file, change only the
**Job Card** section, and run it again.

---

You are the production worker for Blueprint Factory, the website-cloning factory in this repo. Your
job is to run ONE complete client clone job, start to finish, using the factory's own commands and
gates. A supervisor will review your work afterward, so keep an honest written trail — especially of
anything that was confusing, broken, or needed manual workarounds.

## Read first, in this order (do not start before finishing all of these)

1. `AGENTS.md` — the factory's operating rules. They override your instincts.
2. `README.md` — the command table and default flow.
3. `factory/playbooks/blueprint-factory-callbook.md`
4. `factory/DONOR-SHELF.md` — pre-captured donors and how to use them.
5. `factory/reference-library/README.md` — proven patterns you must copy from before inventing.
6. `factory/qa/beauty-pass-rubric.md`
7. The donor's evidence pack: `sites/donor-black-tomato/references/reference-first/topology.md`
   and `clone-plan.md`, and skim the screenshots in that directory.

## Job Card (the only section that changes per client)

- **Client:** Everest Tours — a Kathmandu-based company selling premium small-group treks and
  cultural tours to foreign travelers (US/UK/EU/Australia). This is a TEST client; the company is
  fictional, so invent believable, honest content for it.
- **Visual donor:** `donor-black-tomato` (blacktomato.com) — evidence pack already captured on the
  donor shelf. Do NOT re-capture; use the pack.
- **Brand rules:**
  - Tone: confident, warm, expert. "The people who know the mountain." No hype words, no
    exclamation marks, no "world-class/best-in-class" filler.
  - Keep the donor's editorial restraint and typography rhythm. Brand colors: deep Himalayan
    slate-blue as the primary dark, snow off-white surfaces, one marigold/saffron accent used
    sparingly (buttons, small highlights). Exact values: derive them during the tokens step and
    record them in `app/tokens.json`.
  - Currency USD. Audience reads English.
  - Must-nots: no donor images or donor copy in anything that ships (the deploy gate enforces
    this — do not fight it). No invented awards, press logos, or testimonials attributed to real
    people. Placeholder imagery must be openly-licensed or clearly AI-generated, and every image
    source must be logged in `asset-log.md`.
- **Scope for this job:** homepage plus at least 2 supporting pages built (suggested: a "Signature
  Treks" listing page and one trek detail page, e.g. Everest Base Camp). Plan the full page set in
  `pages.json`, mark the rest `deferred` with a one-line reason each.

## The flow (follow the factory's order exactly)

**Step 0 — Set up.** `pnpm blueprint:new everest-tours`. Copy the donor evidence into the new site:
copy `sites/donor-black-tomato/references/reference-first/` to
`sites/everest-tours/references/reference-first/` (the compare tool reads the donor evidence from
the client site's own references directory). Create `qa/worker-notes.md` (see Worker's Log below).

**Step 1 — Judge the clone plan.** Read the auto-drafted `topology.md` and `clone-plan.md` you just
copied. Verify them against the screenshots and fix anything the machine got wrong. Choose the
smallest correct implementation stack. Then fill in the blank `Decision:` line yourself with a real
judgment — the capture tool deliberately never auto-passes this. Write `brief.md` for Everest Tours.

**Step 2 — Art direction.** Write `art-direction.md`: name the primary donor (Black Tomato), the
exact moves you are borrowing (list them concretely — hero treatment, nav behavior, section rhythm,
card style, motion patterns), and propose ONE named signature moment for Everest Tours (something a
visitor would stop scrolling for). The signature moment gets final approval from Jeremy at the
Beauty gate — propose it, build it, but flag it clearly in your final report.

**Step 3 — Tokens.** `pnpm blueprint:tokens everest-tours`. Review the curated `app/tokens.json`,
then adjust it to the brand rules above (slate-blue / off-white / marigold). Licensed donor fonts
must be substituted with open alternatives — the tool does this; verify the substitution is logged
in `asset-log.md`.

**Step 4 — Clone build.** Rebuild the donor's structure faithfully: section order, layout rhythm,
spacing, typography hierarchy, responsive behavior, motion. Rules:
- **Copy from `factory/reference-library/` before writing any motion or interactive component from
  scratch.** Adapt the closest pattern; do not invent janky motion.
- The site is self-contained under `sites/everest-tours/app` — copy patterns in, never import
  factory code.
- During the clone stage you may use donor images locally, but ONLY under a `reference-only` path
  so the deploy gate can catch them later.
- Maintain `pages.json` statuses (`planned | built | deferred`) as you go.
- Every animation must respect `prefers-reduced-motion`.

**Step 5 — Measure the clone.** Start the local preview server, then:
- `pnpm blueprint:check everest-tours <url>` — must pass (typecheck, build, console, links, a11y).
- `pnpm blueprint:compare everest-tours <url>` — per-section score vs the donor.
- Work the "worst section first" list and iterate. **Target: ≥ 85% on desktop AND mobile** before
  moving on. Log every iteration's score in `qa/run-log.md` so the supervisor can see the curve.
  If you plateau below target after 5 focused iterations, stop tuning, write down exactly which
  sections won't close and your best hypothesis why, and continue — an honest 80% with notes beats
  a fudged 85%.

**Step 6 — Translate to the brand.** Only after the clone measures well:
- `pnpm blueprint:copydeck everest-tours`, then fill the brand column — rewrite ALL copy in the
  Everest Tours voice per the brand rules. No donor sentences may survive.
- Replace every donor image with licensed/AI placeholder imagery; log each source in
  `asset-log.md`; remove `reference-only` assets from anything that would ship.
- Apply the brand tokens (Step 3 values). The structure and rhythm stay; the skin becomes
  Everest Tours.

**Step 7 — Full verification.** `pnpm blueprint:verify everest-tours <url>` — the whole chain must
end green. Then `pnpm blueprint:run everest-tours` and confirm the status machine agrees with where
you think you are.

**Step 8 — Preview deploy.** `pnpm blueprint:deploy everest-tours --preview`. Never `--prod`; if
anything asks about production, stop. If the asset gate blocks the deploy, that means donor
material is still shipping — fix it, don't bypass it. Record the preview URL in `deploy.md`.

**Step 9 — Hand off.** Commit your work in clean, per-step commits as you go (one commit per step
minimum; message format: `everest-tours: <step> — <what changed>`). End with the final report
(below). Do NOT run the Beauty Pass yourself — that is a human gate.

## Worker's Log (required — this is how the factory improves)

Keep `sites/everest-tours/qa/worker-notes.md` updated as you work, not reconstructed at the end.
Log, with timestamps:
- every command that failed, surprised you, or needed a retry/workaround, with the error text;
- every place the docs/templates disagreed with reality;
- every judgment call you made that the docs didn't cover;
- anything you wanted from the reference library that wasn't there;
- time sinks — where did you spend disproportionate effort?

The supervisor reads this file to fix the factory. Blunt notes are more valuable than tidy ones.
An empty worker's log will be treated as a red flag, not a clean run.

## Hard rules

- Never deploy production. Never bypass a gate. Never let donor images/copy ship.
- No new paid services. No new dependencies unless genuinely required — if required, note why in
  the worker's log.
- Do not modify `factory/` scripts or the factory's tests. If a tool is broken, log it, work
  around it manually, and say so in the final report — fixing the machine is the supervisor's job.
- If the same step fails 3 times, stop that step, log it, and move to what you can do.
- All commits stay on a branch: `job/everest-tours`. Do not merge to main.

## Definition of done

1. `blueprint verify` green end-to-end against the local or preview URL.
2. Compare ≥ 85% desktop and mobile at the clone stage (or an honest documented plateau).
3. All shipped copy is Everest Tours voice; all shipped images licensed/AI and logged.
4. Preview URL live and recorded in `deploy.md`.
5. `pages.json` complete: built pages built, deferred pages reasoned.
6. `qa/worker-notes.md` and `qa/run-log.md` tell the true story of the run.
7. Final report written to `sites/everest-tours/qa/final-report.md`:
   - plain-language summary for a non-technical owner (5 sentences max),
   - the numbers: compare scores desktop/mobile (first and final), check results, preview URL,
   - the proposed signature moment and where to see it,
   - top 5 things that made this job harder than it should have been,
   - what you would change about the factory before the next job.
