# Deploy: Alpine Bloom

Profile: vercel-production

## Target

- Vercel project: `app`
- Public URL: https://app-nine-wine-27.vercel.app
- Deployment: `dpl_4YXhh7WAQW7kgpyvT6wgAqRKbDLJ`

## Environments

- Production Vercel deployment.
- Local Next.js preview for development.

## Commands

- Build: `npm run build` from `sites/alpine-bloom/app`
- Preview: `npm run dev -- --port 3042` from `sites/alpine-bloom/app`
- Current local preview: `http://localhost:3042`

## Required Secrets

- Public site: none.
- Admin production access is locked unless one of these is configured:
  - Cloudflare Access: `CLOUDFLARE_ACCESS_AUD`, `CLOUDFLARE_ACCESS_TEAM_DOMAIN`
  - Bootstrap password: `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD` or `ADMIN_BOOTSTRAP_PASSWORD_SHA256`, and dedicated `ADMIN_SESSION_SECRET`
- Optional role settings: `ADMIN_SUPERADMIN_EMAIL`, `ADMIN_SUPERADMIN_EMAILS`
- Durable ops backend is setup-required until both are configured:
  - `OPS_API_URL`
  - `OPS_API_TOKEN`
- Optional model-backed concierge:
  - `ANTHROPIC_API_KEY`, optional `ANTHROPIC_MODEL`
  - `OPENAI_API_KEY`, optional `OPENAI_MODEL`
- Optional PostHog-style analytics:
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`)

## Preview APIs

- `POST /api/book`
- `POST /api/chat`
- `GET /api/admin/dashboard`
- `GET /api/admin/brief`
- `POST /api/admin/draft`
- `POST /api/admin/bookings`
- `PATCH /api/admin/bookings/[bookingId]`
- `POST /api/admin/trips`
- `POST /api/admin/assignments`
- `DELETE /api/admin/assignments/[assignmentId]`
- `POST /api/admin/guides`
- `PATCH /api/admin/guides/[guideId]`
- `POST /api/admin/login`
- `POST /api/admin/logout`

Admin endpoints require admin access. Without `OPS_API_URL` and `OPS_API_TOKEN`, `/admin` shows setup-required preview data, public booking returns a not-stored preview response, and admin write endpoints return `503` instead of mutating local demo state. With both ops env vars present, server routes send `tenantId: alpine-bloom` to the external ops API.

Public concierge and admin draft assist use `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` or `OPENAI_API_KEY` / `OPENAI_MODEL` when available, otherwise they fall back locally. Public chat prefers Anthropic when both providers are present, caps recent message context, formats model replies before display, and keeps `/book` as the proposal CTA. Draft assist is guarded for Alpine Bloom's women-only guide rule and route slug whitelist.

Analytics is inert unless `NEXT_PUBLIC_POSTHOG_KEY` is configured. When enabled, the site sends pageviews, booking submit/fail, chat opened/prompt sent, and admin viewed/login viewed events with coarse metadata only. It intentionally does not send traveler names, emails, notes, booking IDs, guide names, or raw chat prompt text.

## Deploy Notes

Production deploy approved by Jeremy for sharing.
Local Vercel project metadata is kept in `app/.vercel/` and ignored from git.
