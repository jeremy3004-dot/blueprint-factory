# Asset Log: Alpine Bloom

## Images

- `app/public/alpine-bloom-assets/nepal-public-domain/annapurna-hikers.jpg`
  - Source: Wikimedia Commons, `Hiking to Mount Annapurna,Nepal 2017 (Unsplash).jpg`
  - License noted on source page: CC0 1.0 Public Domain Dedication.
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Optimization: metadata stripped and recompressed, ~612 KB.
- `app/public/alpine-bloom-assets/nepal-public-domain/ghandruk-route.jpg`
  - Source: Wikimedia Commons, `Annapurna Base Camp Trekking Route, Ghandruk, Nepal (Unsplash).jpg`
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Optimization: metadata stripped and recompressed, ~568 KB.
- `app/public/alpine-bloom-assets/nepal-public-domain/everest-base-camp.jpg`
  - Source: Wikimedia Commons, `Trek to Everest Base Camp.jpg`
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Optimization: metadata stripped and recompressed, ~380 KB.
- `app/public/alpine-bloom-assets/nepal-public-domain/snowy-everest-route.jpg`
  - Source: Wikimedia Commons, snowy Everest Base Camp route photo.
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Optimization: resized to 1000px wide, metadata stripped, and recompressed, ~648 KB.
- `app/public/alpine-bloom-assets/nepal-public-domain/tengboche-monastery.jpg`
  - Source: Wikimedia Commons, Tengboche Monastery on the Everest Base Camp route.
  - License noted on source page: CC0 1.0 Public Domain Dedication.
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Optimization: metadata stripped and recompressed, ~504 KB.
- `app/public/alpine-bloom-assets/whoa-source/*`
  - Source: extracted from WHOA Travel live page for clone-reference fidelity.
  - Use: pixel-first clone reference and remaining press-logo styling.
  - Status: reference/clone workflow only; replace with approved Alpine Bloom assets before production.
  - Optimization: extracted polaroids and founder collage were metadata-stripped and recompressed; largest remaining reference file is ~132 KB.
- `app/public/alpine-bloom-assets/himalaya-range.jpg`
  - Source: Wikimedia Commons redirect for `Himalayas, Nepal.jpg`
  - Use: Himalayan collage hero, media frame, polaroid.
  - Status: kept as the top hero image per direction; needs final license/attribution review before production.
  - Optimization: resized to 2560px wide, metadata stripped, and recompressed, ~520 KB.
- `app/public/alpine-bloom-assets/rhododendron.jpg`
  - Source: Wikimedia Commons redirect for `Pink Rhododendron Flower-Annapurna conservation area.jpg`
  - Use: legacy source/reference file; active app surfaces now use optimized generated Alpine Bloom imagery.
  - Status: needs final license/attribution review before production.
  - Optimization: metadata stripped and recompressed, ~324 KB.

## Video

- `app/public/alpine-bloom-assets/generated/alpine-bloom-hero-loop.mp4`
  - Source: local ffmpeg collage loop generated from the Nepal public-domain/Commons image set.
  - Use: current hero video, matching WHOA's flashing scrapbook motion pattern.
- `scripts/generate-openrouter-hero-video.mjs`
  - Source: OpenRouter video generation workflow script.
  - Use: can generate a SeedDance-style replacement video when `OPENROUTER_API_KEY` is set securely in the environment.
- Motion capture saved under `qa/motion/`.

## Fonts

- CSS stack: Futura, Futura PT, Avenir Next, Arial, sans-serif.

## Logos

- Text wordmark: Alpine Bloom, styled in hot pink to follow WHOA's centered logo approach.

## Generated Assets

- `app/public/alpine-bloom-assets/generated-photos/ask-alpine-bloom-avatar.jpg`
  - Source: generated with the built-in image generation workflow from a Green Pastures-style mountain-guide avatar reference direction.
  - Use: Alpine Bloom concierge avatar in embedded and floating chat.
  - Optimization: 512px JPEG, metadata stripped, ~43 KB.
- `app/public/alpine-bloom-assets/generated-photos/everest-women-base-camp.jpg`
  - Source: generated women-only Everest Base Camp route image.
  - Use: Everest route cards, route detail, route pills, guide region imagery, map waypoint imagery, and homepage photo surfaces.
  - Optimization: 1600px JPEG, metadata stripped, ~289 KB.
- `app/public/alpine-bloom-assets/generated-photos/annapurna-women-ridge.jpg`
  - Source: generated women-led Annapurna ridge trekking image.
  - Use: Annapurna route cards, route detail, route pills, guide region imagery, map waypoint imagery, and homepage photo surfaces.
  - Optimization: 1600px JPEG, metadata stripped, ~203 KB.
- `app/public/alpine-bloom-assets/generated-photos/ghandruk-women-bloom-trail.jpg`
  - Source: generated women-only Ghandruk/rhododendron village trail image.
  - Use: Mardi/Ghandruk route cards, guide region imagery, and homepage route/card surfaces.
  - Optimization: 1600px JPEG, metadata stripped, ~268 KB.
- `app/public/alpine-bloom-assets/generated-photos/langtang-women-high-valley.jpg`
  - Source: generated women-led snowy high-valley/Langtang-style trekking image.
  - Use: Langtang route cards, route pills, route map waypoints, and carousel surfaces.
  - Optimization: 1600px JPEG, metadata stripped, ~204 KB.
- `app/public/alpine-bloom-assets/generated-photos/tengboche-women-monastery.jpg`
  - Source: generated women travelers and Nepali woman guide near a Himalayan monastery.
  - Use: Poon Hill/Ghandruk route imagery, monastery route map waypoints, and founder scrapbook.
  - Optimization: 1600px JPEG, metadata stripped, ~215 KB.
- `app/public/alpine-bloom-assets/generated-photos/rhododendron-bloom-detail.jpg`
  - Source: generated Himalayan rhododendron bloom detail.
  - Use: founder scrapbook bloom detail.
  - Optimization: 1200px JPEG, metadata stripped, ~150 KB.
- CSS scrapbook hero, route polaroids, handwritten labels, press logos, route cards, founder collage, and black media frame.
- Feature-page UI surfaces for route explorer, route dossiers, booking proposal form, planner concierge, FAQ, and admin demo operations now consume the optimized generated Alpine Bloom photo set, while the top homepage hero image remains unchanged per direction.
- All public image assets in `app/public/alpine-bloom-assets` were checked after optimization; largest remaining file is the 1000px tall-route reference image at ~648 KB.
- Interactive route maps use copied/adapted coordinate and waypoint data from the local Green Pastures feature donor, rendered with Leaflet plus Esri imagery/topographic tiles and Alpine Bloom's hot pink/white/black route styling.
- Map review screenshots:
  - `screenshots/desktop-route-map-leaflet.png`
  - `screenshots/mobile-route-map-leaflet.png`

## References

- WHOA Travel, `https://www.whoatravel.com/`
- Captures saved under `references/reference-first/`.
- Green Pastures local app, `/Users/dev/Projects/Travel Agency`, used as feature donor only.

## Unknown Or Needs Review

- Production photography and image licensing.
