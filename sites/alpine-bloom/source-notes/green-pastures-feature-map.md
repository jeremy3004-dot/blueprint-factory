# Green Pastures Feature Map

Date: 2026-06-27
Status: implementation guide

## Source And Target

- Feature donor: `/Users/dev/Projects/Travel Agency`
- Target site: `/Users/dev/Documents/BLUEPRINT FACTORY/sites/alpine-bloom/app`
- Visual donor remains WHOA Travel. Green Pastures supplies product depth, not visual style.

## Feature Translation

| Green Pastures feature | Alpine Bloom destination | Translation rule |
| --- | --- | --- |
| Homepage route collection | Existing homepage + `/treks` | Keep the scrapbook editorial rhythm and link into real route discovery. |
| Trek explorer | `/treks` | Add filters for region, difficulty, trip style, and women-led fit. |
| Trek route dossier | `/treks/[slug]` | Route detail pages with facts, permits, seasons, package options, prep, and a scrapbook map. |
| Booking request form | `/book` and `POST /api/book` | Preview-safe proposal capture with Alpine Bloom add-ons and women-led options. |
| AI concierge | `/planner`, floating/embedded panel, `POST /api/chat` | Route-aware local fallback first; optional provider later. |
| Guide roster | Public guide sections and admin data | Young Nepali guide profiles, language, certifications, regions, women-led departures. |
| Admin ops board | `/admin` | Demo/setup mode with lead pipeline, trips, guide assignment, and conflict visibility. |
| Cloudflare ops API | Local copied/adapted API contract | Do not deploy or require secrets during this pass. |
| Payload/Supabase/content ingestion | Later backend expansion | Document but do not block first working Alpine Bloom feature port. |

## Non-Negotiables

- No runtime imports from `/Users/dev/Projects/Travel Agency`.
- No Green Pastures branding, legal identity, or color system.
- Keep Alpine Bloom colors: hot pink, white, black/ink, mint.
- Preview mode must work without external services.
- Admin can be demo-first, but it must expose the real intended workflow.
- Ask before production deploys, paid services, or secret configuration.

## First-Pass Acceptance

- Public users can browse treks, open route detail pages, plan through the concierge, and submit a booking request.
- Admin users can inspect demo leads, move through a pipeline, see trips/guides, and understand backend setup state.
- Typecheck/build passes.
- Desktop and mobile screenshots are refreshed after implementation.
