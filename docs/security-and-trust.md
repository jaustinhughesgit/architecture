# Security and Trust

## Trust modes

1var should make the trust mode visible for every protected operation.

### Local zero-knowledge

- Secrets are encrypted and decrypted on a user-controlled device.
- Provider requests that require plaintext secrets execute on that device.
- The server receives only opaque references, encrypted material, or policy-filtered results.
- Platform operators cannot technically retrieve or repurpose plaintext credentials.

### Trusted server

- The user explicitly authorizes server-side use for a defined provider, operation, and policy.
- Secrets are encrypted at rest and revealed only inside the controlled execution boundary.
- Access is authenticated, authorized, narrowly scoped, rate-limited, and audited.
- The product must not call this zero-knowledge because server code can technically access plaintext during use.

### Public/non-secret

- No protected asset is involved, but identity, permission, abuse, and data-integrity controls may still apply.

## Protected-asset invariants

- Never include plaintext protected values in model prompts, logs, diagnostics, Paths, entity source, URLs, ordinary ContextDB, analytics, or job records.
- Entities declare requirements by stable references and scopes.
- Protected provider fields store canonical `query`, `header`, or `body` injection locations; bounded generator wording aliases may normalize to those values but cannot add a destination or reveal a value.
- A missing duplicate field declaration may be recovered only from an exact protected placeholder already located at a literal declarative request parameter. This synchronizes non-secret metadata; it never supplies plaintext or expands the provider destination.
- A revision with exactly one incomplete requirement may also move exactly one undeclared provider request placeholder into that protected namespace. Multiple requirements or undeclared fields remain ambiguous and fail closed.
- Consent must identify the actor, asset, provider/host, action, duration or use count, and selected trust mode.
- Provider redirects, host changes, and dynamic URLs must be revalidated against policy.
- Results may themselves be sensitive and need local encryption or redaction.
- Revocation must prevent future use without requiring the entity or Path to be deleted.
- Reset and deletion operations must cover primary records, audit retention policy, cached grants, and derived references deliberately.

## Recipient-specific sharing

Zero-trust sharing requires both a cryptographic recipient wrap and an authorization grant. The creator's device may encrypt the payload once and create an independent ECDH/HKDF wrap for each recipient's public-key version. Salts and ephemeral public keys may be stored with ciphertext; recipient private keys and plaintext may not.

- Recipients may retrieve envelopes, but do not automatically receive owner powers such as edit, rotate, delete, delegate, or view the owner's full audit trail.
- Adding an executor/KMS wrap makes server decryption technically possible and must be labeled trusted-server mode.
- Removing a recipient cannot revoke ciphertext they already downloaded; future confidentiality requires a new content key and version.
- Organization membership is resolved to explicit recipient/device grants and key versions rather than treated as a decryption key itself.

See [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md).

## Local companion direction

**Product intent:** a background local application can hold protected personal data and provider credentials, navigate approved headless protocols, and execute provider APIs without revealing secrets to 1var servers. The browser remains the user's control and conversation surface.

The companion will need authenticated browser-to-local communication, origin binding, signed protocol packages, explicit approval UX, anti-replay controls, local audit history, safe update behavior, and a clear boundary between ordinary browser data and protected local data.

Automating account creation or terms acceptance requires explicit user approval and evidence of the terms shown. Voice confirmation can be an input mechanism; it must not weaken the consent record or allow silent acceptance.

## Device and runtime distinctions

- Creating a WebAuthn credential enrolls an authenticator; a protected operation is hardware-authorized only when policy verifies a fresh assertion for that operation.
- A non-exportable IndexedDB `CryptoKey` reduces accidental extraction but does not prove that application code cannot request its use.
- Dynamic local entity or user-authored script source runs in `fileWorker`, never on the browser main thread. Worker output is untrusted until a main-thread module validates and authorizes it.
- `fileWorker` separates entity work from the main UI thread, but a same-origin Web Worker with dynamic compilation and ambient network authority is not a malicious-code sandbox.
- WebRTC encrypts transport between peers; application-level end-to-end encryption and recording policy are separate guarantees.
- Email reputation and consent controls require both code and verified SES/domain deployment state.

See [identity and encryption](capabilities/identity-encryption.md), [worker isolation](capabilities/worker-isolation.md), [streaming](capabilities/realtime-streaming.md), and [email](capabilities/email-platform.md).

## Authorization and visibility

Public/private determines discoverability or audience, not every permitted action. Authorization independently governs actions such as use, set, edit, delete, delegate, and govern. Returning a value and invoking logic are both `use`; `execute` is retained only as a legacy request alias. Parent/child use and relationship traversal must evaluate authorization at each relevant boundary rather than inherit unlimited access accidentally.

A Word, alias, normalized form, or lemma is only a lexical address. Resolving it to entity candidates grants no visibility or action authority. Candidate retrieval must apply the entity, relationship, version, workspace, owner, and action-specific policy before returning or aggregating data. Protected plaintext must not become globally discoverable lexical material without explicit publication authority.

Ordinary Context graph publication uses participant-scoped visibility. The browser supplies only proper-person voice references grounded in the executed Path's semantic bindings, and Compute derives the audience from the authenticated publisher plus exact unique public user identities resolved from those labels; a client-supplied recipient ID is not authority. Hydration can read only the authenticated principal's audience partition, and workspace ownership is rechecked for both publish and hydrate. Protected inputs and protected graph markers are excluded from this channel. Server records retain publisher and source provenance so later trust and moderation policy can distinguish another user's assertion from the participant's own statement.
