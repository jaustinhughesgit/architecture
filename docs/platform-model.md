# Platform Model

## 1. System objective

1var turns human intent and protected or ordinary data into governed, reusable interactions. It is intended to let builders create the structured foundation once and let other users invoke it naturally through messages, voice, or other interfaces.

The platform is layered, but the layers are not isolated:

```text
User interaction
    ↓
Browser interpretation and local execution (`aws`)
    ↓ only when local knowledge cannot complete the work
Controlled API boundary (`aws-api`)
    ↓
Entity, JPL, provider, and persistence execution (`compute`)
    ↓
Validated result, reusable learning, or actionable diagnosis
    ↓
Browser rendering and future local reuse
```

The headless acceptance client (`testing`) enters at the controlled API boundary and exercises the same public API and Compute contracts without becoming part of product execution. It proves cross-layer behavior before the browser binds that behavior to presentation. See [headless acceptance testing](headless-acceptance-testing.md).

The long-term value is not any single answer. It is the reusable graph of capabilities, data, relationships, permissions, and interaction Paths that makes future answers immediate, composable, governable, and shareable.

## 2. Core primitives

### Entities

Entities are reusable units of information, behavior, presentation, or interaction. They can represent provider protocols, business processes, content, automation, UI behavior, organizational knowledge, or other capabilities.

An entity may be a hard stored asset, an executable asset, an interaction asset, a structural graph node, or a compute capability. Compute is one entity behavior, not the definition of an entity. Browser and server entities share this platform identity because permitted local entities are intended to publish into durable, addressable, governable server records. See [distributed entities and Context publication](capabilities/distributed-entities.md).

Entities can have parent/child lineage. **Product intent:** invoking a child can execute the relevant parent lineage from the top parent through the selected child. This makes a lineage comparable to a composable headless experience rather than an isolated function call. Lineage order, parameter flow, failure behavior, and permission checks must remain explicit contracts as implementation matures.

### Entity relationships

`map`, `extend`, `link`, `use`, and `substitute` are general-purpose composition and control primitives. They are not assigned one permanent business meaning.

They may support many patterns, including provider protocol composition, onboarding experiences, education relationships, product catalogs, governed transactions, content reuse, or future patterns not yet known. Documentation and implementations should describe their mechanical semantics and constraints separately from example use cases.

### ContextDB

ContextDB holds the user's contextual graph: facts, relationships, properties, and referents used to interpret and answer requests. Its value is structured retrieval and composition, not merely storing message strings.

Data should preserve distinct subjects and properties. For example, an address may have street, unit, city, state, and postal-code facts connected to the correct person; it should not become one opaque value when the intent requires its parts. Queries must retain explicit referents such as “my” versus “my mom's.”

**Product intent:** ordinary personal context and the Paths that use it should be local-first so known questions can be answered immediately without a server or model call. Local-first does not mean local-only: permitted facts publish asynchronously as server entities and links so other authorized users and devices can retrieve them. Persistence, synchronization, backup, multi-device behavior, and cross-user authorization require explicit contracts and trust decisions.

### Essences

Essences are structured semantic operations derived from utterances. They separate what the user means from the exact words used. Statement Essences can mutate ContextDB; question Essences can query it; other operations can invoke commands or compute capabilities.

Essence generation must retain required semantic distinctions: subject, property, quantity, location, time reference, ownership, negation, and other modifiers. Losing “tomorrow,” “my mom,” or a supplied location is a platform interpretation failure, not an acceptable simplification.

An explicit qualified owner must bind every ownership or change edge produced from that statement. A model-generated generic intermediate label must not detach the data from “North Store,” “Amy's team,” or another supplied identity.

### Paths and signatures

Paths connect recognizable input structures to deterministic transforms. Signatures let wording that has already been understood run locally and quickly. Reusable Paths use typed slots and semantic families rather than memorizing only one literal utterance.

Paths serve at least four roles:

1. Convert statements into structured Essence mutations.
2. Convert questions into structured Essence queries.
3. Bind natural-language values to entity or compute inputs.
4. Route commands and interaction behaviors.

Path building, editing, and repair must be able to consider the linked entity, relevant ContextDB structure, original and resulting Essence, observed captures, related Path family, and test result. Editing only an entity or only a literal signature often fixes half the system.

Paths route intent to the primitive that owns the effect; they do not turn every statement into an executable application. An ordinary fact, event, quantity delta, relationship, or correction should remain a typed graph mutation. A new executable entity is appropriate only when the user needs reusable behavior that no existing contract supplies. See [intent routing and entity evolution](intent-routing-and-entity-evolution.md).

### Capability reuse and evolution

