# Indexed Journal entities

## Purpose

A Journal is the reusable 1var substrate for an app that must keep accepting new dated facts and answer questions over that growing history. Vehicle mileage, maintenance, workouts, symptoms, expenses, crop observations, inventory movements, and project activity are configurations of the same primitive. They are not separate platform branches.

The first packaged proof is a Vehicle Logbook. It accepts measurements, events, recurrence rules, and temporal questions such as:

- `I drove 10 miles today.`
- `I added 9 gallons of gas on August 28.`
- `I fixed the left CV boot back in April.`
- `My oil change lasts 3 months.`
- `How many miles have I driven this week?`
- `When did I last get gas?`
- `When is my next oil change?`

## Model

One Journal app release carries a bounded, versioned vocabulary contract. That contract declares its subject kind, aliases, measurement concepts, accepted units and conversions, event concepts, and recurrence support. The generic runtime turns a matching utterance into one typed mutation or query command. The vehicle vocabulary belongs to the packaged app blueprint; the Journal contracts and runtime contain no privileged vehicle branch.

Each accepted fact becomes one immutable `journal_record` with exact owner, app, subject, interaction, concept, type, occurrence time, and recording time. Measurement records store a canonical value and unit while retaining the supplied unit as safe provenance. Events retain bounded detail. Recurrence rules remain separate records. Corrections and supersession have explicit fields rather than silently changing history.

Journal records live in their own browser-worker IndexedDB object store, one row per fact, indexed by exact owner/app/subject/concept identity. They do not accumulate inside one large Compute state blob and do not become one entity or app per fact. This removes the existing browser aggregate state's fixed 20,000-event ceiling and permits indexed reads constrained by the user's browser quota. “Unbounded” means the app can grow without a vocabulary-specific code release or in-memory list ceiling; it does not mean infinite physical storage.

## Execution flow

```text
ordinary Essence input
  -> deterministic Journal package discovery
  -> focused app wins; otherwise exactly one compatible Journal is required
  -> exact owned subject resolution in ContextDB
  -> typed Journal mutation or query command
  -> indexed browser-worker write/read
  -> deterministic response projection
  -> mutation-only Sunburst attention event
```

Known Journal input is local-only: no model, API, DynamoDB, or S3 request is required. The same interaction ID makes a retried mutation idempotent. Query execution cannot create or mutate a fact. Ambiguous Journal apps or subjects fail closed and require focus or clarification.

The Journal is still a Compute entity: Convert creates a content-addressed package with a browser-local `journal` primitive, normal app bundle, menu entry, immutable lineage, and Sunburst widget placement. Rebuilding an equivalent Journal advances that app lineage. The selected Sunburst ray determines presentation and context placement but grants no storage or execution authority.

## Growth and composition

New facts grow as records. New language or concepts grow as immutable Journal app releases. A compiler may later use bounded LLM interpretation for an unfamiliar phrase, but only a validated supplied concept/ID can be installed as a reusable local Path; the model never writes a Journal record directly.

ArrayLogic composes the Journal with other capabilities in sequence—for example, run a fuel purchase operation and then record the fuel event. Parent/child middleware remains first-response behavior routing. Neither mechanism is used as a substitute for record storage.

Sharing a Journal app shares its definition, not another user's records or Paths. A recipient compiles fresh local identities and binds the Journal to an exact permitted local subject. Protected facts require the separate protected storage and grant planes.

## Current boundary

The clean source implementation includes strict contracts, unit conversion, a pure parser/query algebra, content-addressed browser-local packages, worker-owned indexed persistence, deterministic Vehicle Logbook authoring, exact-subject resolution, idempotent writes, temporal queries, app versioning, and mutation-derived Sunburst attention. Development deployment and clean browser proof are required before the status becomes deployed.

