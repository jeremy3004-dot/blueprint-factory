# accordion

An accessible, single-open accordion. Each section has a real `<button>`
header with a `+` / `-` glyph; opening one section closes the others. State
lives in `aria-expanded` (button) and `[hidden]` (panel), so the visual and the
assistive-tech state can never drift apart.

## Donor lineage

- **Site:** one-and-only-resorts (responsive footer accordion).
- **Move:** the `.footerLinks` single-open pattern — one column open at a time
  (React `openFooter` state), the `+` / `-` glyph via `::after`, and
  `.isOpen ul { display: grid }` to reveal the panel.
- **Added here:** proper `<button>` + `aria-expanded` / `aria-controls`
  semantics and a `role="region"` panel, so the pattern is accessible
  standalone rather than relying on a specific framework's render.

## When to use

- Footers with grouped link columns that should collapse on narrow screens.
- FAQ sections, filter groups, or any list of disclosure sections where only
  one open at a time keeps the page tidy.

## How it works

- Each `.ac-item` holds a `.ac-trigger` button and a `.ac-panel`.
- The glyph is a CSS `::after` on the trigger, switched purely by the
  `aria-expanded` attribute (`"+"` when false, `"-"` when true) — no extra
  class to keep in sync.
- The panel is shown/hidden with the native `[hidden]` attribute; CSS maps
  `:not([hidden])` to `display: grid`.
- `accordion.js` self-initializes on `DOMContentLoaded` for every
  `[data-accordion]`. On click it closes all siblings, then toggles the clicked
  trigger — enforcing single-open — and keeps `aria-expanded` + `[hidden]` in
  lockstep. An item can start open by setting `aria-expanded="true"` and
  omitting `hidden` in the initial HTML.

Easing for the glyph swap is centralized in the `--ac-ease` CSS variable.

## Reduced-motion behavior

Open/close is a plain `display` toggle — there is no height/slide animation to
worry about. The only motion is the glyph's 180ms transition, which the
`prefers-reduced-motion: reduce` block removes. The JS performs no animation,
so it needs no motion guard.

## Files

- `accordion.css` — styles + reduced-motion handling.
- `accordion.js` — self-initializing vanilla controller (single-open, aria).
- `demo.html` — standalone demo.
- `README.md` — this file.

## Usage

HTML markup:

```html
<div class="ac-accordion" data-accordion>
  <div class="ac-item">
    <button class="ac-trigger" aria-expanded="true" aria-controls="p1">About</button>
    <div class="ac-panel" id="p1" role="region" aria-label="About">
      <a href="#">Our Story</a>
      <a href="#">Contact Us</a>
    </div>
  </div>
  <div class="ac-item">
    <button class="ac-trigger" aria-expanded="false" aria-controls="p2">Discover</button>
    <div class="ac-panel" id="p2" role="region" aria-label="Discover" hidden>
      <a href="#">Destinations</a>
      <a href="#">Careers</a>
    </div>
  </div>
</div>

<script src="accordion.js"></script>
```

React / TSX (self-contained, no external controller needed):

```tsx
import { useState } from "react";
import "./accordion.css";

const columns = [
  { title: "About", links: ["Our Story", "Contact Us"] },
  { title: "Discover", links: ["Destinations", "Careers"] },
];

export function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="ac-accordion">
      {columns.map((col, i) => {
        const isOpen = open === i;
        return (
          <div className="ac-item" key={col.title}>
            <button
              className="ac-trigger"
              aria-expanded={isOpen}
              aria-controls={`ac-p${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {col.title}
            </button>
            <div className="ac-panel" id={`ac-p${i}`} role="region"
                 aria-label={col.title} hidden={!isOpen}>
              {col.links.map((l) => <a href="#" key={l}>{l}</a>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```
