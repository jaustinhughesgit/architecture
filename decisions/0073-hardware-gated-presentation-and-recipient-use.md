# 0073: Hardware-gate exact protected presentation and recipient operations

**Status:** Accepted, implemented, and deployed in `onevar-platform` release `cfd0e2383c4353d582ad44c940b651dfad65b47b`.

## Context

WebAuthn protected owner-local Compute, but Reveal, Speak, recipient-share approval, and recipient decryption still relied on direct browser activation. That left browser-held decryption keys callable by arbitrary same-origin code.

## Decision

Use one reusable browser-local WebAuthn authorization primitive with discriminated exact targets for presentation, recipient-share approval, and recipient use. Targets bind the acting principal, binding and asset identity/version, purpose, and every operation-specific request, grant, requester, and recipient-key identity/version. They contain no protected value.

The protected worker owns requests, challenges, signature verification, exact grants, deterministic lookup, consumption, expiry, revocation, and audit. The main thread performs browser ceremonies only. Share approval always consumes a one-use hardware grant; its recipient grant duration is a separate policy. Recipient decryption requires its own explicit once/timed/always authorization. Reveal and Speak retain their existing choices, now backed by matching hardware authority. The server receives no ceremony or plaintext.

## Consequences

- Authorization cannot cross target kind, principal, binding, version, request, grant, key, presentation, or purpose.
- Binding/key rotation fails closed without semantic or RAG reconciliation.
- Timed local convenience is supported without widening remote authority.
- Multi-device recovery and trusted-server execution remain incomplete and cannot inherit this authority.

## Verification

Contracts reject unknown value channels and mismatched principals. Browser tests use separate virtual platform authenticators to prove owner presentation, sharing approval, recipient decryption, consumption, revocation, and network/terminal plaintext exclusion. Development workflow `32896626867` and production workflow `32897153279` passed the full gate and all 19 runnable reset-gated deployed scenarios for the same immutable release with no paid model calls.
