# Avya Club Preview Handoff

## Owner summary

Avya Club now has a six-route, responsive website built from Republic BOS's editorial structure and translated entirely into Avya's identity and source-backed content. The homepage signature moment is the First Light Sequence, which moves through Pure energy, Deep recovery, and First light using distinct Avya-owned photography. All local automated gates pass: lint, tests, typecheck, production build, console checks, six internal routes, and critical/serious accessibility checks. The latest Vercel preview is `https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app`, but Vercel Deployment Protection redirects unauthenticated visitors to SSO. Nothing was deployed to production; disable preview protection, reverify the public URL, then perform the owner's human Beauty Pass.

## Reference and scores

- Primary donor: Republic BOS (`https://republicbos.com`) for full-bleed editorial imagery, restrained navigation, typography hierarchy, and section rhythm.
- Brand source: Avya Club (`https://avya.club`) for facts, service names, membership labels, contact details, logo, icons, and all production photography.
- Initial clone pixel score: desktop 35.5%, mobile 52.9%.
- Final translated pixel score: desktop 36.6%, mobile 52.2%.
- Official translation structure score: 27.7%; the comparator mechanically extracts 2 donor sections versus the 10 visually verified donor bands.
- Corrected ten-band interpretation using the unchanged formula: 87.7%. This is contextual evidence, not a replacement for the official score.
- Weakest mechanical comparison area: desktop band 4 at 20.1%.

## Verification and evidence

- App and brand-source lint: passed.
- App tests: 26/26 passed.
- TypeScript: passed with no type errors.
- Production build: passed; all six public routes statically generated.
- Factory verification: passed typecheck, build, console, six internal links, and axe critical/serious checks.
- Route captures: desktop, tablet, and mobile for `/`, `/about`, `/services`, `/gallery`, `/contact`, and `/membership`.
- Motion evidence: normal and reduced-motion recordings under `qa/motion/`.
- Dependency reproducibility: the b2b29a6 lock was extended only with the two Avya importers and their missing dependency/snapshot records. A filtered frozen install passes in an isolated workspace containing the same root and Avya manifests. The full repository still fails frozen validation on pre-existing unrelated donor importers absent from that baseline lock, beginning with `sites/donor-ace-hotel/app`.
- Preview: `https://avya-club-fjmwlb1ev-jeremys-projects-379e354f.vercel.app`; authenticated deployment checks reached HTTP 200, but a fresh direct unauthenticated request returned `302` to Vercel SSO, so it is protected rather than publicly shareable.
- Production: untouched.

## Needs client input

- Current membership prices and any billing terms; the source site exposes labels but no amounts.
- Confirmed operating hours for publication.
- Final production domain and DNS owner.
- Preferred destination/workflow for membership and contact submissions.
- Vercel owner must disable preview Deployment Protection before external review, then rerun the preview verification.

## Top workflow difficulties

1. Republic's automated capture detected only 2 structural sections despite 10 visually distinct donor bands, distorting the official structure score.
2. Avya's visible contact information conflicted with placeholder JSON-LD; visible page content was treated as authoritative.
3. Avya's source showed membership labels but no prices, so no pricing was invented.
4. Initial media was too repetitive and low resolution; production was cleared with distinct, localized Avya-owned assets.
5. A shared desktop margin compressed the overview card at tablet/mobile widths; a focused geometry correction restored the intended responsive width.

## Human gate

Status: `NEEDS_OWNER_PREVIEW_ACTION`, followed by `NEEDS_HUMAN_BEAUTY_PASS`. Disable Vercel preview protection, verify the public URL, then review the donor/build desktop and mobile composites plus both motion recordings before approving any production release.
