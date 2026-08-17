# 0042 — Local data jurisdiction and Compute caching are explicit

Status: accepted

## Context

The same utterance can mention a stored property and an installed Compute capability. A cold Path miss previously cleared its local-graph candidacy merely because capability jurisdiction was consulted. Discovery could then build a competing capability for an ordinary ContextDB question. Separately, the browser cached every successful Compute result; an operation declaring `freshness: {mode: "none", ttlSeconds: 0}` returned `expiresAt: null`, which the cache treated as never expiring. Together these behaviors allowed a mistaken capability and its stale answer to mask current ContextDB data.

Input-only Convert builds also remained unnecessarily model-dependent. Even when one typed input unambiguously supplied one compatible output, background EntityPlan generation could rename or omit the required input and fail validation.

## Decision

Capability jurisdiction is a classification step, not authority to erase a known local-data route. Until local repair has run and failed, a cold question that can be expressed by a catalog-owned ContextDB operation remains `localGraphCandidate: true`. Discovery must return `not_compute` for that evidence. The browser foundation includes a vocabulary-neutral direct property query over `{subject, property}` for both current-speaker and possessive named subjects; it does not contain register-, animal-, appliance-, or user-specific vocabulary.

Compute result caching is opt-in. The browser may read or write its capability cache only when the installed operation declares `freshness.mode: cache`, a positive `ttlSeconds`, and the returned result has a future `expiresAt`. `mode: none`, zero TTL, absent expiry, invalid expiry, changed inputs, changed protected references, or a changed capability version cannot reuse a cached result.

The Convert builder deterministically compiles an unambiguous local input projection without another model call. Exact name-compatible input/output pairs are projected directly. A one-input/one-output type-compatible contract may also project the input under the declared output name. Multiple unmatched inputs, semantic transformations, provider work, protected requirements, or ambiguous output mappings still require a typed EntityPlan. Explicitly supplied EntityPlans, including Edit or validation fixtures, remain authoritative candidates and are validated normally.

When a Path-specific ContextDB binding replaces `speaker` with one named canonical entity, answer presentation may replace only a leading deictic subject (`Your`, `You have`, or `You are`) with that locally resolved entity's possessive or agreement form. This changes perspective, not result data, capability identity, authorization, or JPL.

An installed Compute Path carries the manifest's execution contract. The browser may retry one transient transport, gateway, rate-limit, provider-unavailable, or execution-timeout failure only when that contract explicitly declares `readOnly: true`. The retry preserves the invocation idempotency key and typed inputs. Mutating operations and paths without the declaration are never retried automatically.

## Consequences

- Ordinary data questions do not create accidental Compute entities merely because their wording is new.
- ContextDB-backed capabilities see current values unless their contract explicitly authorizes a bounded cache.
- Simple presentation entities build reliably without weakening EntityPlan validation for real transformations.
- Named invocations reuse one capability and one typed input contract while presenting the selected subject correctly.
- A transient read-only Compute timeout does not force the user to repeat the question, while mutation safety remains fail-closed.

## Security impact

The decision reduces authority: local questions remain local, no graph is sent to Compute, caching requires an explicit bounded contract, and perspective rendering uses only an already authorized local entity label. Protected references and plaintext handling are unchanged.

## Verification

- Prove current-speaker and named possessive direct-property questions compile to the same catalog operation with complete token coverage.
- Prove cold capability jurisdiction retains local candidacy until local repair is exhausted.
- Prove `freshness:none` invokes twice and observes a changed result; prove a positive cache TTL reuses once.
- Prove a one-input local projection builds without calling the model and consumes the required input.
- Prove a multi-input unmatched transformation is not guessed.
- Prove one retryable read-only timeout is retried once and the same failure is not retried for a mutating operation.
- Prove one stored command-prompt chain covers ordinary cross-user data, requestable protected data, timed owner approval, recipient-local decryption, Convert build, self invocation, and named positioned invocation.
