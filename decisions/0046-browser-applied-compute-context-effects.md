# 0046: Browser-applied Compute effects mutate ordinary ContextDB

- **Status:** Accepted
- **Date:** 2026-08-18
- **Affected repositories:** `architecture`, `aws`, `compute`, `testing`

## Context

A reusable Compute entity may perform behavior whose successful result changes ordinary user context. For example, an invocation can identify an owned object by one of its connected values, compute a new scalar state, respond with that state, and make later local questions observe it. JPL can read or update governed server entities, but browser-local ContextDB is a separate trust and identity boundary. Sending the whole local graph to Compute or letting JPL address browser graph identifiers would violate local-first ownership and make a reusable capability depend on one user's graph shape.

## Decision

A capability operation may declare a bounded `contextEffects` contract. The first supported primitive is `contextdb.replace_object`, containing a required utterance-bound entity-reference input plus the fixed current and new scalar graph values. Those fixed values belong to the effect and are not ordinary invocation inputs. Compute removes a generated duplicate state input when its only example value is an unspoken fixed transition value, including when generation incorrectly labels that input as default-bound; EntityPlan reconciliation applies the same rule before JPL compilation. An explicitly spoken transition value remains an ordinary input. Response outputs remain a separate contract so presentation text can never become stored state. An explicit Convert requirement to change a value from one named state to another cannot disappear during model generation: Compute repairs the transition into this effect when the selected operation has exactly one eligible utterance entity reference, and otherwise rejects the build as an unsatisfied effect requirement. It must not approve a mutating requirement as an effect-free, read-only capability.

Compute validates the effect as part of the capability manifest, rejects read-only or cached execution for mutating operations, and returns only the operation's typed response output. After success, the browser resolves the spoken reference against its current graph. It first tests the directly resolved entity; only when that tier has neither the declared current nor new value may it inspect subjects reached through one incoming ownership/property hop from a mentioned value. This prevents observation-record metadata that also points at the entity from competing with the entity's own state relation. It applies the effect only when exactly one relation in the selected tier points to the declared current value. It then creates or reuses the declared new-value entity and rewires that relation locally. A missing or ambiguous target fails closed. If exactly one matching relation already has the new value, the effect is an idempotent success with no mutation operations.

The browser emits the mutation through the existing graph-operation and persistence path. Before presenting success, it applies the requested operation and verifies that every declared target relation now points to the declared result value. A failed postcondition restores the pre-invocation local graph and returns a typed failure with no mutation receipt or success answer. A successful result includes a bounded receipt derived from the locally verified relation changes. Effect metadata is evidence, not a second Essence fact, so it must not be ingested again after the rewire. Ordinary publication remains asynchronous and governed by its existing audience and authorization contract; publication compares relation contents as well as IDs so a same-ID object rewire is synchronized.

Convert discovery receives only bounded ordinary authoring history and proven Essence rows. It may use that evidence to declare the reusable effect contract, but neither the full graph snapshot nor protected values enter discovery, the manifest, JPL, or server execution.

## Alternatives considered

- Give JPL the complete ContextDB graph and mutation methods. Rejected because it crosses the local-first boundary, exposes unrelated context, and couples reusable entities to browser-local IDs.
- Encode the transition in a domain-specific carwash module. Rejected because relation-object replacement is the reusable primitive; the carwash is an acceptance case.
- Return text and let a second model turn it into a fact. Rejected because it duplicates interpretation after execution and provides no atomic, typed, fail-closed mutation contract.

## Consequences

- A successful mutating Compute operation can immediately affect later local Paths and Essence queries.
- Manifest fingerprints include the effect, so adding or changing an effect is a contract evolution rather than an implementation-only repair.
- The initial primitive deliberately supports one unambiguous scalar relation replacement. Multi-relation transactions, explicit property selectors, rollback across external effects, and conflict resolution require later versioned contracts.
- JPL remains responsible for computing and returning the declared value; browser-main remains responsible for ContextDB authority and persistence.

## Security impact

Compute never receives blanket read/write access to ContextDB. The browser validates the declared old state and unique target against its authorized local snapshot before applying a bounded mutation. Protected Asset plaintext and graph snapshots remain excluded.

## Migration

Existing manifests normalize to an empty `contextEffects` array and remain read-only where previously declared. No stored graph migration is required. New mutating manifests require browser runtimes that understand and validate the effect contract.

## Verification

- Manifest tests reject unsupported, read-only, cached, unbound, or non-scalar effects.
- Browser-runtime tests resolve an object through connected make/model values, rewire exactly one relation, answer with the typed output, and treat a repeated invocation as already applied.
- Discovery tests prove an explicit unambiguous state-transition requirement receives an effect even when the model omitted it, while an ambiguous mutation fails closed and an ordinary read-only conversion remains effect-free.
- Publication tests prove a same-ID relation rewire is emitted, and runtime tests require the postcondition before returning success.
- Headless acceptance resets the disposable environment, records ordinary ContextDB facts, creates the capability through Convert, invokes it, and proves subsequent questions observe the replacement value.
