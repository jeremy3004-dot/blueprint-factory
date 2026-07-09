# Donor Shelf — pre-captured donors ready to clone

> **Canonical index:** [`docs/donor-shelf.md`](../docs/donor-shelf.md) — field, URL, capture date, what
> each donor teaches, and Nepal client fit. Read that file for the full table.
>
> This stub exists so `factory/playbooks/master-clone-job-prompt.md` and other factory docs can point at
> `factory/DONOR-SHELF.md` without breaking paths.

To **stock a new donor**, use `factory/playbooks/master-shelf-stocking-prompt.md` (one blank: URLs,
sector, or "your choice") or the Operator Console **Restock** tab. Shelf jobs beauty-audition before
capture — no client build.

Captured donor evidence lives under `sites/donor-*/references/reference-first/` and includes
multi-viewport screenshots, section shots, motion capture, extracted DOM/copy/assets/tokens/pages,
plus drafted `topology.md` and `clone-plan.md`.

These are shelf stock, not client sites. Donor assets, copy, DOM, screenshots, and videos are
reference-only and must not ship in production client builds.

When a real client job starts:

1. Create the client site (`blueprint new <client-slug>` or the callbook phrase).
2. Copy the chosen donor's `references/reference-first/` directory into the client site.
3. Review and complete the `clone-plan.md` judgment fields.
4. Continue the normal flow: art -> tokens -> build -> verify -> compare.

The `donor-*` entries show in `blueprint status` as unfinished projects. That is expected; do not
build the donor slugs themselves.
