# 0062: Model promotion requires measured authoring evals

**Status:** Accepted for Phase 3; gate and runner implemented, production measurement pending

## Context

Strict structured output guarantees shape, not semantic correctness. One successful car-wash flow cannot establish that a model consistently preserves a requested property, current-value domain, transition, required input, invocation family, and response intent.

## Decision

The initial clean authoring suite contains 50 non-protected fixed-transition cases: ten property domains with five phrasings each. Deterministic scoring requires the correct computability and transform intent, compatible property meaning, exact allowed-value set, exact old/new transition, at least one required input and invocation phrase, contract validation, and compiler acceptance.

A model/configuration is promotion-eligible only with at least 50 measured cases, at least 98% passing, and zero failures among the ten critical base cases. The live runner is opt-in, uses the same strict background Responses boundary, reports token use and individual failures, and is excluded from ordinary CI to prevent accidental cost.

## Consequences

- Unit tests validate the gate mechanics but cannot be reported as a model score.
- The configured production model remains unapproved until a live report is retained.
- Read, external-action, file, communication, adapter, and protected operation classes require separate representative suites.
