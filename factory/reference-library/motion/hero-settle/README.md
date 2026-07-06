# Hero Settle (image settles, card rises)

A full-bleed hero where the **background image settles** — fades in while easing
from a subtle `scale(1.03)` down to `1` — and a **foreground card rises** into
place, staggered to start `0.25s` after the image. Pure CSS, plays once on load.

## Donor lineage

- **bigmart** — the store-selector hero (`.heroImage` + `.selectorCard`). It
  teaches the two-layer settle: `imageSettle` (opacity 0→1, `scale(1.03)`→`1`
  over 1.2s) for the inset background image, and `cardRise` (opacity 0→1,
  `translateY(18px)`→`0` over 0.9s) for the overlay card, offset by a `0.25s`
  `animation-delay` so the card arrives just after the image has begun settling.
  Both use `both` fill mode.
- **Correction on top of the donor:** bigmart shipped these animations with **no
  `prefers-reduced-motion` guard at all**. This extraction **adds one** — required
  for the library. See the Reduced-motion section.

## When to use

- Landing / product heroes with a single strong image and a card, form, or CTA
  floating over it.
- When you want the hero to feel like it "assembles" on load: image first, then
  the actionable card.
- Above-the-fold only — it fires on load, not on scroll.

## How it works

- **Mechanism:** `.heroImage` (the inset background `<img>`) runs `imageSettle`;
  `.selectorCard` (the overlay) runs `cardRise` with a leading `0.25s` delay for
  the stagger. `z-index` keeps the card above the image; `overflow: hidden` on
  `.hero` clips the slight zoom.
- **Timing/easing:**
  - Image: `imageSettle` 1.2s, no delay, `scale(1.03)`→`1` + fade.
  - Card: `cardRise` 0.9s, **0.25s delay**, `translateY(18px)`→`0` + fade.
  - Easing `--ease: cubic-bezier(0.16, 1, 0.3, 1)` (inlined in bigmart; promoted
    to a custom property here). `both` fill mode prevents a pre-delay flash.

## Reduced-motion behavior

**Added in this extraction** (the bigmart donor had none). Under
`prefers-reduced-motion: reduce`, both `.heroImage` and `.selectorCard` get
`animation: none; opacity: 1; transform: none`, so the hero renders fully
composed with no zoom, fade, or rise.

## Files

- `hero-settle.css` — layout, `imageSettle` + `cardRise`, stagger, **added**
  reduced-motion guard.
- `demo.html` — standalone, double-click to run (reload to replay).

_No JS file: the effect is CSS-only._

## Usage

### HTML markup

```html
<link rel="stylesheet" href="hero-settle.css" />

<section class="hero" aria-label="Store selector">
  <img class="heroImage" src="your-image.jpg" alt="" />
  <div class="selectorCard">
    <p>Eyebrow</p>
    <h1>Headline</h1>
    <a href="#next">Call to action</a>
  </div>
</section>
```

The image must be a sibling of the card inside `.hero` (not a CSS background) so
`imageSettle` can transform it. Use `alt=""` for decorative hero imagery.

### React / Next.js (TSX)

Same class names and structure; nothing to wire up since it's CSS-driven:

```tsx
export function Hero() {
  return (
    <section className="hero" aria-label="Store selector">
      <img className="heroImage" src="/your-image.jpg" alt="" />
      <div className="selectorCard">
        <p>Your Neighbor</p>
        <h1>Select your nearest store.</h1>
        <a href="#story">Open the app story</a>
      </div>
    </section>
  );
}
```

Import `hero-settle.css` once. In Next.js, prefer `next/image` for production —
keep the `heroImage` class on it so the settle animation still applies.
