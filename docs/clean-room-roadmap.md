# Clean-room platform roadmap

## Status

This is the hard implementation order for the replacement platform. Phase status describes the clean `onevar-platform` implementation, not capability evidence that remains in the proof-of-concept repositories.

## Non-negotiable flow

```text
voice or text
  -> immutable Interaction Evidence
  -> installed local Path, or a locally compiled and proven Path on a miss
  -> browser-local Essence operation
  -> local ContextDB transaction or exact capability invocation
  -> ordered entity middleware
  -> optional sequential ArrayLogic workflow
  -> bounded JPL or isolated local execution
  -> typed requested effects
  -> browser/server authority check and commit receipt
  -> verified response and provenance
```

The creator's Path is never copied into another user's active library. Shared capabilities publish operation contracts, dependency entity IDs, invocation frames, routing cards, examples, tests, effects, and immutable package provenance. Each installer compiles a local Path from their wording and catalog, and a separate installation record connects capability dependencies to exact local entities or relations through scoped `using` bindings.

## Contract set

| Contract | Purpose | Authority owner |
| --- | --- | --- |
| Interaction Evidence v1 | Immutable text/voice origin, ordering, mode, identity, and privacy classification | Browser |
| Essence Operation v1 | Typed local query, mutation, binding, command, or invocation meaning | Installed browser catalog |
| Invocation Frame v1 | Capability-published structural phrases and typed slots from which a browser can synthesize a local Path | Capability definition; browser compiles |
| Local Path v1 | Locally tested signature to exact operation and installation IDs | Browser identity |
| Path Template Package v1 | Immutable shared learning evidence, frames, tests, and provenance; never activated verbatim as a foreign user Path | Package publisher plus local verifier |
| Context Mutation v1 | Idempotent, version-checked graph changes with declared cardinality and provenance | Browser ContextDB |
| Entity Use Binding v1 | Installation-scoped dependency-to-entity/relation indirection by exact IDs | Installer workspace |
| Binding Essence v1 | Generic `For <capability>, use <target> as <dependency>` local operation that creates an Entity Use Binding | Browser catalog and installer |
| Invocation/Result/Effect v1 | Shared cross-plane request, typed response, requested effects, and applied/denied receipt | Calling plane requests; trusted coordinator authorizes |
| Entity Middleware v1 | Deterministic `extend` lineage with sequential `pass`/`respond`/`fail`; first response or failure stops | Entity resolver and governance |
| ArrayLogic Workflow v1 | Sequential multi-entity orchestration with exact typed references between steps | Workflow owner |
| JPL Program v1 | Bounded per-entity server behavior | Compute runtime |

Names, words, embeddings, examples, and recent inputs select candidates. Entity, relation, capability, operation, dependency, installation, Path, version, and grant IDs control execution.

## Phase 1 — Clean deployment foundation

**Status: complete.**

Delivered:

- clean private product and operations repositories;
- Node.js 24, TypeScript, React/Vite, modular AWS SDK v3, and CDK;
- one monorepo for web, contracts, local runtime, API, infrastructure, and acceptance;
- `/`, `/newentity1`, exact `/<entityId>`, and same-origin `/api/v1/*` routes;
- opaque host-only session and private primary-entity creation;
- command surface plus `ui on` projection over the same runtime;
- private S3 origins, CloudFront, API Gateway, Lambda, and on-demand DynamoDB;
- development and production promotion through repository/environment-bound GitHub OIDC;
- reversible `1var.com` cutover with live API and browser acceptance.

Phase 1 contains no claim that legacy ContextDB, Path, voice, Convert, Compute, protected-asset, or marketplace behavior has moved into the clean runtime.

## Phase 2 — Verified input-to-response kernel

**Goal:** From a clean reset, text input produces locally verified ordinary data responses and can invoke one fixed non-protected Compute fixture through a locally synthesized Path and exact `using` installation binding. Known interactions require no model or network.

### 2.1 Freeze contracts and golden traces

- Add machine-readable schemas for the Phase 2 subset of Interaction Evidence, Essence Operation, Invocation Frame, Local Path, Context Mutation, Entity Use Binding, Binding Essence, Invocation/Result/Effect, and Commit Receipt.
- Give every schema a major version, parser, canonical serializer, content hash, size bound, and unknown-field policy.
- Record golden traces from input through response. Every trace names the exact artifact and owner at each transition.
- Define one stable failure vocabulary covering capture, match, synthesis, binding, graph proof, authorization, execution, effect application, persistence, and presentation.

### 2.2 Build browser-local ContextDB

- Run the graph store and Path matcher behind a worker boundary; the main thread coordinates and renders.
- Persist identity-scoped entities, relations, versions, local/canonical mappings, installed Paths, installations, bindings, interaction evidence, and pending sync in IndexedDB.
- Use monotonic temporary IDs and exact remapping after server acknowledgement.
- Support typed graph query and mutation primitives needed by the initial statement, property, possession, classification, current-value, and question operations.
- Implement catalog-declared `single_current_value`; `dirty -> clean -> dirty` rewires one current relation while preserving observation history.
- Add a clean reset and bounded pre-input rollback that restore ContextDB and Path/install state together.

