# 0080: Focus exact entities and evolve ArrayLogic immutably

**Status:** Accepted; implemented candidate in `onevar-platform` pending deployed proof.

## Context

The clean runtime could execute and checkpoint strict ArrayLogic workflows, but a user could author one only by pasting raw JSON. Convert always created a separate single capability, so “speaking onto” an existing app or workflow had no exact lifecycle target. The first four-mode synchronization release also emitted fixed publisher analytics for every Compute invocation. That made analytics a platform side effect even when no user had authored an analytics entity, which contradicted 1var's entity model and made a product-specific interpretation part of transport.

## Decision

The browser Compute worker owns one optional authoring focus. Focus is an exact local installation identity, never a label:

- a capability focus pins installation, capability entity, capability/version, and operation IDs; or
- an ArrayLogic focus pins workflow installation, workflow ID, and workflow version.

Names may nominate a unique local target, but the stored focus contains exact IDs. `clear focus` removes only this authoring pointer. It does not revoke, delete, or mutate an entity.

Focused ArrayLogic evolution has two explicit operations:

- `add step <capability>` appends one exact installed capability/version/operation and creates the next immutable workflow release. Trusted code connects only exact name-and-type-compatible outputs and inputs; unmatched inputs become declared workflow inputs.
- `fix step <stepId> with <capability>` substitutes one exact step in the next immutable workflow release only when a deterministic normalized operation-contract comparison proves equivalent inputs, outputs, dependencies, effects, protected requirements, execution plane, provider policy, response contract, and read/write class. A contract-changing replacement is rejected as an addition/fork, not mislabeled as a repair.

Focusing a single Compute capability and adding a step creates workflow version 1 with the focused operation first. Focusing an existing workflow advances that workflow ID from version N to N+1. Older releases and completed runs remain immutable; name-based execution selects the latest active release for one workflow ID. ArrayLogic composition remains sequential and distinct from first-response Entity Middleware.

The fixed publisher-analytics event, repository rows, cursor state, and `analytics` command are removed. Four-mode sync remains the governed delivery transport for schedule occurrences and future authorized entity-authored records. Execution, credit, settlement, provider, and audit receipts required for platform correctness remain internal evidence; they are not automatically projected as a user analytics entity.

## Consequences

- A user can speak or type commands while one exact capability or ArrayLogic workflow is in authoring focus.
- “Fix” and “add” are different validated transactions rather than an LLM guess.
- Workflow edits create immutable versions and cannot silently rewrite a shared source app.
- Raw ArrayLogic JSON remains an inspection/advanced path, not the only authoring surface.
- App analytics must be built as governed data and Compute entities, then explicitly added to a workflow. A general record/aggregate effect contract is still needed before Convert can build the complete cross-user carwash analytics example.
- Sync mode cost controls remain useful for schedules and future entity-authored delivery, without hard-coded analytics writes on every invocation.
