# 0048: Compute installations bind entity use by exact ID

## Status

Accepted — implemented foundation for ordinary, non-protected ContextDB relations.

## Context

A reusable Compute entity can describe the right behavior while naming its data dependency differently from a caller's existing ContextDB entity. Treating names such as `current_status`, `clean_status`, `state`, or `condition` as global aliases would let unrelated applications accidentally read or modify one another's data. Copying the creator's Path would be equally wrong because a Path contains caller-local wording, graph identity, and installation state.

The platform already separates semantic candidate discovery from exact entity authorization and keeps ContextDB execution in the browser. It needs the same separation when a second user installs a shared Compute definition.

## Decision

Every manifest operation with an ordinary ContextDB effect receives an app-owned logical dependency ID scoped by exact Compute entity ID, version, operation ID, and effect index. The ID is contract identity; its human-readable name and description are semantic evidence only.

When an utterance has no local Path, capability Position/Search selects candidates by words and the registry reloads the authorized exact manifest. For creation of the caller's new Path only, the browser may send:

- the current utterance and up to 20 recent ordinary, non-protected inputs;
- at most 200 word-selected related ordinary ContextDB entities; and
- only the bounded relations whose endpoints are in that candidate set.

The model may propose `using` composition only with IDs present in those two exact sets: a dependency ID from the selected manifest operation and target entity, subject, and relation IDs from the supplied graph. Deterministic validation requires one target per dependency, the selected relation's property and subject IDs to equal the proposal, its object to hold the declared current or resulting value, and its subject to equal the browser-resolved invocation entity when one is available. The model cannot create, rewrite, or authorize an ID.

The resulting user-owned Path pins the Compute entity ID, version, operation ID, logical dependency ID, target property entity ID, target subject entity ID, and target relation ID. Runtime reads and writes through those exact IDs and fails closed when the binding is stale, unrelated, ambiguous, or holds an undeclared value. It does not fall back to a same-name relation after an exact binding exists.

The creator's Path is never copied. Each caller compiles, quality-gates, acknowledges, persists, and syncs a separate local Path from the shared manifest and their own wording. Context publication acknowledgements remap both entity and relation IDs through the graph, ContextDB state, worker translation state, and installed Path bindings before server synchronization, so temporary local IDs do not become permanent installation identity.

This foundation excludes Protected Assets. Protected references, encrypted labels, protected transcript entries, and protected graph nodes are not included in reconciliation evidence and continue through their existing purpose-bound authorization contracts.

## Consequences

- Spoken-dialog relevance remains lexical and bounded; Compute execution becomes exact-ID based.
- Similar dependency names in a register application and carwash application cannot cross-bind because their source dependency IDs and invocation subjects differ.
- Shared Compute definitions remain owner-independent while installations remain user/workspace-local.
- Existing manifests and Paths without entity-use bindings retain the prior bounded effect resolver for compatibility.
- Allocating a brand-new caller data relation when no compatible target exists, broader read-only dependency kinds, multi-relation transactions, and protected dependency reconciliation require later contract versions; they must not be simulated with global aliases.

## Verification

- Manifest tests prove stable dependency IDs include Compute entity/version/operation scope.
- Discovery tests reject invented, cross-operation, wrong-value, and out-of-evidence targets.
- Browser runtime tests place two similarly valued relations in one graph and prove only the exactly bound relation is rewired.
- Context publication tests prove canonical entity and relation acknowledgements remap local IDs.
- The headless two-user carwash scenario is reset-gated before and after; when run against a configured isolated stack it builds with User 1, discovers by Position for User 2, requires a new scoped binding, invokes the shared entity, and verifies User 2's local status changed.
