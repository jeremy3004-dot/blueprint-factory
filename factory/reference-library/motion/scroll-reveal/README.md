# Scroll Reveal (one-shot, staggered)

The flagship reveal pattern: elements fade + lift into place the first time they
scroll into view, staggered per-item via a `--delay` CSS variable, and never
re-hide.

## Donor lineage

- **alpine-bloom** — teaches the whole mechanism: `[data-reveal]` starts hidden
  (`opacity: 0; translateY(34px)`), gets `.in` added by an `IntersectionObserver`,
  and reads a per-element `--delay` custom property for stagger. Crucially,
  alpine-bloom is the **gold standard for reduced-motion**: its
  `@media (prefers-reduced-motion: reduce)` block forces `opacity: 1`,
  `transform: none`, `transition: none`, and `html { scroll-behavior: auto }`.
- **four-seasons `motionReveal`** — same intent (staggered on-scroll reveal); this
  pattern generalizes both into one attribute-driven primitive.

## When to use

- Editorial / marketing sections where content should feel like it "arrives" as
  the reader scrolls.
- Any list, grid, or hero sub-copy where a gentle stagger adds polish.
- Prefer this over scroll-linked (scrubbed) animation when you want a simple,
  performant, one-shot effect that doesn't fight the user's scrolling.

## How it works

- **Mechanism:** CSS hides every `[data-reveal]` element and defines the
  transition. `scroll-reveal.js` observes them with an `IntersectionObserver`
  (`threshold: 0.16`, `rootMargin: "0px 0px -8% 0px"` so it fires slightly before
  the element is fully on screen). On intersection it adds `.in` and
  **unobserves** the element — one-shot, no re-trigger on scroll-up.
- **Stagger:** each element sets `style="--delay: 200ms"`. The CSS uses
  `transition-delay: var(--delay, 0ms)`, so siblings cascade.
- **Timing/easing:** `0.9s` opacity + transform, easing
  `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (a soft "ease-out-back-ish" curve
  from alpine-bloom). Travel distance is `34px`.

## Reduced-motion behavior

Two layers of safety:

1. **CSS:** under `prefers-reduced-motion: reduce`, `[data-reveal]` is forced to
   its final visible state with no transition.
2. **JS:** `initScrollReveal()` early-returns when reduced motion is requested, so
   no observer is created and `.in` is never added. Content is fully visible from
   first paint.

## Files

- `scroll-reveal.css` — hidden/visible states, stagger, reduced-motion guard.
- `scroll-reveal.js` — self-initializing `IntersectionObserver` (no imports).
- `demo.html` — standalone, double-click to run.

## Usage

### HTML markup

```html
<link rel="stylesheet" href="scroll-reveal.css" />

<p data-reveal>No delay</p>
<h2 data-reveal style="--delay: 120ms">Rises 120ms later</h2>
<div data-reveal style="--delay: 240ms">…and this 240ms later</div>

<script src="scroll-reveal.js"></script>
```

Add `data-reveal` to anything you want revealed; add `style="--delay: Nms"` to
stagger it. That's the whole API.

### React / Next.js (TSX)

The CSS is identical. In React you attach the same attribute and drive the
observer from an effect (mirrors alpine-bloom's `page.tsx`):

```tsx
"use client";
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// In a component:
// useScrollReveal();
// <h2 data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>Title</h2>
```
