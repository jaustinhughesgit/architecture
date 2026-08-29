# 0092 — Two-lane daily interaction pricing

**Status:** Accepted, development candidate implemented 2026-08-27.

## Decision

1var prices billable server interactions through two mutually exclusive lanes.

- **Standard lane:** an interaction completes in at most five seconds and uses at most 5,000 total OpenAI input plus output tokens. The user pays the frozen standard rate for the active 5:00 AM-to-5:00 AM `America/New_York` block. That rate is calculated from the preceding completed block: `(standard platform cost × 140% + standard model cost × 120%) / completed standard interactions`, rounded up to the configured credit unit.
- **Heavy lane:** exceeding either threshold requires exact itemized cost evidence for that interaction. Platform costs use 140%, model costs use 120%, and a 1var-managed provider cost uses 110%. Heavy cost never enters the standard average.

The active standard rate never changes inside its block. Under decision 0105, a source block is complete for launch pricing when it includes the versioned conservative per-root platform allowance and exact model usage aggregate. Delayed cloud-invoice coverage remains separately inspectable and cannot lower or rewrite the application-estimate rate.

Local-only ContextDB, Path, and presentation work is free because it consumes no 1var server resources. Billing and pricing inspection are also free. Marketplace user-to-user value transfer remains a separate 3% policy and must not be mixed into runtime cost pricing.

## Evidence and scale

Lane 1 retains one compact idempotent charge receipt per financial transaction and only aggregate count/platform/model cost for pricing. It deliberately does not retain per-interaction duration, tokens, or cost detail. Lane 2 retains exact itemization for disputes, abuse analysis, and cost proof.

Daily aggregation is split across 256 deterministic DynamoDB shards. User debit, spent balance, compact receipt, journal, and one shard increment commit in one transaction. A pricing read merges shards; a normal invocation never reads them. This avoids a global hot counter while preserving exact retry behavior.

The CLI exposes `pricing today`, `pricing next estimate`, `pricing history`, and `pricing policy`. Raw cost meters remain independent accounting evidence.

## Consequences

- Typical server interactions have predictable, cheap charging and bounded billing storage.
- Slow or token-heavy work cannot externalize its cost into the normal-user average.
- Production activation fails closed until the versioned application-estimate platform policy and exact model pricing are loaded; delayed invoice allocation is diagnostic.
- The initial sandbox bootstrap rate is configuration, not a production price or a claim of complete cost coverage.
