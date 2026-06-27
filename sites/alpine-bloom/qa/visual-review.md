# Visual Review: Alpine Bloom

## Latest Verdict

Status: READY_FOR_REVIEW

## Feature Port Review

Pass for local preview. Alpine Bloom now includes the Green Pastures-style product depth while keeping the Alpine Bloom/WHOA visual world: `/treks`, `/treks/[slug]`, `/book`, `/planner`, `/faq`, and `/admin` all use the same paper field, oversized editorial type, hot pink accents, mint labels, black buttons, and Nepal imagery. The admin board is intentionally denser and more operational, but still uses the same typography, color accents, and restrained panel system.

Screenshots refreshed:

- `screenshots/desktop-home.png`
- `screenshots/desktop-treks.png`
- `screenshots/desktop-book.png`
- `screenshots/desktop-admin.png`
- `screenshots/mobile-treks.png`
- `screenshots/mobile-book.png`

## Signature Moment Check

Pass. Motion capture now shows the WHOA-derived homepage structure translated into a Nepal-only scrapbook with a looping hero video: a large Himalayan backplate holds while collage photos flash in and out, followed by the two-column manifesto, route polaroids, pink CTA, press strip, black-framed Everest media, sparse way marker, founder note, and compact footer.

## Reference Comparison

- Primary donor, WHOA Travel: the corrected build now uses WHOA's pink/white/black/mint palette, centered pink wordmark, left hamburger, hero collage asset ratio, two-column intro structure, photo-scatter rhythm, hot pink CTA, press strip, black media frame, large whitespace before the "way" marker, founder collage, and footer dividers.
- Nepal image pass: the rendered route imagery now uses Commons-sourced Himalayan/Nepal trekking photos for Annapurna, Everest Base Camp, Ghandruk, Tengboche, and a snowy route card. Mongolia/Patagonia-style donor content is no longer rendered.
- Hero motion pass: the static scrapbook hero was replaced with `app/public/alpine-bloom-assets/generated/alpine-bloom-hero-loop.mp4`, a local ffmpeg loop built from the Nepal image set to mimic WHOA's flashing collage rhythm.
- Remaining gap: exact WHOA typography depends on Futura/Futura PT availability; the local fallback is close but not identical on machines without the donor font. Press logos still use the clone-reference treatment and should be replaced or approved before production.

## Scores

- First-screen impact: 4
- Signature moment: 4
- Typography: 3
- Layout and rhythm: 4
- Motion craft: 3
- Color and imagery: 5
- Mobile: 4
- Coherence: 4

## Highest Impact Next Fix

For true production-grade pixel perfection, license or bundle the exact donor-equivalent Futura font and replace the remaining clone-reference press/logo material with approved Alpine Bloom assets.

For the feature layer, the next production fix is connecting approved persistence/email/AI services behind the preview APIs after human approval.

## QC Follow-Up

Resolved after review:

- Admin demo workflow now maintains local in-memory state across separate preview API operations.
- Route explorer filters now match the page promise: region, difficulty, season, and support.
- Route dossiers now show starting price and readiness notes in addition to facts, permits, access, itinerary, and map.
- Conflict visibility is now represented in the admin board.

## Map Follow-Up

Resolved after route-map review:

- Trek detail pages now use Green Pastures-style interactive route maps instead of the earlier decorative scrapbook sketch.
- Map sections include real route coordinates, clickable stages, stop photos and notes, route distance/progress, and an elevation profile.
- The map visual treatment is native to Alpine Bloom: black terrain panel, hot pink/mint route line, paper side panel, and pill-style stage rail.
