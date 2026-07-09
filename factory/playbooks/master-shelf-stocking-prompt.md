# Master Shelf-Stocking Prompt (1 blank, paste into Codex/Cursor)

> **Prompt vs skill:** This playbook is the **production worker runbook** for Codex/Cursor shelf jobs —
> keep it as the primary handoff. The `blueprint-search-nepal` skill is for **prospect scouting only**
> (finding weak-website Nepal businesses); it does **not** capture donors. Donor capture uses the
> existing factory command `pnpm blueprint:capture`.

This is the reusable prompt for **restocking the visual donor shelf**. **How to use it:**

1. Copy everything below the line into a new Codex/Cursor session opened at the Blueprint Factory repo root.
2. Fill in the **Job Card** — either paste the structured JSON commission from the Operator Console
   **Restock** tab (sectors + counts), or use the legacy one blank: paste website URL(s) you found,
   name a business kind (e.g. "restaurants", "paragliding companies"), or write **your choice** and
   the worker fills the emptiest shelf sectors.
   (There is one optional line — use it only if you want to steer the run.)
3. Send it. The worker auditions candidates, captures only world-class donors, verifies evidence packs,
   and updates the shelf index — then **stops**. No client site is built in this job.

If a session dies mid-run, start a new one and say: *"Continue the shelf restock job. Read
factory/playbooks/master-shelf-stocking-prompt.md, then the active `shelf/*` branch and any
sites/donor-*/qa/worker-notes.md from this batch, find the last completed step, and continue."*

---

You are the production worker for Blueprint Factory, the website-cloning factory in this repo. Your
job is to run ONE complete **donor shelf restock** job: find or accept world-class visual donors,
**beauty-audition them before capture**, capture verified evidence packs, and register them on the
donor shelf. The owner gives you only the Job Card blank below — YOU derive which URLs to try, which
sectors are empty, topology judgment, stack decisions, and Nepal client fit from evidence. A
supervisor reviews your work before donors go live on the shelf, so keep an honest written trail.

**This job stops before any client site work.** Do not adopt, translate, build a client app, or deploy
a client preview. Shelf stock only.

## Read first, in this order (do not start before finishing all of these)

1. `AGENTS.md` — the factory's operating rules. They override your instincts.
2. `README.md` — the command table and default flow.
3. `factory/playbooks/blueprint-factory-callbook.md`
4. `factory/DONOR-SHELF.md` — existing shelf donors and how they are used.
5. `docs/donor-shelf.md` — canonical shelf index table you will update (including **Skipped requested
   slots** at the bottom).
6. `factory/playbooks/reference-first-build.md` — reference-first capture discipline.
7. `factory/qa/beauty-pass-rubric.md` — what "world-class" means; use its dimensions for the beauty
   audition even though you are judging the live donor, not a build.
8. At least two existing `sites/donor-*/art-direction.md` or `brief.md` files — calibrate what a
   stocked donor should teach.

## Job Card (fill in the commission; the rest is derived)

The Operator Console **Restock** tab sends a **structured multi-field commission**. Paste that JSON
into the Job Card, or use the legacy one-blank format if you are not coming from the console.

### Structured commission (from Operator Console — preferred)

```json
{
  "targets": [
    { "field": "Trekking / luxury adventure", "count": 2 },
    { "field": "Boutique hotels / ultra-luxury", "count": 1 }
  ],
  "notes": "prioritize sectors with no Nepal-fit donor yet",
  "totalCap": 3
}
```

- **`targets`** — array of `{ "field": "<sector label>", "count": <1–5> }`. Field names match
  `docs/donor-shelf.md` (e.g. `Restaurants / cafes`, `Tech / SaaS`). `Other` is a free-text field
  from the console.
- **`notes`** — optional owner steering (batch name, skip login-walled sites, etc.).
- **`totalCap`** — optional upper bound on total donors captured this run (console validates it is ≥
  sum of counts).

**Worker summary line (also in inbox call phrase):** *Find N donor(s) for each field. Use beauty
audition. Fill emptiest shelf slots.*

### Legacy one-blank format (manual / hosted console)

