# System and Entity Experiences

## Status and scope

**Product intent:** Inspector remains the default, general-purpose entity explorer.
People can install System Experiences and Entity Experiences, compose them from
small surfaces through full-screen experiences, and always retain the Sunburst.
Creators can grow these experiences through incremental statements rather than
having to describe a finished application in one request.

**Partial:** the bounded R0–R4 slice now has implementation and local tests;
[decision 0203](../decisions/0203-bounded-installable-experiences.md) records the
actual contracts, rollout controls and verification status. The broader release
sequence below remains the design target, not a claim of full migration. This
generalizes existing capabilities; the original website already had entity UI,
Compute, streaming and messaging. General creator-authored code, game simulation
and the R5–R7 workflow/media extensions remain proposed.

**Implemented / Partial / Unknown:** the source inventory below distinguishes
original implementations, verified clean replacements, and migration gaps.
Millions of users is a design target, not a measured capacity claim. Thousands
of datapoints must not imply thousands of workers, subscriptions or mounted apps.

The [implementation and migration plan](experience-platform-implementation-plan.md)
breaks this proposal into specific contracts, paid JPL serving and compact receipt
migration, user flows, release gates, scale profiles and rollback requirements.
Its phase gates distinguish implemented evidence from remaining product intent.

## One entity platform, two experience roles

- A **System Experience** arranges and coordinates a collection of entities and
  their experiences. A bracket, table, mission display, game board, or map is an
  example composition, not a privileged domain in the runtime.
- An **Entity Experience** supplies an entity's presentation and permitted
  interactions: a gauge, image, button, media surface, character, or richer app.
  It can appear inside Inspector, within another experience, or fill the available
  experience viewport. Size does not change its identity or authority.
- An **entity** remains the independently identified data, structural,
  presentation, interaction, or executable object. It does not become synonymous
  with a renderer or Compute operation. Experiences themselves are versioned
  entity-based definitions, and one data entity can have several presentations.
- An **experience instance** is one use of an exact experience release on exact
  permitted subject data. Instance identity is separate from both the definition
  and the subject. Displaying one entity twice must not duplicate its facts.

The roles share one contract family and host, not two marketplaces, databases,
execution systems, or incompatible installation formats. A package may expose
both roles. The role describes where a definition can be used, not its privilege.

## Reference example

The user-supplied Starship image illustrates a composition: a background camera
surface, numeric speed and altitude gauges, mission clock, orientation display,
and status indicators. The screenshot is visual reference only; it supplies no
verified live stream, telemetry API, synchronization contract, or distribution
rights. Do not scrape its displayed numbers into authoritative flight data.

A creator could assemble an equivalent arrangement from an independently reusable
media entity and instrument entities. The System Experience binds them to one
mission/session and arranges them. The same speed entity could have a small gauge
inside Inspector, a large instrument in the composed display, or a numeric table
cell. Each instance can expose its source through Inspector.

A map and characters use the same composition boundary, but movement, collisions,
multiplayer state, and persistence require explicit behavior contracts. Layout
alone is not a game engine.

## Migration inventory: preserve behavior, repair boundaries

The original website is behavioral evidence. The clean-room repository forbids
importing or copying its runtime modules. Extract general contracts and regression
tests, reuse clean equivalents, and migrate missing behavior through those
contracts. Do not replace working capabilities with domain-specific demos.

Source paths in this table are relative to the `1var` workspace. Original source
evidence does not itself establish deployed parity, security or scale.

