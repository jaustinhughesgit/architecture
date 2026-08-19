# Platform Model

## 1. System objective

1var turns human intent and protected or ordinary data into governed, reusable interactions. It is intended to let builders create the structured foundation once and let other users invoke it naturally through messages, voice, or other interfaces.

The platform is layered, but the layers are not isolated:

```text
voice or message
  → linguistic structure and reusable signature
  → validated Path
  → canonical Essence
  → authorized execution
      ├─ data query or mutation
      ├─ entity middleware invocation
      ├─ local worker execution
      ├─ command, menu, or navigation
      ├─ automation or communication
      ├─ governance operation
      └─ controlled API (`aws-api`) → entity/JPL/provider/persistence (`compute`)
  → validated response, reusable learning, or actionable diagnosis
  → browser rendering and future local reuse
```

The headless acceptance client (`testing`) enters at the controlled API boundary and exercises the same public API and Compute contracts without becoming part of product execution. It proves cross-layer behavior before the browser binds that behavior to presentation. See [headless acceptance testing](headless-acceptance-testing.md).

The long-term value is not any single answer. It is the reusable graph of capabilities, data, relationships, permissions, and interaction Paths that makes future answers immediate, composable, governable, and shareable.

## 2. Core primitives

### Entities

Entities are reusable units of information, behavior, presentation, or interaction. They can represent provider protocols, business processes, content, automation, UI behavior, organizational knowledge, or other capabilities.

An entity may be a hard stored asset, an executable asset, an interaction asset, a structural graph node, or a compute capability. Compute is one entity behavior, not the definition of an entity. Browser and server entities share this platform identity because permitted local entities are intended to publish into durable, addressable, governable server records. See [distributed entities and Context publication](capabilities/distributed-entities.md).

Entities can have parent/child lineage. Entity middleware v1 resolves one deterministic owning lineage from root through the selected target, authorizes `execute` at every node, invokes sequentially, and accepts only `pass`, `respond`, or `fail`. The first response or failure terminates the chain; cycles, ambiguous owning parents, and depth overflow fail closed. Retry is never implicit. The runtime contract is implemented as a Compute foundation; phase 10 owns adoption by the browser, `fileWorker`, and active Compute transports without changing their trust boundaries.

An entity may also expose a materialized output for a safe fast response, but it remains subject to the same current authorization. Cache keys, inputs, dependencies, freshness, invalidation, version, and permission scope must be explicit before that output can be authoritative. See [entity middleware, composition, and governance](entity-middleware-composition-and-governance.md).

### Entity relationships

`map`, `extend`, `link`, `use`, and `substitute` are general-purpose composition and control primitives. They are not assigned one permanent business meaning.

They may support many patterns, including provider protocol composition, onboarding experiences, education relationships, product catalogs, governed transactions, content reuse, or future patterns not yet known. Documentation and implementations should describe their mechanical semantics and constraints separately from example use cases.

Only owning `extend`/lineage edges establish middleware ancestry. `map`, `link`, `use`, and `substitute` remain non-owning so reference and reuse cannot silently acquire ownership, lifecycle, or execution authority.

### Words and lexical addressing

Words are inexpensive, shared lexical addresses; they are not entity identities. A word record can hold a compact word ID, its original form, and a normalized form with an exact normalized lookup index. Entities and subdomains reference that word ID while retaining independent identity, lifecycle, ownership, permissions, versions, and relationships. A reverse word-to-entity index makes a request such as “who has cats?” addressable without scanning every user's contextual graph.

**Product intent:** word records can grow into a lemma-ready lexical graph containing roots, inflections, aliases, language, and morphology. “cat” and “cats,” or “add,” “adds,” and “added,” may therefore reach compatible linguistic candidates without storing every sentence combination. A shared lemma must never merge entity identities or semantic senses. Paths, Context, entity type, relationships, and authorization still disambiguate the intended entity. See [decision 0023](../decisions/0023-words-are-lexical-addresses.md).

### Canonical persistence and derived retrieval

