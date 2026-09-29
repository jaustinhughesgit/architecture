# 0204 — Conversational Experiences arrange the same Inspector entities

Status: Accepted; bounded source implementation with local deterministic tests.
Not deployed; live-model authoring and live-microphone acceptance remain unverified.
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

## Alternatives, migration and evidence

Rejected: manual template factories as the production authoring model, pixel-only
mobile copies, model-owned geometry at runtime, display text as facts, invented
tournament data, arbitrary HTML/JavaScript, and per-node graph scans/model calls.
Factories move to test fixtures; existing signed definitions/selections remain
readable without a legacy parser or bulk conversion. No reset or deployment is
part of this change. Disabling hosting returns to Inspector without deleting
facts, purchases or releases.

Affected layers: clean contracts/runtime, browser shell/worker/Inspector/host,
ordinary advisory API and matching documentation. Original repositories are
unchanged behavioral references. See [product decision 0152](../../onevar-platform/docs/decisions/0152-conversational-experiences-share-inspector-entities.md)
and [manual/evidence guide](../../onevar-platform/docs/testing/conversational-experiences.md).
Media composition, governed action/child authoring, game simulation, full domain
semantics, broad source adapters and million-user capacity remain separately gated.
