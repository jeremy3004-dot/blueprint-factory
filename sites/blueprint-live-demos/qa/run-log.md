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
| Green Pastures Adventures | 200 | Production |
| Alpine Bloom | 200 | Production |
| Everest Tours | 200 | Public preview refreshed 2026-07-11 |
| Jeremy Joseph Curry | 200 | Production |
| Gurkha Fit | 200 | Production |

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

- All eleven project URLs are public without authentication.
- The showcase remains on its public preview alias; production promotion remains approval-gated.

### 2026-07-11T06:31:04.537Z

- Deployed Vercel preview: https://blueprint-live-demos.vercel.app (verified 200, shareable). Recorded in deploy.md. Not production.

### 2026-07-11T12:54:07+05:45

- Refreshed public alias: https://blueprint-factory-live-demos.vercel.app
- Live browser proof: correct page title, six-project copy, 12 rendered CTAs, six unique destination URLs, and a 342px carousel card inside a 390px mobile viewport.

### Ten-project expansion 2026-07-11

- Added four verified portfolio projects: Green Pastures Adventures, Alpine Bloom, Everest Tours, and Jeremy Joseph Curry.
- Refreshed the desktop and mobile evidence with 10 index entries and a `01 / 10` carousel counter.
- Verified the longer index stays readable and contained at 1440px and 390px widths.
- Refreshed `https://blueprint-factory-live-demos.vercel.app` and verified 20 CTAs, 10 unique links, and HTTP 200 for every destination.

### Gurkha Fit Addition 2026-07-11

- Verified `https://gurkhafit.app` and `https://www.gurkhafit.app` return the current production fitness website with HTTP 200.
- Added the eleventh registry entry and live screenshot.