| Capability | Verified evidence and status | Experience migration |
| --- | --- | --- |
| Entity UI and composition | **Implemented** original modular source: `aws/app/public/modules/_primary/index.js` loads blocks, templates, assignments, commands and functions; `_surface/index.js` renders HTML/canvas. Active Surface selects the first template/row. | Templates become versioned layouts, assignments become entity-experience placements, and blocks become exact dependencies. Preserve nested composition without eager unbounded recursion or a worker per entity. |
| Coordinates and rearrangement | **Implemented** older source in `aws/app/public/1var.js` and `vars.js`: coordinates, dimensions, z-order, grid span, slot moves/copies. **Unknown** full parity in the active modular renderer loaded by `main.ejs`. | Support constrained coordinates/grid/relative anchors and host-owned layers. Copying a placement references the same subject; it does not silently duplicate facts. |
| Local functions, commands, canvas/audio | **Implemented** original `aws/app/public/workers/fileWorker.js`, `_surface/index.js` and `_functions/index.js`; bitmap/audio transfers and command dispatch exist. Clean Compute/JPL and exact command authority are reusable foundations. | Migrate authored behavior through validated execution and bounded output channels. Raw HTML, ambient global input/network access and dynamic function compilation are not a safe clean-platform admission contract. A worker alone is not a security sandbox. |
| Presentation entity creation | **Implemented** original `compute/app/routes/parseArrayLogic.js` `appEntity` branch builds templates/assignments/functions/commands. | Preserve presentation as an entity role, independent of a mandatory executable root. Do not migrate its calculator-specific fallback as a platform primitive. |
| Live audio/video streaming | **Implemented** original Kinesis master/viewer client in `aws/app/public/modules/_streaming/index.js`, with presence/invites/provider operations in `compute/app/routes/modules/streaming.js`. | Preserve live sources and lifecycle. Replace per-viewer publisher connections for broadcast, globally keyed presence browsing, and browser AWS credential issuance with scoped provider adapters and distribution appropriate to audience size. |
| Conferencing | **Implemented and live-proven in development** clean two-person conferencing: `packages/contracts/src/conference.ts`, API provider adapter, browser `conference-call.tsx` and `conference-media.ts`. Broader production/multiparty reliability is **Partial**. | Expose existing authorized media sessions as composable entity surfaces. Do not build a second conferencing service or lose invitation, track-cleanup and token-lifetime proofs. |
| Messaging/notifications | **Implemented** original local command/answer UI, protected-request notifications and email mechanisms; clean ordinary exact-recipient relays and durable notifications also exist. General chat-room parity is **Unknown** in this audit. | Preserve each operation's recipient, consent, idempotency, acknowledgement and retention semantics. Local composer UI, email, ordinary relay and high-rate session messages are not interchangeable transports. |
| Entity execution/composition | **Implemented** original `compute/app/entityComposition.js` and `entityMiddleware.js`, with documented migration limits; clean capability/ArrayLogic/binding primitives exist. | Keep `map`, `extend`, `link`, `use`, `substitute`, owning lineage, data references and presentation placement distinct. Placement cannot confer execution or data authority. |

See [real-time conferencing](capabilities/realtime-streaming.md),
[composition and governance](entity-middleware-composition-and-governance.md),
and the current clean-layer guides for their exact implementation boundaries.
No application telemetry/data-channel implementation was identified in the
bounded streaming audit; that broader parity is **Unknown**, not proof that such
code never existed elsewhere in the original website.

## Definitions, facts, bindings, and state

Keep four independently versioned or scoped concerns distinct:

| Concern | Meaning and owner |
| --- | --- |
| Canonical facts | Existing governed entities, relationships, events, assets, and provenance. These survive view removal. |
| Experience definition | Immutable portable presentation, input requirements, declared actions, layout rules, and exact dependencies. Contains no creator-local data bindings or private records. |
| Installation and bindings | Current recipient license/use authority plus exact subject/relation/asset bindings. Installing a definition does not grant data access. |
| Instance state | Selection, camera, zoom, expanded branches, playback position, and other bounded per-session/per-user presentation state. Durable business/game facts use their declared canonical persistence contract. |

Meaningful displayed data remains traceable: a name and role can be shown together
in a compact entity surface while Inspector exposes their underlying facts.
Column, slot, layout, and role definitions can also be inspectable entities; a
presentation reference must not be mislabeled as a business relationship.

A placeholder is a declared slot with an expected input and an unresolved binding
or future dependency. It is not a fabricated team/person/value. Filling the slot
references an existing entity or explicitly creates one through ordinary validated
mutation; it never changes the slot's identity into the occupant's identity.

Interoperability requires shared, versioned meaning as well as shared storage.
Requirements refer to explicit types/concepts/relations, units, cardinality, and
provenance. Reuse compatible definitions; new concepts have inspectable contracts.
Explicit mappings can reconcile different contracts. Names or similar labels
cannot silently merge identities, choose bindings, or prove compatibility.

