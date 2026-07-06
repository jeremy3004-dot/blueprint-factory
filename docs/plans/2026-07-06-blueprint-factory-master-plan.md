# Blueprint Factory Master Plan

Date: 2026-07-06
Status: review + upgrade roadmap (no code written yet — this is the plan Codex executes)
Author: external factory review requested by Jeremy

---

## Part 1 — The Verdict

**Blueprint Factory is a real factory *process*. It is not yet a factory *machine*.**

The thinking layer — playbooks, gates, rubric, call phrases, the reference-first rule — is genuinely
strong. It encodes hard-won lessons (the Alpine Bloom forensic analysis proves the rules came from real
failure, not theory). Most people building "AI website factories" never get this part right.

The doing layer is thin. Today the only automated steps are: scaffold a folder, screenshot **your own**
preview, and record a 2-second scroll video. Everything that makes cloning hard — capturing the donor,
extracting its design DNA, and objectively comparing your build against it — is manual agent judgment.

The evidence is in the output: of five sites, **four are single-page homepage stubs** (3 source files
each). Only Alpine Bloom is a real multi-page product, and its own forensic notes admit the first pass
wandered because nothing forced fidelity. The clone plans *name* inner pages, flows, and states — but
nothing measures whether they got built, and nothing measures how close the clone actually is to the
donor.

**The one-sentence diagnosis:** the factory tells the agent *what a good clone requires*, but gives it
no tools to *capture the donor* or *measure the match*. Close those two gaps and this becomes close to
a one-shot cloning machine.

---

## Part 2 — What Is Genuinely Strong (Keep All Of This)

1. **Reference-first discipline.** "Pixel-perfect clone first, translation second" is exactly the right
   philosophy, and it's enforced as a hard gate (`NEEDS_REFERENCE_FIRST` blocks build work). This came
   from the Alpine Bloom failure and it shows.

2. **The gate state machine** (`factory/scripts/blueprint.ts`). Resumable, idempotent, always prints the
   next action. An agent can pick up any site cold and know what to do. This is the right backbone —
   everything below extends it rather than replaces it.

