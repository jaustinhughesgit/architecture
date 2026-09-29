# Experience platform: implementation and migration plan

**Status: bounded R0–R4 implemented, tested and deployed to development.** Prepared
2026-09-28. [Decision 0203](../decisions/0203-bounded-installable-experiences.md)
and the [acceptance/evidence guide](../../onevar-platform/docs/testing/experiences-r0-r4.md)
record the bounded implementation, measured fixtures and actual rollout status.
The remaining phase text defines targets/gates, not a blanket implementation or
capacity claim. The subsequent **R5A conversational responsive presentation slice
is implemented locally, not deployed or live-model verified**; see decision 0204
and [the new test guide](../../onevar-platform/docs/testing/conversational-experiences.md).
It replaces manual templates/source forms with incremental voice/Convert authoring
and shared Inspector morphing. The remaining R5 domain behavior and R6–R7 remain
proposed. R0–R4's private signed installation and paid-code serving stay intact.
It covers System/Entity Experiences and paid marketplace JPL acceleration together.
The [architecture proposal](system-and-entity-experiences.md) supplies the governing
model; this document specifies implementation order, decisions and acceptance.

Reading guide: [storage and receipts](#4-paid-jpl-serving-and-receipt-migration),
[user flows](#5-user-flows-and-navigation),
[delivery releases](#8-ordered-implementation-releases), and
[decisions for review](#11-decisions-for-review-before-implementation).

## 1. What we are building

One entity platform with three complementary surfaces:

- **Inspector:** built-in default, general-purpose inspection and recovery.
- **System Experience:** an installed arrangement of entities, such as a table,
  bracket, organizational tree, mission dashboard or game board.
- **Entity Experience:** an installed presentation/interaction for an entity,
  usable as a compact surface, a child of a system, or a full-canvas experience.

The same entity can appear several times, at different sizes, without copying its
facts. Experiences expose inspectable bindings rather than private app-only data.
Creators grow a definition incrementally through statements and direct edits.
Sunburst stays visible and operable above every application-controlled surface.

Paid marketplace JPL receives a shared database serving copy and bounded memory
caching. S3 retains immutable package backing copies and large asset payloads.
This is a storage optimization beneath existing execution and licensing, not a
new execution engine, marketplace, payment system or general database service.

### Scope boundaries

- Reuse clean-platform capabilities and migrate original behavior through tests;
  do not import original `aws`/`compute` runtime modules into the clean monorepo.
- Preserve existing identities, licenses, facts, protected boundaries and local
  execution. No account reset or automatic bulk conversion of user data.
- Do not move all user data to S3: existing queryable Context facts are database-
  backed and Journal records are browser-local. Connected file/entity payloads
  that use S3 stay there; media/files and indexed facts serve different purposes.
- Do not claim a live SpaceX integration from the supplied screenshot. First
  proofs use labeled fixtures and authorized existing media sources.
- Multiplayer games, broad broadcast scale, arbitrary authored JavaScript and
  universal legacy feature parity are later, separately gated capabilities.

## 2. Verified starting point

This is the **pre-R0 inventory**. It is retained to explain the migration, not to
claim these gaps still exist. Decisions 0203 and 0204 are the current bounded
implementation record; the older manual R0–R4 UI is now historical.

| Current behavior | Consequence for this plan |
| --- | --- |
| Server capability invocation reads immutable JPL packages from S3; the S3 adapter has no process package cache. | Add a tiered implementation behind the existing artifact-store port. |
| Browser installations retain full verified packages in IndexedDB. | Do not add server dependencies to warm local execution; measure server execution separately from local opening. |
| Marketplace metadata and package descriptors are in DynamoDB. Install receipts also embed complete package bodies per installation. | Remove receipt duplication with a backward-readable compact receipt, separately from adding shared fast storage. |
| Existing app/portable contracts require a Compute root and at least one capability package. | Presentation-only experiences need a versioned contract and lifecycle change, not an optional UI label. |
| Original entity templates, assignments, functions, canvas/audio and streaming have source implementations. | Preserve their behaviors through general clean contracts; do not start a second app framework. |
| Clean two-person conferencing, recipient relays, marketplace licenses and protected execution exist. | Expose these through adapters with their existing authority and cleanup. |
| Inspector, Timeline and Column are product source; Tree/Family/Bracket are POC fixtures. | Migrate real surfaces first; promote POC behavior only with genuine data contracts. |
| Production Inspector double-click currently expands context; the requested POC double-click collapses descendants. | Include an explicit gesture migration, not a claim that they already match. |
| Context reads/publication are bounded snapshots; Journal currently loads a whole subject/concept history. | Add bounded read projections and indexed paging before multiplying surfaces. |
| Existing image hosting is not a general capability of ordinary artifacts, which currently support text/PDF. | Admit image bytes/MIME/dimensions/delivery explicitly; a new image renderer alone is insufficient. |

Current source evidence is indexed in section 12. All fields and paths labeled
“proposed” below are design targets, not existing APIs.

## 3. Contract decisions

### 3.1 Preserve distinct identities

| Object | Proposed identity/binding fields | Responsibility |
| --- | --- | --- |
| App release | Existing app/release identity plus versioned entry points and artifact descriptors | Portable installation, signature, review, dependencies, commercial terms |
| Experience definition | Definition ID/version/hash; System/Entity entry points; typed requirements; scene/layout; declared actions; resource profile | Reusable presentation and interaction, without recipient data |
| Installation | Existing recipient installation/license plus selected exact releases | Availability and current use authority, not data access |
| Binding | Installation/instance + input-port ID + exact source entity/relation/collection/version policy | Connect presentation to currently authorized data |
| Instance/placement | Instance ID + exact definition + bindings + parent/layer/layout | Multiple presentations of the same entity without identity duplication |
| Navigation session | Experience/install/release + subject scope + selected entity + compatible filters + return state | Open-on-data, Inspector switch, Back and recovery |
| Draft | Base release/revision + validated typed edits + local preview | Incremental creation without mutating an installed release |

The first contracts should name source kind, exact owner/scope, value type, units,
cardinality, freshness and missing-data behavior. A text label is not a schema or
permission. Cross-experience use of Journal data binds the original owner/app/
subject/concept scope; it must not copy records into the consumer app's namespace.

### 3.2 Version the package boundary

Introduce a new discriminated app definition supporting presentation, executable,
or combined entry points. Pure presentation can have zero executable dependencies
but must have an admitted presentation artifact. Existing executable references
remain unchanged; do not manufacture no-op JPL to install a visual app.

Update local bundles, portable definitions, signer/verifier, review, provenance,
install response, library synchronization, upgrade/rollback, removal and revocation
together. A package may expose several compatible entry points under one purchase.
Child dependencies pin exact immutable releases and retain their own license rules.

Presentation artifacts reuse the storage/delivery infrastructure with their own
strict artifact-kind validator; they are not parsed as JPL capability packages.
Generalize the typed artifact boundary explicitly when adding them. A paid visual
definition can use the same bounded serving policy without acquiring a fake
executable root. Images/media remain separate asset payloads, not inline code.

Verify old signatures against original bytes before translating into an internal
common model. Never rewrite a v1 signed payload and call it the same release.
Old clients must receive a clear minimum-host-version requirement for unsupported
new packages; they must not partially install a definition they cannot validate.

### 3.3 Keep execution and data separate from rendering

Trusted built-in renderers consume validated projections. Dynamic code remains
in an admitted worker/Compute execution plane. A button declares a typed action
reference; it cannot contain an arbitrary command, script, URL or grant.

Placement changes do not modify business facts. “Set speed to 100” is a governed
data operation; “make the speed gauge larger” changes presentation. Ordinary
facts continue through Paths/Essence and current mutation proof. Known local
actions must remain local without a model request.

## 4. Paid JPL serving and receipt migration

### 4.1 Serving policy

Use one complete, validated content-addressed capability package per hash. Keep
its JPL, required manifest and integrity envelope together, rather than creating
a separate executable fragment that can drift from the approved package.

The expected 4–40 KB JPL size is the product owner's estimate, to verify in the
baseline; whole package size includes metadata. The database item ceiling is a
guardrail, not the reason to reject this architecture.

Proposed eligibility is a successfully published, approved marketplace release
whose signed installation price or maximum invocation price is positive. Its
verified dependency closure can be promoted too. Derive this from release policy,
not from the amount paid for one discounted/zero-charge upgrade. Test-currency
promotion is enabled only in isolated test configuration.

Paid eligibility does not alone bound storage. Require publisher byte/version
quotas and publication rate limits. Keep the active release plus a configurable
rollback set accelerated; older valid releases remain recoverable from S3.
Do not silently introduce a new customer fee in this storage release. Attribute
cost through existing metrics; any new hosting price requires a separate decision.

### 4.2 Proposed storage shape and load sequence

Extend `CapabilityArtifactStore`, retaining its exact-hash interface. Add a
database artifact adapter and a bounded process cache, not a second loader in
the Experience host. The physical table/key layout stays inside the adapter.

Candidate database key: `caphot#<contentHash>` / `v#1`. Immutable fields: storage
format version, hash, canonical package bytes, byte count and creation evidence.
Keep mutable promotion/retention eligibility separate from signed package bytes.
One row is shared across installations; user input, bindings, credentials, output,
license state and mutable “latest release” pointers do not belong in it.

Server flow:

1. Validate current actor, exact release/operation, installation/license and
   authority using existing policy. A cache hit never substitutes for this.
2. Resolve the exact content hash from the verified descriptor.
3. Read verified process cache; otherwise the eligible database copy; otherwise S3.
   Known free-only S3 packages should not incur a needless database miss.
4. Verify exact descriptor/hash agreement, then return isolated immutable data to
   the existing runtime. Coalesce concurrent loads of the same hash.
5. Execute against fresh authorized inputs through existing JPL/provider brokers.
   Preserve current pricing and idempotency; rendering or a code-cache hit does
   not independently create a billable operation.

Initial cache test profile: at most 32 MiB of serialized verified packages and
1,024 entries per process, both enforced; measure actual heap overhead and tune
for runtime memory. Cache parsed immutable code only; never share invocation
scratch state between users. This is per process, not a globally shared guarantee.

Publish to S3 first using the existing immutable write and validation. Commit the
marketplace release, then promote idempotently with retry/reconciliation. A failed
promotion leaves a valid release using S3; it must not roll back a completed sale.
Avoid scanning listings on each invocation. Database miss/outage uses a bounded
timeout and verified S3 fallback; corrupt bytes trigger an integrity alert and
cannot execute. Any recovery copy must independently match the same exact hash.

Keep package size admission below the actual database item ceiling including
attribute overhead. An unusually large package stays S3-backed; do not create
multi-item code assembly just to handle an exception in the first release.

### 4.3 Remove per-install package duplication

Today `marketplace-repository.ts` stores the entire install response in its
idempotency receipt, including full packages. This is not an intentional shared
code store and scales with installations rather than distinct releases.

Add an internal version-2 receipt containing:

- original listing, signed release, license, installation and transaction data;
- ordered exact package descriptors instead of package bodies;
- receipt schema/version and original idempotency identity.

Keep the public install response unchanged initially. Replay hydrates those exact
packages through the tiered loader and reconstructs the original response. Never
substitute today's release, repeat a purchase, issue another license or reorder
dependencies. Missing package bytes cause a retryable delivery failure, not a
second financial operation.

Rollout is dual-read, new-write: accept old inline receipts, write compact receipts
only after readers ship. Backfill old receipts in bounded batches with conditional
writes, verifying package hashes and archival availability first. Retain originals
until replay parity is proven. Do not garbage-collect archives needed by receipts.

Existing install receipt replay happens after session validation but before fresh
listing/license checks. Preserve historical replay semantics in this storage-only
change; a historical receipt is not fresh invocation authority. Any stricter
post-revocation download policy requires an explicit contract decision.
Upgrade currently lacks this exact install-receipt mechanism: test its retry and
billing behavior separately and make any shared upgrade receipt an explicit
follow-on, not an assumed benefit of this migration.

### 4.4 Lifecycle and result-cache rules

- Paid/free transitions affect new release eligibility, not old signed prices or
  old user rights. Existing shared bytes may remain cached until retention policy
  evicts them; serving location never changes authorization.
- Delisting is not automatically revocation. Preserve existing policy for already
  installed releases; suspended/revoked/refunded authority must still deny use.
- Revoking one listing must not remove a dependency another authorized release
  still uses. Eviction is a resource decision, not the security mechanism.
- Cache rollback targets by hash, never by a mutable listing name.
- Do not migrate the original single `subdomains.output` field as a general answer
  cache. It lacks complete input/version/freshness scoping. Keep execution receipts,
  retained facts and reusable response caches distinct.
- A later result-cache contract must be opt-in for safe read-only computations,
  include inputs/source versions/permission scope/expiry, and never suppress a
  required side effect. Protected output must remain in its existing trust plane.

## 5. User flows and navigation

### Current conversational flow (R5A source, not yet deployed)

1. Create ordinary facts through the existing Essence flow. Inspector remains
   the default, with the same graph and camera throughout presentation changes.
2. Open **Experiences → Create with voice**. Use ordinary voice or Convert text
   to describe one small change; there is no Dashboard/Table template picker,
   coordinate editor, source dropdown or artifact-ID form.
3. The adviser receives bounded candidate labels/types and symbolic keys. The
   browser retains the exact source map, proves current identity/type/revision,
   compiles responsive geometry, and previews the same entities in place. Missing
   or ambiguous sources ask a question; nothing invents data to satisfy a layout.
4. **Describe a change** continues the same draft. Node selection can ground
   “this”; a mobile request adds constrained layout/flow intent, not a second app.
   Resizing and opening a saved definition use deterministic, model-free layout.
5. **Undo preview** reverses a staged edit. **Save experience privately** (or
   ordinary Convert “save experience”) publishes/installs through the original
   signed private free flow. Editing one's private free release advances its
   version; editing another release forks a private app. Bound facts are never
   embedded in the portable definition. Unsaved drafts are in-memory, not durable.
6. **Inspector** reverses admitted entity occurrences into their exact current
   solar positions; it does not rebuild or rewrite the graph. Missing/offscreen
   sources fade in place. **Library → Open** reuses saved exact local connections;
   recipient installs still need their own compatible data.

The following tournament/open-on-data scenarios remain broader targets where
they require standings, match semantics, filtering or behavior beyond the bounded
shared-graph formations. Geometry does not supply those prerequisites.

### Install an experience

Marketplace adds System and Entity facets to the existing app catalog. Show entry
points, compatible input requirements, capabilities/permissions, publisher,
dependency requirements, price and host compatibility. Install makes definitions
available; it does not switch the current view, bind private data, start media or
run Compute. The next actions are Open, Choose data, and Manage installation.

### From today's Inspector to a tournament

1. The person is looking at today's activity and selects Falcons.
2. “Open with” lists compatible installed entry points. Bracket can report a
   missing competition binding rather than pretending the team is a tournament.
3. Resolve recorded competitions related to Falcons. One valid candidate can be
   previewed; multiple candidates require selection. None offers explicit setup.
4. Open the competition in Bracket, highlighting Falcons. Show the target scope.
   Today's activity filter does not become “matches played today.”
5. Inspector inspects the current competition/team scope. Back restores the
   previous Today session, selection, camera and filters after reauthorization.

Opening from the installed-app library uses the same resolver: choose a compatible
subject or saved session. Spoken “show this as a bracket” reaches that exact typed
navigation path. Incompatible views remain under More experiences with a useful
explanation; they do not fabricate relationships to fit their layout.

### Grow data and presentation incrementally

“Falcons is a team” creates ordinary facts. “Falcons plays in this league” adds an
exact relationship. “Show this league's standings” requires the data/rules actually
needed: participants, recorded results, ranking and tie-break policy. Missing rules
remain explicit; the renderer does not invent wins, roles or rankings.

“Place standings on the left” edits a focused experience draft. “Use this gauge
for speed” changes an exact presentation binding. Each accepted edit has an undo
record and preview. Publish creates an immutable release after validation/review;
private drafts do not silently update installed recipients.

Bracket slots are structural positions with unresolved occupant references or
declared advancement rules, not blank teams later renamed. Selecting a winner is
a governed recorded action; correcting a result recomputes affected advancement
and marks downstream invalid states explicitly. Competition format, seeding,
ties/byes and correction policy belong to reusable definitions, not core conditionals.
Freeze the exact qualifying standings/seeding source and version when a tournament
starts. Later regular-season results cannot silently reseed it; reseeding is an
explicit operation with a preview of its effect on existing matches/results.
The first tournament proof supports one declared format, not every competition.

## 6. Host, layout and interaction details

### Host and layout

Build one host with instance-scoped lifecycle: validate, bind, mount, update,
suspend/resume, dispose and fail. Share it between Inspector mini-surfaces and
System Experiences. Initial primitives are container, value/text, gauge/vector,
image, action button and child experience. Add reviewed canvas/runtime extensions
later; the starter primitives are not a permanent ceiling for creators.

Support parent-local coordinates, relative anchors/offsets, row/column/grid,
min/max size, aspect ratio and clipping. Layout compiles deterministically and
rejects cycles, missing targets, non-finite geometry and budget overflow. Trees,
brackets and free-positioned scenes can have different layout algorithms while
sharing entity/binding/instance contracts.

50-by-50 is a compact presentation variant, not a shrunken full application. Its
tap can expand to a usable view. Pointer/keyboard targets and labels remain usable;
responsive rules can change detail level, placement and density without changing
entity identity. Visible data includes an Inspect source action.

Input arbitration belongs in this first host, not only in the later game runtime.
Route pointer/keyboard events to the focused child or to Inspector exploration,
never both. A child button must fire once without also expanding, dragging or
opening its parent. Provide explicit Inspect and Arrange/Move affordances and
focus return; a tiny interactive surface cannot depend on ambiguous double-click
or global key handlers. Only the host can grant bounded input capture.

### Sunburst and failure recovery

Create a shell-owned control/input plane separate from background/content/
foreground experience layers. The host provides the actual reserved Sunburst
footprint plus safe-area insets. Experience controls cannot overlap it or intercept
its input. Full canvas means below the shell, not browser fullscreen that hides it.

Reconcile existing Sharing, review, collective/protected dialogs and conference
dock exceptions. For a protected modal, activating Sunburst must safely cancel or
suspend the pending operation before navigating; it must not accidentally approve
or operate a blocked form underneath. Preserve focus restoration and keyboard
access. Native browser/OS prompts are outside application stacking control.

Inspector opens by default on a new session. Restore previous sessions only through
an explicit preference; installing an experience never changes the default.
Crashes, missing dependencies and invalid layouts return an inspectable error with
an available Inspector exit. Native fullscreen/pointer lock require a later
host-owned policy; arbitrary children cannot request them directly.

### Shared exploration gestures

| Surface/action | Required behavior |
| --- | --- |
| Inspector/Tree: click closed branch entity | Expand its permitted descendants. |
| Click an already-open entity | Open details. Defer the detail action long enough to disambiguate a double-click. |
| Double-click branch entity | Cancel pending details; collapse everything beyond this point, retaining this entity as the tip. |
| Leaf | Proposed default: open details; no fabricated empty branch. |
| Expansion/collapse connectors | Hide affected connectors during node movement; render final geometry only after settlement. |
| Family selection | Paint the selected entity's relevant connectors above other family connectors. |
| Shared descendant | Collapsing one branch does not hide a child still reachable through another open branch. |
| Bracket click | Inspect an occupant or choose/bind a permitted empty slot; no double-click collapse. |

Provide keyboard and explicit touch/menu alternatives. Preserve special Inspector
review, class-group and managed-owner actions through explicit policies rather
than treating every dot as a normal expandable entity. Existing Timeline entry,
reverse-to-Inspector, independent zoom and Sunburst day navigation must survive.

## 7. Data access and real-time behavior

### Bounded read projections

Define a strict read projection request: exact source/binding/owner, fields,
typed predicates, ordering, time/range bounds, page limit and cancellation token.
Response includes values with provenance/version, cursor, completeness and
freshness. Cursors bind to the query and authorized scope; later pages recheck
authority. Incomplete aggregates must be labeled partial or refused.

An observed revocation or required authority-lease expiry also invalidates mounted
instances, cached projections, pending actions and source leases without waiting
for another user read. Clear newly unauthorized displayed values and halt affected
work; other consumers continue only under their own valid authority. Specify
offline shared-data availability/expiry per source policy. Do not claim to retract
bytes a user already received or silently require network access for owned local facts.

Keep partial projections distinct from complete `ContextSnapshot` objects. Never
publish a loaded page as an owner's full snapshot, which could overwrite omitted
facts. Existing snapshot mutation/publication remains until an independently
tested delta writer exists; read-side paging does not silently change writes.

First sources: current authorized Context, indexed local Journal and admitted
artifact references. Add occurrence-time/record-ID Journal indexes and cursor reads;
replace whole-history `getAll` on the new path. Preserve record IDs and original
app scopes. Aggregates use bounded indexed scans/resumable work or maintained
projections with correction/supersession invalidation, not repeated browser scans.

A host coordinator shares identical selectors and cached pages across instances,
limits concurrency, cancels unused work and sends small projection patches to
renderers. Canonical permissions apply before values or aggregates leave a source.
Do not introduce raw database credentials, arbitrary SQL or a new paid cloud data
product merely to implement JPL code storage.

### Signals, media and commands

Keep three distinct delivery classes:

- Durable facts/results/checkpoints use existing governed persistence and
  idempotency. High-frequency measurements are not mandatory graph nodes.
- Replaceable live signals have sequence, source time, freshness and coalescing.
  Consequential commands instead require acknowledgement, replay rules and
  idempotency; they cannot be dropped like an old gauge sample.
- Media stays in trusted session/source adapters. Experiences receive authorized
  handles, never provider credentials or unrestricted URLs.

Current sync is a hint/control channel, not generic graph deltas or a frame stream.
Extend visible-tab coordination with typed invalidations and bounded resumable
catch-up. Subscriptions are shared by source and authorization scope, with jittered
reconnect/backoff. Unmount releases leases; a shared source stops only when no
authorized consumer remains. Background calls survive hidden visual surfaces
until their explicit lifecycle says to end.

For the mission example, video, speed, altitude, timer and orientation share source
timing. Missing/out-of-order/stale data is visible; inventing or silently holding a
value as live is forbidden. Reuse conferencing first. Broader broadcast must not
use one publisher upload per viewer; provider distribution and audience authority
get their own reviewed adapter and cost/load evidence.

## 8. Ordered implementation releases

Each release includes canonical/layer documentation, low-level tests and focused
browser acceptance. “Done” means its gate passes, not merely that a demo renders.

### R0 — Baseline, fixtures and decisions

**Deliver:** package-size/load metrics, current cold-install/server-invocation/warm-
local-opening traces, ordinary/Journal read costs, shell-layer inventory, fixed
representative fixtures, and ADR drafts for package versions/storage/navigation.
Measure original and clean behavior separately. Select explicit browser/device
and network profiles; record the repository revision with every benchmark.

**Gate:** no ambiguous “app load” metric; clean existing marketplace, protected,
conference and Timeline tests; baseline resource/cost report. No resets or paid
external load tests are implied.

### R1 — Paid code serving and compact receipts

**Deliver:** section 4 artifact tiers, promotion/reconciliation, metrics, compact
receipt dual reader/writer, conditional backfill tooling and rollback controls.
No Experience UI dependency; this can ship first as an independent improvement.

**Touch:** API artifact-store/service/repository/handler and scheduled runtime
wiring; marketplace internal receipt contracts; infra table/IAM/metrics adapters.

**Gate:** cache hit/miss/coalescing/eviction/mutation isolation; paid/free/dependency
eligibility; hash mismatch; DB outage S3 fallback; revoked authority on warm hits;
legacy/compact replay returns identical original response and charges once;
missing archive cannot repurchase; shared dependency survives listing revocation.
Benchmark actual 4/16/40 KB JPL fixtures plus package envelopes and dependency sets.

**Rollback:** disable hot reads/promotions, use S3. Retain compact-receipt readers;
an old binary unable to read newly written receipts is not a valid rollback.

### R2 — Bounded projection and history foundation

**Deliver:** versioned read projection, Journal time indexes/cursors, shared local
selector coordinator, cancellation/completeness, minimal bounded remote reads
where the chosen source needs them. Do not raise existing Context snapshot caps.

**Touch:** contracts `journal.ts`/new projection contracts; runtime `journal.ts`;
browser worker/protocol; API repository/query adapters when remote sources enter.

**Gate:** 1k/10k/100k history cases; cross-page mutation and stable tie-breaking;
corrections; expired cursor; revocation between pages; same source in two consumers
without copies; partial projections cannot reach whole-snapshot publication.

**Rollback:** disable new query adapters; retain new indexes and readable records.
No schema rollback may delete data created under the new reader/writer version.

### R3 — Experience contracts and trusted host

**Deliver:** versioned entry points/definitions, pure layout compiler, local host,
compact/full-canvas primitives, resource leases and enforced Sunburst plane.
Adapt Inspector/Timeline/Column to the common host using trusted existing renderers
first; they are not required to become generic scene definitions immediately.
Admit safe image artifacts explicitly (formats, bytes, decoded pixels, private
delivery and cleanup); reject active content rather than treating SVG/HTML as images.

**Touch:** contracts/compute/runtime; browser `main.tsx`, proposed `experiences/`,
worker protocol, Inspector entity surface, shell/overlay styles; artifact contracts,
API adapters and source policy for admitted image bytes.

**Gate:** same subject twice; compact/full-canvas/phone resizing; layout cycles and
resource overflows; no private data in portable definitions; a failed child cannot
trap input or obscure Sunburst; modal cancellation is safe; no undeclared paid,
protected or business effects on mount/resize. Read/layout/reversible initialization
are allowed. Preserve existing Timeline forward/reverse motion and local behavior.
Test nested input explicitly: one child action, no parent gesture side effect,
keyboard focus/return and compact Inspect/Move alternatives.

**Rollback:** shell feature switch returns to trusted existing Inspector; remove
instance resources but retain facts, installations and immutable definitions.

### R4 — Install, open-on-data and first integrated experience

**Deliver:** full presentation-only marketplace lifecycle, System/Entity discovery
facets, version compatibility, exact subject resolver, navigation session and
Inspector/Back distinction. Complete old-signed-package adapters before enabling
new publication. Migrate fixed surface navigation to this one resolver.

First acceptance composition: an instrument dashboard with independently bound
read-only values/gauges and an admitted image, plus a simple table over the same
source data. Demonstrate a compact entity surface inside Inspector and the same
definition in the full dashboard. No SpaceX/live-data claims.

**Touch:** app/marketplace contracts and compute lifecycle, signer/review/service,
browser marketplace commands/library/focus, host navigation and binding coordinator.

**Gate:** pure visual package with zero JPL installs; install starts nothing;
fresh recipient bindings are empty; app-first/data-first flow; missing/ambiguous
inputs clarify; incompatible filters do not transfer; Back and Inspector differ;
upgrade/rollback/removal/revocation preserve facts and isolate current authority.
Revoke during an already-mounted display: cached unauthorized values disappear,
pending actions cancel, and independently authorized siblings remain usable.

**Rollback:** stop new publication/install admission and disable custom entry
points; keep readers, purchased licenses and data. Do not erase paid purchases.

### R5 — Incremental creator workflow and real Tree/Bracket experiences

**Implemented subset R5A, not a completed R5 gate:** the strict ordinary adviser,
current draft/clarification context, preview undo, private immutable save and
exact source rebinding replace production manual template constructors (now test
fixtures only). Semantic anchors, sibling alignment, fractions/min/max/aspect,
flow/grid and one mobile override compile locally. Tree/bracket/timeline are
deterministic arrangements over bounded witnessed Context graphs; tables select
explicit subject/relationship/value fields. Individual admitted source entities
morph within the shared Inspector canvas and return without changing facts.

Authoring admits at most 64 ordinary source candidates, 32 bindings, three
clarification pairs and a 192 KiB request. No resolved source scalar values/graph
bodies or canonical source IDs are added to candidate metadata; labels and the
user's ordinary request are still model-visible. Layout definitions retain the
128-node, 128 KiB ceiling. Graph reads cap 100 nodes/200 edges/1,000 examined edges
and total projection bytes at 256 KiB. Dynamic diagram occurrences count against
the declared render budget. Two local exact image selections reuse existing short
raster leases. Authoring cannot add scripts, URLs, child releases, governed actions
or facts. Save/open retains signature/license verification; paid JPL serving is
unchanged.

**Still gated:** complete tournament format/seeding/standings/advancement,
family-specific role semantics/gestures, durable multi-device drafts, direct
manipulation, general action/child composition authoring, broad source adapters,
live-model quality and deployment acceptance. Existing native Timeline and other
trusted renderers are not all converted into authored definitions by this slice.

**Deliver:** focused drafts, typed edit algebra, preview/undo, direct layout edits,
immutable publish, exact child reuse and explicit update selection. Add data-backed
Tree/Family and one declared bracket format. Roles, names, matches, slots, results,
rankings and advancement rules are shared data/definitions, not UI literals.
Implement section 6 gestures in production Inspector as well as tree layouts.

**Touch:** generator proposal schemas/prompts; trusted compile/app-runtime and
spatial-workbench integration; worker authoring commands; tree/bracket layout
extensions and shared exploration reducer; existing Inspector gesture tests.

**Gate:** build from several small statements; distinguish fact/layout/behavior
edits; rejected proposals leave release/data untouched; undo preserves facts;
label source inspection; deterministic standings/advancement correction;
frozen qualification/seeding unaffected by later standings without explicit reseed;
shared-child collapse, selected family lines on top, stationary connectors,
no double-click popup flash, keyboard/touch alternatives, bracket slots retained.

**Rollback:** stop draft activation/new releases; return to last verified exact
release. Preserve drafts and canonical facts; never revert match results just
because presentation code rolls back.

### R6 — Existing media/actions as composable entities

**Deliver:** adapters for existing conference/recipient actions, shared media
handles and lifecycle, then reviewed live-source/signal support. Mission-style
composition proves synchronized displays with an authorized source. Preserve
existing exact invitations, grants, token handling, billing and track cleanup.

**Touch:** conference/communications contracts and coordinators; media adapter/
host leases; sync-controller and versioned signal policy; reviewed provider adapter.

**Gate:** actual remote frames, native share-stop, late permission cancellation,
revocation/end, source reuse without duplicate connections, stale/out-of-order
signals, slow consumers and bounded queues. Input/Inspector/Sunburst remain usable.
Include multiple consumers with different grants and revoke one during playback;
shared-source reuse must not preserve a revoked consumer's access.
Broadcast fanout and multiparty rooms require additional measured provider gates.

**Rollback:** disable new media/signal adapters; release their leases safely.
Existing conference functionality remains available through its proven surface.

### R7 — Interactive runtime and scale qualification

**Deliver:** reviewed worker-hosted behavior extensions, focused input routing,
canvas/animation budget and explicit simulation state. Start with a local board/
map/character proof. Multiplayer authority, collisions and consequential shared
state each need explicit semantics; do not infer a game engine from scene layout.
Run progressive device/service scale qualification across the shipped slices.

Before admitting authored scripts, choose and prove a bounded interpreter or
properly isolated brokered runtime. Same-origin Workers have ambient network and
storage capabilities; moving JavaScript into one is not a security proof. Require
escape, capability-denial and resource-exhaustion tests. Keep declarative-only
authoring until the new runtime passes that gate.

**Gate:** no ambient DOM/network/storage from authored code; bounded work and
cancellation; failure isolation; deterministic checkpoint/replay where declared;
no frame-by-frame graph writes or model calls; section 9 measured scale gates.

**Rollback:** disable advanced runtime admission; retain safe presentation and
Inspector. Checkpoints remain versioned data; incompatible engines cannot guess
how to resume them.

### Dependencies and parallel work

R0 precedes implementation decisions. R1 and R2 can proceed independently after
R0. R3 contract/host work can proceed alongside R1/R2, but R4's integrated release
requires their relevant package/projection boundaries to be stable. R5 and R6
follow R4 and can progress in parallel. R7 is not a prerequisite for useful
Experiences. Do not ship one giant platform rewrite.

## 9. Performance, scale and operating gates

The following are **proposed initial test profiles**, not measured guarantees:

| Resource | Initial profile / acceptance intent |
| --- | --- |
| Read projection | 100 records/page, 256 KiB response bound, 8 active distinct selectors/system, 2 concurrent page requests; bound work examined, not only returned rows |
| Rendering | 32 lightweight mounted surfaces including overscan; 2 expensive surfaces; one full-canvas experience; 1,000 projected chart points; preserve Inspector's existing scene bounds |
| Scalar signal display | Coalesced batches up to 10 Hz; visual interpolation can use local frames; other media/game rates have separate profiles |
| Local responsiveness | Warm projection p95 <=50 ms; ordinary input feedback <=100 ms; flag experience-attributable tasks over 50 ms; freeze measured device profiles before treating these as release gates |
| Warm code path | Zero repeated S3 loads for a retained same-hash package in a healthy process; current authority checks still run |
| Lifecycle | Resource/heap usage returns to a measured stable baseline after repeated mount/unmount; no orphan media tracks, input handlers or subscriptions |

Test Context at current limits; Journal at 1k/10k/100k records; 1,000 logical
surfaces with bounded mounted work; 1/10/100 updates per second plus bursts.
Include desktop and a specified lower-end physical mobile device, with network/
CPU conditions recorded. Browser emulation alone is not proof of mobile capacity.

Separate million registered accounts from active users. Proposed service ramp is
100 -> 1,000 -> 10,000 concurrent sessions, using defined per-session request rates,
hot-release/skewed publishers and reconnect storms. Simulation/modeling can precede
paid load tests. This ramp does not prove a million simultaneous users or viewers.
Approve environment, maximum spend, safety stop and provider quotas before running
distributed tests. Set server p95/error/cost SLOs after baseline, before canary.

Record package-load tier and latency, S3 GETs, Dynamo reads/bytes, cache eviction/
hit rate, receipt bytes, promotion lag, authorization failures, evaluated/returned
records, worker-message bytes, queue depth, long tasks, heap, decoded assets and
mounted surfaces. Use bounded/sanitized metric labels; never emit payloads, secrets
or user content. Report cost per install and server invocation separately.

Automatic release blockers: unauthorized data/code execution, duplicate charge,
receipt mismatch, invalid hash accepted, unbounded reads/catch-up, Sunburst trapped,
protected plaintext leakage, resource leaks or breached agreed performance budget.
Do not call a correctness test with dozens of recipients million-user evidence.

## 10. Rollout, ownership and documentation

Use separate controls for code promotion/reads, compact receipt writes, projection
queries, Experience publication/hosting, authoring, media/signals and advanced
runtime. Readers precede writers; storage/index additions precede activation.
Canary progression: fixtures/local tests -> development accounts -> opt-in cohort
-> measured expansion. Data reads can compare in shadow; never duplicate writes,
provider effects or purchases for shadow testing.

Every stage retains an exact rollback release that understands already-written
records. Rolling back activation is not rolling back user facts. Keep old artifact
bytes and compatible readers while supported installations, licenses, rollback
targets or retained receipts require them. Receipt expiry alone does not permit
deleting an older valid release.
Cleanup is a separate reviewed, resumable operation, not part of a deploy script.

| Area | Owning clean layer |
| --- | --- |
| Shared definition/query/navigation/receipt schemas | `packages/contracts` |
| Package validation, install/execution and bindings | `packages/compute` |
| Pure projection/layout/gesture logic | `packages/runtime` or a small dedicated pure package, chosen before implementation |
| Untrusted authoring proposals | `packages/generator`; existing API authoring boundary |
| Trusted rendering, local state, worker coordination and media leases | `apps/web` |
| Current authorization, server artifact/query/marketplace adapters | `services/api` |
| Physical stores, least-privilege IAM, queues and monitoring | `infra` |

Record ADRs for versioned experience admission, paid artifact tiers/receipt format,
open-on-data navigation/shell policy, and projected reads versus complete snapshots.
Update canonical architecture plus each changed package README/layer guide in the
same implementation change. Add pure/contract tests first, service/adapter tests
next, and browser tests for genuine DOM/input/storage/media behavior.

## 11. Decisions for review before implementation

These are recommended defaults, not hidden assumptions:

1. **Plan scope:** implement R0–R4 as the first integrated milestone: paid-code
   optimization, bounded data foundation, safe host and a genuinely installable
   dashboard/table. Do not make a full game engine the first acceptance target.
2. **Paid eligibility:** include both installation-priced and invocation-priced
   approved releases, with quota-controlled dependency promotion. Keep new fees
   out of this release. Confirm active/rollback retention and publisher budgets
   after package-size/cost measurement.
3. **Startup/navigation:** Inspector by default; explicit opt-in restoration;
   Back restores the prior session, while Inspector inspects the current subject.
4. **First creator scope:** declarative composition and existing governed actions
   before arbitrary authored renderer code; preserve canvas/game extensibility.
5. **Operational targets:** choose the actual lower-end device, peak concurrent
   user assumption, regional audience, service SLOs and spend ceiling during R0.
   They cannot be inferred from “millions of users.”
6. **Media content:** identify an authorized feed for the later live demonstration;
   until then use labeled fixture telemetry and existing conference media.

Implementation estimates should be assigned per release after R0 confirms sizes,
test health and missing contracts. This plan deliberately does not invent dates
or claim the entire original website is already migrated.

## 12. Source and reference index

Verified clean source:

- [Package artifact port and S3 implementation](../../onevar-platform/services/api/src/artifact-store.ts)
- [Server invocation, verified package loading and marketplace lifecycle](../../onevar-platform/services/api/src/service.ts)
- [Marketplace receipt persistence](../../onevar-platform/services/api/src/marketplace-repository.ts)
- [Marketplace definitions, pricing and install response](../../onevar-platform/packages/contracts/src/marketplace.ts)
- [App bundles and local package state](../../onevar-platform/packages/contracts/src/compute.ts)
- [Browser worker persistence and Journal reads](../../onevar-platform/apps/web/src/entity/context.worker.ts)
- [Context limits](../../onevar-platform/packages/contracts/src/context.ts)
- [Journal record identity](../../onevar-platform/packages/contracts/src/journal.ts)
- [Inspector gestures and rendering](../../onevar-platform/apps/web/src/entity/inspector-v2/inspector-v2-project.tsx)
- [Sync controller](../../onevar-platform/apps/web/src/entity/sync-controller.ts)
- [Conference media lifecycle](../../onevar-platform/apps/web/src/entity/conference-media.ts)
- [Ordinary artifact boundary](../../onevar-platform/docs/architecture/phase-5e-ordinary-artifacts.md)

Original behavioral evidence and governing references:

- [Entity templates and assignments](../../aws/app/public/modules/_surface/index.js)
- [Entity worker](../../aws/app/public/workers/fileWorker.js)
- [Original streaming](../../aws/app/public/modules/_streaming/index.js)
- [Original persisted-output writer](../../compute/app/routes/modules/shorthand.js)
- [Original output shortcut / capability execution](../../compute/app/routes/modules/runEntity.js)
- [Opt-in result-cache decision](../decisions/0042-local-data-jurisdiction-and-opt-in-compute-caching.md)
- [Canonical substrate](canonical-entity-substrate.md), [indexed Journal](indexed-journal-entities.md), [indexing migration](canonical-indexing-and-context-compilation.md)
- [DynamoDB item constraints](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html)
- [AWS object-cache guidance](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance-design-patterns.html)

The original preparation of this plan performed no implementation or deployment.
Subsequent R0–R4 implementation/release evidence is in decision 0203; current local
R5A work is in decision 0204. Updating the plan is not deployment evidence.