Words, entities, addresses/subdomains, groups, typed relations, versions, grants, capabilities, installations, and local/server mappings share one versioned logical persistence boundary. Physical DynamoDB tables and compact legacy attributes remain replaceable adapters. New server modules use the canonical persistence port rather than making a table layout part of their behavioral contract. See [canonical entity substrate](canonical-entity-substrate.md) and [decision 0025](../decisions/0025-canonical-substrate-behind-persistence-port.md).

Position, Search, embeddings, and RAG remain useful for bounded discovery across many users, but their postings are derived from a named canonical entity version and content hash. They can nominate candidates only. Exact canonical records and action-specific grants are reloaded before a candidate is returned, traversed, aggregated, or executed. A stale or missing retrieval posting may affect recall; it must never change the underlying fact or authority.

Entity-reference resolution is hybrid and ranks complete candidate paths rather than one matching label. Local ContextDB connections, resolved entities in the latest 20 exchanges, Path-scoped referent memory, current interaction context, authorized exact lookup, and Position/Search candidates contribute separate evidence. A question is the late fallback when the remaining candidates do not safely separate. For “John's house lights,” the candidates are connected `{John, house, lights}` paths, not every entity named John. See [decision 0041](../decisions/0041-path-scoped-referent-memory.md).

Compute capability discovery applies that rule with two deliberately different signatures. A canonical SHA-256 contract fingerprint identifies exact normalized contract content while excluding owner, entity address, lifecycle, release number, and timestamps. Sanitized semantic Position documents supply paraphrase recall across different human requests: one describes the full contract and bounded additional projections independently embed generalized command patterns, rendering declared placeholder names as ordinary words such as `wash my vehicle` without indexing the creator's example values. Search narrows the catalog; current manifest reload, implementation-policy validation, and a canonical `use` grant decide whether reuse is possible. Neither a generated capability label nor an embedding is entity identity. See [decision 0039](../decisions/0039-compute-contract-fingerprints-and-positioning.md).

### ContextDB

ContextDB holds the user's contextual graph: facts, relationships, properties, and referents used to interpret and answer requests. Its value is structured retrieval and composition, not merely storing message strings.

An Essence is a connected entity sequence expressed through ordinary language ownership and relationships. Each reached entity owns the connection to the next entity: Austin can connect to a cart, that cart to its shipping address, and that address to its state. The same rule applies to a cat named Bailey, a car named Shelly, a Sony stereo, an LG fridge, a bonsai named Ming, a person, a group, or another object. These are not special user fields; they are governed graph paths whose exact entities remain distinct.

Entity mention resolution separates canonical identity from grammatical surface form. Syntax-neutral aliases may remove a grammatical possessive or leading article when indexing and resolving a mention, while preserving every candidate for an ambiguous alias so resolution fails closed instead of selecting an identity arbitrarily. This normalization applies when new facts are stored and when an existing browser-local snapshot is loaded.

Successful resolution can become identity-scoped Path memory. A Path may retain a bounded array of canonical entity IDs and evidence for a semantic role plus normalized mention. Repetition validates and prefers that remembered entity locally; it does not turn the name into a global alias, copy the preference into a shared Path, or grant access. Recent resolved inputs and responses can temporarily break a local same-name tie, while explicit corrections count against the prior choice.

Remembered identity and data freshness are separate. An explicit named cross-user question can reuse the canonical entity ID to avoid another candidate search or clarification while still exact-refreshing that entity's currently authorized public component before local execution. Mention resolution treats the literal value reached through a name edge as data owned by the named entity, not as a second person candidate.

Data should preserve distinct subjects and properties. For example, an address may have street, unit, city, state, and postal-code facts connected to the correct person; it should not become one opaque value when the intent requires its parts. Queries must retain explicit referents such as “my” versus “my mom's.”

Repeated observations are distinct event identities even when their type and properties match. Aggregation counts or combines those event identities; it must not overwrite one event node or project a descriptive property as the count. A referential correction rewires the identified relationship with provenance rather than adding contradictory correction prose.

**Product intent:** ordinary personal context and the Paths that use it should be local-first so known questions can be answered immediately without a server or model call. Local-first does not mean local-only: permitted facts publish asynchronously as server entities and links so other authorized users and devices can retrieve them. Persistence, synchronization, backup, multi-device behavior, and cross-user authorization require explicit contracts and trust decisions.

