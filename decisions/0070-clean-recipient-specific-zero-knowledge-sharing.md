# 0070: Route clean recipient-specific protected sharing through exact opaque grants

**Status:** Accepted, implemented, and deployed for the clean Phase 4B exact recipient-sharing boundary in release `8b49dfa031b795451830ec5b3dbee816e53020ea`.

## Context

The clean Phase 4A boundary proves that a protected fact can be compiled, queried, and presented to its owner without entering ordinary ContextDB, an LLM, Compute, the network, terminal history, or review. It does not allow another authenticated person to ask an ordinary named question and receive an owner-approved answer. The proof-of-concept recipient flow is behavioral evidence, not a runtime dependency or evidence that the clean contracts exist.

The replacement must support millions of protected assets without local RAG, global scans, or LLM mediation for each request. It must also preserve the distinction among public ordinary discovery, protected recipient delivery, and trusted-server/provider execution.

## Decision

The clean platform implements recipient sharing as a separate Phase 4B contract. A dedicated browser worker owns one non-extractable P-256 ECDH private key for the current browser identity and uploads only its versioned public key. Each active protected Context binding may publish a safe descriptor containing exact owner, operation, normalized ordinary concept, binding/version, and opaque asset/version reference. The descriptor contains no ciphertext, key material, plaintext, or plaintext hash. The owner's ordinary profile name must be explicitly public before another user can discover that descriptor; public discovery grants no protected use.

A recipient's named question resolves exactly one authorized public profile and one active descriptor. Exact owner, requester, binding, asset, recipient-key, request, and grant IDs then control the lifecycle. The first query creates one durable pending request. Approval happens on the owner's protected worker: it unwraps the existing local content key, performs ephemeral ECDH with the requester's exact public-key version, derives an AES-256-GCM wrapping key with HKDF-SHA256 and a fresh salt, and emits only the already-encrypted asset ciphertext plus the recipient-specific content-key wrap.

The server stores ciphertext once per exact owner asset version and the wrap separately on one recipient grant. The grant is bound to the complete identity/version tuple and one lifecycle: one use, 15 minutes, 1 hour, 1 day, or always. One-use consumption and a short idempotent retrieval receipt are one atomic transaction. Rotation or key/version mismatch fails closed. Owner revocation blocks future retrieval. The recipient worker performs all decryption and returns only one transient formatted presentation while terminal history stays masked.

Persistence uses exact bounded indexes: identity key, owner/operation/concept descriptor, owner/binding/requester current request, timestamp-ordered owner request inbox, recipient/owner/binding active grant, owner/grant revocation pointer, and retrieval receipt. No protected query scans the protected-asset population or asks a model to infer identity.

Ciphertext is visible to the server because the server relays and durably stores it; the protected asset's plaintext, content key, device wrapping key, recipient private key, and derived plaintext are not. This is zero-knowledge recipient delivery, not a claim that the server observes no metadata or encrypted bytes.

Device/key recovery, multi-device enrollment, recipient groups, notification delivery, protected ASR, WebAuthn-at-use, and trusted-server/provider injection remain separate versioned contracts and fail closed.

## Alternatives considered

- **Publish the value in ordinary Context:** rejected because it destroys protection.
- **Decrypt in Lambda for delivery:** rejected for Phase 4B because it is trusted-server execution.
- **Send 20/200 Context or embeddings to an LLM for stitching:** rejected because exact descriptors already define the operation/concept boundary and protected identity must not depend on semantic inference.
- **Store ciphertext in every recipient grant:** rejected because it multiplies large asset storage; one exact owner asset row plus small recipient wraps scales better.
- **Peer-to-peer delivery only:** rejected as the initial boundary because offline requests, durable approval, retry, and ordinary web availability require a relay. A future peer transport may use the same cryptographic contract.

## Consequences

- Ordinary speech remains the interaction surface while exact IDs and grants govern execution.
- Total server storage is linear in assets, requests, grants, and receipts; individual operations are bounded exact reads/writes.
- The server can observe safe metadata, participants, timing, sizes, and ciphertext, but cannot decrypt protected values.
- Revocation prevents future retrieval but cannot erase plaintext already disclosed to a recipient.
- The first clean release supports one active browser recipient key per identity. Recovery and additional devices must not export that private key; they require a later enrollment and rewrap lifecycle.

## Security impact

No server endpoint or persistence schema admits a protected plaintext field. A malicious or malformed public key can cause only that request's local rewrap to fail. All material is authenticated against exact asset, binding, recipient, and key versions. Ambiguous names, private profiles, stale bindings, wrong recipients, consumed grants, expiry, and revocation fail closed.

## Verification

Strict contracts, WebCrypto tests, service tests, and compact DynamoDB tests cover identity/version binding, local rewrap/decrypt, wrong-recipient failure, private and ambiguous names, safe descriptor publication, timestamp-indexed requests, opaque storage, atomic one-use consumption, idempotent retry, rotation, revocation, and reset.

One reset-gated clean two-browser acceptance creates isolated identities, publishes Austin's ordinary name, seals a protected quantity, creates and approves a one-use request, decrypts only on the recipient device, proves network and terminal history omit the protected value, proves the next retrieval needs a new approval, and resets both identities in `finally`.

Development workflow [32849210832](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32849210832) and production workflow [32849641706](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32849641706) promoted the same exact release and each passed all 18 runnable reset-gated deployed browser scenarios. The production fixture uses a collision-free public profile name so real equal-name profiles continue to fail closed as ambiguous. No paid model or voice canary was run because this lifecycle is deterministic and model-free.

## Affected repositories

- `onevar-platform`: canonical contracts, browser protected worker, API/service/persistence, command UI, and acceptance.
- `architecture`: trust model, capability status, clean-room roadmap, recipient-sharing specification, and this decision.
