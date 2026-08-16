# Intent Routing and Entity Evolution

**Status:** Implemented decision foundation with partial lifecycle adoption. Browser routing and Compute discovery now emit the versioned jurisdiction fields and distinguish reuse, repair, fork, and build. Immutable compatible releases, installations, promotion, dependency ranges, and all legacy callers remain incomplete.

Durable decision: [ADR 0005](../decisions/0005-intent-routing-and-entity-evolution.md).

Executable decision shape: [intent-jurisdiction v1](../contracts/intent-jurisdiction.v1.schema.json). Cross-plane adoption: [execution envelopes and governed interaction](execution-envelopes-and-governed-interaction.md).

## Core rule

> **Use the smallest existing authorized artifact that can satisfy the user's intent without changing its declared contract.**

This rule has two applications:

1. **Request jurisdiction:** decide whether the utterance is a data operation, a query, an invocation, a composition, or a request for new behavior.
2. **Entity evolution:** decide whether an existing capability should be reused, repaired within its contract, or forked because the requested behavior expands or changes the contract.

An LLM's ability to generate an application is not evidence that an application is the right artifact. Likewise, the existence of a related entity is not permission to change it.

## Separate data from behavior

The word *entity* covers several different forms in 1var. Routing must distinguish at least:

- **data entities and relations:** people, boats, purchases, ownership, quantities, observations, and other stored facts;
- **capability definitions:** reusable semantic contracts and implementations for behavior;
- **capability installations or bindings:** a user or organization selecting a capability, configuring permitted defaults, and connecting its inputs to their data or protected assets;
- **composite entities:** reusable arrangements of existing capabilities, Paths, presentation, and policy;
- **execution plans:** request-scoped orchestration that need not become a durable entity unless it is explicitly saved or validated for reuse.

Different users can therefore use the same capability definition without sharing the same data, credentials, settings, or authority. A user's facts belong to the user's authorized graph. The shared capability receives only the permitted bindings required for the selected operation.

## Request jurisdiction

### First classify the requested outcome

The system should classify the speech act and intended effect before considering entity generation:

| User intent | Correct owner | Default result |
| --- | --- | --- |
| State a fact, event, relationship, quantity, or correction | Essence + ContextDB mutation | Commit a typed graph transaction and publish it asynchronously when permitted |
| Ask about stored or derivable authorized data | Essence + ContextDB query | Query or aggregate the graph, using deterministic local operations when known |
| Invoke behavior already covered by an installed capability contract | Path + capability invocation | Bind inputs and reuse the active compatible capability version |
| Combine existing operations for the current task | Path/sequence/composition plan | Orchestrate existing capabilities; persist a composite only when reuse is intended |
| Request new reusable behavior that no contract supports | Capability discovery/build | Create one governed reusable capability, not one copy per user or wording |
| Report that declared behavior is failing | Diagnosis + repair | Repair the owning layer without expanding the capability contract |
| Request behavior outside an existing contract | Fork/extension | Create a child capability or composite and leave the original contract stable |
| Leave the target, effect, or authority genuinely ambiguous | Clarification | Ask the smallest question needed before mutation or execution |

### Paths route; they do not justify application creation

A signature recognizes a reusable language shape. Its Path transform identifies the typed operation, captured values, target-binding rules, and effect class. For a statement, that transform may emit an Essence graph mutation. For a command, it may bind and invoke a capability.

The Path does not turn every recognized verb into an application. It also does not own the user's data. It provides deterministic routing and binding to the primitive that owns the effect.

### Prefer the lowest sufficient effect class

The classifier should select among explicit effect classes such as:

```text
read.graph
write.fact
write.correction
invoke.local
invoke.external
compose
define.capability
repair.path
repair.capability
fork.capability
clarify
```

The selected class determines validation, authorization, idempotency, and audit requirements. A lower class must not be promoted to a more powerful class merely because generation is available. A request classified as `write.fact` does not get authority to create executable behavior.

## Boat example

### “I just purchased one more boat.”

The default interpretation is a completed acquisition event and an ownership change. It is not a request to create an application that increments arbitrary values.

The desired path is:

```text
utterance
  → statement signature captures actor, acquisition, asset type, delta, and time reference
  → Path emits a typed Essence mutation
  → bind “I” to the speaker and “boat” to the correct owned collection or category
  → commit one idempotent graph transaction
  → make the acquisition and resulting ownership immediately queryable
  → publish the permitted delta asynchronously
```

