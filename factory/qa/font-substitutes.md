# Font Substitutes

Donor fonts on luxury/marketing sites are usually commercially licensed (Apple's SF Pro, Helvetica,
Canela, Freight, GT families, Circular, Graphik…). We never ship a licensed font we do not own. This is
the curated map from common donor fonts to the closest freely-usable open alternative (Google Fonts /
open license). `blueprint tokens <slug>` applies it automatically and records the decision in the site's
`asset-log.md`.

Rule: **check this table before choosing a font.** If a donor font is not listed and gets auto-substituted
by the serif/sans heuristic, verify the choice by eye and add a proper row here so the next clone inherits it.

## Already open (kept as-is)

Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Work Sans, Nunito, Raleway, Playfair Display, Lora,
Merriweather, PT Serif, PT Sans, EB Garamond, Cormorant Garamond, Fraunces, Libre Baskerville, Jost,
Manrope, Sora, Space Grotesk, DM Sans, DM Serif Display, Archivo, Hind, Karla, Rubik, Mulish, Figtree,
Instrument Serif.

## Substitutions

| Donor font (licensed) | Open substitute | Fallback | Why |
| --------------------- | --------------- | -------- | --- |
| SF Pro Display / Text | Inter | sans-serif | SF Pro is Apple-proprietary |
| Helvetica / Helvetica Neue | Inter | sans-serif | Licensed |
| Arial | Archivo | sans-serif | Licensed / system |
| Times New Roman / Times | PT Serif | serif | Licensed / system |
| Georgia | Lora | serif | Licensed / system |
| Futura | Jost | sans-serif | Licensed |
| Didot | Playfair Display | serif | Licensed high-contrast serif |
| Bodoni | Playfair Display | serif | Licensed high-contrast serif |
| Garamond | EB Garamond | serif | Licensed / system |
| Baskerville | Libre Baskerville | serif | Licensed / system |
| Gill Sans | Hind | sans-serif | Licensed |
| Canela | Fraunces | serif | Commercial license |
| Freight | Cormorant Garamond | serif | Commercial license |
| GT Sectra | Fraunces | serif | Commercial license |
| GT America | Archivo | sans-serif | Commercial license |
| Circular | Manrope | sans-serif | Commercial license |
| Graphik | Inter | sans-serif | Commercial license |

## Unmapped donor fonts

If a donor font is not open and not in the table, `blueprint tokens` substitutes by a serif/sans-serif
heuristic (serif → Lora, sans → Inter) and marks the decision with "verify the substitution" in the asset
log. Confirm it looks right, then add a row above.
