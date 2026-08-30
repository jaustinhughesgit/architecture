# Scheduled Entity Tasks

**Status:** Clean Phase 5.4 calendar, immutable-edit, natural lifecycle, and ordinary ArrayLogic scheduling implemented and live-proven in development. Legacy POC behavior remains historical evidence.

Scheduled tasks make time another way to invoke reusable 1var work. A task targets an entity; the entity remains the unit of behavior, lineage, permissions, and reuse.

## Clean Phase 4F flow

1. The caller's browser resolves an utterance once through an installed local Path or one bounded capability discovery.
2. A capability schedule freezes the exact caller installation, capability/version/operation, content-addressed package ID/hash, JPL hash, typed inputs, time zone/trigger, and price ceiling. An ordinary ArrayLogic schedule instead freezes one workflow installation/version/hash and every exact step release.
3. A shared EventBridge cadence sends one deduplicated FIFO task per virtual shard and never reads schedule data. Independently scaling workers query versioned compact due pointers in only each shard's newly closed and open UTC-minute buckets. Authoritative schedule/occurrence rows and their old/new pointers change atomically. A durable cursor per shard catches up bounded downtime without scanning all stored schedules, and claims create deterministic occurrence and invocation IDs.
4. SQS delivers exact occurrence IDs to a governed worker with partial-batch retry and a DLQ.
5. For one capability, the worker reloads the immutable release/package, rechecks identity, authorization, price, credits, and protected grants, then uses the normal Compute/provider lifecycle with no model call. Missing protected authority cancels any unopened provider reservation before pausing.
6. For an ordinary ArrayLogic workflow, the worker emits one `awaiting_browser_execution` occurrence. The owner browser verifies the exact workflow installation/hash, runs the pinned steps sequentially, and returns a value-free receipt. A deterministic occurrence interaction ID prevents repeat execution after refresh.
7. Ordinary or executor-encrypted capability results enter a browser inbox. Local effects commit only after the exact active installation accepts the result; delivery acknowledgement remains separate.

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
- Pause, resume, cancel, versioned edit, history, delivery acknowledgement, and failure diagnostics belong to the task lifecycle. A natural name is only a unique address; exact schedule ID remains authority.

## Known gaps

Decision 0113's v2 physical flow uses a constant-work coordinator, FIFO shard fan-out, per-shard catch-up cursors, and a separate buffered occurrence queue. Scaling dispatch concurrency therefore does not require changing schedule IDs, definitions, Paths, installations, or stored due-pointer layout.

The clean contract supports one-time and fixed-rate triggers with a browser inbox. Phase 5.4 adds daily, weekday, weekly, and monthly calendar rules in an exact IANA time zone, bounded immutable definition history, unique natural lifecycle addresses, and complete ordinary ArrayLogic targets whose browser execution preserves ContextDB authority. Operational revisions remain separate from definition versions, and every occurrence pins both. Decision 0113 replaces the permanent fixed-shard GSI schedule projection with minute-bucketed v2 due pointers, bounded cursor catch-up, chronological owner-list pointers, bounded parallel claim/queue work, and 90-day operational occurrence retention. Deterministic tests prove three independent same-minute schedules execute through that path; sustained large-load and production proof remain incomplete. Development release `85d96a19ae635455973e58a6aa6b5eced4605b04` and workflow [33289721484](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33289721484) passed the earlier complete verification suite, 23 reset-gated deployed browser scenarios, and a five-minute live governed-schedule canary. That canary proved both a real EventBridge/SQS scheduled Compute mutation and a real two-step scheduled ArrayLogic mutation against exact browser-local ContextDB, including natural cancellation after a historical same-name schedule. A final private hard reset advanced the development epoch, deleted 3,397 runtime items and 21 generated artifacts, purged the queues, and a separate inventory observed zero items and zero artifacts. Downstream notification/email/entity channels, protected/provider workflow per-occurrence authority, protected owner-local execution while a browser is absent, sustained load proof, and production deployment remain incomplete. The older portal/EventBridge Scheduler implementation is not imported into the clean runtime.

See [decision 0111](../../decisions/0111-calendar-schedules-use-zoned-rules-and-immutable-definitions.md).

See [decision 0112](../../decisions/0112-scheduled-arraylogic-retains-browser-context-authority.md).

See [decision 0113](../../decisions/0113-time-bucketed-due-pointers-scale-schedule-dispatch.md).

See [decision 0077](../../decisions/0077-clean-governed-schedules-pin-exact-compute.md).
