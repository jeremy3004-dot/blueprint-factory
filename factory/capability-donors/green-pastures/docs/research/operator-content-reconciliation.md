# Operator Content Reconciliation

## Goal

Extend the existing Himalayan Passage route catalog with richer third-party trek
detail without replacing the current design system, page structure, or editorial
voice.

## Source acquisition

We used multiple scraping approaches:

- direct HTML inspection of the public site
- JavaScript bundle inspection to discover route patterns and API endpoints
- direct API scraping of the public package endpoints

The normalized snapshot now lives in
[src/data/operator-source.json](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.json)
with typed accessors in
[src/data/operator-source.ts](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.ts).

## What we pulled in

- additional Nepal trekking routes not previously present in the catalog
- richer itinerary staging for overlapping routes
- include/exclude package notes
- operator season, accommodation, group-size, and difficulty metadata
- public source pricing where the snapshot exposed it

## Reconciliation rules

- Keep the current Himalayan Passage layout and visual system intact.
- Keep the existing route architecture when the source package is only an adjacent
  variant, not a perfect one-to-one match.
- Treat operator-listed rates as reference data, not guaranteed equivalents to our
  own house itinerary.
- If the source snapshot does not expose a public rate, show that honestly rather
  than inventing one.

## Known caveats

- Some source routes publish duration windows that do not line up exactly with the
  existing catalog durations.
- Some source products bundle alternate side routes or access assumptions, so route
  detail can be richer than our original page but still not be an exact commercial
  twin.
- A few source prices looked suspicious during research and should be manually
  validated before using them in any pricing-led marketing copy.

## Files touched by the integration

- [src/data/treks.ts](/Users/dev/Projects/Travel%20Agency/src/data/treks.ts)
- [src/data/operator-source.ts](/Users/dev/Projects/Travel%20Agency/src/data/operator-source.ts)
- [src/lib/operator-dossier.ts](/Users/dev/Projects/Travel%20Agency/src/lib/operator-dossier.ts)
- [src/components/trek-explorer.tsx](/Users/dev/Projects/Travel%20Agency/src/components/trek-explorer.tsx)
- [src/app/treks/[slug]/page.tsx](/Users/dev/Projects/Travel%20Agency/src/app/treks/[slug]/page.tsx)
