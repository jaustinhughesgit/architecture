# 0053: Synthesize caller-local Paths and stitch capability dependencies through installation-owned entity use

**Status:** Accepted for the clean platform roadmap

## Context

Essence and ContextDB identities are browser-local. Two users may express the same useful fact through different locally proven operations, predicates, entity names, and relation identities. Copying a capability creator's Path into another user's active library would therefore import wording, catalog assumptions, graph identity, and installation state that the receiving browser did not prove.

Invoking an LLM to author every caller Path and reproduce opaque dependency IDs would be slow, costly, and less exact than compilation when a capability already declares its operation, typed inputs, effects, and invocation examples. The platform also needs to separate three stitches that were previously easy to conflate:

1. user wording to a capability operation;
2. a capability dependency to a caller's local entity or relation; and
3. one Compute operation's output to a later operation's input.

The POC exact-ID foundation in [decision 0048](0048-compute-installations-bind-entity-use-by-exact-id.md) proved safe bounded reconciliation, but its active representation pins the binding inside the caller Path. The clean platform needs installation continuity independent of any one locally learned phrase.

## Decision

Capability definitions publish versioned Invocation Frames with structural phrases, typed slots, operation IDs, stable dependency IDs, and effect contracts. A receiving browser deterministically compiles a compatible frame and its current utterance into a caller-owned Local Path, runs the ordinary local quality/proof gates, installs it atomically, and replays the input. The creator's executable Path is never copied.

An installation owns versioned Entity Use Bindings separately from its Paths. A binding scopes one capability entity/version/operation/dependency and parameter entity to one exact local target entity or relation, target version, permitted access, provenance, and lifecycle. Runtime dereferences that binding for reads and declared writes and never falls back to a same-name target.

The browser reconciles a missing binding in this order:

1. reuse an exact current installation binding;
2. accept one unique typed and structurally compatible local target;
3. execute the catalog-owned Binding Essence form `For <capability>, use <local reference> as <dependency>` or a reviewed structural equivalent;
4. present bounded exact candidates for explicit user selection; or
5. request one bounded LLM proposal selecting only supplied capability dependency IDs and local target IDs, then repeat deterministic validation.

If no compatible local target exists, the locally created parameter shell becomes the authoritative entity for that installation. No global alias is invented.

The standard Binding Essence sentence is human evidence and a convenient local command. Its materialized Entity Use Binding is execution authority. Rebuilding or replacing a local Path does not alter the binding; rebinding an installation does not require rebuilding every invocation Path.

Foreign Path template packages contain immutable Invocation Frames, semantic-operation references, examples, tests, migration metadata, and provenance. They are inputs to local compilation, not active foreign Paths. Platform-owned foundation packages may be installed as executable artifacts only when the platform owns the exact catalog operations and the browser still validates their version and integrity.

ArrayLogic connects Compute operations sequentially through exact typed result references. It does not use linguistic reconciliation for operation-to-operation wiring. Entity Middleware remains a separate ordered handler mechanism in which only `extend` forms ancestry and the first `respond` or `fail` ends the chain.

## Consequences

- Local semantic autonomy no longer breaks global capability continuity.
- One installation may have several local invocation Paths and one stable set of dependency bindings.
- The same capability works with `clean_status`, `condition`, or another local structure without declaring those names globally equivalent.
- Two capabilities that both display `current_status` remain isolated by exact capability, operation, dependency, installation, and target IDs.
- Most first-use installation can avoid an LLM through Invocation Frames, typed graph matching, or the generic binding sentence.
- Novel wording and genuinely ambiguous semantic equivalence retain a bounded LLM fallback, but model output never creates, rewrites, or authorizes an ID.
- Path template distribution becomes safe learning reuse rather than foreign local-state injection.
- Installation synchronization can preserve canonical dependency/target continuity across a user's devices while each browser retains its own proven Path library and local ID mappings.

## Alternatives

- **Copy the creator's Path.** Rejected because it imports unproven local semantics and identity.
- **Make every browser use one global Essence ontology.** Rejected because local facts and operations can remain compatible through explicit typed bindings without erasing local meaning.
- **Ask an LLM to generate every Path and binding.** Rejected because declared frames and exact graph contracts permit deterministic compilation and because opaque IDs are not semantic reasoning tasks.
- **Store bindings only inside Paths.** Rejected because phrase lifecycle and installation data continuity are independent.
- **Treat equal dependency names as global aliases.** Rejected because unrelated applications would cross-read or cross-write data.

## Affected repositories

- `architecture`: this decision, the clean roadmap, capability status, and cross-layer model.
- `onevar-platform`: Phase 3 Invocation Frame contracts, Entity Binding Compiler, package manager, fixed Compute proof, broader Compute generation, API execution boundary, and acceptance. Phase 2 supplies the local Path, ContextDB, identity, publication, and hydration foundation it depends on.
- `onevar-operations`: later immutable package and environment promotion controls; no immediate Phase 2 domain change.
- POC repositories remain behavioral evidence and are not modified by this clean-platform decision.

## Security impact

Binding discovery uses ordinary non-protected evidence only. Exact current authorization and target versions are checked before every governed read or write. Protected references require a later contract version and their plaintext never enters Invocation Frames, Path templates, Entity Use Bindings, diagnostics, or LLM evidence. Package provenance does not grant installation or use authority.

## Migration

The clean platform implements the separate installation record from its first Compute vertical slice. POC Paths that pin exact bindings remain valid evidence for decision 0048 but are not imported. A future POC migration tool may extract a candidate installation binding, which the clean browser must reload, authorize, map, and prove before activation.

## Verification

- Compile a local Path from a published Invocation Frame without a model.
- Prove a second browser creates a different local Path and never copies the creator's Path.
- Bind a differently named local relation through the generic Binding Essence sentence without a model.
- Rebuild the Path while retaining the same installation binding; rebind the dependency while retaining several Paths.
- Place two displayed `current_status` dependencies in different capabilities and prove they cannot cross-bind.
- Reject invented IDs, stale versions, ambiguous targets, incompatible values, missing access, undeclared effects, and same-name fallback.
- Connect sequential ArrayLogic steps through typed references without creating Entity Use Bindings between operation outputs.
- Prove middleware first-response termination remains independent of workflow sequencing.
