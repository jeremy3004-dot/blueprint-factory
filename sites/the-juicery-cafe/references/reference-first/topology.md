# the-juicery-cafe Reference-First Topology

Status: complete
Primary donor: gymkhanalondon.com
Donor URL: https://gymkhanalondon.com
Adopted for client: the-juicery-cafe
Captured: 2026-07-07T16:19:51.097Z

This file maps the donor's structure so the builder inherits a proven 10/10 layout, rhythm, and
interaction model before translating it into the client brand. Auto-captured fields are a starting
point; verify each against the screenshots and the scroll-through video.

## Primary Donor

Captured evidence:
- Desktop: `donor-1440.png` (canonical), `donor-1920.png`
- Tablet: `donor-768.png`
- Mobile: `donor-390.png`
- Sections: `sections/`
- Motion: `donor-motion.webm` (+ `donor-motion-reduced.webm`)
- Extraction: `extraction/` (dom, copy, tokens, assets, animation-hints, pages)

## Donor Structure

1. Full-viewport photographic hero with a tiny wordmark at top left, compact menu trigger at top
   right, centered cuisine promise, bottom-centered reservation CTA, and a floating news card.
2. Deep-green patterned story field with small tracked label, centered serif paragraph, and outlined CTA.
3. Large framed dish photograph set inside the same green field.
4. Centered food statement beneath the image, preserving generous vertical breathing room.
5. Full-bleed interior/location photograph with centered label and CTA; the image carries the page
   through a long cinematic scroll.
6. Deep-red footer with a faint ornamental pattern, contact/opening-time columns, centered crest,
   and compact utility links.

## Desktop Interaction Model

The hero loads as a full-screen visual event: a large centered wordmark resolves to the persistent
small masthead while the background image settles. The top-right trigger opens navigation; the
primary conversion stays visible as a small outlined button. Story and food content arrive through
subtle opacity/translate reveals. The framed dish and location image are the main visual pauses.
The floating news card is dismissible and acts as a secondary conversion surface.

## Mobile Interaction Model

The masthead remains compact, with the wordmark and pill-shaped menu trigger sharing one row. Hero
copy shifts lower over a portrait crop, and the floating card becomes nearly full-width at the
bottom edge. Story copy narrows to one readable column. The framed dish becomes a single media card,
while the location image remains a tall portrait band. Footer columns stack and center. There is no
required scroll snap or bottom sheet.

## Typography Hierarchy

Baskerville carries every visible role: an oversized serif wordmark on entry, 28-36px restrained
headlines, 16-20px story copy, and 10-12px uppercase tracked labels and buttons. The client build
will preserve these roles with open substitutes rather than copying the licensed font.

## Color And Spacing Rhythm

Cream text and hairline rules sit on deep club green; a burgundy footer creates one decisive color
change. Sections use roughly 160px of vertical air on desktop, with full-bleed media breaking up
centered text fields. Mobile keeps the color rhythm but reduces spacing to roughly 72-96px.


## Auto-Captured Mechanical Facts

Auto-drafted by `blueprint capture` on 2026-07-07T16:19:51.097Z. Verify against the captured screenshots and video.

- Sections detected: 7
- Heading font: baskerville
- Body font: baskerville
- Type scale (px): 36 / 32 / 28 / 20 / 18 / 16 / 12
- Color rhythm (dominant): #fff1d6, #27372f, #000000, #66090f, oklab(0.962201 0.00417483 0.0382388 / 0.9)
- Section spacing rhythm (px): 160
- Interaction/motion stack: none detected (likely CSS/IO-driven motion)
- Same-origin pages found: 12

## Moves To Borrow

1. The full-screen hero wordmark settle into a tiny persistent masthead.
2. The bottom-edge floating information card, translated into hours and seasonal details.
3. The green story field with tiny tracked labels and centered serif copy.
4. The ornamental framed food photograph followed by a quiet food statement.
5. The long full-bleed place image flowing into a single decisive footer color change.
