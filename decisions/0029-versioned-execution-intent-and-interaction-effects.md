# 0029: Version Execution, Intent Jurisdiction, and Interaction Effects

- Status: Accepted
- Date: 2026-08-11

## Context

Browser-local Paths, dynamic `fileWorker` functions, Compute/JPL, Message, Automation, and registered navigation had working but separate result shapes. Compute discovery also used one ambiguous `extend` outcome for both repair and contract expansion. That made provenance, authority, and downstream effect application difficult to compare without weakening the established trust boundaries.

## Decision

- Adopt execution-envelope v1 for invocation, result, and typed effect records across the three planes.
- Keep plane authority separate. In particular, `fileWorker` returns requested effects and cannot mark them applied.
- Adopt intent-jurisdiction v1 with the lowest sufficient effect class and explicit reuse/repair/fork/build evolution outcome.
- Treat presentation, speech, automation, and navigation as governed effects addressed to registered module/entity targets. Retain legacy fields only as compatibility fallbacks.
- Treat coordinated-person collection as an authorized graph set query. Exact named hydration and current-speaker identity establish the candidate set; the local graph aggregates only returned, authorized records.
- Forbid executable source in invocation/result/effect payloads.

## Alternatives

- **One shared executor.** Rejected because it would collapse local privacy, worker isolation, and server authorization.
- **Keep module-specific messages.** Rejected because effects and provenance would remain incomparable and hard to govern.
- **Let `extend` mutate a related capability.** Rejected because an added operation changes the contract and requires a fork, while a broken promised operation requires repair.
- **Send a group query to an LLM or Compute.** Rejected when authorized graph records and a deterministic aggregate are sufficient.

## Consequences

New and old callers coexist during migration. Consumers prefer v1 effects and fall back to legacy fields. The shared-data aggregate becomes vocabulary-neutral and reusable, while authorization remains server-derived. Envelope validation adds small payload and validation cost. Full JPL effect declaration, immutable evolution releases, and all interaction-module adoption remain future phases of the same contract.

## Affected repositories

- `architecture`: contracts, migration status, capability catalog, and this decision.
- `aws`: browser producer/consumers, group Path/operation, bound entity sets, and tests.
- `compute`: Compute envelope boundary, jurisdiction/evolution decisions, and tests.
- `aws-api`: forwards the existing request/response body; no authority moves into the proxy.

## Security impact

The contract names authority; it does not grant it. Server governance, participant/profile hydration, protected-asset policy, and zero-trust restrictions remain independent checks. `fileWorker` cannot self-authorize effects. Group aggregation cannot expand the server-authorized graph. Diagnostics and traces contain bounded identifiers and statuses, not prompts, credentials, or protected plaintext.

## Verification

Tests cover the three plane values, file-worker effect denial, source rejection, browser and Compute jurisdiction, repair versus fork, coordinated Path collision exclusion, multiple named hydration labels, authorized set aggregation, response rendering, presentation, speech, and legacy compatibility.
