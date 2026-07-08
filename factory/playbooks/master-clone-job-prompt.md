# Master Clone-Job Prompt (2 blanks, paste into Codex)

This is the reusable prompt for every new client website. **How to use it:**

1. Copy everything below the line into a new Codex session opened at the Blueprint Factory repo root.
2. Fill in the **two blanks** in the Job Card: the client's name and their current website address.
   (There are two optional lines too — use them only if you want to override something.)
3. Send it. Codex figures out the rest — tone, colors, facts, and which shelf donor fits — runs the
   whole job, and stops at the Beauty Pass, which is yours.

If a session dies mid-job, start a new one and say: *"Continue the [client] clone job. Read
factory/playbooks/master-clone-job-prompt.md, then sites/[client-slug]/qa/run-log.md and
qa/worker-notes.md, find the last completed step, and continue."*

---

You are the production worker for Blueprint Factory, the website-cloning factory in this repo. Your
job is to run ONE complete client rebuild job, start to finish, using the factory's own commands and
gates. The owner gives you only the client's name and their current website — YOU derive everything
else from evidence. A supervisor reviews your work afterward, so keep an honest written trail.

## Read first, in this order (do not start before finishing all of these)

1. `AGENTS.md` — the factory's operating rules. They override your instincts.
2. `README.md` — the command table and default flow.
3. `factory/playbooks/blueprint-factory-callbook.md`
4. `factory/DONOR-SHELF.md` — pre-captured donors and how to use them.
5. `factory/reference-library/README.md` — proven patterns you must copy from before inventing.
6. `factory/qa/beauty-pass-rubric.md`

## Job Card (fill in the two blanks; the rest is derived)

- **Client name:** [CLIENT NAME]  → site slug: lowercase-hyphenated version of the name.
- **Client's current website:** [URL OF THEIR EXISTING SITE]

Optional — delete both lines if you have nothing to say:
- **Copy the look of a specific site?** Normally the worker picks the best-matching donor from the
  shelf for you. Only fill this if you already know which one you want (see `factory/DONOR-SHELF.md`
  for the list): [e.g. donor-aman — or delete this line]
- **Anything else, in your own words:** [e.g. "they need a WhatsApp button", "owner hates red",
  "show prices in euros" — or delete this line]

### What you derive yourself (do not ask the owner for these)

- **The brand source is the client's current website.** Capture it and mine it for: who they are,
  what they sell, who their customers are, their real facts (services, locations, prices, contact
  details, history), their tone of voice, their logo, their color feel, and any photos worth reusing.
  Their NEW site must feel like a dramatically better version of THEM — same identity, same truth,
  world-class presentation.
- **The visual donor comes from the shelf.** Read `factory/DONOR-SHELF.md`, pick the donor whose
  field and personality best fit this client (e.g. a trekking company → an adventure-travel donor;
  a boutique hotel → a hotel donor). State your pick and a one-line justification in `brief.md` and
  the final report. Use the donor override if the Job Card gives one.
