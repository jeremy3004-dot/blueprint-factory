# Worker Notes

## 2026-07-10

- `pnpm install --frozen-lockfile` failed with `ERR_PNPM_OUTDATED_LOCKFILE`: the checked-in lockfile
  is out of sync with `sites/donor-ace-hotel/app/package.json`. I reused the existing workspace
  `node_modules` instead of changing a shared lockfile outside this job.
- The supplied donor URL currently returns a Vercel Security Checkpoint to simple HTTP requests.
  The repo already contains a successful `donor-gymkhana` capture from `gymkhanalondon.com` with the
  expected Gymkhana presentation, so that evidence pack is the visual source of truth.
- The donor shelf topology and clone plan were auto-generated but still contained every `AGENT`
  placeholder. I verified the screenshots and motion contact sheet and completed both documents.
- The brand-source capture harvested only `/` even though the Wix sitemap lists 9 routes. I audited
  each route with Playwright and reconciled the scope manually.
- The live Wix site contains stale template material: California market copy, San Francisco address,
  `info@mysite.com`, `123-456-7890`, invented contact names, paragraph placeholders, and failed
  widgets. I excluded those claims and kept only facts corroborated by the cafe's home, food, event,
  and footer content.
- Judgment call: "full website" means all useful public customer routes, not reproducing a broken
  account widget. `/my-account` is deferred and `/events-1` will redirect to the consolidated events page.
- Reference-library fit: `masthead-reveal` and `scroll-reveal` cover the required motion; no new
  dependency or unproven motion pattern is needed.
- Supplemental source conflict: the older Wix site says 7:30am-8pm; the claimed, business-managed
  TripAdvisor listing says 7:30am-11pm daily. The build uses 11pm as the fresher source but final
  client confirmation is still required.
- TripAdvisor exposes 287 photos, including 7 menu photos, but reviewer-uploaded rights are not
  automatically cleared for production. I saved six representative images as reference-only,
  retained Wix/client media in the shipped app, and used only listing text/captions for menu facts.
- The visible TripAdvisor menu-board photo is from an older media ID and may be stale. I did not
  publish any price from it; a current cafe-supplied menu remains a client-input item.
- Process deviation: the implementation translated to client imagery/tokens before the clone-stage
  pixel measurement. Final raw pixel match improved to 68.0% desktop / 70.7% mobile but does not
  clear the clone target. Translation structure does clear its target at 85.2%, and no donor asset
  ships. This is reported plainly rather than treating a translation score as a clone score.
- The factory's Next 16 Turbopack build rejected the external worktree dependency symlink. The app
  uses the stable `--webpack` dev/build path; typecheck and production build both pass.
- The deploy helper falsely labeled a protected Vercel preview as shareable by following the 302 SSO
  redirect to a 200 login page. Independent header inspection caught it; `deploy.md` and the final
  report now state protected and give the correct dashboard setting to change.
- A second deployment check exposed a separate failure behind that login redirect: Vercel's cloud
  webpack build did not honor the app's `@/` aliases, and its unlocked install omitted TypeScript build
  packages. Relative imports plus an app-local npm lockfile produced a reproducible cloud build. The
  repaired preview is **Ready**; protection and deployment health are now reported as separate states.