The durable representation should preserve the event when it matters:

```text
purchase event --actor--> speaker
purchase event --asset type--> boat
purchase event --quantity delta--> 1
purchase event --occurred at--> resolved time
purchase event --source--> original utterance
speaker --owns--> boat holding or identified boat
```

If the existing model stores only an aggregate quantity, the transaction may atomically increase that quantity by one using an expected version and idempotency key. Preserving the acquisition event is preferable because it retains provenance, time, correction history, and a basis for recomputing the total.

The system must not invent a unique boat identity. If the user later needs maintenance, registration, or individual tracking, it can ask for identifying details and connect a specific boat entity to the already-recorded purchase.

### Nearby utterances with different jurisdiction

| Utterance | Decision | Why |
| --- | --- | --- |
| “I own three boats.” | `write.fact` | This is a quantity assertion or snapshot. |
| “I just purchased one more boat.” | `write.fact` | This records an event/delta and updates ownership. |
| “How many boats do I own?” | `read.graph` | The answer is stored or derived from authorized ownership facts. |
| “Actually, that purchase was two boats.” | `write.correction` | Revise the identified event with provenance; do not silently add another event. |

When a change statement supplies one explicit numeric quantity, that value is the event delta. Context may identify the owner, item, or prior state, but must not reinterpret “sold 3 more” as a cumulative seven-unit event because a previous event recorded four. Aggregation belongs to the query or projection that consumes distinct events.
| “Add one to every dealer's available-boat count.” | Clarify or governed bulk mutation | The target set and authority must be explicit; use a general set-based mutation if one exists. |
| “Whenever a paid boat invoice arrives, add the boat to inventory.” | Reuse or `define.capability` | This asks for recurring event-driven behavior, not one fact mutation. |
| “Give me a button that adds a boat to inventory.” | Reuse, compose, or fork a UI capability | This explicitly requests reusable interaction behavior. |
| “Purchase another boat for me.” | `invoke.external` | This causes an external transaction and requires an approved capability, confirmation, and authority. |

## Capability identity across users

### Reuse the definition; isolate the context

Two users with the same semantic problem should normally use the same active capability definition when all of the following are compatible:

- operation meaning;
- required inputs and typed outputs;
- side-effect class;
- trust and protected-asset requirements;
- provider and policy guarantees that are part of the contract;
- compatible contract version;
- execute/use permission.

Each use supplies user-scoped bindings, configuration, and authorization. Credentials remain protected-asset references. User data remains in the authorized graph or request scope. None of those require cloning the capability definition.

A separate installation or binding is appropriate when the behavior is the same but a person or organization needs different defaults, presentation, provider account, policy, visibility, or input mappings. That installation should reference the shared definition through composition primitives instead of copying its JPL.

### Identity layers

The intended lifecycle distinguishes:

- **capability ID:** stable semantic identity for one declared capability contract lineage;
- **entity ID:** addressable artifact that contains an implementation or composition;
- **contract version:** immutable version of the inputs, outputs, effects, guarantees, and trust requirements;
- **implementation version:** repair or provider implementation compatible with a contract version;
- **installation/configuration ID:** user- or organization-scoped bindings and policy;
- **fork lineage:** explicit `derivedFrom` or equivalent relationship connecting an added feature to its source without changing the source.

Exact schemas remain to be formalized. The distinction is architectural: Paths and installations should not depend on a silently mutable behavior blob.

## Reuse, repair, compose, fork, or build

### Reuse

Reuse the existing capability when its active contract already promises the requested outcome. Different wording, different ordinary input values, and different authorized users do not create new capabilities.

Examples:

- “conditions in Boston” and “conditions in Denver” use one location-bound lookup contract;
- different teams use the same event-recording capability with separate team data;
- a user's own provider credential binds to the same protected-asset requirement.

### Repair

A repair restores behavior already promised by the declared contract. It does not add a new promise.

A change is a repair when at least one of these is true and the public contract remains unchanged:

- an implementation returns the wrong value, unit, shape, or error for a valid declared input;
- a provider endpoint or response mapping changed but the capability still promises the same operation;
- a Path fails to recognize a wording already represented by its semantic examples or binds a declared input incorrectly;
- authorization, persistence, idempotency, or rendering violates an existing invariant;
- tests reveal that the implementation never satisfied its active contract.