- **Restock request:** [PASTE URL(S) YOU FOUND — OR A BUSINESS KIND LIKE "restaurants" / "paragliding
  companies" — OR WRITE "your choice" AND THE WORKER FILLS THE EMPTIEST SHELF SECTORS]

Optional — delete this line if you have nothing to say:
- **Notes:** [e.g. "prioritize sectors with no Nepal-fit donor yet", "skip anything that needs login",
  "batch name: wellness-q3" — or delete this line]

### What you derive yourself (do not ask the owner for these)

- **Which donors to audition:** If the owner pasted URLs, audition those first. If they named a sector,
  research at least three candidates in that sector before picking. If they wrote **your choice**, read
  `docs/donor-shelf.md`, find sectors with zero or weak coverage, and propose donors that fill gaps.
- **Donor slug:** `donor-` + lowercase-hyphenated short name from the **actual site/brand** (e.g.
  `donor-black-tomato`). Check `docs/donor-shelf.md` and `sites/` — do not collide with an existing
  slug. **Never label a capture with the wrong brand name** (e.g. do not call a capture `donor-aesop`
  if the URL is Allbirds).
- **Primary and backup URL per slot:** For each sector slot you are trying to fill, pick a primary URL
  and one backup. **Never reuse the same backup URL for two different slots** in one batch.
- **Whether this donor belongs on the shelf:** It must be genuinely world-class in structure, motion,
  typography, and conversion craft for its sector. **Empty shelf space is better than a mediocre donor.**
- **What it teaches:** One concrete sentence on layout rhythm, hero treatment, nav, motion, or
  conversion patterns worth cloning.
- **Nepal client fit:** One concrete sentence on which Nepal businesses would borrow this donor.
- **Stack decision:** The smallest correct implementation stack to rebuild the donor faithfully —
  fill the `Decision:` line in `clone-plan.md` yourself after reviewing the capture.

## Beauty audition (BEFORE capture — mandatory)

For every candidate URL, **before** `pnpm blueprint:capture`:

1. Open the live site on **desktop and mobile** (real scroll, not just the hero).
2. Scroll the **whole homepage** and skim at least one **inner page** (listing, detail, or about).
3. In one sentence, name the **one stop-scrolling moment** — the signature interaction or section that
   makes this site worth cloning. If you cannot name it, **REJECT** the candidate and try the backup
   (or research another). Log the rejection in worker notes.
4. Check against beauty-pass ingredients (from `factory/qa/beauty-pass-rubric.md`):
   - Typography: intentional hierarchy, not default system stack laziness.
   - Section variety: not the same card pattern repeated down the page.
   - Motion: scroll reveals, video, or interaction that serves the concept (when relevant).
   - Inner pages: do they feel as crafted as the homepage?
   - Mobile: not a crushed desktop layout — real responsive moves.
5. Only candidates that pass the audition proceed to capture.

## The flow (follow the factory's order exactly)

**Step 0 — Set up.**
- Read `docs/donor-shelf.md` and plan which slot(s) this job fills.
- Work on branch `shelf/[batch-name]` (use a short batch name from notes or sector, e.g.
  `shelf/restaurants-jul-2026`) or `shelf/[donor-slug]` for a single-donor run.
- For each accepted donor, choose the slug and scaffold if needed:
  `pnpm blueprint:new [donor-slug]` (or confirm `sites/[donor-slug]/` exists and is empty enough to
  capture into).
- Create `sites/[donor-slug]/qa/worker-notes.md` (see Worker's Log).

**Step 1 — Capture the donor.**
- `pnpm blueprint:capture [donor-slug] [donor-url]`
- This must produce under `sites/[donor-slug]/references/reference-first/`:
  - at least one `*-desktop.png` and `*-mobile.png`
  - `topology.md` and `clone-plan.md`
  - section shots and motion capture when scroll/animation matters

**Step 2 — Health check (before shelf registration).** Open captures and compare to the live site.
The evidence pack must pass ALL of these; otherwise **do not register** — log an honest skip:

| Check | Pass criteria |
| --- | --- |
| Screenshots | Real full-page desktop + mobile, not blank or tiny |
| Section shots | Per-section crops present when the homepage has distinct bands |
| Motion | Working scroll-through video when the site has scroll animation |
| Fonts | Font list found in extraction / tokens |
| Page list | Non-empty page inventory in `clone-plan.md` |
| Labels | Slug and `topology.md` donor URL match the site you actually captured |

Fix anything the machine got wrong: section order, hero structure, nav behavior, motion model,
responsive breakpoints, and page/route list. Fill in the blank `Decision:` line in `clone-plan.md`
with the smallest correct stack.

**Step 3 — Write shelf metadata.** Draft a one-paragraph `brief.md` for the donor slug that states:
sector, donor URL, what it teaches, Nepal client fit, and why it earned a shelf slot. This is
reference documentation — not a client brief.

**Step 4 — Register on the shelf.**
- Add a row to `docs/donor-shelf.md` with: donor slug, field, URL, capture date (today), what it
  teaches, Nepal client fit.
- If `factory/DONOR-SHELF.md` needs a pointer update, make the minimal edit.
- Confirm `pnpm blueprint:status [donor-slug]` shows reference-first evidence as ready.

**Step 5 — Skipped slots.** For any requested sector/URL that failed audition or health check, add a
row to the **Skipped requested slots** table at the bottom of `docs/donor-shelf.md`:

| Requested slot | Field | Primary URL | Backup URL | Reason |

Be specific and honest (e.g. "no signature moment — generic three-card SaaS layout", "capture
blocked — no section shots", "wrong brand — URL is X not Y").

**Step 6 — Hand off.** Commit in clean per-step commits on `shelf/*`; push the branch. End with the
final report (below). Do NOT build a client site. Do NOT run Beauty Pass on a client. Do NOT merge to
main — the owner says **"check and merge the shelf branch"** when ready.

## Worker's Log (required)

Keep `sites/[donor-slug]/qa/worker-notes.md` updated as you work. Log: beauty audition results
(pass/reject + why), capture failures, topology corrections, judgment calls, duplicate-shelf concerns,
wrong-label near-misses, and time sinks. Blunt notes beat tidy ones.

## Hard rules

- **Shelf only.** No client adopt, no brand-source capture, no translation, no client preview deploy.
- **Beauty audition before capture.** No exceptions.
- **Reject mediocre donors.** Empty shelf space is better than weak stock.
- Never deploy production. Never bypass a gate.
- Do not modify `factory/` scripts or the factory's tests. If a tool is broken, log it, work around
  it manually, and report it.
- Donor assets, copy, DOM, screenshots, and video are **reference-only** — they must not ship in
  client production builds.
- **Correct naming:** slug and docs must match the actual brand at the captured URL.
- **Unique backups:** never assign the same backup URL to two slots in one batch.
- If capture fails 3 times on the same URL, stop, log it, add a skipped-slot row, and move on.
- All commits stay on `shelf/*`. Do not merge to main without supervisor review.

## Definition of done

1. Every **registered** donor has `sites/[donor-slug]/references/reference-first/` with verified
   desktop + mobile screenshots, `topology.md`, and `clone-plan.md` with a filled stack `Decision:` line.
2. `docs/donor-shelf.md` has new row(s) for accepted donors and skipped-slot row(s) for rejects.
3. Each accepted donor has `brief.md` documenting sector, teaches, and Nepal fit.
4. `qa/worker-notes.md` tells the true story of the run (including auditions that failed).
5. Branch `shelf/*` pushed to origin.
6. Final report written to `sites/[donor-slug]/qa/shelf-report.md` (or one batch report at
   `factory/inbox/shelf-batch-report.md` for multi-donor runs):
   - plain-language summary for a non-technical owner (3 sentences max),
   - donor slug(s) and URL(s) accepted,
   - skipped slot(s) and reasons,
   - what each accepted donor teaches and Nepal client fit (one line each),
   - pages/routes captured and any deferred routes,
   - top 3 things that made this run harder than it should have been.
7. Supervisor can review the branch before donors go live on the shelf.
