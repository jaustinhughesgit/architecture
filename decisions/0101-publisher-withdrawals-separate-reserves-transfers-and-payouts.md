# 0101: Publisher withdrawals separate reserves, Connect transfers, and bank payouts

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1B development sandbox candidate.

## Context

Publisher credit, accrued cash, rolling risk reserve, money transferred into a Stripe connected balance, and money paid to a bank are separate liabilities and evidence boundaries. Collapsing them would permit reserve withdrawal, concurrent overspend, and false claims that a Connect transfer reached a bank. 1var must also remain outside the storage path for sensitive bank and tax values.

## Decision

Operations supplies one immutable payout policy per billing environment. It declares the minimum withdrawal, rolling-reserve basis points, hold duration, USD currency, Stripe-hosted tax collection, and required transfer/payout readiness. Accrual atomically creates withdrawable cash and, where required, one exact time-addressed reserve lot. Release is a separate idempotent journal that retains immutable lot history.

A withdrawal reserves only available publisher cash, reloads the exact connected account, requires active transfers, payouts, and completed Stripe-hosted requirements, and creates one idempotent separate transfer. 1var stores only bounded safe readiness counts/statuses. The successful transfer credits a connected-cash subledger, not paid-out cash. Settlement-unavailable retry behavior is refined by [decision 0108](0108-publisher-withdrawals-retry-after-settlement.md).

Stripe-hosted onboarding returns and expired-link refreshes through the publisher's exact entity route. The completed return reloads bounded readiness evidence; the refresh creates another short-lived Stripe onboarding link. Neither return path authorizes a transfer or proves money movement.

Signed Connect payout events own the bank boundary. `payout.paid` creates one exact journal from connected cash to payout clearing. An exact failed or canceled successor creates an explicit inverse. Unattributable or over-balance events are retained as `requires_review` and cannot mutate a user balance.

## Consequences

- Reserve, available, pending, connected, and paid-out balances have explicit meanings.
- Policy changes apply to new lots and do not rewrite prior evidence.
- Stripe stores identity, bank, and tax details; 1var stores no such values.
- A platform response cannot claim a bank payout from transfer success alone.
- Sandbox terms are conformance values, not production commercial policy.
- Production activation remains blocked on Stripe approval and explicit legal/finance-approved configuration.

## Affected repositories

- `onevar-platform`: contracts, ledger builders, DynamoDB transactions, Stripe gateway/event reconciliation, browser commands, infrastructure, tests, and documentation.
- `architecture`: capability status and this durable cross-layer decision.

## Verification

Deterministic tests prove accrual/reserve splitting, exact-time release, minimum/readiness failure, concurrent withdrawal exclusion, idempotent Connect transfer, signed payout transition, payout reversal, and strict balanced journals.
