# Recipient-Specific Zero-Trust Sharing

**Status:** Encryption foundation implemented; recipient retrieval and lifecycle incomplete

Durable direction: [ADR 0003](../../decisions/0003-recipient-wrapped-zero-trust-sharing.md).

1var supports sharing protected data without giving the server plaintext. This capability applies to personal information, company credentials, API keys, financial details, and other protected entity values.

## Core model

The creator's device encrypts the protected value before upload. Every authorized recipient—including the creator's other devices when desired—receives independently decryptable cryptographic material. The server stores ciphertext, recipient identifiers, policy, version, and audit metadata, but not plaintext or recipient private keys.

There are two valid envelope representations:

1. Encrypt and upload a complete ciphertext separately for every recipient.
2. Encrypt the data once with a random content key, then upload a separately salted wrap of that content key for each recipient.

The current browser uses the second form. It downloads each recipient's public encryption key, creates an ephemeral P-256 ECDH key agreement and random 32-byte HKDF salt, encrypts a copy of the content key with AES-GCM, and uploads the recipient's salt, ephemeral public key, IV, and wrapped key alongside one AES-GCM content ciphertext. Each recipient can derive only their wrapping key with their private key.

The salt is not secret. Its purpose is key derivation and separation; authorization comes from possession of the recipient private key plus the server's access policy.

## Trust modes

### Recipient-only zero-trust

The envelope contains only user/device wraps. Decryption and provider use happen on an authorized local device or local companion. The server cannot decrypt the asset.

### Organization-managed zero-trust

An organization manages the recipient set, but membership changes cause local rewrapping or re-encryption. Administrators can grant, revoke, and rotate access without receiving plaintext unless they are themselves explicit recipients.

### Trusted-server execution

An optional executor wrap lets the controlled compute boundary decrypt for an approved API/provider operation. This is useful but is not zero-knowledge. Adding an executor wrap changes the asset's trust mode and requires explicit consent and policy.

## Intended sharing flow

```text
owner selects protected data and recipients/devices
  → browser resolves authenticated recipient public-key versions
  → browser encrypts data and creates one salted wrap per recipient
  → server stores opaque envelope and recipient grants
  → recipient authenticates and requests the envelope
  → server re-checks active grant, version, purpose, and revocation
  → recipient downloads ciphertext plus only authorized wrap metadata
  → recipient decrypts locally after required user/hardware authorization
```

## Current implementation evidence

- The browser always creates a local-device recipient and accepts additional numeric user recipients.
- Recipient public encryption keys are read from server user records.
- Each recipient gets an independent ECDH/HKDF/AES-GCM wrap with its own salt and ephemeral key.
- The protected-asset record stores one ciphertext and a map of user wraps; the legacy passphrase transport is disabled for new creation.
- API-oriented assets may also receive a KMS executor wrap for trusted-server use.

The critical integration gap is server authorization: protected-asset `get` and `envelope` operations currently require the requesting principal to equal the single asset owner. The server does not yet authorize a listed recipient to retrieve the envelope. The legacy passphrase route is also owner-bound. Therefore, cross-user zero-trust sharing is represented cryptographically but is not complete operationally.

## Required invariants

- Recipient identity in a key wrap must bind to an authenticated principal/device and a specific public-key version.
- The creator must be an explicit recipient when cross-device recovery is desired; local-device-only access is otherwise expected.
- The server must never accept recipient IDs embedded in ciphertext as sufficient authorization. It maintains a signed/versioned grant index and evaluates it on every read.
- Adding a recipient can rewrap the existing content key locally; removing a recipient requires a new content key and ciphertext when forward access to future versions must be prevented.
- Revocation cannot erase ciphertext already downloaded by a recipient; the UI and policy must state this honestly.
- Rotation, device loss, recipient key rotation, organization membership changes, and recovery are first-class lifecycle events.
- Protected values and derived plaintext never enter ordinary ContextDB, entity source, Paths, prompts, logs, or diagnostics.
- A shared API key remains a protected entity value referenced by entities; it is not copied into each entity implementation.

## Required repair

1. Add a recipient/grant index separate from owner metadata.
2. Authorize recipient envelope retrieval without granting edit, rotate, audit, or delete authority.
3. Return only the envelope fields needed by the authorized recipient and bind every audit event to principal, device, purpose, and version.
4. Add local rewrap/re-encrypt flows for add, remove, rotate, and key-version changes.
5. Let organization policy manage recipient groups while resolving them to explicit versioned wraps.
6. Keep executor wraps optional and visibly separate from recipient-only zero-trust assets.
7. Test owner, recipient, revoked recipient, wrong device, rotated key, offline copy, and compromised-server threat cases.
