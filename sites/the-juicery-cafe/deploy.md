# Deploy: the-juicery-cafe

Profile: Vercel preview (Deployment Protection enabled)
Production URL:
Preview URL: https://the-juicery-cafe-qhriiphrc-jeremys-projects-379e354f.vercel.app
Backend: none

## Notes

### Preview deploy 2026-07-10T17:36:36.174Z

- https://the-juicery-cafe-5xnzbrinz-jeremys-projects-379e354f.vercel.app (Vercel **preview**). Not production.
- Factory deploy summary reported shareable, but independent verification was deferred after the replacement preview.

### Preview deploy 2026-07-10T17:41:03.978Z

- https://the-juicery-cafe-qhriiphrc-jeremys-projects-379e354f.vercel.app (Vercel **preview**). Not production.
- Public shareability: **protected**. Independent `curl -I` returned HTTP 302 to Vercel SSO; following
  the redirect returns the Vercel login page, not the site.
- To share publicly: Vercel dashboard → project → Settings → Deployment Protection → disable
  protection for preview deployments, then verify the URL again without an authenticated session.
