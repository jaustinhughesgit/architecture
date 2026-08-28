# 0096: Versioned promotional credits use the production ledger

## Status

Accepted implementation candidate.

## Decision

A 1var promotional campaign issues production credits through a balanced double-entry journal. It is not a test-credit grant, a cash purchase, publisher income, or a billing bypass. The immutable campaign version plus exact owner entity ID identifies one issuance and makes account reads, billable requests, reloads, retries, and concurrent calls idempotent.

The journal debits platform credit issuance and credits the user's production-credit available subledger. No USD posting is created because 1var received no cash. Development configures a 100-credit `development-onboarding-v1` campaign so a clean account can prove its first metered server interactions. Production defaults to no campaign unless one is explicitly configured.

## Consequences

- Clean-reset acceptance uses the same production-credit checks as users.
- Purchased, earned, promotional, and conformance credits retain separate evidence.
- A newly configured campaign may reach an existing account once at its next billing boundary; eligibility is the campaign contract, not guessed account age.
- Campaign changes require a new version and therefore create separately auditable issuance.
