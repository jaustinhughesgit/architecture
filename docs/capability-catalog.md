# Capability Catalog

This catalog prevents future work from assuming a capability is absent merely because it is unfamiliar. It is intentionally incomplete and must grow as the platform is inspected and discussed.

| Capability | Status | Current or intended ownership | Notes / next documentation work |
| --- | --- | --- | --- |
| Browser message and voice interaction | Partial | `aws` | User-facing interaction exists; complete modality and accessibility contracts are not yet cataloged. |
| Account/group bootstrap (`/newUser`) | Partial | `aws` + `compute` | Initial records are created; it is not yet one versioned lifecycle with verification, recovery, and device enrollment. |
| Email verification | Implemented foundation | `aws` + `compute` | Separate request/poll/verification flow exists; integration with account state requires formalization. |
| Headless API/Compute acceptance | Implemented foundation | `testing` + `aws-api` + `compute` | Command transport, session capture, test-device keys, mailbox parsing, declarative scenarios, and reset guards exist. Provisioned isolated stacks, mailbox infrastructure, and full live acceptance remain deployment work. See [headless acceptance testing](headless-acceptance-testing.md). |
| Authorized test-environment reset | Implemented foundation | `testing` + `compute` | Client and server fail-closed gates exist; explicitly configured non-production deployments may use either an authenticated-user allow-list or an explicit any-authenticated-user mode. Parallel isolation remains future work. |
| Device encryption/signing keys | Implemented foundation | `aws` + `compute` | Browser generates device-held P-256 material and registers public keys; rotation/recovery need contracts. |
| WebAuthn enrollment | Implemented foundation | `aws` + `compute` | Credential creation exists. Fresh assertion-gated protected-asset use is incomplete. |
| Local Path signature matching | Implemented | `aws` | Structural and exact matching exist; generalization, conflict resolution, and persistence remain active work. |
| Browser-local canonical Essence generation | Implemented foundation | `aws` | Installed Paths materialize validated local transforms. A cold miss must install and replay a locally validated Path before an Essence can execute; browser execution does not fall back to model-generated Essence. Coverage and formal schemas remain incomplete. |
| Essence query and mutation | Partial | `aws` | Statement/query flows exist; modifiers, referents, and repair reliability need formal schemas. |
| Browser-local derived arithmetic and counting | Implemented foundation | `aws` | Read-only Essence rows support deterministic add/subtract/multiply/divide, distinct identity counting, and signed summation over bound records; unit algebra, ambiguity clarification, and a fully versioned schema remain incomplete. |
| Data-defined local semantic entities | Implemented foundation | `aws` | Versioned operation templates compile locally with Path bindings. Personal and qualified-owner quantities share signed observation storage; quantity/event observation, selected-relation correction, and local trigger/effect policy seeds exist. Correction provenance/version history and formal contract schemas remain incomplete. |
| Sentence/Essence/signature/Path runtime | Implemented foundation / partial spec | `aws` | End-to-end interaction chain exists; versioned schemas and generalized repair remain active work. |
| Command registry, menus, and calls | Implemented foundation | `aws` + entity JPL | Declarative commands and state transitions exist; target/permission schemas need formalization. |
| Entity automation and sequences | Implemented foundation | `aws` + entity JPL | Interaction queues and equation composition exist; distinct from external scheduling. |
| Local ContextDB | Partial | `aws` | Graph storage and retrieval exist; persistence and refresh behavior require an explicit storage specification. |
| Local entity → server entity publication | Disconnected foundation | `aws` + `compute` | Two browser sync libraries and server entity/link/export storage exist, but active ContextDB does not invoke them. Durable outbox, ID mapping, versioning, and authorization are missing. |
| Shared hard-data entities | Partial / product intent | Cross-layer | Ordinary facts should publish as stored entities/relations, not only executable compute opportunities; authorized cross-user retrieval is not end-to-end tested. |
| Server entity hydration | Disconnected foundation | `aws` + `compute` | Export/hydration helpers exist but are not wired to active ContextDB startup or scoped shared queries. |
| Required and expanded Path learning | Partial | `aws` + model services | A cold miss builds a required candidate Path, then the browser validates, installs, and replays it before graph execution. Auto-build separately permits additional paraphrase signatures. Reliable reusable-family and correction repair remain incomplete. |
| Intent jurisdiction: data, invocation, composition, or capability creation | Partial / product intent | `aws` + `compute` | Local graph-versus-compute routing foundations exist; typed effect classes, deterministic authority checks, delta/event semantics, and stable reason codes are incomplete. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md). |
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
| JPL entity execution | Implemented / partial spec | `compute` | `published.actions` executes sequentially using the entity context and declared modules; the complete versioned schema and semantics are incomplete. See [execution representations](execution-representations.md). |
| Shorthand matrix execution and entity composition | Implemented / partial spec | `compute` | Active runtime executes row references, transforms, physical/virtual segments, and route calls; canonical keyword contracts, side-effect rules, and versioning are incomplete. See [execution representations](execution-representations.md). |
| ArrayLogic conversion/build plans | Implemented / partial spec | `compute` | Convert accepts or generates higher-level ordered plans and compiles them into Shorthand; one canonical schema and a pure plan/apply boundary are incomplete. See [execution representations](execution-representations.md). |
| Entity creation with structured model output | Partial | `compute` | Schema/validation paths exist; generation and repair reliability remain active work. |
| Entity + Path + context-aware editing | Partial | `aws` + `compute` | Semantic bundles and repair targets exist; transactional correction and replay require continued hardening. |
| Capability reuse, repair, fork, installation, and promotion | Partial / product intent | Cross-layer | Reuse/extend/build discovery and version fields exist; immutable compatible repair, deterministic contract diff, fork lineage, user-scoped installation, promotion, and dependency compatibility are incomplete. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md). |
| Compute capability discovery/build/install | Partial | `aws` + `compute` | Background discovery and generation exist; classification and input binding remain active work. |
| Compute answer verification | Implemented opt-in / partial | `aws` + `compute` | Verification toggle exists; history scope, cost policy, and durable behavior should be specified. |
| Failure diagnosis | Partial | `aws` + `compute` | Entity/Path/provider/platform diagnosis exists; should become contract-driven and observable. |
| Per-request model cost inspection | Implemented foundation | `aws` + `compute` | Browser session ledger expands each request into sanitized model attempts and dated USD estimates; broader non-token provider/tool charges and billing reconciliation remain future work. |
| Versioned LLM request templates | Implemented foundation | `aws` + `compute` | Message dropdown selects Original or New; trusted registries preserve one template through the request lineage and Cost labels the treatment. Representative quality/cost evals remain ongoing. |
| Background OpenAI jobs | Partial | `compute` + `aws` | Durable response/job mechanisms exist in code; comprehensive idempotency and lifecycle contract needed. |
| Scheduled entity tasks | Partial | Portal + `compute` + EventBridge Scheduler | Recurrence persistence and invocation exist; authorization recheck, idempotency, retry/DLQ, and result lifecycle need hardening. |
| Protected-asset storage and audit | Implemented trusted-server foundation | `compute` | DynamoDB resources and broker exist. Do not characterize server use as zero-knowledge. |
| Recipient-specific protected sharing | Partial / disconnected | `aws` + `compute` | Browser creates salted ECDH key wraps per recipient, but owner-only envelope retrieval currently prevents recipients from using them. |
| Organization-managed zero-trust keys | Product intent / foundation | `aws` + `compute` | Recipient key wrapping can support company-managed sharing; grant, rewrap, removal, rotation, and device lifecycle are incomplete. |
| Local protected-asset companion | Product intent | Future local runtime + `aws` | Browser-managed, locally executed zero-knowledge option; architecture not yet implemented. |
| `fileWorker` operational isolation | Implemented foundation | `aws` | Keeps entity execution off the main UI thread; same-origin dynamic execution is not yet a hardened sandbox. |
| Sound module | Implemented foundation | `aws` | Web Audio lifecycle, tone/media playback, stop, analyzer, and bus integration exist. |
| Reusable API/provider protocols | Product intent / emerging | Entities + Paths + JPL | Must use core 1var primitives rather than a disconnected provider subsystem. |
| Headless website protocol capture | Product intent | Entities, moods, Paths, local runtime | Model-assisted builder with approval; resulting protocol should be reusable and versioned. |
| Mindsets, thoughts, moods | Implemented first-class primitives / partial spec | Entity/front-end modules | Not architectural legacy. Runtime representation exists; publication, composition, and authoring semantics need dedicated documentation. |
| Streaming/WebRTC | Implemented foundation | `aws` + `compute` + Kinesis Video Streams | Presence, invites, media capture, signaling, and scoped credentials exist; authorization, recording, moderation, and E2EE options need hardening. |
| Email entity addresses | Partial | `aws` + `compute` + SES | Entity-addressed outbound behavior exists; inbound ownership/routing contract needs verification and specification. |
| Email consent/reputation controls | Partial | `compute` + SES | Opt-in, unsubscribe, rate, block, bounce, and suppression controls exist; complaint handling and deployment configuration verification remain gaps. |
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
