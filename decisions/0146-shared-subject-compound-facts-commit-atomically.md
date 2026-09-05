# 0146 — Shared-subject compound facts commit atomically

Status: accepted.

## Context

The bounded Path adviser intentionally proposes one fact operation. A sentence containing both an identity assertion and a habit therefore could not be represented without either dropping one fact or pretending two effects were one. Sequential browser submissions would expose a partial mutation if the later clause failed.

## Decision

The browser-local core catalog defines `current_state.set.batch` for two to four affirmative property assertions sharing one explicitly possessed subject. The first clause grounds `my {subject}`. A comma-delimited `and` or `then` continuation may bind `he`, `she`, `it`, or `they` only to that same subject. Each property and value remains exact input text.

Trusted local code resolves or stages the subject once, stages all value entities, current-property relations and observations, and commits them in one ContextDB revision. Any unsafe, ambiguous, malformed or oversized clause rejects the whole batch. Arbitrary conjunctions, external actions, conditions and cross-subject planning remain outside this primitive.

## Consequences

Compound facts do not require executable model output or sequential partial writes. The operation is vocabulary-neutral and bounded, while broader multi-subject or mixed read/write language still requires a separately designed composition contract.
