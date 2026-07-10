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

### 2026-07-11T02:05:00+05:45

- Task 6 route verification passed for `/`, `/about`, `/services`, `/gallery`, `/contact`, and `/membership` at 1440px and 390px: every document returned 200, each had one route-appropriate H1, and every page had zero horizontal overflow.
- Every page exposed the exact six internal navigation routes. All six internal destinations returned HTTP 200 from every route at both widths.
- The controlled local server was stopped after verification. The known missing `/favicon.ico` remains assigned to Task 7 asset clearance.

### 2026-07-11T01:58:00+05:45

- Task 5 review fix verified in controlled Chromium against the production build at `127.0.0.1:4175`, then the server was stopped. Normal-motion Experience Grid layers computed `transition-duration: 0.75s`; at 100ms after hovering Club House the old/new opacities were `0.876853 / 0.123147`, and they settled to `0 / 1`. Club House remained selected after the pointer left the card. Keyboard focus selected Physiotherapy, click selected Club House, and each change updated `aria-current="true"`.
- At 390px, `.experienceCards` computed `overflow-x: auto`, measured `382px` client width against `818px` scroll width, and accepted a native horizontal scroll from `0` to `180`. Under `prefers-reduced-motion: reduce`, the media transition computed `0.00001s` and selection immediately produced opacities `[0, 0, 1]`.
- Browser runtime loaded three distinct Experience Grid sources with natural widths `620`, `1998`, and `6240`; the new client-owned Club House source `https://serveravya.onrender.com/api/media/file/club2.jpg` measured `6240×4160`. It remains a remote production candidate and must be downloaded, reviewed, and cleared locally in Task 7.
- Fresh gates: `pnpm --dir sites/avya-club/app test` passed `11/11`; `pnpm --dir sites/avya-club/app exec tsc --noEmit` exited `0`; `pnpm --dir sites/avya-club/app build` compiled and statically prerendered `/` successfully.

### 2026-07-11T02:22:14+05:45

- Task 6 review fix captured two focused RED/GREEN cycles. The inventory test first failed on the wildcard/incomplete manifest, then passed after recording exactly six built routes plus 11 individual Avya and 30 full-URL Republic deferrals. The copy test then failed on missing provenance and flagged filler, then passed after all five inner routes consumed typed `pageCopy` records with captured Avya phrases.
- Membership coverage now asserts every option label, not only group names. The unsourced `Contact Avya for current pricing` note and other review-flagged marketing filler were removed without inventing amounts or replacement claims; contact and registration actions remain intact.
- Fresh gates passed: app tests `18/18`, `tsc --noEmit`, and the production build with all six routes statically prerendered.
- Controlled Chromium at 1440×1000 and 390×844 passed all six routes with HTTP `200`, one expected H1, one `main`, all six internal destinations, zero horizontal overflow, and zero page-level errors. The server was stopped and `next-env.d.ts` restored to SHA-1 `16f9ac398c0d5e5fe79b8d0973cb1c13ee21235d`.
