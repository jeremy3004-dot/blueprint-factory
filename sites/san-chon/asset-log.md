# Asset Log: San Chon

## Production Assets

All production photographs were generated for this project with OpenAI's built-in image generation tool on 2026-07-11. They contain no donor branding, third-party text, or logos.

| Asset | Use | Provenance |
| --- | --- | --- |
| `app/public/images/hero-table.png` | Homepage hero and cropped collage fragment | Original generated editorial Korean barbecue table, 1536×1024 |
| `app/public/images/grill-fire.png` | Experience background and menu-page hero crop | Original generated tabletop grill close-up, 1774×887 |
| `app/public/images/menu-spread.png` | Favorites/menu grid | Original generated Korean dish spread, 1254×1254 |
| `app/public/images/dining-room.png` | Story band and visit-page hero | Original generated Pokhara Korean dining room, 1536×1024 |
| `app/public/images/shared-feast.png` | Signature sensory chapter | Original generated shared Korean feast, 1254×1254 |

## Reference-Only Assets

- Everything under `references/reference-first/` is donor-analysis evidence only.
- COTE's 271 inventoried images/videos are not copied into `app/public/` and may not ship.
- Tripadvisor traveler photos and third-party review images are not used because reuse rights were not established.

## Fonts

- Donor SangBleu/Baxter: reference-only/proprietary role.
- Production: Cormorant Garamond and DM Sans via `next/font/google`, open Google Fonts.
- Korean glyphs: system `Noto Serif KR` / `Noto Sans KR` fallback where available.

## Brand Marks

- The `SAN CHON / 산촌다람쥐` wordmark and circular seal are rendered in HTML/CSS/SVG from text and geometry; no third-party logo file is used.

### Font decisions (blueprint tokens, 2026-07-10T18:53:34.228Z)

- Heading: donor `Sangbleusans` → **Cormorant Garamond** (substituted; Google Fonts; license: open) — preserves the donor's high-contrast editorial display role.
- Body: donor `Sangbleusans` → **DM Sans** (substituted; Google Fonts; license: open) — clearer at restaurant-navigation and operational-copy sizes.

See `factory/qa/font-substitutes.md` for the substitution rationale.
