# Lenis Smooth Scroll (reduced-motion aware boot)

A canonical [Lenis](https://github.com/darkroomengineering/lenis) smooth-scroll
boot module that **skips Lenis entirely under `prefers-reduced-motion`** — no
instance, no RAF loop — leaving native scrolling untouched for users who ask for
reduced motion.

## Donor lineage

- **alpine-bloom** — its `page.tsx` startup effect. It teaches the exact,
  disciplined boot:
  1. Read `prefers-reduced-motion` **first**.
  2. Only if motion is allowed, `new Lenis({ duration: 1.1, smoothWheel: true })`
     and drive it with a `requestAnimationFrame` loop calling `lenis.raf(t)`.
  3. On teardown, `cancelAnimationFrame` + `lenis.destroy()`.
  This extraction preserves those exact options and the guard ordering.

## When to use

- Editorial / marketing sites that want inertial "momentum" scrolling and
  smooth, eased anchor jumps.
- Pairs naturally with the `scroll-reveal` pattern (Lenis for the feel,
  IntersectionObserver for the reveals).
- Skip it for app-like UIs, long virtualized lists, or anywhere hijacking scroll
  would fight the user.

## How it works

- **Mechanism:** Lenis intercepts wheel/touch input and interpolates the scroll
  position each frame. `initSmoothScroll()` creates one Lenis instance and runs a
  single RAF loop (`lenis.raf(timestamp)` → `requestAnimationFrame`), returning a
  cleanup function that cancels the loop and destroys the instance.
- **Timing/easing:** `{ duration: 1.1, smoothWheel: true }` — the alpine-bloom
  values. Lenis owns its own internal easing; `duration` (seconds) controls how
  long it takes to catch up to the target scroll position. The companion CSS
  exposes `--ease: cubic-bezier(0.22, 1, 0.36, 1)` for any related transitions.
- **Buildless note:** Lenis is an **npm library**. A double-click `demo.html`
  can't `npm install`, so the demo loads Lenis from a CDN `<script>` and the boot
  module reads it from `window.Lenis`. If that's unavailable (offline / blocked),
  the module **no-ops** and the page falls back to CSS
  `scroll-behavior: smooth` (in `lenis-smooth-scroll.css`). In a real bundled app
  you use `import Lenis from "lenis"` instead — see Usage.

## Reduced-motion behavior

Belt and suspenders:

1. **JS:** `initSmoothScroll()` returns immediately (a no-op cleanup) when
   `prefers-reduced-motion: reduce` matches — Lenis is never constructed and no
   RAF loop runs.
2. **CSS:** the reduced-motion media block sets `html { scroll-behavior: auto }`,
   so even the smooth-anchor fallback becomes instant.

## Files

- `lenis-smooth-scroll.js` — the boot module (self-inits on `DOMContentLoaded`,
  or `export { initSmoothScroll }` for frameworks).
- `lenis-smooth-scroll.css` — recommended Lenis base styles + a CSS smooth-scroll
  fallback + reduced-motion guard.
- `demo.html` — standalone; loads Lenis from CDN with graceful fallback.

## Usage

### Bundled app (Vite / webpack / plain ESM with a bundler)

Install Lenis and enable the import at the top of the module:

```bash
npm install lenis
```

```js
// lenis-smooth-scroll.js
import Lenis from "lenis"; // <- uncomment this line
```

Then import the CSS once and call the boot from your entry point:

```js
import "./lenis-smooth-scroll.css";
import { initSmoothScroll } from "./lenis-smooth-scroll.js";

const cleanup = initSmoothScroll(); // no-ops under reduced motion
// window.addEventListener("beforeunload", cleanup);
```

### React / Next.js (TSX) — mirrors the alpine-bloom donor

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "./lenis-smooth-scroll.css";

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

// Call useSmoothScroll() once near the root of your app.
```

### Buildless HTML (the demo)

```html
<link rel="stylesheet" href="lenis-smooth-scroll.css" />
<!-- Lenis from CDN so window.Lenis exists; optional -->
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script type="module" src="lenis-smooth-scroll.js"></script>
```