## Portable definition and composition proposal

An experience definition should declare:

1. Stable identity, immutable release, content hash, publisher/provenance and
   supported host contract version.
2. System/entity roles and entry points, including supported subject requirements.
3. Typed input/output ports, whether data is a snapshot or live signal, permitted
   units, missing/stale behavior, and exact dependency references.
4. A bounded scene using trusted presentation primitives and version-pinned child
   experience references. Cross-package dependencies retain their own release,
   compatibility, attribution and license checks; bundling does not grant resale
   or execution rights.
5. Layout constraints and responsive variants, plus supported compact/expanded
   presentations. A 50-by-50 display is a valid mode, not a requirement that all
   full-screen interactions remain legible at that size.
6. Typed interaction outputs handled by existing navigation, binding, command,
   Compute/ArrayLogic, media, and authorization coordinators.
7. Resource limits and lifecycle: start, suspend, resume, resize, unmount,
   revocation, failure, and cancellation.

Initial layout primitives should support parent-local coordinates, relative
anchors and offsets, row/column groups, dimensions and aspect ratio, clipping,
and background/content/foreground layers. Layout is presentation data: it cannot
grant ownership, create factual edges, run commands, or save business effects.

A pure compiler resolves layout before trusted rendering. Reject non-finite
geometry, missing anchors, cyclic constraints, invalid port types, unsupported
renderers, and node/depth/update budget overflow. Shared references are allowed;
unbounded recursive containment is not. Author-specified sizes cannot shrink
essential controls below accessible interaction requirements.

Start with trusted container, text/value, image-artifact, gauge, and child-instance
renderers, with inspect/open navigation actions. General action buttons must use
the existing typed execution path and explicit interaction authority. No arbitrary
HTML, CSS, script, network destination, portal, or global DOM access is implied.

New presentation primitives can be independently reviewed, versioned runtime
extensions. A fixed initial renderer vocabulary must not become a fixed list of
allowed business domains. The model proposes reusable definitions; deterministic
validation and runtime tests, not prose, decide admission.

## Trusted shell and Sunburst invariant

The host owns a permanent control plane. Experiences render in a separate clipped
stacking context below it. The Sunburst remains visible, keyboard-accessible and
pointer-operable above experience content, including foregrounds and failures.

The host publishes reserved geometry for the actual Sunburst/control footprint.
Layouts adapt to it so essential HUD controls are not merely hidden underneath the
wheel. Experience layers cannot select global stacking order, escape containment,
capture input over the control region, or enter the browser top layer themselves.

Full-screen means the complete experience canvas beneath the trusted shell.
Browser fullscreen, pointer lock, modal input capture, and media fullscreen require
separate host-owned policies and gestures; a child cannot bypass the shell.
Existing conference, Inspector detail/review, sharing and protected dialogs must
be audited and reconciled with this rule, preserving consent/focus semantics.
Native browser/OS prompts remain outside the application's stacking authority.

Inspector is the default and recovery surface. Preserve a user's explicit
navigation choices rather than silently resetting their data context. A visible
exit to Inspector must remain available even when an experience fails. Whether a
new browser launch restores a previous experience is a separate user preference;
installation alone never changes the default.

## Install and open are different operations

Reuse the existing signed marketplace, release, license, pricing, installation,
upgrade/rollback and revocation lifecycle. Add System and Entity discovery facets
to that lifecycle, not independent stores of unverified UI packages.

The current app contract requires a Compute root. Generalize the versioned entry
point to admit a validated presentation root as well as an executable root, while
preserving existing app compatibility. Do not invent a no-op Compute root for a
pure presentation. Review and provenance must be appropriate to the payload;
cryptographic signing alone is neither rendering admission nor code sandboxing.

Installing makes definitions available. It does not select a subject, switch the
System Experience, copy data, start media, invoke actions, or grant protected
access. Each installer creates fresh recipient-owned binding state, initially
unbound. Exact subjects resolve through explicit opening/binding under current
authority, never by inheriting the publisher's data or secrets.

Opening resolves an exact app/experience release, subject scope, selected entity,
compatible filters, and return context:

