# Cross-Layer Flows

This document describes intended responsibility boundaries. Exact endpoint names remain implementation details in the owning repositories unless promoted to a shared contract.

## Local ContextDB interaction

```text
Message or voice input
  → browser tokenization and signature matching
  → installed local Path
  → deterministic Essence query or mutation
  → local ContextDB
  → immediate answer or graph update
```

No `aws-api`, compute Lambda, provider, or OpenAI call belongs on this path. Refresh must reload persisted facts and installed Paths before the input is evaluated.

When policy permits sharing, the committed graph delta also enters a durable asynchronous publication outbox. That publication never delays the local answer.

## Continuous voice, text, and protected segments

```text
Hold a Transcribe control
  → one physical microphone feeds the sample-clock AudioWorklet
  → each pointer boundary closes one logical lane and opens the next at the same audio frame
  → ordinary PCM waits for release; protected PCM goes only to browser-local inference
  → moving left cancels capture and opens Message in the selected mode
  → final release assembles one sanitized input and executes once
```

Capture order, trust, and context identity are reserved by sample frame before either transcription path returns, so delayed recognition cannot move a word across the trust boundary or into a newer press. Those reservations also create the live-card slots; transcription events return the owning switch index and settle only that slot. Protected slots are masked at reservation time and retain no plaintext in presentation state. Ordinary segments are encoded and sent to `/transcribe` only after release. Protected segments are transferred to a browser-local Whisper/ONNX worker with no audio-upload fallback; local-model initialization and encryption may continue while ordinary capture resumes. Final release remains the barrier that waits for local protected inference and every Protected Asset. Protected speech is encrypted in the browser before the semantic worker receives its opaque reference. Its transient browser-local semantic form remains available for matching after all ordered spans are assembled. If that complete typed Path context disambiguates an isolated protected transcript, the browser rotates the same local-only asset to the contextual plaintext before graph execution; only versioned ciphertext reaches the server. Protected speech never enters the word map or model learning. The recent-input overlay shows only sanitized interaction records and exists only while Message is focused or a Transcribe control is held. See [decisions 0035](../decisions/0035-segmented-input-and-protected-use-policy.md) and [0043](../decisions/0043-sample-clock-voice-routing-and-local-protected-asr.md).

The microphone-start boundary interrupts delayed Automation, pending TTS synthesis, active Sound playback, and local `speechSynthesis` before capture. A slide-open Message panel stays pinned while Message or Transcribe is used and closes by X or an outside pointer action.

Protected-answer presentation remains device-local. An unexpired Speak or Reveal policy automatically applies when the worker returns a matching protected answer, including after page reload. The browser may re-fetch and locally decrypt only the matching envelope and presentation kind under that standing window; it does not extend the timer or authorize policy mutation, sharing, provider use, or server plaintext access. Message hides that policy's one-time button while the window is active; after expiry, the button again performs one direct, locally authenticated presentation without extending the stored duration. Any valid protected reference in the result keeps the masked answer, both dropdowns, and both one-time controls visible in the opened Message panel. Ask opens that panel and queues a fixed sanitized approval notice; Don't ask suppresses that notice without granting access.

## Protected access requests and notification fallback

```text
recipient encounters an ungranted opaque Protected Asset reference
  → Request Owner creates a pending access record but no grant
  → owner browser renders and acknowledges a durable request card
  → owner approves from a direct action
  → owner browser unwraps the content key and wraps it for the requester
  → Compute atomically stores recipient wrap + version-matched use grant
  → requester receives a durable approved/denied confirmation
```

If the recipient browser does not acknowledge a notification within one minute, delayed SQS processing may send one generic reminder to the account's verified, KMS-encrypted delivery contact. A per-user latch suppresses more email until browser pickup. Neither inbox nor email contains protected content or the request question. Delivery acknowledgement and request resolution are separate states. See [durable notifications](capabilities/durable-notifications.md) and [decision 0036](../decisions/0036-browser-acknowledged-notifications-with-latched-email-fallback.md).

## Local dynamic entity execution

```text
Path or entity middleware selects an authorized local function
  → trusted main thread sends a bounded request to `fileWorker`
  → worker loads the permitted entity bundle and executes dynamic script
  → worker returns structured data, transferables, or declarative output
  → trusted main-thread module validates schema, presentation, and effect authority
  → result renders or continues through command, automation, or entity middleware
```

