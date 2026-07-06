# Carousel — tab-filtered prev/active/next

A featured-content carousel. A blurred, full-bleed image backdrop sits behind three slots — the previous preview, the active card, and the next preview. An ARIA tablist filters the pool; dots and arrows move within the current filter. Every navigation replays a CSS entrance animation via a node-remount trick (no JS animation code).

## Donor lineage

- **Site:** four-seasons
- **Move:** the `.propertyStage` featured carousel — `.propertyBackdrop` / `.propertyCard` / `.sidePreview` / `.carouselControls` / `.propertyDots`, the `role="tablist"` with roving `tabIndex` + arrow-key handler, the `propertyImageIn` / `propertyCardIn` entrance keyframes, and the `nextProperty` / `previousProperty` / `previousIndex` / `nextIndex` modulo wrap logic.

## When to use

- A curated set of items grouped into a few categories (property types, collections, tiers) where one category is shown at a time.
- You want an editorial, "stage-lit" presentation rather than a plain slider: a hero card flanked by dimmed previews over a blurred backdrop.
- You need real keyboard and screen-reader semantics (tablist, roving tabIndex, `aria-live` panel).

## How it works

- **Tabs (`.crs-tabs`)** render as `role="tablist"` with **roving tabIndex**: only the selected tab is `tabIndex=0`; Left/Right arrows move selection and focus. Selecting a tab filters the pool and resets the index to 0.
- **Stage (`.crs-stage`)** is a three-column grid: previous preview | active card | next preview. The `.crs-backdrop` image is absolutely positioned behind everything, blurred/darkened.
- **Wrap logic** is pure modulo: `previousIndex = (i - 1 + n) % n`, `nextIndex = (i + 1) % n`; arrows and previews call the same math so the ends wrap seamlessly.
- **The entrance trick:** the backdrop and the active card each run a one-shot `@keyframes` on mount. Re-mounting the node re-fires the animation. In React this is `key={active.image}` / `key={active.location}`; in the vanilla JS the stage is rebuilt (`stage.innerHTML = ""` then fresh nodes) so the same replay happens with zero animation JS.
- **Dots (`.crs-dots`)** and **arrow controls (`.crs-controls`)** both drive the same `index` state.

## Reduced-motion behavior

`@media (prefers-reduced-motion: reduce)` names the animated nodes explicitly — `.crs-backdrop`, `.crs-card`, `.crs-preview` (+ its `img`), `.crs-dots button::before`, `.crs-controls button`, `.crs-tabs button` — and sets `transform: none` with entrance/transition durations clamped to `1ms`. Content still swaps instantly on navigation, but the fade/lift travel and hover transforms are removed. The vanilla JS adds no scripted animation, so honoring the media query is entirely CSS-side.

## Files

- `carousel.css` — extracted, self-contained styles (class prefix `crs-`). Easing in CSS vars `--crs-ease` / `--crs-luxury`.
- `carousel.js` — vanilla, self-initializing controller for `demo.html` (no build/React).
- `carousel.tsx` — React/Next client component faithful to the source, for copy into sites.
- `demo.html` — standalone, double-click to open. Uses `picsum.photos` placeholder images.

## Usage

### HTML + vanilla JS

The controller reads a `slides` array from an inline JSON script and builds the tablist, stage, controls, and dots.

```html
<link rel="stylesheet" href="carousel.css" />

<section class="crs-root" data-carousel aria-label="Featured destinations">
  <script type="application/json">
    [
      { "location": "Bora Bora", "type": "Resorts", "image": "img/bora.jpg", "copy": "..." },
      { "location": "Costa Rica", "type": "Resorts", "image": "img/cr.jpg", "copy": "..." },
      { "location": "Fort Lauderdale", "type": "Residences", "image": "img/fl.jpg", "copy": "..." }
    ]
  </script>
</section>

<script src="carousel.js"></script>
```

### React / Next (TSX)

```tsx
import Carousel, { type CarouselSlide } from "./carousel";
import "./carousel.css";

const slides: CarouselSlide[] = [
  { location: "Bora Bora", type: "Resorts", image: "/img/bora.jpg", copy: "..." },
  { location: "Costa Rica", type: "Resorts", image: "/img/cr.jpg", copy: "..." },
  { location: "Fort Lauderdale", type: "Residences", image: "/img/fl.jpg", copy: "..." },
];

export default function Page() {
  return <Carousel slides={slides} onSelect={(s) => console.log(s.location)} />;
}
```
