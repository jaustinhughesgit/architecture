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
| Local Path v1 | Locally tested signature to an exact catalog operation and, when applicable, installation ID | Browser identity |
| Path Template Package v1 | Immutable shared learning evidence, frames, tests, and provenance; never activated verbatim as a foreign user Path | Package publisher plus local verifier |
| Context Mutation v1 | Idempotent, version-checked graph changes with declared cardinality and provenance | Browser ContextDB |
| Context Publication/Hydration v1 | Audience-scoped ordinary graph deltas, canonical identity mappings, and authorized exact graph slices | Publishing and receiving identities plus server governance |
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

**Status:** Complete and deployed as immutable release `5cb00df` on 2026-08-24.

The release passed the same reset-gated Chromium suite in isolated development (3/3 in 14.1 seconds) and production/`1var.com` (3/3 in 13.0 seconds). The suite deliberately drops one Context publication, uses two fresh browser identities, exercises offline recovery and exact remote dirty/clean/dirty refresh, revokes visibility, and resets both identities in `finally`.

**Goal:** From a clean reset, text input creates, connects, updates, and queries ordinary non-protected data locally, while an authorized second user can resolve and query the published current state by exact identity. Compute entities are not required for Phase 2. Known same-user interactions require no model or network.

### 2.1 Freeze contracts and golden traces

- Add machine-readable schemas for the Phase 2 subset of Interaction Evidence, Essence Operation, Local Path, Context Mutation, Context Publication/Hydration, and Commit Receipt.
- Give every schema a major version, parser, canonical serializer, content hash, size bound, and unknown-field policy.
- Record golden traces from input through response. Every trace names the exact artifact and owner at each transition.
- Define one stable failure vocabulary covering capture, match, synthesis, graph proof, authorization, persistence, hydration, freshness, and presentation.

### 2.2 Build browser-local ContextDB

- Run the graph store and Path matcher behind a worker boundary; the main thread coordinates and renders.
- Persist identity-scoped entities, relations, versions, local/canonical mappings, installed Paths, interaction evidence, authorized hydrated slices, and pending sync in IndexedDB.
- Use monotonic temporary IDs and exact remapping after server acknowledgement.
- Support typed graph query and mutation primitives needed by the initial statement, property, possession, classification, current-value, and question operations.
- Implement catalog-declared `single_current_value`; `dirty -> clean -> dirty` rewires one current relation while preserving observation history.
- Add a clean reset and bounded pre-input rollback that restore ContextDB, Path, hydration, and sync state together.

### 2.3 Build deterministic local Path synthesis

- Ship only a small versioned core semantic catalog and routing index at startup.
- Compile known exact, structural, and composed-subpattern signatures locally from catalog operations.
- When deterministic routes are exhausted, construct relevance evidence from at most the last 20 permitted interactions and 200 permitted related ordinary entities. Words and structure rank candidates; only supplied exact IDs may enter a Path reference or mutation/query target.
- Require token coverage, typed-role coverage, positive/negative/collision gates, isolated graph proof, atomic installation, and original-input replay.
- Store Path identity separately from graph identity and publication mappings so each can evolve without corrupting the others.
- A shared Path template is learning evidence. The receiving browser creates and proves a local derivative; it never activates the publisher's user-specific Path.
- Use an LLM only after deterministic matching, compilation, graph proof, and explicit clarification cannot resolve a genuinely unfamiliar meaning.

### 2.4 Publish and hydrate authorized ordinary Context

- Treat `My name is Austin.` as an identity-scoped graph statement that can establish the exact profile identity used by later authorized named-person resolution.
- Publish permitted ordinary graph deltas through an encrypted, idempotent outbox without blocking the same-user local response. Non-protected data is not automatically public; every published entity and relation retains an explicit audience and action grant.
- Return canonical IDs and versions, then atomically remap ContextDB, pending outbox records, Path identity memory, and hydrated references.
- For `Is Austin's Camry clean or dirty?`, resolve Austin's exact authorized identity, fetch the smallest exact permitted graph slice, hydrate it into the caller's local ContextDB, and execute the caller's own local Path over that slice.
- Exact-refresh a named remote subject before answering a current-state question unless a declared freshness policy permits the cached hydrated version. Return the proven scalar value, never an opaque entity or relation ID.
- Preserve the structural chain `Austin -> owns -> Toyota Camry -> current condition`; a word match on `Austin`, `car`, `clean`, or `dirty` is never sufficient identity or authority.
- Ambiguous same-name people, missing audience grants, revoked relations, stale versions, and incomplete graph slices fail closed or request clarification.

