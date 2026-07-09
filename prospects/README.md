# Prospect Research

Durable lead lists for Blueprint Factory prospect searches.

- `nepal-leads.csv` is the canonical Nepal prospect list. Add future Nepal search results here after dedupe and scoring.
- `nepal-leads.pdf` is the readable PDF report generated from the Nepal CSV.
- For other countries, use the same pattern: `<country>-leads.csv`.

## blueprint-search-nepal

Skill path: `/Users/dev/.codex/skills/blueprint-search-nepal/`

Scores each lead 0–100 from four components: website pain, demand, premium fit, and access.

```bash
# Summary of stored runs
python3 /Users/dev/.codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py summary

# Export ranked leads to CSV (copy into prospects/nepal-leads.csv)
python3 /Users/dev/.codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py export --output prospects/nepal-leads.csv

# Local dashboard
python3 /Users/dev/.codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py serve --port 8765

# Import a new search run
python3 /Users/dev/.codex/skills/blueprint-search-nepal/scripts/blueprint_search_nepal.py import --run "Pokhara trekking" --input leads.csv
```

Raw screenshots, SQLite, and run history live in `.blueprint-search-nepal/` (local/gitignored).

The Operator Console **Prospects** tab (`pnpm blueprint:console`) reads `nepal-leads.csv` and can
prefill a demo clone job from any lead.

Call phrase: *Scout Nepal prospects with blueprint-search-nepal and export to prospects/nepal-leads.csv*

Keep raw screenshots, local dashboards, and scratch run data in the local research store unless Jeremy asks to commit them.
