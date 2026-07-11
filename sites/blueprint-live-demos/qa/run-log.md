# QA Run Log: Blueprint Factory — Live Demos

Date: 2026-07-11

## Build Verification

- `pnpm --filter blueprint-live-demos lint` — pass
- `pnpm --filter blueprint-live-demos test` — pass (4 tests)
- `pnpm --filter blueprint-live-demos build` — pass
- Root `pnpm test` — pass (111 factory script tests)

## Link Verification

| Demo URL | HTTP | Notes |
| --- | --- | --- |
| Ambika Juice | 200 | Public |
| Americana Grill | 200 | Public |
| San Chon | 200 | Public |
| Dorje's Resort & Spa | 200 | Public |
| The Juicery Cafe | 200 | Public |
| Avya Club | 200 | Public |

## Interaction Checks

- Carousel previous/next buttons scroll the rail and disable at bounds.
- Arrow key navigation moves between cards.
- Native horizontal scroll + scroll snapping works without JS animation.
- Static index lists all registry projects with matching metadata.
- Every card and index row exposes **View Live Demo** opening a new tab.
- `prefers-reduced-motion` path uses instant scroll behavior in the carousel controller.
- Mobile cards use CSS flex-basis before hydration; the 390px capture verifies the full CTA remains inside the viewport.

## Screenshots

- Desktop: `qa/compare/build/desktop.png`
- Mobile: `qa/compare/build/mobile.png`

## Release State

- All six demo URLs are public without authentication.
- The showcase remains on its public preview alias; production promotion remains approval-gated.

### 2026-07-11T06:31:04.537Z

- Deployed Vercel preview: https://blueprint-live-demos.vercel.app (verified 200, shareable). Recorded in deploy.md. Not production.