### 2.5 Add packages, review, and reset proof

- Store the measured startup catalog and shared template packages by content hash and deliver them through S3/CloudFront with IndexedDB/Service Worker caching.
- A package supplies trusted catalog operations or compilation evidence; integrity and provenance do not grant data access or activate another user's Path.
- Add one command-prompt review command that shows Interaction Evidence, matched or synthesized Path, Essence, ContextDB before/after, publication/hydration IDs and versions, authorization decision, response, timing, and model/cost usage.
- Exclude protected plaintext, credentials, raw audio, unrestricted graph dumps, and arbitrary prompts from packages and diagnostics.
- Make reset remove local graph, Paths, hydrated slices, mappings, outbox state, and test-owned server publications so every acceptance run begins without functional residue.

### Phase 2 required acceptance

Every release starts from the authorized clean reset and proves:

1. User 1 says `My name is Austin.` and establishes one exact identity eligible for explicit authorized publication.
2. `I have a car.` creates one object owned by that identity.
3. `My car is a Toyota Camry.` enriches that same object.
4. `My Toyota Camry is dirty.` creates one current condition relation.
5. Both `What is the status of my Camry?` and `Is my Toyota clean or dirty?` return `dirty` locally.
6. `My Toyota Camry is clean.` rewires the same current relation; saying it is `dirty` again leaves one current value and preserved observation history.
7. Reload and offline execution return the same known same-user answers without API or model calls.
8. After User 1 grants the required ordinary visibility, User 2 asks `Is Austin's Camry clean or dirty?` and receives the currently published scalar state through exact identity and graph resolution.
9. After User 1 changes the state and sync acknowledges it, the same User 2 question exact-refreshes and returns the new value rather than stale data or an ID.
10. A same-name person, absent grant, revoked relation, or ambiguous car cannot leak or guess a result.
11. A second vocabulary-neutral domain proves the primitives contain no car-specific branch.
12. Each browser compiles and owns its local query Path; `copiedCreatorPath` is false.
13. Malformed, stale, unauthorized, duplicated, and replayed writes fail or converge idempotently at the named boundary.
14. Browser review and headless trace contain the same artifact IDs, authorization result, and answer.

### Phase 2 performance gates

- The command surface accepts input without waiting for identity Path hydration from the server.
- A cached known Path performs no model or API call and has a measured local p95 budget established before Phase 2 sign-off.
- The compressed startup core has a measured byte budget; adding a published Path template does not increase every user's startup payload.
- A locally cached core package remains executable offline.
- A cross-user current-state query has a separate measured exact-refresh latency budget and never treats a stale local copy as current without a declared freshness policy.
- Every network request, model request, package load, hydration, and persistence retry has a bounded timeout and correlation ID.

## Phase 3 — User-built Compute, composition, and voice

**Goal:** Users create, share, install, combine, and invoke ordinary non-protected capabilities while voice and text enter the same verified runtime.

