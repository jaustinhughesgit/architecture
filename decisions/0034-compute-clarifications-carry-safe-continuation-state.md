# 0034 — Compute clarifications carry safe continuation state

Status: accepted

## Context

A compute invocation may need ordinary values and a Protected Asset approval over several user turns. Worker-local state can be replaced during Path publication or runtime refresh. Losing half of the invocation state caused alternating prompts: an ordinary answer forgot the credential approval, and credential approval forgot the ordinary answer.

## Decision

Every compute clarification may carry a bounded continuation between the browser controller and its local worker. It contains only:

- validated, non-sensitive ordinary input overrides;
- opaque `protected_asset:` references for declared requirements; and
- declared requirement IDs approved for this invocation.

The worker validates the continuation against the installed compute contract before merging it with newer local state. Raw protected values, redacted placeholders, undeclared fields, and legacy sensitive ordinary inputs are discarded. An intermediate clarification does not count as entity execution; Protected Asset ContextDB linkage is saved only after a typed compute result.

## Consequences

Multi-input provider capabilities can clarify in any order without losing earlier answers, including across worker Path refreshes. The continuation is safe to render in diagnostics because it never contains plaintext protected material. Provider-specific orchestration remains in declarative entities rather than browser code.

Typed discovery and replay preserve an explicit relative-day surface even when the model also supplied its normalized date. This keeps Path learning grounded in words the user actually said while allowing execution to receive the canonical date locally.
