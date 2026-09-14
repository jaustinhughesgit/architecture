# 0168 — Sharing audiences are solar view projections

Date: 2026-09-14
Status: Implemented bounded presentation slice; verified locally, publication pending

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
