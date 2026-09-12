# 0155: Description Paths project recorded relationships

- Status: Accepted
- Date: 2026-09-11

## Decision

The clean `graph.describe` primitive gains a bounded two-endpoint projection through read-language version 2 and a versioned core matcher successor. Relationship/connection selection is library data composed with the existing openings and reference rules; there are no person-specific or family-specific runtime branches.

Exact current authorized ordinary endpoints and directed edge evidence control the answer. Labelled roles such as sister are read from the recorded relation rather than invented from the verb `explain`; querying in reverse does not authorize an inferred inverse role. No direct edge is reported explicitly without asserting that indirect or unrecorded relationships cannot exist. Shared owners, shared scalar values, proximity and inaccessible records are not relationship proof. This slice does not perform arbitrary multi-hop, causal, emotional or historical explanation.

The same proven-role formatter improves single-entity summaries. Query/result endpoint IDs and relation versions remain local trace data and are remapped during canonical acknowledgement without becoming published facts. Existing learned description openings reuse the new selection subpatterns without a new model operation or whole-sentence template. Legacy language imports remain readable; the optional relationship presentation capability is required for this projection.

## Ownership and status

`onevar-platform/packages/contracts` owns optional second-endpoint and presentation contracts; `packages/runtime` owns data-driven composition, exact directed reads, rendering and remapping; the browser reuses the existing worker execution/persistence flow. API, Compute/JPL and protected boundaries are unchanged. This is an Implemented bounded description extension; unrestricted relationship inference and broad language coverage remain Partial.

Source and browser tests cover the reported sentence, nine paraphrases, different names/roles, named ownership, ambiguity, missing/current/inactive/foreign facts, unchanged graph/discourse, learned-opening reuse, reload and exact canonical remapping. Live deployment evidence belongs in the capability catalog.

Development release `b8b3d29bf4ea9961021616f79ab1142769dfd5d7` passed full verification and all 17 deployed graph browser tests in [workflow 34668097716](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34668097716), with shared-state reset disabled. Local acceptance passed all 21 browser scenarios. The separate real-adviser description canary passed in 18.3 seconds, including new-opening learning, relationship reuse without another adviser call, and reload. The first local browser run's one failure was a concurrent-build asset replacement; a clean sequential browser/build run passed before release.
