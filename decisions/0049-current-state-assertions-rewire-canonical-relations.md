# 0049: Current-state assertions rewire canonical relations

- **Status:** Accepted
- **Date:** 2026-08-19
- **Affected repositories:** `architecture`, `aws`, `testing`

## Context

An ordinary assertion can record both a historical observation and a current subject-property-value projection. Treating every materialized row as append-only correctly preserves event history but incorrectly lets one current-state property accumulate contradictory values. Reprocessing the same scalar also creates another graph entity with the same exact lexeme. A later question then returns every accumulated value even though the user supplied a new current state.

Twenty/two-hundred relevance and model adjudication cannot enforce this invariant after a bundled local Path has already matched. The local semantic operation and graph runtime must declare and prove the mutation behavior themselves.

## Decision

A browser-local semantic operation may declare a catalog-owned `single_current_value` write policy for one materialized direct-fact row. This policy is opt-in; event observations and operations without it retain append semantics.

For the declared row, graph ingestion resolves the exact subject and property identities, reuses the earliest installed entity carrying the exact normalized value mention, and preserves the earliest matching subject/property relation ID. If the value changes, it rewires that relation's object. If earlier defective execution left multiple direct relations for the same subject/property, it removes the later duplicates as part of the same declared single-value projection. The observation rows are still ingested as distinct event identities and reference the reused value entity.

The semantic-entity compiler validates and carries the policy into the locally compiled Path. Transcribe passes it only when ingesting that statement's facts. The headless published-Path runner passes the same policy to the deployed graph runtime so acceptance tests exercise the browser-owned contract rather than duplicating its semantics.

## Alternatives considered

- Ask the model to reinterpret every repeated assertion. Rejected because installed Paths must execute locally, and model availability cannot be the correctness boundary for ordinary state mutation.
- Rename the prior value entity. Rejected because value entities may be shared by other relations; changing `clean` into `dirty` would corrupt their meaning.
- Make all graph rows single-valued. Rejected because observations, participants, collections, and many ordinary properties are intentionally additive.

## Consequences

- `dirty → clean → dirty` retains one current condition relation and two reusable value entities while keeping all three observation events.
- Repeating a scalar current-state assertion no longer produces another exact-value entity.
- Cardinality remains data-defined by the selected semantic operation rather than inferred from domain words in graph code.
- Existing contradictory direct projections are repaired the next time the same declared current-state property is asserted.

## Security impact

The policy executes only inside browser-local ContextDB and grants no new server, model, Compute, or protected-asset access. Exact IDs remain local mutation authority.

## Migration

No eager graph migration is required. Existing graphs are repaired on the next matching declared assertion. Stored Paths backed by the versioned semantic entity are recompiled from the installed catalog and receive the policy without accepting model-authored mutation behavior.

## Verification

- Graph-runtime tests prove canonical value reuse, same-ID relation rewiring, and duplicate-current-relation cleanup.
- Semantic compiler tests prove the policy is catalog-owned and installed on the possessive property assertion.
- The published-Path harness proves both owned-object condition correction and ordinary speaker-property replacement return one value.
