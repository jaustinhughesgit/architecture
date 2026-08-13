# 0035: Segment input continuously and declare the protected use boundary

Status: accepted

## Context

The microphone slider previously ended an utterance when a pointer crossed into Zero Trust. That made partial protection impossible: “I have three cats” could not keep only “three” protected. Protected Asset approval modes also described consent timing without stating whether plaintext use was local or in the trusted server.

## Decision

One held input is an ordered sequence of ordinary audio/text and browser-encrypted Protected Asset references. Crossing between an ordinary control and its nearest protected control changes the segment mode but does not submit. Final release assembles and processes the sequence once. Moving left cancels the active capture and opens Message beside the controls. The last three sanitized inputs are visible only while Message is focused or a transcribe control is held.

Protected Asset metadata declares one of three user-facing policies:

1. `local_only`: `local-zero-knowledge`, approval per local use, and no executor wrap.
2. `server_ask`: `trusted-server`, approval for each use, with an executor wrap.
3. `server_preapproved`: `trusted-server`, preapproved use, with an executor wrap.

All three declare `plaintextRetention: never`. ContextDB exposes policy changes. Changing policy decrypts and re-encrypts in the browser; the server accepts only a new ciphertext envelope bound to the new metadata. Removing protection decrypts locally and deletes the server asset. The temporary local display is masked and cleared after a bounded interval.

The server broker rejects `local-zero-knowledge` assets before decryption. This preserves the boundary while the generic browser/local provider execution plane remains incomplete.

## Alternatives

- Submitting each mode transition lost the user's single conversational turn.
- Sending every protected value through Compute made option 1 falsely zero-knowledge.
- Updating metadata without browser re-encryption would break authenticated AAD and leave stale wraps usable.

## Security impact

Protected segments and answers are redacted from history cards, word indexes, learning, diagnostics, and ordinary speech. Trusted-server modes expose plaintext only inside the bounded provider execution call and require `plaintextRetention: never`; local-only assets fail closed at Compute.

## Migration

Existing provider-use assets without `trustMode` retain their earlier server execution behavior. New assets select an explicit policy, and policy changes rotate the encrypted envelope/version rather than mutating metadata in place.

## Consequences

Partial protected speech preserves one conversational input and prevents protected segments from entering word indexes, model repair, diagnostics, or ordinary presentation. Server-use consent and technical plaintext access can no longer be confused. Policy rotation invalidates old version-bound recipient grants until the existing rewrap lifecycle is completed.

## Affected repositories

- `aws`: slider, Message hosting, deferred input assembly, local re-encryption, ContextDB controls.
- `compute`: canonical policy normalization, envelope binding, rotation, and broker rejection.
- `architecture`: interaction and trust contracts.

## Verification

Unit tests cover mode selection, recent-input redaction, release-time assembly markers, policy mapping, executor-wrap selection, and server policy validation. Browser QA covers the slide-out panel and conditional recent-input overlay.
