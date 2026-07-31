# Capability Catalog

This catalog prevents future work from assuming a capability is absent merely because it is unfamiliar. It is intentionally incomplete and must grow as the platform is inspected and discussed.

| Capability | Status | Current or intended ownership | Notes / next documentation work |
| --- | --- | --- | --- |
| Browser message and voice interaction | Partial | `aws` | User-facing interaction exists; complete modality and accessibility contracts are not yet cataloged. |
| Local Path signature matching | Implemented | `aws` | Structural and exact matching exist; generalization, conflict resolution, and persistence remain active work. |
| Essence query and mutation | Partial | `aws` | Statement/query flows exist; modifiers, referents, and repair reliability need formal schemas. |
| Local ContextDB | Partial | `aws` | Graph storage and retrieval exist; persistence and refresh behavior require an explicit storage specification. |
| Automatic Path learning | Partial | `aws` + model services | Candidate generation, testing, promotion, and evidence exist; reliable reusable-family repair is incomplete. |
| Entity parent/child lineage | Product intent / partial | `compute` + portal | Portal exposes lineage. Execution-order and contract semantics need direct code mapping and tests. |
| `map` | Implemented primitive | `compute` | Do not define by one use case; document mechanical graph effects and permission behavior. |
| `extend` | Implemented primitive | `compute` | Mechanical specification and tests need cataloging. |
| `link` | Implemented primitive | `compute` | Mechanical specification and tests need cataloging. |
| `use` | Implemented primitive | `compute` | Includes group/use behavior; broader semantics need cataloging. |
| `substitute` | Implemented primitive | `compute` | Mechanical specification and tests need cataloging. |
| Public/private entity visibility | Partial | `compute` + portal | Exists; full interaction with authorization requires specification. |
| Use/set and action authorization | Partial / unknown | Cross-layer | Product direction is established; inspect authenticator and permission paths before relying on completeness. |
| Search and reuse of others' work | Partial | `compute` + portal | Search exists; packaging, trust, compatibility, and marketplace behavior remain incomplete. |
| Payments/marketplace | Product intent | Cross-layer | Future capability; no completion claim. |
| JPL entity execution | Implemented / partial spec | `compute` | Runtime exists; canonical versioned JPL schema and semantics are incomplete. |
| Entity creation with structured model output | Partial | `compute` | Schema/validation paths exist; generation and repair reliability remain active work. |
| Entity + Path + context-aware editing | Partial | `aws` + `compute` | Semantic bundles and repair targets exist; transactional correction and replay require continued hardening. |
| Compute capability discovery/build/install | Partial | `aws` + `compute` | Background discovery and generation exist; classification and input binding remain active work. |
| Compute answer verification | Implemented opt-in / partial | `aws` + `compute` | Verification toggle exists; history scope, cost policy, and durable behavior should be specified. |
| Failure diagnosis | Partial | `aws` + `compute` | Entity/Path/provider/platform diagnosis exists; should become contract-driven and observable. |
| Background OpenAI jobs | Partial | `compute` + `aws` | Durable response/job mechanisms exist in code; comprehensive idempotency and lifecycle contract needed. |
| Protected-asset storage and audit | Implemented trusted-server foundation | `compute` | DynamoDB resources and broker exist. Do not characterize server use as zero-knowledge. |
| Local protected-asset companion | Product intent | Future local runtime + `aws` | Browser-managed, locally executed zero-knowledge option; architecture not yet implemented. |
| Reusable API/provider protocols | Product intent / emerging | Entities + Paths + JPL | Must use core 1var primitives rather than a disconnected provider subsystem. |
| Headless website protocol capture | Product intent | Entities, moods, Paths, local runtime | Model-assisted builder with approval; resulting protocol should be reusable and versioned. |
| Mindsets, thoughts, moods | Implemented primitives / partial spec | Entity/front-end modules | Runtime representation exists; composition and authoring semantics need dedicated documentation. |
| Streaming/WebRTC | Implemented foundation | `compute` | Modules exist; product and security integration require cataloging. |
| Embeddings/search/indexing | Implemented foundation | Cross-layer | Several implementations exist; authoritative ownership and lifecycle need clarification. |

## Adding a capability

When a capability is found or proposed, record:

1. User and builder value
2. Owning primitives and layers
3. Current evidence in code or tests
4. Trust and authorization boundary
5. Lifecycle and versioning
6. Known gaps
7. Whether it supersedes or generalizes another entry

