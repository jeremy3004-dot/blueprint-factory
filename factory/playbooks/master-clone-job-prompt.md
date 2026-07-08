# Master Clone-Job Prompt (fill in the Job Card, paste into Codex)

This is the reusable prompt for every new client website. **How to use it, in 3 steps:**

1. Copy everything below the line into a new Codex session opened at the Blueprint Factory repo root.
2. Fill in the **Job Card** section — it is the ONLY part you edit. Every `[BLANK]` must be filled or
   deleted. Everything else stays as-is.
3. Send it. Codex runs the whole job and stops at the Beauty Pass, which is yours.

If a session dies mid-job, start a new one and say: *"Continue the [client] clone job. Read
factory/playbooks/master-clone-job-prompt.md, then sites/[client-slug]/qa/run-log.md and
qa/worker-notes.md, find the last completed step, and continue."*

---

You are the production worker for Blueprint Factory, the website-cloning factory in this repo. Your
job is to run ONE complete client clone job, start to finish, using the factory's own commands and
gates. A supervisor reviews your work afterward, so keep an honest written trail — especially of
anything confusing, broken, or manually worked around.

## Read first, in this order (do not start before finishing all of these)

1. `AGENTS.md` — the factory's operating rules. They override your instincts.
2. `README.md` — the command table and default flow.
3. `factory/playbooks/blueprint-factory-callbook.md`
4. `factory/DONOR-SHELF.md` — pre-captured donors and how to use them.
5. `factory/reference-library/README.md` — proven patterns you must copy from before inventing.
6. `factory/qa/beauty-pass-rubric.md`
7. The donor's evidence pack (after Step 0 puts it in the client site): `topology.md`,
   `clone-plan.md`, and skim the screenshots.

## Job Card (the ONLY section that changes per client)

