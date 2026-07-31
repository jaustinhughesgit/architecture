# Account, Device Identity, and Protected Assets

**Status:** Partial implementation

This capability spans account bootstrap, email verification, device-held cryptographic material, hardware-authenticator enrollment, and protected-asset use. These are related ceremonies, but they are not currently one completed end-to-end flow.

## Current implementation

- `/newUser` creates the initial group/user records and then redirects into the application.
- The encryption enrollment flow separately requests and polls email verification.
- The browser creates P-256 encryption and signing key pairs. Public keys are registered with the server; the local encryption private key is stored as a non-exported browser `CryptoKey` in IndexedDB.
- WebAuthn enrollment creates a hardware/platform authenticator credential and registers its attestation information.
- Protected assets can be encrypted before server storage and have server-side requirement and audit records.

## Important trust distinction

WebAuthn **enrollment** is present, but hardware-gated protected-asset **use** is not yet a complete guarantee. The implementation creates a credential, while local decryption currently loads the IndexedDB key without a corresponding `navigator.credentials.get()` assertion for every protected operation.

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
- `use` and `set` authorization govern who may reference or alter a protected asset, while action permissions govern execution.
- Public templates may describe required assets, but must never contain a user's private value.

## Required work

- Join account creation, email verification, recovery, device enrollment, and key rotation into a versioned state machine.
- Add assertion-time WebAuthn checks for policies that promise hardware authorization.
- Specify multi-device enrollment, revocation, recovery, migration, and lost-device behavior.
- Make every UI claim match the actual trust boundary: encrypted-at-rest is not automatically zero-knowledge.
