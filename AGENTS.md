# Blueprint Factory: Agent Operating Instructions

Blueprint Factory builds high-craft animated websites. Optimize for standout visual quality first.

Every site must have:
- `brief.md`
- `art-direction.md` with one named signature moment
- `asset-log.md`
- `deploy.md`
- desktop and mobile screenshots
- motion capture when animation or scroll experience matters
- visual review

## Reference-First Build Rule
- Every new website starts by researching at least three high-quality sector references and choosing one 10/10 donor structure before custom build work.
- Use website cloning/reverse-engineering discipline for the donor: capture desktop/mobile screenshots, map the page topology, identify the interaction model, and extract the layout rhythm, motion pattern, typography hierarchy, and asset strategy.
- Do not copy brand identity or protected content blindly. Clone the proven structure and quality bar, then translate it into the client brand, assets, copy, and goals.
- `art-direction.md` must name the primary donor, secondary references, and the exact moves being borrowed.
- Beauty Pass must compare the build against the donor screenshots, not just against the agent's own taste.

Sites under `sites/<slug>/app` are self-contained. Copy reusable patterns from `factory/reference-library/`; do not import shared runtime code from the factory.

Ask before production deploys, paid service changes, external messages, destructive cleanup, major art-direction changes, or repo graduation.
