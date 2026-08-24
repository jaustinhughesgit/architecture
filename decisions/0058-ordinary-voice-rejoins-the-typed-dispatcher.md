# 0058: Transient ordinary voice rejoins the typed interaction dispatcher

**Status:** Accepted for Phase 3; clean-platform foundation implemented

## Context

Voice is a primary 1var input, but a separate voice semantic pipeline would create different Paths, evidence, and behavior from typed text. Raw audio is larger and more sensitive than the resulting ordinary transcript. Convert also needs explicit ordered hard-stop boundaries rather than punctuation guessed from one transcription.

## Decision

The clean browser captures ordinary mono PCM through one AudioWorklet and transfers samples to a dedicated encoder worker. Capture is bounded to 60 seconds and encoded as WAV off the main thread. The authenticated same-origin API accepts only bounded allowlisted audio formats, forwards the file to an explicitly configured transcription model, and returns a strict ordinary transcript receipt with `retainedByOnevar: false`. 1var does not write raw audio to ContextDB, DynamoDB, S3, authoring evidence, or logs; upstream retention remains governed by the configured provider project policy.

The transcript is replayed through the same command dispatcher used by typed input, producing the same Interaction Evidence, Essence, Path, Compute, and response behavior. The command surface exposes positions 1 Essence, 2 Hard stop, and 3 Convert. Convert captures ordered segments at position 3; a 3 → 2 → 3 excursion marks the next segment boundary; final build submits the same ordered Convert contract as typed `[hard stop]` input.

Protected audio is excluded. It requires Phase 4 browser-local transcription and a new privacy contract; ordinary server transcription must never become a fallback for protected capture.

## Consequences

- Text and ordinary voice share one semantic and execution authority.
- Encoding cannot block the main UI thread, and raw audio lifetime is bounded to capture/transcription.
- Hard stops are user-authored boundaries rather than model-inferred punctuation.
- Real-device/audio-model acceptance and broader device coverage remain deployment gates.

## Alternatives

- **Keep separate voice logic.** Rejected because it produces behavioral drift and duplicated tests.
- **Persist audio for later processing.** Rejected for Phase 3 because the ordinary transcript is the needed evidence and retention adds cost/privacy risk.
- **Send protected audio to the ordinary endpoint.** Rejected because it violates the zero-trust boundary.

## Affected repositories

- `architecture`: this decision and the clean roadmap/capability catalog.
- `onevar-platform`: audio contract, AudioWorklet, encoder worker, API provider, CDK configuration, Convert control, and tests.

## Security impact

The endpoint requires the host-only entity session, enforces size and MIME bounds, uses a Secrets Manager reference, and retains no raw audio. Browser and server diagnostics contain only bounded failure messages. Protected mode is not represented by this contract and fails closed.

## Migration

No proof-of-concept audio state or local model is imported. The clean ordinary pipeline begins at schema version 1. Protected capture requires a later incompatible contract rather than a flag on this endpoint.

## Verification

- Encode PCM in a worker and reject empty or overlong capture.
- Prove the API accepts only bounded audio and returns `retainedByOnevar: false`.
- Prove multipart forwarding uses an extension-bearing filename and explicit model.
- Replay a transcript through the typed dispatcher.
- Prove 3 → 2 → 3 creates an ordered Convert hard stop.
