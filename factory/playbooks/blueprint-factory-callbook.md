# Blueprint Factory Callbook

This is the portable "how to call Blueprint Factory" guide.
Use it when Jeremy wants to start, clone, review, upgrade, save, or transfer a site/company app.

## Core Rule

Blueprint Factory builds from references first.

Always separate these three things:

- Visual donor: the site to clone visually first.
- Capability pack: optional feature depth to add after the visual clone.
- Brand rules: the final company's audience, colors, tone, product, people, exclusions, and hard constraints.

## Most Important Call Phrases

### Start A Normal High-Craft Website

```text
$blueprint run <company or site name>
Visual donor: <url>
Brand rules: <short rules>
```

Meaning:

- Create or inspect `sites/<slug>`.
- Clone the visual donor first.
- Capture donor desktop and mobile screenshots.
- Write the donor topology.
- Translate the donor into the new brand.
- Build, screenshot, motion-check, beauty-pass, and prepare for review.

### Start A Company App With Green Pastures Depth

```text
$blueprint run <company name> with Green Pastures Pack
Visual donor: <url>
Brand rules: <short rules>
```

Meaning:

- Do the visual donor clone first.
- Then use `factory/playbooks/green-pastures-pack.md`.
- Study the portable Green Pastures donor source at `factory/capability-donors/green-pastures`.
- Add Green Pastures-level admin, booking, route/product, map, guide/team, calendar, CRM, AI, analytics, backend-readiness, tests, docs, and deploy depth.
- Rewrite all data, copy, imagery, examples, and personas into the new company brand.

### Clone First, Then Adapt

```text
Clone this first pixel-perfect, then adapt it for <company>.
Visual donor: <url>
Brand rules: <rules>
```

Meaning:

- Do not improvise the first pass.
- First match the donor's structure, rhythm, colors, typography, spacing, responsive behavior, asset strategy, and signature motion.
- Only then translate content and features.

### Catch A Site Up To Green Pastures

```text
Audit <site> against Green Pastures Pack and make a catch-up plan.
```

Meaning:

- Compare the target site to `factory/playbooks/green-pastures-pack.md`.
- Produce a gap list: present, missing, partial, verified.
- Work in small phases.
- Verify each phase before commit or deploy.

### Continue An Existing Site

```text
$blueprint status <slug>
Then continue from the next gate.
```

Meaning:

- Inspect current state first.
- Do not restart from scratch.
- Follow the next missing factory gate.

## Real Factory Commands

Run these from the Blueprint Factory root.

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

- `run`: create/inspect a site and advance through the factory gates.
- `status`: print the current next action.
- `new`: create the site scaffold.
- `art`: check that art direction names a real signature moment.
- `check`: verify required factory files exist.
- `screenshots`: capture desktop and mobile screenshots from a preview URL.
- `motion`: capture motion evidence from a preview URL.
- `beauty`: append a beauty-pass review gate.
- `deploy`: print deploy profile notes. Production deploys are intentionally manual/approved.

## Required Files Per Site

Every site should have:

- `brief.md`
- `art-direction.md`
- `asset-log.md`
- `deploy.md`
- `qa/run-log.md`
- `qa/visual-review.md`
- desktop and mobile screenshots
- motion capture when animation or scroll matters

## Reference-First Evidence

Before building or adapting, save:

- `sites/<slug>/references/reference-first/*-desktop.png`
- `sites/<slug>/references/reference-first/*-mobile.png`
- `sites/<slug>/references/reference-first/topology.md`

`topology.md` should describe:

- hero structure
- section order
- conversion path
- typography hierarchy
- color and spacing rhythm
- image/video strategy
- interaction and motion model
- exact moves to borrow

## Capability Packs

### Green Pastures Pack

Use when the site needs Green Pastures-level company app depth.

Source files:

- Pack playbook: `factory/playbooks/green-pastures-pack.md`
- Donor source: `factory/capability-donors/green-pastures`

Call phrase:

```text
with Green Pastures Pack
```

Use for:

- travel operators
- local service companies
- booking businesses
- guided experiences
- operations-heavy companies
- any company that needs admin, CRM, calendar, maps, AI, and backend readiness

Do not use it as a visual style. It is a capability donor.

### Blueprint Animate

Use when a site needs premium animation, scroll storytelling, WebGL/3D, or a stronger signature moment.

Call phrase:

```text
$blueprint-animate for <site or slug>
```

Meaning:

- Research donor and technique references before inventing.
- Write a motion brief with one named signature moment.
- Choose the smallest fitting motion tool.
- Verify desktop, mobile, reduced motion, and motion capture before Beauty Pass.

## Save And Deploy Calls

### Save To Main

```text
save to main
```

Meaning:

- Review current git status.
- Stage only intended files.
- Commit a focused change on `main`.
- Preserve unrelated dirty work.

### Update Vercel

```text
update on Vercel
```

Meaning:

- Build locally first.
- Deploy the relevant app to Vercel production only when approved.
- Verify live URLs return 200 and show the new work.
- Update `deploy.md` when the public deployment changes.

### Save And Update Vercel

```text
save to main and update on Vercel
```

Meaning:

- Commit first.
- Deploy second.
- Verify live third.

## Review Calls

### Visual Review

```text
run a beauty pass
```

Meaning:

- Compare the build against the visual donor screenshots.
- Score first-screen impact, signature moment, typography, layout, motion, color/imagery, mobile, and coherence.
- Update `qa/visual-review.md`.

### Feature Review

```text
what does <donor> have that <site> does not?
```

Meaning:

- Audit feature-by-feature.
- Return gaps ordered by importance.
- Separate public UX, admin/backend, AI, analytics, data depth, tests, docs, and deploy.

### Forensic Review

```text
do a forensic analysis of why this wandered
```

Meaning:

- Compare actual work to instructions.
- Name where the process failed.
- Create a corrected workflow/checklist.
- Fix the work if asked.

## Transfer To Another Computer

If you transfer the whole `BLUEPRINT FACTORY` folder, this travels with it:

- `factory/playbooks/blueprint-factory-callbook.md`
- `factory/playbooks/reference-first-build.md`
- `factory/playbooks/green-pastures-pack.md`
- `factory/capability-donors/green-pastures`
- `AGENTS.md`
- `README.md`
- all site folders under `sites/`

That means another Codex can understand:

```text
Green Pastures Pack
```

as long as it reads the repo instructions and playbooks.

If transferring through git, commit the playbooks and donor source first.
If transferring by dragging/copying the folder, uncommitted files go with the folder too.

## Intake Template

Use this when starting a new company:

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

Example:

```text
$blueprint run Alpine Bloom with Green Pastures Pack
Visual donor: https://www.whoatravel.com
Company: women-only Himalayan trekking agency
Audience: women exploring Nepal with women guides
Brand rules: pink, white, black, scrapbook, artsy, real-life mountain energy
Hard rules: women travelers only, Nepali women guides only, no male guide/persona examples
Deploy target: Vercel
```

## Agent Behavior

When using this callbook, Codex should:

- Read `AGENTS.md`.
- Read this callbook.
- Read the referenced pack playbook.
- Inspect the current site state before acting.
- Use the donor clone first, then translate.
- Work in small verified phases.
- Preserve unrelated dirty work.
- Ask before production deploys, paid services, external messages, destructive cleanup, or major art-direction changes.
