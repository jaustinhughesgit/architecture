# 0026: Sharded Canonical Context Publication and Hydration

- Status: Accepted
- Date: 2026-08-11

## Context

Context publication already provides local-first outbox retry, stable-ID acknowledgement, participant/public audiences, exact profiles, mappings, tombstones, and hydration. Its server records lived only in the compatibility sidecar. Legacy compact IDs also depend on global counters, and the original anchor-band format placed a shard label in the sort key while every cell still shared one DynamoDB partition key. These shapes cannot be the only path to billions of facts or high-rate candidate indexing.

## Decision

New Context publications compile into the established canonical Words, entities, subdomains/addresses, Context groups, links/relations, versions, and `perm_grants` records before the compatibility sidecar is written.

- Context-derived canonical IDs and Word IDs are deterministic hashes; the identifier library also provides time-ordered distributed IDs for future non-idempotent creation. Neither requires a shared allocation write.
- Existing legacy IDs remain valid. Counter-backed legacy creation routes are compatibility adapters until migrated individually.
- Rebuildable audience, Word-to-entity, profile, local-mapping, and idempotency projections use a retained encrypted `CanonicalProjectionTable`. The shard is part of its partition key. Projection rows never become fact or authorization authority.
- Hydration reads canonical and sidecar sources during migration, selects the highest record version and prefers canonical only for equal-version duplicates, reloads canonical entities/relations, and reloads action grants before returning records. This prevents an eventually visible older canonical foundation row from hiding a newer strongly read sidecar revision. Existing public request and response envelopes remain unchanged.
- Position writes new `AB2` anchor postings with the shard in the partition key. Search unions v2 shards with legacy v1 postings, reloads canonical subdomains, derives visibility from server state, authorizes candidates, and only then applies `topK` ranking.
- Caller-supplied owner and policy fields cannot choose a Position/Search identity or grant.

## Alternatives

- **Keep the Context table as canonical.** Rejected because it duplicates the established entity substrate and composition/lifecycle features.
- **Change compact counters in place.** Rejected because existing numeric IDs and older modules still require compatibility.
- **Use one unsharded exact-index partition.** Rejected because popular audiences, Words, names, and anchor cells can become hot keys.
- **Cut directly to canonical-only reads.** Rejected because existing sidecar records have not been backfilled.
- **Trust retrieval-posting policy fields.** Rejected because projections are stale-able and caller-influenced historical rows may exist.

## Consequences

Canonical facts are available through established entities and links without changing the browser contract. Popular lookup domains distribute load, at the cost of bounded scatter/gather across configured shards. Publication is idempotent but currently uses ordered batches rather than a single cross-table transaction; a failed canonical write returns a retryable error before the sidecar write. Backfill and canonical-only cutover remain phase 13. Production hot-key, latency, and cost proof remains phase 14.

## Security and trust

Audience projections nominate records only. Hydration requires current `perm_grants`; Search requires a current canonical address plus visibility/grants. Protected graph markers and plaintext protected assets remain excluded from ordinary Context publication, Words, projections, and retrieval postings. This decision does not change the browser-main, `fileWorker`, or Compute/JPL trust boundaries.

## Migration and compatibility

Deploy the retained projection table and permissions before enabling its environment variable. New writes then dual-write canonical first and sidecar second. Reads dual-read and deduplicate by record identity and version, with canonical winning an equal-version tie. Old Context cursors continue on the sidecar path. Existing v1 anchor postings remain readable while new Position writes use v2. Phase 13 will backfill, compare parity, cut over, and retire the sidecar only after rollback gates pass.

## Verification

Tests prove deterministic replay IDs, distributed shard coverage, counter-free Context compilation, canonical record families, grant-checked hydration, exact profile and Word candidate indexes, unchanged route envelopes, canonical-only route hydration, v2 anchor partition distribution, retained legacy anchor keys, template validity, and the complete Compute regression suite. Phase 14 still owns deployed load, cost, stale-index cleanup, exact reranking, and cross-user browser acceptance.
