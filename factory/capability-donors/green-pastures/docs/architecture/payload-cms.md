# Payload CMS

The project includes a minimal Payload CMS scaffold for editorial content:

- `/admin/cms` - Payload admin UI
- `/api/payload` - Payload REST API
- `/api/payload/graphql` - GraphQL API
- `/api/payload/graphql-playground` - GraphQL Playground

Collections are defined in `payload.config.ts`:

- `treks`
- `guides`
- `photos`
- `operator-sources`
- `users` for CMS auth

`src/lib/payload-content.ts` exposes server-side adapters that read Payload when both required environment variables are present. If Payload is not configured or cannot connect, the adapters fall back to the static data in `src/data/*`, so existing public pages can continue to build and run.

## Environment

Static pages and the adapter fallback do not require Payload environment variables.

To run the CMS admin/API, set:

```bash
DATABASE_URI=postgres://USER:PASSWORD@HOST:5432/DATABASE
PAYLOAD_SECRET=a-long-random-secret
```

Without these values, `/admin/cms` and `/api/payload` should be treated as unavailable. The config includes development-only placeholder values so Next can compile the app in static/fallback mode, but a real database and secret are required for CMS use.
