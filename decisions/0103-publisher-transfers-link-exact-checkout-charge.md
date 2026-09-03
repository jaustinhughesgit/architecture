# 0103: Publisher transfers link the exact Checkout charge

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1B development sandbox candidate.

## Context

Stripe may verify and fulfill a buyer's Checkout before the platform charge becomes available. The buyer can then spend those cash-backed credits and create valid publisher earnings, but an ordinary Connect transfer still fails against the platform's available balance. The payout destination and test bank details are unrelated to that timing boundary.

## Decision

When one exact Checkout lot proves a cash-backed marketplace debit, the immutable marketplace journal retains its Checkout Session ID. Publisher withdrawal traces attributable earnings to one such Session, retrieves and verifies its successful USD charge, and freezes both external IDs in the reservation before calling Stripe. Stripe object IDs remain bounded, prefix-typed provider identifiers; 1var does not freeze Stripe's current suffix alphabet into its permanent billing contract.

The Connect transfer supplies that charge as `source_transaction` and omits a withdrawal-specific `transfer_group`, allowing Stripe to preserve the group already owned by the exact Checkout charge. The immutable withdrawal ID remains transfer metadata and the idempotency identity. A transfer funded from the settled platform balance instead uses that withdrawal ID as its transfer group. The completed transfer journal repeats the identifiers. Legacy marketplace purchases may recover the source only from one unambiguous paid Checkout. Fragmented or ambiguous funding uses the ordinary settled-platform-balance path and never guesses a charge. Temporarily unavailable or object-family-invalid source evidence also falls back to that path; Stripe balance timing then yields a durable pending retry rather than a malformed-request response.

## Consequences

- A valid publisher transfer can be created while the buyer charge is pending; Stripe releases the recipient funds when that charge settles.
- Buyer cash issuance, marketplace spend, publisher accrual, reservation, and transfer remain auditable by exact identity.
- A retry cannot switch its frozen funding charge.
- A source-linked transfer cannot conflict with the Checkout charge by inventing another transfer group.
- Connected-balance delivery still is not bank-payout proof; only signed payout lifecycle evidence crosses that boundary.
- Provider identifier drift and unavailable charge expansion cannot invalidate a publisher's otherwise valid withdrawal command.

## Affected repositories

- `onevar-platform`: Stripe gateway, production journal metadata, exact provenance resolution, billing repositories, regression tests, and layer documentation.
- `architecture`: platform model, capability status, and this decision.

## Verification

A cross-user regression purchases credits through one paid Checkout, charges the buyer's cash-backed balance for a marketplace installation, accrues publisher cash, and proves the resulting withdrawal passes that Checkout's exact successful charge as the Stripe source transaction. A Stripe-request boundary regression proves that source-linked transfers omit `transfer_group`, while settled-platform-balance transfers retain the exact withdrawal group. A provider-identifier regression proves unfamiliar safe suffixes remain accepted and unusable charge evidence enters the settled-balance path without losing the withdrawal.
