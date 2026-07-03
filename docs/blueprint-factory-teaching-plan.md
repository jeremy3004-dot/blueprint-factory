# Blueprint Factory Teaching Plan

Date: 2026-06-29
Status: draft teaching plan

Use this to teach another builder how Jeremy currently uses Blueprint Factory to prompt, build, review, and hand off high-craft websites.

## 1. The Simple Explanation

Blueprint Factory is a repeatable website workshop.

The point is not to ask an AI for a generic nice website. The point is to give Codex a proven donor site, clone the donor's structure and craft first, translate it into the new brand second, then prove the result with screenshots, motion capture, and a Beauty Pass.

The core formula is:

```text
Visual donor clone + brand rules + factory gates = high-craft website
```

For company apps with deeper operations:

```text
Visual donor clone + Green Pastures Pack + company brand rules = company app
```

## 2. The Main Systems

### Blueprint Factory repo

Location:

```text
/Users/dev/Documents/BLUEPRINT FACTORY
```

This repo holds the workshop itself:

- `AGENTS.md`: operating rules Codex should follow.
- `README.md`: owner-facing overview.
- `factory/playbooks/`: reusable workflows and call phrases.
- `factory/templates/`: starter docs for every site.
- `factory/qa/`: quality rubrics.
- `factory/scripts/`: the `blueprint` runner.
- `factory/capability-donors/green-pastures`: reusable company-app capability donor.
- `sites/<slug>/`: one self-contained website per folder.

### Site folders

Every site lives under:

```text
sites/<slug>/
```

Each site has:

- `brief.md`
- `art-direction.md`
- `asset-log.md`
- `deploy.md`
- `qa/run-log.md`
- `qa/visual-review.md`
- `references/reference-first/`
- `screenshots/`
- `qa/motion/`
- `app/`

The `app/` folder is its own Next.js app. Sites should copy patterns from the factory, not depend on a shared factory runtime.

### Reference-first build system

The first gate is donor evidence.

Before real build work, the builder must capture:

- one primary donor desktop screenshot
- one primary donor mobile screenshot
- `topology.md` explaining the donor structure and borrowed moves

The donor is cloned for structure, rhythm, typography, spacing, color behavior, responsive behavior, and signature motion. Protected content and brand identity are replaced during the translation pass.

### Art direction system

`art-direction.md` prevents generic AI output.

It must name:

- what the site is
- the visual world
- one concrete signature moment
- motion language
- typography
- color world
- layout system
- primary donor and secondary references
- anti-goals
- deploy and backend expectations
- ready criteria

The signature moment is mandatory. If it is vague or missing, the site is not ready for build.

### Beauty Pass system

Beauty Pass is the quality gate.

It checks:

- first-screen impact
- signature moment
- typography
- layout and rhythm
- motion craft
- color and imagery
- mobile
- coherence

It must compare the build against donor screenshots and motion evidence, not just the builder's own taste.

### Green Pastures Pack

Green Pastures is a capability donor, not a visual style.

Use it when a company site needs app-like depth:

- product or route index
- detail pages
- booking/proposal form
- admin login and dashboard
- CRM pipeline
- calendar/schedule
- staff/team assignments
- interactive maps
- AI concierge
- AI admin assist
- analytics
- backend readiness
- focused tests

The new company keeps its own visual donor, brand rules, audience, copy, imagery, and hard constraints.

## 3. The Tool Stack

### Agent tools

- Codex app: main execution environment.
- Repo instructions: `AGENTS.md` plus nearest site docs.
- Superpowers skills: process guardrails when available.
- Browser or Playwright checks: visual inspection, screenshots, motion proof.
- Web research: donor discovery and current references when Jeremy asks the agent to choose.

### Factory commands

Run from the factory root:

```bash
pnpm blueprint:run <slug>
pnpm blueprint:status <slug>
pnpm blueprint:new <slug>
pnpm blueprint:art <slug>
pnpm blueprint:check <slug>
pnpm blueprint:screenshots <slug> <preview-url>
pnpm blueprint:motion <slug> <preview-url>
pnpm blueprint:beauty <slug>
pnpm blueprint:deploy <slug>
```

Current command meanings:

- `run`: create or inspect a site and move it to the next gate.
- `status`: show current factory state.
- `new`: create the site scaffold.
- `art`: verify `art-direction.md` has a concrete signature moment.
- `check`: verify required files exist.
- `screenshots`: capture desktop and mobile screenshots.
- `motion`: capture scroll-through video evidence.
- `beauty`: append the Beauty Pass gate.
- `deploy`: print deploy profile notes. Production deploy is intentionally not automatic.

### Website stack

Default:

- Next.js
- React
- Tailwind CSS
- GSAP
- Lenis
- TypeScript
- pnpm workspaces

Optional when needed:

- Three.js or React Three Fiber for real 3D.
- Rive or Lottie for designed animation assets.
- Supabase for auth, database, storage, realtime, forms workflow, admin, or app-like behavior.
- Leaflet for maps when the product requires route/location exploration.

### Deploy tools

Default target:

- Vercel

Intentional alternatives:

- Cloudflare static
- Cloudflare Worker or OpenNext profile

Production deploys require approval.

## 4. The Prompt Library

### Start a normal high-craft website

```text
$blueprint run <company or site name>
Visual donor: <url>
Brand rules: <short rules>
```

Meaning:

- inspect or create `sites/<slug>`
- clone the donor first
- capture donor desktop and mobile screenshots
- write donor topology
- translate into the new brand
- build, screenshot, motion-check, Beauty Pass, and prepare for review

### Start a company app with Green Pastures depth

