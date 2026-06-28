# Content Ingestion

## Route-source layer

The trek catalog now has a second content layer alongside the hand-curated local
route data:

- local editorial route model in [src/data/treks.ts](/Users/dev/Projects/Travel%20Agency/src/data/treks.ts)
- normalized operator snapshot in [src/data/operator-source.json](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.json)
- typed accessors in [src/data/operator-source.ts](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.ts)

## Design rule

Source content can enrich the dossier, but it does not get to redefine the visual
system. Layout, hierarchy, and CTA structure stay native to Himalayan Passage.

## Data rule

Local route records stay canonical for:

- slug and URL structure
- editorial summary and brand voice
- package framing and upgrade positioning

Source records can enrich:

- itinerary stage detail
- include/exclude package notes
- season, accommodation, group-size, and activity metadata
- public operator pricing when exposed

## Pricing rule

- Local catalog pricing remains the primary route price.
- Source pricing is shown as reference material when the public operator page exposes it.
- If the source does not publish a public rate, the UI should say so explicitly rather
  than showing `$0` or inventing a number.

## Sanitization rule

Source-derived copy must be sanitized before display so operator-specific branding
or first-person package language does not leak into the Himalayan Passage voice.

## Server-side ingestion pipeline

Operator pages and documents are ingested as build/operator artifacts first. The
pipeline is intentionally server-side and writes to [.artifacts/ingestion](/Users/dev/Projects/Travel%20Agency/.artifacts/ingestion)
by default so crawler output can be reviewed before it becomes app data.

### Web pages

Use Crawlee through [scripts/ingestion/crawl-operator-sources.mjs](/Users/dev/Projects/Travel%20Agency/scripts/ingestion/crawl-operator-sources.mjs):

```bash
npm run ingest:crawl -- --url https://operator.example/treks/example --max-pages 10
```

The crawler writes a timestamped run directory containing:

- `pages.json`: raw page extraction with title, meta description, headings,
  paragraphs, and list items.
- `operator-source.draft.json`: a draft normalized to the current operator source
  shape for editorial review.

The script does not overwrite [src/data/operator-source.json](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.json)
unless `--write-operator-source` is passed explicitly. Treat that flag as a
promotion step after reviewing and sanitizing the draft.

### Documents

Use Docling through [scripts/ingestion/docling-convert.mjs](/Users/dev/Projects/Travel%20Agency/scripts/ingestion/docling-convert.mjs):

```bash
npm run ingest:docling -- --input ./operator-itinerary.pdf
```

The wrapper looks for Docling in this order:

- `DOCLING_BIN`
- `docling` on `PATH`
- `uv run --project /Users/dev/Projects/tools/docling docling`

Converted Markdown or JSON lands under `.artifacts/ingestion/documents` unless
`--out` is provided. Docling stays behind this local/server-side workflow; it
should not be imported into browser or mobile runtime code.
