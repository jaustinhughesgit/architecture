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
- [0012: LLM semantic adjudication produces locally proven Paths](0012-llm-semantic-adjudication-to-locally-proven-paths.md)
- [0013: Direct entity properties are a data-defined local primitive](0013-direct-entity-properties.md)
- [0014: Browser-local input rollback uses exact coordinated checkpoints](0014-browser-local-input-rollback.md)
- [0015: Show LLM interpretation without granting it local authority](0015-visible-llm-interpretation-with-local-proof.md)
- [0016: Render Path response sentences from local proof](0016-path-response-sentences-from-local-proof.md)
- [0017: Missing response templates use locally validated LLM proposals](0017-missing-response-templates-use-locally-validated-llm-proposals.md)
- [0018: Catalog-authorized structural evidence in Path repair](0018-catalog-authorized-structural-evidence-in-path-repair.md)
- [0019: Semantic role plans use catalog-owned binding schemas](0019-semantic-role-plans-use-catalog-binding-schemas.md)
- [0020: Compose reusable subpatterns into locally executable Paths](0020-compositional-subpattern-capability-framework.md)
- [0021: Publish ordinary Context through participant-scoped audiences](0021-participant-scoped-context-publication.md)
- [0022: Hydrate public self-context by exact profile name](0022-public-profile-named-context-hydration.md)
- [0023: Words are lexical addresses, not entity identities](0023-words-are-lexical-addresses.md)
- [0024: Dynamic local entity code runs in File Worker](0024-dynamic-local-entity-code-runs-in-fileworker.md)
- [0025: Canonical entity substrate behind a versioned persistence port](0025-canonical-substrate-behind-persistence-port.md)
- [0026: Sharded canonical Context publication and hydration](0026-sharded-canonical-context-publication-and-hydration.md)
- [0027: Versioned entity middleware, composition, and governance](0027-versioned-entity-middleware-composition-and-governance.md)
- [0028: Order the legacy purge before canonical test resets](0028-ordered-legacy-purge-and-canonical-test-reset.md)
- [0029: Version execution, intent jurisdiction, and interaction effects](0029-versioned-execution-intent-and-interaction-effects.md)
- [0029: Use is the response boundary and protected sharing is scoped](0029-use-is-the-response-boundary-and-protected-sharing-is-scoped.md)
- [0030: Reclassify unclassified Path failures through capability jurisdiction](0030-reclassify-unclassified-path-failures-through-capability-jurisdiction.md)
- [0031: Lease compute-build finalization and preserve terminal diagnostics](0031-lease-compute-build-finalization.md)
- [0032: Preserve nested Compute failures and bound background replacement](0032-preserve-nested-compute-failures-and-bound-replacement.md)
- [0033: Provider request inputs are execution dependencies](0033-provider-request-inputs-are-execution-dependencies.md)
- [0034: Compute clarifications carry safe continuation state](0034-compute-clarifications-carry-safe-continuation-state.md)
- [0035: Segment input continuously and declare the protected use boundary](0035-segmented-input-and-protected-use-policy.md)
