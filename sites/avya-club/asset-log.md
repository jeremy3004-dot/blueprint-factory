# Asset Log: Avya Club

## Images

All production files below were downloaded on 2026-07-11 from Avya's public website or Avya's public media API and now ship locally from `app/public/`. Rights basis for every listed file: client-owned Avya media, cleared for this Avya Club production translation; no stock or donor media is included.

| Local production path | Source URL | Use and dimensions | Rights / license basis |
|---|---|---|---|
| `app/public/media/avya-pure-energy-gym.jpg` | `https://serveravya.onrender.com/api/media/file/gym6.jpg` | Pure energy hero, gym overview/gallery, 6242×4160 | Avya-owned public media API; client production use |
| `app/public/media/avya-deep-recovery-physiotherapy.jpg` | `https://serveravya.onrender.com/api/media/file/steam4.jpg` | Deep recovery hero, recovery overview/gallery, 6240×4160 | Avya-owned public media API; client production use |
| `app/public/media/avya-first-light-club.jpg` | `https://serveravya.onrender.com/api/media/file/club2.jpg` | First light hero, Club House overview/gallery, 6240×4160 | Avya-owned public media API; client production use |
| `app/public/media/avya-about-club.png` | `https://avya.club/assets/img/avya/aboutphoto.png` | About route and gallery, 620×640 | Avya-owned website asset; client production use |
| `app/public/media/avya-identity-club.png` | `https://avya.club/assets/img/avya/avya.png` | Avya identity gallery image, 1998×1124 | Avya-owned website asset; client production use |
| `app/public/icons/avya-swimming-pool.png` | `https://avya.club/assets/img/icons/swim.png` | Swimming Pool service icon, 64×58 | Avya-owned website asset; client production use |
| `app/public/icons/avya-gym-fitness.png` | `https://avya.club/assets/img/icons/gym.png` | GYM & Fitness service icon, 64×31 | Avya-owned website asset; client production use |
| `app/public/icons/avya-functional-fitness.png` | `https://avya.club/assets/img/icons/fitness.png` | Functional Fitness service icon, 64×55 | Avya-owned website asset; client production use |
| `app/public/icons/avya-tennis-court.png` | `https://avya.club/assets/img/icons/court.png` | Tennis Court service icon, 64×59 | Avya-owned website asset; client production use |
| `app/public/icons/avya-physiotherapy.png` | `https://avya.club/assets/img/icons/therapy.png` | Physiotherapy service icon, 64×59 | Avya-owned website asset; client production use |
| `app/public/icons/avya-massage-spa.png` | `https://avya.club/assets/img/icons/spa.png` | Massage & Spa service icon, 64×57 | Avya-owned website asset; client production use |
| `app/public/icons/avya-club-house.png` | `https://avya.club/assets/img/icons/club.png` | Club House service icon, 64×74 | Avya-owned website asset; client production use |
| `app/public/icons/avya-wellbeing-nutrition.png` | `https://avya.club/assets/img/icons/wellbeing.png` | Well-being & Nutrition service icon, 64×79 | Avya-owned website asset; client production use |

## Video

- `references/reference-first/donor-motion.webm` and `donor-motion-reduced.webm`: Republic interaction evidence only; never ship.
- Avya production video: none captured as a required stable asset.

## Fonts

- Republic `Geller Headline` and `Indivisible`: proprietary/reference-only; never ship.
- Production replacements: Cormorant Garamond for editorial display and Space Grotesk for body/UI; both are available under the SIL Open Font License 1.1.

## Logos

| Source URL | Captured dimensions | Status |
|---|---:|---|
| `https://avya.club/assets/img/avya/avyamain1.png` | 133×72 | ships locally as `app/public/brand/avya-club-logo.png`; Avya-owned client production use |
| `https://avya.club/assets/img/favicon/favicon.ico` | 16×16 and 32×32 icon set | ships locally as `app/public/favicon.ico`; Avya-owned client production use |
| `https://avya.club/assets/img/avya/avya3.png` | 89×50 | captured evidence only; not shipped |
| `https://avya.club/assets/img/avya/avya2.png` | 126×71 | captured evidence only; not shipped |

## Generated Assets

None in Task 1.

## References

- Republic images listed in `references/reference-first/extraction/assets.json` and screenshots are visual-layout evidence only. Do not copy to `app/public/`.
- Avya source inventory: `../avya-club-brand-source/references/reference-first/extraction/assets.json`.

## Unknown Or Needs Review

- Numeric membership/therapy prices: live `.pricing-plan-card .price-options` containers are empty; needs client input.
- Any image URL not present in the captured Avya inventory requires new provenance before use.

## Task 7 clearance result

- Cleared local production media: 5 photographs/identity images, 8 service icons, 1 primary logo, and 1 favicon set.
- Hero experiences use three distinct high-resolution Avya photographs: gym, physiotherapy/recovery, and Club House/pool.
- Planned-route runtime output contains no remote image `src`; remote URLs remain only as outbound links and non-rendered provenance.
- Republic screenshots, media, and proprietary fonts remain evidence-only outside the production public directory.

### Font decisions (blueprint tokens, 2026-07-10T18:39:25.769Z; curated in Task 2)

- Heading: donor `Geller Headline` → **Cormorant Garamond** (Google Fonts; SIL Open Font License 1.1) to preserve the high-contrast editorial display role.
- Body: donor `Indivisible` → **Space Grotesk** (Google Fonts; SIL Open Font License 1.1) to retain a restrained grotesk utility role and align with the captured Avya source typography.
- Color roles: donor red accents were removed; captured Avya teal `#3dbbad` is primary and blue-teal `#5190a2` is accent, while donor ink/cream hierarchy remains.

See `factory/qa/font-substitutes.md` for the substitution rationale.
