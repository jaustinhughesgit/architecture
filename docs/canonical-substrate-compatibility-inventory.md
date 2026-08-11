# Canonical Substrate Compatibility Inventory

## Purpose

This inventory prevents a migration from replacing established 1var capabilities with a one-off graph store. It classifies existing persistence, indexes, and execution entry points against the [canonical entity substrate](canonical-entity-substrate.md). Nothing listed here is deleted by phases 1–3.

Status classes:

- **Foundation:** established data/mechanics that map into canonical records.
- **Adapter:** active behavior retained behind the persistence port while its records are compiled or migrated.
- **Derived:** rebuildable lookup data; never canonical or authoritative.
- **Support:** operational or identity data referenced by the substrate but not modeled as an ordinary fact.
- **Historical:** inactive/alternate code retained for inspection; not a migration source of truth.

## Physical persistence inventory

| Store/artifact | Class | Existing responsibility | Canonical destination and migration rule |
| --- | --- | --- | --- |
| `words` | Foundation | Compact `a` ID, original `r`, normalized `s`, exact `sIndex` lookup | Word record. Preserve IDs; add lemma/language/sense fields additively; lexical matches never authorize. |
| `entities` | Foundation | Independent `e` identity, Word/group/head/version/access references | Entity record. Preserve lifecycle, lineage, composition, and bundle references. |
| `subdomains` | Foundation | `su` address joining entity, Word, group, path, visibility, output, and anchor data | Address record plus materialized-output/position references. Preserve reverse indexes while replacing raw field access through the port. |
| `groups` | Foundation | Named grouping and head identity | Group plus typed membership/use relations. Preserve group IDs and general `use`/`substitute` behavior. |
| `links` | Foundation | Whole/part/property edges and reverse lookup keys | Typed Relation records. Keep `map`, `extend`, `link`, `use`, and `substitute` mechanically distinct. |
| `versions` | Foundation | Entity/version history | Canonical version evidence. No in-place rewrite that loses provenance. |
| `access`, `verified`, `perm_grants` | Foundation + adapter | Older access/verification records and newer policy grants | One action-specific Grant contract. Dual-read until precedence, revocation, expiry, and delegation are formally reconciled. |
| S3 public/private entity bundles | Foundation/support | Durable entity content, JPL, presentation, local-worker assets, cached output | Canonical entity/capability implementation references. Preserve public/private and protected-asset boundaries. |
| `context_graph` / `ContextGraphTable` | Adapter | Participant/public audience projections, profiles, mappings, idempotency, stable IDs, versions, tombstones, hydration | New writes compile to canonical Words/entities/addresses/groups/relations/versions/grants first; dual-read preserves old records. Keep through phase-13 backfill/parity/rollback. |
| `CanonicalProjectionTable` | Derived | Sharded audience, Word-to-entity, profile, local-mapping, and idempotency lookup rows | Rebuildable indexes over canonical IDs/versions. Reload facts and grants; never infer identity or authority from a projection. |
| `paths`, `PathFoundationTable` | Support | Identity-scoped learned Paths and reviewed shared foundation | Interaction index referencing canonical operations/entities. Paths remain browser-local execution/reuse contracts, not fact storage. |
| `ProtectedAssetsTable`, audit table, ciphertext objects | Support | Trusted-server ciphertext/references, grants, consent, and audit | Canonical records contain protected references only. Never copy plaintext into entities, Words, RAG, logs, or provenance. |
| `anchor_bands` | Derived | L0/L1/band/shard candidate postings for Position/Search | New `AB2` writes shard in the partition key and carry entity revision/hash. Search reads v2 plus legacy v1, reloads canonical addresses, and authorizes before ranking/return. Stale cleanup and deployed load gates remain. |
| `embPaths` and embedding artifacts | Derived | Alternate/legacy embedding lookup and path similarity | Retrieval/path indexes with explicit source version and model. Inventory ownership before consolidation; safe to rebuild, not to infer facts from. |
| S3 anchor sets | Derived | Position quantization artifacts | Versioned index-set artifact. Model/dimension/set compatibility must be explicit. |
| `users`, `cookies`, passphrases/device-key records | Support | Account identity, session, authenticator/public key metadata | Principal references and authentication inputs. Account existence is not an ordinary entity grant. |
| tasks, schedules, presence, invites, email/suppression tables | Support | Operational execution and communication lifecycle | Retain behind their owning modules; link to canonical entity/capability IDs and enforce their own lifecycle contracts. |
| global counter tables (`wCounter`, `eCounter`, `vCounter`, others) | Adapter / scale risk | Allocate compact legacy IDs | Preserve existing IDs. New Context/Word compilation is counter-free; remaining legacy creation routes migrate consumer-by-consumer before counter retirement. |

## Code and route inventory

