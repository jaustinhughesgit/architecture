# 0011: Typed Semantic Plans Compile into Deterministic Paths

- Status: Accepted
- Date: 2026-08-08

## Context

Cold Path learning previously asked a language model to author both meaning and low-level executable Path JSON. Local validators could identify bad token coverage, missing bindings, invented rows, or an incomplete supporting statement, but correction meant asking the same probabilistic generator to rewrite the entire artifact. A valid operation choice could therefore fail repeatedly because matcher syntax or a coordinated historical repair was malformed.

This failure mode does not compound. Adding examples improves model probability but cannot guarantee that a new semantic operation produces a structurally valid Path. It also gives the model authority over fields that the installed semantic-operation catalog already owns.

## Decision

A model response that selects a versioned semantic operation is treated as a typed **Semantic Plan**, not an executable Path. The model owns only:

- the selected semantic operation;
- typed role bindings to the current utterance or declared local sources;
- the requested answer role and short rationale; and
- directly entailed semantic relationships.

The deterministic Path Synthesis Compiler owns:

- exact matcher construction and complete token coverage;
- the versioned executable rows, conditional rows, transaction, and answer template from the semantic-operation catalog;
- required/optional binding enforcement;
- dependency expansion for a query's declared `repairSupport`; and
- a complete candidate transaction for browser-local isolated proof.

Supporting repairs use catalog data, not application vocabulary. A `repairSupport.bindingDerivations` mapping declares how target roles come from a historical Path binding, the current query binding, or a literal contract value. The compiler may replace a model-authored supporting proposal with this deterministic derivation. Missing required derivations produce an exact compiler constraint; they do not trigger blind rewriting of executable JSON.

The compact server transport is part of that compiler contract. It retains binding-to-binding references, token spans, value modes, scales, literals, and bounded executed scalar values for recent Path evidence. Compaction may bound evidence size but may not sever the typed dependency graph the deterministic derivation consumes.

An operation may also declare a `bindingDependencies` invariant. For example, a kind role may be declared to use the same token as its object role. The compiler reapplies that invariant during candidate compilation and normal Path materialization, preventing a learned structural slot from varying while a dependent role remains frozen to the original example.

An operation may declare a `bindingPolicies` acquisition rule when a role must generalize from source evidence even if the model proposed an example literal. The initial `unique_matching_token` strategy converts that literal to the only source span that materializes the same typed value. No match or multiple matches is a compile failure; core code does not choose among them or infer which semantic roles should be generalized.

After isolated proof, browser-local family state is durable authority for the pending installation transaction. A server save response is merged with that state and may not erase the exact active alias just validated. A returned family-identity mismatch or missing expected alias stops installation rather than allowing the worker acknowledgement to fail after an apparently successful save.

The browser remains the execution authority. It recompiles the selected semantic operation from its installed catalog, materializes bindings, removes prior graph effects in an isolated graph when required, replays the supporting statement, runs the current query, and persists nothing unless the complete transaction passes.

The first implementation adapts the existing structured model response into Semantic Plan v1 before validation. A future API schema may expose Semantic Plan directly without changing the ownership boundary.

## Consequences

- A valid semantic choice no longer fails because the model invented rows or malformed the left matcher.
- One declarative graph-contract mapping can repair every compatible vocabulary instance; runtime code contains no lending, inventory, soccer, or other scenario dispatch.
- Catalog-declared binding dependencies keep coupled roles generalized together, including already-saved Paths compiled before the invariant was added.
- Catalog-declared binding policies promote only authorized, uniquely grounded example values into reusable matcher slots.
- Replication cannot discard a browser-proven active alias between validation and worker installation.
- Candidate generation is deterministic and byte-stable for the same plan, catalog, and token evidence.
- Model retries are reserved for semantic ambiguity or a true capability/catalog gap.
- The compiler does not make ontology implications automatically. The model or an installed semantic capability must still select relationships that are directly entailed by the input.

## Alternatives considered

- **Keep retrying complete model-authored Path JSON.** Rejected because validation is deterministic while regeneration remains probabilistic and repeatedly rewrites already-correct fields.
- **Add word-specific parsers for every successful scenario.** Rejected because it moves vocabulary and workflows into core code and cannot scale with new micro-data.
- **Accept model-generated Essence directly.** Rejected because it violates the browser-local canonical Essence boundary and permits unproven graph effects.

## Security impact

The change narrows model authority. Model output remains untrusted semantic evidence and cannot define executable rows. Protected plaintext is not introduced into the compiler contract. Browser-local proof and identity-scoped ContextDB remain mandatory before execution or persistence.

## Migration

Legacy non-semantic menu and sequence proposals retain their existing validation path. Semantic proposals using installed catalog operations are adapted automatically. Catalog operations that require a coordinated historical repair should add versioned `bindingDerivations`; operations without them continue to require an explicit supporting proposal until migrated.

## Verification

- Deliberately invented model rows are absent from compiler output.
- A relationship query deterministically derives and compiles its historical supporting Path.
- The same plan compiles identically on repeated runs and with unrelated vocabulary values.
- The complete AWS application test suite passes, including local semantic compilation and atomic repair tests.
- Runtime source contains no scenario-specific dispatch vocabulary.

## Affected repositories

- `architecture`
- `aws`