A reusable Compute operation may declare a bounded ContextDB effect without acquiring the graph. After Compute succeeds with its separate typed response output, the browser resolves the spoken entity reference, proves one relation still has the manifest-declared current value, and applies the manifest-declared new value through ordinary local mutation operations. Presentation text is never used as graph state. Ambiguous or stale targets fail closed, and an already-applied replacement is idempotent. JPL access to governed server entities does not grant access to browser-local ContextDB. See [decision 0046](../decisions/0046-browser-applied-compute-context-effects.md).

When another user reuses that operation, the shared unit is the exact authorized Compute manifest, not the creator's Path or data. A mutating operation identifies its logical data dependencies by Compute entity/version/operation-scoped IDs. The new caller's Path may apply non-owning `using` composition from one such dependency to an exact caller-owned ContextDB property, subject, and relation ID after bounded word relevance and deterministic validation. When one browser-resolved invocation subject plus the manifest's declared transition identifies exactly one supplied relation, the installer derives those IDs directly; ambiguous graphs require a validated model selection of exact supplied IDs. Names explain why candidate IDs may correspond; they never become global aliases. Runtime then uses the pinned IDs and fails closed instead of searching for a same-name property. Temporary local entity and relation IDs are remapped in the installed Path when Context publication acknowledges canonical IDs. See [decision 0048](../decisions/0048-compute-installations-bind-entity-use-by-exact-id.md).

### Essences

Essences are structured semantic operations derived from utterances. They separate what the user means from the exact words used. Statement Essences can mutate ContextDB; question Essences can query it; other operations can invoke commands or compute capabilities.

Essence generation must retain required semantic distinctions: subject, property, quantity, location, time reference, ownership, negation, and other modifiers. Losing “tomorrow,” “my mom,” or a supplied location is a platform interpretation failure, not an acceptable simplification.

An explicit qualified owner must bind every ownership or change edge produced from that statement. A model-generated generic intermediate label must not detach the data from “North Store,” “Amy's team,” or another supplied identity.

### Convert requirements

Convert is an entity-authoring interaction, not an Essence mode. A user may divide one spoken creation or edit request into ordered requirement segments with explicit hard stops. Those segments form one versioned Convert requirement envelope and one final submission; the temporary gesture used to mark a boundary does not authorize Essence execution, Path learning, word indexing, or ContextDB reads or writes.

Compute discovery receives the ordered requirements and derives a semantic capability contract before validated generation. The browser also supplies a bounded `authoringContext` containing up to 20 non-protected recent inputs and their browser-proven Essence effects; it does not send a full graph snapshot, protected entries, or the broad fallback `relevantItems` payload. A bounded invocation phrase explicitly declared by the user remains an authoritative utterance example even when model discovery prefers a paraphrase; the browser must compile and test that retained phrase before readiness. Convert may derive a ContextDB input contract such as subject `speaker` plus property `register status` from the requirements and matching authoring evidence. It may also declare a bounded browser-applied effect when the requirements explicitly request a state change. A current value may demonstrate that the address is available or supply the effect's required precondition, but it cannot become an undeclared default or implementation literal. Deictic current-user forms such as “my,” “I,” `user`, and `current user` normalize to the canonical `speaker` subject. That subject is the address of the owned ContextDB connection, not another ordinary operation input: `my register status` resolves one status value and must not create a second required `user` value. Generated contracts canonicalize a model-confused deictic input to its non-deictic property value or discard a redundant model-added owner only when an existing speaker binding and deictic evidence prove the equivalence; explicit named inputs and non-deictic person values remain distinct. Convert authoring remains visible in browser presentation history without entering Essence or mutating ContextDB. Create and Edit share this requirement-composition primitive but use different lifecycle targets. Concrete runtime values remain browser-resolved typed invocation inputs. See [decisions 0038](../decisions/0038-convert-hard-stops-compose-requirements.md), [0044](../decisions/0044-semantic-answer-plans-precede-compute-contracts.md), [0045](../decisions/0045-convert-discovery-receives-bounded-ordinary-authoring-context.md), and [0046](../decisions/0046-browser-applied-compute-context-effects.md).

