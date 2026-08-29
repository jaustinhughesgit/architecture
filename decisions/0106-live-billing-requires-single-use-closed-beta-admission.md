# 0106 — Live billing requires single-use closed-beta admission

## Status

Accepted for the initial live-money promotion.

## Decision

Production billing is admitted only behind single-use closed-beta invitation codes. Operators distribute plaintext codes out of band and deploy only their SHA-256 digests. The API validates a submitted code in constant time and atomically claims the digest in the same canonical transaction that creates the primary entity, session, and initial conformance-credit records. Missing, invalid, and replayed codes fail without creating partial users. Existing passkey-authenticated accounts bypass account creation rather than bypassing the gate.

Production Stripe setup must prove an `sk_live_` credential before it creates separate platform and connected-account webhook destinations. Non-production Stripe setup must prove an `sk_test_` credential. Runtime Checkout and webhook processing retain their independent authoritative `livemode`, amount, currency, owner, pack, signature, and idempotency checks.

## Consequences

- Enabling live billing cannot accidentally make account creation generally public.
- Invitation identity is durable and exact without retaining the invitation plaintext.
- The gate controls admission only; it grants no Context, marketplace, protected-asset, billing, or publisher authority.
- A later waitlist, organization invitation, or verified-email system may issue the same single-use claim primitive without changing primary-entity creation semantics.