- **Client:** [CLIENT NAME] (site slug: `[client-slug]` — lowercase, hyphens)
- **What they do:** [ONE OR TWO SENTENCES: what they sell, to whom, and where. e.g. "A Pokhara
  boutique hotel selling rooms and lakeside dining to foreign tourists."]
- **Real or test client:** [REAL — use only the facts/materials provided below, invent nothing
  factual | TEST — fictional company, invent believable honest content]
- **Visual donor:** [PICK ONE]
  - Shelf donor: `donor-[NAME]` from `factory/DONOR-SHELF.md` — do NOT re-capture.
  - New donor: `[URL]` — not on the shelf; capture it fresh in Step 0.
- **Brand rules:**
  - Tone: [e.g. "warm, expert, unhurried; no hype words, no exclamation marks"]
  - Colors: [e.g. "deep forest green primary, cream surfaces, one terracotta accent used
    sparingly" — exact values get derived in the tokens step and recorded in app/tokens.json]
  - Language & currency: [e.g. "English, USD"]
  - Must-nots: [e.g. "no stock-photo clichés of praying hands; no invented awards or testimonials
    attributed to real people"] — plus the standing rules: no donor images or donor copy in
    anything that ships (the deploy gate enforces this — do not fight it); placeholder imagery must
    be openly-licensed or clearly AI-generated and every image source logged in `asset-log.md`.
- **Client-provided materials:** [PATH to logo/photos/text if any, e.g. "sites/[client-slug]/assets/
  from-client/" | "none — use placeholders"]
- **Scope for this job:** [e.g. "homepage + 2 supporting pages (a listing page and one detail
  page)"]. Plan the FULL page set in `pages.json`; mark everything out of scope `deferred` with a
  one-line reason each.
- **Anything else the owner said:** [SPECIAL REQUESTS, or delete this line]

## The flow (follow the factory's order exactly)

**Step 0 — Set up.**
- Shelf donor: `pnpm blueprint:adopt [client-slug] donor-[NAME]` — one command scaffolds the site,
  copies the donor evidence pack in, re-drafts the docs for this client, and seeds `pages.json`.
- New donor URL: `pnpm blueprint:new [client-slug]` then
  `pnpm blueprint:capture [client-slug] [URL]` (single low-volume pass of public pages only).
- Either way: create `sites/[client-slug]/qa/worker-notes.md` (see Worker's Log below) and work on
  branch `job/[client-slug]`.

**Step 1 — Judge the clone plan.** Read the drafted `topology.md` and `clone-plan.md`. Verify them
against the donor screenshots and fix anything the machine got wrong. Choose the smallest correct
implementation stack and fill in the blank `Decision:` line yourself — the tools deliberately never
auto-pass this. Write `brief.md`. Curate `pages.json` to match the Job Card scope.

**Step 2 — Art direction.** Write `art-direction.md`: name the donor, list the exact moves you are
borrowing (hero treatment, nav behavior, section rhythm, card style, motion patterns — concretely),
and propose ONE named signature moment (something a visitor stops scrolling for). The signature
moment gets final approval from the owner at the Beauty gate — propose it, build it, flag it in the
final report.

**Step 3 — Tokens.** `pnpm blueprint:tokens [client-slug]`. Review `app/tokens.json`, adjust to the
Job Card's brand colors. Licensed donor fonts must be substituted with open alternatives — the tool
does this; verify the substitution is logged in `asset-log.md`.

**Step 4 — Clone build.** Rebuild the donor's structure faithfully: section order, layout rhythm,
spacing, typography hierarchy, responsive behavior, motion. Rules:
- **Copy from `factory/reference-library/` before writing any motion or interactive component from
  scratch.** Adapt the closest pattern; never invent janky motion.
- The site is self-contained under `sites/[client-slug]/app` — copy patterns in, never import
  factory code.
- During the clone stage you may use donor images locally, but ONLY under a `reference-only` path
  so the deploy gate can catch them later.
- Maintain `pages.json` statuses (`planned | built | deferred`) as you go.
- Every animation must respect `prefers-reduced-motion`.

**Step 5 — Measure the clone (pixel stage).** Start the local preview server, then:
- `pnpm blueprint:check [client-slug] <url>` — must pass (typecheck, build, console, links, a11y).
- `pnpm blueprint:compare [client-slug] <url> --stage clone` — per-section pixel score vs donor.
- Work the "worst section first" list and iterate. **Target: ≥ 85% pixel on desktop AND mobile**
  before moving on. Log every iteration's score in `qa/run-log.md`. If you plateau below target
  after 5 focused iterations, stop tuning, write down exactly which sections won't close and your
  best hypothesis why, and continue — an honest 80% with notes beats a fudged 85%.

**Step 6 — Translate to the brand.** Only after the clone measures well:
- `pnpm blueprint:copydeck [client-slug]` (it scopes to planned/built pages by default), then fill
  the brand column — rewrite ALL copy in the client's voice per the Job Card. No donor sentences
  may survive. For a REAL client, use only provided facts; never invent prices, credentials, or
  claims.
- Replace every donor image with client-provided/licensed/AI imagery; log each source in
  `asset-log.md`; remove `reference-only` assets from anything that would ship.
- Apply the brand tokens. The structure and rhythm stay; the skin becomes the client's.

**Step 6b — Measure the translation (structure stage).**
`pnpm blueprint:compare [client-slug] <url> --stage translation` — the headline number is now the
STRUCTURE score. **Target: ≥ 85% structure.** Pixel % is expected to drop after translation
(roughly 40–60%); that is correct behavior, not a failure — do not chase pixel at this stage.

**Step 7 — Full verification.** `pnpm blueprint:verify [client-slug] <url>` — the whole chain must
end green. Then `pnpm blueprint:run [client-slug]` and confirm the status machine agrees with where
you think you are.

**Step 8 — Preview deploy.** `pnpm blueprint:deploy [client-slug] --preview`. Never `--prod`; if
anything asks about production, stop. If the asset gate blocks the deploy, donor material is still
shipping — fix it, don't bypass it. The tool records the preview URL and whether the link is
publicly **shareable** or **protected** in `deploy.md`; if it reports protected, do not try to
bypass it — state clearly in the final report that the owner must disable Vercel Deployment
Protection (Vercel dashboard → project → Settings → Deployment Protection).

**Step 9 — Hand off.** Commit in clean per-step commits as you go (one per step minimum; format:
`[client-slug]: <step> — <what changed>`), all on branch `job/[client-slug]`; push the branch. End
with the final report (below). Do NOT run the Beauty Pass yourself — that is a human gate. Do NOT
merge to main.

## Worker's Log (required — this is how the factory improves)

Keep `sites/[client-slug]/qa/worker-notes.md` updated as you work, not reconstructed at the end.
Log, with timestamps:
- every command that failed, surprised you, or needed a retry/workaround, with the error text;
- every place the docs/templates disagreed with reality;
- every judgment call you made that the docs didn't cover;
- anything you wanted from the reference library that wasn't there;
- time sinks — where did you spend disproportionate effort?

The supervisor reads this file to fix the factory. Blunt notes beat tidy ones. An empty worker's
log is treated as a red flag, not a clean run.

## Hard rules

- Never deploy production. Never bypass a gate. Never let donor images/copy ship.
- Real clients: never invent facts, prices, credentials, awards, or testimonials.
- No new paid services. No new dependencies unless genuinely required — if required, say why in
  the worker's log.
- Do not modify `factory/` scripts or the factory's tests. If a tool is broken, log it, work
  around it manually, and report it — fixing the machine is the supervisor's job.
- If the same step fails 3 times, stop that step, log it, and move to what you can do.
- All commits stay on `job/[client-slug]`. Do not merge to main.

## Definition of done

1. `blueprint verify` green end-to-end against the local or preview URL.
2. Clone stage: ≥ 85% pixel desktop and mobile (or an honest documented plateau).
3. Translation stage: ≥ 85% structure score.
4. All shipped copy is the client's voice; all shipped images cleared and logged.
5. Preview URL live and recorded in `deploy.md`, with its shareable/protected status stated.
6. `pages.json` complete: built pages built, deferred pages reasoned.
7. `qa/worker-notes.md` and `qa/run-log.md` tell the true story of the run.
8. Branch `job/[client-slug]` pushed to origin.
9. Final report written to `sites/[client-slug]/qa/final-report.md`:
   - plain-language summary for a non-technical owner (5 sentences max),
   - the numbers: clone pixel scores (first and final), translation structure score, check
     results, preview URL + shareability,
   - the proposed signature moment and where to see it,
   - top 5 things that made this job harder than it should have been,
   - what you would change about the factory before the next job.
