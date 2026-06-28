# Cloudflare Ops Admin Design

## Goal

Move proposal requests from preview-only capture into a durable operations desk that can be duplicated for future trekking companies.

The public website remains the traveler-facing experience. The operations system becomes the internal source of truth for leads, trips, guide availability, assignments, and follow-up work.

## Recommended Production Shape

- Public site: existing Next.js app.
- Admin site: same app at `/admin`, exposed as `admin.gptrek.com`.
- Admin access: Cloudflare Access in front of `admin.gptrek.com`.
- Operations API: Cloudflare Worker at a private API hostname such as `ops-api.gptrek.com`.
- Database: Cloudflare D1.
- Team alerts: Cloudflare Email Service from the Worker when a proposal arrives.
- AI ops agent: admin-facing brief that reads the operations dashboard and highlights new leads, unassigned trips, conflicts, and next actions.

This split keeps Vercel/Next focused on UI while Cloudflare owns the low-cost durable backend. It also avoids putting D1 credentials into browser code.

## Data Model

The operations backend stores tenant-scoped records:

- `tenants`: one company workspace.
- `guides`: roster, languages, regions, certifications, active flag.
- `booking_requests`: traveler proposal requests from the public site.
- `trips`: operational departures created from requests.
- `trip_guides`: guide assignments with start/end dates.
- `guide_unavailability`: non-trip blocks such as personal leave or training.
- `admin_audit_events`: operational breadcrumbs for future accountability.

The important rule is that guide assignment is date-aware. A guide cannot be assigned to overlapping trips, and unavailable dates should block assignment too.

## Request Flow

1. Traveler submits the proposal form.
2. Next `/api/book` validates the payload.
3. Next forwards it server-side to the Cloudflare Worker using `OPS_API_TOKEN`.
4. Worker inserts the booking request into D1.
5. Worker sends a team alert email when Cloudflare Email is configured.
6. Admin team sees the new request in `/admin`, converts it into a trip, and assigns guides.

If the Worker is not configured, the public form stays in preview mode and explains that `OPS_API_URL` and `OPS_API_TOKEN` are missing.

## Current GPTrek Deployment

- Website production aliases: `gptrek.com`, `www.gptrek.com`, and `admin.gptrek.com`.
- Admin DNS: Cloudflare proxied `CNAME admin -> cname.vercel-dns.com`.
- Admin host routing: requests to `https://admin.gptrek.com/` rewrite to `/admin`.
- Operations Worker: `gptrek-ops-api` backed by the `gptrek-ops` D1 database.
- Tenant: `green-pastures`.
- Super admin identity: `jeremyjcurry@gmail.com`.
- Access protection: Cloudflare Access should be configured for `admin.gptrek.com` before team use. Production admin auth validates the signed `Cf-Access-Jwt-Assertion`, so set `CLOUDFLARE_ACCESS_TEAM_DOMAIN` and `CLOUDFLARE_ACCESS_AUD` on Vercel after the Access app is created.
- Email alerts: the Worker persists every booking now, but `emailSent` remains `false` until Cloudflare Email Sending is authorized and bound as `BOOKING_EMAIL`.

## Duplication Playbook

For another trekking company:

1. Copy the repo.
2. Update `src/data/company.ts` and `src/data/tenant.ts`.
3. Create a new Cloudflare D1 database.
4. Apply the operations migrations.
5. Deploy the Worker with a new `DEFAULT_TENANT_ID`, `TEAM_EMAIL`, `EMAIL_FROM`, and `OPS_API_TOKEN`.
6. Add `OPS_API_URL` and `OPS_API_TOKEN` to the website host.
7. Add `admin.<company-domain>` to the website host.
8. Protect `admin.<company-domain>` with Cloudflare Access.

No customer-specific logic should live inside the admin components. Tenant identity, company copy, guide seed data, and domain wiring carry the duplication.
