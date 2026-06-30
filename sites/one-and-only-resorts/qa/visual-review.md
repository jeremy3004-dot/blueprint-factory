# Visual Review: one-and-only-resorts

## Latest Verdict

Status: READY_FOR_REVIEW

## Signature Moment Check

The Resort Aperture Reveal exists in the build: the page arrives through a fixed white masthead into living resort media, with the small uppercase label and two-line serif headline settling over the hero. The effect is intentionally restrained so it feels like luxury editorial hospitality rather than a motion demo.

Motion evidence:

- `sites/one-and-only-resorts/qa/motion/page@876a186f49b284662b93e8a272ac0d7d.webm`

## Reference Comparison

Primary donor: One&Only Resorts homepage.

- Borrowed: fixed white centered-logo masthead, full-screen video/image hero, tiny uppercase overline, delicate serif headline, inset global-destinations media panel, split stays block, centered experiences intro, folding gallery with side peeks, three editorial story cards, private homes split, quiet story/offers sections, benefits strip, and pale footer.
- Diverged intentionally: logo is text-rendered, not copied as a production asset; booking is a local overlay, not a real reservation engine; footer marks are text approximations; donor DAM media remains local reference-only and must be replaced before production.
- Current gap: mobile hero media follows the donor media composition but can feel more boxed than ideal because the donor video frame is narrow in the captured viewport. It remains acceptable for owner review.

Secondary references:

- Four Seasons Blueprint Factory clone: focus-safe overlays, reduced-motion handling, and TypeScript/React site structure.
- Blueprint Factory Beauty Pass rubric: evidence-first scoring against donor screenshots.

## Clone Plan Coverage

`references/reference-first/clone-plan.md` covers page inventory, flow map, responsive rhythm, interaction audit, media/font strategy, stack decision, tools not needed, and builder handoff. The implementation follows the stack decision: TypeScript + Next.js App Router + React + Tailwind/global CSS, with CSS motion and local React state only.

## Scores

- First-screen impact: 4
- Signature moment: 4
- Typography: 4
- Layout rhythm: 4
- Motion craft: 3
- Color and imagery: 4
- Mobile: 3
- Coherence: 4

## Highest Impact Next Fix

Before production, replace every donor DAM URL and any exact One&Only/Kerzner brand language with licensed or generated assets. For the next visual pass, the highest-impact design fix would be a more naturally full-bleed mobile hero crop using replacement resort footage.
