# Distributed Entities and Context Publication

**Status:** Partial; canonical Context compilation, participant/public dual-read hydration, and exact public-profile hydration are active foundations

Durable direction: [ADR 0002](../../decisions/0002-entities-are-distributed-assets.md).

An entity is 1var's addressable unit of meaning, data, behavior, presentation, or interaction. A compute opportunity is one use of an entity, not the definition of an entity.

## Entity forms

The same entity model supports:

- **hard data assets:** stored facts and values that can be retrieved without calling a function;
- **executable assets:** JPL, functions, actions, automations, commands, menus, and provider protocols;
- **interaction assets:** mindsets, thoughts, moods, sound, streaming sessions, and presentation behavior;
- **structural assets:** people, organizations, products, properties, relationships, and lineage;
- **compute capabilities:** entities whose contract invokes controlled computation.

Mindsets, thoughts, and moods are therefore first-class authoring and interaction primitives. A particular UI implementation may be old or incomplete, but the capability itself is not architectural legacy.

## Canonical shared substrate

Published context should use the platform's established entity substrate rather than remain in a permanent context-only ontology:

- **Words** hold cheap shared lexical addresses and exact normalized indexes. Future root-lemma, inflection, alias, morphology, and language links can expand linguistic reach without changing entity identity.
- **Entities and subdomains** hold independently managed data, behavior, presentation, interaction, and compute records. A subdomain can reference a word ID and participate in a reverse word-to-entity address index.
- **Groups and links** express membership, composition, use, lineage, and other authorized graph relationships.
- **Versions and access records** govern lifecycle, visibility, actions, provenance, revocation, and reconciliation.
- **Entity bundles and protected-asset references** carry executable and sensitive capability material without embedding plaintext secrets in ordinary context.

The logical v1 record contract is frozen in [the canonical entity substrate](../canonical-entity-substrate.md). New Context records now use the physical foundation and sharded projections, while legacy creator migration, backfill, and deployed scale proof remain incomplete. Lexical identity, entity identity, relationship identity, and authorization remain separate. See [decision 0023](../../decisions/0023-words-are-lexical-addresses.md) and [decision 0026](../../decisions/0026-sharded-canonical-context-publication-and-hydration.md).

## Local-first and shared are complementary

ContextDB creates local entities and relations immediately so a known statement or question can execute without a server round trip. When the user permits synchronization, those local graph changes must also become durable server entities so they can be governed, shared, searched, linked, and retrieved by other authorized users.

For example, `I have 3 cats` can produce local semantic rows equivalent to:

```text
Austin --have--> cat record
cat record --quantity--> 3
```

The server representation is a hard asset: another authorized user can ask how many cats Austin has, and the answer can be retrieved from stored entities and links without running an external compute function.

## Intended publication flow

```text
sentence
  → local Essence mutation
  → local ContextDB entities and relations commit immediately
  → durable sync outbox records the graph delta
  → server resolves word addresses and creates or resolves canonical entities
  → server returns stable IDs and versions
  → browser persists local-ID ↔ server-ID mappings
  → subdomains, groups, links, ownership, visibility, permissions, and provenance publish idempotently
  → authorized devices/users can hydrate or query the shared graph
```

Local execution must not wait for publication. Publication failure must remain visible and retryable rather than silently losing shareability.

## Current implementation evidence

The active transcription worker observes committed ordinary ContextDB graph deltas, records them in an encrypted identity-scoped outbox, and publishes them asynchronously through the API boundary. Compute verifies the authenticated workspace, resolves the current speaker and exact unique public user handles, compiles Words, entities, subdomain addresses, a workspace/principal Context group with its head, links, versions, grants, and sharded projections, then writes the retained compatibility sidecar and returns authoritative node/relation IDs. The browser persists those mappings and applies node IDs to ContextDB, graph mentions, histories, checkpoints, and Path translations.

