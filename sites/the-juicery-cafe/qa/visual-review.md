# Visual Review: The Juicery Cafe

## Latest Verdict

Status: NEEDS_HUMAN_BEAUTY_PASS

The production worker has not self-approved the Beauty Pass. The owner should review the shareable
preview, the motion captures, and the donor composites before changing this status.

## Signature Moment Check

Proposed moment: the warm sunrise aperture reveals the hero photograph while the oversized Juicery
wordmark resolves into the compact masthead and the visit-details card rises from the lower edge.

Evidence:

- `qa/motion/motion.webm`
- `qa/motion/motion-reduced.webm`
- `screenshots/desktop.png`
- `screenshots/mobile.png`

## Reference Comparison

- Translation structure: 85.2% in the final fresh verify report.
- Raw visual match: 68.0% desktop / 67.7% mobile in the final fresh verify report.
- Sections: 7 build / 7 donor.
- Worst measured band: band 4 at 47%, where the client food image/copy differs most from the donor.
- Primary donor: Gymkhana, captured under `references/reference-first/`.
- Supplemental identity source: The Juicery's current Wix site and reference-only TripAdvisor evidence.

## Clone Plan Coverage

- Built: `/`, `/food`, `/weekend-market`, `/fresh-baskets`, `/events`, `/events-1`, `/faq-s`, `/contact`.
- Deferred: `/my-account`, because the current route exposes a broken widget and no evidenced workflow.
- Interactions: full-screen menu, floating card dismissal, FAQ details, phone/WhatsApp/email/map links.
- Motion: CSS aperture/settle plus one-shot IntersectionObserver reveals; reduced-motion final states.
- Stack: Next.js App Router + React + global CSS; no CMS, auth, database, GSAP, Three.js, Lottie, or Rive.

## Human Beauty Pass Prompts

1. Does the hero signature moment feel like the right first impression for the cafe?
2. Is the text-only community pause better than showing an event photo on the homepage?
3. Does the darker Gymkhana-derived atmosphere still feel recognizably Juicery?
4. Are any routes better removed until the cafe supplies current market/basket information?
