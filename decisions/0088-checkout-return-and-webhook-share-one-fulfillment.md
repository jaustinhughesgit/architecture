# 0088 — Checkout return and webhook share one exact fulfillment

**Status:** Accepted

## Decision

Treat Stripe webhook delivery and the successful Checkout return as independent transports into the same exact idempotent fulfillment transaction.

The return page supplies only a Checkout Session ID. The API retrieves the authoritative session from Stripe and requires exact agreement across paid status, authenticated owner, stored open checkout, pack, credits, amount, currency, metadata, and live/test mode. No browser-supplied payment fact is trusted. Signed webhooks remain necessary for buyers who do not return.

The browser stores its rendered non-system terminal projection in same-tab session storage before redirect and restores it afterward. This projection does not weaken the protected-data boundary or place protected plaintext on the server.

## Consequences

- Browser return provides immediate visible fulfillment while webhook delivery guarantees eventual fulfillment.
- Either transport may arrive first; repeated returns and webhook replay remain exactly once.
- A malformed, cross-owner, unpaid, wrong-amount, or wrong-mode session fails closed.
- Reset-gated deployment acceptance can be disabled for a recovery deployment so an existing checkout record is not erased before reconciliation.
