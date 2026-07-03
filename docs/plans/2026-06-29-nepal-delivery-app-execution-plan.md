# Nepal Delivery App Execution Plan

Status: draft  
Owner: Jeremy  
Last updated: 2026-06-29  

## Goal

Build a Nepal-first delivery platform in phases: customer app, rider app, merchant/admin operations, maps/routing, COD/manual payment workflows, and a production path that can survive real Kathmandu operations.

This plan assumes the OSS Scout recommendation:

- Custom product UX for customer, rider, and operations workflows.
- Expo + React Native for mobile apps.
- Supabase/Postgres for backend, auth, realtime, storage, and business data.
- MapLibre + OpenStreetMap/OpenMapTiles for maps.
- OSRM first for routing and ETA.
- Appsmith for internal/admin operations.
- Optional Medusa, Novu, and PostHog when their complexity becomes justified.
- Fleetbase only as a reference or isolated service because of AGPL obligations.

## Product Principles

- Nepal operations first: COD, manual QR/eSewa/Khalti confirmation, rider cash reconciliation, local phone/address formats, low-bandwidth Android, and dispatcher overrides.
- Build the differentiated mobile UX ourselves.
- Reuse OSS for commodity infrastructure and internal tools.
- Keep each phase shippable, testable, and reversible.
- Do not build marketplace complexity before a single-city delivery loop works.

## Phase Tracker

| Phase | Status | Outcome |
|---|---|---|
| 0. Product shape and operating model | Not started | Scope, personas, order types, service zones, and launch rules are clear. |
| 1. Technical foundation | Not started | Repo, Expo apps, Supabase project, schema baseline, CI, and environments exist. |
| 2. Customer ordering MVP | Not started | Users can browse, cart, place COD/manual-payment orders, and see status. |
| 3. Dispatcher/admin MVP | Not started | Operators can review orders, assign riders, edit status, and resolve problems. |
| 4. Rider app MVP | Not started | Riders can accept jobs, update status, navigate, and record payment collection. |
| 5. Maps, routing, and live tracking | Not started | Customers/admins see rider location, ETA, and route lines. |
| 6. Merchant workflows | Not started | Merchants can manage availability, prep status, menu/catalog basics, and order handoff. |
| 7. Payments and reconciliation | Not started | COD, QR/manual payments, cash settlement, refunds, and audit trails are operational. |
| 8. Notifications and support | Not started | Push/SMS/email/in-app updates and support workflows are reliable. |
| 9. Analytics and launch hardening | Not started | Core metrics, feature flags, QA, privacy/security, and release gates are in place. |
| 10. Pilot launch and expansion | Not started | One-city pilot runs with measured operations and a clear expansion backlog. |

## Phase 0: Product Shape And Operating Model

### Objective

Decide what the first real business loop is before writing product code.

### Scope

- Choose launch city and starting service zone, likely Kathmandu core first.
- Choose first order type: food delivery, grocery delivery, courier parcels, or mixed delivery.
- Define customer, rider, merchant, dispatcher, and finance/admin personas.
- Define order lifecycle from placement to settlement.
- Decide what is manual on day one versus automated later.
- Define service-level promises: delivery radius, estimated time, cancellation rules, rider assignment rules.

### Deliverables

- [ ] Product brief.
- [ ] Launch-zone map.
- [ ] Order lifecycle diagram.
- [ ] MVP feature list.
- [ ] Explicit non-goals for the first release.

### Exit Criteria

- We can describe one complete order from customer request to merchant/rider handoff to payment reconciliation.
- Every phase after this can point back to a real operating rule.

## Phase 1: Technical Foundation

### Objective

Create the smallest production-friendly technical base.

### Stack

- Expo monorepo or simple workspace with:
  - Customer app.
  - Rider app.
  - Admin web app, if needed beyond Appsmith.
- Supabase:
  - Auth.
  - Postgres.
  - Row Level Security.
  - Realtime rider/order updates.
  - Storage for merchant images, menu photos, receipts, and issue evidence.
- Appsmith:
  - Internal operations dashboard.
- MapLibre:
  - Map rendering in apps.

### Deliverables

- [ ] Repo structure and environment files.
- [ ] Supabase local/dev/staging/prod setup.
- [ ] Initial schema migrations.
- [ ] RLS policy baseline.
- [ ] App shell for customer and rider apps.
- [ ] Appsmith connected to staging Supabase.
- [ ] Basic CI: lint, typecheck, tests.

### Core Tables

- `profiles`
- `customers`
- `riders`
- `merchants`
- `merchant_locations`
- `catalog_items`
- `orders`
- `order_items`
- `deliveries`
- `delivery_events`
- `rider_locations`
- `payments`
- `settlements`
- `support_cases`

