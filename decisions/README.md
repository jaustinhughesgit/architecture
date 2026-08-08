# Architecture Decisions

Use one Markdown file per durable cross-layer decision:

```text
NNNN-short-title.md
```

Each record should contain status, context, decision, alternatives, consequences, affected repositories, security impact, migration, and verification.

Do not use decision records for routine implementation details. Use them when a choice changes the platform model, trust boundary, shared contract, cross-layer ownership, or long-term extensibility.

## Accepted decisions

- [0001: Canonical cross-layer architecture repository](0001-canonical-cross-layer-architecture.md)
- [0002: Entities are distributed assets](0002-entities-are-distributed-assets.md)
- [0003: Recipient-wrapped zero-trust sharing](0003-recipient-wrapped-zero-trust-sharing.md)
- [0004: Versioned LLM request templates](0004-versioned-llm-request-templates.md)
- [0005: Route to the smallest sufficient artifact and fork contract additions](0005-intent-routing-and-entity-evolution.md)
- [0006: Headless acceptance before website integration](0006-headless-acceptance-before-website-integration.md)
- [0007: Browser-local Essence is canonical](0007-browser-local-essence-is-canonical.md)
- [0008: Semantic operations and vocabulary are data-defined](0008-semantic-operations-are-data-defined.md)
- [0009: Proof-directed Path repair transactions](0009-proof-directed-path-repair-transactions.md)
- [0010: Confirmed Path foundation promotion](0010-confirmed-path-foundation-promotion.md)
- [0011: Typed Semantic Plans compile into deterministic Paths](0011-typed-semantic-plan-path-synthesis.md)
- [0012: Bounded semantic prerequisites expand through typed Paths](0012-bounded-semantic-prerequisite-expansion.md)
