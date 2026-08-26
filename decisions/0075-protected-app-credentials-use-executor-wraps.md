# 0075: Store app credentials as Protected Assets and authorize exact executor use

**Status:** Accepted; clean-room implementation in progress in `onevar-platform`.

## Context

Marketplace Compute entities need credentials for weather, accounting, messaging, and other user-selected providers. Those credentials are app data, not 1var platform secrets. Storing every user's app keys in AWS Secrets Manager would blur ownership, scale poorly, and give the general API unnecessary decryption power. Keeping every credential browser-only would prevent scheduled or server-required provider work.

## Decision

An app credential is a versioned Protected Asset. It is created browser-only first. Explicit promotion creates a new AES-256-GCM ciphertext version whose authenticated reference says `trusted_server`, plus a content-key wrap for one versioned protected executor public key. A browser-only reference never validates as executor material, and adding an executor wrap cannot mutate its trust mode.

Each server-use grant binds the owner, actor policy, protected binding and asset versions, executor and key versions, capability/version/operation, protected requirement, JPL/program hash, reviewed provider adapter, exact host and injection field, purpose, charge ceiling, duration or remaining use, and a server-verified WebAuthn credential. Reveal, Speak, recipient sharing, recipient use, and owner-local Compute authority cannot authorize provider use.

The browser-facing API stores ciphertext, wraps, exact grants, and value-free receipts. It may retrieve the executor public key and invoke the executor, but it receives no KMS decrypt authority. A separate executor has KMS decrypt authority and no DynamoDB access. It decrypts only after strict contract and grant validation, injects the credential only into a reviewed immutable provider adapter, forbids redirects or host drift, never logs a URL containing a query credential, and discards plaintext after the call. Provider responses remain protected and ephemeral until an independently reviewed output projection permits a less restrictive result.

Use one bounded asymmetric KMS key per stage/cell and rotate its published version. Do not create KMS or Secrets Manager objects per user or asset. Millions of credentials remain inexpensive ciphertext rows and S3 objects addressed by exact IDs. AWS Secrets Manager remains reserved for core 1var-operated credentials such as OpenAI and Stripe.

## Consequences

- Trusted-server mode is explicitly not zero-knowledge; 1var executor code can technically use plaintext during the declared call.
- Publisher and installer credentials are separate assets. Capability packages contain requirement metadata, never credential values or wraps.
- The LLM may propose semantic requirement metadata, but trusted code selects an allowlisted adapter and compiles executable behavior.
- A missing wrap, expired/revoked/consumed grant, rotated asset, changed program, unapproved host, charge overflow, or unavailable executor fails closed with no browser-only fallback.
- Query/body credential transports are supported only inside reviewed adapters and are excluded from logs and receipts.
- A local companion remains the zero-knowledge alternative for provider work that must never expose credentials to 1var servers.

## Verification

Contract tests must reject browser-only executor material, unknown plaintext/key/output fields, identity/version drift, and invalid grant lifecycles. Infrastructure assertions must prove that only the executor can call KMS Decrypt, the API can only obtain the public key, and the executor cannot read DynamoDB. Reset-gated browser acceptance must prove explicit promotion, server WebAuthn authorization, one-use consumption, credential-owner and capability binding, provider-fixture injection, encrypted result handling, revocation, and absence of the credential from requests, packages, models, logs, receipts, and review.
