# Art Direction: Stillness Above the Lake

## Primary donor and exact borrowed moves

Primary donor: **Aman** (`https://www.aman.com`). Preserve these structural moves:

1. A pale, nearly silent masthead around a contained cinematic hero rather than a generic full-screen marketing banner.
2. Small uppercase editorial labels paired with measured serif headlines, short prose and underlined text links.
3. An asymmetric two-column feature story followed by a horizontally cropped editorial card sequence.
4. Large breathing spaces that alternate image-dominant and text-dominant sections.
5. A low-pressure conversion close and information-rich footer rather than repeated oversized buttons.

Secondary reference: Dorje's current site (`https://dorjes.com`) for all brand truth, color, photography, video, logo and copy. Its warm ivory, olive-gold, timber, lake blue and hand-crafted Nepal character replace Aman's monochrome identity.

## Concept

**Stillness Above the Lake** treats the resort as a sequence of thresholds: city to hillside, hillside to lake, lake to room, room to inner calm. The visual language is refined Himalayan modernism—warm parchment, moss-black ink, oxidised brass, generous photography and a fine topographic-line motif used sparingly.

## 3. The signature moment (required)

**The Lake Aperture** opens on Dorje's photographic lake terrace inside a precisely framed Aman-like masthead. Over the first 300 pixels of scroll, the 1260px frame expands to the viewport edge and hands off into a layered lake/room/spa editorial sequence. Dorje's illustrated resort film remains available through an intentional watch control instead of weakening the default first impression. With reduced motion, the frame stays stable and content renders immediately.

## Typography and color

- Display: Cormorant Garamond, an open substitute that bridges Aman's literary calm and Dorje's existing Gilda Display character.
- Body/UI: Manrope, open and highly legible, replacing proprietary Avenir/Whitney roles.
- Parchment: `#f5f0e4`; ink: `#24251f`; brass: `#9a7b2f`; mist: `#ddd6c7`; moss: `#3e4636`; lake: `#6f8e8b`.

## Motion

Copy and adapt the factory's `hero-settle`, `text-reveal`, `scroll-reveal`, and `parallax-media` patterns. All entrances are one-shot IntersectionObserver reveals with restrained durations; hover zoom applies only on hover-capable devices. No looping decorative animation beyond the user's own hero film.
