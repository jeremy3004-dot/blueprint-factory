# Asset Replacement Playbook

Donor media is **reference evidence only**. It never ships to production. The clone stage may render
donor imagery to prove structure and rhythm, but before any production deploy every reference-only asset
must be replaced. `blueprint deploy` enforces this mechanically: it refuses to deploy while a site's
production build (`app/public/`) still contains reference-only assets.

## What counts as reference-only

An asset is reference-only if either is true:

- It lives under an `app/public/reference-only/` path (the staging convention), or
- It is listed in the site's `asset-log.md` with the token `reference-only` and is still present in
  `app/public/`.

Stage donor captures under `app/public/reference-only/` during the clone pass so the gate can see them,
and delete/replace that folder before deploy.

## Replacement priority (highest first)

For every reference-only asset, choose the highest-available source and log the decision in
`asset-log.md`:

1. **Client-provided** — real brand photography/video the owner supplies. Always preferred; it is
   authentic and unambiguously licensed.
2. **Licensed stock** — a paid/CC-licensed stock asset that fits the art direction. Log the source, the
   licence, and the licence URL/receipt in `asset-log.md`.
3. **AI-generated** — generate media to the art direction when nothing above exists. Log the tool, the
   exact prompt, and the settings so it is reproducible.

Never reach for a lower tier when a higher one is available, and never ship a donor logo, brand name, or
protected image.

## Generated-media prompt template

Derive the prompt from `art-direction.md` so generated assets match the site's world. Fill and log this
in `asset-log.md` under **Generated Assets**:

```text
Subject: <what the image shows — e.g. "a woman-led trekking group on an alpine ridge at dawn">
World / mood: <from art-direction.md §2 "visual world" — e.g. "editorial, warm, handmade, real-life mountain energy">
Palette: <from tokens.json / art-direction §6 — e.g. "pink, cream, deep pine green">
Composition: <framing that fits where the asset sits — e.g. "wide, negative space top-left for headline">
Lighting: <e.g. "soft golden-hour, low contrast">
Do NOT include: <brand rules / exclusions — e.g. "no male guides, no logos, no text">
Aspect ratio: <e.g. 16:9 hero / 3:4 card / 1:1 tile>
Tool + settings: <tool, model, seed, steps — logged for reproducibility>
```

## Recording the decision (asset-log.md)

For each replaced asset, record: the original reference-only asset, the replacement source (tier), the
new asset path in `app/public/`, and the licence/prompt. Once no reference-only assets remain in
`app/public/`, `blueprint deploy` will pass the asset gate.

## Copy is the same discipline

Donor **copy** is reference-only too. Translate it in `copy-deck.md` (generate the scaffold with
`blueprint copydeck <slug>`): donor copy on the left, brand copy on the right, so brand rules are
checkable line by line and no donor names/claims/taglines reach production.
