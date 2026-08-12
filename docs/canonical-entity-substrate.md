# Canonical Entity Substrate

## Status and scope

This document freezes the logical v1 boundary for storing and retrieving addressable 1var data, logic, communication, navigation, and governance. It does not freeze a DynamoDB table layout. Existing tables remain active behind compatibility adapters until the later migration phases prove a safe cutover.

The executable record contract is [canonical-substrate.v1.schema.json](../contracts/canonical-substrate.v1.schema.json). The active Context publication envelope remains [context-graph-sync.v1.schema.json](../contracts/context-graph-sync.v1.schema.json); it must compile into these canonical records rather than become a second ontology.

## Invariants

1. **Canonical identity is independent of wording.** Word IDs address candidates. Entity, relation, group, capability, installation, and grant IDs own lifecycle.
2. **Local IDs are temporary aliases.** Publication returns a durable canonical ID and version, and a scoped local mapping lets the browser replace or resolve the local ID after refresh.
3. **Facts are typed and related.** A statement persists typed entities and relations with owner, workspace, provenance, version, and lifecycle. Raw prose may be provenance; it is not the only durable fact representation.
4. **Authorization is action-specific.** Discovering a Word, embedding, address, or entity candidate grants no read, aggregate, use, edit, delete, delegate, publish, or govern authority. Returning a resolved value and invoking an entity are both canonical `use`; legacy `execute` is an input alias only.
5. **Versions are immutable evidence.** A mutation declares an expected prior version. Deletion and revocation produce lifecycle records or tombstones; they do not silently erase the history required for synchronization and audit.
6. **Capabilities and installations are distinct.** Many users may reuse one capability definition while retaining independent bindings, configuration, grants, protected-asset references, and lifecycle.
7. **Execution placement is explicit.** A capability declares `browser-main`, `file-worker`, or `compute-jpl`. Dynamic scripts remain in `fileWorker`; persistence never moves code onto the main thread.
8. **Protected data stays referenced.** Canonical records store a protected-asset reference and trust mode, never plaintext protected values.
9. **RAG and Positioning are derived.** Retrieval postings name the canonical entity and version, content hash, index set, model, and coordinates. They are rebuildable candidate indexes and never the source of facts, identity, or authority.
10. **Persistence is a port.** New Compute code uses the canonical persistence API. Physical table names, short legacy attributes, sidecar partitions, and DynamoDB request shapes stay inside adapters.

## Logical record families

| Record | Purpose | Current physical foundation |
| --- | --- | --- |
| Word | Shared lexical address with normalized form and optional lemma, morphology, language, and sense | `words` |
| Entity | Independently governed data, physical, structural, executable, interaction, presentation, or composite object | `entities` plus entity bundles |
| Address | Word/group/path address to an entity with discoverability scope | `subdomains` |
| Group | Governed collection and head identity | `groups` plus relations |
| Relation | Typed subject-predicate-object fact or composition edge | `links`, entity fields, and temporarily Context graph relations |
| Grant | Principal, resource, allowed actions, conditions, expiry, and lifecycle | `access`, `verified`, `perm_grants` |
| Capability | Reusable input/output/effect/plane contract and implementation reference | entity records, bundles, manifests, registry fields |
| Installation | User/workspace binding to a capability | partial registry/permission fields; canonical implementation missing |
| Local mapping | Principal-scoped local ID to canonical ID/version | Context sync mapping records |
| Retrieval posting | Rebuildable Position/Search/RAG candidate projection | `anchor_bands`, `embPaths`, anchor artifacts |
| Mutation | Idempotent, version-checked set of canonical writes | implemented transactionally only in portions of current flows |

Short legacy field names such as `a`, `e`, `g`, `h`, `su`, `v`, and `ai` are adapter concerns. They remain valid storage data during migration but are not the public logical vocabulary of v1.

## Canonical persistence API

Compute owns one persistence port with typed namespaces for Words, entities, addresses, groups, relations, versions, grants, identity support, the Context compatibility sidecar, and derived retrieval postings. The initial implementation deliberately has three adapter classes:

