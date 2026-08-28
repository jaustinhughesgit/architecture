# Account, Device Identity, and Protected Assets

**Status:** Partial implementation

This capability spans account bootstrap, email verification, device-held cryptographic material, hardware-authenticator enrollment, and protected-asset use. These are related ceremonies, but they are not currently one completed end-to-end flow.

## Current implementation

- Clean Phase 4G account continuity uses identifier-free discoverable WebAuthn account passkeys that remain separate from Protected Asset authority. The successor account lifecycle permits up to ten independently labeled credentials, exact credential-index authentication, per-credential counters and revocation, final-active-credential protection, and read compatibility for the former singleton row. An authenticated session may add another synchronized device credential and revoke an old one by label without copying an entity or credential ID. 1var never stores or recovers the private passkey material; recovery with no surviving session or authenticator remains incomplete. See [decisions 0084](../../decisions/0084-account-passkeys-are-not-protected-authority.md) and [0097](../../decisions/0097-account-passkeys-are-multiple-labeled-credentials.md).
- In the clean `onevar-platform` Phase 4A boundary, typed protected spans are encrypted in a dedicated worker, compiled only into exact owner-local quantity/self-property bindings, and queried without decryption. Separate one-use or timed Reveal/Speak grants authorize one matching transient presentation; rotation, revocation, safe audit, reload, command parity, and reset are covered. Protected plaintext does not enter ordinary ContextDB, models, Compute, network, terminal history, or review.
- Clean Phase 4B release `8b49dfa031b795451830ec5b3dbee816e53020ea` adds recipient ECDH delivery as a separate contract: one non-extractable browser private key, versioned public-key registration, exact requestable descriptors, owner-local rewrap, exact one-use/timed recipient grants, recipient-worker decryption, and opaque server storage. Release `cfd0e2383c4353d582ad44c940b651dfad65b47b` adds deployed exact WebAuthn gates for owner rewrap approval and recipient private-key use. Trusted-server/provider injection, multi-device recovery, and local protected ASR remain incomplete.
- Clean Phase 4C release `391d91d5fb89e226db40c6e3034f97941c9f14fa` provides bounded owner-local protected numeric Compute with exact WebAuthn-at-use. Compiler-owned requirements bind exact local IDs; enrollment grants nothing; assertions create exact once/timed authority; binding rotation requires new authority; only declared inputs enter hash-pinned local JPL; the response remains transient; and durable traces contain only value-free receipts. Release `cfd0e2383c4353d582ad44c940b651dfad65b47b` deploys separately scoped WebAuthn targets for Reveal, Speak, share approval, and recipient decryption. Trusted-server executor wrapping and broader local execution remain incomplete.
- `/newUser` creates the initial group/user records and then redirects into the application.
- The encryption enrollment flow separately requests and polls email verification.
- The browser creates P-256 encryption and signing key pairs. Public keys are registered with the server; the local encryption private key is stored as a non-exported browser `CryptoKey` in IndexedDB.
- WebAuthn enrollment creates a hardware/platform authenticator credential and registers its attestation information.
- Protected assets can be encrypted before server storage and have server-side requirement and audit records.
- Protected Assets and ContextDB expose device-local Speak and Reveal windows with visible countdowns. Protected answers show the same controls in Message. The setting stores no plaintext, restarts when changed, survives page reload on that device, and reveal-once is consumed after use. An unexpired window permits only the matching local presentation fetch and decryption; other protected operations still require their own authorization.

## Important trust distinction

WebAuthn **enrollment** and assertion verification are implemented for owner-local protected Compute. The credential remains local, enrollment grants nothing, and the protected worker verifies exact assertion scope before decryption. Reveal/Speak, recipient use, recovery, and trusted-server modes do not inherit that guarantee and remain governed by their separate current policies.

The intended ceremony is:

1. Verify the account channel.
2. Enroll a device authenticator.
3. Generate device-held, non-exportable encryption material.
4. Bind the public identity, device credential, and key version.
5. Require a fresh authenticator assertion when policy says a protected asset may be decrypted, signed, or released.
6. Record an audit event without recording the plaintext secret.

## Platform fit

- Protected assets are variables governed by entities and Paths, not an unrelated vault product.
- An entity may request a capability without receiving the secret itself. Local execution is the zero-knowledge option; server-side brokerage is an explicitly trusted-server option.
- `use` governs any permitted response or provider invocation involving a protected asset. `Set`/`edit`/`delete`/`delegate` remain separate owner or lifecycle authorities.
- Public templates may describe required assets, but must never contain a user's private value.
- A protected asset may be shared through independently salted recipient/device key wraps. This is distinct from adding a server-executor wrap; see [recipient-specific zero-trust sharing](recipient-protected-sharing.md).

## Required work

- Join account creation, email verification, recovery, device enrollment, and key rotation into a versioned state machine.
- Extend exact assertion-time WebAuthn checks only to additional policies that explicitly promise hardware authorization.
- Add a distinct trusted-server executor-wrap and exact provider/host/action/purpose grant; never reinterpret a browser-only compute binding as server authority.
- Complete recovery when no account session or authenticator survives, and keep that account ceremony separate from protected-data recovery and hardware-at-use authority.
- Make every UI claim match the actual trust boundary: encrypted-at-rest is not automatically zero-knowledge.
