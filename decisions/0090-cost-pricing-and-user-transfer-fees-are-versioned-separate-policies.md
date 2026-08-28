# 0090 — Cost pricing and user-transfer fees are versioned separate policies

**Status:** Accepted

## Decision

Keep immutable raw operating-cost evidence separate from both customer cost pricing and user-to-user credit-transfer economics.

The initial development cost-pricing policy declares:

- 140% of measured platform and payment-processing cost;
- 120% of measured model cost;
- 110% of an app-provider cost paid by 1var; and
- a separate 3% fee when credits move from one user to another.

The first three are cost multipliers. The 3% value is a transfer fee on credit value and is not a provider markup, a Stripe-cost estimate, or proof that payment cost is covered. Stripe fees remain payment cost evidence under the platform multiplier.

Cost meters retain exact source, operation, quantity, unit, estimated or actual USD micros, and time. A versioned policy projects a charge from that evidence without changing it. Marketplace installation is the first production-ledger user-to-user transfer. Its exact purchase journal freezes publisher amount, platform amount, fee rate, and policy version; an approved refund reverses that journaled split and never consults a newer policy.

## Consequences

- A cost or markup change creates a new policy version rather than rewriting history.
- Raw cost, projected customer charge, projected gross profit, and user-transfer fee remain independently inspectable.
- A 100-credit transfer yields 97 recipient credits and 3 platform credits; whole-credit-micro rounding stays with the recipient.
- A shared integer-safe split primitive can serve future direct transfers, but only marketplace installation currently exercises the production user-to-user path.
- Model meters are live. Compute, payment, managed-provider, storage, and bandwidth feeds remain partial until they are connected to authoritative usage or invoice evidence.
- A projection is not authority to debit production credits. Reservation and settlement require their own accepted policy and journal flow.
