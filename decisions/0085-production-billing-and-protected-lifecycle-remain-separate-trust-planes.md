# 0085 — Production billing and protected lifecycle remain separate trust planes

**Status:** Accepted

## Decision

Production money movement uses an append-only double-entry journal and Stripe's verified server boundary. Protected data continues to use browser-held keys, exact recipient wraps, and declared local or explicitly trusted execution planes. Payment authority never grants protected-data authority, and protected authority never grants payment or payout authority.

Stripe-funded production credits are distinct from non-cash conformance credits. Stripe webhooks are evidence for cash settlement, not authority to rewrite ContextDB or Protected Assets. Protected approval notifications contain safe request identity only and reuse the four-mode sync change-hint/pull mechanism.

## Consequences

- A connected publisher account can receive earnings without receiving user Context or Protected Assets.
- A protected grant cannot charge a user unless a separate exact production reservation exists.
- Account passkeys, payment identity, and protected hardware/key ceremonies stay categorically distinct.
- Owner-local protected work cannot run while the browser is absent unless the user selects a different trust mode.
