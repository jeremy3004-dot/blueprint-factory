# donor-black-tomato Reference-First Topology

Status: complete
Primary donor: Black Tomato
Donor URL: https://www.blacktomato.com
Captured: 2026-07-07T09:54:27.805Z
Reviewed for Everest Tours: 2026-07-07

This file maps the donor's structure so the builder inherits a proven layout, rhythm, and interaction model before translating it into the Everest Tours brand.

## Primary Donor

Captured evidence:
- Desktop: `donor-1440.png` (canonical), `donor-1920.png`
- Tablet: `donor-768.png`
- Mobile: `donor-390.png`
- Sections: `sections/`
- Motion: `donor-motion.webm` and `donor-motion-reduced.webm`
- Extraction: `extraction/` (dom, copy, tokens, assets, animation-hints, pages)

## Donor Structure

1. Cinematic full-bleed video/image hero with compact top navigation, centered headline, two-line supporting copy, and a small dark CTA.
2. White editorial intro section with a narrow centered text column and discreet press quote row.
3. "Start your journey" taxonomy grid: centered title, tab-like filters, five image cards with uppercase labels, and a small centered CTA.
4. Dark horizontal trip carousel band with left editorial copy and tall image cards.
5. Press pull-quote strip with publication marks and small pagination dots.
6. Full-bleed cinematic story banner with centered headline and graphic overlay.
7. Split section: left editorial copy, right interview/video still.
8. Split section: large left image with overlay wordmark, right editorial copy and CTA.
9. Guide/editorial section with left copy, right landscape image.
10. Reason icon row on white background.
11. Marigold/orange full-width CTA band.
12. Dense dark footer with columns, newsletter field, contact details, legal links, and compact mobile accordions.

## Desktop Interaction Model

- Header sits over the hero with restrained uppercase links, phone/enquiry affordances, and a menu model for deep navigation.
- Primary conversion path is repeated quietly: hero CTA, trip carousel cards, editorial CTAs, final CTA band, then footer enquiry/contact.
- Page motion is mostly scroll reveal and media settling rather than flashy animation. The donor relies on cinematic scale, crisp typography, and section contrast.
- The trip band behaves like a horizontal carousel on desktop; cards sit in a dark track with arrow controls and cropped image cards.
- Hover states are subtle: image cards darken/zoom slightly, buttons invert or deepen, and links reveal intent without decoration.

## Mobile Interaction Model

- Hero remains full-bleed with centered copy and compact nav, then all sections stack into a single editorial column.
- Journey cards become full-width stacked image cards; the trip carousel becomes a swipeable/scrollable card strip.
- Footer columns collapse into accordion rows, preserving density without a long desktop-style footer.
- Motion should be lighter on mobile: same reveal language, less parallax, no interaction that blocks scroll.

## Typography Hierarchy

- Donor heading role: narrow condensed uppercase display (`AlternateGotNo1D` captured), used for hero, section titles, card labels, and footer headings.
- Donor body role: clean geometric sans (`Brandon Grotesque` captured), used for editorial paragraphs, navigation, and small labels.
- Type rhythm: oversized hero display, compact uppercase section headings, then small airy body copy in narrow measures. Letter spacing should remain 0 for this build per local frontend rules, so character comes from condensed fonts and scale rather than tracking.

## Color And Spacing Rhythm

- Donor color base is black, white, gray, and one warm orange CTA band.
- Sections alternate high-contrast full-bleed media, white editorial space, and dark carousel/story bands.
- Spacing is generous and calm: large vertical section padding, narrow copy measures, dense footer.
- Everest translation should preserve the black/white editorial rhythm while shifting the dark base to deep Himalayan slate-blue, surfaces to snow off-white, and the warm CTA accent to marigold/saffron.

## Auto-Captured Mechanical Facts

Auto-drafted by `blueprint capture` on 2026-07-07T09:54:27.805Z. Verified against the captured screenshots and video at planning level.

- Sections detected: 12
- Heading font: AlternateGotNo1D
- Body font: Brandon Grotesque
- Type scale (px): 60 / 45 / 35 / 34 / 30 / 26 / 25 / 23 / 22 / 20 / 18 / 17
- Color rhythm (dominant): #000000, #52575c, #ffffff, #444444, #2f2f2f, #adadad
- Section spacing rhythm (px): 6, 13, 41, 43, 50, 60, 80
- Interaction/motion stack: no animation library detected; likely CSS/IntersectionObserver plus native media behavior
- Same-origin pages found: 221

## Moves To Borrow

1. Full-bleed cinematic hero that lets destination imagery carry the first impression.
2. Restrained editorial copy blocks with narrow measure and calm whitespace.
3. Image-card journey taxonomy with uppercase labels and clear trip browsing.
4. Dark horizontal story/trip band that changes the page tempo.
5. Final warm CTA band followed by a dense, useful footer.
