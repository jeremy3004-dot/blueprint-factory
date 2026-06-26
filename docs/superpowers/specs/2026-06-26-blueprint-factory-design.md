# Blueprint Factory Design

Date: 2026-06-26
Status: approved draft for review

## Purpose

Blueprint Factory is a Codex-friendly system for producing many high-craft websites without turning each new site into a separate project too early. It should support client sites, product/company sites, rebuilds from screenshots or videos, and sites built from mixed source material.

The factory should optimize for standout visual quality first. Speed and reliability still matter, but the baseline promise is not "generate a generic site quickly." The promise is "run a repeatable high-craft process that produces beautiful, animated, production-ready websites."

## Core Decision

Use one Blueprint Factory project as the durable workshop. Each website starts as its own site folder inside the factory, with a separate Next.js app per site. Serious sites can later graduate into their own repository.

This keeps the factory's playbooks, templates, loops, QA rules, and command tool in one place while preventing dozens of websites from sharing one fragile runtime.

Sites should be self-contained. Reusable craft patterns, such as Lenis setup, GSAP scroll helpers, transition examples, shader starters, and layout patterns, should live in `factory/reference-library/` as canonical examples that are copied into a site when needed. Do not make active sites depend on shared runtime packages until the factory has proven that the extra coupling is worth it.

## Repository Shape

```text
BLUEPRINT FACTORY/
  AGENTS.md
  package.json
  pnpm-workspace.yaml
  docs/
    superpowers/
      specs/
  factory/
    playbooks/
    loops/
    templates/
    qa/
    reference-library/
    scripts/
  sites/
    <site-slug>/
      brief.md
      art-direction.md
      asset-log.md
      deploy.md
      app/
      assets/
      references/
      source-notes/
      screenshots/
      qa/
        run-log.md
        visual-review.md
        motion/
```

The `factory/` directory is the reusable system. The `sites/` directory holds active website jobs. Each site has its own `app/` so Codex can reason about one website at a time and a broken site does not affect every other site.

Use `pnpm` workspaces so dozens of independent site apps can install efficiently while still staying independently buildable.

## Default Website Stack

The default stack is:

```text
Next.js + Tailwind CSS + GSAP + Lenis
```

Optional craft layers:

- Three.js or React Three Fiber when the concept needs real 3D.
- Motion when component or layout animation is enough.
- Lottie or Rive when designed animation assets exist.

Default backend:

- No backend unless needed.
- Supabase when a site needs auth, database, storage, realtime, forms workflow, admin content, or app-like behavior.

Default deploy:

- Vercel by default.
- Cloudflare only through an intentional deploy profile.
- Cloudflare static/export profile for static marketing sites.
- Cloudflare Worker/OpenNext profile for advanced Cloudflare-hosted Next.js sites.

## Content Rule

Start content in files and Markdown. Do not bake CMS or Supabase into every site.

Add CMS, Supabase, or another backend only when the site needs editing workflows, auth, database-backed content, forms workflow, dashboards, storage, realtime behavior, or other dynamic app features.

## Intake Model

The factory should accept mixed inputs:

- Client or product name plus rough notes.
- Screenshots.
- Videos.
- Reference websites.
- Logos, photos, fonts, and brand assets.
- Existing copy.
- Product notes.
- Current website URLs.

Each input type should be normalized into the same site brief. The brief should describe what is being built, who it is for, what visual world it belongs to, what assets are available, what deploy profile is expected, and what must be verified before the site is called ready.

## Art Direction

Every site needs an `art-direction.md` before build work starts. This is not paperwork; it is the guardrail against generic output.

The art direction must name:

- The visual world.
- The one signature moment: a single interaction or visual that makes the site memorable.
- Motion language.
- Typography direction.
- Color world.
- Layout system.
- Two to four reference comparanda, each with the specific move to learn from.
- Anti-goals that would make this site feel generic.

A site with no signature moment is not ready. The Build stage must honor the signature moment instead of deferring it to a late polish pass.

## Command Tool

Build both the playbook system and a thin command tool immediately. The first command tool should organize the workflow rather than replace Codex's judgment.

Initial commands:

```text
blueprint new <slug>
blueprint art <slug>
blueprint check <slug>
blueprint screenshots <slug>
blueprint motion <slug>
blueprint beauty <slug>
blueprint deploy <slug>
```

Expected behavior:

