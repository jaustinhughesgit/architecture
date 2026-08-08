# Engineering Principles

## Prefer platform repairs to one-off fixes

When a scenario fails, first identify the reusable mechanism responsible:

1. Input tokenization or referent resolution
2. Essence generation or graph query/mutation
3. Path signature, family, slot, alias, or transform behavior
4. ContextDB schema, persistence, or retrieval
5. Entity lineage or relationship composition
6. Ordinary input binding into the entity
7. JPL generation, validation, or execution
8. Provider protocol or response mapping
9. Protected-asset consent, resolution, or execution
10. Cross-layer transport, background job, or UI behavior

Repair the narrowest reusable layer that fully owns the problem. A provider-specific endpoint belongs in a provider entity or protocol template; a general city/state normalization rule belongs in typed input handling; a missing modifier slot belongs in Path/Essence behavior.

An entity is not synonymous with compute. Before building a function, determine whether the requested result is a stored hard asset, graph traversal, interaction asset, composed entity, or genuine computation. Permitted local facts should publish through the general entity synchronization contract so they can be shared and governed without turning retrieval into compute.

Choose the smallest existing authorized artifact that can satisfy the intent without changing its contract. A Path-routed graph mutation is preferable to generating an increment application; an exact capability is preferable to a clone; a composition is preferable to expanding unrelated contracts; a contract-preserving defect is repaired; and a true feature addition is forked. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md).

## Do not confuse generality with vagueness

A scalable system still needs precise contracts. “Let the LLM fix it” is not a contract. Inputs, outputs, schemas, execution permissions, lineage order, retries, diagnostics, and tests must be explicit enough to validate without trusting prose.

Models can propose and repair artifacts, but deterministic code must validate syntax, schema, safety, semantic alignment, and isolated runtime behavior before activation.

## Preserve the user's semantics

- Never drop explicit values such as location, time, quantity, ownership, or unit.
- Never merge distinct referents because they share a property.
- Ask only for values that are genuinely absent after checking current utterance, clarification state, authorized ContextDB facts, defaults, and entity bindings.
- Do not treat ambiguity as permission to invent a value.

## Local-first execution

The desired hot path is:

```text
utterance → local signature → deterministic Essence → local ContextDB → answer
```

Model calls are for discovery, learning, diagnosis, or sanctioned compute—not for repeating a known local interpretation. Learning should promote generalized, tested transforms so later compatible utterances are immediate.

Canonical executable Essence is always materialized by the browser-local runtime. On a cold miss, local tokens and syntax triplets, bounded recent results, and permitted ContextDB evidence may be sent to a model for semantic adjudication. The model returns a speech act, answer or intended graph writes, grounded ContextDB repairs, and Path plans. Those results are proposals: the browser must compile and prove every current and historical Path together before showing an answer or mutating ContextDB. Enabling **Auto-build Path signatures with OpenAI** additionally permits discovery of paraphrase Paths; it does not change this acceptance boundary.

## Cross-layer durability

Long model or entity operations must not depend on one synchronous Lambda lifetime. Background operations need a job record, idempotency key, durable queue or continuation mechanism, state transitions, sanitized progress, retry policy, and front-end polling or subscription. A timeout is an execution state, not a reason to lose the original request.

Local-to-server entity publication is background work too. It needs a durable local outbox, idempotent server operation, acknowledgement, retry, and conflict state while leaving the local ContextDB mutation immediately usable.

## Security by technical boundary

Describe guarantees accurately:

- Encryption at rest on a server is not zero-knowledge.
- A server that can decrypt a value is technically capable of using it.
- Consent and audit improve a trusted-server design but do not make it zero-trust.
- A zero-knowledge mode requires plaintext decryption and provider use to occur only on a user-controlled device.

## Observable failures

User-facing diagnostics should say what failed, where, and what can be done next without exposing secrets. Retain sanitized provider response bodies, status codes, validation traces, selected bindings, and contract versions when safe. Classify the likely repair target rather than returning “things happened.”

## Reusable test design

Every generalized fix should include:

- The original failing example
- A same-shape example with different values
- A semantically related wording variant
- A negative boundary example that must not match
- A refresh/reload test for persistent local behavior when applicable
- A cross-layer contract test when transport or durable jobs are involved

For cross-layer features, express the externally visible result as a failing scenario in `testing`, prove the reusable behavior at its lowest owning layer, then pass the headless API/Compute scenario before wiring the website. Finish with a thin browser test only for behavior that actually depends on the DOM, browser storage, workers, permissions, authenticators, or rendering. See [headless acceptance testing](headless-acceptance-testing.md).

Weather is useful because it exercises time, location, credentials, providers, Paths, entities, and failure diagnosis. Inventory, addresses, and family facts exercise different graph and referent boundaries. None should be hard-coded as privileged domains.

## Architecture review questions

Before implementing a new subsystem or exception, answer:

1. Which existing 1var primitives already represent this behavior?
2. Is the problem a missing capability or a defect in an existing one?
3. Which layer owns the invariant?
4. What other domains should benefit from the repair?
5. What data crosses each trust boundary?
6. Can the result run locally after learning?
7. How is it versioned, shared, authorized, tested, and diagnosed?
8. What documentation or contract must change?
9. Is this a fact/query, an invocation, a composition, a repair, or a contract-changing feature?
10. If an entity changes, which declared input, output, effect, guarantee, or trust requirement proves repair versus fork?
