# Forensic Analysis: Why The First Alpine Bloom Run Wandered

## What went wrong

The user asked for a Blueprint run, then specifically asked to clone WHOA Travel. I treated the reference as inspiration too early. That produced a Himalayan site with some reference-derived ideas, but not a pixel-perfect donor clone.

## Root cause

- I optimized for "translated brand concept" before proving the donor page structure.
- I accepted my own visual taste as sufficient instead of comparing section geometry against the WHOA desktop and mobile screenshots.
- I marked Beauty Pass ready too soon because the factory gates checked for evidence presence, not donor fidelity.
- During the correction pass, the dev server served stale CSS once; that made a screenshot look unstyled and exposed that I needed to verify the running preview before judging quality.

## Corrected rule

Pixel-perfect donor clone first. Translation second.

For a clone request, the required order is:
1. Capture donor desktop and mobile.
2. Rebuild donor layout, colors, type scale, spacing, and section order as closely as possible.
3. Compare screenshots section by section.
4. Only then translate brand/content to the requested subject.

## Concrete fix applied here

- WHOA Travel is now the primary and only donor for this rebuild.
- Old AdventureWomen/Wild Women reference evidence was removed from the active reference-first folder.
- Alpine Bloom now uses WHOA's white field, hot pink accent, black type, mint display words, centered wordmark, left menu, large top collage, polaroid rhythm, black media frame, sparse "way" section, founder note, and compact footer structure.
- The preview server was restarted before the second screenshot pass to ensure CSS was actually loaded.

## Remaining quality gate

The site should not be considered done until the latest screenshots are compared directly against `references/whoa-clone/whoa-desktop.png` and `references/whoa-clone/whoa-mobile.png`, with deviations fixed or explicitly documented.
