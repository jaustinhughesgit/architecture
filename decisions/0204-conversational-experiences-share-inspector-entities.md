# 0204 — Conversational Experiences arrange the same Inspector entities

Status: Accepted; bounded implementation, locally verified and deployed to development.
Release `41b3d320e05e46b1eeed37e8e9111c91c40c8cb2` was published through
[workflow 36560904990](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/36560904990)
on 2026-09-29. Exact public health and read-only page checks passed; hosted
validation subsequently failed one native Timeline mid-entry reversal continuity
test (including its retry); all four Experience browser cases passed. This is a
validation failure, not a green release gate. Subsequent diagnostic release
`c3a5d70fe4eadc80fc145c9f94167da7d462aa7d` passed one explicitly authorized
live synthetic count-authoring check. Follow-up development release
`b3d25a6002ee5fb3d00dd72a4371c1b3c8ce4d4c` passed the second authorized
live check, local 1,474 unit tests and 17 focused browser cases, plus deployed
health/homepage smoke. It also repairs the separately reproduced pending-RAF
Timeline reversal race with unchanged continuity tolerances. Full hosted CI for
that release subsequently completed successfully. Neither live call reproduced the
reported adviser rejection; its root cause is not established. Broad model acceptance and live-microphone acceptance remain
unverified. The linked product test guide owns current release evidence.
Live-data/tab-visibility continuity was subsequently deployed to development as
`045384e8b6e40f7b8340e1402b85ec7f75f536d1` through
[workflow 36597142744](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/36597142744).
Local verification passed 1,477 unit tests and 17 focused browser cases; exact
deployed health and read-only homepage smoke passed. Full hosted validation is
running at this checkpoint. No paid model calls, resets or account changes.
Supersedes the manual template/source-form workflow of 0203, not its storage,
marketplace, source-authority or execution decisions.

## Context

Fixed Dashboard/Table factories and a separate workspace do not provide incremental
entity-based creation. A person should describe a small arrangement, add to it,
and ask for mobile behavior without authoring a second app. A tree, bracket or
timeline must arrange shared facts, not invent domain data or private app blobs.

## Decision

Use one ordinary voice/Convert advisory boundary for complete next declarative
drafts. The existing browser controller supplies the current draft, bounded
clarifications and disposable symbolic source candidates. It retains canonical
source IDs, values and exact bindings locally, proves current source/type/revision,
and allocates definition identity/version. The model cannot write facts, publish,
install, purchase, choose a grant, run code or nominate arbitrary dependencies.
Unknown/ambiguous requirements clarify; invalid proposals leave state unchanged.

Preview is separate from saving. Undo affects in-memory preview history, not facts
or saved releases. Explicit save uses the existing private signed presentation
release and installation lifecycle. Source selections remain recipient-local;
publisher data is not transported with a scene. Paid JPL acceleration and compact
historical receipts remain unchanged. No alternate store or marketplace is added.

Responsive intent uses semantic parent anchors, sibling alignment, bounded sizes,
row/column/grid flow and one mobile layout/flow override. A pure local compiler
resolves current safe geometry; resize never calls a model. Admitted exact source
identities connect Experience geometry to the same Inspector canvas, graph and
camera. Repeated occurrences retain source identity. Missing/offscreen sources
fade in place; namesakes never substitute. Reversal retains geometry only, and
revocation wins immediately. Connector geometry paints after motion settles.

Locally verified follow-up, deployed to development as `045384e`: data refresh is not navigation.
A stable UI occurrence keeps its pose and mounted
content across scalar/provenance revisions, even if the current value entity ID
changes. Motion depends on geometry/membership and navigation, not data revisions.
Temporary reads may preserve geometry and inert shells only, never old values,
source authority or actions. Explicit entry/return still morphs between the
current admitted Inspector source and Experience geometry. This is a local
presentation correction, not proof of a millisecond telemetry pipeline.
Page visibility loss is not Inspector navigation. It still cancels reads and
pending authoring, clears data and revokes media, but retains disposable scalar
poses. Return reacquires current data without replaying entry; rapid visibility
events cannot strand a cancelled lease. Media is not silently re-admitted.

Graph projections extend the existing read primitive: current ordinary owned,
local, root-connected directed facts, with exact entity/relation version witnesses
and explicit partial status. Tree/bracket layouts preserve those relations;
timeline uses stored anchored temporal metadata only. Cross-zone/mixed-precision
grouping is not labeled exact global chronology. Tables explicitly map subject,
relationship and value fields. None supplies standings, seeding, roles, winners,
dates, slots, simulations or another domain model by inference.

## Bounds and privacy

- At most 64 symbolic source candidates, 32 bindings, three clarification pairs,
  4,000 input characters and 192 KiB advisory request bytes.
- At most 100 graph nodes, 200 edges, 1,000 examined edges; all selected Context
  cells together at most 256 KiB. A revision-indexed adjacency map bounds traversal.
- At most 128 authored/rendered diagram nodes per declared profile, depth 8,
  128 KiB definition; repeated diagram occurrences consume the budget.
- Up to two exact local image references use existing raster admission/expiry;
  portable definitions contain neither signed URLs nor admission handles.

Candidate labels, draft text and the person's ordinary request reach the model;
resolved scalar values/graph bodies are not appended as evidence. This is ordinary
disclosure, not zero-knowledge authoring. Protected lanes stay excluded. The API
does not durably retain proposal content and uses `store:false`; its bounded
five-minute process replay cache is transient. Existing cost meters retain usage
evidence, not prompts. Provider retention is a separate policy.

Rejection diagnostics distinguish provider completion/refusal, JSON, schema,
canonical scene and source-binding failures. The existing response message carries
one trusted rule code and a bounded allowlisted schema coordinate, not raw model
text, source identities, unknown keys or values. No additional provider calls,
durable proposal logging, automatic repair template or relaxed authority follows
from rejection. The browser leaves the current experience and facts unchanged.

## Alternatives, migration and evidence

Rejected: manual template factories as the production authoring model, pixel-only
mobile copies, model-owned geometry at runtime, display text as facts, invented
tournament data, arbitrary HTML/JavaScript, and per-node graph scans/model calls.
Factories move to test fixtures; existing signed definitions/selections remain
readable without a legacy parser or bulk conversion. Deployment was separately
authorized; no reset was performed. Disabling hosting returns to Inspector without deleting
facts, purchases or releases.

Affected layers: clean contracts/runtime, browser shell/worker/Inspector/host,
ordinary advisory API and matching documentation. Original repositories are
unchanged behavioral references. See [product decision 0152](../../onevar-platform/docs/decisions/0152-conversational-experiences-share-inspector-entities.md)
and [manual/evidence guide](../../onevar-platform/docs/testing/conversational-experiences.md).
Media composition, governed action/child authoring, game simulation, full domain
semantics, broad source adapters and million-user capacity remain separately gated.