- **Canonical foundation adapters** map logical reads and writes to established Words/entity/subdomain/group/link/version records.
- **Compatibility adapters** preserve active Context publication and older return envelopes without declaring them canonical.
- **Derived-index adapters** read and write Position/Search postings. Their results are candidates that must be reloaded from canonical records and authorized before use.

The API does not decide whether an actor is allowed to perform an action. A caller supplies an authenticated principal and the authorization layer proves the requested operation. The persistence layer applies conditional versions, idempotency, pagination, and physical reads/writes; it does not infer authority from owner-like request fields.

New modules must not import table names or issue direct DynamoDB operations for canonical record families. Existing consumers migrate incrementally through the compatibility namespace, after which their raw adapter method can be removed.

## Publication and hydration boundary

The current browser outbox mechanics are retained: encrypted local pending state, bounded deltas, idempotency keys, stable-ID acknowledgement, local-ID replacement, participant/public audience derivation, tombstones, cursors, and refresh-safe hydration.

During migration, the server compiler will transform a Context v1 node/relation delta into a canonical mutation:

1. resolve or create Word addresses without merging semantic senses;
2. resolve or create independently owned entity IDs;
3. emit typed relations and provenance;
4. emit grants or audience projections only from authenticated server policy;
5. persist local mappings and acknowledgement state;
6. enqueue rebuildable lexical and Position/RAG projections;
7. return canonical IDs and versions for local replacement.

Dual-write and dual-read are migration tools, not a permanent product model. The Context sidecar cannot be retired until canonical hydration proves the same privacy, stable-ID, idempotency, tombstone, profile, and pagination behavior.

## Query boundary

Candidate retrieval and authority are intentionally separate:

```text
voice/message → Path + Essence → lexical/Position candidates
  → canonical record load → action-specific authorization
  → typed traversal/aggregation or authorized execution → response
```

Exact Word and lemma indexes should answer vocabulary-address questions cheaply. Position/Search can narrow semantic candidates without loading every user's graph. A query such as “how many cats does everyone have?” therefore resolves the Word/lemma, retrieves bounded canonical relation candidates, applies each subject and aggregate grant, and then computes over typed numeric values. It does not scan one large Context table or trust an embedding posting as a fact.

## Change rules

- Additive optional fields remain v1 when old readers can safely ignore them.
- A required field, identity meaning, authorization meaning, lifecycle rule, or execution-plane change requires a new schema version and architecture decision.
- Physical repartitioning or a new index does not change the logical schema when behavior remains compatible.
- Adapters must expose observable deprecation and migration status; they may not silently reinterpret existing IDs.
- Every cross-layer mutation needs contract tests for idempotency, expected-version conflict, authorization denial, tombstone propagation, and local/server mapping.

## Current implementation status

- **Contract:** v1 accepted and machine-readable.
- **Persistence port:** implemented foundation in Compute; established reads and active Context sidecar access can run through adapters.
- **Canonical writes:** new Context publication compiles Words, entities, addresses, Context groups, relations, versions, grants, and sharded projections; legacy creation modules still write physical records directly.
- **Context compilation:** implemented foundation with canonical-first, sidecar-second idempotent dual-write.
- **Canonical hydration/query:** implemented foundation for grant-checked Context hydration, exact profiles, bounded Word candidates, and sidecar dual-read. Broad typed traversal/aggregation remains incomplete.
- **Position/RAG:** new postings use partition-key shards and server-derived policy; Search unions v2/v1 candidates, reloads canonical addresses, and authorizes before ranking. Stale cleanup, exact reranking, and deployed scale/cost proof remain incomplete.
- **Composition/middleware:** five typed primitives, deterministic owning lineage, middleware decisions, and active route conformance are implemented foundations. Cross-plane invocation adoption remains phase 10.
- **Governance/lifecycle:** one action decision plus conditional lifecycle/version/audit transactions are implemented foundations. Legacy grant backfill and non-composition consumer migration remain incomplete.

See [canonical indexing and Context compilation](canonical-indexing-and-context-compilation.md), [entity middleware, composition, and governance](entity-middleware-composition-and-governance.md), [decision 0026](../decisions/0026-sharded-canonical-context-publication-and-hydration.md), and [decision 0027](../decisions/0027-versioned-entity-middleware-composition-and-governance.md).
