# One&Only Reference-First Topology

## Primary Donor

Primary donor: `https://www.oneandonlyresorts.com/?utm_source=chatgpt.com`

Captured evidence:

- Desktop: `sites/one-and-only-resorts/references/reference-first/oneandonly-desktop.png`
- Mobile: `sites/one-and-only-resorts/references/reference-first/oneandonly-mobile.png`
- Extraction: `sites/one-and-only-resorts/references/reference-first/oneandonly-extraction.json`

## Donor Structure

1. Fixed white header with hamburger, small global selector, centered One&Only logo, and two circular utility controls.
2. Full-screen video-led resort hero with darkened media, tiny uppercase label, large centered serif headline, and restrained body copy.
3. Inset full-width destination image panel with text over the lower-left corner.
4. Split stays feature: large interior image paired with right-side editorial copy.
5. Centered "Journeys of discovery" intro.
6. Folding/peek carousel with a large central lifestyle image and cropped side images.
7. Three seasonal editorial cards with vertical image crops.
8. Private homes split feature with text left and infinity-pool media right.
9. Quiet centered "Our story" and "Exclusive offers" sections with large whitespace.
10. Three-benefit utility row.
11. Pale footer with brand wordmark, link columns/accordions, Kerzner family marks, and copyright.

## Typography And Color Rhythm

- Display type is a delicate high-contrast serif, used with light weight and generous breathing room.
- UI labels are small uppercase sans-serif with wide letter spacing.
- Body copy is small, restrained, and low-contrast.
- The palette is white, warm paper, charcoal, soft gray, and colors supplied by photography.
- The site avoids loud accents; lines, underlines, and spacing carry hierarchy.

## Image And Video Strategy

- The hero uses living resort media rather than a static marketing composition.
- Destination and feature sections use large real resort imagery with exact crops.
- Experience and story modules use people, water, architecture, and interiors to vary texture.
- Mobile crops preserve focal subjects and intentionally allow horizontal galleries to peek.

## Interaction And Motion Model

- Header remains fixed and calm.
- Hero video/fallback carries the first emotional signal.
- Sections reveal once on scroll with slow editorial easing.
- Gallery panels change by click/tap and preserve side-image peeks.
- Mobile footer behaves like calm accordions.
- Menu and booking overlays are simple focus-safe dialogs.

## Donor Grammar Table

| Donor move observed | Why it works | Original translation | What not to copy | Implementation path |
|---|---|---|---|---|
| Full-screen resort video with centered serif headline | Establishes place and luxury before utility | Resort Aperture Reveal opens from white page into video-backed headline | Do not copy One&Only brand as production identity | Native video, image fallback, CSS keyframes |
| Inset global-destination media panel | Breaks from hero while keeping cinematic scale | Portfolio panel with lower-left text over island media | Do not ship donor DAM media to production without review | CSS image panel and gradient veil |
| Folding experience carousel with side peeks | Makes discovery feel tactile and editorial | Three-panel gallery controlled by React state | Do not overanimate with flashy carousel physics | CSS transitions and simple state |
| Sparse story cards and long whitespace | Feels curated instead of filled | Three editorial story cards with varied vertical crops | Do not turn into generic feature cards | CSS grid desktop, horizontal scroll mobile |
| Footer accordion on mobile | Keeps utility dense but quiet | Footer columns collapse to accordions on small screens | Do not add marketing clutter | React local state |

## Moves To Borrow

- Centered logo and quiet fixed header.
- Full-screen living media hero.
- Tiny uppercase labels paired with serif headlines.
- Inset destination panel after the hero.
- Split editorial feature blocks.
- Horizontal/folding gallery rhythm.
- Three seasonal editorial cards.
- Long whitespace before quiet story/offers copy.
- Pale footer with calm utility grouping.

## Anti-Copy Rules

- Clone the structure, rhythm, interaction grammar, and craft standard.
- Do not treat donor images, video, logo, or copy as production-cleared assets.
- Replace protected assets and brand copy before any public client deployment.