- Data first: select Falcons, choose an installed compatible experience, resolve
  its exact competition, then display that competition with Falcons highlighted.
- Experience first: choose the installed definition, then choose a compatible
  subject, a recent context, or an explicit creation flow.
- A spoken request enters the same typed navigation path; ambiguity clarifies.
- Switching to Inspector inspects the current subject. Back restores the prior
  session, including its camera and filters, subject to current authorization.
- Today's interaction lens is not a filter for matches occurring today. Transfer
  only semantically compatible filters, and show any target/scope change.

View availability follows actual requirements and current access, not names.
Inspector remains available; compatible installed experiences are offered for
the current scope. Other experiences remain discoverable with explicit missing
requirements. An unavailable dependency renders an inspectable failure rather
than inventing data. Revocation unmounts affected instances immediately and cannot
leave departing animation, caches, or bindings as authority.

## Incremental authoring

Existing ordinary fact statements continue through Paths, Essence, local proof,
Context mutation and publication. Adding a fact does not manufacture an app or
advance a presentation release. Experience-authoring statements change a focused
draft of the definition; activation follows validation and an immutable release.

For example, a creator can first add a subject and measurements, then place a
gauge, bind its value, anchor another display beside it, and choose a background.
Later edits extend the same draft/lineage. A large request proposes the same
bounded edits together. A correction to a data value is distinct from changing a
layout or a calculation. Unknown inputs and interpretations remain clarifications.

## Runtime scale and authority

The browser remains the trusted coordinator; existing local workers, Compute/JPL,
media/artifact brokers, persistence and permission systems retain their roles.
Rendering cannot become another graph writer or execution plane.

Live telemetry and synchronized video require sequence/time provenance, a shared
clock, freshness states, backpressure and bounded subscriptions. Separate durable
observations and deliberate checkpoints from ephemeral display samples. Do not
publish every frame into ContextDB or start one model/remote Compute call per frame.

Games additionally require a bounded simulation contract, input routing, resource
limits, suspension and cancellation, with explicit local versus authoritative
multiplayer state. Dynamic code cannot run on the trusted main thread. A worker
alone is not a hostile-code security guarantee; reviewed execution and restricted
brokers must independently establish network/storage/resource boundaries.

Protected plaintext stays in its authorized protected plane. Installing a scene
does not authorize camera/microphone, external media requests, asset downloads,
credentials, protected decryption, or provider charges. Media URLs are not
automatically trusted data bindings. Current source policy restricts media to
self/blob; broader live feeds require a separately reviewed delivery contract.

Visible/active instances receive bounded update budgets. Hidden instances suspend
unneeded rendering; shared sources use ref-counted subscriptions, not duplicated
fetches per gauge. A failed child is isolated from siblings and the control plane.
Removal/revocation tears down listeners, workers, playback, streams and input
capture owned by the departing instance without deleting independent canonical
facts. Release shared-resource leases; stop a shared source only when it has no
remaining authorized consumers. Losing a source grant invalidates every affected
lease. Removing one child must not terminate a sibling's still-authorized media.

### Separate durable records, live signals and media

1. **Durable facts and events:** canonical entities/relationships, retained
   measurements, results and deliberate checkpoints. Reuse existing mutation,
   idempotency and indexed Journal semantics; queries remain read-only. Access
   through another experience does not require copying records into its own blob.
2. **Ephemeral signals:** bounded latest-value or event channels with sequence,
   source time, freshness, loss policy and shared host subscriptions. Coalesce
   replaceable scalar updates; never silently drop consequential commands that
   require acknowledgement/replay. Interest follows authorized active scope.
3. **Media:** existing trusted session/source adapters own browser permission,
   provider tokens, tracks, decode and lifecycle. Experiences receive authorized
   presentation handles, not credentials or unrestricted network destinations.

The existing sync channel supplies value-free `sync_available` hints and bounded
account queues, not media or generic high-frequency data. Its current
`GetSyncDeltaRequestSchema` has no cursor despite the operation's name. Reuse its
visible-tab coordination and work coalescing; introduce explicit versioned query
invalidation/resume contracts rather than pretending cursor-based graph deltas
already exist. A gauge update must not refetch all account queues.