When the discovered contract is an unambiguous local input projection, the trusted compiler emits its response JPL without another model call. Real transformations, provider protocols, protected requirements, and ambiguous mappings remain typed EntityPlan work. See [decision 0042](../decisions/0042-local-data-jurisdiction-and-opt-in-compute-caching.md).

### Paths and signatures

Paths connect recognizable input structures to deterministic transforms. Signatures let wording that has already been understood run locally and quickly. Reusable Paths use typed slots and semantic families rather than memorizing only one literal utterance. Slot constraints are declarative grammar data: for example, a Path may exclude a leading modifier lemma from an item slot so a more-specific sibling Path can own that syntax without teaching application code the modifier or domain.

Typed bindings also own representation normalization. A numeric slot converts digits or written-number words to the same local numeric value before its Path materializes an Essence. A noun slot repairs capitalization introduced by segmented sentence transcription through lowercase lexical reanalysis, while graph lookup recognizes canonical singular/plural inflection aliases so older plural lemmas remain readable. These are vocabulary-neutral binding and retrieval rules, not item-specific Paths. A Path may explicitly map one capture to multiple semantic bindings, such as a stated quantity and its baseline delta, without encoding inventory or another domain in the runtime.

A compute Path may retain the resolved entity for a concrete qualified referent while keeping the shared capability generic. “What is Austin's register status report?” searches for the reusable “register status report” behavior, binds Austin's canonical ID to the Path's ContextDB subject, and passes only Austin's locally resolved status value into Compute. Repeating the same equation reuses and revalidates that ID before Search or clarification. The entity ID is invocation memory, not part of the capability signature or semantic Position.

The same Path is the installation boundary for a shared Compute entity. Spoken dialog and up to 20/200 ordinary recent/related evidence nominate a semantic match while the app's dependency IDs and the caller's selected graph IDs establish execution identity. Exact unique graph constraints are resolved deterministically; the LLM is not used merely to transcribe opaque IDs. Each user compiles and owns a new Path; no creator Path is loaded. A Path-scoped entity-use binding includes the exact Compute entity, version, operation, dependency, target property, target subject, and target relation. Similar names in unrelated applications therefore cannot cross-wire their data.

When a compute input genuinely remains unresolved, typed and remote-audio replies resume the same bounded clarification continuation before ordinary Path classification. A spoken scalar answer must not become an unrelated new command merely because it has no standalone Path.

Reusable recognition is compositional as well as structural. Pattern Schema v4 lets a Path reference a network of typed subpatterns for roles, relations, operators, projections, modifiers, and syntax. Compatible subpattern alternatives activate over the current sentence, unify their captures and declarative binding patches, and must cover every meaningful token before producing the ordinary Path match contract. The resulting Path still materializes a browser-local catalog-owned Essence or routes through an existing command, entity, or interaction primitive; subpattern activation has no independent execution authority. Generated sentence combinations belong in capability tests rather than becoming one persisted Path apiece. Pattern Schema v3 remains a supported migration format for families not yet expressed as a subpattern network. See [decision 0020](../decisions/0020-compositional-subpattern-capability-framework.md).

Question Paths keep canonical answer data separate from human-readable presentation. Every bundled answer-producing question operation owns a catalog response template, including quantity, event, property, activity, and relationship projections. After a local query succeeds, that template deterministically renders the Path's request bindings and proven query variables as a sentence. Hydration backfills blank templates on matching existing local Paths by exact bundled signature or versioned semantic-operation identity, preserves already learned presentation, persists locally first, and replicates through the normal Path boundary. This is a reverse presentation of the same proof, not another interpretation: the sentence is not converted back into an Essence or sent to a model, and it cannot introduce facts absent from the local result. See [decision 0016](../decisions/0016-path-response-sentences-from-local-proof.md).

Direct `{subject, property}` questions are a vocabulary-neutral foundation operation for both `my …` and possessive named subjects. Consulting capability jurisdiction does not suppress that local route; only an exhausted local repair may reclassify the request. Compute result caching is likewise explicit: only a positive cache mode and TTL with a future result expiry may reuse an answer. See [decision 0042](../decisions/0042-local-data-jurisdiction-and-opt-in-compute-caching.md).

