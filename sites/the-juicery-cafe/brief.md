# Brief: The Juicery Cafe

Status: approved for build from supplied donor and brand source

## What This Site Is

A full public website for The Juicery Cafe, a farm-to-table cafe in North Lakeside, Pokhara. The
build keeps Gymkhana's cinematic hospitality structure and translates it into the Juicery's green,
sunlit, handmade identity.

## Audience

Pokhara residents, travelers staying around Lakeside, health-conscious diners, and people looking
for cold-pressed juice, brunch, seasonal food, workshops, and community events.

## Inputs Provided

- Visual donor: `https://gymkhanarestaurants.com` supplied by the owner. The repo's existing
  `donor-gymkhana` shelf capture from `https://gymkhanalondon.com` preserves the corresponding
  Gymkhana presentation without the current Vercel security checkpoint.
- Brand source: `https://www.thejuicerycafe.com`.
- Brand-source evidence: `sites/the-juicery-cafe-brand-source/references/reference-first/`.

## Source Notes

- Verified story: the cafe began in North Lakeside as a cold-pressed juice bar and describes its
  menu as farm-to-table, seasonal, and centered on juice and brunch.
- Verified food offer: cold-pressed juices, superfood smoothies, vegan smoothie bowls, brunch, and
  a three-day juice detox/cleansing programme supervised by an experienced Ayurveda practitioner.
- Verified events: seasonal yoga, fitness classes, workshops, weekly kirtan, open-mic jamming, and
  art talks.
- Verified visit details: Lakeside near Street 22A, opposite Three Sisters Guesthouse, Pokhara
  33700; +977 982-3781787; WhatsApp +61 413 386 270; justacigar@hotmail.com. The claimed
  TripAdvisor listing says 7:30am-11pm daily, while the older Wix site says 7:30am-8pm; the build
  uses the fresher claimed-listing hours and flags them for client confirmation.
- Supplemental menu evidence from the claimed TripAdvisor listing: Italian, American, Indian,
  European, and Asian influences; Halal; vegetarian, vegan, and gluten-free options; gallery labels
  show a cacao and peanut butter bowl, vegan/gluten-free millet pancake, and vegan smoothie bowls.
- The current Weekend Market, Fresh Baskets, Events, and Contact pages contain unrelated Wix demo
  copy about California and San Francisco. Those claims and placeholder contacts must not ship.

## Required Pages Or Sections

- `/`: cinematic hero, story, food, community/events, visit details.
- `/food`: juice, smoothies, bowls, brunch, and cleansing programme.
- `/weekend-market`: honest inquiry page pending current dates/vendor details.
- `/fresh-baskets`: honest inquiry page pending availability, contents, and delivery area.
- `/events`: verified event types plus current-schedule inquiry.
- `/events-1`: redirect to `/events` to preserve the existing indexed route.
- `/faq-s`: confirmed visit details and clear answers without invented policies.
- `/contact`: real phone, WhatsApp, email, hours, and location.
- `/my-account`: deferred because the current route is a broken Wix widget with no evidenced
  customer workflow.

## Deploy Expectation

Vercel preview only. No production deployment or paid services. No backend is required; contact
actions use phone, WhatsApp, email, and an external map link.

## Ready Criteria

- The Gymkhana section rhythm is visible on desktop and mobile without donor copy or images.
- All listed public routes work, with `/events-1` preserving the legacy link.
- Every image is client-owned and logged.
- Keyboard navigation, reduced motion, links, typecheck, build, and accessibility checks pass.
- The final handoff lists every fact still needed from the cafe.
