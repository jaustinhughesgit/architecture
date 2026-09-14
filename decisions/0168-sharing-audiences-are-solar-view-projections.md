# 0168 — Sharing audiences are solar view projections

Date: 2026-09-14
Status: Implemented bounded presentation slice; verified locally and live, deployed to development

Sharing uses the existing solar-system geometry and finite motion primitives rather
than a separate diagram/grid. Exact people, groups, public and owner scopes each
have a draggable named audience circle. Opening one runs the supernova/collapse
transition and displays only the current owner's ordinary facts admitted by the
shared read evaluator. It does not hydrate the recipient's own graph.

An audience-scoped render ID is separate from exact source entity/relation IDs.
Packing and motion accept an explicit presentation-system resolver without changing
their default canonical-owner behavior. Selection, coordinates, camera, expansion
and temporary view copies grant no authority and are never persisted as facts.

Only one audience has interior layout; during switching the previous audience may
retain inert collapsing dots only while their exact IDs remain admitted by its
current read projection. Revocation and removed audiences win immediately. Opening
preserves the camera and chosen world center; neighboring circles move outward.
Reduced motion bypasses the animation. Explicit fit controls navigate the camera.

The Sharing diagram is capped at 120 facts/240 nodes including facets, with an
explicit truncation message and full searchable owner fact list. Normal Inspector
budgets do not change. Permission editing remains explicit owner-only save through
the existing worker/API revision and outbox contract. No server schema, protected
boundary, marketplace authority, fixture reset or reseeding changes.

Source and test details: product decision 0110 and `sharing-universe-projection`,
`sharing-universe`, existing solar tests and real-session Sharing browser acceptance.
Local verification passed 939 code tests/build/type/bundle gates and 25 browser
scenarios, with one explicit live-only canary skipped. This does not claim a fix
for the older hosted ordinary spatial-drag discrepancy.

Development run 34809236031 successfully deployed exact product release
`ed9b16d1f66ae5799cc5161826875277121bb787`, with reset explicitly disabled. The
complete local browser suite passed 80 scenarios (18 optional gates skipped).
Live health and module bytes match. The original signed-in 100-fact demo proved
draggable audience circles, one open Gavin view (40 facts/73 dots), Morgan 60,
Family 40 and camera stability, without changing data or permissions.

Hosted CI 34809228840 passed core gates and Sharing acceptance (79 browser passes,
18 optional skips), but the pre-existing delayed-paint ordinary Inspector app-drag
scenario failed again at `routes.spec.ts:130`, including its retry. Full hosted
suite parity remains unresolved and is not claimed by this deployed Sharing slice.
