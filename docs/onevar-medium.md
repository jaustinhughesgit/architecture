# 1var in Fewer Than 2,000 Words

**Scope:** Medium product and architecture overview. For a shorter reminder, read the [small overview](onevar-small.md). For canonical specifications, status, contracts, and decisions, continue through the [architecture reading order](../README.md#reading-order).

## What 1var is

1var is a local-first platform for turning human language into durable, connected, executable, and governed digital assets.

People can use voice or messages to interact with five broad areas:

- **Data:** create facts, observations, quantities, events, corrections, and queries.
- **Logic:** invoke, compose, build, diagnose, or repair reusable capabilities.
- **Communication:** send messages, speak responses, use entity-addressed email, automate interactions, or participate in real-time sessions.
- **Navigation:** operate commands, menus, applications, calls, and contextual experiences.
- **Governance:** control who may read, use, set, edit, execute, delete, delegate, or share data and capabilities.

The goal is not merely to answer the current question. It is to preserve validated meaning and behavior so future compatible interactions become immediate, local, composable, and permission-aware.

## From language to execution

The deterministic runtime performs the relationship as:

```text
voice or message
  → immutable interaction evidence
  → exact, structural, or compositional signature
  → caller-local validated Path
  → browser-local catalog-owned Essence
  → authorized execution
      ├─ data query or mutation
      ├─ entity middleware invocation
      ├─ sequential ArrayLogic workflow
      ├─ local worker execution
      ├─ command/menu/navigation
      ├─ automation or communication
      └─ governance operation
  → response
  → reusable learning
```

A Sentence is the original human evidence. An Essence expresses the intended semantic operation independently of the exact wording. A Path connects recognizable language structure to a deterministic Essence transform or another authorized capability. These artifacts are browser-local and may differ between users even when they reach the same shared Compute operation.

Paths should be constructed from typed, reusable subpatterns for roles, relations, operators, projections, modifiers, and syntax. The platform should not need to store every possible sentence. Compatible subpatterns combine to recognize new wording while preserving semantic distinctions such as actor, ownership, quantity, time, destination, negation, and authority.

## Local-first intelligence

ContextDB stores the user's immediate structured context in the browser. A known statement or question should execute without waiting for Compute, API Gateway, or an LLM.

For example:

```text
“I have three cats.”
  → speaker
  → ownership or quantity observation
  → cat
  → quantity 3
```

The committed result becomes immediately queryable.

When wording or behavior is unfamiliar, an LLM can interpret the situation, explain a failure, propose a Semantic Plan, suggest a Path, or help build a capability. The LLM is not authoritative storage or execution. Its proposal must be compiled into platform primitives, tested against the local graph, checked for collisions and permissions, installed, and replayed. Once validated, later interactions should use the local Path instead of repeatedly paying for model inference.

Shared capabilities publish exact versioned manifests, operation and dependency IDs, Invocation Frames, tests, and effects. A receiving browser compiles its own Path from that evidence; it does not activate the creator's Path. A separate installation-owned Entity Use Binding applies `using` to connect one exact capability dependency to one exact permitted local entity or relation. Existing bindings, unique typed structural matches, and the generic sentence `For <capability>, use <local reference> as <dependency>` resolve most installations deterministically. An LLM is a bounded fallback that may select only supplied exact IDs.

This separation prevents two unrelated apps whose dependencies are both displayed as `current_status` from sharing data accidentally. Local Paths own wording-to-operation selection, installations own capability-to-data continuity, and exact typed ArrayLogic references connect one Compute result to a later Compute input.

## Words and entities

Words and entities have deliberately separate identities.

The Words table is an inexpensive lexical index. It stores a compact word ID, original display form, and normalized lookup form. It can evolve to include root lemmas, morphology, aliases, abbreviations, language equivalents, and other lexical relationships.

For example:

```text
cats   → lemma: cat  → plural noun
added  → lemma: add  → past-tense verb
adding → lemma: add  → progressive verb
```

A word or lemma connects related language, but does not automatically merge entity identity or meaning. Context and Paths distinguish ambiguous senses.

Entities are independently managed addressable assets. Multiple people may have separate cat entities connected to the same inexpensive `cat` word ID. A query can resolve “cats” once, use indexed word-to-entity addressing, apply authorization, traverse the relevant links, and aggregate the permitted results. Each physical entity retains its own identity, owner, group, state, relationships, permissions, versions, behavior, and presentation.

This supports efficient questions such as:

> “How many cats does everyone have?”

Here, “everyone” means everyone whose applicable data the speaker is authorized to query.

## The shared entity substrate

An entity is the common addressable unit for:

- hard stored data;
- people, objects, and relationships;
- executable behavior and provider protocols;
- applications and presentation;
- commands, menus, calls, and automations;
- communication;
- mindsets, thoughts, and moods;
- governance and protected-asset requirements; and
- compute capabilities.

Supporting components give entities their platform behavior:

- **Words** provide shared human and linguistic accessibility.
- **Subdomains** provide stable entity addresses, visibility, routing, and optional materialized output.
- **Groups** provide organizational, ownership, and access scope.
- **Links** connect independently addressable entities through typed relationships.
- **Versions** preserve changes and lineage.
- **Access grants** govern permitted actions.
- **Entity bundles** contain data, JPL, functions, menus, commands, calls, automations, templates, assignments, and presentation definitions.

The general composition primitives `map`, `extend`, `link`, `use`, and `substitute` allow entities and capabilities to be combined without copying or hard-coding one business domain into the platform.

## Entity middleware

Entities can form parent-and-child middleware lineages.

When a target entity is invoked, middleware v1 resolves one acyclic owning path from its root through the selected child. Every node reloads current `use` authority, then returns `pass`, `respond`, or `fail`; the first response or failure terminates the invocation. Non-owning `map`, `link`, `use`, and `substitute` relations do not silently become ancestors.

This permits behavior such as:

- a parent applying organization-wide authorization;
- another entity supplying shared presentation;
- a child handling a specialized request;
- a cached hard-data entity responding before compute is needed; and
- a fallback entity continuing the chain when earlier entities do not respond.

A successful compute result may be materialized into the entity's subdomain output. Later compatible requests can retrieve that hard response without repeating the computation. A mature version of this optimization must record the inputs, dependencies, version, permission scope, expiration, and invalidation rules associated with the cached result.

Middleware is not a workflow scheduler. It asks ordered handlers for the first authoritative outcome. ArrayLogic is the separate sequential workflow representation for running several exact Compute operations in order and passing typed results from earlier steps into later steps.

## Three execution planes

1var has three execution planes.

1. **The main browser thread** runs trusted, reusable 1var logic: Paths, Essence execution, ContextDB, commands, menus, rendering, audio, and coordination.
2. **`fileWorker`** runs dynamic local entity logic away from the main thread. User-authored scripts and entity functions execute there and return structured results, transferable data, declarative HTML/CSS, commands, automation steps, or presentation state. Trusted main-thread modules render and apply those outputs. Entity-provided scripts must not be evaluated on the main thread.
3. **Server Compute** runs authorized JPL, persistence, provider operations, durable jobs, server-side communication, and explicitly trusted protected-asset operations.

`fileWorker` currently provides operational isolation and responsiveness. Because it is a same-origin worker with dynamic execution and network access, additional capability scoping and protocol hardening are required before it should be considered a security sandbox.

## Sharing and governance

Local-first does not mean local-only.

After an ordinary non-protected mutation commits locally, permitted changes should enter a durable encrypted publication outbox. The server creates or resolves canonical entities, words, subdomains, groups, links, versions, and access relationships, then returns authoritative identifiers. The browser persists the local-to-server mapping and replaces temporary local identity where appropriate.

Other users and devices hydrate only the entities and relationships they are authorized to receive. Sharing must preserve source, provenance, version, visibility, action-specific permissions, and revocation.

The canonical governance decision uses the same `find`, `read`, `aggregate`, `use`, `execute`, `set`, `edit`, `delete`, `delegate`, `publish`, and `govern` vocabulary across entities and relations. Revoked or deleted state overrides stale grants. Lifecycle changes require the expected version and write the new state, immutable version evidence, and sanitized audit evidence atomically. Protected assets still require their additional cryptographic wrapping, consent, and execution-boundary checks.

The browser-to-server publication path retains its Context graph sidecar during migration. Its encrypted outbox, idempotency, server-ID replacement, participant/public-profile audiences, tombstones, and hydration remain active. New publications now compile canonical Words/entities/addresses/Context groups/relations/versions/grants and sharded lookup projections before writing that compatibility sidecar. Hydration reads and authorizes canonical records while including old sidecar-only data. Historical backfill, parity cutover, and sidecar retirement remain explicit later work.

Position, Search, embeddings, and RAG provide bounded candidate discovery over large populations. Their postings are derived from canonical entity IDs and versions and are safe to rebuild. They never supply fact identity or permission: canonical records are reloaded and action-specific grants applied before candidates are returned, traversed, aggregated, or executed.

Protected assets require explicit trust modes. Public capability definitions may declare that a credential or private value is required, but must not contain the user's secret. Local execution can provide a zero-knowledge option; server-side decryption or provider execution is a separate, explicitly trusted-server option.

## Reuse and evolution

Different users should normally reuse one capability definition while keeping their data, configuration, credentials, permissions, and presentation separate.

If an implementation violates its existing contract, repair it within the same capability lineage. If a request changes the promised inputs, outputs, effects, or trust boundary, create an explicit extension, composition, or fork. A new sentence, user, or data value does not justify creating a new application.

The result is a platform where everything people know and everything that works can become connected, addressable, reusable, and governed through natural interaction.