If that presentation template is missing, the answer remains authoritative and the model may propose only a bounded template over the browser-supplied proven variables. Server admission, browser validation, and Path Builder persistence validation must all pass before the template is installed or used. The model never supplies the answer, graph query, or effect. See [decision 0017](../decisions/0017-missing-response-templates-use-locally-validated-llm-proposals.md).

Paths serve at least four roles:

1. Convert statements into structured Essence mutations.
2. Convert questions into structured Essence queries.
3. Bind natural-language values to entity or compute inputs.
4. Route commands and interaction behaviors.

Path building, editing, and repair must be able to consider the linked entity, relevant ContextDB structure, original and resulting Essence, observed captures, related Path family, and test result. Editing only an entity or only a literal signature often fixes half the system.

A model interpretation may supply an answer and explanation, but those fields are not a repair. Repair output must also contain a structured, replayable proposal transaction that the browser can compile and prove. When local testing finds a partial query projection with a failed join, its structured failure evidence must survive the correction round so the model can repair the current Path and any grounded historical source that produced the incompatible identity or graph shape.

For catalog operations with a published binding schema, the model's structured proposal is a Semantic Plan of grounded roles and source spans rather than executable binding mechanics. The catalog owns allowed sources and runtime value modes; the compiler owns dependency expansion, deterministic source policies, Essence materialization, and exact signature construction. Failures are assigned to interpretation, compiler, catalog, or local validation ownership. Only interpretation-owned failures are corrected by another model call. Essence and Path sequences remain the durable local execution and reuse boundary. See [decision 0019](../decisions/0019-semantic-role-plans-use-catalog-binding-schemas.md).

Paths route intent to the primitive that owns the effect; they do not turn every statement into an executable application. An ordinary fact, event, quantity delta, relationship, or correction should remain a typed graph mutation. A new executable entity is appropriate only when the user needs reusable behavior that no existing contract supplies. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md).

### Capability reuse and evolution

Different users should normally reuse one compatible capability definition while retaining separate data, bindings, configuration, permissions, and protected assets. A capability is repaired within its lineage when its implementation violates an unchanged declared contract. A request that expands inputs, outputs, operations, effects, semantic guarantees, or trust requirements creates a fork or explicit child composition so the source and its Path expectations remain stable.

Compound solutions may compose small purpose-driven capabilities without requiring one remote invocation per semantic unit. Execution planning may batch or fuse compatible pure work, but it must preserve component identity, provenance, authorization, protected-asset boundaries, and externally visible effect order.

### JPL and compute entities

JPL is 1var's sequential JSON action program for executable entities. The program is stored at `published.actions` and uses dependencies declared by `published.modules`. The surrounding entity bundle is not itself JPL; it can also contain structures such as blocks, functions, automations, menus, commands, calls, templates, assignments, mindsets, thoughts, moods, data, and compute-capability metadata.

JPL, Shorthand, and ArrayLogic occupy different levels of the creation and execution flow. ArrayLogic describes higher-level requested work, Shorthand composes or transforms entities through row-addressed operations, and JPL defines what an executable entity does when invoked. See [JPL, Shorthand, and ArrayLogic](execution-representations.md) for their definitions, examples, boundaries, and current implementation status.

Their definitive runtime semantics belong in future versioned specifications and schemas; until those are complete, generators must use validated examples, strict structured output, schema validation, isolated execution, and semantic contract tests rather than guessing JSON shape.

### Execution planes

1var has three related execution planes with different trust and scaling roles:

1. The **trusted browser main thread** performs reusable 1var interpretation, Path and Essence processing, ContextDB work, commands, navigation, authorization coordination, and rendering through trusted modules.
2. A **local `fileWorker`** executes dynamic entity or user-authored scripts away from the main thread. It has no DOM authority. It returns structured data, transferables, or validated declarative presentation and action requests for trusted main-thread modules to handle.
3. **Compute/JPL** performs authorized server execution, provider interaction, persistence, and shared capability work when the operation cannot or should not complete locally.

Dynamic entity script source must not be evaluated on the main thread. `fileWorker` currently provides operational and responsiveness isolation, not a hardened hostile-code sandbox: same-origin network access, dynamic compilation inside the worker, output validation, resource limits, cancellation, and presentation sanitization remain security concerns. See [File Worker isolation](capabilities/worker-isolation.md) and [decision 0024](../decisions/0024-dynamic-local-entity-code-runs-in-fileworker.md).

