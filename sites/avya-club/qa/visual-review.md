# Visual Review: avya-club

## Latest Verdict

Status: NEEDS_HUMAN_BEAUTY_PASS

## Signature Moment Check

The homepage First Light Sequence moves among Pure energy, Deep recovery, and First light using three distinct Avya-owned image planes. Normal motion advances automatically and remains directly selectable; reduced motion disables the timer while preserving button control.

## Reference Comparison

Compare scores (from `qa/compare/report.md`):
- Final translated pixel match: desktop 36.6% / mobile 52.2%.
- Worst measured section: desktop band 4, y 2592–3456 (20.1%).
- Official mechanical structure score: 27.7% — the extractor reports 10 build sections versus 2 donor sections, a 55% heading-hierarchy match, 18% grayscale row-profile rhythm, and 100% media/text band agreement.
- Contextual ten-band structure interpretation: 87.7% — this separately treats the donor's ten visually verified content bands as the denominator. It is reviewer context, not a replacement for the official 27.7% factory score.
- Style tokens: 50% donor-palette coverage; heading and body fonts intentionally do not match because production uses open Avya-appropriate substitutes rather than donor proprietary faces.

Primary donor: Republic BOS (`https://republicbos.com`) for its editorial sequencing, full-bleed photography, restrained navigation, and section rhythm.

Secondary references: Avya Club (`https://avya.club`) for all client identity, factual copy, services, membership labels, contact details, and production media.

## Clone Plan Coverage

Pages/routes: `/`, `/about`, `/services`, `/gallery`, `/contact`, `/membership`.

Flows/states: desktop navigation, keyboard-safe mobile menu, hero sequence selection, membership and contact CTAs, horizontally scrollable mobile experience cards.

Animation mechanisms: timed hero state changes, image crossfades, restrained reveal transitions, and complete `prefers-reduced-motion` handling.

Stack fit: static Next.js app with no backend dependency; the Vercel preview is deployed but protected by Vercel SSO until the owner disables preview Deployment Protection.

## Scores

- Initial clone pixel: desktop 35.5%, mobile 52.9%.
- Final translated pixel: desktop 36.6%, mobile 52.2%.
- Official translation structure: **27.7%** because the extractor mechanically identifies only 2 donor sections.
- Contextual ten-band structure interpretation: **87.7%**; this is a separately calculated review aid based on the ten visually verified donor bands. The DOM and detector were not altered, and this number does not supersede the official score.

## Highest Impact Next Fix

Human Beauty Pass should decide whether the desktop band-four spacing and photographic crop need another craft pass; the mechanical compare reports that band at 20.1%.

## Beauty Pass 2026-07-10T21:15:10.722Z

Status: NEEDS_HUMAN_BEAUTY_PASS

Evidence present. Run the rubric against screenshots, motion, and named references before setting Latest Verdict to READY_FOR_REVIEW.