The retained Context graph table is now a migration adapter rather than the only server fact store. Canonical batches are written first; a failure is retryable and does not acknowledge the sidecar publication. Hydration reads canonical and sidecar records, prefers canonical duplicates, and checks current grants. The sidecar remains necessary for historical records and rollback until phase-13 backfill and parity gates pass.

Each connected relation component is visible to its publisher and any uniquely resolved user participants. Hydration selects only the authenticated principal's server-derived audience, reloads canonical records and grants, includes sidecar-only compatibility rows, and merges permitted entities into local ContextDB; the principal's stable server entity becomes the local `speaker`. This lets one user publish a spoken fact about another known public user and lets that participant ask a first-person question after hydration.

For a public workspace, a component connected to the authenticated current-speaker node also receives a public-profile audience. An executed self-property assertion such as `My name is Austin` can register the exact profile name because the server observes a resolved current-speaker → name → value relation rather than trusting transcript text. Before a later question naming Austin runs locally, the browser requests exact-name hydration; Compute resolves the unique profile and selects Austin's public audience without accepting a client-supplied target identity. The remote Austin node keeps its name but never becomes the requesting browser's `speaker`. See [decision 0022](../../decisions/0022-public-profile-named-context-hydration.md).

Publication retries preserve one idempotency key across connectivity failures. Removed relations publish tombstones to every prior audience. Protected plaintext and aliases never enter this channel. A partially protected mutation may publish its ordinary relation skeleton with the protected value replaced by a generic marker and opaque asset reference; Compute verifies that the authenticated publisher owns the active asset before accepting it. Hydration carries that requestable reference, but it supplies no plaintext, grant, or recipient wrap. The older entity/link/export synchronizers remain implementation foundations whose identity, indexing, composition, access, and lifecycle semantics must be reconciled with the active publication mechanics; neither implementation should be discarded without a migration plan.

## Lexical retrieval and aggregation

An authorized broad question should not scan every user's complete graph. A scalable retrieval path is:

```text
spoken or messaged term
  → normalize and resolve exact word/lemma candidates
  → obtain compact word IDs
  → use reverse indexes to find addressable entity/subdomain candidates
  → apply workspace, owner, relationship, version, and action-level authorization
  → traverse or aggregate only the permitted subgraph
```

For example, `cats` may resolve through a future `cat` lemma, but the matching word ID does not prove that every connected entity represents the same physical cat, owner, or semantic sense. Entity and relationship records preserve those distinctions, and access filters run before values are returned or counted.

## Identity and data-model rules

- Local `ent_<n>` IDs and server entity/subdomain IDs occupy different namespaces and require an explicit persisted mapping.
- Names are labels, not stable identity. Two users' `cat`, `North Carolina`, or `3` entities must not be merged solely by text.
- Publication includes subject, predicate, object/value, type, owner/subject, provenance, source message, version, visibility, and authorization—not just three lowercase labels.
- Literal values remain typed values when appropriate; they need not all become globally discoverable named entities.
- Updates and deletions use versions/tombstones and reconcile across devices.
- Zero-trust plaintext and aliases never enter the ordinary publication outbox. A partially protected fact may publish only its ordinary structure and owner-validated opaque request reference.
- Shared ordinary relations use participant-scoped visibility. Public workspaces may additionally expose only self-connected ordinary components through their exact profile; all other broader querying requires an explicit delegated grant evaluated at read time.

## Remaining work

1. Extend the current participant and public-self visibility into explicit delegated grants and user-facing publication policy without weakening either audience partition.
2. Add user confirmation or trust policy for incoming facts before they influence sensitive decisions.
3. Add conflict arbitration for concurrent multi-device edits beyond deterministic version/tombstone publication.
4. Add production end-to-end coverage with two independently authenticated browser identities and revocation across both devices.
5. Backfill existing sidecar rows, compare canonical/compatibility parity, cut over, and retire the sidecar through the phase-13 rollback plan.
6. Complete lemma-ready Word relationships, broad typed traversal/aggregation, sense separation, authorization-first query plans, and deployed hot-partition/cost benchmarks.
