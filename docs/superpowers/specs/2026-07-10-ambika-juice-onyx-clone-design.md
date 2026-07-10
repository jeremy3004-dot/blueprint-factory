# Ambika Juice Onyx Clone Design

## Objective

Build a full, high-fidelity local clone of the current public Onyx Coffee Lab website, prove its desktop, mobile, and motion fidelity against captured donor evidence, and only then translate the clone into a production-safe Ambika Juice Pokhara website. The finished Ambika site keeps Onyx's information density, page families, section rhythm, responsive behavior, and interaction model while changing every protected identity, asset, product, and sentence.

## Approved Direction

Jeremy approved the broad scope and asked that work continue without more intake questions:

- visual donor: `https://onyxcoffeelab.com`
- client: Ambika Juice, Pokhara
- clone standard: pixel-first, not merely inspired by Onyx
- clone scope: all public route families and interaction systems discoverable from the donor capture
- final conversion: Visit Us / Get Directions
- final catalogue: full browsable Ambika drink catalogue with collection and product-detail routes
- deployment boundary: donor clone stays local; only the asset-safe Ambika translation may receive a preview deployment

## Source Evidence

- The existing `sites/donor-onyx-coffee` pack contains four viewport captures, 20 section captures, motion and reduced-motion recordings, 44 inventoried assets, and 64 harvested same-origin routes.
- The pack is mechanical evidence, not a completed analysis: its `topology.md` and `clone-plan.md` still contain agent prompts and must be completed before build work.
- Ambika facts come from its Google, Tripadvisor, Wanderlog, Restaurant Guru, and current public business listings. Conflicts are logged and resolved conservatively.
- Tripadvisor/customer photos are reference evidence unless ownership or reuse permission is explicit. The shipping site uses Ambika-owned, licensed, or generated replacements.
- No price, ingredient, health claim, award, testimonial, delivery promise, or dietary claim is invented. Unverified fields are omitted or recorded in the client-input list.

## Clone-First Workflow

### Phase A: Forensic donor analysis

Complete the donor topology and clone plan from screenshots, extracted DOM/copy/tokens/assets, scroll recordings, and live interaction checks. Inventory each public route into a page family: homepage, collection, product detail, editorial/location, utility, account, cart, policy, and support. Record every scroll, click, hover, focus, autoplay, menu, drawer, filter, carousel, modal, form, cart, and responsive state.

### Phase B: Local Onyx clone

Adopt the donor evidence into `sites/ambika-juice`, but keep clone-stage content and assets under explicit `reference-only` provenance. Reproduce the donor's layout, type hierarchy, spacing, colors, page templates, navigation, drawers, product grids, media behavior, hover states, Swiper interactions, and reduced-motion behavior. The clone must remain local and must not be published.

The factory comparison target is at least 85% pixel match on desktop and mobile. Work the worst section first for up to five focused iterations. If the score plateaus, document the exact remaining deltas rather than misreporting fidelity.

### Phase C: Ambika translation

After clone evidence is recorded, translate the same structure into Ambika. Replace Onyx copy, logos, products, collections, photos, videos, font licenses, legal text, account/cart assumptions, and location data. Keep the donor's proven page rhythm and interaction mechanics.

The final Ambika page families are:

- Home
- Menu index with collection filters
- Category/collection pages
- Individual drink pages
- Our Story
- Gallery
- Visit and directions
- FAQ/support
- Privacy and terms appropriate to an informational local-business site

Onyx account, checkout, subscription, wholesale, training, equipment, and coffee-specific route families are cloned locally for fidelity, then either translated to a relevant Ambika equivalent or explicitly deferred in `pages.json`. The shipping Ambika site has no checkout, authentication, CMS, or database.

## Experience Design

### Navigation and conversion

Desktop and mobile navigation follow the donor's hierarchy and state changes. The primary Ambika action is always `Get Directions`, linking to the verified Google Maps location. Menu discovery is the secondary action. Phone contact remains available on Visit and support surfaces.

### Catalogue

Ambika products are static typed data grouped into verified categories such as fresh juices, smoothies, lassi, milkshakes, fruit salads, shots, and house specials. Each product route supports a title, category, image, short description, ingredients, tasting notes, availability, and price only when evidence supports the field. Missing optional fields do not create blank UI.

### Visual translation

The clone stage uses donor tokens exactly where licensing permits local reference use. The Ambika stage keeps the donor hierarchy but changes the palette to a fresh Pokhara juice identity: warm cream, fruit-led mango and guava accents, leafy green, and high-contrast ink. Proprietary donor fonts are replaced with logged open alternatives that preserve width, weight, and rhythm.

### Signature moment

The signature moment is **The Living Menu Wall**: Onyx's dense editorial/product rhythm becomes an Ambika drink wall in which category changes recompose the product grid with the same restrained donor timing. On mobile it becomes a touch-friendly horizontal category rail and stacked product cards. It respects `prefers-reduced-motion` and never blocks directions or menu access.

## Architecture

Use TypeScript, Next.js App Router, React, and global CSS/Tailwind only where already scaffolded. Build data-driven route families rather than duplicating page code. Use Swiper only when the evidence confirms the donor relies on it; otherwise reproduce observed behavior with CSS transitions and small React state. Use copied reference-library patterns for reveal, gallery, carousel, and parallax behavior when they match the donor evidence.

The application boundaries are:

- `content/`: typed Ambika categories, products, navigation, business facts, and route mappings
- `components/chrome/`: header, mega-menu, mobile drawer, cart/reference interactions, and footer
- `components/sections/`: reusable editorial and catalogue sections
- `components/catalogue/`: filters, grids, cards, and product detail presentation
- `components/motion/`: evidence-backed motion utilities with reduced-motion handling
- `app/`: route composition and metadata
- `tests/`: route, content, interaction-contract, and accessibility-friendly markup checks

## Failure and Empty States

- Missing product media uses a clearly logged production-safe fallback, never a donor image.
- Optional product facts are omitted rather than invented.
- Unknown or conflicting business facts are added to `qa/needs-client-input.md`.
- Navigation and catalogue remain usable with JavaScript disabled where practical.
- Reduced-motion users receive the final visual state without autoplay, parallax, or stagger delays.
- External directions and phone links are validated during the factory link check.

## Verification

- Factory tests establish the baseline; the three pre-existing prospect-thumbnail failures are recorded and remain out of scope.
- New content and route behavior follows red-green-refactor with site-local tests.
- `pnpm blueprint:check ambika-juice <url>` must pass typecheck, build, console, link, and axe checks.
- `pnpm blueprint:compare ambika-juice <url> --stage clone` records desktop and mobile pixel scores.
- `pnpm blueprint:compare ambika-juice <url> --stage translation` must reach at least 85% structure match.
- `pnpm blueprint:verify ambika-juice <url>` captures final screenshots and motion evidence.
- The final preview deploy is permitted only after no reference-only donor asset or copy ships.
- Beauty Pass remains a human approval gate; the worker prepares evidence but does not self-approve it.

## Out of Scope

- Production deployment
- Real online ordering, payments, checkout, customer accounts, subscriptions, or inventory
- CMS, Supabase, authentication, or a database
- New paid services
- Claims or content that cannot be verified from Ambika evidence

