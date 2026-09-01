# 0122: Journals store growing facts as indexed records

**Status:** Accepted and implemented in source; development deployment proof pending.

## Context

An app such as a vehicle logbook must accept an open-ended history of measurements, events, rules, and corrections. Creating a capability, child entity, or ArrayLogic step for every fact makes menus, packages, and runtime state grow incorrectly. Keeping every record in the monolithic browser Compute state imposes an avoidable fixed ceiling and rewrites unrelated state.

## Decision

Introduce a domain-neutral Journal contract and browser-local execution primitive. A versioned Compute package owns bounded vocabulary and units. Every fact is a separate immutable record addressed by exact owner, app, subject, concept, and interaction IDs. The Context worker persists records in a dedicated indexed object store and performs bounded concept/time queries over that index.

Domain vocabulary belongs to an authoring blueprint or user-authored app release. The generic contract/runtime owns only parsing shapes, canonical unit conversion, temporal algebra, immutable provenance, ambiguity behavior, and response projection. Exact local subject identity is mandatory. A known Journal interaction is local and model-free.

Repeated equivalent builds advance one app lineage. Mutations emit deduplicated Sunburst attention; queries and navigation do not. ArrayLogic composes Journal operations with other apps, while target-first middleware continues to route behavior. Neither stores the records.

## Alternatives rejected

- One entity or Compute package per fact: excessive identity and package growth.
- A domain-specific car table/runtime: not reusable and incompatible with 1var's entity model.
- A single growing JSON list in Compute state: fixed-size and write-amplified.
- Run an LLM for every fact or question: slow, costly, and non-deterministic after the language is known.
- Local vector RAG as authority: unnecessary for exact indexed history and unable to grant identity or permission.

## Consequences

- Journal capacity grows with indexed records and browser quota rather than app count or a 20,000-event list.
- Existing wording is free and local after package installation.
- New concepts are versioned app evolution, not core changes.
- App packages and marketplace distribution contain definitions only; records remain separately governed user data.
- Deployment and a clean browser journey are still required to prove worker storage, widget placement, attention, reload, and idempotency.

## Affected repositories

- `onevar-platform`
- `architecture`

## Security impact

The server receives no Journal record in the initial browser-local implementation. Exact ownership and subject IDs are checked before every write or read. Journal contracts add no protected plaintext channel or ambient provider authority.

## Verification

Contract tests reject loose identities and executable vocabulary fields. Runtime tests cover the requested vehicle sentences, unit conversion, time ranges, recurrence, detail filtering, and 25,001 records. Compute tests prove content addressing and immutable lineage. Browser tests prove bounded authoring package construction; deployed browser proof remains the release gate.

