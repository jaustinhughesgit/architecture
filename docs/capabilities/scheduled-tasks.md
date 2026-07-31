# Scheduled Entity Tasks

**Status:** Partial implementation

Scheduled tasks make time another way to invoke reusable 1var work. A task targets an entity; the entity remains the unit of behavior, lineage, permissions, and reuse.

## Current flow

1. The portal collects an entity, date range, local start/end time, time zone, interval, and optional weekdays.
2. The server converts the schedule into UTC execution windows and persists task and schedule records.
3. EventBridge Scheduler invokes the compute layer at the relevant clock times.
4. Compute selects schedule rows valid for that invocation and runs the entity through the normal entity endpoint.

This is distinct from an entity's internal `automation` queue. A scheduled task answers **when an entity starts**; automation describes **sequenced behavior during an interaction**. They may be composed.

## Platform fit

- The target is an entity, so parent/child lineage and `map`, `extend`, `link`, `use`, and `substitute` may affect the executed result under their normal semantics.
- Public/private and authorization rules must be evaluated at creation and execution, not bypassed because the trigger is asynchronous.
- A reusable public entity can be scheduled by many users while each schedule retains its own owner, time zone, inputs, and protected-asset authority.
- Results should return through the same message, notification, audit, or downstream entity channels as other executions.

## Required invariants

- Store the user's time zone and recurrence rule; do not reduce the durable contract to an unexplained server-local time.
- Every invocation needs a stable job and occurrence identifier for idempotency.
- The worker must re-check authorization and asset grants at run time.
- Retries must not duplicate irreversible effects.
- Pause, resume, edit, cancel, history, and failure diagnostics belong to the task lifecycle.

## Known gaps

The existing implementation uses persisted schedules and EventBridge Scheduler, but parts of the infrastructure configuration are environment-specific. Idempotency, retry/dead-letter behavior, authorization revalidation, result delivery, and a versioned task contract require further hardening.

