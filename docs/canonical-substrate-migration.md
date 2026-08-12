# Canonical Substrate Migration

This is the controlled migration from parallel persistence shapes to one entity substrate. Each phase must preserve local-first behavior, the three execution planes, entity composition, governance, and Position/Search candidate retrieval.

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1. Freeze and describe canonical contracts | Versioned logical record schema, invariants, publication/query boundary, and ADR | Implemented foundation |
| 2. Build a compatibility inventory | Store, route, capability, risk, and preservation map | Implemented |
| 3. Introduce one canonical persistence API | Compute port with foundation, sidecar, and derived-index adapters; initial consumers migrated | Implemented foundation |
| 4. Fix identifiers and indexing for scale | Counter-free IDs for new Context records; sharded canonical and Position projections; compatible pagination | Implemented foundation |
| 5. Compile Context publication into canonical records | Context v1 delta → Words/entities/addresses/groups/relations/versions/grants/projections before sidecar acknowledgement | Implemented foundation |
| 6. Move hydration and queries to the canonical substrate | Grant-checked canonical hydration, dual-read deduplication, canonical profile/Word candidates, authorized Position/Search | Implemented foundation |
| 7. Formalize entity middleware and composition | Root-to-target contract plus `map`/`extend`/`link`/`use`/`substitute` semantics | Implemented foundation |
| 8. Unify governance and lifecycle | Grants, versions, revocation, deletion, delegation, protected references, audit | Implemented foundation |
| 9. Complete middleware conformance | The supplied plan repeats phase 7; this slot tracks cross-layer conformance and compatibility after formalization | Implemented foundation |
| 10. Unify the three execution planes | One invocation/result/effect envelope while preserving browser-main, `fileWorker`, and Compute/JPL trust boundaries | Implemented foundation |
| 11. Complete intent routing and capability evolution | Data/invocation/composition/build jurisdiction, reuse/repair/fork/install | Implemented foundation |
| 12. Converge communication, navigation, and interaction modules | Address those modules through canonical entities and governed effects | Implemented foundation |
| 13. Backfill, cut over, and retire the sidecar | Bounded idempotent page backfill, graph parity evidence, fail-closed cutover gates, and explicit dual-mode rollback | Implemented foundation |
| 14. Prove scale and continuous evolution | Repeatable partition/latency/fan-out/security/compatibility gates integrated with the existing failure pipeline | Implemented foundation |

“Implemented foundation” means the contract, executable seam, and local proof exist. Phase 13 does not authorize production deletion: the bounded backfill must run across every retained page, parity samples must reach zero mismatch, rollback must be exercised, and the phase-14 gates must pass before canonical-only mode or governed sidecar retirement. Phase 14 supplies repeatable proof functions but does not claim that a deployed 100,000-user/billion-input load, cost, or security campaign has already run. For phases 10–12, legacy callers, all JPL/Shorthand effects, durable installation/promotion, and every communication/navigation module are not yet migrated. See [canonical indexing and Context compilation](canonical-indexing-and-context-compilation.md), [entity middleware, composition, and governance](entity-middleware-composition-and-governance.md), and [execution envelopes and governed interaction](execution-envelopes-and-governed-interaction.md).
