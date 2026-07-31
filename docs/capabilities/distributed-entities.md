# Distributed Entities and Context Publication

**Status:** Implemented foundations; active local-to-server synchronization is disconnected

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
  → server creates or resolves addressable entities
  → server returns stable IDs and versions
  → browser persists local-ID ↔ server-ID mappings
  → relations, ownership, visibility, permissions, and provenance publish idempotently
  → authorized devices/users can hydrate or query the shared graph
```

Local execution must not wait for publication. Publication failure must remain visible and retryable rather than silently losing shareability.

## Current implementation evidence

The browser contains two synchronization foundations:

- a worker-side graph synchronizer that creates server entities from relation subjects, properties, and objects, receives server subdomain IDs, and publishes links;
- a browser-side server synchronizer that can create/reuse entities, link them, export entities/links by creator, and hydrate a name-to-server-ID cache.

The compute layer still has durable `entities`, `subdomains`, `words`, `versions`, and `links` records, creator-stamped links, public/private state, relationship operations, and export behavior.

Neither browser synchronizer is currently referenced by the active transcription/ContextDB runtime. Their maps are memory-only, there is no durable sync outbox or acknowledgement protocol, and no integration tests cover local mutation through authorized cross-user retrieval. This is a disconnected capability, not evidence that local entities and server entities should diverge.

## Identity and data-model rules

- Local `ent_<n>` IDs and server entity/subdomain IDs occupy different namespaces and require an explicit persisted mapping.
- Names are labels, not stable identity. Two users' `cat`, `North Carolina`, or `3` entities must not be merged solely by text.
- Publication includes subject, predicate, object/value, type, owner/subject, provenance, source message, version, visibility, and authorization—not just three lowercase labels.
- Literal values remain typed values when appropriate; they need not all become globally discoverable named entities.
- Updates and deletions use versions/tombstones and reconcile across devices.
- Zero-trust or local-only facts never enter the ordinary publication outbox.
- Querying another person's graph requires an explicit public or delegated grant evaluated at read time.

## Required repair

1. Define versioned entity-publication, acknowledgement, and hydration contracts.
2. Wire ContextDB graph deltas to a durable, encrypted local outbox.
3. Make server creation idempotent and return authoritative IDs/versions for every published node and relation.
4. Persist the ID map and sync cursor across refreshes.
5. Apply public/private, use/set, execute, edit, delete, and permit authorization to facts and links.
6. Replace creator-only bulk export shortcuts with authorized, scoped graph queries.
7. Add tests for offline creation, retry, conflict, refresh, multi-device hydration, revocation, and cross-user questions.
