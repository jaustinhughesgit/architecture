# 0102: Exact credit provenance gates publisher cash

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1B development sandbox candidate.

## Context

A credit is not automatically evidence that 1var received cash. Promotional onboarding credit and Stripe-purchased credit previously shared one aggregate available balance. That permitted a promotion-funded marketplace purchase to create publisher credit, accrue a USD liability, and request a Connect transfer with no matching platform funds.

## Decision

The production ledger separates cash-backed and promotional available/reserved credit accounts and projects both into the aggregate user balance. Stripe Checkout creates only cash-backed credit. Campaigns create only promotional credit. Standard first-party interactions consume promotional credit first, then cash-backed credit.

User-to-user marketplace transactions and external provider liabilities require cash-backed credits. Their immutable journals retain the exact source through reservation, settlement, refund, publisher payable, cash accrual, and withdrawal. Existing positive aggregate-only balances migrate conservatively to promotional provenance with a compare-and-swap update; they are never guessed to be cash-backed.

A Stripe insufficient-platform-balance transfer error cannot erase earnings or masquerade as success. [Decision 0108](0108-publisher-withdrawals-retry-after-settlement.md) supersedes the earlier release-and-resubmit behavior: the exact request now remains reserved and retries automatically after settlement.

## Consequences

- Onboarding promotions cannot mint withdrawable publisher cash.
- Ordinary 1var platform use can still consume promotional value.
- Cash and promotional balances are visible and independently enforceable at DynamoDB transaction boundaries.
- Old development balances remain usable for first-party charges but require a real Checkout purchase before marketplace or paid-provider use.
- Stripe test bank details are valid sandbox destinations; missing platform funds are a platform accounting condition, not a publisher onboarding failure.

## Affected repositories

- `onevar-platform`: billing contracts, journal builders, DynamoDB projection/migration, service gates, Stripe error handling, Runtime Console, tests, and layer documentation.
- `architecture`: platform model, capability status, and this durable decision.

## Verification

Cross-layer tests prove promotional issuance, conservative legacy migration, blocked promotion-funded marketplace installation with zero publisher payable, successful cash-backed installation, source-preserving refunds, and durable reservation after Stripe reports an unavailable platform balance.
