# Clone Plan: Blueprint Factory — Live Demos

This is an original Blueprint Factory showcase, not a donor clone.

## Stack

- Next.js App Router
- React client component for carousel controls
- Typed registry at `src/data/projects.ts`
- Static screenshot imports from `public/screenshots/`
- Tailwind CSS v4 via `@import "tailwindcss"`
- Google Fonts via `next/font`

## Pages / Routes

| Route | Purpose |
| --- | --- |
| `/` | Portfolio showcase |

## User Flows

1. Land on introduction and read project count.
2. Scroll or swipe the horizontal demo rail.
3. Use previous/next or arrow keys to move between cards.
4. Click **View Live Demo** to open the full site in a new tab.
5. Scan the static index for a specific project without motion.

## States

- Carousel active card index
- Disabled previous/next at bounds
- Reduced-motion scroll behavior
- Keyboard focus outlines on controls and rail

## Assets

- Five desktop screenshots (1440×900) in `public/screenshots/`
- Instrument Serif + IBM Plex Sans

## Adding A Future Demo

1. Capture or add a desktop screenshot to `public/screenshots/`.
2. Import it in `src/data/projects.ts`.
3. Append one typed project record with name, category, description, and public `https://` URL.
4. Run lint, tests, and production build.

## Out Of Scope

- Database, CMS, auth, analytics, contact forms
- iframe embeds
- Combining demos into one application