| Surface | Current evidence | Migration treatment |
| --- | --- | --- |
| `compute/app/routes/shared.js` | Shared getters for subdomains, entities, Words, groups, access, verification, links, versions, and creators | First consumer of the canonical persistence port. Compatibility return envelopes stay stable. |
| `compute/app/routes/modules/contextGraph.js` | Active Context v1 publication, audience derivation, profile lookup, mappings, idempotency, hydration, tombstones | Canonical-first dual-write and grant-checked dual-read are active when the projection table is configured; keep sidecar compatibility through phase 13. |
| `compute/app/routes/controller.js` and creation modules | Direct counters and physical Words/entity/version/subdomain writes | Migrate to canonical mutation/write methods before scale-ID work and cutover. |
| relationship modules: `map`, `extend`, `links`, `groups`, `useGroup`, `substituteGroup` | Existing composition mechanics across entity and link records | Formalize relation effects and per-node authorization; preserve behavior and IDs. |
| `runEntity`, JPL, Shorthand, ArrayLogic/Convert | Governed server execution, composition/build, and some persistence/index side effects | Keep execution distinct from persistence; phase 10 unifies invocation envelopes, not runtime languages or trust planes. |
| `anchor`, `position`, `search`, `anchors.js` | Position writes, anchor-band postings, semantic candidate search | Now use the persistence port for positioning/retrieval, server-derived identity/policy, partition-key shards, tenant/global union, current canonical reload, and authorization before `topK`. Stale removal, exact reranking, and deployed cost/load proof remain phase 14. |
| capability registry/build/edit/diagnosis | Definitions, manifests, model jobs, repair/fork fields | Map definitions and user installations separately; preserve model-output validation and repair evidence. |
| `aws` ContextDB/transcription worker | Local graph, encrypted outbox, Path/Essence execution, ID replacement, hydration | Keep local-first and zero-trust behavior. Change only the server compilation/hydration adapter behind the existing versioned sync contract. |
| `aws` Position/Search modules and portal | User-facing discovery/index controls | Align payloads to the canonical retrieval contract; do not expose table/index implementation as authority. |
| `aws` `fileWorker` | Isolated dynamic local entity script execution | Preserve as an execution plane. Store only implementation references/contracts in canonical persistence. |
| `aws-api` | Authenticated opaque proxy to Compute | Keep payload opacity and CORS boundary; version any public contract change. |
| `testing` | Cross-layer public API acceptance | Add canonical publication/hydration/search scenarios after lower-layer adapters are proven. |
| `compute-app-old*`, `cookies-old.js`, numbered alternate parsers | Historical implementations | Do not migrate from filename similarity. Use active module registration as source of truth; retain until separately governed cleanup. |

## Capability preservation checklist

The migration is not complete if it loses any of the following:

- voice/message → sentence → Essence → Path → execution and reusable local learning;
- typed ContextDB statements, questions, corrections, arithmetic, answer sentences, LLM interpretation/repair, and model cost traces;
- independent Words, entities, subdomains, groups, versions, links, ownership, and materialized output;
- entity middleware, parent/child response bubbling, and general `map`/`extend`/`link`/`use`/`substitute` composition;
- Compute/JPL, trusted browser modules, and dynamic local `fileWorker` execution as three distinct planes;
- edit, convert, capability reuse/build/fork/install, function calling, automation, communication, navigation, and governance;
- protected-asset references, recipient wrapping, public/private visibility, action grants, revocation, provenance, audit, and local-first/zero-trust boundaries;
- idempotent Context publication, stable ID replacement, participant/public scopes, tombstones, profiles, cursors, and multi-session hydration;
- Position/Search/RAG as a scalable, permission-filtered candidate layer over the same canonical identities.

## Phase 1–6 exit assessment

| Requirement | Status after this phase |
| --- | --- |
| Logical contracts and invariants are versioned | Implemented foundation |
| Existing stores and routes have an explicit destination | Implemented inventory |
| One Compute persistence port exists | Implemented foundation |
| Shared canonical getters use the port | Implemented foundation |
| Active Context sidecar access uses the port | Implemented foundation |
| Every legacy direct table call is removed | Not part of phase 3; tracked consumer-by-consumer |
| New Context data is compiled into canonical records | Implemented foundation |
| Existing sidecar data is backfilled and the sidecar retired | Phase 13 |
| New Context IDs avoid global counters | Implemented foundation |
| All legacy creator counters are retired | Not yet; consumer-by-consumer compatibility remains |
| Canonical/Position indexes distribute hot domains | Implemented foundation |
| Production-scale latency, throughput, and cost are proven | Phase 14 |

No table, bundle, protected record, Path, or local Context record is deleted in phases 1–6. The sidecar and legacy anchor keys remain readable rollback inputs.
