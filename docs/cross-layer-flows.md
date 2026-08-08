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

The current browser synchronization libraries are disconnected from the active runtime, so this is a repair target rather than a completion claim. See [distributed entities](capabilities/distributed-entities.md).

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
  → gather bounded relevant history and graph evidence
  → model proposes a binding to a compatible semantic operation or a generalized Path candidate
  → browser recompiles any selected semantic operation from its installed versioned entity
  → isolated local validation tournament against current local ContextDB
  → install the tested required Path or retain inactive evidence
  → replay through the installed Path and only then execute/store safely
  → later compatible inputs run locally
```

Path-learning conflicts should be resolved at the family/alias/transform level. They should not automatically discard a valid deterministic mutation or route an ordinary graph query into external compute.

## Confirmed Path promotion

```text
locally tested exact Path or family alias
  → Path Builder displays the originating sentence and proof state
  → authorized user explicitly confirms that exact equation
  → server revalidates the Path, origin, and local proof summary
  → retained shared foundation store records the exact artifact and provenance
  → every identity merges it during initial Path hydration
  → hard test reset clears identity data/Paths but preserves the confirmed foundation
```

Confirmation promotes wording coverage, not semantic authority. A confirmed alias keeps its own grammar and bindings and reuses the versioned semantic operation already compiled by the browser. Model output cannot confirm itself or supply a replacement executable transform.

## External compute capability

```text
Input cannot be answered by local graph semantics
  → discover an approved capability contract
  → resolve explicit utterance bindings and authorized context
  → obtain protected-asset consent or reference when required
  → build or reuse a validated entity and JPL implementation
  → install tested compute Paths
  → invoke through aws-api and compute
  → validate typed output and render the answer
```

Discovery should happen once per missing reusable capability, not once per wording. Provider protocol knowledge should live in reusable, versioned entities or public templates rather than be regenerated in every end-user entity.

## Entity and Path repair

```text
current Path miss or empty-answer contract failure
  -> derive current answer and explicit typed-source requirements
  -> inspect catalog-declared query support contracts and surface incomplete matching Paths
  -> when declared, migrate a uniquely matched older supporting operation to the required graph contract
  -> select relevant supporting history by linguistic anchors + graph provenance
  -> identify the owning statement Path when stored evidence is incomplete
  -> model proposes repaired statement Path + current query Path
  -> browser recompiles both from installed semantic entities
  -> isolated transaction removes old source effects and replays repaired statement
  -> current query executes against the repaired isolated graph
  -> all required checks pass: persist/install both, retire superseded exact alias, replay live
  -> any required check fails: commit neither and return the failed layer/requirement
```

The model proposes semantic operations and bindings; it does not execute graph rows. A selected query's data-defined support contract can require a prior statement repair even when literal predicate comparison is impossible because predicates are runtime bindings. Token coverage cannot substitute for semantic coverage. Optional paraphrase expansion never removes a required historical repair from this transaction.

Cross-predicate meaning is not supplied by a Path signature alone. A relationship-transition Path declares the observed transition plus the resulting state and reference predicates; the local semantic entity materializes those versioned rows, and ContextDB answers later traversals. Runtime code does not infer one verb from another.

Property questions can traverse a predicate variable: known subject -> any directly stored relationship -> kind-constrained object -> requested property. The Path fixes the requested property and object meaning while ContextDB binds the actual association. Answer-role grouping prevents unrelated repair candidates from redirecting this query.

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

The creator encrypts one content payload and creates a separately salted key wrap for each authorized recipient/device. The server stores opaque material and access grants. A recipient authenticates, downloads the permitted envelope, and decrypts locally. A server executor wrap is optional and changes the trust mode. See [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md).

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

## Per-request model cost inspection

```text
Browser assigns requestId and a locally displayable label
  → every model response emits model-cost-trace v1 usage metadata
  → browser correlates classification, Essence, Path, and compute attempts
  → dated browser price catalog estimates input and output cost
  → expandable request row exposes every retry and the estimated total
```

The server is authoritative for sanitized token usage, model identity, and service tier. The browser is authoritative for correlation and presentation; it keeps this ledger in memory for the current session. Protected request labels are replaced locally with `[protected request]`. Neither the trace nor diagnostics may contain prompts, model content, hidden reasoning, protected data, credentials, or headers. The displayed amount is an estimate, not an invoice: regional uplifts, provider charges, and non-token tools require separate typed usage contracts.

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
