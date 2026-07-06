# Collage Rhythm — editorial asymmetric grid + overlapping founder collage

An editorial section built from two complementary moves: an **asymmetric feature grid** where the first tile spans two columns with a wide cinematic frame while the rest stay portrait, and an **overlapping founder collage** of absolutely-positioned photos stacked at different depths with a rotated circular seal badge. Subtle `:nth-child` tilts give the collage a hand-placed rhythm. CSS-only — no JS.

## Donor lineage

- **Site:** alpine-bloom
- **Move:** the `.journeyGrid` (3-column grid, `.card:first-child { grid-column: span 2 }`, feature aspect `16/11` vs. others `3/4`, slow hover `transform: scale(1.06)`) combined with the `.founderArt` collage — absolutely-positioned overlapping `.ph1` / `.ph2` / `.ph3` and the rotated circular `.seal`, plus `:nth-child` rotation on the tiles.

## When to use

- A "featured collection" band where one item deserves visual dominance (a hero tile) alongside a set of equal secondary tiles.
- A founder / about / editorial vignette that wants a scrapbook, hand-arranged feel rather than a rigid grid.
- Any section where you want rhythm and asymmetry without a JS layout engine — this is pure grid + absolute positioning.

## How it works

- **Feature grid (`.col-grid`)** is `grid-template-columns: repeat(3, 1fr)`. `.col-card:first-child` gets `grid-column: span 2` so it occupies two-thirds of the row; its `.col-frame` switches from the default `aspect-ratio: 3/4` to a wide `16/11`.
- **Tiles (`.col-card`)** are anchors with an overlay gradient (`::after`) and a bottom-anchored `.col-body` (number / title / note). Hovering runs a slow `transform: scale(1.06)` on the image over `1.1s`.
- **Founder collage (`.col-founderArt`)** is a `4/5` box. Three `.col-ph` photos are absolutely positioned with hand-tuned `left/top/right/bottom/width/height` and layered via `z-index`. A `.col-seal` circle (rotated `-8deg`) sits on top.
- **`:nth-child` tilt** applies a few degrees of rotation per collage tile (`-2deg`, `1.5deg`, `-1.2deg`) so the stack reads as placed by hand, not snapped to a grid.

## Reduced-motion behavior

This section is layout-only. The static rotations (`.col-seal`, the `:nth-child` tilts) are decorative transforms that never animate, so they are inherently safe and are left intact. The only actual motion is the slow hover zoom, which `@media (prefers-reduced-motion: reduce)` gates: `.col-card img` transition is clamped to `1ms` and `.col-card:hover img` is set to `transform: none`.

## Files

- `collage-rhythm.css` — extracted, self-contained styles (class prefix `col-`). Easing in CSS var `--col-ease`.
- `demo.html` — standalone, double-click to open. Uses `picsum.photos` placeholder images. No JS (CSS-only pattern).

## Usage

Copy the markup and link the stylesheet. There is no script.

```html
<link rel="stylesheet" href="collage-rhythm.css" />

<!-- Asymmetric feature grid: first card spans 2 columns -->
<div class="col-grid">
  <a class="col-card" href="/routes/annapurna">
    <div class="col-frame"><img src="img/annapurna.jpg" alt="Annapurna" /></div>
    <div class="col-body">
      <span class="col-num">01</span>
      <h3 class="col-title">Annapurna Circuit</h3>
      <p class="col-note">A paced, supported loop.</p>
    </div>
  </a>
  <a class="col-card" href="/routes/ebc">
    <div class="col-frame"><img src="img/ebc.jpg" alt="Everest Base Camp" /></div>
    <div class="col-body">
      <span class="col-num">02</span>
      <h3 class="col-title">Everest Base Camp</h3>
      <p class="col-note">The classic pilgrimage.</p>
    </div>
  </a>
  <!-- more .col-card tiles... -->
</div>

<!-- Overlapping founder collage -->
<div class="col-founderArt" aria-hidden="true">
  <div class="col-ph col-ph1"><img src="img/a.jpg" alt="" /></div>
  <div class="col-ph col-ph2"><img src="img/b.jpg" alt="" /></div>
  <div class="col-ph col-ph3"><img src="img/c.jpg" alt="" /></div>
  <div class="col-seal">With<br />love</div>
</div>
```

### React / Next (JSX)

The same markup drops into a component unchanged; import the CSS and map your data over `.col-card`:

```tsx
import "./collage-rhythm.css";

export default function Collection({ routes }) {
  return (
    <div className="col-grid">
      {routes.map((r, i) => (
        <a className="col-card" key={r.slug} href={`/routes/${r.slug}`}>
          <div className="col-frame"><img src={r.image} alt={r.title} /></div>
          <div className="col-body">
            <span className="col-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="col-title">{r.title}</h3>
            <p className="col-note">{r.note}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
```
