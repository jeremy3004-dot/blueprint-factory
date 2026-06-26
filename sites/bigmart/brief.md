# Brief: bigmart

Status: draft

## What This Site Is

A premium, campaign-style landing page concept for BigMart Nepal. It reframes the supermarket as a warm neighborhood retail brand with a useful app layer, not just an online grocery catalog.

## Audience

Kathmandu shoppers who already recognize BigMart, new customers comparing grocery options, and brand stakeholders evaluating how BigMart could feel with stronger digital taste.

## Inputs Provided

- User command: `$blueprint run bigmart`.
- User rejection of the first draft as terrible.
- BigMart official site metadata: “Your Neighbor ( तपाईंको छिमेकी )”.
- Official BigMart public asset manifest, including logo, grocery banners, app screenshots, offer imagery, and product/category imagery.
- App/public listing themes: store selection, product search, categories, offers, vouchers, purchase history, and in-store purchase/collection language.

## Source Notes

The first draft failed because it invented diagrammatic grocery visuals and rubber-stamped itself through the factory. The rebuild uses real BigMart assets and keeps claims conservative. Exact store counts and production service promises still need current owner approval before deployment.

## Required Pages Or Sections

- First-screen campaign hero with official logo, “Your Neighbor,” produce photography, real app screenshot, and shutter reveal.
- Editorial market section using real grocery imagery.
- App story section centered on the actual BigMart app screenshot.
- Neighborhood proof section that keeps the brand local and store-rooted.

## Deploy Expectation

Local preview and QA only. Ask before production deploy.

## Ready Criteria

- Factory tests pass.
- `pnpm blueprint:art bigmart` passes.
- `pnpm --filter bigmart build` passes.
- Desktop and mobile screenshots exist and are visually reviewed.
- Motion capture exists and shows the opening shutter reveal.
- Visual review includes named reference comparisons and explicit scores.
