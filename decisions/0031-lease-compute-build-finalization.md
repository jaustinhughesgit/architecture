# 0031: Lease compute-build finalization and preserve terminal diagnostics

## Context

A browser may stop waiting before a Lambda finishes a completed background model response. Its next status request can therefore overlap entity materialization or arrive after the coordinator has recorded failure. The build previously allowed overlapping finalization, replaced the useful terminal cause with “cannot resume,” and skipped generated Shorthand entirely when the parent workspace file was absent or unreadable.

## Decision

Completed background capability output has one short server-side finalization lease. Other Lambdas return resumable `BUILD_PENDING` state while that lease is active; only its holder may mark the build completed or failed. A terminal failure retains a bounded code and sanitized message so later polling receives the original cause.

A provider response may report `queued` or `in_progress` only for a bounded lifetime. Discovery normalizes seconds, milliseconds, and ISO provider timestamps; a pending response without a usable timestamp fails retryably because the server cannot prove its age. Capability generation uses the build coordinator's immutable server-owned start instead, so a provider timestamp cannot move the cutoff forward. Exceeding the lifetime becomes the typed, retryable terminal failure `OPENAI_BACKGROUND_RESPONSE_STALLED`; it cannot remain `BUILD_PENDING` forever. Browser and headless controllers may discard that failed response/build identity and start at most two fresh replacements. Validation continuations remain available to a replacement, while the build coordinator prevents a late or duplicate result from being applied as the active build.

The coordinator also retains a bounded typed `convertArtifacts` inspection object for a successful build. A continuation polling the exact build it started receives `BUILT_AND_REGISTERED` plus that build's ArrayLogic, compiled Shorthand, and materialized JPL evidence. `CAPABILITY_REUSED` is reserved for discovery or a separate request that selects an already completed capability. This lifecycle distinction lets reset-gated acceptance reject retained functional entities without mistaking a normal asynchronous final poll for reuse. Artifact evidence contains generated contracts and executable structure, not protected plaintext, credentials, prompts, or hidden reasoning.

Approved generated capability Shorthand may start from an empty published object when no parent workspace document is readable. The parent is context, not a prerequisite for creating the separately addressed child entity. The ordinary Shorthand routes, canonical entity persistence, manifest validation, registry write, and coordinator completion remain authoritative.

Generated entity creation selects route results with a transport-normalizing Shorthand primitive. It accepts the registered direct envelope and API-relayed wrappers without requiring compilers to embed a fixed `response` depth; ordinary object traversal stays exact.

## Consequences

- Gateway/browser timeout retries cannot concurrently finalize the same model response.
- A lost finalizer can be retried after the bounded lease expires.
- Cold capability creation works from a new or missing workspace document.
- Router envelope changes do not turn entity IDs into wrapper objects.
- Polling exposes deterministic terminal diagnostics without exposing prompts, credentials, protected values, or hidden reasoning.
- A stalled provider job reaches a bounded retry or an explicit exhausted failure instead of an unbounded polling loop.
- Polling the originating successful build preserves its creation status and bounded inspection artifacts; genuine reuse remains distinguishable.
- Durable server continuation of model jobs beyond the browser-held response handle remains incomplete work.
