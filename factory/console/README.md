# Operator Console

Visual dashboard for Blueprint Factory — browse projects, **Nepal prospects**, donor shelf, **commission
workflows**, and hand long jobs to Cursor.

## Commission workflows (v1)

The console can **run factory commands**, not just generate call phrases:

| Action | Where | Runs automatically | Still needs Cursor |
|--------|-------|-------------------|-------------------|
| **Scout prospects** | Prospects tab banner | Export CSV from scout DB | AI search for new lanes |
| **Stock donors** | Restock tab | `blueprint:capture` for explicit URLs | Beauty audition, sector picks |
| **Match & build** | Matchmaker | adopt → capture → tokens → build → preview deploy | Art direction, pixel clone, Beauty Pass |

Top **commission strip** (Scout prospects · Stock donors · Match & build) jumps to each workflow.

**Inbox** shows jobs with status chips (`running` / `done` / `failed`), expandable logs, and **View results** links back to Prospects, Donor Shelf, or Projects.

Jobs are stored in `factory/inbox/jobs/` (see `factory/inbox/README.md`).

## Two ways to use it

| Mode | Best for | Bookmark | Data | Create inbox tasks |
|------|----------|----------|------|-------------------|
| **Local (recommended)** | Day-to-day work on your Mac | `http://blueprint.local:4177` | Live from your repo | Yes |
| **Vercel hosted** | Check status from phone / another machine | Your `*.vercel.app` URL | Snapshot at last deploy | No — copy call phrase only |

---

## Permanent local (survives terminal close)

One-time install. Asks for your Mac password once to add `blueprint.local` to `/etc/hosts`.

```bash
pnpm blueprint:console:install
```

Then bookmark: **http://blueprint.local:4177**

What it does:
- Runs the console in the background (macOS launchd)
- Restarts automatically on login
- Uses a friendly hostname instead of remembering a port

Logs: `~/Library/Logs/blueprint-console.log`

Remove:
```bash
pnpm blueprint:console:uninstall
```

### Quick session (temporary)

If you don't want the background service:

```bash
pnpm blueprint:console
```

Open http://localhost:4177 — stops when you close the terminal.

---

## Hosted on Vercel (bookmark from anywhere)

Deploys a **snapshot** of your factory state. Re-deploy when you want fresh numbers.

```bash
pnpm blueprint:console:deploy
```

This exports `snapshot.json`, deploys to Vercel preview, and records the URL in `factory/console/deploy.md`.

### Password protection

Pick one:

1. **Vercel Deployment Protection** (easiest): Vercel dashboard → your console project → Settings → Deployment Protection → enable password for preview deployments.

2. **Environment variable**: set `CONSOLE_PASSWORD` on the Vercel project. The browser will prompt once; credentials are stored for the session.

Hosted mode does **not** write to `factory/inbox/`. Use the New Job form to generate a call phrase and copy it into Cursor, or use your local console for full inbox support.

---

## Cursor handoff

Tasks created locally land in `factory/inbox/*.md`. Tell Cursor:

> Pick up the pending task in factory/inbox/

Or paste the call phrase from the console directly into chat.

Future: Cursor automations can watch `factory/inbox/` for new `Status: pending` files.

---

## Commands

| Command | What it does |
|---------|--------------|
| `pnpm blueprint:console` | Start temporary local server |
| `pnpm blueprint:console:install` | Permanent local service + blueprint.local |
| `pnpm blueprint:console:uninstall` | Remove background service |
| `pnpm blueprint:console:snapshot` | Export snapshot.json only |
| `pnpm blueprint:console:deploy` | Snapshot + deploy to Vercel preview |

### Guided tour

New operators can take a **2-minute product tour** from **Settings → Start tour**, or from the first-visit banner.
Step copy and targets live in `factory/console/tour-steps.js` — see `factory/console/TOUR.md` when you change nav or workflows.

### Job API (local server)

- `POST /api/jobs/prospect-search` — `{ lane, region?, notes? }`
- `POST /api/jobs/shelf-capture` — `{ request, urls?, notes? }`
- `POST /api/jobs/clone-pair` — matchmaker payload
- `GET /api/jobs`, `GET /api/jobs/:id` — list jobs and log tail

After updating console code, **restart the launchd service** so the background agent picks up changes:

```bash
pnpm blueprint:console:uninstall && pnpm blueprint:console:install
```

Or for a one-off session: `pnpm blueprint:console` (Ctrl+C to stop).

---

## Files

```
factory/console/
  index.html, styles.css, app.js   # UI
  api/data.js, api/tasks.js        # Vercel serverless routes
  snapshot.json                    # Generated at deploy (gitignored)
  vercel.json
  deploy.md                        # Recorded preview URL
factory/inbox/                     # Task drop folder (local only)
factory/inbox/jobs/                # Async job JSON + logs (gitignored)
factory/scripts/console-jobs.ts    # Job runner
```