### Exit Criteria

- A developer can run the apps locally.
- Supabase migrations can recreate the database.
- Appsmith can read/write safe admin data in staging.

## Phase 2: Customer Ordering MVP

### Objective

Let a customer place a real order with local Nepal assumptions.

### Scope

- Location selection with saved addresses and landmark notes.
- Browse merchants/categories.
- Item detail and cart.
- COD and manual digital-payment intent.
- Order confirmation.
- Order status timeline.
- Basic customer profile and order history.

### Deliverables

- [ ] Home/discovery screen.
- [ ] Merchant/menu screen.
- [ ] Cart and checkout.
- [ ] Address form with local landmark instructions.
- [ ] Order status screen.
- [ ] Basic order history.

### Exit Criteria

- A customer can place a staging order end to end.
- The order appears in admin operations with enough data to dispatch manually.

## Phase 3: Dispatcher/Admin MVP

### Objective

Give operators enough control to run deliveries before automation exists.

### Scope

- Appsmith dashboard for order queue.
- Status editing.
- Manual rider assignment.
- Merchant contact/status fields.
- Cancellation and issue reason capture.
- Manual payment confirmation.
- Internal notes and audit trail.

### Deliverables

- [ ] Live order queue.
- [ ] Order detail view.
- [ ] Rider assignment panel.
- [ ] Merchant prep status controls.
- [ ] Payment review panel.
- [ ] Issue/support log.

### Exit Criteria

- An operator can run a delivery from order created to delivered without database access.
- Every admin action writes an auditable event.

## Phase 4: Rider App MVP

### Objective

Let riders receive, perform, and close deliveries on low-end Android devices.

### Scope

- Rider login.
- Available/assigned jobs.
- Pickup/dropoff details.
- Status updates: accepted, arrived merchant, picked up, arrived customer, delivered, failed.
- COD collected amount.
- Photo/evidence upload for issues.
- Lightweight offline tolerance for brief connection drops.

### Deliverables

- [ ] Rider auth and profile.
- [ ] Assigned job list.
- [ ] Delivery detail screen.
- [ ] Status update controls.
- [ ] COD collection capture.
- [ ] Issue evidence upload.

### Exit Criteria

- A rider can complete a staging delivery from assignment to payment collection.
- The dispatcher sees rider updates without refreshing.

## Phase 5: Maps, Routing, And Live Tracking

### Objective

Add practical mapping and ETA without overbuilding dispatch optimization.

### Stack

- MapLibre React Native for app maps.
- OpenStreetMap data.
- OpenMapTiles + TileServer GL when self-hosting tiles becomes necessary.
- OSRM for initial routing and ETA.
- GraphHopper only if OSRM is insufficient for local routing profiles.

### Scope

- Customer map on active order.
- Rider map with pickup/dropoff pins.
- Admin map with active deliveries.
- Rider location pings.
- Route line and ETA.
- Geocoding/search using a controlled service path.

### Deliverables

- [ ] Map display in customer app.
- [ ] Map display in rider app.
- [ ] Admin live delivery map.
- [ ] Rider location ingestion.
- [ ] OSRM route/ETA service.
- [ ] Address search/geocoding decision.

### Exit Criteria

- Active delivery tracking works in staging.
- ETA is displayed as an estimate, not a hard promise.

## Phase 6: Merchant Workflows

### Objective

Reduce dispatcher workload by letting merchants manage order readiness and catalog basics.

### Scope

- Merchant order view.
- Accept/reject order.
- Prep time update.
- Item availability toggle.
- Simple menu/catalog management.
- Merchant payout and order history view.

### Deliverables

- [ ] Merchant access model.
- [ ] Merchant order dashboard.
- [ ] Prep status controls.
- [ ] Item availability controls.
- [ ] Basic catalog management.
- [ ] Merchant reporting view.

### Exit Criteria

- A merchant can handle incoming orders without operator intervention for normal cases.

## Phase 7: Payments And Reconciliation

### Objective

Make money movement operationally trustworthy before scaling.

### Scope

- COD tracking.
- Rider cash collection.
- QR/manual payment screenshot upload and approval.
- Refund/cancellation records.
- Merchant settlement ledger.
- Rider settlement ledger.
- Finance/admin reports.

### Deliverables

- [ ] Payment state machine.
- [ ] Manual payment review queue.
- [ ] Rider cash ledger.
- [ ] Merchant settlement ledger.
- [ ] Exportable daily reconciliation report.
- [ ] Refund/cancellation audit trail.

