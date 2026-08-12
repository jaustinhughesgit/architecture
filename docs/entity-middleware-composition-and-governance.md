# Entity Middleware, Composition, and Governance

## Frozen boundary

Phases 7–9 freeze three related v1 boundaries without merging the three execution planes:

1. [Entity middleware](../contracts/entity-middleware.v1.schema.json) resolves one owning root-to-target lineage, authorizes every node, invokes sequentially, and accepts only `pass`, `respond`, or `fail`. The first `respond` or `fail` terminates the chain. Cancellation stops before the next node. Retry is not implicit; a caller must use a declared idempotency and retry policy.
2. Composition keeps `map`, `extend`, `link`, `use`, and `substitute` mechanically distinct typed relations. Wording and business-domain examples do not define these primitives.
3. [Governance](../contracts/canonical-governance.v1.schema.json) uses one action vocabulary, lifecycle machine, optimistic version check, and append-only audit decision.

The contracts establish the reusable primitive and compatibility seam. Phase 10 will align browser-main, `fileWorker`, and Compute/JPL invocation/effect envelopes; it does not move dynamic scripts onto the main thread or give Compute plaintext access to local zero-knowledge assets.

## Composition semantics

| Primitive | Mechanical meaning | Owns target lifecycle? | Middleware ancestry? |
| --- | --- | --- | --- |
| `map` | Routes a selected source member to a replacement member within a declared scope | No | No |
| `extend` | Adds a derived child while retaining the parent contract | Yes | Yes |
| `link` | Creates a non-owning reference between independently managed entities | No | No |
| `use` | Incorporates an entity's exposed behavior or members without transferring identity | No | No |
| `substitute` | Replaces a selected binding within the caller's declared scope | No | No |

Only owning `extend`/lineage edges determine middleware ancestry. Multiple owning parents are ambiguous and fail closed; `link`, `use`, `map`, and `substitute` may form a graph without silently changing ownership. Cycles and depth overflow fail before execution.

Legacy fields remain readable during migration: entity `t`, `l`, `u`, `z`, and `m` normalize to the typed relations above. The active `map`, `extend`, `link`, `useGroup`, and `substituteGroup` mutation routes now authorize their endpoints and emit canonical relation/version/audit fields while retaining their old response envelopes and legacy writes. A canonical conformance write must complete before a successful route acknowledgement.

## Middleware invocation

The caller supplies structured input and a target; a trusted resolver supplies the canonical entity versions in owning lineage order. A caller-supplied list is not authority. At each node the runtime:

1. checks cancellation;
2. reloads current resource state and the `use` grant;
3. invokes the node in its declared execution plane;
4. validates the node decision and effects; and
5. continues only for `pass`.

Materialized output is a possible `respond` result, not an authorization shortcut. Its input/dependency/version/permission scope and freshness must match the invocation. Active `runEntity` now checks canonical `use` governance for its target, while the current foundation freezes and unit-tests the lineage runner. It does not silently use previously unused parents.

## Governance and lifecycle

Canonical actions are `find`, `read`, `aggregate`, `use`, `set`, `edit`, `delete`, `delegate`, `publish`, and `govern`. `Use` is the response boundary: invoking a compute entity and returning a resolved data value are both uses. `Read` and `aggregate` may still describe internal data access, but they do not independently authorize releasing the result. Legacy `execute` input and stored grants normalize to `use` at the governance adapter. Owner authority, current action grants, public read-only visibility, and exact compatibility evidence are evaluated through one decision function. Caller-supplied ownership or visibility is never evidence.

Legacy permission characters translate conservatively while records are migrated. Legacy `verifyThis` can authorize only the exact resource/action for which it produced compatibility evidence; it is not a general grant and cannot be replayed for another endpoint.

Lifecycle states remain `draft`, `active`, `deprecated`, `revoked`, and `deleted`. Mutations declare `expectedVersion`. A valid transition writes the next state, immutable version evidence, and an audit event in one DynamoDB transaction. Deleted records are tombstones; revoked/deleted resources cannot be read or used through an old grant. The retained encrypted canonical audit table is month- and shard-partitioned to avoid one global or per-resource lifetime hot key. Audit metadata is allow-listed and must not contain user payloads, protected plaintext, tokens, prompts, or response bodies.

Protected assets keep their stronger broker, consent, wrapping, revocation, and audit controls. Canonical governance authorizes the reference/action; it does not decrypt or copy the asset and does not replace cryptographic access checks.

## Remaining migration work

- Backfill typed composition rows for old entity fields and reconcile duplicates before phase-13 cutover.
- Move non-composition mutation routes from legacy access checks to the canonical decision adapter.
- Adopt the middleware transport at browser, worker, and Compute boundaries in phase 10.
- Define cache dependency/freshness policy before materialized output participates as middleware.
- Prove concurrency, audit throughput/cost, cancellation, and cross-layer behavior in phase 14.