### 2.3 Build deterministic local Path synthesis

- Ship only a small versioned core semantic catalog and routing index at startup.
- Compile known exact, structural, and composed-subpattern signatures locally from catalog operations.
- Compile capability Invocation Frames into local invocation Paths without a model.
- When deterministic routes are exhausted, construct relevance evidence from at most the last 20 permitted interactions and 200 permitted related ordinary entities. Words and structure rank candidates; only supplied exact IDs may enter an installation, Path reference, or effect target.
- Require token coverage, typed-role coverage, positive/negative/collision gates, isolated graph proof, atomic installation, and original-input replay.
- Store Path identity separately from installation bindings so either can change without corrupting the other.
- A foreign Path template package is learning evidence. The installer creates and proves a local derivative; it never activates the publisher's user-specific Path.
- Use an LLM only after deterministic matching, compilation, graph proof, and explicit clarification cannot resolve a genuinely unfamiliar meaning.

### 2.4 Build the Entity Binding Compiler

- Treat capability dependencies as typed imports and local entities/relations as typed exports.
- Reconcile in this order: existing exact installation binding; exact typed/structural unique match; generic Binding Essence sentence; explicit user selection; bounded LLM proposal over supplied exact IDs.
- Support one reusable foundation form: `For <capability>, use <local reference> as <dependency>` plus structurally equivalent catalog-owned forms.
- Persist an Entity Use Binding with installation, capability, version, operation, dependency, parameter entity, target subject/property/relation, target version, access, provenance, and revocation state.
- If no compatible target exists, create the capability parameter shell as the authoritative local entity rather than inventing a same-name global alias.
- Reads and declared writes dereference the exact binding. A stale version, ambiguous target, missing grant, incompatible value, or undeclared effect fails closed; runtime never falls back to a same-name relation.

### 2.5 Prove one fixed Compute vertical slice

- Publish one platform-owned, non-protected fixture capability with typed Invocation Frames, one read/write ordinary dependency, bounded JPL, an effect contract, and deterministic responses.
- Keep full Convert authoring out of Phase 2; the fixture exists to prove the permanent invocation boundary before generators are added.
- Resolve the user's invocation target locally, install the capability, synthesize a local Path, create an exact Entity Use Binding, run ordered middleware, execute the fixture, validate its result, and apply only its declared exact ContextDB effect.
- Prove that two capabilities with a human-readable `current_status` dependency cannot cross-bind because their capability/operation/dependency/installation IDs differ.

### 2.6 Add publication, packages, and review

- Publish ordinary non-protected graph deltas through an encrypted, idempotent outbox without blocking the local response.
- Store immutable core/template packages by content hash and deliver them through S3/CloudFront; use compact routing cards for discovery and IndexedDB/Service Worker cache for installation.
- Add one command-prompt review command that shows Interaction Evidence, matched or synthesized Path, Essence, ContextDB before/after, installation binding, invocation, requested/applied effects, response, timing, and model/cost usage.
- Exclude protected plaintext, credentials, raw audio, unrestricted graph dumps, and arbitrary prompts from packages and diagnostics.

### Phase 2 required acceptance

Every release starts from the authorized clean reset and proves:

1. `I have a car.` creates one owned object.
2. `My car is a Toyota Camry.` enriches that same object.
3. `My Toyota Camry is dirty.` creates one current condition relation.
4. Both `What is the status of my Camry?` and `Is my Toyota clean or dirty?` return `dirty` locally.
5. `My Toyota Camry is clean.` rewires the same current relation; repeating `dirty` leaves one current value and preserved history.
6. Reload and offline execution return the same known answers without API or model calls.
7. A second vocabulary-neutral domain fixture proves the primitives contain no car-specific branch.
8. The fixed capability expects `current_status`, the local graph exposes a differently named property, and deterministic binding or the standard binding sentence creates one exact `using` installation without an LLM.
9. Invocation changes only the bound relation and returns the declared response; a similarly named dependency in another fixture remains untouched.
10. A second clean browser compiles its own Path and installation; `copiedCreatorPath` is false.
11. Malformed, stale, ambiguous, unauthorized, and replayed requests fail or converge idempotently at the named boundary.
12. Browser review and headless trace contain the same artifact IDs and outcome.

### Phase 2 performance gates

- The command surface accepts input without waiting for identity Path hydration from the server.
- A cached known Path performs no model or API call and has a measured local p95 budget established before Phase 2 sign-off.
- The compressed startup core has a measured byte budget; adding a published Path template does not increase every user's startup payload.
- A locally cached package remains executable offline.
- Every network request, model request, package load, execution node, effect, and persistence retry has a bounded timeout and correlation ID.

