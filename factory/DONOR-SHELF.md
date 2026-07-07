# Donor Shelf — pre-captured donors ready to clone

Captured: 2026-07-07. Each donor below has a complete reference-first evidence pack under
`sites/<slug>/references/reference-first/` — full-page screenshots at 4 screen sizes, per-section
shots, a scroll-through video (+ reduced-motion), and extracted colors, fonts, copy, assets, and
page inventory, plus auto-drafted `topology.md` and `clone-plan.md`.

These are **shelf stock, not client sites**. When a real client job starts:

1. Create the client site (`blueprint new <client-slug>` or start the job phrase from HOW-TO-USE.md).
2. Copy the chosen donor's `references/reference-first/` directory into the client site.
3. Review and complete the `clone-plan.md` judgment fields (capture never auto-passes the gate).
4. Continue the normal flow: art → tokens → build → verify → compare.

The `donor-*` entries will show in `blueprint status` as needing work — that is expected; ignore
them there. Do not build the donor slugs themselves.

| Slug | Donor | Niche | Why it was chosen |
| ---- | ----- | ----- | ----------------- |
| `donor-black-tomato` | blacktomato.com | Trekking / luxury adventure | The gold standard for story-driven luxury adventure travel. Editorial, cinematic. Best for a premium trekking agency selling to foreign visitors. |
| `donor-much-better-adventures` | muchbetteradventures.com | Trekking / group adventure | Bold, friendly, conversion-focused trip marketplace. Best for an accessible group-trips trekking company. |
| `donor-aman` | aman.com | Boutique hotel / ultra-luxury | Serene ultra-luxury; huge imagery, total calm. Aman runs Himalayan lodges — the aesthetic fits Nepal high-end perfectly. |
| `donor-belmond` | belmond.com | Hotel / heritage luxury | Grand, video-led luxury with a strong booking bar. The "established heritage hotel" feel. |
| `donor-linear` | linear.app | Tech / SaaS | The modern software-company standard; dark, precise, beautiful motion. |
| `donor-stripe` | stripe.com | Tech / platform | The most-imitated tech site on the internet; gradients and polish. |

Considered and rejected: Six Senses (sixsenses.com) — blocks automated capture (403).

Everything captured here is **reference-only**: donor images, video, and copy never ship in a
client build (the deploy gate enforces this).
