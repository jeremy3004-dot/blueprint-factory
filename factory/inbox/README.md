# Blueprint Factory Inbox

Tasks and **commission jobs** created from the Operator Console land here.

## How it works

### Inbox tasks (markdown)

1. You commission work in the console (`pnpm blueprint:console` or `http://blueprint.local:4177`).
2. A task file is written here, e.g. `2026-07-09T09-45-00Z-everest-tours.md`.
3. Open Cursor and either:
   - Paste the **Call phrase** from the task into chat, or
   - Tell the agent: *"Pick up the pending task in factory/inbox/"*

### Commission jobs (`jobs/`)

Async jobs run factory commands when possible. Each job has:

- `factory/inbox/jobs/<job-id>.json` — machine-readable status
- `factory/inbox/jobs/<job-id>.md` — human-readable summary for the Inbox tab
- `factory/inbox/jobs/<job-id>.log` — stdout/stderr from spawned commands

Job statuses: `queued` | `running` | `done` | `failed`

| Job kind | What runs automatically | What still needs Cursor |
|----------|-------------------------|-------------------------|
| **prospect_search** | Exports `prospects/nepal-leads.csv` from local scout DB | AI scouting for new lanes (blueprint-search-nepal skill) |
| **shelf_capture** | `pnpm blueprint:capture` when explicit URLs are provided | Beauty audition + sector scouting when no URLs |
| **clone_pair** | `pnpm blueprint:adopt` + inbox task | Full clone build (reference-first, app, beauty pass) |

## Task file format

Each task file includes:

- `Status:` `pending` | `in_progress` | `done`
- `Type:` `new_site` | `continue_site` | `review` | `prospect_search` | `restock_shelf` | …
- `Slug:` the site slug the factory will use
- **Call phrase** — the exact plain-English instruction for the builder

## API (local console only)

| Endpoint | Body | Action |
|----------|------|--------|
| `POST /api/jobs/prospect-search` | `{ lane, region?, notes? }` | Scout commission |
| `POST /api/jobs/shelf-capture` | `{ request, urls?, notes? }` | Donor capture / restock |
| `POST /api/jobs/clone-pair` | `{ clientName, clientWebsite, donorShelfSlug, notes? }` | Matchmaker clone |
| `GET /api/jobs` | — | List all jobs |
| `GET /api/jobs/:id` | — | Job detail + log tail |

## Future: Cursor automations

- **Trigger:** new `*.md` in `factory/inbox/` with `Status: pending`, or new job in `jobs/` with `status: queued`
- **Action:** agent reads the file, runs the appropriate `pnpm blueprint:*` commands, updates status

For now, the console runs short commands directly; long clone jobs still finish in Cursor.

## Do not delete

Keep `README.md` in this folder. Task files can be archived to `factory/inbox/done/` once completed. Job artifacts in `jobs/` are gitignored (local runtime only).
