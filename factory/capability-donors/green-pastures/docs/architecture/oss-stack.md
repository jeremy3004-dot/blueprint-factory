# Open Source Stack

This app is intentionally built on permissive open tooling so it can move fast now and stay flexible later.

## Core platform
- Next.js, frontend and routing, MIT
- React, UI runtime, MIT
- TypeScript, type safety, Apache 2.0
- Tailwind CSS, styling system, MIT

## UX layer
- Framer Motion, premium motion system
- Embla Carousel, photo storytelling carousel
- Lucide React, lightweight iconography
- React Hook Form + Zod, booking form validation
- Contextual route links can preselect the booking form route with `/book?route=<slug>`

## Backend-ready layer
- The active booking path is now designed for a Cloudflare operations backend: `/api/book` validates the traveler request, then forwards it to `OPS_API_URL` using `OPS_API_TOKEN`
- Cloudflare D1 is the target system of record for booking requests, trips, guide assignments, and guide availability
- Cloudflare Email Service is the target immediate-alert channel for team notifications when a proposal arrives; until the Email Sending binding is enabled, booking persistence stays active and the API reports `emailSent: false`
- `/admin` is the internal operations surface and should be exposed as `admin.gptrek.com` behind Cloudflare Access
- The previous Supabase scaffold remains in the repo as a reference migration, but new operations work should target the Cloudflare backend
- `/api/chat` now prefers Anthropic's Messages API when `ANTHROPIC_API_KEY` is configured, uses `ANTHROPIC_MODEL` when present, retries a fallback Anthropic model if the first one is unavailable, never selects Opus, falls back to OpenAI's Responses API when `OPENAI_API_KEY` is configured, and uses the local domain-aware engine otherwise
- For traveler booking intent, the AI concierge must make the on-site Book tab/form at `/book` the primary call to action; direct email, WhatsApp, and phone are secondary follow-up options
- MapLibre GL JS powers the route explorer with terrain DEM, hillshade, route geometry, and stop markers
- PostHog product analytics is available through `posthog-js` when `NEXT_PUBLIC_POSTHOG_KEY` is configured; without the key, page views and booking/chat/admin login events no-op safely
- Payload CMS is mounted at `/admin/cms` with REST and GraphQL under `/api/payload`; public route pages read through Payload-aware adapters with static-data fallback when CMS env is absent
- dnd-kit now backs admin pipeline and guide assignment drag/drop while preserving native drag/drop fallback behavior
- FullCalendar renders the admin trip schedule using OSS day-grid plugins
- Crawlee and Docling power server-side ingestion scripts that write reviewable artifacts before any source data promotion

## Why this matters
- The build is deployable to Vercel right away
- Live AI and booking persistence activate by environment configuration, not by redesign
- Future trekking-company clones can swap tenant/company config, D1 bindings, Access policy, and alert email without rebuilding the product model
- The booking surface, route catalog, terrain explorer, and AI planner are already structured as product surfaces, not static mockups
