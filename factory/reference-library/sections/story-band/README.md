# Story Band — full-bleed editorial image band

A full-bleed editorial panel: a darkened cover photo fills the band while centered white type (eyebrow / oversized headline / paragraph) floats on top with a soft text-shadow. On small screens the copy drops onto a blurred scrim so it stays legible over any part of the image. CSS-only — no JS.

## Donor lineage

- **Site:** bigmart
- **Move:** the `.storyImage` band — the full-bleed panel, the absolute cover `img` at `opacity: .72; filter: saturate(.9) brightness(.72)`, centered white text with `text-shadow`, and the mobile legibility scrim (`background: rgba(21,20,18,.34); backdrop-filter: blur(8px)`).

## When to use

- A high-impact editorial break between content sections — a statement, a mission line, a campaign headline over imagery.
- Any moment where you want oversized type sitting directly on a photograph and need it to stay readable without a heavy full-overlay.
- A hero-adjacent band that should feel immersive (edge-to-edge image) but framed by a small margin.

## How it works

- **Panel (`.sb-band`)** is a `position: relative`, `overflow: hidden` box with `place-items: center`, a tall `min-height`, and a small `margin` so the image reads as a framed full-bleed rather than truly edge-to-edge.
- **Cover image** is the panel's direct-child `<img>`, absolutely positioned to `inset: 0` with `object-fit: cover`. It is darkened for contrast with `opacity: .72` and `filter: saturate(.9) brightness(.72)`, so light overlay type stays legible.
- **Overlay type (`.sb-copy`)** is `position: relative` (so it stacks above the absolute image), centered, white, with a `text-shadow` for extra separation from bright patches. The headline is deliberately oversized (`clamp(3.2rem, 8.5vw, 10rem)`, tight tracking, `line-height: .82`).
- **Mobile scrim:** at `max-width: 520px` the copy pins near the top on a translucent, `backdrop-filter: blur(8px)` panel — a local legibility guarantee for small screens where the headline can't rely on the image being calm behind it.

## Reduced-motion behavior

The band is inherently motion-safe: it has no animations, transitions, or parallax — just a static darkened image and static overlay type. A `@media (prefers-reduced-motion: reduce)` block is included for completeness but is intentionally empty, since there is nothing to neutralize.

## Files

- `story-band.css` — extracted, self-contained styles (class prefix `sb-`).
- `demo.html` — standalone, double-click to open. Uses a `picsum.photos` placeholder image. No JS (CSS-only pattern).

## Usage

Copy the markup and link the stylesheet. There is no script.

```html
<link rel="stylesheet" href="story-band.css" />

<section class="sb-band" aria-label="Editorial story">
  <img src="img/story.jpg" alt="" />
  <div class="sb-copy">
    <p class="sb-eyebrow">Store to screen</p>
    <h2>What makes an honest neighborhood grocery app?</h2>
    <p>
      It should know where you shop, make the offer visible at the right moment,
      and keep the physical store at the center of the promise.
    </p>
  </div>
</section>
```

### React / Next (JSX)

The same markup drops into a component unchanged — import the CSS:

```tsx
import "./story-band.css";

export default function StoryBand({ image, eyebrow, title, body }) {
  return (
    <section className="sb-band" aria-label={title}>
      <img src={image} alt="" />
      <div className="sb-copy">
        <p className="sb-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  );
}
```
