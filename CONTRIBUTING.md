# Contributing to the Architecture

The architecture is expected to expand as more of 1var is discussed and inspected.

## When learning about an existing capability

1. Find its implementation, tests, portal behavior, and product intent.
2. Add or revise its capability-catalog entry.
3. Mark maturity accurately.
4. Document how it composes with existing primitives.
5. Add missing mechanical semantics to the appropriate specification or layer guide.
6. Record unresolved questions explicitly rather than filling gaps with assumptions.

## When proposing a new capability

Start with a short capability note containing:

- Problem and user/builder value
- Existing primitives that may already cover it
- Why those primitives are insufficient, if they are
- Proposed ownership by layer
- Data and trust boundaries
- Composition with entities, relationships, Paths, Essences, ContextDB, JPL, and permissions
- Local/offline opportunity
- Versioning, distribution, and authorization model
- General test cases from at least two domains

Only create a new subsystem after this review shows that extending an existing primitive would make its semantics incoherent or unsafe.

## When changing a cross-layer contract

1. Add or update a machine-readable schema in `contracts/` when practical.
2. State compatibility and migration behavior.
3. Add producer and consumer fixtures/tests.
4. Update every affected `docs/layer.md`.
5. Write an architecture decision if ownership, trust, or long-term direction changes.

## Review checklist

- Does the proposal fix a reusable class of problems?
- Does it preserve the full meaning of existing general primitives?
- Are product intent and implemented behavior clearly separated?
- Could it expose protected information to a new layer?
- Can learned behavior become deterministic and local?
- Are retries and edits idempotent?
- Can failures be diagnosed without secrets?
- Are examples being used as tests rather than special cases?