```text
$blueprint run <company name> with Green Pastures Pack
Visual donor: <url>
Brand rules: <short rules>
```

Meaning:

- clone the visual donor first
- add Green Pastures-level operational depth
- rewrite all data, personas, copy, imagery, and examples for the new company
- verify each phase before save or deploy

### Full intake prompt

```text
$blueprint run <company name> with <optional pack>
Visual donor: <url>
Company: <what it does>
Audience: <who it serves>
Brand rules: <colors, tone, style>
Hard rules: <must include / must exclude>
Features: <anything special beyond the pack>
Deploy target: <local only / Vercel / other>
```

### Clone first, then adapt

```text
Clone this first pixel-perfect, then adapt it for <company>.
Visual donor: <url>
Brand rules: <rules>
```

Use this when donor fidelity matters more than invention.

### Continue an existing site

```text
$blueprint status <slug>
Then continue from the next gate.
```

The builder must inspect current state and continue from the missing gate, not restart.

### Catch a site up to Green Pastures

```text
Audit <site> against Green Pastures Pack and make a catch-up plan.
```

Return a gap list:

- present
- missing
- partial
- verified

### Beauty Pass

```text
run a beauty pass
```

Meaning:

- compare against donor screenshots
- check signature moment in motion
- score the eight dimensions
- identify the single highest-impact fix
- update `qa/visual-review.md`

### Forensic review

```text
do a forensic analysis of why this wandered
```

Meaning:

- compare actual output to instructions
- name where the process failed
- write a corrected workflow
- fix the work if asked

### Save and deploy

```text
save to main
```

Meaning:

- inspect git status
- stage only intended files
- commit a focused change
- preserve unrelated dirty work

```text
save to main and update on Vercel
```

Meaning:

- commit first
- deploy second
- verify live third

## 5. The Standard Website Workflow

1. Intake

   Get company name, audience, offer, visual donor, brand rules, hard rules, desired features, and deploy target.

2. Reference-first evidence

   Capture donor desktop and mobile screenshots. Write `references/reference-first/topology.md`.

3. Art direction

   Fill `brief.md` and `art-direction.md`. Name the signature moment before coding.

4. Build

   Build the self-contained Next.js app inside `sites/<slug>/app`.

5. Screenshots and motion

   Start a preview URL. Capture desktop, mobile, and motion evidence.

6. Beauty Pass

   Compare against donor evidence. Fix the highest-impact issue first.

7. Human review

   Stop for taste review before production deploy.

8. Deploy

   Deploy only after approval. Verify live URL and update `deploy.md`.

9. Save

   Commit only the intended site files and docs.

## 6. What To Teach A New Builder

### Module 1: How to think

Teach this sentence:

```text
Do not invent from a blank page. Borrow a proven structure, then translate it.
```

The builder should understand:

- donor first
- clone structure before brand translation
- evidence beats taste
- motion matters
- every site has a signature moment
- production deploys require approval

### Module 2: How to start

Have them read:

- `AGENTS.md`
- `README.md`
- `factory/playbooks/blueprint-factory-callbook.md`
- `factory/playbooks/reference-first-build.md`
- `factory/qa/beauty-pass-rubric.md`

Then ask them:

```text
Explain the Blueprint Factory workflow as a checklist:
1. How to start a normal high-craft website.
2. How donor-first cloning works.
3. What files every site must have.
4. What proof is required before a site is ready.
5. What requires approval before proceeding.
```

### Module 3: How to inspect

Exercise:

```text
Pick one site under sites/.
Run a status check.
Tell me the current gate and the smallest useful next action.
Do not edit yet.
```

Current examples:

- `alpine-bloom`: ready for human review.
- `bigmart`: ready for human review.
- `example-site`: older demo has screenshots and beauty evidence, but currently lacks reference-first donor evidence.

### Module 4: How to write donor topology

Exercise:

```text
Pick one strong donor site.
Capture desktop and mobile.
Write topology.md with:
- hero structure
- section order
- conversion path
- typography hierarchy
- color and spacing rhythm
- image/video strategy
- interaction and motion model
- exact moves to borrow
```

### Module 5: How to avoid the common failure

Use Alpine Bloom's forensic note as the cautionary example.

The failure:

```text
The builder translated the brand too early before proving the donor clone.
```

The correction:

```text
Pixel-perfect donor clone first. Translation second.
```

### Module 6: How to use Green Pastures Pack

Exercise:

```text
Audit a company site against Green Pastures Pack.
List what is present, missing, partial, and verified.
Do not import Green Pastures visuals.
Use it only for capability shape.
```

## 7. Minimum Handoff Checklist

Before someone else can run this system, they should be able to:

- explain visual donor vs capability donor vs brand rules
- run `pnpm blueprint:status <slug>`
- create a new site scaffold
- capture and save donor screenshots
- write donor topology
- fill an art direction with a concrete signature moment
- build a self-contained Next.js site
- capture desktop/mobile screenshots
- capture motion
- run a Beauty Pass
- identify the single highest-impact fix
- know when to ask Jeremy before continuing

## 8. Important Source Docs

- `AGENTS.md`
- `README.md`
- `factory/playbooks/blueprint-factory-callbook.md`
- `factory/playbooks/reference-first-build.md`
- `factory/playbooks/green-pastures-pack.md`
- `factory/qa/beauty-pass-rubric.md`
- `factory/capability-donors/green-pastures/README-BLUEPRINT-DONOR.md`
- `docs/codex-blueprint-factory-video-playlist.md`
- `sites/alpine-bloom/source-notes/forensic-analysis.md`
- `sites/alpine-bloom/source-notes/green-pastures-feature-map.md`
