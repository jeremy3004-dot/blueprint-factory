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

## Preview APIs

- `POST /api/book`
- `POST /api/chat`
- `GET /api/admin/dashboard`
- `POST /api/admin/bookings`
- `PATCH /api/admin/bookings/[bookingId]`
- `POST /api/admin/trips`
- `POST /api/admin/assignments`
- `DELETE /api/admin/assignments/[assignmentId]`
- `POST /api/admin/guides`
- `PATCH /api/admin/guides/[guideId]`
- `POST /api/admin/login`
- `POST /api/admin/logout`

Admin endpoints require admin access. Admin and booking behavior is still demo/local-preview only until a real storage and notification backend is approved.

## Deploy Notes

Production deploy approved by Jeremy for sharing.
Local Vercel project metadata is kept in `app/.vercel/` and ignored from git.