### Exit Criteria

- Finance can reconcile a day of orders without querying the database directly.
- Every payment state change has actor, timestamp, and reason.

## Phase 8: Notifications And Support

### Objective

Keep customers, riders, merchants, and operators in sync without noisy manual calls.

### Stack

- Expo push notifications first.
- SMS provider wrapper for Nepal phone numbers if required.
- Novu later if notification workflows become complex.

### Scope

- Customer order status updates.
- Rider assignment and change alerts.
- Merchant new order alerts.
- Admin exception alerts.
- Support case creation from failed delivery/payment/order issues.

### Deliverables

- [ ] Push notification plumbing.
- [ ] Notification preferences.
- [ ] Transactional message templates.
- [ ] Support case workflow.
- [ ] Failed notification monitoring.

### Exit Criteria

- Critical order changes reach the right person.
- Failed notifications are visible to operators.

## Phase 9: Analytics And Launch Hardening

### Objective

Make the pilot observable, secure, and releasable.

### Stack

- PostHog for analytics, session replay, and feature flags if acceptable.
- Supabase logs and database checks.
- Sentry or similar crash/error monitoring if needed.

### Scope

- Funnel metrics.
- Order lifecycle metrics.
- Rider performance metrics.
- Merchant acceptance/prep metrics.
- Payment reconciliation metrics.
- Security/RLS review.
- Load and low-end Android testing.
- Release checklist.

### Deliverables

- [ ] Analytics event taxonomy.
- [ ] Pilot dashboard.
- [ ] Crash/error monitoring.
- [ ] RLS/security review.
- [ ] Low-end Android test pass.
- [ ] App release checklist.

### Exit Criteria

- The team can see where orders fail.
- There is a written go/no-go checklist for pilot launch.

## Phase 10: Pilot Launch And Expansion

### Objective

Run a controlled pilot, learn, and expand only after the operating loop is stable.

### Scope

- Pilot with a small merchant/rider/customer set.
- Daily operations review.
- Incident log.
- Feature backlog from real usage.
- Expansion decision: wider Kathmandu, more categories, or more automation.

### Deliverables

- [ ] Pilot launch checklist.
- [ ] Daily review template.
- [ ] Incident log.
- [ ] Metrics review.
- [ ] Expansion backlog.

### Exit Criteria

- The pilot has completed enough real orders to expose operational bottlenecks.
- Expansion work is based on evidence, not guesses.

## Build Order Recommendation

1. Phase 0: product and operating rules.
2. Phase 1: foundation.
3. Phase 3: admin/dispatcher first slice.
4. Phase 2: customer order placement.
5. Phase 4: rider delivery loop.
6. Phase 5: maps/tracking.
7. Phase 7: payments/reconciliation.
8. Phase 6: merchant self-service.
9. Phase 8: notifications/support.
10. Phase 9 and 10: hardening and pilot.

Admin before polished customer UX is intentional: for Nepal delivery, the business succeeds or fails on operations, dispatch, payment truth, and rider execution.

## MVP Definition

The first MVP is not a full marketplace. It is:

- One city/service zone.
- A small set of merchants or delivery categories.
- Customer order placement.
- Dispatcher-controlled order management.
- Rider app delivery execution.
- COD/manual payment capture.
- Basic tracking.
- Daily reconciliation.

## Explicit Later Features

Do not build these until the pilot proves the need:

- Automated batch dispatch optimization.
- Multi-city expansion.
- Loyalty subscriptions.
- In-app wallet.
- Complex promo engine.
- Merchant self-serve onboarding.
- Fleetbase fork.
- Full Medusa integration.
- AI support bot.

## Open Decisions

- [ ] First category: food, grocery, courier, pharmacy, or mixed.
- [ ] First service zone.
- [ ] Whether merchants need an app in MVP or only an admin/operator workflow.
- [ ] Payment providers to support first.
- [ ] Whether to self-host map tiles before pilot or after pilot.
- [ ] Whether to use Appsmith only or also build a custom admin web app.
- [ ] Whether this should live inside Blueprint Factory as a product concept or graduate to its own repo.

## Verification Gates

Each phase must finish with:

- [ ] Updated plan checkboxes.
- [ ] Local run proof.
- [ ] Staging data proof.
- [ ] Role-based smoke test.
- [ ] Written notes for any skipped verification.
- [ ] Focused commit, if changes are made.

## Current Next Action

Start Phase 0:

1. Pick the first delivery category.
2. Pick the launch zone.
3. Write the first order lifecycle.
4. Decide which workflows are manual on day one.
5. Convert this plan into phase-specific tickets or a first implementation plan.
