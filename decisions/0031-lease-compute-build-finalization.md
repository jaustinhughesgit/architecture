# 0031: Lease compute-build finalization and preserve terminal diagnostics

## Context

A browser may stop waiting before a Lambda finishes a completed background model response. Its next status request can therefore overlap entity materialization or arrive after the coordinator has recorded failure. The build previously allowed overlapping finalization, replaced the useful terminal cause with “cannot resume,” and skipped generated Shorthand entirely when the parent workspace file was absent or unreadable.

## Decision

Completed background capability output has one short server-side finalization lease. Other Lambdas return resumable `BUILD_PENDING` state while that lease is active; only its holder may mark the build completed or failed. A terminal failure retains a bounded code and sanitized message so later polling receives the original cause.

Approved generated capability Shorthand may start from an empty published object when no parent workspace document is readable. The parent is context, not a prerequisite for creating the separately addressed child entity. The ordinary Shorthand routes, canonical entity persistence, manifest validation, registry write, and coordinator completion remain authoritative.

## Consequences

- Gateway/browser timeout retries cannot concurrently finalize the same model response.
- A lost finalizer can be retried after the bounded lease expires.
- Cold capability creation works from a new or missing workspace document.
- Polling exposes deterministic terminal diagnostics without exposing prompts, credentials, protected values, or hidden reasoning.
- Durable server continuation of model jobs beyond the browser-held response handle remains incomplete work.
