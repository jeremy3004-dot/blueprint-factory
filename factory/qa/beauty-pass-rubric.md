# Beauty Pass Rubric

This is how visual quality is judged. It is the heart of the factory. A site that builds cleanly but does not pass this is not ready.

The Beauty Pass exists to catch the failure mode an AI builder is most prone to: producing something competent and completely generic, then failing to notice. The defenses against that are concrete comparison and motion capture. Abstract standards like "make it high craft" do not work, because the same judgment that produced the generic version will approve it. So this rubric forces the site to be compared against named references and judged in motion, not just in stills.

## Inputs Required Before A Beauty Pass

- The site's `art-direction.md`, especially the signature moment and the reference comparanda.
- Primary donor screenshots and topology notes from the reference-first clone pass.
- Desktop and mobile screenshots from `blueprint screenshots`.
- A scroll-through video capture from `blueprint motion`, saved under `qa/motion/`.

If the motion capture is missing, stop and capture it before judging.

## The Signature-Moment Check

Before scoring anything else, answer one question: does the signature moment described in `art-direction.md` actually exist in the build, and does it land in the motion capture?

If it is missing, weak, or feels like decorative filler, the site fails this check regardless of how polished everything else is. The highest-impact fix is always the signature moment first.

## Reference Comparison

For each reference in `art-direction.md`, compare the site against the specific thing that reference was chosen to teach. Write the comparison in `qa/visual-review.md`.

The primary donor comparison is mandatory. If there is no donor screenshot/topology evidence, the site cannot pass. The goal is not pixel-perfect plagiarism; the goal is to prove the build inherited a 10/10 structure, section rhythm, and interaction model before translating it into the client brand.

For each one, record:

- The move being compared.
- How the reference does it.
- How this site does it right now.
- The gap, and the one change that would close it.

## Scoring Dimensions

Rate each from 1 to 5. Note the single highest-impact issue across all of them. Do not try to fix everything at once.

1. First-screen impact.
2. Signature moment.
3. Typography.
4. Layout and rhythm.
5. Motion craft.
6. Color and imagery.
7. Mobile.
8. Coherence.

## Fail Conditions

Any one of these blocks a pass:

- Bland or centered-gradient-blob hero with no concept.
- Stock SaaS layout: hero, three identical feature cards, logo strip, generic footer, nothing else.
- Weak typography with no intentional move.
- No signature moment, or a signature moment that is decorative rather than meaningful.
- The same section pattern repeated down the page.
- Purposeless motion that does not serve the concept.
- Mobile treated as an afterthought.
- Inner pages or sections that feel like a different, lesser site than the homepage.

## The Loop

1. Capture desktop and mobile screenshots and the scroll-through video.
2. Run the signature-moment check. If it fails, that is the issue to fix.
3. Run the reference comparison and score the dimensions.
4. Pick the single highest-impact issue.
5. Make one focused change.
6. Rebuild, recapture, and review again.
7. Stop when one of the stop conditions below is met.

## Stop Conditions

Stop the loop when any of these is true:

- The site passes: signature moment lands, no fail conditions, no dimension below 3, and the reference comparisons show no large gaps.
- Progress has stalled: two consecutive passes produced no meaningful improvement.
- The required human review is due, after the first Beauty Pass produces a viewable build and before any production deploy.

## What To Record

In `qa/visual-review.md`, for each pass:

- The motion capture file referenced.
- The signature-moment check result.
- The reference comparison notes.
- The dimension scores.
- The one change made this pass.
- Whether the site now passes, has stalled, or needs the human gate.
