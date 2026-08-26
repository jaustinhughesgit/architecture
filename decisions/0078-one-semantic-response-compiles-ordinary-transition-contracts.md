# 0078 — One semantic response compiles ordinary transition contracts

## Status

Accepted; implemented, deployed, and live-proven in development.

## Context

Decision 0056 established the answer-first boundary: Convert freezes meaning before executable construction. The released ordinary transition answer contains every execution-critical semantic field—selected subject input, property concept, allowed values, exact old/new values, response intent, and invocation phrases. A second response that restates these facts adds cost, latency, drift, and another schema/token failure surface without adding authority or meaning.

## Decision

For the supported ordinary `current_property_transition` shape, one structured model response freezes the semantic answer. Trusted generator code deterministically derives the capability contract that cites its fingerprint. It owns inputs, the exact dependency subject slot, read-write policy, idempotent effect, invocation frames, output projection, bounded response template, and timeout. The deterministic compiler then allocates opaque identities and emits JPL.

The dependency's friendly name is never lookup authority. Each installation still creates an exact versioned Entity Use Binding to a relation ID, and invocation dereferences only that identity. An entity-reference input is not projected into server response prose because its execution value is an internal address; bounded response text projects only the declared new value against the frozen human subject role. Reviewed provider operations continue to expand from one catalog selection. Owner-local protected calculations retain a second validated presentation-contract proposal until response presentation is fully expressed by their semantic answer schema. Previously persisted authoring states remain readable for bounded recovery.

The explicit hard stop `The exact invocation sentence is …` is authoritative authoring evidence. Its one placeholder names the selected-subject input even when the model renames it. Because this released shape applies a fixed old/new effect to one subject, any additional model-invented make/model/generalization parameters are unused and removed before fingerprinting. Multiple declared placeholders fail closed.

## Consequences

- Generalization remains a model responsibility; executable structure remains a trusted compiler responsibility.
- Ordinary transition authoring removes one paid response and one background lifecycle branch.
- Frozen semantics cannot drift in a repeated contract copy.
- Incomplete invocation phrases fail closed instead of acquiring guessed input bindings.

## Verification

- Prove deterministic contract equality for the frozen vehicle transition.
- Prove transient answer retry publishes without starting a contract response.
- From a private hard reset, run the exact live vehicle Convert canary, observe one provider response, download the content-addressed JPL package, invoke it, and independently verify `dirty -> clean`.

Release `648ccf8605c35c40c28cf9735ddb6bcd6f4e3437` satisfied this gate in development workflow [33008411751](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33008411751). The run passed repository verification, exact deployment, 20 reset-gated browser scenarios, the paid exact vehicle-wash canary with one `gpt-5.4-mini` response, package-backed JPL invocation, independent `dirty -> clean` Context proof, and a real governed schedule.

## Supersession

This narrows decision 0056 for ordinary transitions. Its answer-first, fingerprint, durability, evidence, and fail-closed requirements remain authoritative; its mandatory second response no longer applies to this bounded shape.
