# 0020: Compose Reusable Subpatterns into Locally Executable Paths

- Status: Accepted
- Date: 2026-08-10

## Context

Pattern Schema v3 generalized complete utterances with typed slots, modifiers, and projections, but each installed processing Path still primarily represented one complete sentence shape. Morphology, owner form, quantity marker position, projection wording, and operation direction therefore produced sibling equations even when they shared the same semantic capability. Startup hydration, worker publication, runtime matching, and collision gates operated over the resulting complete Path collection. Treating generated examples as runtime equations would make broad sentence exploration increase both stored records and startup work.

The platform must preserve browser-local canonical Essence, Path validation, ContextDB proof, commands, menus, functions, automations, entity invocation, File Worker isolation, persistence, response rendering, and protected-asset boundaries. Compositional recognition cannot bypass the Path envelope or grant a model direct execution authority.

## Decision

1var adds a browser-local compositional capability framework.

A capability pack names a reusable semantic contract and declares its semantic operations, effect classes, shared subpatterns, integrations, tests, and migration metadata. Pattern Schema v4 defines one ordered network of referenced subpatterns. A subpattern owns one reusable piece of syntax or meaning, such as an owner role, quantity operation, numeric amount, modifier, item role, count projection, auxiliary, or possession relation. Each subpattern may provide several bounded syntax alternatives and declarative binding patches.

At request time the browser activates compatible alternatives, composes them in the Path's declared network, requires complete meaningful-token coverage, resolves typed captures, and produces the same deterministic binding list returned by an accepted v3 Path match. The existing Path right side then materializes the catalog-owned Essence, command, menu action, compute invocation, or other registered interaction. A v4 match has no direct graph, entity, command, persistence, or protected-asset authority.

The framework indexes structural candidates by speech act and mandatory routing anchors before running the full matcher. Quality gates build structural and operation indexes once per import batch so collision and same-operation checks do not rescan every unrelated Path for every candidate.

Server replication retains the complete Path envelope while preserving browser ownership of matching. Browser uploads are bounded by serialized UTF-8 size and count, the API boundary preserves a sanitized 413 so an idempotent batch can be split, and Compute validates and stores the v4 signature/network contract without activating its referenced subpatterns.

The first migrations replace sixteen active complete quantity statement/query equations with two composed Paths and three event-count question equations with one composed Path, while retaining the old definitions as migration and regression evidence. A later vocabulary-neutral self-property composition adds one Path for `my <property> <copula> <value>`. The merged active processing foundation contains 15 installed Paths. Path Builder and the worker exclude superseded signatures during local cache hydration, server hydration, confirmed-foundation merge, and worker installation. Pattern Schema v3 remains accepted for capability families not yet migrated.

Failures use a stable local pipeline:

0. capture
1. tokenization
2. classification
3. subpattern activation
4. subpattern composition
5. semantic binding
6. capability catalog or compiler contract
7. browser-local proof
8. Path installation or persistence
9. integration execution
10. API, Compute, or provider transport
11. response presentation

Each failure carries an owner, stable code, retryability, model eligibility, and recommended repair action. The Capability Lab groups test results by this fingerprint, ranks reusable gaps by affected case count, and compares locally verified success rates between runs. Classification, subpattern, semantic-binding, and ambiguous local-proof failures may be explicitly eligible for a grounded model proposal; deterministic catalog, compiler, lifecycle, security, and integration defects remain local engineering work.

## Consequences

- Generated sentences become test evidence rather than one runtime record per wording.
- One Path can cover combinations of compatible owner, operator, modifier, role, and projection subpatterns without enumerating their Cartesian product.
- Essence and Path remain the canonical semantic and local reuse boundary.
- Existing edit, Convert, function/call, command/menu, automation, File Worker, Compute Entity, persistence, response, cost, and voice integrations continue consuming the same Path result contracts.
- Candidate selection and batch collision analysis scale with indexed relevant structures rather than unconditional full-library scans.
- The migration is incremental. Most non-quantity bundled Paths remain v3 and precompiled/lazy capability-pack hydration is not yet implemented.

## Alternatives considered

- **Store every generated sentence as a Path.** Rejected because examples would become startup state and matching cost rather than test coverage.
- **Let an LLM interpret every sentence directly.** Rejected because it removes local-first execution, deterministic replay, browser-owned Essence, and the zero-trust boundary.
- **Replace Paths with a new parser output.** Rejected because downstream commands, entities, edits, persistence, repair, and proof already share the Path contract.
- **Generalize only with wider wildcard slots.** Rejected because broad slots lose typed role boundaries and increase semantic collisions.

## Security impact

The change does not expand any trust boundary. Subpatterns contain grammar, role sources, and bounded literal binding metadata; protected plaintext remains forbidden in signatures, manifests, diagnostics, ContextDB facts, and model prompts. A composed match must pass the same local operation compiler and proof as a v3 match. Protected-asset references, recipient wraps, executor wraps, permissions, and File Worker isolation are unchanged.

## Migration

- Persisted v3 Paths continue to load unless their pattern identity is explicitly listed as superseded by the installed framework.
- Superseded quantity Paths remain in the bundled dataset as compatibility fixtures but are not compiled into the active foundation.
- The compact foundation manifest requires two v4 quantity Paths and one v4 event-count Path and no longer waits for their nineteen superseded predecessors.
- Additional families should migrate only after equivalent positive, negative, collision, response, refresh, and integration tests pass.
- Cross-layer persistence must accept each supported Pattern schema before a migrated family is released; local-only success is not sufficient migration completion.

## Verification

- One composed statement Path matches speaker, qualified-owner, and direct-owner forms across baseline, increase, decrease, pre-amount marker, post-amount marker, number, and arbitrary item combinations.
- One composed query Path matches current-speaker, qualified-owner, and direct-owner count questions with multiple count projections.
- One composed event-count Path matches qualified and unqualified questions and maps bounded semantic aliases such as `effective` to the catalog quality used by local proof.
- Dynamic bindings preserve current-speaker sources, captured token spans, operation literals, and signed delta scale.
- Capability manifests account for every installed semantic operation and declare the existing interaction and trust-boundary integrations.
- Capability Lab clusters syntax, composition, compiler, proof, lifecycle, execution, transport, and presentation failures without making deterministic defects model-retryable.
- The complete browser application suite passes, including edit, voice, response, compute, automation, rollback, persistence, File Worker, and protected-asset tests.
- Byte-bounded replication reaches Compute below its request limit, typed 413 responses remain splittable through the API proxy, and representative v4 Paths pass server persistence validation.

## Affected repositories

- `architecture`
- `aws`
- `aws-api`
- `compute`