The worker has no DOM authority, and dynamic entity or user-authored script source never executes on the main thread. HTML/CSS, navigation, communication, automation, and protected-asset requests are proposals until a trusted module validates and authorizes them. The current same-origin worker provides operational isolation, not a hardened malicious-code sandbox. See [File Worker isolation](capabilities/worker-isolation.md) and [decision 0024](../decisions/0024-dynamic-local-entity-code-runs-in-fileworker.md).

## Local entity publication and shared retrieval

```text
Local Essence mutation commits entities and relations
  → durable sync outbox records typed graph delta and policy
  → server idempotently creates/resolves entities and relations
  → server returns stable IDs, versions, and acknowledgements
  → browser persists local ↔ server identity mappings
  → authorized user/device queries or hydrates the shared graph
  → retrieved server entities become local queryable context
```

The active v1 contract publishes ordinary, non-protected relation components to participant-scoped server audiences. Compute verifies workspace ownership, resolves only exact unique public user handles, and returns authoritative IDs that the browser applies across its structured local state. Hydration reads only the authenticated principal's audience and maps that principal's server entity to local `speaker`. A public workspace also publishes current-speaker-connected components to its server-derived public profile audience. Before a named question executes locally, the browser may send the exact proper-person label for Compute to resolve and hydrate; it cannot choose the target principal or audience, and the remote user is not mapped to local `speaker`. Publication is asynchronous and retryable, so connectivity never delays a local mutation.

New publication compiles those synchronization records into canonical Words, entities/addresses, Context groups, links, versions, grants, and sharded projections before writing the retained Context compatibility sidecar. Hydration reloads canonical records and grants while dual-reading old sidecar-only data. Historical backfill, parity cutover, and sidecar retirement remain later work. See [distributed entities](capabilities/distributed-entities.md), [canonical indexing and Context compilation](canonical-indexing-and-context-compilation.md), and [decision 0026](../decisions/0026-sharded-canonical-context-publication-and-hydration.md).

An authorized cross-user lexical query follows a bounded address path:

```text
spoken term such as `cats`
  → exact word or compatible lemma candidates
  → compact word IDs
  → reverse word-to-entity/subdomain index
  → owner, relationship, version, and action-level permission filters
  → authorized traversal or aggregation
```

The word or lemma selects candidates only. It does not merge physical entities, users, meanings, or permissions. See [decision 0023](../decisions/0023-words-are-lexical-addresses.md).

## Request jurisdiction

```text
Utterance becomes a typed semantic intent
  → classify speech act and requested effect
  → bind target identity, scope, and authority
  → fact/query/correction: local Essence + ContextDB
  → exact behavior: reuse installed compatible capability
  → compound behavior: compose exact capabilities
  → broken declared behavior: repair owning Path/entity/platform layer
  → added behavior: fork or create child capability
  → no behavior owner: build a new root capability
  → material ambiguity: clarify
```

The classifier must emit a stable reason and effect class. A model may propose the route, but deterministic policy must reject authority escalation—for example, turning a local quantity delta into executable application creation. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md).

## New local semantic operation

```text
Input misses local Paths
  → browser extracts vocabulary-neutral token/syntax triplet evidence
  → gather bounded recent inputs/results, installed Path evidence, and relevant ContextDB
  → model independently adjudicates statement/question/command
  → model returns answer or intended graph writes, grounded historical repairs, and Path plans
  → browser recompiles selected versioned operations or validates declarative Essence transforms
  → isolated transaction replays every required historical repair and current Path
  → require graph rows to materialize and any question to reproduce the adjudicated answer
  → install and execute all passing Paths together, or commit none
  → later compatible inputs run locally
```

The model supplies general semantic reasoning during discovery, including grounded corrections to an incomplete graph. It does not directly write ContextDB and its answer is not shown until the local Path transaction reproduces it. Path-learning conflicts should be resolved at the family/alias/transform level. They should not automatically discard a valid deterministic mutation or route an ordinary graph query into external compute. See [decision 0012](../decisions/0012-llm-semantic-adjudication-to-locally-proven-paths.md).

## Confirmed Path promotion

```text
locally tested exact Path or family alias
  → Path Builder displays the originating sentence and proof state
  → authorized user explicitly confirms that exact equation
  → server revalidates the Path, origin, and local proof summary
  → retained shared foundation store records the exact artifact and provenance
  → every identity merges it during initial Path hydration
  → first canonical test reset purges legacy residue, then clears active identity data/Paths
  → later canonical resets skip the completed legacy purge
  → every reset preserves the confirmed foundation
```

Confirmation promotes wording coverage, not semantic authority. A confirmed alias keeps its own grammar and bindings and reuses the versioned semantic operation already compiled by the browser. Model output cannot confirm itself or supply a replacement executable transform.

