# Account, Device Identity, and Protected Assets

**Status:** Partial implementation

This capability spans account bootstrap, email verification, device-held cryptographic material, hardware-authenticator enrollment, and protected-asset use. These are related ceremonies, but they are not currently one completed end-to-end flow.

## Current implementation

- In the clean `onevar-platform` Phase 4A boundary, typed protected spans are encrypted in a dedicated worker, compiled only into exact owner-local quantity/self-property bindings, and queried without decryption. Separate one-use or timed Reveal/Speak grants authorize one matching transient presentation; rotation, revocation, safe audit, reload, command parity, and reset are covered. Protected plaintext does not enter ordinary ContextDB, models, Compute, network, terminal history, or review.
- Clean Phase 4B release `8b49dfa031b795451830ec5b3dbee816e53020ea` adds recipient ECDH delivery as a separate contract: one non-extractable browser private key, versioned public-key registration, exact requestable descriptors, owner-local rewrap, exact one-use/timed recipient grants, recipient-worker decryption, and opaque server storage. Development and production reset-gated two-browser acceptance pass. Trusted-server/provider injection, multi-device recovery, local protected ASR, and WebAuthn-at-use remain separately incomplete.
- `/newUser` creates the initial group/user records and then redirects into the application.
- The encryption enrollment flow separately requests and polls email verification.
- The browser creates P-256 encryption and signing key pairs. Public keys are registered with the server; the local encryption private key is stored as a non-exported browser `CryptoKey` in IndexedDB.
- WebAuthn enrollment creates a hardware/platform authenticator credential and registers its attestation information.
- Protected assets can be encrypted before server storage and have server-side requirement and audit records.
- Protected Assets and ContextDB expose device-local Speak and Reveal windows with visible countdowns. Protected answers show the same controls in Message. The setting stores no plaintext, restarts when changed, survives page reload on that device, and reveal-once is consumed after use. An unexpired window permits only the matching local presentation fetch and decryption; other protected operations still require their own authorization.

## Important trust distinction

WebAuthn **enrollment** is present, but hardware-gated protected-asset **use** is not yet a complete guarantee. The implementation creates a credential, while local decryption and presentation-policy activation currently require direct user activation and the IndexedDB device key without a corresponding `navigator.credentials.get()` assertion for every protected operation.

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
- Add assertion-time WebAuthn checks for policies that promise hardware authorization.
- Specify multi-device enrollment, revocation, recovery, migration, and lost-device behavior.
- Make every UI claim match the actual trust boundary: encrypted-at-rest is not automatically zero-knowledge.
