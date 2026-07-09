# Operator Console — Guided Tour

The product tour helps new operators learn the console without reading docs. It is **maintainable**: all copy and targets live in one file.

## Start the tour

1. **First visit** — dismissible banner: “New here? Take a 2-minute tour”
2. **Settings** — sidebar → **Settings** → **Start tour**
3. **Replay anytime** — same Settings button; completion checkbox is optional

## Edit tour steps (single source of truth)

**File:** `factory/console/tour-steps.js`

Update this file whenever you add, remove, or rename nav items, panels, or major workflows.

Each step:

| Field | Purpose |
|-------|---------|
| `id` | Stable identifier (for debugging) |
| `view` | Nav view to switch to before the step (`today`, `prospects`, `donors`, `build-sites`, `projects`, `inbox`, `settings`) |
| `target` | CSS selector to highlight; `null` = centered intro modal |
| `title` | Short heading (plain English) |
| `body` | One or two sentences for the owner |
| `placement` | `top`, `bottom`, `left`, `right`, or `center` |
| `beforeShow` | Optional function — open `<details>`, switch build tab, etc. |

### Adding a step

1. Add a stable `id` on the DOM element in `index.html` (e.g. `id="my-new-panel"`).
2. Add a step object to `TOUR_STEPS` in order.
3. Set `view` so the right screen is visible.
4. If the target is inside collapsed UI, use `beforeShow` to expand it (see scout/add-designs examples).
5. Reload the console and run the tour from Settings.

### Removing or renaming UI

1. Remove or update the matching step in `tour-steps.js`.
2. Update `target` selectors if IDs changed.
3. Update `view` if nav keys changed (also update `views` in `app.js`).

## Files

| File | Role |
|------|------|
| `tour-steps.js` | Step definitions — **edit this when features change** |
| `tour.js` | Overlay, highlight, popover, keyboard (ESC, arrows) |
| `tour.css` | Tour + settings panel styles |
| `TOUR.md` | This guide |

## localStorage keys

| Key | Meaning |
|-----|---------|
| `bf-tour-seen` | User dismissed welcome or started/skipped tour |
| `bf-tour-completed` | Optional checkbox in Settings |

## After console code changes

Restart the local service so the background agent picks up files:

```bash
pnpm blueprint:console:uninstall && pnpm blueprint:console:install
```

Or run a one-off session: `pnpm blueprint:console`
