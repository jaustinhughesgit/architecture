# 0012: LLM Semantic Adjudication Produces Locally Proven Paths

- Status: Accepted
- Date: 2026-08-08

## Context

A cold ContextDB does not yet contain every relationship needed to interpret ordinary language. Local tokens can expose useful syntax such as subject, predicate, object, descriptors, and question projection, but syntax alone cannot establish all semantic relationships. For example, the system may separately receive `Honda Civic is a car`, `I have a red Honda Civic`, and `What color is my car?`. A language model can reason that the answer is `red` and can identify a missing classification or ownership relationship, while a one-shot Path proposal may simply fail against the incomplete graph.

Treating the model only as a selector for a predeclared stitching contract makes every new semantic connection require another catalog-specific operation. Letting the model directly mutate ContextDB or define canonical Essence would instead violate local-first repeatability, local zero-trust execution, and auditability.

## Decision

A cold Path miss uses a semantic-adjudication transaction:

1. The browser tokenizes the message and emits vocabulary-neutral local syntax evidence, including candidate triplets and projections. This is evidence, not canonical semantics.
2. The request supplies that evidence, the current sentence and tokens, up to twenty recent inputs/results, installed Path evidence, and the relevant bounded ContextDB snapshot to the model.
3. The model independently adjudicates the speech act and returns a strict structured result:
   - `inputKind`
   - a grounded `answer` for a question
   - intended `graphWrites` for a statement
   - `contextRepairs` tied to specific historical source sequences
   - current and historical Path proposals
4. The model may use ordinary general knowledge to connect entities explicitly grounded in the supplied material. It may not invent user events, quantities, permissions, protected values, or unobserved facts.
5. A deterministic compiler replaces any selected catalog operation with its installed executable definition. If no catalog operation faithfully expresses the meaning, a declarative four-cell Essence transform may be proposed.
6. The browser validates the entire transaction in an isolated local ContextDB. A statement candidate must materialize every adjudicated graph row. Each historical repair must materialize its declared relationships. A question candidate must reproduce the adjudicated answer after all supporting repairs replay.
7. All required Paths pass and commit together, or none commit. The user sees the answer only after local reproduction succeeds.
8. Later compatible inputs use the installed local Paths without another model call. Auto-build remains limited to generating extra equivalent wordings; it is not required for a cold miss.

The LLM therefore owns semantic adjudication during discovery, while the browser owns executable Essence, proof, mutation, and reuse.

## Consequences

- Cold interaction can use model intelligence to repair missing graph relationships before a query fails repeatedly.
- New domains do not require vocabulary branches or one semantic operation per noun/verb combination.
- Model answers are useful proof targets but never unverified runtime answers.
- Historical corrections have explicit provenance and are replayed atomically with the current Path.
- Explicit classifications such as `X is a Y` remain a reusable data-defined operation, but classification is no longer a special query-time hard-coded prerequisite.
- General adjudication quality, graph-snapshot relevance, contradiction handling, and ambiguity/confirmation policy remain partial and require broader evaluation.

## Alternatives considered

- **Add domain aliases or verbs to runtime code.** Rejected because it does not scale.
- **Declare a special catalog prerequisite for every semantic bridge.** Rejected because it turns language understanding into an unbounded catalog of one-off stitchers.
- **Trust and display the model answer immediately.** Rejected because the installed Path and local graph may still be unable to reproduce it.
- **Let the model write ContextDB directly.** Rejected because it bypasses local validation, provenance, permissions, and zero-trust boundaries.

## Security impact

The server receives only context already authorized for the model request. Protected plaintext is not silently added. Model-proposed facts have no direct write authority. Browser-local isolated proof remains the acceptance boundary, and any required repair failure aborts the transaction.

## Verification

- Local syntax extraction handles classification, possession/description, property projection, and unrelated vocabulary without domain word lists.
- Structured model output includes adjudication, graph writes, repairs, and Path candidates.
- Adjudicated answers override untrusted candidate answer fields and become the browser runtime test target.
- Adjudicated statement/repair rows must be materialized by their candidate Paths.
- Missing historical repair Paths or any failed candidate aborts the full transaction.
- The synthesis/compiler sources contain no example-specific vocabulary dispatch.

## Affected repositories

- `architecture`
- `aws`