The Starship-style composition should share source/session timing without
duplicating video delivery per instrument. Interactive rooms and mass broadcast
need different provider distribution modes. Legacy publisher-per-viewer WebRTC
is evidence of streaming capability, not a million-viewer distribution design.
For games, simulation ticks, network updates, rendering frames and durable
checkpoints are separate clocks. Shared consequential actions require declared
authority, validation and interest scope, not merely an animated character.

### Current scale limits that the migration must address

These are **Implemented** bounds or source behaviors, not proposed targets:

- Ordinary Context accepts at most 2,000 entities, 4,000 relations and 4,000
  observations; API publication rejects over 300,000 JSON characters. The Dynamo
  repository reconstructs an owner's whole Context partition, and browser
  runtime commits rewrite the aggregate runtime record. Raising caps alone does
  not create a scalable query/update path.
- Journal already stores immutable observations as separate indexed local
  records. However, `journalRecords` currently calls `getAll` for an exact
  owner/app/subject/concept and then queries that history in memory. Growing
  history needs occurrence-time range indexes, bounded cursors and aggregates;
  not one entity/app per sample or repeated whole-history reads per widget.
- Inspector already has a bounded scene (96 total nodes). Keep that default;
  alternate views virtualize or project larger datasets rather than mounting
  every logical entity simultaneously.
- Existing marketplace concurrency/browser evidence proves bounded correctness,
  not million-user capacity. Hot-partition, provider quota, load and cost proofs
  remain release gates.

Evidence: clean `packages/contracts/src/context.ts`, API `service.ts`
`publishContext`, `dynamo-repository.ts` `findContextPublication`, browser
`context.worker.ts` `journalRecords`/runtime persistence, and Inspector
`scene-compiler.ts`. See [Indexed Journal](indexed-journal-entities.md) and
[canonical indexing](canonical-indexing-and-context-compilation.md).

### Proposed scale contract and evidence gates

Scale is part of the first host/data contract, not a final optimization phase:

- Every projection declares exact authorized scope, fields, page/range bounds,
  ordering and completeness. Cursors bind to authority, query and version;
  revocation is rechecked on later pages. Aggregates cannot claim complete totals
  from a truncated page. Protected indexes/aggregates cannot leak plaintext or
  broaden the existing protected execution plane.
- Query work uses scoped indexes and bounded records/bytes/concurrency. Avoid
  all-tenant scans and global hot partitions. Reuse the canonical indexing and
  publication design; add resumable partial projections without replacing the
  local-first snapshot path or silently widening its authority.
- Deduplicate selectors and source subscriptions across instances. Apply quotas
  per user/session/system and provider, batched worker updates, backpressure and
  jittered reconnect/backoff. Do not create a socket, poller, worker or model call
  per data item. Authorized public immutable definitions/assets may share caches;
  recipient-private data must not share cache authority.
- Virtualize lists, cull offscreen scenes, downsample charts and use level of
  detail. Bound mounted surfaces, expensive canvases/media, worker pools, message
  bytes, decoded assets and frame work. Suspend hidden visual work without
  accidentally ending an explicitly active call or other authorized background
  session. Transitions must not bypass these budgets.
- Budget values are device/provider profiles, not unmeasured promises. A proposed
  first benchmark profile uses 100 records/page, at most two concurrent pages,
  eight distinct active selectors, 32 mounted lightweight surfaces including
  overscan, two expensive surfaces, and 1,000 projected chart points. These are
  starting test inputs, not installed limits or a universal game/media policy.

Required evidence before capacity claims:

1. Device tests at current Context limits and 1k/10k/100k Journal records; 1,000
   logical surfaces with bounded mounted work; sparse/burst updates, desktop and
   low-end mobile. Record p95 input/scroll latency, long tasks, heap, worker
   messages, query work and bytes through mount/unmount/background cycles.
2. A service workload separates registered users, daily users, concurrent users,
   active publishers/viewers and per-source fanout. Model million-account scale
   plus hot-source/skewed access; do not assume a million accounts equals a
   million simultaneous sessions. Stage load against explicit latency, cost,
   error-rate and provider-quota budgets.
