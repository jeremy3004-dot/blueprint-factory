# marquee

A clean, continuous ticker/marquee strip. Two identical tracks scroll left as
one unit; when the first has fully passed, the second is sitting exactly where
it began — so the loop is seamless with no visible seam or reset jump. Pure CSS.

## Donor lineage

- **New to the library — not extracted.** This pattern has no donor site; it
  was authored fresh to fill a gap. (The other motion patterns in this library
  are faithful extractions; this one is not.)

## When to use

- Announcement bars, "trusted by" logo strips, award/press mentions, or any
  running headline you want to keep gently in motion.
- When you need a loop that never stutters at the wrap point and want zero JS.

## How it works

- `.mq-marquee` is an `overflow: hidden` frame with an optional edge mask so
  items fade in/out at the sides instead of clipping hard.
- `.mq-track` contains **two identical `.mq-group` copies**. The whole track
  animates `translateX(0)` to `translateX(-50%)` — exactly one copy's width —
  so at the end of the cycle copy B occupies copy A's start position. Looping
  that keyframe is therefore visually seamless.
- Timing is `linear` (constant ticker speed). Duration, gap and easing are
  exposed as `--mq-duration`, `--mq-gap`, `--mq-ease` variables.
- Hovering the strip sets `animation-play-state: paused` for readability.
- **Accessibility:** duplicate the content in markup, but mark the second copy
  `aria-hidden="true"` so screen readers read the strip once.

## Reduced-motion behavior

Under `prefers-reduced-motion: reduce` the scroll animation is disabled
(`animation: none`, `transform: none`) so the strip is completely still. The
edge mask is also dropped and the frame becomes horizontally scrollable, so the
full (now static) content stays reachable and legible. This is a hard
requirement for the pattern and is handled in CSS.

## Files

- `marquee.css` — the pattern + reduced-motion handling (self-contained).
- `demo.html` — standalone demo; the ticker scrolls on load, pauses on hover.
- `README.md` — this file.

CSS-only: no JS file is needed.

## Usage

HTML markup (duplicate the group; hide the second copy from AT):

```html
<div class="mq-marquee">
  <div class="mq-track">
    <div class="mq-group">
      <span class="mq-item">Item one</span>
      <span class="mq-item">Item two</span>
      <span class="mq-item">Item three</span>
    </div>
    <div class="mq-group" aria-hidden="true">
      <span class="mq-item">Item one</span>
      <span class="mq-item">Item two</span>
      <span class="mq-item">Item three</span>
    </div>
  </div>
</div>
```

React / TSX (render the group twice from one array):

```tsx
import "./marquee.css";

const items = ["Item one", "Item two", "Item three"];

export function Marquee() {
  const Group = ({ hidden }: { hidden?: boolean }) => (
    <div className="mq-group" aria-hidden={hidden}>
      {items.map((t, i) => <span className="mq-item" key={i}>{t}</span>)}
    </div>
  );
  return (
    <div className="mq-marquee">
      <div className="mq-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
```
