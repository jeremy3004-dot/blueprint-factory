# Media Gallery — folding three-panel switcher

A three-panel image gallery that intentionally overflows the viewport and centers itself. Click any panel to promote it: the active panel lifts and reaches full opacity while the others dim and desaturate. A caption below shows the active item's title/copy plus Prev/Next controls that wrap. On narrow screens the row collapses to a horizontal scroll-snap strip.

## Donor lineage

- **Site:** one-and-only-resorts
- **Move:** the `.foldingGallery` three-panel switcher — `.galleryPanel.isActive` lift (`translateY(-10px)`) + full opacity, inactive `saturate(.92)` dim; the `nextJourney(direction)` modulo wrap; the `width: min(1580px, 120vw)` + `margin-left: 50%` + `translateX(-50%)` overflow-and-center layout; and the mobile `scroll-snap-type: x mandatory` fallback.

## When to use

- A small set (typically 3) of showcase images/experiences where one is spotlighted at a time and the others stay visible as context.
- You want a gallery that breaks the content grid — spilling slightly past the viewport edges for an immersive, editorial feel.
- You want click-to-focus interaction that stays legible and usable on mobile as a swipeable strip.

## How it works

- **The row (`.mg-gallery`)** is a three-column grid whose center column is widest. It is set to `width: min(1580px, 120vw)` and re-centered with `margin-left: 50%; transform: translateX(-50%)`, so it deliberately overflows the page gutters.
- **Panels (`.mg-panel`)** are real `<button>`s. The active one gets `.isActive`, which the CSS turns into `opacity: 1` + `translateY(-10px)`; every other panel is dimmed with `filter: saturate(.92)`.
- **Caption (`.mg-caption`)** reflects the active index — title, copy, and a Prev/Next control pair (`.mg-controls`) whose glyphs are drawn with `::before`.
- **Wrap** is modulo: `(index + direction + n) % n`, so Prev on the first item lands on the last.
- **Mobile:** at `max-width: 900px` the grid becomes a flexbox `overflow-x: auto` strip with `scroll-snap-type: x mandatory`; the lift is removed so panels sit flat while swiping.

## Reduced-motion behavior

`@media (prefers-reduced-motion: reduce)` neutralizes the lift: `.mg-panel` transitions are clamped to `1ms` and `.mg-panel.isActive` gets `transform: none`. The active panel is still clearly distinguished (full opacity vs. desaturated neighbors), but there is no vertical travel or cross-fade motion. The vanilla JS only toggles classes — no scripted animation — so the media query governs all motion.

## Files

- `media-gallery.css` — extracted, self-contained styles (class prefix `mg-`). Easing in CSS var `--mg-ease`.
- `media-gallery.js` — vanilla, self-initializing controller for `demo.html` (no build/React).
- `media-gallery.tsx` — React/Next client component faithful to the source, for copy into sites.
- `demo.html` — standalone, double-click to open. Uses `picsum.photos` placeholder images.

## Usage

### HTML + vanilla JS

The controller reads an items array from an inline JSON script and builds the panels, caption, and controls.

```html
<link rel="stylesheet" href="media-gallery.css" />

<section class="mg-root" data-media-gallery aria-label="Journeys of discovery">
  <script type="application/json">
    [
      { "title": "Savour", "label": "Dining", "image": "img/dining.jpg", "copy": "..." },
      { "title": "Reconnect", "label": "Wellness", "image": "img/wellness.jpg", "copy": "..." },
      { "title": "Gather", "label": "Events", "image": "img/events.jpg", "copy": "..." }
    ]
  </script>
</section>

<script src="media-gallery.js"></script>
```

### React / Next (TSX)

```tsx
import MediaGallery, { type GalleryItem } from "./media-gallery";
import "./media-gallery.css";

const items: GalleryItem[] = [
  { title: "Savour", label: "Dining", image: "/img/dining.jpg", copy: "..." },
  { title: "Reconnect", label: "Wellness", image: "/img/wellness.jpg", copy: "..." },
  { title: "Gather", label: "Events", image: "/img/events.jpg", copy: "..." },
];

export default function Page() {
  return <MediaGallery items={items} />;
}
```
