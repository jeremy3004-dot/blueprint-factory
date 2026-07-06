# masthead-reveal

A cinematic hero intro that plays once on page load: a solid masthead drops
in, the hero media de-blurs and settles (then breathes slowly), a white
"aperture" iris lifts away to reveal the image, and the copy rises in a
stagger.

## Donor lineage

- **Site:** one-and-only-resorts (flagship).
- **Move:** the mount-triggered masthead + hero intro — `.siteHeader` /
  `headerIn`, `.heroVideo` / `.heroFallback` de-blur (`heroImageIn`) plus the
  slow `heroBreath` loop, the `.heroAperture` box-shadow iris
  (`apertureLift`), and the staggered `.heroCopy` (`copyRise` / `headlineLift`).
  Class names are prefixed `mr-` here to keep the pattern self-contained.

## When to use

- A landing/home page where you want a single, confident intro moment above
  the fold.
- Any full-bleed hero (image or video) that benefits from a "curtain lift"
  reveal rather than a hard cut.
- Best paired with a fixed, solid header so the drop-in reads clearly.

## How it works

Everything is a CSS animation triggered by the element mounting — no scroll
listeners, no JS.

- **Header:** `mr-headerIn` translates the fixed bar down from `-100%`.
- **Media:** `mr-heroImageIn` animates from `blur(12px)` + `scale(1.04)` +
  `opacity 0` to a crisp settled frame, then `mr-heroBreath` runs an 18s
  infinite alternate `scale(1 → 1.035)` for a living-still feel.
- **Aperture:** a single overlay element whose `inset` `box-shadow` floods the
  whole stage white (`inset 0 0 0 50vw`) then collapses to `0` — reading as an
  iris opening. This is the signature trick.
- **Copy:** the kicker, each headline line, and the lede each carry their own
  `animation-delay`, producing a staggered rise (`mr-copyRise` /
  `mr-headlineLift`).
- **Layering:** the hero uses `isolation: isolate` and a negative z-index
  stack (fallback `-5`, media `-4`, veil `-3`, aperture `-1`, copy `0`).

Easing is centralized in the `--mr-ease` CSS variable
(`cubic-bezier(0.16, 1, 0.3, 1)`).

## Reduced-motion behavior

Under `prefers-reduced-motion: reduce`, every animation is collapsed to a
near-instant end-state (`animation-duration: 1ms`, delays zeroed, single
iteration). The result: header, media, aperture and copy all appear
already-settled with no perceptible motion and no breathing loop.

## Files

- `masthead-reveal.css` — the pattern (self-contained, no imports).
- `demo.html` — standalone demo; the intro plays on load.
- `README.md` — this file.

CSS-only: no JS file is needed.

## Usage

HTML markup:

```html
<header class="mr-header">
  <span></span>
  <a class="mr-brand" href="#">Brand</a>
  <span></span>
</header>

<section class="mr-hero" aria-labelledby="hero-title">
  <!-- Swap the first <img> for a <video> in production. -->
  <img class="mr-heroVideo" src="/hero.jpg" alt="" />
  <img class="mr-heroFallback" src="/hero.jpg" alt="" />
  <div class="mr-heroVeil"></div>
  <div class="mr-heroAperture" aria-hidden="true"></div>
  <div class="mr-heroCopy">
    <p class="mr-kicker">Kicker</p>
    <h1 id="hero-title"><span>Headline line one,</span><span>line two</span></h1>
    <p class="mr-lede">Supporting sentence.</p>
  </div>
</section>
```

React / TSX:

```tsx
import "./masthead-reveal.css";

export function Masthead() {
  return (
    <>
      <header className="mr-header">
        <span />
        <a className="mr-brand" href="#">Brand</a>
        <span />
      </header>

      <section className="mr-hero" aria-labelledby="hero-title">
        <video className="mr-heroVideo" autoPlay muted loop playsInline poster="/hero.jpg">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <img className="mr-heroFallback" src="/hero.jpg" alt="" />
        <div className="mr-heroVeil" />
        <div className="mr-heroAperture" aria-hidden="true" />
        <div className="mr-heroCopy">
          <p className="mr-kicker">Kicker</p>
          <h1 id="hero-title">
            <span>Headline line one,</span>
            <span>line two</span>
          </h1>
          <p className="mr-lede">Supporting sentence.</p>
        </div>
      </section>
    </>
  );
}
```
