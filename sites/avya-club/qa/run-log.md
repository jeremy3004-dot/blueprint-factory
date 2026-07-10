# Run Log: avya-club

## Entries

### 2026-07-10T17:54:18.387Z

- Captured donor evidence pack from https://republicbos.com (4 viewports, 2 sections, 17 assets, 30 pages).
- Auto-drafted topology.md and clone-plan.md. Next gate: verify and complete the clone plan (set a real Decision: line), then art direction.

### 2026-07-11T01:00:16+05:45

- Task 3 live shell verification passed in isolated Chromium at 1440x1000, 768x1024, and 390x844 with no horizontal overflow or page-level JavaScript errors. A separate confirmation run observed a missing `/favicon.ico` 404, deferred to the production-asset task.
- Mobile keyboard flow passed: Enter open/close, `aria-expanded` transitions, logical focus order with forward/reverse wrapping, Escape close with toggle focus restoration, and body scroll-lock restoration.
- Reduced-motion emulation matched, interaction durations collapsed to `0.00001s`, and the header remained static/non-sticky at all three viewports.

### 2026-07-11T01:32:46+05:45

- Task 4 focused Chromium verification passed at 1440x1000 and 390x844. Hero geometry measured 1440x815.297 and 390x816 with zero horizontal overflow, no page-level JavaScript errors, and loaded Avya source media (`naturalWidth: 620`). Hero-only captures are `qa/screenshots/task4-hero-desktop.png` and `qa/screenshots/task4-hero-mobile.png`.
- Under `prefers-reduced-motion: reduce`, all three sequence buttons select their labelled state, the sequence stays on its selected state beyond the 6-second timer interval, and computed animation/transform values remain suppressed (`animation-name: none`, `transform: none`, transition `0.00001s`).
- Donor mismatch: the target full-bleed dimensions and left-aligned editorial type are recognizable, but Avya's single 620px collage produces framed, multi-plane imagery and desktop softness instead of the donor's immersive single-photo plane. Mobile is more fragmented than the donor because the collage, two-line headline, and large dark intervals compete; the shared shell's round `N` control also overlaps the hero's lower-left edge.
- Task 7 must replace the repeated collage with distinct, cleared, sufficiently high-resolution experience media for Pure energy, Deep recovery, and First light. This remains mandatory: crop changes of one source image do not make the three experience states visually distinct.
