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

Only after that should the site move into art direction, build, screenshots, motion, and Beauty Pass.
