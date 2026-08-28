# 0100: Stripe money events use a bounded durable inbox

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1A development candidate.

## Context

Exact event identities and double-entry journals made Stripe retries idempotent, but doing reconciliation in the public webhook request coupled Stripe acknowledgement to external reads and accounting latency. The platform also lacked its own dead-letter signal and post-fix replay boundary.

## Decision

The exact Stripe route verifies the raw signature in a small ingress before admitting the verified event snapshot to an SQS-managed encrypted inbox. It then returns `202`. A separate least-authority worker performs idempotent money reconciliation. Five unsuccessful deliveries enter an encrypted fourteen-day dead-letter queue and raise a CloudWatch alarm. A private hourly sweeper handles at most ten messages and grants each event at most three redrives; invalid or exhausted messages remain for operator review.

The browser return continues to retrieve Checkout from Stripe directly and converges on the same immutable purchase journal. The hosted Checkout URL is returned only after Stripe's authoritative Session `livemode` matches the configured 1var environment.

## Consequences

- Signed delivery is acknowledged after durable admission, not after complex accounting.
- Stripe retries, SQS retries, redrives, verified returns, and bounded repair reads cannot duplicate money effects.
- Operational failures are bounded and visible.
- Production activation still requires Stripe approval plus legal, tax, reserve, and withdrawal policy.