Repair the narrowest owning artifact:

- matching or capture defect → repair the Path family;
- input binding contract defect → repair the semantic manifest and linked Paths;
- JPL/provider/output defect → repair the implementation;
- cross-layer failure → repair the responsible platform primitive.

For a published or shared capability, a repair should produce a new immutable compatible version in the same capability lineage, pass contract and regression tests, and then be promoted. Existing clients should not observe an unversioned in-place mutation. A private draft with no dependents may be edited in place before publication.

### Compose

Compose when a result requires multiple existing contracts but does not change any of them. A one-time composition can remain request-scoped. A repeated or explicitly saved workflow can become a composite entity that references its components through `use`, `link`, `map`, `extend`, or other general composition primitives.

Semantic modularity does not require one network or process invocation per primitive. **Entity size is a semantic-contract concern; invocation count is an execution-planning concern.** A future planner may fuse pure local transforms, batch compatible reads, cache common results, and avoid duplicate work while preserving component identity, permissions, provenance, and effect ordering. It must never optimize across an authorization, protected-asset, transaction, or externally visible side-effect boundary.

### Fork

Fork when the requested behavior adds to or changes the declared contract. The fork receives a new entity identity and capability identity or explicit extension identity, retains lineage to its source, and uses composition rather than copying untracked logic.

Contract-changing differences include:

- a new operation;
- a new required input or output;
- a new externally visible side effect;
- a changed output meaning or semantic guarantee;
- a different trust boundary or protected-asset requirement;
- a new persistence or sharing behavior;
- support for a value/domain the source contract explicitly excludes;
- a change that would invalidate existing Path expectations or consumers.

Examples:

- If a weather contract declares arbitrary dates but tomorrow fails, repair it. If it declares current conditions only and a user requests forecasts, fork or compose a forecast capability.
- If a response promises Fahrenheit but emits Celsius, repair it. If a user asks to add Kelvin as a new output or preference not covered by the contract, fork it.
- If an event recorder promises pass events but writes the wrong player, repair it. If a coach asks it to generate private player clip packages, fork or compose that added capability.

An explicit feature request is permission to create an extension for the requester; it is not automatic permission to mutate a shared source. The source owner may later review, merge, or promote the fork as a successor after compatibility and dependency analysis.

### Build new

Build a new root capability only when no existing contract owns the requested behavior and the request is genuine reusable computation or interaction behavior. A new wording, new user, or new data value is not sufficient reason.

## Deterministic decision procedure

Models may propose a classification, but deterministic code should validate the final decision against typed evidence:

```text
1. Classify speech act and requested effect.
2. Resolve target identity, scope, and authority.
3. Prefer a validated local graph query/mutation when it fully represents the intent.
4. Search permitted capability contracts by semantic Position, then reload and compare their exact normalized contract fingerprints and manifests.
5. Reuse an exact compatible contract.
6. Compose exact contracts when the request is a compound arrangement.
7. If observed behavior violates an existing promise, diagnose and repair the owning layer.
8. If requested behavior changes the promise, fork from the closest compatible capability.
9. Build a new root capability only when no compatible owner exists.
10. Clarify when target, effect, or authority remains material and unresolved.
```

The decision record should include:

- normalized intent and effect class;
- selected target and bindings;
- candidate capability IDs and contract versions;
- contract comparison result;
- `reuse`, `repair`, `compose`, `fork`, `build`, or `clarify` outcome;
- human-readable reason code;
- authorization and protected-asset requirements;
- provenance back to the utterance and relevant graph evidence.

An illustrative decision for the boat statement is:

```json
{
  "kind": "intentJurisdictionDecision",
  "schemaVersion": 1,
  "speechAct": "assertion",
  "effectClass": "write.fact",
  "artifactDecision": "mutate_data",
  "reasonCode": "LOCAL_EVENT_DELTA",
  "target": {
    "subject": "speaker",
    "relation": "owns",
    "objectType": "boat"
  },
  "mutation": {
    "eventType": "acquisition",
    "quantityDelta": 1
  },
  "requiresClarification": false,
  "executableEntityCreated": false
}
```

This is a proposed contract shape, not evidence that the current browser emits it.

## Repair-versus-fork contract test

The system should compare the requested/observed behavior with the active contract:

