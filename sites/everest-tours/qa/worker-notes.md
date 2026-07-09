# Worker Notes — Everest Tours

## 2026-07-07 18:09 +0545

- Setup followed the job card: ran `pnpm blueprint:new everest-tours`, then copied the pre-captured `donor-black-tomato` reference-first pack into the client site. No recapture performed.
- Generic `clone-website` skill expects a different repo (`/Users/dev/Projects/Ai Website Cloner`), but this job and the nearest `AGENTS.md` require staying inside Blueprint Factory, so I treated the generic skill as lower priority and used the factory-local flow.

## 2026-07-07 18:14 +0545

- Docs-first rule says to run `docs:list` or repo equivalent when available. I checked `package.json`, `README.md`, `AGENTS.md`, and `factory/` references; no docs discovery command is exposed, so I used the required README/playbooks/rubric files directly.
- Tried to generate a section contact sheet with a tiny Python/Pillow helper for faster screenshot review. It failed with `ModuleNotFoundError: No module named 'PIL'`. I did not add a dependency; continued with direct image inspection.
- `blueprint:new` does not create `sites/<slug>/pages.json`, even though the job card and status gate use it for page coverage. I created `sites/everest-tours/pages.json` manually from the scoped page plan.

## 2026-07-07 18:36 +0545

- Build judgment call: I did not ship any donor images or copy in app code. The homepage structure follows the donor, but production-safe Unsplash placeholders are used from the first app implementation. This may lower raw pixel compare versus the donor; I will log compare scores honestly.
- Reference-library patterns checked and adapted into local CSS: `scroll-reveal`, `text-reveal`, `hero-settle`, `parallax-media`, and accordion behavior via native `<details>`/footer-style controls. No import from `factory/`.
- First app build command failed: `pnpm --dir sites/everest-tours/app build` returned `sh: next: command not found` and `Local package.json exists, but node_modules missing`. This is dependency installation state, not an app code error. Next step is `pnpm install` from the factory root.
- `pnpm install --lockfile-only --filter everest-tours` still updated `pnpm-lock.yaml` with importer entries for all generated donor site apps, not only Everest. The workspace lockfile was stale for existing `sites/*/app` packages. I kept the lockfile sync rather than fighting pnpm, but this makes the Step 4 diff noisier than ideal.
- Dev server retry: `pnpm --dir sites/everest-tours/app dev -- --hostname 127.0.0.1 --port 3067` failed because Next treated `--hostname` as a project directory. Correct form is to pass args directly after the script name.

## 2026-07-07 19:18 +0545

- Preview deploy succeeded, but hosted `blueprint:verify` hit a Vercel auth/interstitial instead of the site: console errors included `Provider's accounts list is empty` and `[GSI_LOGGER]: FedCM get() rejects with NetworkError`, compare saw 1 section vs donor 12, and axe checked that protected page.
- Tried Vercel connector `_get_access_to_vercel_url` for `https://app-k0ribgyo7-jeremys-projects-379e354f.vercel.app`; it failed with `Failed to check deployment: 403 Forbidden`. I could not generate a temporary auth-bypass share URL from this session.
- Local verification remains the reliable green proof: `blueprint:verify everest-tours http://127.0.0.1:3067` passed all automated checks and produced the real 12-section compare.
