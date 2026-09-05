# 0142 — Learned Paths are locally proven; inactive archives contain no values

Status: accepted; bounded implementation in `onevar-platform`.

## Context

The clean-room runtime had fixed ordinary grammar and exact Compute frames, but not the legacy cold-miss learning loop. Similarity discovery could nominate an app with no matching frame. Development needs repeatable fresh generation without losing reusable definitions during resets.

## Decision

Reuse Context/Essence. One bounded model response nominates an allowlisted fact operation and source-token spans. The browser compiles a value-free template, checks semantic/grammar constraints and proves its current graph effect/answer before atomic activation. Failed proof never becomes a successful Path. Exact frames admit Compute invocations; similarity is candidate retrieval only.

Inactive templates use content-addressed storage in the existing private artifact bucket, not per-user/topic tables. Only closed grammar literals and capture/operation metadata persist. Concrete LocalPath evidence, source sentences, values, personal IDs and executable source are excluded. Bounded indexed lookup offers matches; explicit acceptance reproves locally. `create new` invokes the adviser instead.

Acknowledged templates are archived during learning or explicit archival. Operator resets inventory/preserve that prefix while clearing runtime data and advancing the epoch. New active libraries are empty except the core catalog. Unuploaded device-only templates cannot be recovered remotely and must not be claimed as preserved.

Reset purges same-stage email feedback queues alongside existing deferred-work queues. Delayed email feedback must condition its receipt on the exact current owner/contact; an event for a deleted or replaced contact cannot recreate old runtime metadata after reset. This does not change consent or suppression rules for a current contact.

## Alternatives and consequences

Copying legacy model graph generation would restore its expensive multi-stage dependency. Archiving concrete Paths would leak data/stale identity. A globally active library would defeat fresh-generation tests and silently adopt another interpretation. The bounded typed kernel is cheaper to validate and removable but admits only its fact algebra, not arbitrary language or temporal/provider actions.

## Ownership, security and migration

`onevar-platform` owns contracts/compiler/runtime/browser/API/reset; `architecture` owns this cross-layer decision. Protected dispatch stays device-only. Templates cannot grant authority. Ordinary source enters only the configured adviser, never the archive. Model usage joins existing root meters. Core Paths remain; no migration of preexisting clean-room learned Paths is claimed, because that subsystem did not exist. Archive-offer mode is prelaunch-only.

## Verification

Thirty constructions across twelve operations with held-out local replays; semantic safety failures; exact-state/idempotent execution; archive lifecycle and HTTP/auth/storage/reset tests. Live timings, deployed version and final reset counts are reported separately from fixture tests. See [implementation details](../../onevar-platform/docs/architecture/path-learning.md).
