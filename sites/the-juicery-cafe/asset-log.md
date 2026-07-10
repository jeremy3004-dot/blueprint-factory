# Asset Log: the-juicery-cafe

## Images

All production photographs below were downloaded from the client's current Wix media library on
2026-07-10. They are client-source assets, not donor assets.

- `app/public/images/juicery/brunch-wide.jpg` — cafe team member holding fresh herbs; homepage hero.
- `app/public/images/juicery/bowl-wide.jpg` — fruit-and-seed bowl; framed food feature.
- `app/public/images/juicery/food-wide.jpg` — open sandwich/brunch plate; food page.
- `app/public/images/juicery/bowl-tall.jpg` — house bread; food page.
- `app/public/images/juicery/food-tall.jpg` — layered smoothie; food page.
- `app/public/images/juicery/juice-tall.jpg` — banana-leaf texture; decorative crop.
- `app/public/images/juicery/cafe-portrait.jpg` — two bottled smoothies; food and market pages.
- `app/public/images/juicery/cafe-counter.jpg` — Lakeside cafe counter; location band.
- `app/public/images/juicery/smoothies.jpg` — Juicery Cafe entrance; contact/visit pages.
- `app/public/images/juicery/kitchen-portrait.jpg` — kitchen portrait; story/footer detail.
- `app/public/images/juicery/event-kirtan.jpg` — community kirtan gathering; events page.
- `app/public/images/juicery/event-workshop.jpg` — group fitness/yoga class; events page.
- `app/public/images/juicery/produce-detail.jpg` — existing Juicery Cafe logo artwork; reference only.

Source base: `https://static.wixstatic.com/media/`; exact media IDs are preserved in
`sites/the-juicery-cafe-brand-source/references/reference-first/extraction/assets.json` and the
worker's Playwright route audit.

## Video

## Fonts

- Cormorant Garamond — Google Fonts, SIL Open Font License; heading/display substitute.
- Manrope — Google Fonts, SIL Open Font License; body/UI substitute.

## Logos

- Production wordmark is typeset text plus an original inline citrus/leaf SVG. The current site's
  round logo (`produce-detail.jpg`) is retained only as identity reference and does not render.

## Generated Assets

## References

- Gymkhana desktop/mobile screenshots and motion remain under `references/reference-first/`.
- The Juicery brand-source capture remains under `sites/the-juicery-cafe-brand-source/`.
- TripAdvisor supplemental photos remain under `references/tripadvisor/` and are reference-only.
  Reviewer-uploaded photo rights are not assumed; none of these files render in `app/`.

## Unknown Or Needs Review

### Font decisions (blueprint tokens, 2026-07-10T17:03:26.932Z)

- Heading: donor `baskerville` → **Libre Baskerville** (substituted; Google Fonts; license: open) — Baskerville is licensed/system
- Body: donor `baskerville` → **Libre Baskerville** (substituted; Google Fonts; license: open) — Baskerville is licensed/system

Brand translation then changes the generated substitutes to Cormorant Garamond (display) and
Manrope (body/UI), both open Google Fonts families, while preserving the donor's serif hierarchy.

See `factory/qa/font-substitutes.md` for the substitution rationale.