### Interaction runtime

Commands, menus, calls, automations, and sequences turn Path results and entity definitions into navigable experiences. They share a declarative command registry rather than forming separate one-off systems. A scheduled task controls when an entity begins; an entity automation controls ordered behavior within an interaction. See [the interaction runtime specification](capabilities/interaction-runtime.md) and [scheduled entity tasks](capabilities/scheduled-tasks.md).

### Browser capability modules

The browser also includes sound production and analysis and real-time audio/video streaming. These capabilities should be exposed to entities through scoped, versioned operations and must preserve the execution-plane boundaries above. See [sound](capabilities/sound.md) and [streaming](capabilities/realtime-streaming.md).

### Identity and communication

Account bootstrap, email verification, device-key enrollment, WebAuthn, protected assets, and email entity addresses connect identity to governed interaction. Enrollment is not the same as assertion-time hardware authorization, and anti-spam code is not by itself proof of deployed email compliance. See [identity and encryption](capabilities/identity-encryption.md) and [the email platform](capabilities/email-platform.md).

### Mindsets, thoughts, and moods

These are interaction-building primitives exposed through the front-end module system. **Product intent:** they can package reusable ways to interpret, navigate, extract, present, or act—for example, a mood that helps a builder capture a provider website's operational protocol. Their use is broader than provider integration and must remain composable with entities, Paths, data, and permissions.

Mindsets, thoughts, and moods are not architectural legacy. Individual implementations may require modernization, but these remain first-class entity authoring and interaction capabilities.

### Public/private and authorization

Visibility controls whether work is available publicly or remains private to a user, group, team, or sandbox. Authorization is more granular: use, set, edit, delete, delegate, and other actions may have different grants. `Use` covers the response boundary whether the system invokes a compute entity or returns a resolved value; older `execute` requests are normalized to `use`.

Public work can become reusable infrastructure or marketable templates. Private work supports sensitive and collaborative uses. Visibility must never be treated as a replacement for action-level authorization or protected-asset controls.

### Protected assets

Protected assets include API keys, financial details, personal identification, and other sensitive values. The architecture supports different trust modes rather than falsely labeling all server-side use zero-trust.

During held voice input, an ordinary/protected pointer crossing is the trust boundary. Middle-button audio capture begins provisionally at pointer-down; tap recognition may discard a provisional press but must not delay capture startup. One physical microphone track feeds a browser AudioWorklet continuously. Buttons 1–4 select four logical lanes. Entering protected commits immediately; leaving protected requires 100 ms of stable ordinary intent, and a return to protected within that guard cancels the exit. A committed crossing closes and opens lanes at the worklet's audio sample frame; changing trust does not stop and restart the microphone. The browser reserves segment order and context identity before transcription finishes, so asynchronous completion cannot reclassify a segment or attach it to a newer press. The live card projects those reservations as ordered slots before words are recognized: unresolved ordinary slots are visibly pending, protected slots are immediately masked, and a transcript callback can settle only its capture switch index. Protected plaintext never enters that display draft. Ordinary PCM may enter the declared server transcription route only after release. Protected PCM may enter only a browser-local speech worker and local inference runtime; downloading model/runtime artifacts does not authorize input-audio upload, and there is no remote fallback. If the local runtime is unavailable, protected speech fails closed. Final release waits for protected local transcription and encryption before executing the assembled sentence. See [decision 0043](../decisions/0043-sample-clock-voice-routing-and-local-protected-asr.md).

- A server-managed option may be offered with clear user consent and auditable controls.
- A true zero-knowledge option keeps decryption and use on a user-controlled device so platform servers cannot technically access plaintext.
- Recipient-specific zero-trust sharing encrypts locally and gives each authorized user/device an independent salted key wrap. An optional server-executor wrap is a different, explicitly trusted-server mode.

The current browser implementation's zero-knowledge claim is scoped to protected content versus 1var servers, transcription providers, and model hosts: they do not receive protected PCM or plaintext. The executing device, browser runtime, and delivered client release remain in the trusted computing base. A stronger claim against a malicious future web release requires independently verifiable client delivery and pinned/self-hosted inference artifacts; that hardening remains incomplete and must not be implied by “runs in the browser.”