Identity-scoped and foundation Path replication uses byte- and count-bounded idempotent batches. The API boundary preserves a sanitized payload-size rejection so the browser can split and retry it, and Compute persists both supported structural namespaces without taking ownership of browser-local v4 subpattern activation.

## External compute capability

```text
Input cannot be answered by local graph semantics
  → discover an approved capability contract
  → resolve explicit utterance bindings and authorized context
  → obtain protected-asset consent or reference when required
  → build or reuse a validated entity and JPL implementation
  → require every ordinary input used by a provider request, or resolve it from a non-null default
  → install tested compute Paths
  → invoke through aws-api and compute
  → validate typed output and render the answer
```

Capability revision preflight treats the candidate Paths as replacements for the same capability/entity identity. The browser keeps the current Paths executable while testing, excludes only those exact predecessors from collision scoring, and commits the replacement only after the original utterance and quality gates pass. The exact executed replay retains its browser-proven speech act across Edit's context reset; cold and unrelated examples still require classifier proof. Unrelated installed Paths remain collision evidence.

Discovery should happen once per missing reusable capability, not once per wording. Provider protocol knowledge should live in reusable, versioned entities or public templates rather than be regenerated in every end-user entity.

An EntityPlan request parameter that reads an ordinary operation input makes that input an execution dependency. The manifest must mark it required or provide a non-null default before the entity can be published. Provider research may strengthen a previously optional semantic input to required without changing its type or binding meaning; utterance-bound dependencies still require a clarification and an annotated learnable example. This prevents unresolved placeholders from becoming malformed provider calls.

If execution needs more than one value, clarification is one local invocation rather than unrelated messages. The browser and worker exchange a bounded continuation containing validated non-sensitive ordinary overrides, opaque Protected Asset references, and per-invocation approval requirement IDs. No plaintext secret may enter the continuation. Replay compilation may align a normalized date annotation with its equivalent explicit relative-day surface, and runtime normalizes that captured surface before provider execution. Intermediate clarification success is not provider-execution success and cannot publish Protected Asset linkage; publication waits for a typed compute result. See [decision 0034](../decisions/0034-compute-clarifications-carry-safe-continuation-state.md).

Background discovery and build responses use two distinct success boundaries: HTTP transport success and the nested Compute application result. A nested `ok:false` is a failure even when the API relay returned HTTP 200. Compute returns a sanitized code, stage, message, provider status when safe, and retryability; the browser may replace a failed background model job only within a small persisted bound. It must never convert a missing application result into an `UNKNOWN` build status or retry one terminal job indefinitely.

The API boundary also preserves intentional, sanitized Compute 4xx failures as bounded code/message envelopes. It does not collapse a validation or edit conflict into a generic connectivity 502, and it never forwards unrecognized or 5xx upstream details.

## Entity and Path repair

Before requesting repair, a browser-local question match is a guarded interpretation set rather than a recency-selected winner. Every compatible installed question Path is materialized and queried read-only against the same scoped ContextDB. A unique semantically distinct candidate that satisfies the answer contract executes locally. If no candidate is valid, the request enters required repair; multiple valid semantic candidates emit an explicit ambiguity whose bounded signatures, typed bindings, rows, and answers travel with the repair payload so the model can adjudicate and the browser can prove the resulting stitch. Syntactic specificity orders candidates but cannot make a learned role interpretation semantically authoritative.

A structurally matched Path that returns no answer contributes a separate failed-match record containing its request-time typed bindings. This record is repair evidence, not successful Path coverage. It crosses Transcribe, the worker repair bundle, API compaction, semantic routing, and the candidate tournament so a catalog route can compare the failed question role with exact executed roles in prior statements. The routed candidate still has no authority until browser-local ContextDB validation succeeds.

```text
current Path miss or empty-answer contract failure
  -> collect local syntax, recent inputs/results, Path bindings, and graph provenance
  -> model adjudicates the intended answer or graph mutation
  -> model identifies every grounded incomplete historical source and required relationship
  -> model proposes repaired historical Paths plus the current Path
  -> server preserves the complete adjudication and compiles catalog operations
  -> catalog-declared local-syntax plans may add typed alternative candidates
  -> browser recompiles catalog operations and validates every alternative
  -> isolated transaction removes old source effects and replays all repaired statements
  -> current Path executes against the repaired isolated graph
  -> require each declared graph row and the proof answer to be reproduced
  -> all required checks pass: persist/install both, retire superseded exact alias, replay live
  -> bounded automatic correction exhausts: commit neither and ask permission to open the failed message in Edit
```