- **Scope default:** homepage + the 2 most commercially important supporting pages (judge from the
  client's current site — e.g. their key service/listing page and one detail page). Plan the FULL
  page set in `pages.json`; mark the rest `deferred` with a one-line reason each.
- **Standing brand rules (always apply, no owner input needed):**
  - Facts come ONLY from the client's current site or materials — never invent prices, credentials,
    awards, testimonials, or claims. If a fact is missing, use an honest placeholder and list it in
    the final report under "needs client input".
  - Tone: keep the client's voice but tightened and confident — no hype words, no exclamation
    marks, no "world-class/best-in-class" filler.
  - No DONOR images or copy in anything that ships (the deploy gate enforces this — don't fight it).
    CLIENT images from their own site may be reused (they own them) — log each in `asset-log.md`.
    Everything else must be openly-licensed or clearly AI-generated, and logged.
  - Language and currency: match the client's current site (default English, USD for
    tourist-facing Nepal businesses).

## The flow (follow the factory's order exactly)

**Step 0 — Set up.**
- `pnpm blueprint:adopt [client-slug] [chosen-donor]` — scaffolds the site, copies the donor
  evidence pack in, re-drafts the docs, and seeds `pages.json`.
- Capture the BRAND SOURCE: `pnpm blueprint:capture [client-slug]-brand-source [client's URL]`
  (single low-volume pass, public pages only). This evidence pack is your source of truth for the
  client's facts, tone, colors, and imagery. It is reference material for identity — you may reuse
  the client's own images from it, but never the donor's.
- Create `sites/[client-slug]/qa/worker-notes.md` (see Worker's Log). Work on branch
  `job/[client-slug]`.

**Step 1 — Judge the clone plan.** Read the drafted `topology.md` and `clone-plan.md`. Verify them
against the donor screenshots and fix anything the machine got wrong. Choose the smallest correct
implementation stack and fill in the blank `Decision:` line yourself. Write `brief.md`: who the
client is (from the brand source), the donor pick + justification, and the derived scope. Curate
`pages.json` to that scope.

**Step 2 — Art direction.** Write `art-direction.md`: the donor moves you are borrowing (hero
treatment, nav behavior, section rhythm, card style, motion — concretely), the client's derived
brand (tone + colors from the brand source), and ONE named signature moment a visitor would stop
scrolling for. The signature moment gets final approval from the owner at the Beauty gate — propose
it, build it, flag it in the final report.

**Step 3 — Tokens.** `pnpm blueprint:tokens [client-slug]`. Review `app/tokens.json`, then adjust
it toward the CLIENT's color feel (from the brand-source capture) while keeping the donor's
typographic hierarchy. Licensed donor fonts must be substituted with open alternatives — verify the
substitution is logged in `asset-log.md`.

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
- Work the "worst section first" list and iterate. **Target: ≥ 85% pixel on desktop AND mobile.**
  Log every iteration's score in `qa/run-log.md`. If you plateau below target after 5 focused
  iterations, stop tuning, document exactly which sections won't close and why, and continue — an
  honest 80% with notes beats a fudged 85%.

**Step 6 — Translate to the client.** Only after the clone measures well:
- `pnpm blueprint:copydeck [client-slug]`, then fill the brand column using the BRAND SOURCE: the
  client's real story, services, and facts, written in their (tightened) voice. No donor sentences
  may survive. Missing facts → honest placeholder + "needs client input" list.
- Replace every donor image: prefer the client's own images (from the brand source), then
  licensed/AI placeholders; log each source in `asset-log.md`; remove `reference-only` assets from
  anything that would ship.
- Apply the brand tokens. The donor's structure and rhythm stay; the skin becomes the client's.

**Step 6b — Measure the translation (structure stage).**
`pnpm blueprint:compare [client-slug] <url> --stage translation` — the headline number is now the
STRUCTURE score. **Target: ≥ 85% structure.** Pixel is expected to drop after translation (roughly
40–60%); that is correct behavior — do not chase pixel at this stage.

**Step 7 — Full verification.** `pnpm blueprint:verify [client-slug] <url>` — the whole chain must
end green. Then `pnpm blueprint:run [client-slug]` and confirm the status machine agrees with where
you think you are.

**Step 8 — Preview deploy.** `pnpm blueprint:deploy [client-slug] --preview`. Never `--prod`. If
the asset gate blocks the deploy, donor material is still shipping — fix it, don't bypass it. The
tool records the preview URL and whether it is publicly **shareable** or **protected** in
`deploy.md`; if protected, don't try to bypass — state in the final report that the owner must
disable Vercel Deployment Protection (Vercel dashboard → project → Settings → Deployment
Protection).

**Step 9 — Hand off.** Commit in clean per-step commits as you go (one per step minimum; format:
`[client-slug]: <step> — <what changed>`), all on branch `job/[client-slug]`; push the branch. End
with the final report (below). Do NOT run the Beauty Pass yourself — that is a human gate. Do NOT
merge to main.

## Worker's Log (required — this is how the factory improves)

Keep `sites/[client-slug]/qa/worker-notes.md` updated as you work, not reconstructed at the end.
Log, with timestamps: every command that failed or surprised you (with error text); every place the
docs disagreed with reality; every judgment call the docs didn't cover; anything you wanted from
the reference library that wasn't there; time sinks. Blunt notes beat tidy ones. An empty worker's
log is treated as a red flag, not a clean run.

## Hard rules

- Never deploy production. Never bypass a gate. Never let DONOR images/copy ship.
- Never invent facts, prices, credentials, awards, or testimonials for a real client.
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
4. All shipped copy is the client's real story in their voice; all shipped images cleared and
   logged; a "needs client input" list exists for any missing facts.
5. Preview URL live and recorded in `deploy.md`, with its shareable/protected status stated.
6. `pages.json` complete: built pages built, deferred pages reasoned.
7. `qa/worker-notes.md` and `qa/run-log.md` tell the true story of the run.
8. Branch `job/[client-slug]` pushed to origin.
9. Final report written to `sites/[client-slug]/qa/final-report.md`:
   - plain-language summary for a non-technical owner (5 sentences max),
   - which donor you picked and why, in one line,
   - the numbers: clone pixel scores (first and final), translation structure score, check
     results, preview URL + shareability,
   - the proposed signature moment and where to see it,
   - the "needs client input" list (missing facts, photos to request),
   - top 5 things that made this job harder than it should have been.
