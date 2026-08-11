# Canonical Substrate Migration

This is the controlled migration from parallel persistence shapes to one entity substrate. Each phase must preserve local-first behavior, the three execution planes, entity composition, governance, and Position/Search candidate retrieval.

| Phase | Deliverable | Status |
| --- | --- | --- |
| 1. Freeze and describe canonical contracts | Versioned logical record schema, invariants, publication/query boundary, and ADR | Implemented foundation |
| 2. Build a compatibility inventory | Store, route, capability, risk, and preservation map | Implemented |
| 3. Introduce one canonical persistence API | Compute port with foundation, sidecar, and derived-index adapters; initial consumers migrated | Implemented foundation |
| 4. Fix identifiers and indexing for scale | Non-hot allocation, partition strategy, pagination, measured indexes | Planned |
| 5. Compile Context publication into canonical records | Context v1 delta → versioned canonical mutation and acknowledgement | Planned |
| 6. Move hydration and queries to the canonical substrate | Permission-filtered canonical traversal, aggregation, and dual-read parity | Planned |
| 7. Formalize entity middleware and composition | Root-to-target contract plus `map`/`extend`/`link`/`use`/`substitute` semantics | Planned |
| 8. Unify governance and lifecycle | Grants, versions, revocation, deletion, delegation, protected references, audit | Planned |
| 9. Complete middleware conformance | The supplied plan repeats phase 7; this slot tracks cross-layer conformance and compatibility after formalization | Planned |
| 10. Unify the three execution planes | One invocation/result/effect envelope while preserving browser-main, `fileWorker`, and Compute/JPL trust boundaries | Planned |
| 11. Complete intent routing and capability evolution | Data/invocation/composition/build jurisdiction, reuse/repair/fork/install | Planned |
| 12. Converge communication, navigation, and interaction modules | Address those modules through canonical entities and governed effects | Planned |
| 13. Backfill, cut over, and retire the sidecar | Idempotent backfill, dual-read comparison, rollback, cutover, governed retirement | Planned |
| 14. Prove scale and continuous evolution | Load/cost/security tests, failure levels, compatibility gates, ongoing gap discovery | Planned |

“Implemented foundation” means the contract or seam now exists and is tested; it does not claim later data migration, scale repartitioning, or cutover is complete.
