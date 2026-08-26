# 0077: Clean governed schedules pin exact Compute and use a shared due index

**Status:** Accepted; implemented in `onevar-platform`, deployment proof pending.

## Context

Time must be another governed way to invoke a Compute entity, not an excuse to rediscover behavior. Storing a sentence and asking Position or an LLM to choose again at every occurrence would add latency, cost, and semantic drift. It could select another capability, another local relation, another credential, or a changed price. Creating one cloud scheduler resource per user task would also add control-plane cost and split schedule lifecycle between AWS and 1var records.

Protected provider credentials make the boundary explicit. A future invocation may use only an active grant already scoped to the exact capability version, operation, protected binding/version, asset/version, program hash, reviewed provider adapter/host/disclosure, actor policy, and hardware authorization window. A schedule cannot become standing plaintext access.

## Decision

The caller's browser may use ordinary language once to select or install a capability. Schedule creation then freezes one exact target containing the caller-local installation ID, capability/version/operation, immutable package ID and content hash, compiler-owned JPL hash, typed inputs including exact entity/relation references, and a per-occurrence price ceiling. Occurrences perform no model, RAG, Position, or natural-language discovery.

One DynamoDB `ScheduleDueIndex` stores both active schedules and retryable occurrences across sixteen deterministic shards. Its reserved two-letter keys (`sd`, `sn`) do not collide with the compact one-letter fields already owned by other row contracts. One EventBridge one-minute cadence claims due schedules atomically and creates a deterministic occurrence and Compute invocation identity. SQS separates dispatch from execution, supports partial-batch failure, and redrives infrastructure failures to a DLQ. Domain retries retain the exact occurrence and invocation IDs, so provider idempotency, effect proof, and credit settlement cannot duplicate.

Every occurrence reloads the exact release and package, verifies availability and the price ceiling, executes as the schedule owner, and reuses the normal Compute/provider lifecycle. A timed protected executor grant may authorize multiple occurrences only within its pre-existing exact scope; each occurrence still creates a separate invocation-specific grant-use receipt. Missing or expired authority cancels any still-unexecuted provider operation, releases its reservation, and pauses the schedule. No other credential is selected and no plaintext fallback exists.

Results enter a durable browser inbox. Ordinary Compute results rejoin the exact active local installation before its declared Context effects and response template run. Protected provider results remain executor-encrypted for the exact browser recipient key. Execution commit and browser delivery acknowledgement are distinct. Pause, resume, cancel, retry, history, failure, and acknowledgement use stable IDs.

The first clean contract admits one-time and fixed-rate schedules. It does not yet admit calendar expressions, schedule edits/migrations, multi-step automation definitions, non-browser result channels, or owner-local protected Compute while the browser is absent.

## Consequences

- Scheduling composes with existing immutable packages, JPL, protected grants, provider idempotency, effect proof, and credit settlement instead of creating a second execution architecture.
- Millions of schedules use data-plane rows and bounded shared workers rather than millions of individual AWS scheduler resources.
- Revocation, price change, rotated credential material, expired authority, missing actor, or missing package fails closed at occurrence time.
- A local graph mutation is not proven until the browser imports the exact occurrence result and commits its exact installation binding.
- Ordinary `reset context` preserves durable schedule lifecycle evidence; the private non-production hard reset removes it with all runtime records.
