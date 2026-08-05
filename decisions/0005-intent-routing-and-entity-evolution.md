# 0005: Route to the Smallest Sufficient Artifact and Fork Contract Additions

- Status: Accepted
- Date: 2026-08-05

## Context

Natural language does not state which platform artifact should solve a request. “I just purchased one more boat” could be misrouted into a local fact mutation, an incrementing program, or a newly generated application. Separately, capability discovery can find an exact entity, a related entity, or no entity, but “related” does not say whether the entity is broken, should grow, or should be forked.

Creating executable entities for ordinary data changes adds latency, authority, and unnecessary artifacts. Mutating a shared entity whenever a related feature is requested can invalidate Paths and other consumers. Creating a private copy for every user prevents shared improvement and causes implementation drift.

## Decision

Route every request to the smallest existing authorized artifact that can satisfy the intent without changing its declared contract.

- Facts, events, quantities, relationships, and corrections are typed ContextDB/entity mutations, not application-generation requests.
- Stored-data questions are graph queries or deterministic derived operations.
- Exact capability contracts are reused across users with separate installations, bindings, data, configuration, permissions, and protected assets.
- Compound requests compose existing contracts; semantic modularity does not require a separate remote invocation for every component.
- A defect is repaired only when the declared contract remains unchanged. Published repairs create an immutable compatible implementation release in the same capability lineage.
- A true added feature forks or extends into a child capability with explicit lineage. The source remains stable unless its owner later promotes a tested successor.
- A new root capability is built only when no existing contract owns genuine reusable behavior.

Paths recognize and bind intent to these operations. A Path match does not itself justify executable entity creation.

## Alternatives

- **Keep all entities small and always stack them.** Rejected as the complete rule because semantic composition must not dictate inefficient execution granularity. Small contracts can be compiled, batched, or fused where boundaries permit.
- **Continuously rework the nearest entity.** Rejected because related behavior is not necessarily promised behavior; silent contract growth breaks Paths, consumers, permissions, and trust assumptions.
- **Create a separate capability copy for every user.** Rejected because user-specific data and configuration can be isolated through bindings and installations while the validated definition is reused.
- **Let the model choose freely between mutation and application generation.** Rejected because artifact type changes authority, latency, lifecycle, and safety and therefore requires deterministic policy validation.
- **Repair defects in place and fork added features.** Accepted with the refinement that shared repairs are immutable compatible versions in one lineage rather than unversioned overwrites.

## Consequences

- The architecture needs typed request-effect classes and stable routing reason codes.
- Capability contracts become the boundary for reuse, repair, and fork decisions.
- Capability identity, implementation version, user installation, operational data, and fork lineage must be distinct.
- Paths should target compatible capability contracts rather than mutable entity blobs.
- “One more” and similar delta statements require idempotent event/mutation semantics, not generated increment applications.
- Composition needs an execution planner that can optimize pure compatible work without crossing authorization or side-effect boundaries.
- Owners can review and promote forks, but consumers are not silently migrated to expanded behavior.

## Affected repositories

`aws`, `aws-api`, `compute`, and `architecture`.

## Security impact

Choosing the smallest effect class limits authority. Data mutation, capability execution, external effects, and capability definition use distinct authorization and audit paths. Shared capability reuse never implies access to another user's data, configuration, or protected assets. Optimizers may not combine work across policy, trust, transaction, or externally visible effect boundaries.

## Migration and compatibility

Existing local mutation Paths remain local. Existing capability and entity IDs require an explicit compatibility layer until immutable contract and implementation versions exist. Current `extend` outcomes should not mutate an entity automatically; they should pause for deterministic contract comparison and then route to repair or fork. Existing editable private drafts can retain in-place editing before publication.

## Verification

Test intent-equivalent vocabulary across fact, query, correction, recurring rule, UI, and external-effect scenarios. Test exact reuse across users, isolated bindings and credentials, contract-preserving repair, contract-changing fork, source stability, Path compatibility, replay/idempotency, permission denial, composition ordering, promotion, rollback, and dependency pinning.
