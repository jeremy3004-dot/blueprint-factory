# Deploy: san-chon

Profile: Vercel preview
Production URL:
Preview URL: https://san-chon-6s5kof8zg-jeremys-projects-379e354f.vercel.app
Backend: none

## Notes

### Preview deploy 2026-07-10T19:46:47.596Z

- https://san-chon-btknfspqd-jeremys-projects-379e354f.vercel.app (Vercel **preview**, verified HTTP 200). Not production.
- Automated deploy output initially labeled the URL shareable because the first HTTP response was healthy.
- Browser verification on 2026-07-11 redirected the preview to Vercel login, so actual public shareability is **protected**.
- Owner action: Vercel dashboard → project → Settings → Deployment Protection → disable protection for preview deployments, then rerun `pnpm blueprint:check san-chon <preview-url>`.
- No protection bypass was attempted. Nothing was deployed to production.

### Preview build repair 2026-07-11T01:19:19Z

- The original preview build failed because `typescript: "latest"` resolved to TypeScript 7.0.2 on Vercel while the local pnpm workspace still resolved 6.0.3.
- Pinned TypeScript to 6.0.3 and reproduced the Vercel install in a clean temporary directory before redeploying.
- New preview: https://san-chon-6s5kof8zg-jeremys-projects-379e354f.vercel.app
- Vercel remote status: **Ready**. The build compiled, completed TypeScript, and prerendered `/`, `/menu`, and `/visit`.
- Deployment Protection remains enabled, so unauthenticated visitors are still redirected to Vercel login.
