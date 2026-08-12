# 0032: Preserve nested Compute failures and bound background replacement

## Status

Accepted.

## Context

`aws-api` can successfully relay an HTTP request whose Compute application result is `{ok:false}`. The browser previously checked only HTTP status, unwrapped that object as if it were a capability result, and rendered a fabricated `UNKNOWN` build status. A failed OpenAI background response also remained the active job identity even when starting a fresh job was safe.

## Decision

Compute failures return a sanitized typed diagnostic containing code, stage, retryability, safe provider status when available, and message. The browser treats nested `ok:false` as failure regardless of the relay's HTTP status and rejects capability envelopes without `build.status`.

Retryability authorizes replacement, not unbounded polling. The browser may start at most two replacement discovery jobs and two replacement build jobs. It persists those counters with the resumable browser job. Configuration, authorization, invalid-job-identity, and other terminal failures are not replaced.

## Alternatives

- Requiring the relay to translate every Compute failure into a non-2xx response would improve HTTP semantics but would not protect existing or other nested callers.
- Polling the same terminal OpenAI response cannot recover it.
- Rebuilding indefinitely would spend unpredictably and hide deterministic faults.

## Consequences

- The user sees the owning error instead of `UNKNOWN`.
- Transient or model-contract failures can recover through a small, observable replacement budget.
- Retry count survives browser reload with the background job.
- No prompt, credential, protected value, header, cookie, or hidden reasoning enters the diagnostic.
- Server-owned durable job orchestration remains future work.

## Affected repositories

- `compute`: classifies and sanitizes application failures.
- `aws`: recognizes nested failures, bounds replacement, and renders typed diagnostics.
- `architecture`: records the cross-layer result contract.

## Verification

- Unit tests prove sanitization and retry classification.
- Browser contract tests prove nested failures, terminal failures, the replacement bound, and missing-status rejection.
- Full Compute and browser suites cover surrounding capability discovery, build, protected assets, and Path installation.
