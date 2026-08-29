# 0104: One interaction root has one settlement and heavy server attribution

## Status

Accepted; implemented in the `onevar-platform` Phase 5.1 development sandbox.

## Context

Authoring, JPL, reviewed providers, schedules, and remote transcription historically reached production billing through different code paths. A workflow continuation or retry could therefore be charged twice, while a long Lambda operation could be hidden inside an ordinary daily average. Provider production execution also retained a conformance test-credit shadow posting. These boundaries made cost evidence incomplete and could make ordinary users subsidize exceptional work.

## Decision

Every remote interaction is assigned one exact interaction-root ID. The first successful settlement creates one immutable pricing receipt and one balanced production-ledger debit. A retry or continuation may recover that receipt for the same owner but cannot create a second debit; an owner mismatch is a conflict.

A settling server operation at or below five seconds and 5,000 total model tokens uses the frozen standard rate for the current 5 AM America/New_York pricing block. An operation exceeding either threshold is heavy and records exact model usage together with server cost calculated from an immutable versioned rate card: provider, region, architecture, Lambda memory, request rate, GB-second duration rate, and response bytes. Heavy platform and model totals remain visible evidence but are subtracted from shared tagged AWS blocks before the next standard-lane average is calculated.

The browser reserves one interaction root for a spoken input before ordinary audio leaves the device. Every transcription segment and the resulting local answer, authoring job, or Compute invocation reuses it. Transcription must return authoritative token or duration usage, records model cost, and does not independently debit. Missing model pricing, missing usage, missing heavy server policy, insufficient production credits, or a conflicting receipt fails closed before the transcript, provider result, external effect, or authoring artifact is released. Production provider operations use only the production ledger; conformance test-credit accounts remain available solely for explicit fixtures. See [decision 0105](0105-conservative-application-cost-estimates-and-one-spoken-root.md).

## Alternatives

- Charge each internal step independently. Rejected because implementation topology would determine price and retries could double-charge.
- Put all server work into the daily average. Rejected because exceptional work would be subsidized by ordinary users and obscure abuse.
- Reconcile only from delayed AWS account totals. Rejected because heavy work needs immediate bounded attribution even before Cost Explorer finalizes a block.
- Preserve a parallel test-credit shadow ledger. Rejected because two money authorities can disagree.

## Consequences

- All remote Compute entry points share one production money boundary.
- Ordinary daily rates exclude explicitly itemized heavy work.
- Remote speech has auditable model and platform cost instead of being an unpriced transport.
- A response or external effect cannot escape when its authoritative billing evidence is incomplete.
- Versioned application estimates are the launch pricing source. Cost Explorer remains diagnostic account-stage evidence; exact heavy meters are immediate scoped estimates and do not claim invoice-grade AWS allocation.
- Production activation requires explicit versioned product, model, server, payout, and publisher-conversion policies and rejects sandbox Stripe mode.

## Affected repositories

- `onevar-platform`: production billing contracts and repository, API settlement paths, transcription provider, pricing compiler, deployment configuration, tests, and layer documentation.
- `architecture`: platform model, capability status, and this decision.

## Security impact

The server sees no new protected plaintext. Pricing identities bind only ordinary transport and usage evidence. Fail-closed settlement prevents unpaid model output, provider disclosures, and external effects from crossing the response boundary.

## Migration

Existing production receipts remain valid and idempotent. New calls provide explicit interaction-root IDs. Production provider operations stop creating conformance-credit postings. Development receives an immutable sandbox server rate card and transcription price; production must supply approved explicit equivalents before synthesis.

## Verification

Contract tests prove standard and heavy pricing, exact Lambda request/duration/bandwidth computation, heavy exclusion from standard aggregates, receipt idempotency, and missing-policy refusal. Cross-layer tests prove authoring, JPL, reviewed providers, scheduled execution, and token- or duration-metered transcription all settle through the production ledger, while a production provider reservation creates no conformance-credit account or entry. Infrastructure tests prove incomplete production billing configuration cannot synthesize.
