# 0094 — Recipient removal rotates current ciphertext

**Status:** Accepted; development candidate implemented 2026-08-28.

## Decision

Protected recipient removal is a local rotation plus server revocation ceremony. A grant flag alone is insufficient because a recipient may already possess the ciphertext and content key for a historical version.

For one exact approved grant, the owner hardware-authorizes a target containing grant, binding/version, and asset/version identity. Inside the protected worker, 1var decrypts the value only transiently, generates a new content key and ciphertext under asset version `n + 1`, and advances the existing binding ID to binding version `n + 1`. The browser publishes that safe current descriptor before revoking the old server grant. An interrupted retry recognizes that the local binding is already newer than the approved request and reuses the same new descriptor rather than rotating again.

The removed recipient may retain historical ciphertext and plaintext already disclosed to them; no system can erase it from their device. The guarantee is forward current-version exclusion: the old grant, wrap, content key, and ciphertext do not address the new binding/asset version.

## Groups and remaining recipients

Other recipients do not silently receive the replacement version. They must request it again until group governance resolves each remaining exact recipient/key version and creates one independent wrap per member. A group is authorization metadata, never a shared group decryption key.

## Consequences

- Removal requires local owner presence and WebAuthn.
- Server publication failure leaves the old server version in place and the command visibly retryable; it cannot claim removal succeeded.
- A successful receipt names the new binding version and old grant.
- Natural profile-addressed removal and group fan-out remain later command/API surfaces over this exact primitive.
