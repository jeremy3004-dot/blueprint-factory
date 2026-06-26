# Brief: bigmart

Status: draft

## What This Site Is

A high-craft concept landing page for BigMart Nepal, positioning the supermarket as the neighborhood grocery network that connects nearby shelves, offers, loyalty, and quick pickup.

## Audience

Kathmandu Valley shoppers who already know BigMart stores, plus new mobile-first customers comparing organized grocery options.

## Inputs Provided

- User command: `$blueprint run bigmart`.
- BigMart official web presence at `https://bigmart.com.np/`.
- App Store and Google Play listings describing loyalty vouchers, purchase history, offers, product browsing, cart/order, and collect-from-store behavior.
- LinkedIn company page describing Big Mart Nepal as a Kathmandu-based supermarket chain founded in 2009 with dozens of stores.

## Source Notes

This is a concept rebuild, not an official production site. Brand claims are kept conservative and source-backed: neighborhood supermarket, loyalty, offers, purchase history, product browsing, and store collection. Exact store counts are treated as unstable and should be confirmed before production copy.

## Required Pages Or Sections

- First-screen hero with the route-drawing signature moment.
- Neighborhood store promise and app/service highlights.
- Offer strip, loyalty receipt, and shopping categories.
- Mobile-safe layout with no production checkout or backend.

## Deploy Expectation

Local preview and QA only. Ask before production deploy.

## Ready Criteria

- `pnpm blueprint:art bigmart` passes.
- `pnpm --filter bigmart build` passes.
- Desktop and mobile screenshots exist.
- Motion capture exists because the hero animation is part of the concept.
- Visual review records source assumptions and next production checks.
