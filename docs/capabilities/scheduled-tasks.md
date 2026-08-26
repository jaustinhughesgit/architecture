# Scheduled Entity Tasks

**Status:** Clean Phase 4F foundation implemented; deployment proof pending. Legacy POC behavior remains historical evidence.

Scheduled tasks make time another way to invoke reusable 1var work. A task targets an entity; the entity remains the unit of behavior, lineage, permissions, and reuse.

## Clean Phase 4F flow

1. The caller's browser resolves an utterance once through an installed local Path or one bounded capability discovery.
2. The schedule freezes the exact caller installation, capability/version/operation, content-addressed package ID/hash, JPL hash, typed inputs, time zone/trigger, and price ceiling.
3. A shared EventBridge cadence queries a sixteen-shard DynamoDB due index and atomically creates deterministic occurrence and invocation IDs.
4. SQS delivers exact occurrence IDs to a governed worker with partial-batch retry and a DLQ.
5. The worker reloads the immutable release/package, rechecks identity, authorization, price, credits, and protected grants, then uses the normal Compute/provider lifecycle with no model call. Missing protected authority cancels any unopened provider reservation before pausing.
6. Ordinary or executor-encrypted results enter a browser inbox. Local effects commit only after the exact active installation accepts the result; delivery acknowledgement remains separate.

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
- Pause, resume, cancel, history, delivery acknowledgement, and failure diagnostics belong to the task lifecycle. Edit is a future versioned replacement rather than in-place authority drift.

## Known gaps

The clean contract initially supports one-time and fixed-rate triggers with a browser inbox. Calendar rules, edit/version migration, downstream notification/email/entity channels, protected owner-local execution while a browser is absent, ArrayLogic automation scheduling, load proof, and production deployment remain incomplete. The older portal/EventBridge Scheduler implementation is not imported into the clean runtime.

See [decision 0077](../../decisions/0077-clean-governed-schedules-pin-exact-compute.md).
