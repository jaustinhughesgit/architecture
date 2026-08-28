# 0099: Stripe refunds reverse exact credit issuance

## Status

Accepted; implemented in the clean `onevar-platform` development candidate.

## Context

A refund created in Stripe is external money authority. A browser return cannot be required for it, and merely recording refunded cash leaves the corresponding purchased credits usable. Signed webhook delivery may be delayed or misconfigured, while API polling on every request would be wasteful.

## Decision

Each billing deployment privately creates or updates one platform and one Connect Stripe event destination and stores their one-time signing secrets in the existing Stripe core secret. The public API has read-only secret authority and verifies any exact installed signing secret. Unknown destinations are not modified.

A successful refund of a 1var credit-pack Checkout creates one balanced `stripe_refund` journal identified by the Stripe refund ID. It reverses customer cash liability and the cumulatively proportional credit issuance from the immutable purchased pack. Cumulative integer calculation ensures that the last full refund reverses every purchased credit after any partial refunds. Signed webhook and authenticated Stripe API evidence remain separate reconciliation records but reuse that one journal.

Authenticated billing reads provide bounded repair: at most ten recent paid Checkouts, no more than one scan per minute per Checkout, and at most 100 refunds per Checkout. Larger histories fail closed for operator reconciliation. If prior spending means the refund exceeds available credits, the resulting negative balance is explicit debt that blocks spending and is reduced by later issuance.

## Consequences

- A Dashboard/API refund no longer depends on the purchaser returning in the same browser.
- Webhook/API races and retries cannot apply one refund twice.
- Partial refunds preserve the original credit-pack ratio and never use current pricing.
- External refunds cannot be concealed by retaining or clamping credits.
- Replay operations, alerts, production Stripe approval, and dispute-specific credit reversals remain separate work.
