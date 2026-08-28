# 0095: Marketplace currency selects an exact ledger

## Status

Accepted implementation candidate.

## Decision

A signed marketplace release declares either purchased production credits or conformance-only test credits. Its immutable install transaction repeats that currency. The API selects the ledger from this signed evidence rather than inferring currency from the deployment environment.

A billing-enabled environment rejects a nonzero test-credit listing before installation. A conformance environment rejects a nonzero production-credit listing. Production installation posts only to the balanced production journal; conformance installation posts only to the test ledger. Refunds require the transaction currency to match its release and reverse the original ledger evidence. A historical test-labelled transaction may reverse a production debit only when an existing production purchase journal proves that legacy debit.

## Consequences

- Test-labelled software cannot silently spend purchased user balances.
- Search, installation, refund, publisher attribution, and audit retain one exact unit identity.
- Free legacy releases can remain readable while paid releases must be republished into the correct lane.
- The protected-provider transitional operation record still needs the same explicit production-currency migration.