Different users should normally reuse one compatible capability definition while retaining separate data, bindings, configuration, permissions, and protected assets. A capability is repaired within its lineage when its implementation violates an unchanged declared contract. A request that expands inputs, outputs, operations, effects, semantic guarantees, or trust requirements creates a fork or explicit child composition so the source and its Path expectations remain stable.

Compound solutions may compose small purpose-driven capabilities without requiring one remote invocation per semantic unit. Execution planning may batch or fuse compatible pure work, but it must preserve component identity, provenance, authorization, protected-asset boundaries, and externally visible effect order.

### JPL and compute entities

JPL is 1var's sequential JSON action program for executable entities. The program is stored at `published.actions` and uses dependencies declared by `published.modules`. The surrounding entity bundle is not itself JPL; it can also contain structures such as blocks, functions, automations, menus, commands, calls, templates, assignments, mindsets, thoughts, moods, data, and compute-capability metadata.

JPL, Shorthand, and ArrayLogic occupy different levels of the creation and execution flow. ArrayLogic describes higher-level requested work, Shorthand composes or transforms entities through row-addressed operations, and JPL defines what an executable entity does when invoked. See [JPL, Shorthand, and ArrayLogic](execution-representations.md) for their definitions, examples, boundaries, and current implementation status.

Their definitive runtime semantics belong in future versioned specifications and schemas; until those are complete, generators must use validated examples, strict structured output, schema validation, isolated execution, and semantic contract tests rather than guessing JSON shape.

### Interaction runtime

Commands, menus, calls, automations, and sequences turn Path results and entity definitions into navigable experiences. They share a declarative command registry rather than forming separate one-off systems. A scheduled task controls when an entity begins; an entity automation controls ordered behavior within an interaction. See [the interaction runtime specification](capabilities/interaction-runtime.md) and [scheduled entity tasks](capabilities/scheduled-tasks.md).

### Browser capability modules

The browser includes operationally isolated entity execution through `fileWorker`, sound production and analysis, and real-time audio/video streaming. These capabilities should be exposed to entities through scoped, versioned operations. A Web Worker protects main-page responsiveness but is not, by itself, a hardened sandbox. See [File Worker isolation](capabilities/worker-isolation.md), [sound](capabilities/sound.md), and [streaming](capabilities/realtime-streaming.md).

### Identity and communication

Account bootstrap, email verification, device-key enrollment, WebAuthn, protected assets, and email entity addresses connect identity to governed interaction. Enrollment is not the same as assertion-time hardware authorization, and anti-spam code is not by itself proof of deployed email compliance. See [identity and encryption](capabilities/identity-encryption.md) and [the email platform](capabilities/email-platform.md).

### Mindsets, thoughts, and moods

These are interaction-building primitives exposed through the front-end module system. **Product intent:** they can package reusable ways to interpret, navigate, extract, present, or act—for example, a mood that helps a builder capture a provider website's operational protocol. Their use is broader than provider integration and must remain composable with entities, Paths, data, and permissions.

Mindsets, thoughts, and moods are not architectural legacy. Individual implementations may require modernization, but these remain first-class entity authoring and interaction capabilities.

### Public/private and authorization

Visibility controls whether work is available publicly or remains private to a user, group, team, or sandbox. Authorization is more granular: execute, use, set, edit, delete, permit, and other actions may have different grants.

Public work can become reusable infrastructure or marketable templates. Private work supports sensitive and collaborative uses. Visibility must never be treated as a replacement for action-level authorization or protected-asset controls.

### Protected assets

Protected assets include API keys, financial details, personal identification, and other sensitive values. The architecture supports different trust modes rather than falsely labeling all server-side use zero-trust.

- A server-managed option may be offered with clear user consent and auditable controls.
- A true zero-knowledge option keeps decryption and use on a user-controlled device so platform servers cannot technically access plaintext.
- Recipient-specific zero-trust sharing encrypts locally and gives each authorized user/device an independent salted key wrap. An optional server-executor wrap is a different, explicitly trusted-server mode.

Entities should reference protected-asset requirements, not embed secrets. See `security-and-trust.md` and [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md).

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
11. A local entity and its server representation must be connected by durable identity, version, provenance, authorization, and synchronization state; a label is not an identity.
12. A recipient key wrap grants cryptographic potential, while a server grant authorizes retrieval. Both must agree before sharing works.
13. An ordinary data assertion or correction must not be promoted into executable entity creation when a typed graph transaction fully represents the intent.
14. A capability repair must preserve its declared semantic contract; a contract addition or change requires an explicit fork, child, or successor rather than silent mutation.
15. Reusing a capability definition must not merge users' data, configuration, permissions, or protected assets.
16. A destructive test operation must be authorized by the target server and scoped to an explicitly identified non-production environment; client confirmation alone is never authority.
