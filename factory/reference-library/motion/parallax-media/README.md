# parallax-media

A restrained hover zoom for imagery. On hover the image eases up to
`scale(1.025)` over a slow 900ms — enough to feel alive, never enough to feel
gimmicky. Gated behind `@media (hover: hover)` so touch never triggers it.

## Donor lineage

- **Site:** one-and-only-resorts.
- **Move:** the `@media (hover: hover)` block that applies
  `transform: scale(1.025)` to portfolio / story / split-feature imagery with
  `transition: transform 900ms var(--ease)`. Generalized here into a single
  reusable `.pm-frame` wrapper.

## When to use

- Editorial image cards, split-feature imagery, portfolio tiles — anywhere a
  static photo would benefit from a quiet response to the cursor.
- When you want the motion to be a desktop nicety that stays completely out of
  the way on mobile/touch.

## How it works

- `.pm-frame` is a `position: relative; overflow: hidden` box; the image fills
  it with `object-fit: cover`. The overflow clip means the scaled image grows
  *inside* its frame instead of shifting the layout.
- Both the `transition` and the `:hover` `transform` live inside
  `@media (hover: hover)`. Devices without a true hovering pointer (touch)
  therefore never receive the transform at all — no sticky zoom, no jump.
- The slow 900ms duration plus the `--pm-ease` easing var
  (`cubic-bezier(0.16, 1, 0.3, 1)`) give the settle its unhurried quality.

## Reduced-motion behavior

The effect is hover-only, so it is **inherently safe on touch** — those users
never see it. But a pointer user can still request reduced motion, so the
pattern also includes a `prefers-reduced-motion: reduce` block that removes the
transition and neutralizes the zoom, leaving a fully static image.

## Files

- `parallax-media.css` — the pattern (self-contained, no imports).
- `demo.html` — standalone demo; hover the images to see the zoom.
- `README.md` — this file.

CSS-only: no JS file is needed.

## Usage

HTML markup:

```html
<div class="pm-frame">
  <img src="/photo.jpg" alt="" />
</div>
```

React / TSX:

```tsx
import "./parallax-media.css";

export function MediaTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="pm-frame">
      <img src={src} alt={alt} />
    </div>
  );
}
```
