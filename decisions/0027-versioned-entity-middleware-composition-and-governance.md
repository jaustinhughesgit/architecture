# 0027: Versioned Entity Middleware, Composition, and Governance

- Status: Accepted; execution order superseded by decision 0063
- Date: 2026-08-11

## Context

1var already had parent/child trees, first-response concepts, five composition operations, legacy access characters, canonical action grants, entity versions, protected-asset lifecycle, and route-specific mutation behavior. Those pieces did not share one executable contract. Treating fields such as `t`, `u`, `z`, or link rows as implicit middleware would make ordering, ownership, authorization, revocation, and error handling depend on the calling module.

## Decision

- Freeze entity middleware v1 as sequential owning-lineage execution with per-node authorization and `pass`/`respond`/`fail` decisions. First response or failure terminates the chain. Decision 0063 subsequently corrects the order to selected target first, then nearest owning ancestors through the root.
- Only owning `extend`/lineage relations create middleware ancestry. `map`, `link`, `use`, and `substitute` remain non-owning composition edges with distinct mechanical semantics.
- Normalize legacy fields through a compatibility adapter and require active composition mutation routes to authorize endpoints and publish canonical conformance relations.
- Use the canonical action vocabulary for grants and a shared lifecycle transition machine with optimistic versions. Decision 0029 subsequently canonicalizes entity invocation under `use` and retains `execute` only as a compatibility alias.
- Load the canonical target address and entity with consistent reads at the invocation authorization boundary, so successful creation acknowledgement and immediate use form one observable lifecycle contract.
- Commit canonical lifecycle state, immutable version evidence, and allow-listed audit evidence atomically. Store audit evidence in a retained encrypted, bucketed/sharded table.
- Keep Protected Asset cryptographic and consent controls intact. Governance of a protected reference is not authority to decrypt it.
- Do not silently make the existing `runEntity` endpoint execute additional ancestors. Cross-plane transport adoption belongs to phase 10.

## Alternatives

- **Infer middleware from every relationship.** Rejected because non-owning links and reuse would silently gain lifecycle and execution authority.
- **Keep route-specific permissions.** Rejected because revocation, expiry, public visibility, and delegation would continue to disagree.
- **Make visibility equivalent to use.** Rejected; public permits candidate discovery and internal reads, not release of a resolved value or invocation.
- **Replace protected-asset governance.** Rejected because an ordinary entity grant cannot replace key wrapping, consent, or execution-boundary checks.

## Consequences

The platform gains testable composition and middleware primitives without hard-coding domains. Old records and envelopes remain usable through scoped compatibility evidence. New route mutations produce dual representations until backfill/cutover. Audit and atomic lifecycle writes add cost, while month/shard partitioning avoids a single permanent hot key.

## Affected repositories

- `architecture`: versioned schemas, migration status, semantics, and decision.
- `compute`: middleware/composition/governance libraries, persistence/audit infrastructure, conformance adapters, and tests.
- `aws`, `aws-api`, `testing`: no phase-7–9 transport change; phase 10 and later adoption remains tracked.

## Security impact

Every middleware node requires current authorization. Revoked/deleted state wins over grants. Compatibility evidence is exact-resource/action scoped. Audit metadata excludes arbitrary payloads and protected values. The browser-main, `fileWorker`, Compute/JPL, and zero-trust boundaries remain unchanged.

## Verification

Unit tests cover all five primitives, legacy normalization, deterministic lineage, ambiguity/cycle rejection, first-response termination, per-node denial, canonical/legacy grants, expiry, public limits, version conflicts, lifecycle transitions, audit sanitization, atomic persistence, and conformance of every active composition route. SAM validation and the complete Compute/architecture suites remain release gates.
