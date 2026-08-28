# 0097: Account passkeys are multiple labeled credentials

## Status

Accepted; implemented in the clean `onevar-platform` development candidate.

## Context

The initial discoverable-passkey account used one fixed credential row per entity. A passkey trapped in an embedded browser store or removed from a synchronized password manager left the server believing the account was enrolled while preventing an authenticated owner from adding a usable replacement. Large test inventories were also difficult to distinguish safely.

## Decision

An exact entity account may hold up to ten independently labeled discoverable WebAuthn credentials. Credential ID, public key, counter, RP, origin, status, and lifecycle evidence remain exact authority. The label and short entity suffix are human interaction addresses only.

An existing authenticated entity session may add, list, and revoke passkeys. Active credentials are supplied as WebAuthn registration exclusions. Revocation resolves a friendly label to one exact credential ID and refuses to remove the final active credential. Each new DynamoDB record has its own owner sort key and credential index; the prior singleton row remains a readable legacy record so deployment does not strand existing accounts.

This lifecycle extends [decision 0084](0084-account-passkeys-are-not-protected-authority.md). It grants no Protected Asset, recipient, Compute, provider, payment, or recovery-file authority.

## Consequences

- One lost or unsynchronized authenticator can be replaced while another authenticated session remains available.
- Device credentials can be named and revoked independently without copying opaque credential IDs.
- 1var cannot recover or synchronize private passkey material; that remains the authenticator provider's responsibility.
- Stronger session reauthentication, verified email recovery, administrator intervention, and recovery without any surviving session or authenticator remain separate governed capabilities.
