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
