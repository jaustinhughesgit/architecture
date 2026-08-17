# Canonical Indexing and Context Compilation

## Implemented phase 4–6 foundation

The active Context v1 transport now compiles ordinary non-protected graph deltas into the established entity substrate. The browser contract is unchanged:

```text
local Context mutation and outbox
  → authenticated Context v1 publication
  → deterministic canonical compilation
      ├─ Words
      ├─ entities and subdomain addresses
      ├─ Context groups and group heads
      ├─ typed links/relations
      ├─ immutable version evidence
      ├─ action grants
      └─ rebuildable sharded projections
  → compatibility-sidecar write
  → stable-ID/version acknowledgement
```

Canonical batches are written before the sidecar. If canonical persistence fails, the server returns a retryable error and does not acknowledge the sidecar publication. Deterministic identities and idempotency projections make replay safe. This is dual-write migration behavior, not a permanent requirement to store every fact twice.

## Identity rules

- Existing Word, entity, subdomain, relation, version, and user IDs remain valid.
- New Context identities use deterministic SHA-256-derived IDs so the same principal/local identity replays without a global allocation write.
- Normalized lexical forms use deterministic Word IDs. The Word remains an address; it does not merge entities or semantic senses.
- A distributed time-and-random ID primitive is available for future creations that need uniqueness rather than replay identity.
- Legacy counter-backed creation routes remain compatibility work. Phase 4 does not silently reinterpret or renumber their records.

## Projection partitions

`CanonicalProjectionTable` contains indexes and mappings only. Its primary key includes a configurable shard:

| Projection | Default shards | Purpose |
| --- | ---: | --- |
| `AUD#<audience>#<shard>` | 32 | Participant/public hydration candidates |
| `WORD#<word-id>#<shard>` | 256 | Exact Word-to-entity candidates |
| `PROFILE#<label>#<shard>` | 64 | Exact public-profile candidates |
| `MAP#<principal>#<shard>` | 32 | Local-to-canonical identity mappings |

Sharding trades bounded fan-out for removal of a single hot allocation or lookup partition. Projection results are always candidates. Callers reload canonical rows and current grants before reading, aggregating, editing, executing, or governing them.

## Hydration migration

Hydration currently reads both sources:

1. page through the requested server-derived canonical audience;
2. load projected entity/relation IDs from canonical tables;
3. load `perm_grants` for that audience and discard unauthorized candidates;
4. read the compatibility sidecar for records not yet backfilled;
5. deduplicate by canonical server ID, preferring canonical records;
6. return the unchanged Context v1 response with a composite cursor.

Exact profile lookup is canonical-first and still includes compatibility/legacy records. A bounded Word candidate API supports future lexical query planning. Broad typed traversal and aggregation remain later query-consumer work; this phase proves the persistence and authorization boundary.

## Position/Search

New Position writes use `AB2` keys whose partition key contains the anchor shard. Search performs bounded reads from all configured v2 shards and the old v1 partition during migration. It unions tenant and global candidates, reloads subdomains, derives public/private policy from server state, applies owner/grant authorization, and ranks only the authorized set. If the initial 160-band candidate window is completely empty, Search makes one bounded 320-band pass; it does not scan the entity table. Anchor rows carry the canonical entity revision and content hash so later stale-row cleanup can compare them.

## Deferred gates

- Phase 13: backfill old sidecar data, compare read parity, cut over, and retire the sidecar.
- Phase 14: deployed hot-partition, throughput, latency, and cost tests; stale-posting removal; exact reranking; large fan-out measurement; and cross-user acceptance.
- Later governance phases: reconcile all legacy `access`/`verified` meanings with action grants, transactional version conflicts, delegation, revocation, and audit.

No protected plaintext is compiled or indexed. The three execution planes and entity composition primitives are unaffected by this persistence migration.
