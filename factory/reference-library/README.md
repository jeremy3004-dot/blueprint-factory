# Blueprint Factory Reference Library

Proven, copy-paste-ready motion / component / section patterns — extracted from real Blueprint Factory
builds that passed the Beauty Pass. This is the factory's craft memory: agents produce janky motion when
they invent it and good motion when they copy a proven pattern.

## The rule

**Check this library before writing any motion or interactive component from scratch. If you build a new
pattern that passes the Beauty Pass, contribute it back here.** That is what makes the factory compound:
every clone makes the next clone better.

- **Copy from, never import.** Sites stay self-contained (see `AGENTS.md`). Copy the CSS/JS/TSX into the
  site and adapt it; do not add a runtime dependency on this folder.
- **Every pattern handles reduced motion.** Each `*.css` has a `@media (prefers-reduced-motion: reduce)`
  block and interactive JS early-returns under `prefers-reduced-motion`. Keep it that way.
- **Each pattern is runnable in isolation.** Open any pattern's `demo.html` directly in a browser (no
  build), or open `demo/index.html` for the index of all demos.

## Patterns

### motion/
| Pattern | What it teaches | Donor lineage |
| ------- | --------------- | ------------- |
| [scroll-reveal](motion/scroll-reveal/) | One-shot IntersectionObserver reveal, per-item `--delay` stagger | alpine-bloom + four-seasons |
| [text-reveal](motion/text-reveal/) | Split-line headline lift, staggered | one-and-only-resorts |
| [hero-settle](motion/hero-settle/) | Full-bleed hero image settle + card rise on load | bigmart |
| [masthead-reveal](motion/masthead-reveal/) | Solid masthead → living media via aperture iris | one-and-only-resorts |
| [parallax-media](motion/parallax-media/) | Restrained hover zoom, `hover:hover`-gated | one-and-only-resorts |
| [lenis-smooth-scroll](motion/lenis-smooth-scroll/) | Canonical Lenis boot, skipped under reduced motion | alpine-bloom |

### components/
| Pattern | What it teaches | Donor lineage |
| ------- | --------------- | ------------- |
| [carousel](components/carousel/) | Tab-filtered prev/active/next carousel, key-remount entrance, ARIA tablist | four-seasons |
| [media-gallery](components/media-gallery/) | Folding gallery, active-panel lift, mobile snap | one-and-only-resorts |
| [accordion](components/accordion/) | Accessible single-open accordion with +/- glyph | one-and-only-resorts |
| [marquee](components/marquee/) | Seamless CSS ticker (new to the library, not extracted) | — |

### sections/
| Pattern | What it teaches | Donor lineage |
| ------- | --------------- | ------------- |
| [collage-rhythm](sections/collage-rhythm/) | Asymmetric editorial collage grid | alpine-bloom |
| [story-band](sections/story-band/) | Full-bleed editorial image band with legibility scrim | bigmart |

## Running the demos

Open any `demo.html` directly (double-click), or start a static server from this folder and browse
`demo/index.html`:

```bash
cd factory/reference-library && python3 -m http.server 8080
# then open http://localhost:8080/demo/index.html
```

Demos pull placeholder imagery from picsum.photos, so they need a network connection.