A partially protected fact may keep its ordinary graph structure shareable while replacing the protected value with an opaque, owner-validated asset reference. That reference is request routing, not authorization or plaintext; use still requires a current grant and recipient wrap.

Entities should reference protected-asset requirements, not embed secrets. See `security-and-trust.md`, [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md), and [decision 0037](../decisions/0037-requestable-protected-context-markers.md).

## 3. Builder and end-user layers

1var serves multiple layers of participation:

- **Platform builders** improve reusable primitives, runtimes, contracts, governance, and creation tools.
- **Capability builders** compose entities, Paths, provider protocols, data contracts, moods, and permissions.
- **Organizations and teams** connect public and private work to their own data and processes.
- **End users** interact naturally without needing to understand the graph underneath.

The end-user simplicity is produced by structured work at the other layers. It should not be simulated by hiding unexplained failures or by repeatedly asking the model to rediscover known protocols.

## 4. Provider and headless interaction direction

Provider APIs and websites are an important proof of the general architecture, not a separate product bolted beside it.

A provider protocol can be represented using entities and lineage for workflow, Paths for natural interaction and binding, ContextDB for ordinary structured context, protected assets for credentials, JPL for controlled execution, public/private visibility for distribution, and authorization for governance.

**Product intent:** a builder may initially use a model-assisted, approval-driven process to understand a provider's forms, terms, endpoints, and outputs. The result should be a reusable, versioned protocol expressed through 1var primitives. Later users invoke the protocol without repeating discovery, while sensitive inputs remain subject to their selected trust mode.

## 5. Architectural invariants

1. A successful local Path should not require OpenAI, API Gateway, or compute.
2. A Path match must not discard captured ordinary inputs before entity execution.
3. An entity must not silently reinterpret missing inputs as supplied inputs.
4. Protected values must not appear in logs, prompts, diagnostics, Path signatures, or ordinary ContextDB facts.
5. Background work must have durable identity, idempotency, observable state, and bounded retry behavior.
6. Failed learning should not prevent safe execution or storage when an existing deterministic interpretation can do so.
7. Diagnostics should expose sanitized stage, contract, provider status, and observed data needed to distinguish Path, entity, provider, and platform faults.
8. Examples must test generalized mechanics; passing one literal phrase is not proof of a scalable fix.
9. A scheduled, emailed, streamed, automated, or worker-executed entity must retain ordinary entity lineage, authorization, protected-asset, and audit rules.
10. Operational isolation, encryption at rest, authenticator enrollment, and zero-knowledge are distinct claims and must not be presented as interchangeable.
11. A local entity and its server representation must be connected by durable identity, version, provenance, authorization, and synchronization state; a label is not an identity. A remapped temporary ID cannot be recycled for another semantic object, and server publication must reject incompatible principal-local ID reuse.
12. A recipient key wrap grants cryptographic potential, while a server grant authorizes retrieval. Both must agree before sharing works.
13. An ordinary data assertion or correction must not be promoted into executable entity creation when a typed graph transaction fully represents the intent.
14. A capability repair must preserve its declared semantic contract; a contract addition or change requires an explicit fork, child, or successor rather than silent mutation.
15. Reusing a capability definition must not merge users' data, configuration, permissions, or protected assets.
16. A destructive test operation must be authorized by the target server and scoped to an explicitly identified non-production environment; client confirmation alone is never authority.
17. A word, alias, or lemma can address entity candidates but is never itself proof of entity identity, ownership, meaning, or permission.
18. Dynamic local entity or user-authored script source executes in `fileWorker`, never on the browser main thread; worker output receives no authority until a trusted module validates and handles it.
19. Permitted cross-user facts should converge on the canonical entity, word, relationship, version, and access substrate. A synchronization sidecar may support migration, but it must not become an undocumented parallel ontology.
20. Every middleware node requires current action authorization; relationship membership, visibility, retrieval ranking, or a previous node's grant cannot authorize the next node.
21. Revoked or deleted canonical state wins over stale grants and materialized output. Lifecycle mutations require an expected version and append immutable, sanitized audit evidence.
