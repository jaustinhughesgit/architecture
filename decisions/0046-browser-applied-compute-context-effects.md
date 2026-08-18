# 0046: Browser-applied Compute effects mutate ordinary ContextDB

- **Status:** Accepted
- **Date:** 2026-08-18
- **Affected repositories:** `architecture`, `aws`, `compute`, `testing`

## Context

A reusable Compute entity may perform behavior whose successful result changes ordinary user context. For example, an invocation can identify an owned object by one of its connected values, compute a new scalar state, respond with that state, and make later local questions observe it. JPL can read or update governed server entities, but browser-local ContextDB is a separate trust and identity boundary. Sending the whole local graph to Compute or letting JPL address browser graph identifiers would violate local-first ownership and make a reusable capability depend on one user's graph shape.

## Decision

A capability operation may declare a bounded `contextEffects` contract. The first supported primitive is `contextdb.replace_object`, containing a required utterance-bound entity-reference input, the declared current scalar value, and the declared scalar output that supplies the replacement value.

Compute validates the effect as part of the capability manifest, rejects read-only or cached execution for mutating operations, and returns only the operation's typed output. The browser resolves the spoken reference against its current graph, including one incoming ownership/property hop from a mentioned value to its owning subject. It applies the effect only when exactly one relation from that subject points to the declared current value. It then creates or reuses the output value entity and rewires that relation locally. A missing or ambiguous target fails closed. If exactly one matching relation already has the output value, the effect is an idempotent success with no mutation operations.

The browser emits the mutation through the existing graph-operation and persistence path. Effect metadata is evidence, not a second Essence fact, so it must not be ingested again after the rewire. Ordinary publication remains asynchronous and governed by its existing audience and authorization contract.

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
- Headless acceptance resets the disposable environment, records ordinary ContextDB facts, creates the capability through Convert, invokes it, and proves subsequent questions observe the replacement value.
