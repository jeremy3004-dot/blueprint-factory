# Blueprint Factory

Blueprint Factory is a repeatable workshop for building beautiful, animated websites.

New sites start under `sites/<slug>/`. Each site has its own Next.js app and its own brief, art direction, asset log, screenshots, and QA trail.

The factory favors standout visual quality over generic speed. A site is not ready unless it has a signature moment and passes the Beauty Pass.

## Default Flow

Run `pnpm blueprint:run <slug>`.

The first gate is now reference-first: before art direction or build work, capture a primary 10/10 donor site and secondary references under `sites/<slug>/references/reference-first/`.

Required reference evidence:
- at least one `*-desktop.png`
- at least one `*-mobile.png`
- `topology.md` describing the donor structure, interaction model, and moves to translate
- `clone-plan.md` describing all pages, flows, states, animation mechanisms, assets, and the implementation stack needed to rebuild the donor faithfully

Only after that should the site move into art direction, build, screenshots, motion, and Beauty Pass.

## Commands

The factory is driven by `pnpm blueprint:*` commands. Each one ends with a plain-language summary a
non-technical owner can read.

| Command | What it does |
| ------- | ------------ |
| `pnpm blueprint:capture <slug> <donor-url>` | Automated donor evidence pack: multi-viewport full-page screenshots (auto-scrolled, cookie-consent dismissed), per-section shots, a real scroll-through video (+ reduced-motion), DOM/copy/token/asset/animation/page extraction, and auto-drafted `topology.md` + `clone-plan.md` + `pages.json`. |
| `pnpm blueprint:run <slug> [url]` | Advance the site through the factory gates (reference-first → art → build → screenshots → motion → page coverage → Beauty). |
| `pnpm blueprint:status [slug]` | With a slug: that site's next gate. With no slug: an all-sites dashboard, also written to `factory/STATUS.md`. |
| `pnpm blueprint:adopt <client-slug> <donor-name>` | Scaffold a client site from a donor shelf pack: copy reference-first evidence, rewrite headers for the client, and seed `pages.json`. |
| `pnpm blueprint:tokens <slug>` | Curate the donor's colors + fonts into `app/tokens.json` (wired into the theme); substitute licensed donor fonts for open ones and log it in `asset-log.md`. |
| `pnpm blueprint:check <slug> [url]` | Typecheck → build → (with a URL) console-error scan → broken-link check → axe accessibility pass. |
| `pnpm blueprint:compare <slug> <preview-url> [--stage clone\|translation]` | Per-section compare vs the donor, side-by-side composites, and `qa/compare/report.md`. Clone stage is pixel-led; translation stage leads with structure while raw pixel match is informational. |
| `pnpm blueprint:verify <slug> <preview-url>` | The full QA chain: check → screenshots → motion → compare, ending in a plain-language report. |
| `pnpm blueprint:copydeck <slug>` | Turn the donor's extracted copy into a two-column `copy-deck.md` (donor → brand) for line-by-line translation. |
| `pnpm blueprint:deploy <slug> --preview` | Build locally, deploy a shareable **Vercel preview** (never production), verify it, and record the URL in `deploy.md`. Blocks while any reference-only asset would ship. |
| `pnpm blueprint:screenshots` / `:motion` / `:beauty` / `:art` / `:new` | Individual steps (screenshots captures every built route from `pages.json`). |

Copy proven motion/component/section patterns from `factory/reference-library/` before inventing new
ones; contribute passing patterns back (see its `README.md` and `AGENTS.md`).

## Green Pastures Pack

For repeat company apps, use `factory/playbooks/green-pastures-pack.md`.

Call it like:

```text
$blueprint run <company> with Green Pastures Pack
Visual donor: <url>
Brand rules: <short rules>
```

This means: clone the visual donor first, then add Green Pastures-level admin, booking, map, AI concierge, analytics, backend-readiness, and operations depth while translating all copy, data, imagery, and examples into the new company brand.

## Callbook

For the full list of things Jeremy can call, use `factory/playbooks/blueprint-factory-callbook.md`.
