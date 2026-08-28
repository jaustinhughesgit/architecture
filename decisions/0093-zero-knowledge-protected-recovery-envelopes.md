# 0093 — Zero-knowledge protected recovery envelopes

**Status:** Accepted; development candidate implemented 2026-08-28.

## Decision

Protected Asset recovery is an explicit zero-knowledge owner ceremony, separate from account authentication and recipient sharing.

On export, a hardware-authorized protected worker unwraps each selected browser content key with the current device's non-extractable wrapping key and rewraps that content key under a random recovery key. It never decrypts the protected asset plaintext. Ciphertext, recovery-wrapped content keys, exact active Context bindings, required input provenance, and active Compute bindings are sealed into one AES-GCM authenticated payload. The payload key and asset-wrapping key are independently derived through HKDF from a random 256-bit recovery secret.

The browser downloads the encrypted file and displays its recovery code separately. 1var receives neither. A receiving device must authenticate to the same exact account, have an empty Protected Asset store, enroll its own hardware authenticator, and explicitly authorize import. The protected worker verifies the authenticated header, owner, envelope ID, counts, asset references, input IDs, and binding relationships before rewrapping content keys to the new device key. Wrong code, tampering, another account, an occupied store, or missing records fail closed.

Recovery includes encrypted assets, protected input provenance, active Context bindings, and active Compute bindings. It excludes recipient private keys, all grants, hardware credentials and authorizations, preferences, trusted-executor material, and historical audit records. Authorities must be recreated; a passkey login cannot become Protected Asset decryption authority.

## Scale and boundaries

The first candidate admits at most 5,000 assets, 5,000 inputs, 10,000 Context bindings, 10,000 Compute bindings, and a 105 MB browser file. Larger individual stores require independently authenticated chunks and a manifest, not server plaintext or a server-held recovery secret. Platform-wide user volume does not create per-user Secrets Manager records.

This mechanism recovers a user's own local encrypted graph. It does not provide forward-secure recipient removal, group governance, absent-browser local execution, or protected file streaming; those remain separate contracts.

## Consequences

- Device loss is recoverable only if the user retained both the file and code, or still has another authorized device.
- The server cannot reset or inspect a recovery code.
- Recovery does not silently preserve old access authority.
- A receiving device may safely regain exact data/Compute bindings without forcing protected plaintext through the main thread or network.
