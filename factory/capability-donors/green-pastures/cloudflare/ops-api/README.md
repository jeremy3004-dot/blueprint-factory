# Cloudflare Ops API

Production-minded Cloudflare Worker + D1 backend for the trekking ops dashboard.

## What It Provides

- `POST /bookings` stores a booking request and attempts a team email when an email binding is configured.
- `GET /admin/dashboard?tenantId=...` returns bookings, guides, trips, assignments, and current guide unavailability.
- `PATCH /admin/bookings/:id` updates booking request status and editable lead details.
- `POST /admin/trips` creates a trip from a booking request.
- `POST /admin/guides` adds a guide to the assignment tracking roster.
- `PATCH /admin/guides/:id` updates a guide tracking profile.
- `POST /admin/assignments` assigns a guide to a trip after date-overlap checks.
- `DELETE /admin/assignments/:id` removes a guide assignment.
- `GET /health` returns a lightweight health payload.

All non-health endpoints require:

```http
Authorization: Bearer <OPS_API_TOKEN>
Content-Type: application/json
```

## Setup

```bash
cd cloudflare/ops-api
cp wrangler.example.toml wrangler.toml
wrangler d1 create gptrek-ops
```

Copy the returned D1 `database_id` into `wrangler.toml`, then set the API token as a secret:

```bash
wrangler secret put OPS_API_TOKEN
```

Apply migrations:

```bash
wrangler d1 migrations apply gptrek-ops --local
wrangler d1 migrations apply gptrek-ops --remote
```

Run locally:

```bash
wrangler dev
```

Deploy:

```bash
wrangler deploy
```

## Environment And Bindings

- `DB`: required D1 binding.
- `OPS_API_TOKEN`: required secret for all write/read ops endpoints.
- `DEFAULT_TENANT_ID`: optional fallback tenant, example `green-pastures`.
- `TEAM_EMAIL`: optional destination for new booking notifications.
- `EMAIL_FROM`: optional sender address for booking notifications.
- `BOOKING_EMAIL`: optional Cloudflare email binding. If absent or failing, bookings still persist and the API returns `emailSent: false`.

For the GPTrek deployment, Cloudflare Email Sending was not yet authorized for the account at setup time. The backend is already coded for the binding, so enabling Email Sending later only requires adding the binding/secrets and redeploying the Worker.

No secrets should be committed. Keep them in Cloudflare secrets or environment-specific deployment config.

## Request Examples

Create booking:

```bash
curl -X POST "$OPS_API_URL/bookings" \
  -H "authorization: Bearer $OPS_API_TOKEN" \
  -H "content-type: application/json" \
  -d '{
    "tenantId": "green-pastures",
    "fullName": "Asha Rai",
    "email": "asha@example.com",
    "departureWindow": "2026-10-15",
    "routeSlug": "everest-base-camp",
    "groupSize": "4 travelers",
    "style": "Private guided",
    "addons": ["Helicopter return"],
    "notes": "Vegetarian meals."
  }'
```

Create trip from booking:

```bash
curl -X POST "$OPS_API_URL/admin/trips" \
  -H "authorization: Bearer $OPS_API_TOKEN" \
  -H "content-type: application/json" \
  -d '{"tenantId":"green-pastures","bookingId":"<booking-id>"}'
```

Create or update a guide profile:

```bash
curl -X POST "$OPS_API_URL/admin/guides" \
  -H "authorization: Bearer $OPS_API_TOKEN" \
  -H "content-type: application/json" \
  -d '{
    "tenantId": "green-pastures",
    "name": "Tenzing Lama",
    "role": "Langtang and family trek lead",
    "regions": ["Langtang", "Helambu"],
    "languages": ["English", "Nepali", "Tibetan"],
    "certifications": ["Licensed trekking guide"],
    "active": true
  }'
```

Assign a guide:

```bash
curl -X POST "$OPS_API_URL/admin/assignments" \
  -H "authorization: Bearer $OPS_API_TOKEN" \
  -H "content-type: application/json" \
  -d '{"tenantId":"green-pastures","tripId":"<trip-id>","guideId":"maya-sherpa","role":"Lead guide"}'
```

Guide assignment rejects with `409 guide_conflict` when the guide already has an overlapping active trip assignment or overlapping unavailability.
