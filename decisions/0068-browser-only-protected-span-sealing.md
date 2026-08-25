# 0068: Seal typed protected spans into exact browser-only asset references

**Status:** Accepted and implemented as the first clean Phase 4A slice; governed owner-local use continues in decision 0069.

## Context

The clean four-lane composer can preserve one sentence as ordered ordinary and protected spans, but Phase 3.5 intentionally discarded protected submissions. Phase 4A needs a durable reference-bearing form without copying protected plaintext into ordinary ContextDB, Interaction Evidence, 20/200 context, Paths, packages, model prompts, Compute requests, logs, or server persistence.

## Decision

Each coalesced typed protected span becomes one independently encrypted, versioned browser-only asset. A dedicated browser worker owns cryptography and protected IndexedDB persistence. It generates one random AES-256-GCM content key per asset, authenticates the exact owner/asset/version reference as additional data, and persists ciphertext plus the content key wrapped by a non-extractable identity-scoped AES-256-KW device key. The durable segmented input retains ordinary text and replaces protected text with the exact opaque reference in its original position.

The v1 reference carries only random identity, version, owner, browser-only mode, content type, and byte length. It carries no plaintext hash or label, key material, grant, presentation policy, or server-use claim. Multiple assets and their ordered input envelope commit atomically. Safe review reports reference metadata and counts only. Reset removes ciphertext, envelopes, and the device key.

This storage contract itself grants no use authority. Entity Use Binding v1 remains ordinary-only. Decision 0069 adds exact owner-local Context bindings, one-use/timed presentation grants, Speak/Reveal, rotation, revocation, and safe audit without broadening the asset reference. Request notifications, recipient ECDH wraps, server-ask/preapproved modes, and local protected ASR remain separate contracts and tests.

## Alternatives

- Encrypt the complete sentence: rejected because it destroys usable ordinary structure and independently governable protected spans.
- Store protected plaintext in ordinary ContextDB under a privacy flag: rejected because a policy label is not a cryptographic boundary.
- Hash protected plaintext into the reference: rejected because equality and dictionary attacks can leak low-entropy values.
- Add all POC envelope modes immediately: rejected because server and recipient modes require authority, wrapping, lifecycle, and audit contracts that the clean runtime does not yet implement.

## Consequences

- Typed partial protection becomes durable without claiming executable protected use.
- Future grants can bind an exact asset/version instead of a generated name.
- A non-extractable IndexedDB key reduces accidental extraction but is not WebAuthn or a defense against arbitrary same-origin code execution.
- Protected worker bytes are measured as their own startup budget.

## Affected repositories

- `onevar-platform`: contracts, browser worker, encrypted persistence, composer handoff, reset/review, and acceptance.
- `architecture`: Phase 4 status, security boundary, and capability evidence.

## Verification

Tests prove contract strictness, authenticated encryption, reload persistence, atomic reference ordering, no protected sentinel in network/DOM/ordinary review/durable plaintext, reset deletion, and full Phase 2/3 regression behavior.