The model proposes semantic operations, bindings, intended graph rows, and grounded repairs; it does not execute graph rows. A selected query's data-defined support contract may still identify a prior statement candidate, but it is not the only source of semantic stitching. Token coverage cannot substitute for semantic coverage. Optional paraphrase expansion never removes a required historical repair from this transaction.

The ordinary proof target is the independently adjudicated answer. When a catalog-declared supporting-graph route replaces a query role using exact executed binding equality—for example, the questioned actor binding equals the supporting statement's typed participant binding—the live browser-owned ContextDB answer is authoritative for that routed candidate. A model answer inferred from the superseded role must not poison its local proof.

An explicit local-graph classification stays in Path repair and is not evidence that a new external compute app is needed. An unclassified compute-eligible cold question first asks capability jurisdiction whether it requires external work, avoiding futile local compiler rounds. A build/reuse decision continues through Compute; `not_compute` marks the jurisdiction check complete and resumes the original local Path build exactly once. A legacy miss that reaches local repair first may make the same one-time handoff after exhaustion. Failed local repair still asks for consent to open the scoped evidence in Edit. Declining changes nothing.

Cross-predicate meaning is not supplied by a Path signature alone. A relationship-transition Path declares the observed transition plus the resulting state and reference predicates; the local semantic entity materializes those versioned rows, and ContextDB answers later traversals. Runtime code does not infer one verb from another.

Property questions can traverse a predicate variable: known subject -> any directly stored relationship -> kind-constrained object -> requested property. The Path fixes the requested property and object meaning while ContextDB binds the actual association. Answer-role grouping prevents unrelated repair candidates from redirecting this query.

Possessive syntax evidence separates the reference subject from the owned object's noun head. A semantic operation may declaratively bind those cells and the question projection to roles such as reference subject, object kind, and requested property. This produces a reusable capability shape; instance values such as a particular owner, object, classification, or color remain ContextDB data.

Classification is one ordinary example of adjudication and replay:

```text
Honda Civic is a car
  -> local syntax evidence: Honda Civic / is / car
  -> model adjudicates a grounded classification graph write
I have a red Honda Civic
  -> model adjudicates ownership, object identity, and color rows
What color is my car?
  -> model sees the classification and ownership graph, returns red as the proof target
  -> browser proves the query Path returns red locally
```

The vocabulary-neutral `contextdb.entity-classification` operation can implement the explicit classification, but no Honda, Civic, car, vehicle, or color branch exists in runtime code. If the supplied graph omitted a grounded relationship, adjudication may require a corrected historical Path. It cannot invent arbitrary user events, select among unresolved referents, or bypass local proof.

```text
User selects an entity, data item, or previous message
  → browser gathers the selected target plus related Paths and graph evidence
  → compute diagnoses entity, Path, context binding, or combined fault
  → model proposes strict structured patches
  → schema, safety, JPL, semantic, and isolated runtime validation
  → durable background job applies an authorized revision
  → regenerate or revise linked Paths
  → replay the selected example
  → publish sanitized result and diagnostics
```

The model should receive the relevant entity/JPL, manifest, original message, Essence, ContextDB bindings, captures, linked Path family, and failure trace. ContextDB facts are not rewritten merely because entity code needs correction; data changes require explicit scope and authorization.

## Capability reuse, repair, and fork

```text
Requested behavior is compared with permitted active contracts
  → exact contract: reuse definition with caller-scoped bindings
  → unchanged contracts needed together: compose
  → observed behavior violates an existing promise: diagnose and repair
  → requested behavior changes the promise: fork with explicit lineage
  → no contract owns the behavior: build a new root capability
```

A published repair creates an immutable compatible implementation release associated with unchanged contract semantics and passes linked Path and consumer tests before promotion. A fork leaves the source stable and receives separate Paths or routing. User-specific data, credentials, settings, and permissions attach through an installation or binding; they do not create a capability clone.

## Protected provider execution

### Trusted-server mode

The user deliberately permits a server-side broker to resolve and use a protected credential for an allowed provider and operation. The system enforces host, operation, owner, consent, audit, and output policies. This is encrypted and controlled, but not zero-knowledge.

### Local zero-knowledge mode

The browser asks a local companion runtime to execute an approved provider protocol. The companion decrypts the protected asset locally, performs the network request, filters or encrypts the result according to user policy, and returns only the permitted result. Platform servers never receive plaintext secrets.

