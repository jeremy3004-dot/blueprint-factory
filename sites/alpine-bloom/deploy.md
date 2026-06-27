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

- Build: `pnpm --filter alpine-bloom build`
- Preview: `pnpm --filter alpine-bloom dev`
- Current local preview: `http://localhost:3042`

## Required Secrets

- None.

## Preview APIs

- `POST /api/book`
- `POST /api/chat`
- `GET /api/admin/dashboard`
- `POST /api/admin/bookings`
- `PATCH /api/admin/bookings/[bookingId]`
- `POST /api/admin/trips`
- `POST /api/admin/assignments`
- `POST /api/admin/guides`

All admin and booking behavior is demo/local-preview only until a real storage and notification backend is approved.

## Deploy Notes

Production deploy approved by Jeremy for sharing.
Local Vercel project metadata is kept in `app/.vercel/` and ignored from git.
