# Green Pastures Pack

Green Pastures Pack is Blueprint Factory's reusable company-app feature pack.
Use it when Jeremy asks to copy Green Pastures, match Green Pastures capability depth, or build a new company with the same operational backbone.

## Call Phrases

- `Green Pastures Pack`
- `with Green Pastures Pack`
- `copy what Green Pastures has`
- `Green Pastures-level backend/admin`
- `$blueprint run <company> with Green Pastures Pack`

## Portable Meaning

Green Pastures is the capability donor, not the final brand. The new company keeps its own visual donor, brand rules, audience, copy, imagery, and product model.

Portable donor source lives at:

```text
factory/capability-donors/green-pastures
```

Use this formula:

```text
Visual donor clone + Green Pastures Pack + company brand rules = finished company app
```

## Required Inputs

- Company name and slug.
- Visual donor URL to clone first.
- Company audience and offer.
- Brand rules, including required colors, tone, imagery, and exclusions.
- Any hard content rules, such as women-only, local-market, faith-based, youth-safe, or no-medical-claims.

If no visual donor URL is provided, ask for one unless Jeremy explicitly asks the agent to choose.

## Workflow

1. Follow `factory/playbooks/reference-first-build.md`.
2. Clone the visual donor first: structure, rhythm, colors, typography, spacing, responsive behavior, and signature motion.
3. Verify the donor clone against desktop and mobile screenshots.
4. Translate the visual clone into the new company brand.
5. Add Green Pastures Pack capabilities in small verified phases.
6. Keep all data, imagery, personas, admin examples, AI examples, and seed content aligned with the new company's hard rules.
7. Run lint, build, browser checks, screenshots, and visual review before save or deploy.

## Capability Checklist

- Public route/product index.
- Product detail pages with rich dossiers.
- Interactive maps with route stages, labels, photos, progress, and elevation/profile context when relevant.
- Booking/proposal request form.
- Booking API with preview mode and durable backend readiness.
- Admin locked state, login/logout, session auth, role/source display, and guarded admin APIs.
- Admin dashboard with setup-required state.
- CRM pipeline with stages and drag/drop where useful.
- Calendar/schedule view.
- Staff/guide/team roster with assignment workflows.
- Conflict/watch items.
- AI admin assist for paste/dictation intake and structured draft extraction.
- AI ops brief or daily priority summary.
- Public AI concierge, both embedded and floating when appropriate.
- Model provider resolver with local fallback.
- Analytics for pageviews, booking submit/fail, chat opened/prompt sent, and admin viewed/login viewed.
- Focused tests for provider selection, formatting, validation, admin mutations, assignments, and brand-rule guardrails where practical.
- Deployment notes, asset log, screenshots, and visual review updates.

## Translation Rules

- Do not import Green Pastures styling unless the new visual donor calls for it.
- Do not import Green Pastures brand, copy, names, locations, or protected assets.
- Treat Green Pastures data as structure only; rewrite demo data for the new company.
- Keep preview/demo states honest. Do not claim persistence, email, payments, or AI model availability unless the required service is configured.
- Analytics must avoid PII and raw free-form text. Track coarse metadata only.

## Required Site Files

Each site using this pack must document the pack in:

- `brief.md`
- `art-direction.md`
- `asset-log.md`
- `deploy.md`
- `qa/visual-review.md`

`art-direction.md` must clearly separate:

- Primary visual donor.
- Green Pastures Pack capability donor.
- Company-specific brand rules.

## Alpine Bloom Example

```text
$blueprint run Alpine Bloom with Green Pastures Pack
Visual donor: https://www.whoatravel.com
Brand rules: women-only Himalayan trekking, Nepali women guides only, pink/white/black, scrapbook travel energy.
```

For Alpine Bloom specifically, all travelers, guides, avatars, testimonials, admin demo data, AI examples, concierge copy, and generated content must be women-only and women-led unless Jeremy explicitly asks for an exception.
