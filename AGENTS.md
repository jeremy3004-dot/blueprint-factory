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
- Every new website should start with a donor URL from Jeremy when possible. If he does not provide one, ask for the first website to clone before building unless he explicitly asks the agent to choose.
- Pixel-perfect clone first, translation second. Before custom brand work, fully clone the donor's structure, colors, typography, spacing, assets, responsive behavior, and section rhythm.
- Verify the clone against donor desktop and mobile screenshots before translating it into the client brand, assets, copy, and goals.
- If no donor URL is provided and Jeremy asks the agent to choose, research at least three high-quality sector references and choose one 10/10 donor structure before build work.
- Use website cloning/reverse-engineering discipline for the donor: capture desktop/mobile screenshots, map the page topology, identify the interaction model, and extract the layout rhythm, motion pattern, typography hierarchy, asset strategy, and responsive behavior.
- Do not copy brand identity or protected content blindly for production. Clone the proven structure and quality bar first, then replace protected assets/content during the translation pass.
- `art-direction.md` must name the primary donor, secondary references, and the exact moves being borrowed.
- Beauty Pass must compare the build against the donor screenshots, not just against the agent's own taste.

Sites under `sites/<slug>/app` are self-contained. Copy reusable patterns from `factory/reference-library/`; do not import shared runtime code from the factory.

Ask before production deploys, paid service changes, external messages, destructive cleanup, major art-direction changes, or repo graduation.
