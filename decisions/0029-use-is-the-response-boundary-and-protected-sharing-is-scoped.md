# 0029: Use Is the Response Boundary and Protected Sharing Is Scoped

- Status: Accepted
- Date: 2026-08-11

## Context

The platform treated `use` and `execute` as separate canonical actions even though both entity invocation and returning a resolved value are responses. Protected Asset envelopes already carried independently salted recipient wraps, but server authorization remained owner-only and the older passphrase exchange had no durable separation between a listed wrap and an access grant.

## Decision

`Use` is the canonical response action. Invoking logic and returning a resolved value are both uses. Internal `find`, `read`, and `aggregate` mechanics may describe how a result is obtained, but do not independently authorize releasing it. Existing `execute` requests, legacy `e` permissions, and stored `execute` grants normalize to `use` at compatibility boundaries.

Protected Asset sharing requires both an encrypted recipient wrap and a separate active, version-matched `use` grant. `provider` delivery permits only policy-bound injection into an authorized provider request. `recipient` delivery permits retrieval of only that principal's wrap for local decryption. Neither grants mutation, deletion, audit, or delegation. Executor wrapping remains an explicit trusted-server mode.

## Consequences

- Existing callers continue working through the `execute` alias while new records store `use`.
- A shared API credential can be used by another principal's compatible entity without revealing the key to that principal.
- The legacy public-key/per-recipient-salt idea is preserved in Protected Assets; the global-counter passphrase store is compatibility-only.
- Full value-return adoption still requires each remaining response boundary to require `use` in addition to any internal access checks.

## Verification

Test alias normalization, provider-only denial of envelope retrieval, recipient-only wrap filtering, absent-grant denial, version mismatch after rotation, and owner-only management.
