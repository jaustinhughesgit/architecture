# 0072: Require exact WebAuthn authority for owner-local protected Compute

**Status:** Accepted and implemented in `onevar-platform`; deployment evidence is pending.

## Context

The first clean Phase 4C slice kept protected values and derived answers off the server, but direct browser activation still created one use. A same-origin compromise could therefore request use of the browser-held wrapping key. WebAuthn enrollment alone does not prove that the user approved a later protected operation.

## Decision

The protected worker owns challenges, verification, credential records, authorization grants, consumption, expiry, revocation, and value-free audit. The main thread only performs `navigator.credentials.create()` or `navigator.credentials.get()`.

Enrollment verifies one exact RP/origin ceremony, user presence and verification, the attested credential ID, the attested ES256 COSE key, and the returned SPKI. Enrollment grants no use.

After minimized requirements resolve to exact protected bindings, the worker creates a short-lived value-free request scoped to owner, installation, capability/version, operation, ordered requirement IDs, ordered protected binding IDs, JPL hash, and purpose. A verified assertion may grant that exact scope once, for 15 minutes, 1 hour, 1 day, or always. One-use authority is atomically consumed with the Compute receipt. Expiry and explicit lock make timed authority inactive. Any binding, capability, operation, installation, or program change requires new authority.

Ceremony data, credentials, grants, protected inputs, and derived answers stay browser-local. This decision covers owner-local protected Compute only; Reveal/Speak, recipient use, recovery, and trusted-server execution require separate explicit policy.

## Consequences

- Commands and UI cannot treat a click or boolean activation field as hardware proof.
- Exact IDs and hashes grant use; names, Position, and semantic similarity do not.
- Normal execution reads deterministic binding, compute-binding, and complete hardware-scope keys instead of scanning protected assets or grants.
- A one-day grant can support convenient repeated use of exactly the approved computation while binding rotation fails closed.
- Reset removes the browser-local credential record and grants, although an authenticator may retain an orphaned credential.

## Verification

Contracts contain no value channel. Cryptographic tests use real P-256 signatures and reject wrong challenges, origins, RP IDs, credentials, counters, DER, and mismatched attested COSE/SPKI keys. Browser acceptance uses a virtual platform authenticator to prove local-only enrollment, authorization, reuse, lock, consumption, and binding-rotation reauthorization. Deployment evidence must promote one immutable release through development and production.