- `blueprint new <slug>` creates the site folder, starter docs, asset log, deploy notes, QA files, and Next.js app.
- `blueprint art <slug>` checks the art-direction artifact and confirms the signature moment is named.
- `blueprint check <slug>` verifies required factory files and runs the relevant build and lint checks.
- `blueprint screenshots <slug>` captures desktop and mobile screenshots for review.
- `blueprint motion <slug>` captures a scripted scroll-through video of the key experience.
- `blueprint beauty <slug>` starts the Beauty Pass checklist and records findings.
- `blueprint deploy <slug>` deploys through the selected profile, defaulting to Vercel.

The command layer should stay small until the playbooks have proven themselves on real sites.

## Loops

Blueprint Factory should use bounded loops, not endless automation.

Named loops:

- Intake Loop: turns mixed inputs into a usable brief.
- Art Direction Loop: produces the concept and signature moment artifact.
- Build Loop: creates or updates the Next.js site from the brief.
- Beauty Pass Loop: improves visual craft, including layout, typography, spacing, motion, imagery, and first-screen impact.
- QA Loop: checks desktop and mobile screenshots, build health, broken layouts, and generic AI-site problems.
- Deploy Loop: publishes through the selected profile and verifies the live result.

Beauty Pass process:

1. Capture desktop and mobile screenshots plus a short scroll-through motion capture.
2. Review the site against the brief, references, and high-craft standards.
3. Confirm the signature moment exists and lands in motion.
4. Compare the site against the specific moves named in the references.
5. Pick the highest-impact issue.
6. Make one focused improvement.
7. Rebuild and capture again.
8. Stop when the site passes, progress stalls, or user approval is needed.

The loop should fail sites that feel generic: bland hero, stock SaaS layout, weak typography, no concept, purposeless motion, repeated section patterns, or mobile afterthoughts.

Still screenshots are not enough for high-craft animated sites. Beauty Pass and QA must judge motion with a recorded scroll-through, because bad easing, janky scroll sequencing, and weak signature moments often hide in still images.

## Automation Boundaries

Manual Codex-triggered loops come first. Scheduled and event-based automation can come later.

Manual loops may make changes when the user asks. Scheduled loops should report findings first unless the user explicitly authorizes automatic changes.

The system must ask before:

- Production deploys.
- Paid service changes.
- External messages.
- Destructive cleanup.
- Major art-direction changes.
- Repository graduation or ownership changes.

Exactly one human taste review is mandatory per site. It happens after the first Beauty Pass produces a viewable build and before any production deploy. Codex should stop at that gate and request owner review.

## Ready Gate

A site is not ready unless it has:

- A working build.
- Complete `art-direction.md` with a named signature moment.
- Required factory files.
- Desktop and mobile screenshots.
- Motion capture of the key scroll experience.
- Visual review pass.
- Required human taste review on record.
- Asset log.
- Deploy profile.
- No obvious mobile breakage.

The factory should prefer a clear `NOT_READY` result over a weak pass.

## Asset And Rights Tracking

Every site must keep an `asset-log.md` that records images, fonts, logos, videos, generated assets, reference material, and usage notes.

The first version does not need a legal system, but it does need enough tracking that future cleanup, client handoff, and production review are possible.

## Graduation Rules

A site starts inside Blueprint Factory. It graduates to its own repository when one or more of these are true:

- It is a paid or client production site.
- It needs long-term maintenance.
- It has custom backend complexity.
- It has separate collaborators.
- It has meaningful production traffic.
- It needs separate deploy ownership.
- Keeping it inside the shared factory would increase risk.

Blueprint Factory remains the workshop and launchpad. It should not become the permanent home for every serious production website.

## Verification

Before handoff, each meaningful site change should run the relevant checks:

- Required file validation.
- Build.
- Lint or typecheck when configured.
- Desktop and mobile screenshot capture.
- Motion capture for animated or scroll-led experiences.
- Visual review.
- Deploy verification when deployment is part of the request.

When a check is blocked, the run log should say exactly what is missing and what the next recovery step is.

## First Implementation Target

The first implementation plan should create the basic factory scaffold, starter docs, thin command tool, art-direction template, Beauty Pass rubric, one Next.js site template, and one example site to prove the workflow.

It should not build a full CMS, complex agent platform, or broad automation scheduler yet.

## Decisions Log

These decisions are deliberate and should not be silently reversed:

- Sites are self-contained and copy from `factory/reference-library/` rather than importing shared runtime code.
- `pnpm` workspaces are used for efficient installs across many separate site apps.
- Art Direction is required before Build.
- Every site needs a named signature moment.
- Beauty Pass and QA judge motion, not still screenshots alone.
- One human taste review is required before production deploy.
