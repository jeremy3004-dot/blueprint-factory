# Deploy: avya-club

Profile: Vercel | Cloudflare static | Cloudflare Worker
Production URL:
Preview URL: https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app
Backend: none | Supabase

## Notes

### Preview deploy 2026-07-10T21:20:55.570Z

- https://avya-club-mntns5687-jeremys-projects-379e354f.vercel.app (Vercel **preview**, verified HTTP 200). Not production.
- Public shareability: protected. Direct unauthenticated requests redirect to Vercel SSO.

### Preview deploy 2026-07-10T21:21:47.447Z

- https://avya-club-qqf3z9ees-jeremys-projects-379e354f.vercel.app (Vercel **preview**, verified HTTP 200). Not production.
- Public shareability: protected. Direct unauthenticated requests redirect to Vercel SSO.

## Owner action before external review

Disable Vercel Deployment Protection for this project's preview deployments: Vercel dashboard → project → Settings → Deployment Protection. Do not bypass the protection in application code. After changing the setting, rerun `pnpm blueprint:verify avya-club <preview-url>` and confirm a direct unauthenticated request returns the Avya site rather than a `302` to `vercel.com/sso-api`.

### Preview deploy 2026-07-10T21:49:58.820Z

- https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app (Vercel **preview**; authenticated deploy helper reached HTTP 200). Not production.
- Public shareability: **protected**. An independent unauthenticated request returned HTTP `302` to `https://vercel.com/sso-api` on 2026-07-11. The deploy helper's “shareable” result was a false positive.