| Comparison | Decision |
| --- | --- |
| Implementation differs from promised behavior; contract need not change | Repair implementation in the same lineage |
| Path misses or misbinds behavior already covered by the contract | Repair/version the Path; leave entity implementation unchanged unless separately defective |
| Only user data, ordinary input values, credentials, or settings differ | Reuse definition with separate bindings/installation |
| Several unchanged contracts are needed together | Compose |
| Inputs, outputs, effects, guarantees, trust, or supported semantic domain must expand/change | Fork |
| No related contract owns the behavior | Build a new root capability |

An LLM does not decide whether a change is a repair merely by labeling it a bug. The server computes a contract delta and rejects a repair that changes protected contract fields. Conversely, superficial JSON differences do not require a fork when the semantic contract remains identical.

An illustrative evolution result is:

```json
{
  "kind": "capabilityEvolutionDecision",
  "schemaVersion": 1,
  "sourceCapabilityId": "current_conditions",
  "sourceContractVersion": 1,
  "outcome": "fork",
  "reasonCode": "SUPPORTED_DOMAIN_EXPANDED",
  "contractDelta": {
    "operationsAdded": ["forecast_conditions"],
    "inputsChanged": ["date"],
    "outputsChanged": [],
    "effectsChanged": [],
    "trustChanged": false
  }
}
```

The source remains unchanged. The fork records lineage and receives its own compatible Paths or composite routing.

## Path compatibility

Paths should ultimately target a capability ID, operation ID, and compatible contract range rather than an unversioned mutable entity payload. A compatible repair can then be promoted without rewriting every Path. A fork has a different contract identity and receives its own Paths or explicit routing rules.

Wording growth is not automatically entity growth:

- new phrase, same operation and bindings → add/test a Path alias or example;
- corrected capture, same operation → repair the Path;
- new operation or meaning → fork the capability and build separate Paths;
- one phrase genuinely maps to multiple permitted meanings → use context/menu state or clarify rather than overwrite one mapping.

## Current implementation and gaps

### Existing foundations

- The browser distinguishes local graph candidates from compute-eligible misses and supports deterministic local query/mutation Paths.
- Compute discovery has `reuse`, `extend`, and `build` outcomes and exposes capability manifests with semantic inputs and outputs.
- A cold `not_compute` decision gets one local proof attempt; failure can re-enter Compute jurisdiction once with bounded local diagnostic evidence, preventing external-data requests from remaining trapped in local Path repair.
- Registry discovery admits active cross-owner definitions only through canonical `use` grants; execution rechecks governance and Protected Asset authority independently.
- Entity editing uses edit versions, authorization checks, structured patches, validation, and linked Path repair evidence.
- Capability manifests and registry entries carry capability and entity identifiers plus versions.
- Entity relationships and `map`, `extend`, `link`, `use`, and `substitute` provide composition foundations.

### Required work

- Define a versioned intent-jurisdiction decision contract and stable reason codes.
- Add first-class event/delta mutation semantics, idempotency, target binding, and correction behavior for statements such as “one more.”
- Define immutable capability-contract and implementation-version schemas.
- Replace ambiguous `extend` handling with an explicit repair-versus-fork contract diff.
- Add fork creation, lineage, installation/overlay, promotion, deprecation, and dependency-impact contracts.
- Add first-class installation/configuration records and exact semantic reranking; indexed capability candidate retrieval now exists for new/edited manifests, but existing definitions still need backfill and current reuse still lacks a durable installation record.
- Target Paths at compatible capability contracts rather than silently mutable implementations.
- Add composition planning and optimization without crossing permission or side-effect boundaries.
- Prevent capability discovery from receiving local fact mutations unless local repair has genuinely failed and the request has been reclassified.

## Verification scenarios

Tests should cover:

- snapshot facts, deltas, events, corrections, queries, recurring rules, UI requests, and external transactions using the same domain vocabulary;
- replay of the same mutation without double incrementing;
- ambiguous target, multiple collections, and denied mutation authority;
- two users reusing one capability with separate data, settings, and protected assets;
- a Path wording addition that does not fork the entity;
- an implementation failure that repairs within the same contract;
- a feature addition that creates a fork and leaves the source unchanged;
- a published capability with dependent Paths that cannot be silently edited;
- a compound workflow that preserves component permissions and effect order;
- fork promotion, source deprecation, rollback, and consumers pinned to earlier compatible versions.
