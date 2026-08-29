# 0105 — Conservative application cost estimates and one spoken root

## Status

Accepted for the closed-beta launch candidate on 2026-08-28.

## Context

1var needs useful, profitable launch pricing before account-scale cloud invoices are statistically representative. Invoice reconciliation is useful accounting evidence, but it is delayed, noisy at small volume, and not required to decide the price of each input. Ordinary voice input also crosses transcription, local interpretation, and optional server Compute; charging each crossing independently would make one user request appear to be several products.

## Decision

The launch candidate prices from conservative application-measured estimates. Every billable interaction root receives a versioned raw AWS overhead allowance covering API Gateway, DynamoDB, S3, CloudFront, queues, KMS, logs, and monitoring. A standard root writes one idempotent aggregate `interaction_root` meter for that allowance so account cost reporting and the daily pricing aggregate contain the same raw amount without creating per-service rows or a second charge. Heavy roots include the allowance inside their server-operation meter and additionally meter Lambda requests, duration, configured memory/architecture/region, and response transfer. Exact model usage and reviewed 1var-managed provider costs remain separate raw evidence. Cost Explorer and Stripe reconciliation remain diagnostic accounting feeds; they do not gate or rewrite the launch price.

One spoken request reserves one `int_*` root before ordinary audio leaves the browser. All ordinary transcription segments, ContextDB evidence, Convert authoring, Compute invocation, and final response reuse that root. Transcription records model cost but does not independently debit. The terminal server operation settles the root, or the browser calls the idempotent finalizer when the answer was completed locally. A root has at most one pricing receipt and one debit.

The approved closed-beta economics are:

- 1,000 production credits cost $1.55;
- each new account receives one versioned 1,000-credit promotional grant;
- 10 publisher credits convert to $0.01;
- publisher withdrawal minimum is $10;
- 10% rolling reserve is held for 30 days;
- marketplace transfers retain 3%;
- platform estimates are charged at 140% of raw estimated cost;
- LLM estimates are charged at 120%; and
- 1var-managed provider estimates are charged at 110%.

The standard lane remains at most five seconds and at most 5,000 total model tokens. Its next 5 AM rate uses the preceding block's aggregate application estimate. Heavy roots exceeding either threshold remain individually itemized. Rates, allowances, and multipliers are immutable versioned policy inputs; changing them never rewrites old evidence.

## Consequences

- Launch pricing can be conservative and understandable without claiming invoice-grade allocation.
- Small AWS services do not require a write-amplifying per-service ledger entry on every standard input.
- One microphone request cannot be charged once for transcription and again for its answer.
- Promotional credits can fund 1var platform work but cannot become publisher cash.
- Delayed AWS and Stripe reconciliation can reveal policy error and inform the next version without changing prior receipts.
- Closed-beta access control remains an independent identity/admission boundary; a pricing variable alone must never be represented as access enforcement.