3. **The Beauty Pass rubric** (`factory/qa/beauty-pass-rubric.md`). This is the best document in the
   repo. It understands the core AI failure mode ("competent and completely generic, then failing to
   notice"), judges motion instead of stills, forces comparison against *named* references, and works in
   single-highest-impact-fix loops with stop conditions. Do not water this down.

4. **The signature moment requirement.** One named, concrete moment per site, checked mechanically, with
   anti-goals ("no gradient blob hero", "no three identical feature cards"). This is the anti-generic
   vaccine.

5. **The three-way separation: visual donor / capability pack / brand rules.** Clean conceptual model
   that makes calls like "clone Whoa Travel + Green Pastures Pack + women-only brand rules" composable.

6. **The callbook.** Plain-language call phrases are the right interface for a non-technical operator.
   The factory's "API" is English, and it's documented.

7. **Honest gates.** `NOT_READY` over a weak pass, mandatory human taste review before production,
   ask-before-deploy. Keep every one of these.

8. **Self-contained sites + graduation rules.** One broken site can't poison the others; serious sites
   move out.

---

## Part 3 — Where It Falls Short (Honest Gap List)

### Gap 1 — There is no cloning engine (the big one)
"Clone this website" is step one of the entire factory, and it is 100% manual. No command captures the
donor. The extraction files that do exist (`oneandonly-extraction.json`, body-text dumps) were made
ad-hoc by an agent, differently each time. For a factory, donor capture must be a repeatable command
that always produces the same evidence pack.

### Gap 2 — No objective visual comparison
The Beauty Pass says "compare the build against donor screenshots" — with eyeballs. There is no pixel
diff, no layout diff, no per-section similarity score. This is why clones stall at "close enough":
the same judgment that produced the gap approves it. One-shot cloning is impossible without a
measurable "how close am I?" number to iterate against.

### Gap 3 — `capture.ts` is too naive to survive real websites
- `waitUntil: "networkidle"` hangs or times out on sites with analytics/long-polling (most luxury sites).
- Full-page screenshots are taken **without scrolling first**, so lazy-loaded images (most of a modern
  site's content) render as empty boxes in donor captures.
- No cookie-consent handling — most donors will have a consent overlay covering the hero.
- Only 2 viewports (1440 / 390). No tablet, no large desktop.
- Motion capture is one wheel event + 2 seconds. That's not a scroll-through; it misses almost all
  scroll-triggered animation.

### Gap 4 — Only homepages get built, and nothing notices
Clone plans list full page inventories. The status machine only checks for two screenshot files. Four of
five sites shipped exactly one route. The factory needs per-route coverage that reads the clone plan's
page inventory and refuses to pass until each page is built or explicitly deferred.

### Gap 5 — `factory/reference-library/` does not exist
`AGENTS.md` and the design spec both tell agents to copy patterns from `factory/reference-library/` —
the directory is missing. Every site re-invents Lenis setup, scroll reveals, carousels, and hero motion
from scratch. This is the single biggest *beauty* lever: agents produce janky motion when they invent it
and good motion when they copy a proven pattern.

### Gap 6 — No design-token pipeline
Donor colors, type scale, and spacing rhythm live in prose inside `topology.md`. They should be
extracted mechanically into `tokens.json` and wired into each site's Tailwind theme. This also makes
brand translation systematic: swap the donor's token values for the client's, keep the structure.

### Gap 7 — `blueprint check` doesn't actually check anything
The design spec says `check` runs build and lint. Today it only verifies files exist. There is no
typecheck gate, no accessibility check, no Core Web Vitals budget, no console-error check, no broken
link check. "It builds" is currently proven only inside `run`.

### Gap 8 — Deploy is a stub
`blueprint deploy` prints a message. A non-technical operator needs one call that produces a shareable
preview URL (Vercel preview), records it in `deploy.md`, and still keeps production behind the human
gate.

### Gap 9 — No font strategy
Donor fonts are usually licensed (commercial serif families on luxury sites). There's no step that
identifies donor fonts and maps them to closest legally-usable alternatives (Google Fonts / open
licenses). Typography is scored 1–5 in the Beauty Pass but the pipeline gives the builder no help
getting it right.

### Gap 10 — No production asset pipeline
Asset logs correctly mark donor media "reference-only", but there is no standard step for producing
replacements (AI-generated, licensed stock, client-provided). Alpine Bloom solved this ad-hoc with
generated media; make it a playbook + command.

### Gap 11 — Operator experience gaps for a non-technical owner
- `blueprint status` requires a slug; there's no all-sites dashboard.
- Run logs are agent-facing; there's no plain-language "here's where every site stands" report.
- A 3.5MB donor screenshot is sitting at the repo root; prospect-research artifacts live in the factory
  repo. Minor, but a factory should keep its floor clean.

### Gap 12 — Legal/IP posture is good but should be formalized
"Clone the structure, not the protected identity" appears in three docs — good. It should also be a
mechanical gate: the asset log must show zero reference-only assets in the production build before
deploy is allowed.

---

## Part 4 — The Upgrade Blueprint

The strategy in one line: **build the Donor Capture Engine and the Visual Compare loop first — they turn
cloning from judgment into measurement — then invest in the beauty multipliers (reference library,
tokens, fonts), then the operator conveniences.**

Everything extends `blueprint.ts` and the existing gates. Nothing replaces the process layer.

### Phase 1 — Donor Capture Engine (`blueprint capture`)
**Goal:** `pnpm blueprint:capture <slug> <donor-url>` produces the complete reference-first evidence
pack automatically, in minutes, every time.

What it does:
1. Launch Playwright against the donor URL with sane navigation (`load` + settle delay, hard timeout —
   never `networkidle` alone).
2. Attempt cookie-consent dismissal (click common accept selectors; screenshot anyway on failure and
   note it).
3. **Auto-scroll to the bottom and back** (stepwise, waiting for lazy content) before any full-page
   screenshot.
4. Capture full-page screenshots at 4 viewports: 1920, 1440 (desktop-canonical), 768, 390
   (mobile-canonical), named `donor-<viewport>.png` (keeps the existing `*-desktop.png` /
   `*-mobile.png` gate names as copies/aliases).
5. Capture **per-section screenshots**: walk top-level sections of the DOM (section/main children),
   screenshot each, save as `sections/NN-<id>.png`. These become the units for visual diff later.
6. Record a **real scroll-through video** of the donor: scripted top-to-bottom scroll over ~20–30s with
   pauses, saved to `references/reference-first/donor-motion.webm`. Also record a
   `prefers-reduced-motion` variant.
7. Extract and save:
   - `extraction/dom.html` — post-JS DOM snapshot.
   - `extraction/copy.md` — headings/paragraphs/CTAs in document order.
   - `extraction/tokens.json` — computed styles harvested from the page: color population (sorted by
     frequency), font families per role (heading/body/UI), the actual type scale (rendered px sizes),
     spacing rhythm (section paddings), border radii, shadows.
   - `extraction/assets.json` — every image/video URL with rendered dimensions and where it appears;
     fonts loaded (from document.fonts and @font-face); note which assets are reference-only.
   - `extraction/animation-hints.json` — detected libraries (GSAP, Lenis, Framer, Swiper, Lottie,
     Three.js — via script src and window globals), elements with transition/animation styles,
     IntersectionObserver usage hints, sticky/fixed elements, autoplay video.
   - `extraction/pages.json` — same-origin nav links harvested from header/footer/menus → the draft
     page inventory.
8. **Auto-draft `topology.md` and `clone-plan.md`** from the evidence, using the existing templates,
   with every mechanically-knowable field pre-filled and judgment fields left marked for the agent.
   The agent's job becomes *verifying and completing* the clone plan, not transcribing a website by hand.
9. Optionally `--pages N`: also capture the top N inner pages from the harvested inventory (desktop +
   mobile screenshots + copy extraction each).

Also in this phase: fix the same weaknesses in the existing preview capture (`capture.ts`): auto-scroll
before full-page shots, add 768 viewport, replace the motion capture with a full scripted scroll-through
(plus reduced-motion pass), and use resilient navigation waits.

**Acceptance:** running capture against two real donor sites (e.g. fourseasons.com and a heavily
lazy-loaded marketing site) produces complete evidence packs with no blank lazy-load boxes, a scroll
video that shows scroll-triggered animation actually firing, and a clone-plan draft whose page
inventory, asset list, and stack hints match reality. Gate functions still pass; existing tests still
pass; new unit tests cover token extraction and page-inventory harvesting.

### Phase 2 — Visual Compare + real verification (`blueprint compare`, upgraded `check`)
**Goal:** an objective "how close is the clone?" number the build loop can iterate against — the key to
one-shot cloning.

1. `pnpm blueprint:compare <slug> <preview-url>`:
   - Recapture the build at the same 4 viewports with the same auto-scroll discipline.
   - Produce side-by-side composites (donor | build) per viewport → `qa/compare/side-by-side-*.png`.
   - Pixel-diff per section (align by section index/heading; tolerate height differences by comparing
     section crops, not the whole page) using an image-diff lib (pixelmatch or odiff).
   - Layout-diff structural checks: section count and order, heading hierarchy match, donor fonts vs
     build fonts, donor palette vs build palette (from both tokens.json files).
   - Emit `qa/compare/report.md`: overall match %, per-section match %, top 5 largest deviations with
     crops, and a "worst section first" fix list.
2. The Beauty Pass rubric gains one required input: the latest compare report. "Reference Comparison" in
   `visual-review.md` must cite the match scores, not just prose.
3. Upgrade `blueprint check <slug>` to do what the design spec always intended:
   typecheck → build → console-error scan on the preview → broken internal link check → a11y quick pass
   (axe-core via Playwright: images without alt, contrast failures, missing landmarks) → summary with
   pass/fail per check.
4. New `blueprint verify <slug> <preview-url>`: the one-call chain — check → screenshots → motion →
   compare → beauty evidence gate — ending with a plain-language report of exactly what's ready and
   what's not.

**Important honesty rule:** the compare score is a *fidelity instrument for the clone stage*. After
brand translation, the score is expected to drop on color/imagery while structure/rhythm should stay
high — report structure and style scores separately so translation isn't punished.

**Acceptance:** compare run on the four-seasons site produces a per-section report; deliberately breaking
one section (e.g. removing the carousel) drops that section's score and the report names it as the top
deviation. `verify` runs end-to-end on example-site.

### Phase 3 — Design tokens + font matching wired into the build
**Goal:** donor DNA flows mechanically into the site instead of through prose.

1. `blueprint tokens <slug>`: normalize `extraction/tokens.json` into `sites/<slug>/app/tokens.json`
   (curated: primary/neutral palette, heading/body font stacks, type scale, spacing scale, radii) and
   generate the Tailwind theme extension from it. The template `next-site` gains the wiring so every new
   site reads tokens from day one.
2. Font matcher: for each donor font, look up license status; if not freely usable, propose the closest
   Google-Fonts/open alternative (maintain a curated mapping file in `factory/qa/font-substitutes.md` —
   e.g. common luxury serifs → close open equivalents) and record the decision in `asset-log.md`.
3. Brand translation becomes a token operation: `tokens.donor.json` vs `tokens.brand.json`, with the
   diff documented in `art-direction.md`.

**Acceptance:** a new site scaffolded from the template renders headings/body/colors from tokens.json;
changing a token value changes the rendered site; font decisions appear in the asset log.

### Phase 4 — The Reference Library (the beauty multiplier)
**Goal:** agents copy proven craft instead of inventing janky motion.

Create `factory/reference-library/` with self-contained, copy-paste-ready patterns, each in its own
folder with: the code, a README naming when to use it and its donor lineage, and reduced-motion
behavior. Seed it by **extracting the best work already in the repo** (four-seasons carousel + Voyage
Wake Reveal, one-and-only masthead reveal, bigmart hero-settle, alpine-bloom collage rhythm):

- `motion/lenis-gsap-setup/` — the canonical smooth-scroll + ScrollTrigger boot.
- `motion/scroll-reveal/` — staggered section reveals done right (IO + CSS, and GSAP variants).
- `motion/text-reveal/` — split-text heading assembly.
- `motion/sticky-pin/` — pinned/scroll-snap storytelling sections.
- `motion/parallax-media/` — restrained image parallax.
- `motion/hero-settle/` — full-bleed hero with content settle (bigmart lineage).
- `motion/masthead-reveal/` — solid masthead → living media (one-and-only lineage).
- `components/carousel/` — true prev/active/next carousel (four-seasons lineage, Embla-based).
- `components/mega-nav/`, `components/accordion/`, `components/marquee/`, `components/media-gallery/`.
- `sections/` — hero patterns, editorial grids, offer rails, story CTAs, footers — each annotated with
  the section-rhythm rule it demonstrates.

Add the rule to `AGENTS.md`: **check the reference library before writing any motion or interactive
component from scratch; if you build a new pattern that passes Beauty, contribute it back.** That last
clause makes the factory compound: every clone makes the next clone better.

**Acceptance:** library exists with ≥10 patterns, each runnable in isolation (a small
`reference-library/demo` page), each with reduced-motion handling; AGENTS.md updated; one existing site
pattern demonstrably extracted rather than rewritten.

### Phase 5 — Multi-page coverage enforcement
**Goal:** clone plans stop being aspirational.

1. Clone plan's page inventory becomes machine-readable (a simple table or `pages.json` synced from
   capture) with per-page status: `planned | built | deferred (reason)`.
2. `siteStatus` gains `pagesReady`: every planned page is built-or-deferred, and each built page has a
   desktop + mobile screenshot under `screenshots/pages/<route>/`.
3. `blueprint screenshots` captures every built route, not just `/`.
4. Beauty Pass fail condition (already written in the rubric: "missing donor-critical pages") becomes
   mechanically checkable.

**Acceptance:** a site with a clone plan naming 5 pages and only 1 built reports
`NEEDS_PAGE_COVERAGE: 4 pages planned but not built or deferred` instead of passing to Beauty.

### Phase 6 — Preview deploy + operator dashboard
**Goal:** Jeremy can see and share everything without touching a terminal flag he doesn't understand.

1. `blueprint deploy <slug> --preview`: build locally, deploy a **Vercel preview** (never production),
   verify the URL returns 200, write URL + date into `deploy.md`. Production remains: ask the human,
   always.
2. `blueprint status` with no slug: table of every site — next action, last screenshot date, compare
   score, preview URL. Also write it to `factory/STATUS.md` so it's readable in any editor/GitHub.
3. Plain-language reports: every `run`/`verify` ends with 3–6 sentences a non-engineer can read ("The
   clone matches the donor at 91% on desktop. The weakest section is the gallery. Nothing is deployed
   to production.").

**Acceptance:** one call yields a shareable preview URL recorded in deploy.md; `pnpm blueprint:status`
prints the all-sites table.

### Phase 7 — Production asset + copy pipeline
**Goal:** the translation pass (donor → brand) gets the same discipline as the clone pass.

1. `asset-log.md` becomes a gate: `blueprint deploy` (even preview, with a warning; production, hard
   block) refuses while any asset is marked `reference-only` in the production build.
2. Asset replacement playbook: for each reference-only asset — client-provided > licensed stock >
   AI-generated, with prompts/settings logged. Generated media gets a consistent art-direction prompt
   template derived from `art-direction.md`.
3. Copy deck: `extraction/copy.md` → `copy-deck.md` two-column table (donor copy → brand copy), so
   translation is reviewable line by line and brand rules (e.g. women-only language) are checkable
   against a single file.

**Acceptance:** a site with donor images in `public/` cannot pass the deploy gate; copy deck exists for
one translated site.

### Phase 8 (later, explicitly deferred)
- Intake normalization from screenshots/video-only donors (no live URL).
- Scheduled automations (nightly verify runs that *report*, never change — per the design spec's
  automation boundaries).
- LLM-judge beauty pre-pass (structured scoring with side-by-side evidence before the human gate).
- Capability packs beyond Green Pastures (e.g. "Commerce Pack", "Booking Pack" extracted as smaller
  composable donors).

**Do not build these until Phases 1–7 are proven on two real clones.** The design spec's instinct —
manual loops first, automation later — is correct.

---

## Part 5 — The New Callbook Entries (what Jeremy will be able to say)

After this plan lands, these calls work end-to-end:

```text
$blueprint capture <company> from <donor-url>        → full donor evidence pack, auto-drafted clone plan
$blueprint run <company>                             → advance gates; build follows clone plan
$blueprint compare <slug>                            → objective match report vs donor
$blueprint verify <slug>                             → full QA chain + plain-language report
$blueprint deploy <slug> preview                     → shareable Vercel preview URL
$blueprint status                                    → every site, every gate, one table
```

And the master call — the one-shot clone:

```text
$blueprint run <company>
Visual donor: <url>
Brand rules: <rules>
```

now means: capture donor (automated) → verify clone plan (agent judgment on pre-filled draft) → build
from tokens + reference library → compare loop until match % plateaus high → translate brand via token
swap + copy deck → verify → Beauty Pass vs donor evidence → human taste gate → preview deploy.

---

## Part 6 — Priorities If Forced To Choose

| Rank | Item | Why |
|------|------|-----|
| 1 | Phase 1: Donor Capture Engine | Nothing one-shots without automated donor forensics |
| 2 | Phase 2: Visual Compare | Turns "looks close" into a number the loop can climb |
| 3 | Phase 4: Reference Library | Biggest beauty-per-effort lever; compounds every build |
| 4 | Phase 3: Tokens + fonts | Makes translation systematic and typography trustworthy |
| 5 | Phase 5: Page coverage | Stops the homepage-stub failure mode |
| 6 | Phase 6: Deploy + dashboard | Operator experience for a non-technical owner |
| 7 | Phase 7: Assets + copy | Production-readiness and legal cleanliness |

---

## Part 7 — Guardrails For Execution (Codex must honor these)

1. **Never weaken an existing gate.** All current checks (reference-first, signature moment, clone plan
   concreteness, human beauty gate, ask-before-production) stay. New capability adds gates; it never
   removes them.
2. **Keep `factory/scripts/blueprint.ts` the single entrypoint** but split implementation into modules
   (`capture-donor.ts`, `compare.ts`, `tokens.ts`, `verify.ts`, `status.ts`) as it grows. Every gate
   function keeps unit tests; the existing test file keeps passing.
3. **Sites stay self-contained.** The reference library is copy-from, never import-from. No shared
   runtime packages.
4. **Legal posture:** donor captures are reference evidence only. Reference-only assets never ship;
   the Phase 7 gate makes this mechanical. Never clone logos, brand names, or protected copy into
   production output.
5. **Respect robots/ToS pragmatics:** capture is a low-volume, single-pass research capture of public
   pages — not crawling at scale, not bypassing paywalls or logins.
6. **Small verified phases, small commits.** Each phase lands with its acceptance test demonstrated in
   the run log before the next begins. If a phase wanders, stop and write a forensic note (the Alpine
   Bloom precedent) instead of pushing through.
7. **Housekeeping while passing through:** move `fourseasons-desktop-1440-full.png` from the repo root
   into `sites/four-seasons/references/`; leave `prospects/` and `.blueprint-search-nepal/` alone (they
   are business artifacts, not factory code) but note they should graduate to their own home eventually.

---

## Part 8 — What Success Looks Like

The factory passes this test: Jeremy pastes one message —

```text
$blueprint run Acme Lodge
Visual donor: https://some-beautiful-hotel-site.com
Brand rules: warm alpine, family-run, green/cream, English + German
```

— and without further technical input receives, in one run: a captured donor evidence pack, a built
multi-page clone measured ≥90% structural match on desktop and mobile, brand translation via tokens and
copy deck, a passing verify report, a Beauty Pass write-up with side-by-side evidence, and a preview URL
— stopping exactly once, at the human taste gate, where the only question is "do you love it?"

That is a website factory.
