# Everest Tours Final Report

## Owner Summary

Everest Tours is built as a premium editorial trekking site with a homepage, Signature Treks listing page, and Everest Base Camp detail page. The site uses production-safe placeholder imagery, original Everest Tours copy, and the requested slate, snow, and marigold brand system. The local factory verification passed for build, typecheck, console, links, and accessibility. The preview deploy is live, but hosted verification hit Vercel protection rather than the app, so the reliable green proof is the local verification. The site is ready for Jeremy's human Beauty Pass, not production.

## Numbers

- First compare: desktop 45.1%, mobile 54.4%.
- Final local compare: desktop 45.3%, mobile 54.9%.
- Best observed desktop compare during iteration: 46.2%.
- Local check result: pass for typecheck, build, console errors, internal links, and axe accessibility.
- Local verify result: pass on automated checks; compare plateau documented below target.
- Hosted verify result: blocked by Vercel auth/protection page, not app content.
- Preview URL: https://app-k0ribgyo7-jeremys-projects-379e354f.vercel.app

## Signature Moment

Proposed signature moment: the "Altitude Line" hero moment, where a fine marigold route line draws across the mountain hero after load. See it on the homepage hero at `/`.

## Compare Plateau

The compare target of 85% desktop and mobile was not reached. After five focused iterations, the site plateaued around 45-55% because the implementation translated directly into production-safe Everest imagery, colors, and copy instead of first making a donor-image/color clone and then translating. The section count is aligned at 12 vs donor 12, and the page rhythm follows the donor, but raw pixel scoring is dominated by different imagery, palette, font substitution, and final brand copy.

## Top 5 Things That Made This Harder

1. The donor topology and clone plan copied from the shelf were still mostly agent placeholders and had to be completed manually.
2. `blueprint:new` did not create `pages.json`, but the page coverage gate requires it.
3. The generated app could not build until workspace dependencies were installed, and pnpm updated the lockfile for all stale site importers.
4. The factory compare target assumes a clone-stage donor visual pass, while the deploy gate and job constraints strongly punished any donor material that might ship.
5. The Vercel preview URL was protected; hosted verify checked the auth/interstitial page and the Vercel share-link tool could not create a bypass URL from this session.

## Factory Changes I Would Make Next

- Have `blueprint:new` create a starter `pages.json`.
- Add a first-class "clone-safe local only" mode that can compare against donor assets without risking deploy.
- Make `blueprint:copydeck` support marking whole donor route groups as deferred instead of creating 1,199 TODO rows.
- Make `blueprint:verify` preserve the previous green local report when a hosted protected-preview verify clearly hits Vercel auth.
- Teach `blueprint:deploy` to return or create an authenticated share URL when Vercel preview protection is enabled.
