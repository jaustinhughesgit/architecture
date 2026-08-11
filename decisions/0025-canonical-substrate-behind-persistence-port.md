# 0025: Canonical Entity Substrate Behind a Versioned Persistence Port

- Status: Accepted
- Date: 2026-08-11

## Context

1var already has a capable entity foundation in Words, entities, subdomains, groups, links, versions, access records, entity bundles, relationship modules, and three execution planes. Recent Context publication added valuable multi-device and cross-user mechanics but stored nodes, relations, profiles, audiences, mappings, and idempotency records in a parallel Context graph table. Position/Search also writes anchor-band and embedding records directly. Direct physical access across modules makes it easy to create another one-off store, bypass established entity composition, or confuse a retrieval candidate with an authorized fact.

The platform needs to scale without loading every user's graph and without persisting every possible sentence. That requires lexical and semantic candidate indexes, but it does not require a second source of identity or authority.

## Decision

1var adopts the versioned canonical entity-substrate contract in `contracts/canonical-substrate.v1.schema.json` and places physical persistence behind one Compute persistence port.

- Words are lexical addresses; entities and typed relations own facts and lifecycle.
- Subdomain/address, group, relation, version, grant, capability, installation, local mapping, and mutation records have explicit logical contracts.
- Context v1 remains an accepted transport contract. Its active sidecar is a compatibility adapter that must compile and migrate into canonical records while retaining idempotency, audiences, stable-ID acknowledgement, tombstones, pagination, and hydration.
- Position/Search/RAG postings are versioned, rebuildable projections over canonical entity IDs and versions. They retrieve candidates only. Canonical reload and action-specific authorization precede return, traversal, aggregation, or execution.
- New Compute code uses the persistence port instead of table names or legacy short fields. Existing code migrates incrementally through compatibility methods with observable status.
- Physical table repartitioning may evolve without changing the logical contract. A change to identity, required fields, lifecycle, authorization, or execution meaning requires a new contract version.

## Alternatives considered

- **Make the Context sidecar the new canonical graph.** Rejected because it would discard or duplicate the established entity substrate and its composition, access, version, bundle, and middleware behaviors.
- **Roll back Context publication entirely.** Rejected because its local-first outbox, stable-ID replacement, audience, profile, tombstone, and hydration mechanics are required capabilities.
- **Let each module keep direct DynamoDB access.** Rejected because cross-layer contracts and migrations cannot be enforced or measured consistently.
- **Make Position/RAG authoritative.** Rejected because embeddings and bands are approximate, stale-able, model-dependent projections and cannot prove fact identity or permission.
- **Freeze the current physical table layout.** Rejected because partitioning and allocation must change for scale while existing IDs remain compatible.

## Consequences

- Existing data and IDs remain valid while adapters isolate physical formats.
- Context publication can be dual-written and compared before cutover instead of rewritten in one risky step.
- Positioning remains useful for 100,000-user candidate discovery while exact Words/lemmas serve inexpensive lexical retrieval.
- New development has one named boundary for conditional versions, idempotency, pagination, and table migration.
- The initial port is an implementation foundation, not proof that all direct table access or the sidecar has been removed.
- Grant reconciliation, distributed identifiers, canonical Context compilation, canonical hydration, backfill, and scale tests remain explicit later phases.

## Security impact

The port does not grant authority. Authentication and action-specific authorization remain separate and must fail closed. Caller-supplied owner, recipient, workspace, policy, or position fields cannot establish access. Protected plaintext is excluded from canonical ordinary records, lexical indexes, and retrieval postings; only protected references and declared trust modes may cross the boundary.

## Migration and compatibility

Phase 1 freezes the logical schema. Phase 2 inventories each physical store and capability. Phase 3 introduces adapters and migrates shared canonical reads plus Context-sidecar access. Later phases replace hot identifiers/indexes, compile Context writes, migrate hydration/query, reconcile grants/lifecycle, backfill, dual-read, cut over, and retire the sidecar only after parity gates pass. No destructive migration is authorized by this decision.

## Verification

Validate schemas and examples; test table-name isolation, legacy envelope compatibility, canonical normalization, Context pagination/batching/idempotency, derived-index labeling, and adapter errors. Later gates add conditional-version conflicts, action denials, tombstone propagation, dual-read equality, stale-index cleanup, pagination, hot-partition load, cost bounds, and rollback.

## Affected repositories

- `architecture`
- `compute`
- later phases: `aws`, `aws-api`, and `testing`