The local companion is managed through the web experience; it need not expose a separate everyday UI. Sensitive approvals and terms are presented in the browser, while cryptographic use remains local.

### Recipient-specific local sharing

The creator encrypts one content payload and creates a separately salted key wrap for each authorized recipient/device. The server stores opaque material plus a separate version-matched canonical `use` grant. Recipient delivery returns only that principal's wrap for local decryption. Provider delivery lets a compatible entity inject the secret only into the policy-bound provider request and cannot reveal or manage it. A server executor wrap is optional and changes the trust mode. See [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md).

## Background work

```text
Browser submits idempotent operation
  → API returns a durable job id
  → queue/worker continues across Lambda invocations
  → browser polls or subscribes using the job id
  → worker checkpoints model response and validation stages
  → terminal result is applied once or returned with repairable diagnostics
```

Retries must not create duplicate entities, Paths, facts, provider charges, or protected-asset actions.
For entity revision, an identical resubmission whose earlier response was lost reconnects by revision hash to the existing job; a different revision cannot adopt that lock or job.

## Per-request model cost inspection

```text
Browser assigns requestId and a locally displayable label
  → every model response emits model-cost-trace v1 usage metadata
  → held speech preserves that identity through transcription and local Path execution
  → browser correlates transcription, classification, Essence, Path, and compute attempts
  → dated browser price catalog estimates input and output cost
  → expandable request row exposes every retry and the estimated total
```

The server is authoritative for sanitized token usage, model identity, and service tier. The browser is authoritative for correlation and presentation; it keeps this ledger in memory for the current session. Protected request labels are replaced locally with `[protected request]`. Neither the trace nor diagnostics may contain prompts, model content, hidden reasoning, protected data, credentials, or headers. The displayed amount is an estimate, not an invoice: regional uplifts, provider charges, and non-token tools require separate typed usage contracts.

Remote speech transcription is part of the same user request, not an untracked preflight. The browser allocates the request identity before posting audio, the transcription endpoint returns only sanitized model usage alongside the transcript, and the worker carries both into the final local Path result. A local Path hit can therefore have a non-zero transcription cost while correctly reporting no additional interpretation-model call.

Message normally renders only the Essence interaction. As a bounded recovery rule, it also mirrors a completed voice result that is explicitly classified as a question and contains a non-empty answer even when a mid-press slider transition labeled the result Convert. This exception does not admit Convert statements, drafts, or app-authoring output into Message.

## Versioned LLM request selection

```text
Message chooses original-v1 or new-v1
  → browser persists the preference and assigns it to the request
  → worker carries the same ID through classification and Essence
  → Path repair and compute requests forward the ID unchanged
  → each trusted server registry maps the ID to models and reasoning
  → background polling, retries, and replays retain the treatment
  → Cost labels the request and displays the actual returned models
```

The selector is not a raw model picker. Unknown or missing values resolve to Original. A template change affects only later requests; an in-flight request does not switch treatment. See [LLM request templates](capabilities/llm-templates.md) and [decision 0004](../decisions/0004-versioned-llm-request-templates.md).

## Scheduled entity execution

```text
Portal creates an entity-targeted recurrence in the user's time zone
  → compute persists the task and occurrences
  → EventBridge Scheduler wakes compute
  → worker selects the due occurrence and re-checks authority
  → normal parent/child entity execution runs once
  → result, retry, and audit state attach to the occurrence id
```

See [scheduled entity tasks](capabilities/scheduled-tasks.md).

## Account and protected-device enrollment

```text
Create account/group
  → verify email channel
  → enroll WebAuthn authenticator
  → generate device-held encryption/signing keys
  → register public material and key version
  → require a fresh assertion when protected-use policy demands it
```

The last step is an intended guarantee that is not yet complete in the current implementation. See [identity and encryption](capabilities/identity-encryption.md).

## Commanded interaction and media

An utterance becomes an Essence and Path transform; that transform may read or write ContextDB, invoke a registered command, change a menu state, enqueue an automation, schedule an entity, play sound, or begin a governed streaming session. All branches retain the same entity and authorization model. See [the interaction runtime](capabilities/interaction-runtime.md), [sound](capabilities/sound.md), and [streaming](capabilities/realtime-streaming.md).

## Entity email

Inbound or outbound email targets an entity identity, enters a channel-specific safety boundary, and then invokes ordinary entity/Path behavior. Consent, unsubscribe, suppression, rate, reputation, attachment, and retry rules are transport requirements around—not replacements for—the entity runtime. See [the email platform](capabilities/email-platform.md).
