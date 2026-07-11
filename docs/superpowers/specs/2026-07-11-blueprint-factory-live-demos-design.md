# Blueprint Factory Live Demos Design

## Purpose

Create one public Blueprint Factory website that Jeremy can share as a growing portfolio of interactive website demos. Visitors land on a polished showcase, browse every published project, and open any project as a complete full-page website.

The public name is **Blueprint Factory — Live Demos**. Each project is identified as a **Live Demo** so the page does not imply that the represented business commissioned, approved, or currently operates the concept.

## Initial Collection

The first release contains six completed builds:

1. Ambika Juice
2. Americana Grill
3. San Chon
4. Dorje's Resort & Spa
5. The Juicery Cafe
6. Avya Club

Donor-shelf work and prospect-search tasks are not public projects and will not appear.

## Experience

The page should feel like a creative studio contact sheet rather than a generic portfolio template. A restrained editorial frame keeps attention on the six very different sites, while an oversized horizontal project rail gives the page one memorable interaction.

The page includes:

- A concise Blueprint Factory introduction and project count.
- A horizontally scrollable carousel with one large visual card per demo.
- Desktop previous/next controls, keyboard navigation, and touch swiping.
- A visible position indicator so visitors understand that more projects are available.
- A static project index beneath the carousel so every demo remains discoverable without motion.
- A **View Live Demo** action that opens the complete demo in a new browser tab.
- A short footer explaining that these are interactive concept demonstrations.

Each project card contains a current desktop screenshot, project name, business category, a one-line description, a **Live Demo** badge, and its public URL.

The carousel does not embed the websites in iframes. Opening independent sites preserves their layouts, performance, navigation, and full-screen motion while avoiding iframe restrictions.

## Architecture

Add a self-contained Next.js site at `sites/blueprint-live-demos/app`, following the Factory's existing per-site structure. The showcase has no database, authentication, CMS, or server-side API.

All project metadata lives in one typed registry, for example `src/data/projects.ts`. Adding a future demo requires only:

1. Add its approved screenshot to the showcase assets.
2. Add one project record with its name, category, description, screenshot, and public URL.
3. Run the showcase verification and deploy it.

The UI renders both the carousel and project index from this registry, preventing the two views from drifting apart.

## Publishing Model

Each demo remains an independent deployment. Public demo deployments use stable Blueprint-owned Vercel aliases and do not replace or attach to any represented business's official domain.

The showcase itself receives one stable public Vercel URL. The desired project alias is `blueprint-factory-live-demos.vercel.app`; if Vercel assigns a different available alias, the actual verified address is recorded in the showcase `deploy.md`.

Before the public release:

- Remove Vercel preview protection from the six intended public demos or publish stable public demo deployments.
- Verify that every link returns a successful public response without authentication.
- Keep research-only or unlicensed media out of the deployed builds.
- Record the final public URL for every demo in its `deploy.md` and in the showcase registry.
- Request the repo-required final production deployment approval immediately before publishing.

## Accessibility And Motion

- All controls have visible labels and keyboard focus states.
- Cards and controls meet practical contrast requirements.
- The carousel uses native horizontal scrolling and scroll snapping so it remains usable without JavaScript animation.
- `prefers-reduced-motion` disables animated transitions and automatic movement.
- The carousel never auto-advances; visitors control the pace.
- Images have concise alternative text and fixed aspect ratios to prevent layout shift.
- Mobile presents a swipeable card rail with a large, reachable action on every card.

## Failure Handling

- Missing screenshots fail the production build through static imports.
- Project records require a valid `https://` URL.
- Link verification reports any protected, redirected, or unavailable demo before release.
- If one demo is not safe or ready to publish, it is omitted from the registry rather than leaving a broken card.

## Verification

Before handoff:

1. Run lint, typecheck, tests, and a production build for the showcase.
2. Add tests proving all six initial records render and every CTA uses the correct external URL.
3. Check carousel buttons, keyboard navigation, touch-sized controls, and reduced-motion behavior.
4. Capture and review desktop and mobile screenshots.
5. Verify every public demo URL and the showcase URL with unauthenticated HTTP requests.
6. Open every project from the deployed showcase and confirm it reaches the intended full website.

## Out Of Scope

- Custom domains, analytics, contact forms, lead capture, or a CMS.
- Combining the six websites into one application.
- Presenting donor captures or unfinished prospect work as portfolio projects.
- Publishing to any client's real domain.
