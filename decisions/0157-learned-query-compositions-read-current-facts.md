# 0157: Learned query compositions read current facts

- Status: Accepted, bounded implementation
- Date: 2026-09-12
- Extends: 0156's semantic-growth foundation

## Decision

Recording new ordinary events without a way to learn their queries left the semantic-growth loop incomplete. Extend the same content-addressed semantic library, rather than add a domain-specific question handler. Definition schema version 2, `ordinary.query.v1`, composes one resolve/scan seed with joined follow/filter steps and distinct endpoint/count selection. Existing schema-v1 write packages are unchanged. Whole-input patterns, grounded captures, fixed-concept lexical inflections and bounded single-assignment programs are reusable data, not executable source.

An uncovered ordinary question enters the existing browser semantic-learning flow with `learningNeeded: query`. Shared discovery precedes `/api/v1/paths/propose` with `tier: query`. The model receives the ordinary input and generic contracts, not ContextDB, resolved identities or protected data. It returns a strict read plan, never an authoritative answer. API compilation stages an exact immutable candidate. The browser validates it and performs authorized current-fact joins locally; constraints retain the same occurrence or exact relationship facet throughout the query.

Answers use the existing `graph.query` contract with package hash/bindings, read revision, exact subjects and versioned relation witnesses. The query cannot introduce missing references, mutate facts, change publication/discourse state, access protected values or execute providers. Local proof/persistence precede the existing authenticated exact-candidate acknowledgement and durable sharing outbox. Recipients bind their own facts; warm queries compute fresh answers without model/network calls. Canonical graph persistence, API graph transport and Compute/JPL authority are unchanged.

Structural concepts address a logical storage-compatible read view. Proven event/actor edges supply their schema-equivalent inverse view with the original relation and occurrence-kind witnesses. Generic context reads include location/time; role-specific context reads retain legacy unspecified context without inferring its geographical/temporal type or including the opposite explicit role. Captured user property keys do not gain aliases. No new canonical edges are persisted.

Bounds: 16 steps, 4,096 intermediate rows, 100,000 work visits, eight visible matches and 32 relation witnesses per match. No arbitrary code, recursion, unbounded scans or inferred authority. Invalid/ambiguous definitions fail rather than being chosen by rank. Existing library/search limits remain.

## Status and limitations

The read executor and learning lifecycle are an **Implemented bounded slice**; general capability growth remains **Partial**. This supersedes 0156's initial exclusion of all generated queries, not its other limits. Structural proof is not proof of linguistic intent. Lexical equivalence, multilingual recognition, negative/uncertain semantics, temporal inference, quality promotion/revocation and new interpreter primitives remain bounded or unsupported. Ten chosen questions cannot establish 95% coverage. No production activation or shared-state reset is included.

Implementation: `onevar-platform/docs/decisions/0099-learned-read-compositions-query-current-facts.md`. Test inputs, fixture-versus-model distinction and deployment evidence: `onevar-platform/docs/testing/semantic-queries.md`.