**Status (2026-08-24): Complete and deployed.** Release `d1b02dc0a28af71704465bd92091f54820dbef02` completes the ordinary, non-protected, compiler-bounded JPL v1 boundary. The clean platform has strict Compute/build/install/JPL/effect/ArrayLogic/adapter/middleware contracts; a trusted build-plan-to-JPL compiler and bounded interpreter; exact browser-local installations plus model-free Binding Essence rebinding; property-scoped current relations; durable two-stage answer-first Convert generation; compact lexical plus Position discovery; content-addressed S3 capability packages verified independently by browser and server; transient ordinary AudioWorklet/encoder-worker transcription that rejoins the typed dispatcher; atomic browser effect application; and clean two-browser car-wash acceptance that reuses its installed Path with zero model/discovery calls. Trusted authoring canonicalization supplies one unambiguous required selected-subject input, restores frozen input/dependency identity at the contract boundary, and treats the frozen answer plan as the sole authority for exact transition endpoints. Each model stage has one durable, revision-checked retry for recognized transient provider failures while semantic and validation failures remain final; completed invalid responses still retain sanitized usage receipts. Durable browser-coordinated ArrayLogic persists exact step mappings, invocation identities, retries, typed outputs, effect receipts, cancellation, and atomic Context checkpoints across reload. Immutable packages have a separate owner-revocable release record enforced by discovery, download, and invocation. The exact candidate passed the unfiltered 50-case, ten-domain `gpt-5.4-mini` promotion gate 50/50 with zero critical failures; sanitized receipts cover 102 responses, 98,233 input tokens, and 26,527 output tokens. Development workflow 32775939532 proved live authoring, build, discovery, binding, invocation, effect, S3 package verification, revocation, reset-gated browser acceptance, and ordinary voice. Production workflow 32777037295 promoted the same commit and passed reset-gated browser and voice acceptance; health and smoke checks verified the full release. Workflow 32702449570 retains exact rollback release `5cb00df6876a3d7e3b49eaf178187321ce34909e`. Adapter fixtures and target-first middleware remain deterministic conformance foundations. JavaScript adapter execution, non-`none` compensation, active middleware transport, package signing, independent review, and protected references move behind Phase 4 governance and remain fail-closed. See [decisions 0055](../decisions/0055-compiler-owned-jpl-and-hybrid-compute-execution.md) through [0064](../decisions/0064-phase-3-releases-the-governed-non-protected-jpl-boundary.md).

- Freeze Invocation Frame, Entity Use Binding, Binding Essence, Invocation/Result/Effect, Entity Middleware, ArrayLogic Workflow, and JPL Program schemas before implementing the broad runtime.
- Build the Entity Binding Compiler: exact existing binding, unique typed structural match, generic binding sentence, explicit choice, then bounded LLM selection over supplied exact IDs.
- Prove the permanent Compute boundary with one platform-owned non-protected fixture before enabling generation: local Path compilation from Invocation Frames, exact installation binding, bounded JPL execution, validated requested effect, and exact local commit.
- Prove that identical human-readable dependency names in unrelated capabilities cannot cross-bind because capability, version, operation, dependency, installation, entity, and relation IDs differ.
- Scope every mutable current value by an explicit property dimension; clarify unqualified multi-property queries and treat property semantics only as candidate evidence before exact-ID binding.
- Add the AudioWorklet/audio-worker pipeline and the sliding Essence/Convert control. Text and voice produce the same Interaction Evidence contract; protected audio remains excluded until Phase 4.
- Implement Convert requirement segments and the 3 -> 2 -> 3 hard-stop boundary.
- Freeze semantic answer plans before capability contracts and executable generation.
- Version every model request and response schema. Discovery answers the requested behavior and freezes its semantic answer/effect plan before proposing ArrayLogic, Shorthand, JPL, or any executable artifact; structured output remains a proposal until deterministic validation and isolated tests pass.
- Add capability discovery by compact Position routing cards, exact authorized manifest reload, reuse/repair/extend/fork decisions, and immutable capability releases.
- Version ArrayLogic as a sequential multi-entity workflow: each step invokes an exact entity/version/operation, later inputs may reference earlier typed outputs, and failure/cancellation/idempotency/compensation policies are explicit.
- Keep Shorthand as a bounded internal entity-build/patch compiler representation unless a reviewed use case requires a public runtime contract.
- Version and allowlist JPL actions, modules, references, hosts, timeouts, outputs, and effects. Remove dynamic npm installation from the trusted execution path.
- Preserve Entity Middleware v1 as a tested target-first contract and runtime; activate it only after Phase 4 supplies canonical lineage, current per-node authorization, audit, and protected-reference rules.
- Preserve reviewed JavaScript adapter and `fileWorker` envelopes as conformance foundations; production execution waits for Phase 4 package signing/review and isolated execution cells.
- Publish capability and Path template packages; every installer creates local Paths and separate exact Entity Use Bindings.
- Prove that two different users can independently discover the same capability, compile their own local wording, and bind it to their own ordinary data; then prove sequential ArrayLogic composition from a clean reset while retaining first-response middleware as deterministic conformance evidence for Phase 4 activation.

