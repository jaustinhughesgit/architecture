# 0167 — Ordinary sharing projects current exact read authority

Date: 2026-09-14
Status: Implemented bounded read-sharing slice — verified locally and deployed to development

Extend ordinary Context with versioned exact recipient/group and per-relation
private/public/selected read policy. Explicit rules override an explicit default;
direct and current group grants union. Names, friendship, visual proximity, filters
and generated Paths confer no authority. The existing header pauses/resumes outward
access; enabled granular sharing keeps the primary name discoverable, not all facts.
Legacy whole-public snapshots retain their behavior until explicitly configured.
Old clients cannot remove policy by omission.

One evaluator supplies server reads and owner-side Sharing circles. Identity clues,
answers and discovery use permitted facts; only public facts enter discovery indexes.
Visible endpoints/facets do not grant other edges. Private aliases, observations
and recipient rosters stay out of selective reads. Exact pinned reads recheck current
membership. Outbox publication, canonical IDs, idempotency and revision conflicts
remain the lifecycle primitives; no separate graph or authority database is created.

One audience circle opens at a time. Individual views union public/direct/group
access; a group shows public plus its grants. Owners compare hidden facts and edit
rules/membership with pending-versus-confirmed feedback. Exact-ID onboarding exists;
friendly-name onboarding, nesting, expiry and delegated group administration do not.
The bounded slice grants read only. Marketplace execution, artifact grants and
zero-trust cryptography remain separate. Ordinary private/shared data is server-
enforced, not encrypted from the platform. Revocation cannot erase prior knowledge.

An authenticated owner-only endpoint restores ordinary canonical snapshots on clean
devices, not pending local changes, protected plaintext or execution authority.
An account URL is not authentication. Product decision 0109 documents bounds.

API/Dynamo and real-session browser tests cover the 100-fact fixture,
overlapping grants, individual fact edits, revocation, pause, remapping and restoration.
Core verification and unchanged bundle budgets passed. Targeted browser checks
passed after repairing cached-startup transport handling, collapsed-neighbor spacing
and manual-sync completion interrupting incoming announcements. Release evidence
follows; development hard reset, persistent company/family/user/app seed and
authenticated test-account handoff remain pending. The operator AWS session is
expired; no reset or persistent seed has run.

## Release evidence

Product release `8b6d2a07867bfd5259fe6c30be98aca365f7eebb` passed core verification
and a final complete local browser run: 80 passed, 18 opt-in gates skipped, no retries
(three workers). An earlier seven-worker drag-case timing failure passed three
isolated repeats and the final full run without another code change. Development
[deployment 34805906314](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34805906314)
succeeded. Live health identifies this release; entry assets and Sharing module
match local built bytes, with a read-only entry-page browser check. Hosted
[CI 34805897111](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34805897111)
is finishing browser tests at this checkpoint. The AWS operator session remains
expired. No development hard reset, persistent demo seed, authenticated demo-account
handoff, live selective-sharing fixture or production change has occurred.
