# Deploy: jeremy-joseph-curry

Profile: Cloudflare static
Production URL: https://jeremyjosephcurry.com
Pages URL: https://jeremy-joseph-curry.pages.dev
Deployment URL: https://19a7cf59.jeremy-joseph-curry.pages.dev
Backend: none

## Build

Run from the factory root:

```bash
pnpm --dir sites/jeremy-joseph-curry/app build
```

Static output:

```text
sites/jeremy-joseph-curry/app/out
```

## Dependency lock authority

`/Users/dev/.codex/worktrees/4d74/BLUEPRINT FACTORY/pnpm-workspace.yaml` includes `sites/*/app`, so the repository-root `pnpm-lock.yaml` is authoritative for normal workspace operations. Its `sites/jeremy-joseph-curry/app` importer is pinned to the exact versions in this app's `package.json`.

The app's nested `pnpm-lock.yaml` is retained as an intentionally aligned standalone release snapshot. Its `.` importer is semantically identical to the root lock's `sites/jeremy-joseph-curry/app` importer. Do not run a normal non-frozen install from the app and silently choose whichever lock happens to be nearest.

Reproduce the site install against the authoritative root lock without asking pnpm to validate or rewrite unrelated workspace importers:

```bash
cd '/Users/dev/.codex/worktrees/4d74/BLUEPRINT FACTORY/sites/jeremy-joseph-curry/app'
pnpm install --frozen-lockfile --ignore-workspace \
  --lockfile-dir '/Users/dev/.codex/worktrees/4d74/BLUEPRINT FACTORY'
```

The nested standalone snapshot can be verified independently with:

```bash
cd '/Users/dev/.codex/worktrees/4d74/BLUEPRINT FACTORY/sites/jeremy-joseph-curry/app'
pnpm install --frozen-lockfile --ignore-workspace
```

Both commands were verified with pnpm `10.32.1`. A root `pnpm install --frozen-lockfile --filter jeremy-joseph-curry...` is not a safe substitute in the current monorepo: pnpm validates every workspace manifest first, and the unrelated `sites/donor-ace-hotel/app` importer is currently absent/outdated in the pre-existing root lock. The scoped commands above preserve unrelated importers while enforcing the Jeremy app's exact lock entry.

## Cloudflare Pages

Wrangler is installed at `/opt/homebrew/bin/wrangler`.

Auth verified on 2026-07-08:

```text
wrangler whoami -> jeremyjcurry@gmail.com, Pages write permission present
```

Deploy command used after explicit production approval:

```bash
cd sites/jeremy-joseph-curry/app
wrangler pages deploy out --project-name jeremy-joseph-curry
```

Latest production update command used on 2026-07-09:

```bash
cd sites/jeremy-joseph-curry/app
wrangler pages deploy out --project-name jeremy-joseph-curry --branch main --commit-dirty=true --commit-message "Update Jeremy Joseph Curry selected work and search metadata"
```

Cloudflare Pages project: `jeremy-joseph-curry`

Custom domains were added through the Cloudflare Pages API:

- `jeremyjosephcurry.com`
- `www.jeremyjosephcurry.com`

DNS records were added in the Cloudflare dashboard after Jeremy signed in:

```text
Type: CNAME
Name: @
Target: jeremy-joseph-curry.pages.dev
Proxy: on

Type: CNAME
Name: www
Target: jeremy-joseph-curry.pages.dev
Proxy: on
```

Cloudflare Pages status checked on 2026-07-08:

```text
jeremyjosephcurry.com: active
www.jeremyjosephcurry.com: pending in Pages UI, but serving HTTP 200 through Cloudflare edge
```

## Email Routing

Email Routing is enabled for `jeremyjosephcurry.com`.

Active rule:

```text
hello@jeremyjosephcurry.com -> jeremyjcurry@gmail.com
```

Public DNS already reports Cloudflare Email Routing MX records.

## Production Gate

Production deploy was approved by Jeremy and completed on 2026-07-08. Donor media is reference-only and does not ship from the app.

## Canonical host redirect gate

Cloudflare Pages `_redirects` does not support domain-level redirect matching, so do not add a host-blind path rule to this static bundle. It could redirect apex traffic too and create a loop.

Provider reference: [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/) lists domain-level redirects as unsupported in `_redirects`; use a zone-level Single Redirect for this host change.

Before the next production release is considered complete, the deployment owner must create or verify one Cloudflare zone-level **Single Redirect** with this exact host-scoped behavior:

```text
Incoming wildcard URL: http*://www.jeremyjosephcurry.com/*
Target URL: https://jeremyjosephcurry.com/${2}
Status: 301
Preserve query string: enabled
```

The source match includes only the `www` hostname, so the apex target cannot match the same rule. Verify with a unique path and query string that the response has one redirect, preserves path/query, and finishes at the apex HTTPS URL. This is an external Cloudflare configuration gate; source implementation does not authorize creating or changing the rule.

Run this exact check after deployment:

```bash
actual=$(curl --silent --show-error --location --max-redirs 2 --output /dev/null \
  --write-out '%{http_code}|%{url_effective}|%{num_redirects}' \
  'http://www.jeremyjosephcurry.com/about?task3=authority')
test "$actual" = '200|https://jeremyjosephcurry.com/about?task3=authority|1'
```