## Phase 3.5 — Input trust surface

**Goal:** Make semantic purpose and privacy explicit and mechanically testable before protected storage or execution receives authority.

**Status (2026-08-24): Implemented; the original four-lane and walkie-talkie releases are deployed, and the segmented-composer revision is verified in the current clean candidate.** Release `6d55c528f9e8b11edc6b282639d4c29e387bb6b9` established `essence | convert` and `ordinary | protected` as four stable lanes. Release `620f51b72ac525475317590ffa7a2875aee7dc90` restored the clean-room walkie-talkie projection. The current candidate opens a latched, focused Essence composer by default; a tap latches any lane; a left slide opens an ephemeral one-message composer; and same-purpose button changes or inline `/1`–`/4` controls create ordered ordinary/protected spans. There is no separate Build or Discard action. Hard stop remains a Convert-started `3 -> 2 -> 3` boundary. AudioWorklet remains authoritative, while a transient segmented MediaRecorder covers ordinary embedded-browser captures only when the worklet yields no samples. Protected entry stops and clears that fallback immediately; typed protected sentinels and mixed-trust held captures still fail closed before remote transcription, ordinary ContextDB, authoring, terminal plaintext, or network. Local ASR, encrypted asset creation, protected-reference substitution, grants, and governed execution remain Phase 4A work. See [decisions 0065](../decisions/0065-four-lane-input-trust-surface.md), [0066](../decisions/0066-walkie-talkie-input-gesture.md), and [0067](../decisions/0067-latched-segmented-input-composer.md).

## Phase 4 — Protection, governed services, and marketplace economics

**Goal:** Users safely transact around capabilities and authorized data without collapsing local, recipient, or trusted-server boundaries.

**Status (2026-08-25): Phase 4A and 4B are deployed; the first bounded owner-local Phase 4C protected-Compute slice is also deployed and reset-gated in development and production at `onevar-platform` release `399c7deebe669b5eb684597087f0af637f243ceb`.** Phase 4A gives each protected span its own AES-256-GCM content key and opaque versioned reference, wraps content keys under a non-extractable identity-scoped AES-256-KW key, compiles exact owner-local bindings, and governs transient Reveal/Speak separately. Phase 4B registers only a versioned recipient ECDH public key, publishes safe exact requestable descriptors, creates durable owner decisions, locally rewraps the existing content key for an exact recipient-key version, stores only opaque ciphertext plus recipient wraps on the server, atomically consumes one-use grants, and decrypts only in the recipient worker. Phase 4C now compiles minimized numeric protected requirements into hash-pinned JPL, binds them to exact local protected IDs, executes only in the protected worker, and saves only value-free receipts. A live-model browser proof keeps an unrelated protected value unused, proves no protected/derived network or durable leakage, reuses the same exact binding on repeat execution, and rotates it after a replacement fact. Trusted-server/provider injection, protected workflows/schedules/effects, request notifications, multi-device recovery, recipient groups, segmented local protected ASR, and WebAuthn-at-use remain fail-closed. See [decisions 0068](../decisions/0068-browser-only-protected-span-sealing.md), [0069](../decisions/0069-exact-owner-local-protected-context-and-presentation.md), [0070](../decisions/0070-clean-recipient-specific-zero-knowledge-sharing.md), and [0071](../decisions/0071-minimized-owner-local-protected-compute.md).

- Add browser-only, server-ask, and server-preapproved Protected Asset modes; recipient-specific key wrapping; purpose-bound references; revocation; audit; and notification/approval flows.
- Seal each protected input span locally into its own versioned reference while retaining the ordinary spans and sentence order. One-use approval has one consumable use without a time expiry; timed grants use 15 minutes, 1 hour, 1 day, or forever. Request, use, Speak, and Reveal policies remain independent.
- Activate reviewed JavaScript adapters only in signed, isolated execution cells with explicit file, network, native, credential, and effect brokers; never install npm packages during an invocation.
- Activate target-first Entity Middleware only from a trusted canonical `extend` lineage with a current `use` decision at every node and an auditable first-response receipt.
- Version non-`none` ArrayLogic compensation as explicit inverse operations with independent grants, deterministic effect order, idempotency, and audit.
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
