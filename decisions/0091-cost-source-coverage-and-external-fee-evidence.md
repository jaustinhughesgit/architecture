# 0091 — Cost-source coverage and external fee evidence are explicit

**Status:** Accepted

## Context

1var must cover model, AWS, payment, provider, storage, and bandwidth expenses without pretending one observed charge means an entire source is reconciled. App credits, provider invoices, payment fees, and cloud invoices also use different authorities and units.

## Decision

Expose every cost source as `live`, `partial`, or `unavailable`. A durable meter is exact evidence for one source operation only.

For Stripe Checkout, retrieve the exact USD balance transaction and use its immutable ID and fee to create one idempotent payment-cost meter and balanced journal. Stripe expansion is an optimization; the gateway explicitly retrieves nested resources when Stripe returns IDs. Credit fulfillment remains independent from cost reconciliation. An authenticated billing read performs a bounded repair over recent paid Checkout journals when fee evidence was temporarily unavailable, skipping sessions with existing meters and repairing a missing journal from its exact meter. Checkout coverage remains partial until every refund, dispute, Connect fee, and payout balance transaction is ingested.

For reviewed Compute providers, keep user price and credit allocation independent from 1var's USD provider cost. Only an exact adapter declaration copied into an isolated-executor receipt can create a managed-provider cost meter. A user-supplied provider credential or quota does not create a 1var expense by inference. Provider coverage remains partial until every admitted 1var-managed adapter carries authoritative USD-cost evidence.

For AWS, apply exact platform and stage resource tags, then use activated cost-allocation tags and CUR 2.0 as payer-level invoice evidence. Per-user or per-operation usage allocation is a separate scalable layer and must reconcile back to the tagged AWS total. Until both sides exist, Compute, storage, and bandwidth coverage stays unavailable.

## Alternatives rejected

- A fixed platform charge per sentence: simple, but it does not prove or reconcile actual architecture cost.
- Applying a public Stripe percentage: it misses account-specific fees, refunds, disputes, and fee changes.
- Treating provider credit micros as USD: it merges product pricing with operating cost.
- Copying the whole AWS bill to each user: it multiplies cost and destroys attribution.

## Consequences

- Coverage claims are mechanically inspectable and fail closed.
- External transaction IDs make retries idempotent.
- A transient Stripe evidence delay does not permanently lose the payment fee or block purchased credits.
- 1var can project customer prices immediately from connected evidence while keeping unconnected sources visible.
- AWS Billing activation and CUR delivery are an operations prerequisite, not browser or API authority.

## Affected repositories

- `onevar-platform`
- `architecture`

## Security impact

Cost evidence contains exact operational identities and amounts but no protected plaintext or app credential. User-facing responses remain owner-scoped; payer-level AWS invoice evidence requires a separate operator authority.

## Verification

- Contract tests reject undeclared coverage states.
- Checkout webhook/return/read retry tests produce one exact Stripe fee meter and journal after transient evidence failure.
- Provider executor tests retain independent USD-cost evidence.
- Infrastructure synthesis tests prove platform and stage resource tags.
