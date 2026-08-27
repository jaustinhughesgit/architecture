# 0084: Account passkeys are not Protected Asset authority

## Status

Accepted; implemented in the clean `onevar-platform` Phase 4G candidate. Development deployment evidence is recorded after promotion.

## Context

Same-account menu continuity across devices requires a real authentication boundary. Reusing an entity cookie would require copying bearer authority, while reusing a protected-data authenticator would blur account access with Reveal, Speak, recipient sharing, or provider-secret permission.

## Decision

The clean runtime enrolls a separate discoverable WebAuthn ES256 account passkey. A second device begins an identifier-free assertion, and the verified credential ID resolves one exact primary entity through a bounded DynamoDB index. The API verifies the challenge, RP, origin, user presence, user verification, signature, and counter before issuing a new opaque HttpOnly host session.

Marketplace publisher creation requires this account passkey. The `authenticated_account` label proves only a user-verified passkey account, never email ownership, legal identity, business identity, or human review. Account authentication is structurally unable to authorize protected presentation, recipient access, protected Compute, or provider-credential use.

## Consequences

- Multiple authenticated devices read the same account library while compiling their own local Paths and installations.
- Publisher attribution no longer rests on an anonymous browser-created session alone.
- Additional passkeys, recovery, verified email, stronger publisher verification, and administrator credential lifecycle remain separately governed work.
