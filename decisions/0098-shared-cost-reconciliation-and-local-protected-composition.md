# 0098: Shared cost reconciliation and local protected composition

## Status

Accepted; implemented in the clean `onevar-platform` development candidate.

## Context

Storing and querying an AWS bill fragment for every ordinary request would make the measurement system costlier than much of the work it measures. Stripe redirects and success callbacks do not cover refunds, disputes, transfers, payout state, or connected-account lifecycle. Protected groups, files, and multi-step logic cannot be generalized by moving their values to 1var infrastructure without violating the platform's zero-trust promise.

## Decision

The standard pricing lane uses one authoritative AWS cost record per account-stage 5 AM pricing block. A scheduled job alone holds the narrow permission to activate `onevar:stage`, retries until AWS discovers that deployed tag, proves it is active, then retrieves Cost Explorer hourly NetUnblendedCost grouped by service and refreshes the preceding seven blocks. Human and deploy identities do not receive that account-billing authority. Every hour in the exact interval must be present, including 23- and 25-hour daylight-saving blocks; missing evidence cannot be interpreted as zero cost. Provisional evidence is inspectable but cannot make rate coverage complete. Heavy operations retain separate itemization.

Signed Stripe webhooks normalize the admitted Checkout, refund, dispute, connected-account, transfer/reversal, and payout lifecycle into exact idempotent reconciliation records and balanced journals. Attribution follows 1var metadata, exact Stripe object relationships, or the exact connected-account index, never a name.

Protected groups are versioned local rosters that fan out independent exact wraps and grants. Protected files are authenticated one-megabyte AES-GCM chunks under a random content key wrapped by the browser's non-extractable device key; neither bytes nor ciphertext enter a server contract. Protected ArrayLogic admits only exact active owner-local protected JPL. Its authoring and installation contracts exclude protected requirement fields from ordinary workflow inputs; only the protected worker may inject those exact locally bound values. It executes sequentially inside that worker and retains an exact interaction-scoped step prefix only in worker memory while hardware authorization is pending so completed steps cannot replay. It persists no intermediate values and emits only final projected output plus a value-free hash-pinned receipt.

## Consequences

- Daily standard pricing scales by shared aggregates rather than per-request cloud-bill records.
- Inactive allocation tags, unavailable hourly data, and provisional AWS values fail closed for rate publication.
- Stripe retries cannot duplicate money effects, and reversal evidence never rewrites historical postings.
- Recipient groups never become shared encryption keys.
- Protected file Compute, group/file recovery, mixed-plane workflows, protected schedules, Stripe event replay operations, and heavy AWS attribution remain separate future contracts.
