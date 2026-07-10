# Visual Review: The Juicery Cafe

## Latest Verdict

Status: READY_FOR_HUMAN_REVIEW

The second-pass visual audit is complete. Desktop, tablet, and mobile route captures were inspected,
the factory gate passes, and the protected preview is ready for the owner's final taste check.

## Signature Moment Check

Proposed moment: the warm sunrise aperture reveals the hero photograph while the oversized Juicery
wordmark resolves into the compact masthead and the visit-details card rises from the lower edge.

Evidence:

- `qa/motion/motion.webm`
- `qa/motion/motion-reduced.webm`
- `screenshots/desktop.png`
- `screenshots/mobile.png`

## Reference Comparison

- Translation structure: 85.0% in the second-pass fresh verify report.
- Raw visual match: 62.0% desktop / 52.6% mobile. This remains informational after translation.
- Sections: 7 build / 7 donor.
- Worst measured band: band 7 at 47%, where the Juicery visit/footer transition differs most from
  Gymkhana's longer destination/footer treatment.
- Primary donor: Gymkhana, captured under `references/reference-first/`.
- Supplemental identity source: The Juicery's current Wix site and reference-only TripAdvisor evidence.

## Clone Plan Coverage

- Built: `/`, `/food`, `/weekend-market`, `/fresh-baskets`, `/events`, `/events-1`, `/faq-s`, `/contact`.
- Deferred: `/my-account`, because the current route exposes a broken widget and no evidenced workflow.
- Interactions: focus-trapped full-screen menu, floating card dismissal, FAQ details, contextual
  phone/WhatsApp/email/map links.
- Motion: CSS aperture/settle plus one-shot IntersectionObserver reveals; reduced-motion final states.
- Stack: Next.js App Router + React + global CSS; no CMS, auth, database, GSAP, Three.js, Lottie, or Rive.

## Second-Pass Findings Resolved

1. Replaced the empty text-only community pause with a documentary two-image collage.
2. Added a concise facts rail and a morning-to-evening editorial sequence without adding fake offers.
3. Rewrote research/process language on food, market, basket, event, and FAQ routes as customer-facing copy.
4. Replaced soft exterior crops on market/contact with the sharper open-air counter image.
5. Restored the donor's 7-band topology after the first expansion briefly drifted to 9 bands.
6. Fixed the narrow-screen day-rhythm grid after screenshot review exposed title/body overlap.

## Remaining Honest Difference

The client photography is lower-resolution and more documentary than Gymkhana's commissioned imagery.
That difference is preserved rather than hidden with donor or reviewer-owned production assets.
