# 0003: Recipient-Wrapped Zero-Trust Sharing

- Status: Accepted
- Date: 2026-07-31

## Context

Users and organizations need to share protected entity values, including API keys, without giving the platform server plaintext. The browser already creates per-recipient salted key wraps, while trusted compute can optionally use a KMS executor wrap. These trust modes must not be conflated.

## Decision

Use envelope encryption for recipient-specific sharing: encrypt the protected payload locally with a random content key and create an independently salted key wrap for each authorized user/device public-key version. Store opaque ciphertext, wraps, grants, policy, and version on the server.

A recipient wrap and an active server grant are both required. Recipient envelope retrieval does not grant owner operations. Server executor/KMS wrapping is optional, explicitly consented, and classified as trusted-server mode rather than zero-trust.

## Alternatives

- Upload a complete encrypted payload per recipient. Cryptographically valid and retained as a compatible format, but less efficient for large values.
- Use one organization-wide private key. Rejected as the default because membership and compromise boundaries become too broad.
- Always add a server executor wrap. Rejected because it would eliminate the zero-knowledge option.

## Consequences

- Recipient/device grant, key-version, retrieval, rewrap, re-encryption, rotation, and audit contracts are required.
- Adding recipients can often rewrap the content key locally; removing recipients requires a new content key/ciphertext for future confidentiality.
- A user or company can manage shared credentials as protected entity values instead of copying secrets into entity implementations.

## Security and trust

The server receives no recipient private key or plaintext in recipient-only mode. Salts, ephemeral public keys, IVs, wraps, and ciphertext are not secret, but must be integrity-bound to asset, version, recipient, and policy. Revocation cannot erase material already downloaded. Hardware/user-presence policy is enforced before local decryption when required.

## Migration and compatibility

Legacy per-recipient full ciphertext may be represented as a versioned envelope variant. Existing owner-only protected assets remain owner-only until explicit grants and wraps are added. Existing executor-wrapped assets remain trusted-server assets and are not relabeled zero-trust.

## Verification

Test owner and recipient devices, wrong user/device/key version, removed recipient, rotated key, re-encryption, offline downloaded copies, compromised-server observation, absence/presence of executor wraps, and strict separation of recipient versus owner permissions.

