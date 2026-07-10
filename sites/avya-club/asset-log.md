# Asset Log: Avya Club

## Images

All production candidates below are client-owned public Avya assets captured on 2026-07-10. They may ship only after downloading into `app/public/` and retaining this provenance; current capture copies remain reference evidence.

| Source URL | Captured role | Production status |
|---|---|---|
| `https://avya.club/assets/img/avya/aboutphoto.png` | About Avya Club, 620×640 | candidate; client-owned public source |
| `https://avya.club/assets/img/avya/avya.png` | Avya identity image, 1998×1124 | candidate; client-owned public source |
| `https://serveravya.onrender.com/api/media/file/club2.jpg` | Club House experience media | client-owned public source; remote candidate only, mandatory local download and clearance in Task 7 |
| `https://avya.club/assets/img/icons/swim.png` | Swimming Pool icon, 64×58 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/gym.png` | GYM & Fitness icon, 64×31 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/fitness.png` | Functional Fitness icon, 64×55 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/court.png` | Tennis Court icon, 64×59 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/therapy.png` | Physiotherapy icon, 64×59 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/spa.png` | Massage & Spa icon, 64×57 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/club.png` | Club House icon, 64×74 | candidate; client-owned public source |
| `https://avya.club/assets/img/icons/wellbeing.png` | Well-being & Nutrition icon, 64×79 | candidate; client-owned public source |

## Video

- `references/reference-first/donor-motion.webm` and `donor-motion-reduced.webm`: Republic interaction evidence only; never ship.
- Avya production video: none captured as a required stable asset.

## Fonts

- Republic `Geller Headline` and `Indivisible`: proprietary/reference-only; never ship.
- Production replacements: Cormorant Garamond for editorial display and Space Grotesk for body/UI; both are available under the SIL Open Font License 1.1.

## Logos

| Source URL | Captured dimensions | Status |
|---|---:|---|
| `https://avya.club/assets/img/avya/avyamain1.png` | 133×72 | client-owned production candidate |
| `https://avya.club/assets/img/avya/avya3.png` | 89×50 | client-owned production candidate |
| `https://avya.club/assets/img/avya/avya2.png` | 126×71 | client-owned production candidate |

## Generated Assets

None in Task 1.

## References

- Republic images listed in `references/reference-first/extraction/assets.json` and screenshots are visual-layout evidence only. Do not copy to `app/public/`.
- Avya source inventory: `../avya-club-brand-source/references/reference-first/extraction/assets.json`.

## Unknown Or Needs Review

- Numeric membership/therapy prices: live `.pricing-plan-card .price-options` containers are empty; needs client input.
- Confirm the exact Avya logo variant during the Task 7 asset-clearance pass.
- Any image URL not present in the captured Avya inventory requires new provenance before use.

### Font decisions (blueprint tokens, 2026-07-10T18:39:25.769Z; curated in Task 2)

- Heading: donor `Geller Headline` → **Cormorant Garamond** (Google Fonts; SIL Open Font License 1.1) to preserve the high-contrast editorial display role.
- Body: donor `Indivisible` → **Space Grotesk** (Google Fonts; SIL Open Font License 1.1) to retain a restrained grotesk utility role and align with the captured Avya source typography.
- Color roles: donor red accents were removed; captured Avya teal `#3dbbad` is primary and blue-teal `#5190a2` is accent, while donor ink/cream hierarchy remains.

See `factory/qa/font-substitutes.md` for the substitution rationale.
