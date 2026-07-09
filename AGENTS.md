# Blueprint Factory: Agent Operating Instructions

Blueprint Factory builds high-craft animated websites. Optimize for standout visual quality first.

When Jeremy asks what to call or how to run Blueprint Factory workflows, use `factory/playbooks/blueprint-factory-callbook.md`.

## Full Client Clone Jobs

For a complete paid client rebuild (adopt → clone → translate → preview deploy), use
`factory/playbooks/master-clone-job-prompt.md`. The owner fills only two blanks in the Job Card:
**client name** and **their current website URL**. The worker derives tone, colors, facts, donor
pick, and scope from evidence. Create inbox tasks from the Operator Console (`pnpm blueprint:console`)
or paste the master prompt into a new session.

## Donor Shelf Stocking

To capture new world-class visual donors onto the shelf (no client build), use
`factory/playbooks/master-shelf-stocking-prompt.md`. Fill **one blank** in the Job Card: paste URL(s),
name a business kind, or write **your choice** and the worker fills emptiest shelf sectors. The worker
**beauty-auditions** each candidate (desktop + mobile scroll, named signature moment) **before**
`pnpm blueprint:capture` — empty shelf space is better than a mediocre donor. Work lands on branch
`shelf/*` for supervisor review before merging. Create restock tasks from the Operator Console
**Restock** tab or paste the master shelf prompt into a new session. Shelf stock stops before any
client site work.

**Prompt vs skill:** The shelf playbook is the production worker runbook. `blueprint-search-nepal` is
prospect scouting only — not donor capture.

## Nepal Prospect Scouting

Use the `blueprint-search-nepal` skill (`/Users/dev/.codex/skills/blueprint-search-nepal/`) to find and
rank Nepal businesses with strong demand and weak websites. Export results to `prospects/nepal-leads.csv`.
The Operator Console **Prospects** tab reads that CSV and can prefill a demo clone job from any lead.

Every site must have:
- `brief.md`
- `art-direction.md` with one named signature moment
- `asset-log.md`
- `deploy.md`
- `references/reference-first/topology.md`
- `references/reference-first/clone-plan.md`
- desktop and mobile screenshots
- motion capture when animation or scroll experience matters
- visual review

## Reference-First Build Rule
- Every new website should start with a donor URL from Jeremy when possible. If he does not provide one, ask for the first website to clone before building unless he explicitly asks the agent to choose.
- Pixel-perfect clone first, translation second. Before custom brand work, fully clone the donor's structure, colors, typography, spacing, assets, responsive behavior, and section rhythm.
- Verify the clone against donor desktop and mobile screenshots before translating it into the client brand, assets, copy, and goals.
- If no donor URL is provided and Jeremy asks the agent to choose, research at least three high-quality sector references and choose one 10/10 donor structure before build work.
- Use website cloning/reverse-engineering discipline for the donor: capture desktop/mobile screenshots, map the page topology, identify the interaction model, and extract the layout rhythm, motion pattern, typography hierarchy, asset strategy, and responsive behavior.
- Write `references/reference-first/clone-plan.md` before art direction or build work. It must list all pages/routes, all user flows, observed states, animation mechanisms, assets/fonts/video needs, and the smallest correct implementation stack.
- Do not copy brand identity or protected content blindly for production. Clone the proven structure and quality bar first, then replace protected assets/content during the translation pass.
- `art-direction.md` must name the primary donor, secondary references, and the exact moves being borrowed.
- Beauty Pass must compare the build against the donor screenshots, not just against the agent's own taste.

## Green Pastures Pack
- When Jeremy says `Green Pastures Pack`, `copy what Green Pastures has`, or asks for Green Pastures-level company capability, follow `factory/playbooks/green-pastures-pack.md`.
- Green Pastures is the capability donor only. The visual donor and company brand rules still control the final look, copy, imagery, personas, and exclusions.
- Do not hand-port from memory. Use the pack checklist and verify each capability phase before save or deploy.

## Reference Library Rule

`factory/reference-library/` holds proven, copy-paste motion/component/section patterns extracted from
builds that passed the Beauty Pass (see its `README.md` for the index).

- **Check the reference library before writing any motion or interactive component from scratch.** Agents
  produce janky motion when they invent it and good motion when they copy a proven pattern. Start from the
  closest pattern and adapt it.
- **Contribute passing patterns back.** If you build a new motion/component/section pattern that clears the
  Beauty Pass, add it to the library (code + README naming when-to-use, donor lineage, and reduced-motion
  behavior; a runnable `demo.html`). This is what makes the factory compound — every clone improves the next.
- **Copy from, never import.** Sites under `sites/<slug>/app` are self-contained: copy the pattern's
  code into the site and adapt it. Do not import shared runtime code from the factory.
- Every library pattern must handle `prefers-reduced-motion`; keep that true for anything you contribute.

Ask before production deploys, paid service changes, external messages, destructive cleanup, major art-direction changes, or repo graduation.
