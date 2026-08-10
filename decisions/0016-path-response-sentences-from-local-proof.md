# 0016: Render Path Response Sentences From Local Proof

- Status: Accepted
- Date: 2026-08-09

## Context

Question Paths return canonical values such as a scalar count or an entity list. Those values are useful to callers and tests, but displaying only `1` or a basic entity label makes the result hard to understand. Sending the value through Essence or a language model again could produce a fluent sentence, but it would also introduce a second interpretation step after the graph query had already been proven locally. That step could change roles, invent context, incur cost, and make repeated known questions depend on a remote service.

The installed semantic operation already owns the query meaning and the Path already owns the request-time bindings. Together with the query result, they contain the information needed to express the answer without a new inference.

## Decision

1. A successful local question may return two distinct fields: `answer`, the canonical machine-oriented value, and `responseSentence`, a human-readable rendering of that same proof.
2. A semantic operation may declare a data-defined `responseTemplate`. The deterministic compiler carries it into the installed Path alongside, but separate from, the canonical `answerTemplate`.
3. The browser renders `responseSentence` only after the query succeeds, using the Path's materialized request bindings and proven query variables. Entity identifiers are resolved through the local graph for display.
4. Response templates may use a small deterministic formatting vocabulary such as title casing, list joining, and count-driven pluralization. They cannot query new data, execute effects, or introduce values that are absent from the binding/query environment.
5. Message preserves and displays the raw answer, then the response sentence when the two differ. Existing programmatic consumers continue to use `answer` without parsing prose.
6. The generated sentence is not converted back into an Essence and is not sent to a model. The Path and its local query remain the semantic authority.
7. Presentation templates do not distinguish otherwise identical query candidates during ambiguity selection. They describe a proven result; they do not change which result is true.
8. For a voice-originated question, Message may enqueue the proven `responseSentence` as an ephemeral Automation speech step, falling back to the canonical answer when no sentence exists. Typed requests remain silent. Unverified model interpretations and protected results are not sent to text-to-speech.

## Consequences

- A count can be displayed as both `1` and “Gavin was the recipient of 1 pass.”
- Known questions remain local, deterministic, inexpensive, and available offline.
- The same semantic operation can provide consistent response language across every compatible learned wording Path.
- Voice questions can complete as an audio conversation through the existing Automation, Speak, and Sound modules rather than a separate response-audio path.
- More sophisticated language requires extending the bounded formatter or versioned template contract rather than silently adding model inference.

## Alternatives considered

- **Convert the answer sentence back through Essence.** Rejected because the query already produced the canonical meaning and a second interpretation can drift from it.
- **Ask an LLM to phrase every successful answer.** Rejected because it adds cost, latency, network dependency, and unproved content to a locally proven result.
- **Replace the raw answer with prose.** Rejected because downstream code and tests need a stable canonical value.

## Security impact

Rendering occurs in the browser over values already available to the authorized local Path execution. It sends no additional ContextDB data to a model and grants no new read, write, or execution authority. When voice-answer playback is requested, the ordinary rendered sentence may use the existing server-backed text-to-speech capability. Protected results are excluded from that channel.

## Migration

Paths without `responseTemplate` continue to return their existing canonical answer. Catalog-backed Paths are recompiled from the installed semantic-operation version during hydration, so existing saved Paths gain the current template without a vocabulary-specific runtime migration.

## Verification

- The renderer produces singular and plural sentences from the same count template.
- Local entity identifiers become graph display values before rendering.
- Compiler tests prove `answerTemplate` and `responseTemplate` remain separate.
- Message renders `responseSentence` without replacing `answer`.
- Voice-originated proven answers enter Automation as speech steps; typed, unverified, and protected results do not.
- Existing Path matching, local query, repair, and rollback suites continue to pass.

## Affected repositories

- `architecture`
- `aws`
