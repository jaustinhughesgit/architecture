# 0023: Words Are Lexical Addresses, Not Entity Identities

- Status: Accepted
- Date: 2026-08-11

## Context

1var must resolve spoken and messaged terms across large numbers of users and entities without scanning one monolithic contextual graph or storing every sentence combination. The platform already has compact Words records, independently managed entities/subdomains, and indexes that can connect a normalized word address to matching records. Future root lemmas and morphology can make related forms such as `cat`/`cats` and `add`/`adds`/`added` reachable through shared linguistic structure.

A word is nevertheless not a person, physical object, capability, semantic sense, owner, or permission. Treating a shared spelling or lemma as global entity identity would collapse unrelated records and make a lexical match an authorization decision.

## Decision

Words are a shared, inexpensive lexical-address layer distinct from entity identity.

- A Word has a compact word ID and may store original, normalized, lemma, inflection, alias, morphology, language, and sense-address metadata.
- Exact normalized forms use an indexed lookup. Lemma and morphology links expand candidate discovery without requiring one row for every complete sentence.
- Entities and subdomains reference Word IDs while retaining independent IDs, owners, types, versions, permissions, provenance, relationships, and lifecycle.
- Reverse word-to-entity/subdomain indexes support bounded candidate retrieval. Authorization, current Context, entity type, relationship constraints, version state, and Path/Essence semantics filter candidates before traversal or aggregation.
- Sharing a token or lemma never merges entity identities or semantic senses. Explicit governed links perform any intended connection.
- Global counters may remain compatible during migration, but production allocation must avoid hot partitions through ranges, sharding, distributed identifiers, or another measured strategy.

## Alternatives considered

- **Store every word directly on every entity and scan entities.** Rejected because it duplicates lexical data and makes broad lookup expensive.
- **Use a single ContextGraph table as both lexical and entity identity.** Rejected because it collapses distinct lifecycle, indexing, and authorization responsibilities into a parallel ontology.
- **Treat a lemma as canonical entity identity.** Rejected because homonyms, user-owned objects, people, capabilities, and physical instances can share a root without being the same entity.
- **Persist every sentence pattern.** Rejected because compositional subpatterns and lexical relationships provide broader coverage with fewer runtime records.

## Consequences

- `cats` can cheaply address records connected to `cat` while each user's physical cat, ownership relation, and quantity remain distinct.
- Broad questions can query an indexed candidate set and then apply authorization instead of loading every user's full graph.
- Word and entity schemas can evolve independently.
- Lemma construction, sense separation, index pagination, permission-aware query plans, counter allocation, and large-scale benchmarks require explicit implementation work.
- The retained Context publication sidecar must adapt to or migrate behind this canonical substrate rather than silently replace it.

## Security impact

A lexical match grants no read, use, execute, edit, or aggregation permission. Action-level access filters run before an entity or relationship is returned. Protected terms and plaintext values must not enter globally discoverable Word indexes unless the owner explicitly permits that publication.

## Migration and compatibility

Existing Word and entity IDs remain valid. Introduce lemma and morphology fields or relationship records additively. Backfill normalized/lemma candidates without merging entities, preserve local-to-server mappings and provenance, and dual-read during index migration. Adapt the active Context sync outbox, audience, tombstone, hydration, and stable-ID replacement mechanics to canonical word/entity/link records before retiring the sidecar.

## Verification

Test exact and inflected lookup; homonyms and duplicate labels; independent physical entities sharing one word; authorization before aggregation; updates, tombstones, and revocation; pagination; multilingual/sense boundaries; protected-data exclusion; refresh-safe local/server mappings; hot-key behavior; and benchmarked query cost across representative user, word, entity, and relationship volumes.

## Affected repositories

- `architecture`
- `aws`
- `aws-api`
- `compute`
- portal surfaces that create, link, search, or govern Words and entities