## Phase 3 — User-built Compute, composition, and voice

**Goal:** Users create, share, install, combine, and invoke ordinary non-protected capabilities while voice and text enter the same verified runtime.

- Add the AudioWorklet/audio-worker pipeline and the sliding Essence/Convert control. Text and voice produce the same Interaction Evidence contract; protected audio remains excluded until Phase 4.
- Implement Convert requirement segments and the 3 -> 2 -> 3 hard-stop boundary.
- Freeze semantic answer plans before capability contracts and executable generation.
- Version every model request and response schema. Discovery answers the requested behavior and freezes its semantic answer/effect plan before proposing ArrayLogic, Shorthand, JPL, or any executable artifact; structured output remains a proposal until deterministic validation and isolated tests pass.
- Add capability discovery by compact Position routing cards, exact authorized manifest reload, reuse/repair/extend/fork decisions, and immutable capability releases.
- Version ArrayLogic as a sequential multi-entity workflow: each step invokes an exact entity/version/operation, later inputs may reference earlier typed outputs, and failure/cancellation/idempotency/compensation policies are explicit.
- Keep Shorthand as a bounded internal entity-build/patch compiler representation unless a reviewed use case requires a public runtime contract.
- Version and allowlist JPL actions, modules, references, hosts, timeouts, outputs, and effects. Remove dynamic npm installation from the trusted execution path.
- Adopt Entity Middleware v1 across active planes: deterministic `extend` lineage, per-node authorization, sequential `pass`/`respond`/`fail`, and immediate stop on the first response or failure.
- Add the isolated `fileWorker` execution envelope for explicitly local dynamic capabilities; it may request effects but never apply them.
- Publish capability and Path template packages; every installer creates local Paths and separate exact Entity Use Bindings.
- Prove two-user creation, discovery, installation, local wording, read/write use binding, sequential ArrayLogic composition, and first-response middleware from a clean reset.

## Phase 4 — Protection, governed services, and marketplace economics

**Goal:** Users safely transact around capabilities and authorized data without collapsing local, recipient, or trusted-server boundaries.

- Add browser-only, server-ask, and server-preapproved Protected Asset modes; recipient-specific key wrapping; purpose-bound references; revocation; audit; and notification/approval flows.
- Extend Entity Use Binding with protected references only through a new contract version; never send protected plaintext through 20/200 evidence, Path templates, packages, or ordinary prompts.
- Add immutable package signing and build provenance, publisher verification, review state, compatibility, revocation, staged rollout, and rollback.
- Add installations, licenses, usage receipts, refunds, and publisher attribution independently of user data and capability definitions.
- Add a double-entry credit ledger. Stripe purchases mint credits only after verified webhook settlement; reservations, spend, release, earnings, fees, and withdrawals are idempotent ledger transactions.
- Meter model, Compute, provider, storage, bandwidth, and platform charges per invocation; record cost, user price, publisher earning, platform revenue, and margin without storing protected payloads.
- Add governed automations and schedules with exact capability/version/binding snapshots, reauthorization, idempotency, retry/DLQ, cancellation, and result delivery.
- Add file entities, upload/download, immutable versions, generated artifacts, and a governed PDF capability. File bytes and executable behavior remain separate entity members with declared trust and retention.
- Prove one user running a service against another user's authorized ordinary data, then extend the same flow to a protected reference with explicit consent.

## Phase 5 — Million-user scale and rich real-time modules

**Goal:** Prove the platform at the intended operating scale and add rich modules only on the same contracts.

- Partition users/workspaces into bounded cells with automated placement, canary deployment, observability, rollback, and migration; keep global routing and package metadata thin.
- Load-test partition distribution, hot keys, fan-out, package delivery, Context sync, Position/Search, durable workflows, credit ledgers, and audit retention under modeled and then deployed workloads.
- Define SLOs and cost ceilings for cached local input, cold package install, sync acknowledgement, capability invocation, workflow continuation, and marketplace settlement.
- Add stale-index removal, exact reranking, backfill/parity gates, disaster recovery, abuse controls, quotas, rate limits, and regional strategy.
- Add video conferencing, communication, advanced audio, collaborative Context, and organization features as entity packages using the same invocation, effect, governance, and protected-reference boundaries.
- Allow UI modules to project over the command runtime; they do not create a second semantic or execution authority.

## Release discipline

- A phase is not complete because its contract is documented or its POC equivalent exists.
- Every reusable behavior is first proven at the lowest deterministic layer, then through a headless cross-layer trace, then through one thin real browser acceptance.
- Reset-gated scenarios reset before and after, including failure cleanup, and never rely on functional residue.
- Every deployment is immutable, promoted, observable, reversible, and tied to exact source and package hashes.
- A model quality evaluation may measure proposal usefulness; it cannot replace deterministic correctness, authorization, effect, replay, or persistence gates.
