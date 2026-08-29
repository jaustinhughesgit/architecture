# 0108: Publisher withdrawals remain reserved through Stripe settlement

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1 candidate.

## Context

Stripe can verify a customer's payment before the corresponding platform funds become available for an ordinary Connect transfer. The earlier withdrawal path interpreted that temporary timing gap as a failed request, released publisher cash, and required the publisher to submit another command. That exposed Stripe settlement mechanics to every publisher and made a valid withdrawal depend on manual retries.

The system must not create duplicate transfers, repeatedly poll from every browser, or claim that pending money reached a connected account or bank.

## Decision

Withdrawal admission atomically moves exact publisher cash from withdrawable to pending and writes one versioned withdrawal record before contacting Stripe. The record pins owner, connected account, amount, payout policy, optional Checkout/charge provenance, immutable withdrawal identity, attempt count, retry time, revision, and safe failure classification.

An insufficient platform balance is a transient `pending_settlement` outcome. It does not release cash. One stage-level scheduled worker shares the existing scheduling heartbeat, skips four of every five one-minute ticks, queries a sharded due index, and retries with the immutable withdrawal ID as Stripe's idempotency key. Reusing that heartbeat avoids another EventBridge rule and does not change the fixed per-stage scaling model. Browser replay returns the same durable state and does not contact Stripe before the due time. Retry delay grows exponentially from fifteen minutes and is capped at one day. A definitive provider failure changes the record to terminal `failed` and atomically releases the exact reservation. Success atomically writes transfer evidence and moves pending cash to connected cash.

Transfer success still does not prove bank payout. Signed connected-account payout events retain that separate boundary.

## Alternatives

- Require publishers to retry manually: rejected because settlement timing is a platform responsibility.
- Poll Stripe from each browser: rejected because it scales with active clients, duplicates work, and excludes offline publishers.
- Create a new transfer identity on each attempt: rejected because it can duplicate money movement.
- Leave money withdrawable while retrying: rejected because concurrent requests could overspend the same earnings.

## Consequences

- A publisher requests a withdrawal once and may close the browser.
- Pending cash is unavailable to another withdrawal until transfer or explicit terminal release.
- One stage worker, not millions of clients, owns retries.
- DynamoDB due-index reads are bounded across fixed shards and do not scan the ledger.
- Runtime messaging distinguishes pending Stripe settlement, connected balance, and bank payout.

## Affected repositories

- `onevar-platform`: production-billing contracts/repository, service, Runtime Console, retry Lambda, infrastructure, tests, and layer documentation.
- `architecture`: platform model, capability status, and this decision.

## Security and financial integrity

The worker receives no card, bank, tax, or protected-data values. Exact identities, revision checks, balanced journals, and Stripe idempotency prevent double reservation and double transfer. The public browser cannot accelerate a not-yet-due attempt.

## Migration

New withdrawals use the durable record. Earlier failed requests that released their reservations are not silently reconstructed; their publishers submit one new withdrawal after deployment. Existing completed transfers and payout evidence remain unchanged.

## Verification

Contract tests reject inconsistent pending/transfer evidence. Service tests prove reservation retention, quiet idempotent browser replay, scheduled retry after the due time, exact one-time transfer, and the final pending-to-connected ledger transition. Infrastructure synthesis proves the private stage-level worker shares the existing heartbeat and creates no additional EventBridge rule.
