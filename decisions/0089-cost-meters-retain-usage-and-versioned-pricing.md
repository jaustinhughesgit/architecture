# 0089 — Cost meters retain usage and versioned pricing

**Status:** Accepted

## Decision

Store authoritative usage quantities independently from product pricing. A completed model response retains exact provider, returned model, input/output token quantities, response, stage, and operation identity. An explicit versioned operations price maps those quantities into deterministic estimated cost records and balanced `usd_micro` journals.

A public model alias in the operations price may match either the exact provider-returned identifier or a strictly dated provider snapshot of that same alias. The meter still retains the exact returned identifier. Preview names, neighboring families, and arbitrary prefix matches do not inherit the configured price.

Operating-cost evidence does not itself debit user credits, price a capability, or calculate publisher earnings. Those remain separate governed contracts. Sub-cent costs must not be prematurely rounded into cash-settlement cents.

The versioned customer cost multipliers and user-to-user transfer fee are defined separately in [decision 0090](0090-cost-pricing-and-user-transfer-fees-are-versioned-separate-policies.md).

## Consequences

- Reconciliation can compare exact usage with later provider invoices.
- Pricing changes append a new version and do not rewrite historical evidence.
- Other authoritative Compute, payment, provider, storage, and bandwidth sources can adopt the same boundary.
- The implementation is a model-cost foundation, not a claim that all production costs are metered.
