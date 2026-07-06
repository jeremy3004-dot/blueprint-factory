# Text Reveal (split-line headline lift)

A masthead headline where **each line rises independently** on its own delay,
bracketed by an eyebrow line above and supporting copy below that rise on their
own schedule. Pure CSS — plays once on load, no JavaScript.

## Donor lineage

- **one-and-only-resorts** — the masthead `.heroCopy` block. It teaches the
  split-line move: the `<h1>` wraps each visual line in a `<span>` that is
  `display: block` and animated with `headlineLift` (rise `28px` + fade). Lines
  are staggered with `animation-delay` on `:nth-child`, while the eyebrow
  (`p:first-child`) and the descriptive paragraph (`p:last-child`) use a lighter
  `copyRise` (`16px`) at their own offsets. All share the donor easing
  `cubic-bezier(0.16, 1, 0.3, 1)` and the `both` fill mode so the start state is
  applied before the delay elapses (no flash of final text).

## When to use

- Hero / masthead headlines that should feel composed and deliberate on first
  paint.
- Anywhere a multi-line title benefits from lines cascading in rather than
  appearing all at once.
- Best when the headline is above the fold — the animation fires on load, not on
  scroll. For on-scroll text, pair the markup with the `scroll-reveal` pattern
  instead.

## How it works

- **Mechanism:** you manually split the headline into lines, one `<span>` per
  line. CSS gives each `span` `display: block` and the `headlineLift` keyframe.
  `:nth-child(n)` rules assign increasing `animation-delay`s so the lines
  cascade.
- **Timing/easing:**
  - Eyebrow (`copyRise`): 520ms, delay 160ms, travel 16px.
  - Headline lines (`headlineLift`): 980ms, delays 220ms / 320ms / 420ms, travel
    28px.
  - Trailing copy (`copyRise`): 520ms, delay 420ms.
  - Easing `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; `both` fill mode holds the
    from-state during the delay.

## Reduced-motion behavior

Under `prefers-reduced-motion: reduce`, every animated selector is reset to
`animation: none; opacity: 1; transform: none`, so the full headline and copy are
rendered statically at their final positions with no motion. The donor site
guarded this globally; this extraction guards each participating selector
explicitly.

## Files

- `text-reveal.css` — split-line lift, stagger, keyframes, reduced-motion guard.
- `demo.html` — standalone, double-click to run (reload to replay).

_No JS file: the effect is CSS-only._

## Usage

### HTML markup

Split the headline into one `<span>` per line yourself:

```html
<link rel="stylesheet" href="text-reveal.css" />

<div class="textReveal">
  <p>Eyebrow line</p>
  <h1>
    <span>Your One&amp;Only escape,</span>
    <span>your way</span>
  </h1>
  <p>Supporting sentence that rises in last.</p>
</div>
```

Need more than three headline lines? Add matching
`.textReveal h1 span:nth-child(N)` delay rules in the CSS.

### React / Next.js (TSX)

Same class names and markup; nothing to wire up in JS since it's CSS-driven:

```tsx
export function Masthead() {
  return (
    <div className="textReveal">
      <p>One&amp;Only Resorts and Private Homes</p>
      <h1 id="hero-title">
        <span>Your One&amp;Only escape,</span>
        <span>your way</span>
      </h1>
      <p>
        Where every stay unfolds with effortless freedom, authentic experiences
        and unscripted moments.
      </p>
    </div>
  );
}
```

Import `text-reveal.css` once (e.g. in `globals.css` or the component module).
