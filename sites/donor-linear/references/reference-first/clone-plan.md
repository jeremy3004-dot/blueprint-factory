# Clone Plan: donor-linear

Status: draft | complete -> draft (auto-captured; agent must verify)
Primary donor: linear.app
Donor URL: https://linear.app

This file is written before art direction or build work. It is the donor-forensics contract: if a builder would still need to guess pages, states, motion, assets, or stack, this plan is not complete.

## 1. Page And Route Inventory

- Homepage:
- Inner pages:
- Detail pages:
- Form, booking, checkout, account, or dashboard paths:
- Routes intentionally excluded, and why:

## 2. Flow Map

- Primary navigation:
- Conversion path:
- Forms and validation states:
- Menus, modals, tabs, accordions, filters, carousels, or media controls:
- Success, error, empty, and loading states:

## 3. Section And Responsive Rhythm

- Desktop structure:
- Tablet structure:
- Mobile structure:
- Section order and spacing rhythm:
- Typography hierarchy:

## 4. Interaction And Animation Audit

For each meaningful interaction, name the trigger, visual states, timing, and mechanism.

- Scroll-driven:
- Click-driven:
- Hover/focus:
- Timed or autoplay:
- Sticky, scroll-snap, parallax, or pinned sections:
- Video, Lottie, Rive, canvas, WebGL, or Three.js:
- Reduced-motion expectation:

## 5. Asset, Font, And Media Strategy

- Reference-only donor assets:
- Production replacement assets:
- Fonts:
- Icons and SVGs:
- Video or generated media:
- Licensing or rights notes:

## 6. Implementation Stack Decision

Write one plain sentence naming the smallest correct stack.

Example:

```text
Build in TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS transitions and a tiny IntersectionObserver/React state layer for scroll reveals. No GSAP, Three.js, CMS, auth, or database needed for this donor.
```

Decision:

> Suggested (VERIFY, then write a real Decision: line above): TypeScript + Next.js App Router + React + Tailwind with CSS transitions and a small IntersectionObserver layer. No GSAP/Three.js/CMS detected on the donor.
## 7. Tooling Explicitly Not Needed

- GSAP / ScrollTrigger:
- Three.js / WebGL / canvas:
- Lottie / Rive:
- Supabase / database:
- CMS:
- Auth:
- Other:

## 8. Builder Handoff

- Components to build:
- Shared tokens and global CSS:
- Highest fidelity risks:
- QA checks required before translation:


## Auto-Captured Evidence

Auto-drafted by `blueprint capture` on 2026-07-07T10:01:08.178Z. Mechanical fields are pre-filled; every
field below is a starting point the builder must verify against the screenshots and video.

- Sections captured: 8 (see `references/reference-first/sections/`)
- Assets inventoried: 32 (see `extraction/assets.json`, all reference-only until replaced)
- Fonts loaded: Inter Variable, Berkeley Mono, Tiempos Headline
- Animation libraries: none detected via script/global signatures
- Dominant colors (by frequency): #f7f8f8 (2735), #62666d (383), #d0d6e0 (205), #ffffff (185), #e2e4e7 (142), #8a8f98 (138), rgba(255, 255, 255, 0.05) (84), #f79ce0 (45), #08090a (25), #f7bf8b (22)
- Heading font: Inter Variable · Body font: Inter Variable
- Type scale (px, desc): 72, 64, 48, 32, 24, 20, 18, 17, 16, 15, 14, 13

### Harvested page inventory (verify + set per-page status in section 1)

- `/` — Skip to content → [footer]
- `/about` — About [footer]
- `/agents` — Agents [footer]
- `/asks` — Asks [footer]
- `/blog` — Blog [footer]
- `/brand` — Brand [footer]
- `/build` — Build [footer]
- `/careers` — Careers [footer]
- `/changelog` — Changelog [footer]
- `/changelog/2026-06-04-team-documents` — Team documentsImportant team context doesn’t always belong in a specific issue, project, or initiative. Teams also need a dedicated place for the notes, docs, and shared references that support their work over time. Now, every team has a page to keep its context organized and easy to access.Jun 3, 2026 [body]
- `/changelog/2026-06-11-coding-sessions` — Coding sessions in LinearEarlier this year, we launched Linear Agent, giving teams a new way to plan and coordinate their issues and projects. Since then, we've added Code Intelligence to extend that understanding to the codebase, and MCP support to bring all of your context together.Jun 10, 2026 [body]
- `/changelog/2026-06-18-agent-assisted-project-updates` — Agent assisted project updatesProject and initiative updates keep teams aligned, but writing them means pulling out recent changes from issues, documents, and discussions.Jun 17, 2026 [body]
- `/changelog/2026-07-02-initiative-properties` — Initiative propertiesInitiatives define your company's high-level goals and organize the projects that contribute to them. To help you manage initiatives as your roadmap grows, we've added a new set of focused initiative properties:Jun 30, 2026 [body]
- `/coding-sessions` — Coding Sessions [footer]
- `/contact` — Contact [header]
- `/contact/sales` — Contact sales [body]
- `/customer-requests` — Customer Requests [footer]
- `/customers` — Customers [header]
- `/customers/openai` — You’ll probably build a better product, just because of the craft that using Linear infuses on your brain.Gabriel PealOpenAI [body]
- `/customers/opendoor` — Linear is excellent, just excellent. It has the right opinions for fast moving teams.Kaz NejatianOpendoor [body]
- `/customers/ramp` — Our speed is intense and Linear helps us be action biased.Nik KoblovRamp [body]
- `/developers` — Developers [footer]
- `/diffs` — Diffs [footer]
- `/docs` — Docs [header]
- `/download` — Download [footer]
- `/dpa` — DPA [footer]
- `/enterprise` — Enterprise [footer]
- `/homepage` — (no label) [header]
- `/insights` — Insights [footer]
- `/intake` — Intake [footer]
- `/integrations` — Integrations [footer]
- `/join-slack` — Community [footer]
- `/legal/aup` — AUP [footer]
- `/login` — Open app [header]
- `/method` — Method [footer]
- `/mobile` — Mobile [footer]
- `/monitor` — Monitor [footer]
- `/now` — Now [header]
- `/plan` — Plan [footer]
- `/pricing` — Pricing [header]
- `/privacy` — Privacy [footer]
- `/quality` — Quality [footer]
- `/security` — Security [footer]
- `/signup` — Sign up [header]
- `/startups` — Startups [footer]
- `/switch` — Switch [footer]
- `/terms` — Terms [footer]
