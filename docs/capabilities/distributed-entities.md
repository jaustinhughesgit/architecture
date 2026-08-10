# Distributed Entities and Context Publication

**Status:** Partial; ordinary ContextDB publication, participant hydration, and exact public-profile hydration are active

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

The active transcription worker now observes committed ordinary ContextDB graph deltas, records them in an encrypted identity-scoped outbox, and publishes them asynchronously through the API boundary. Compute verifies that the requested workspace belongs to the authenticated principal, resolves the current speaker and exact unique public user handles, writes versioned nodes and relations to a retained Context graph table, and returns authoritative node/relation IDs. The browser persists those mappings and applies node IDs to ContextDB, graph mentions, histories, checkpoints, and Path translations.

Each connected relation component is visible to its publisher and any uniquely resolved user participants. Hydration reads only the authenticated principal's audience partition and merges those entities into local ContextDB; the principal's stable server entity becomes the local `speaker`. This lets one user publish a spoken fact about another known public user and lets that participant ask a first-person question after hydration.

For a public workspace, a component connected to the authenticated current-speaker node also receives a public-profile audience. An executed self-property assertion such as `My name is Austin` can register the exact profile name because the server observes a resolved current-speaker → name → value relation rather than trusting transcript text. Before a later question naming Austin runs locally, the browser requests exact-name hydration; Compute resolves the unique profile and selects Austin's public audience without accepting a client-supplied target identity. The remote Austin node keeps its name but never becomes the requesting browser's `speaker`. See [decision 0022](../../decisions/0022-public-profile-named-context-hydration.md).

Publication retries preserve one idempotency key across connectivity failures. Removed relations publish tombstones to every prior audience. Protected inputs and protected graph markers do not enter this ordinary publication channel. The older entity/link/export synchronizers remain historical foundations and are not the active contract.

## Identity and data-model rules

- Local `ent_<n>` IDs and server entity/subdomain IDs occupy different namespaces and require an explicit persisted mapping.
- Names are labels, not stable identity. Two users' `cat`, `North Carolina`, or `3` entities must not be merged solely by text.
- Publication includes subject, predicate, object/value, type, owner/subject, provenance, source message, version, visibility, and authorization—not just three lowercase labels.
- Literal values remain typed values when appropriate; they need not all become globally discoverable named entities.
- Updates and deletions use versions/tombstones and reconcile across devices.
- Zero-trust or local-only facts never enter the ordinary publication outbox.
- Shared ordinary relations use participant-scoped visibility. Public workspaces may additionally expose only self-connected ordinary components through their exact profile; all other broader querying requires an explicit delegated grant evaluated at read time.

## Remaining work

1. Extend the current participant and public-self visibility into explicit delegated grants and user-facing publication policy without weakening either audience partition.
2. Add user confirmation or trust policy for incoming facts before they influence sensitive decisions.
3. Add conflict arbitration for concurrent multi-device edits beyond deterministic version/tombstone publication.
4. Add production end-to-end coverage with two independently authenticated browser identities and revocation across both devices.