3. Correctness under concurrent pagination, mutation, expired cursors, revocation,
   reconnect/replay, slow consumers, shared-subscription cancellation and offline
   catch-up. Queues and catch-up work must stay bounded.
4. Failure isolation under child crashes, permission loss, media startup
   cancellation and reconnect storms. Inspector and Sunburst must remain usable.

Distributed or paid load tests require an approved environment and spend budget;
this proposal runs none and makes no production-capacity assertion.

## Verified current foundation and gaps

| Foundation | Evidence in `onevar-platform` | Remaining work |
| --- | --- | --- |
| Inspector default fallback | `apps/web/src/entity/main.tsx` surface initialization | Experience host/default preference; current alternate surfaces are remembered. |
| Immutable app and view reference | `packages/contracts/src/compute.ts`, `marketplace.ts` | View has identity/title only; required Compute root prevents pure presentations. |
| Signed portable installation | `packages/compute/src/marketplace.ts`, API marketplace service | Version payload admission/review/install/revoke for presentation roots and dependencies. |
| Exact local binding and composition | `packages/contracts/src/spatial-workbench.ts`, `packages/compute/src/spatial-workbench.ts` | General instance bindings, subject navigation and visual nesting; current workbench is bounded and ordinary-owned. |
| Signed presentation precedent | Sunburst contracts and browser package verifier | General host, unified lifecycle and new experience contract; do not duplicate specialized Sunburst routes. |
| Existing rendering | Inspector/Column/Timeline and app focus card | No general creator-authored renderer/layout registry. |
| Conference and recipient communication | Exact conference session/provider/media lifecycle; ordinary relay and durable notifications | Composable presentation/action adapters; preserve existing grants, cleanup and delivery semantics. |
| Indexed history and coordinated sync | Journal object store, visible-tab leader, value-free sync hints | Bounded time-range queries, typed invalidation/resume and shared signal subscriptions; not whole-history fetches per surface. |
| Shell layering | `os.css`, Inspector review/sharing, collective assets, conference dock | Some existing overlays cover or hide Sunburst; new invariant is not currently enforced. |

## Proposed delivery sequence

1. **One end-to-end foundation with scale budgets.** Version pure-presentation admission and
   existing app compatibility; signed install/remove; exact local bindings; safe
   System/Entity host; Inspector default/return; a composed image and numeric
   displays at compact and full-canvas sizes. Include bounded projections,
   instance/worker limits, shared leases and teardown in the first contracts.
   No fake Compute root. Prove with a neutral fixture plus a second unrelated
   domain using the same mechanics. Use clearly labeled fixture data, not
   fabricated live telemetry.
2. **Incremental composition and actions.** Focused drafts, validated coordinate
   and relative-layout edits, immutable revisions, discovery compatibility,
   governed typed buttons, dependency reuse and update policy. Expose already
   migrated conference and communication actions through their existing authority
   paths; do not reimplement the services.
3. **Streaming parity and synchronized signals.** Generalize existing media
   sessions/source lifecycle into reusable surfaces; migrate remaining original
   streaming behaviors with reviewed provider distribution, bounded indexed
   discovery, shared clock, subscription budgets, stale/offline states and
   teardown. Complete paged history/delta work before large live-dataset claims.
4. **Interactive simulation.** Reviewed bounded worker/runtime extensions, maps,
   input and animation; multiplayer/authoritative state is a separately proved
   extension, not an inference from rendering support.

Foundation acceptance must prove signature/definition tampering rejection,
creator-data exclusion, current license and data authority, safe rollback,
binding compatibility, duplicate presentations without duplicate entities,
cyclic/oversized layout rejection, no undeclared business mutations, paid/provider
operations, protected operations or authority expansion on open/resize, mobile keyboard
and pointer access, unoccluded Sunburst during overlays/failure, permission loss,
teardown, and exact Back versus Inspector navigation. Existing app marketplace,
worker lifecycle, Inspector, sharing, protected and conference regressions remain
required where the changed boundary touches them. Validated layout, authorized
read-only projection and declared reversible initialization are normal runtime
work, not prohibited execution. Media acquisition retains explicit user consent.

This is a proposed implementation sequence, not a completion or deployment claim.
