# 0065: Project input purpose and trust as four stable browser lanes

**Status:** Accepted; clean-platform Phase 3.5 foundation implemented and deployed

## Context

The first clean Phase 3 control displayed Essence, Hard stop, and Convert as three peer positions. Hard stop is not an input purpose: it is a boundary action inside a Convert authoring session. That projection was difficult to understand and could not become the consent surface for protected input. The proof-of-concept established a useful four-lane model, but its tap/hold state, hidden actions, and legacy implementation cannot be imported into the clean platform.

## Decision

The browser represents input as two independent dimensions: semantic purpose is `essence | convert`, and trust is `ordinary | protected`. The command surface projects their four combinations in this stable order:

1. Protected Essence
2. ordinary Essence
3. ordinary Convert
4. Protected Convert

The positions select routing for typed and voice input. They are actual labeled controls with a separate record/stop action; selecting a lane never resets ContextDB or performs an unrelated command. Position 2 is ordinary Essence at rest. During a voice session that began at position 3, an excursion `3 -> 2 -> 3` is a Convert delimiter, not an Essence operation. Each ordinary Convert audio range is transcribed separately and retains exactly one hard-stop boundary before the next requirement.

One microphone feeds one AudioWorklet clock. Every audio block carries its lane position, segment index, and start/end frame. Entering a protected lane commits on the next worklet render boundary. Leaving protected uses a cancellable 100 ms guard. In the Phase 3.5 foundation, any protected block makes the complete held capture fail closed: no block from that session enters remote transcription, protected PCM is not encoded into an outgoing WAV, and the browser retains only a fixed masked receipt. Protected typed text likewise enters no ordinary worker, ContextDB record, authoring request, model prompt, terminal transcript, or network request.

Phase 3.5 deliberately does not claim usable protected storage or execution. Until Phase 4A adds browser-local ASR, encryption, protected references, grants, and governed use, protected plaintext is discarded locally and Protected Convert blocks the draft from model authoring. This provides an executable no-fallback boundary without prematurely expanding ordinary Interaction Evidence or Compute contracts.

## Alternatives

- **Keep Hard stop as a third mode.** Rejected because an action is not a semantic/trust lane and the control cannot explain protection.
- **Import the proof-of-concept Transcribe module.** Rejected because the clean platform must preserve the behavior through small contracts and tests, not legacy state.
- **Send protected speech to ordinary transcription until local ASR exists.** Rejected because a temporary fallback would violate the boundary Phase 4A is meant to govern.
- **Hide protected positions until Phase 4A is complete.** Rejected because the routing and no-leak surface must be testable before protected storage and execution depend on it.

## Consequences

- Purpose and privacy are understandable before capture begins and remain visible during capture.
- Typed and voice tests can select the same four lanes.
- Ordinary Phase 3 behavior remains available in positions 2 and 3.
- Protected lanes are visible but honestly fail closed until the Phase 4A runtime exists.
- Partial protected utterance assembly, local transcription, encrypted storage, authorized reveal, and protected Compute binding remain Phase 4A work.

## Affected repositories

- `onevar-platform`: four-position command surface, frame-tagged AudioWorklet routing, guarded transitions, masked protected receipts, Convert draft blocking, and browser tests.
- `architecture`: clean roadmap, capability status, voice decision amendment, and this decision.

## Security impact

The selector is a routing control, not authorization. It creates no grant and cannot make a protected asset usable by Compute. Protected plaintext never enters the ordinary evidence schema. The Phase 3.5 fail-closed rule is intentionally more conservative than final partial-utterance assembly: if any protected audio is present, none of that held capture is remotely transcribed.

## Migration

The clean three-position UI is replaced without importing proof-of-concept code. Ordinary Essence moves from position 1 to position 2; ordinary Convert remains position 3. Existing explicit typed `convert:` commands remain accepted in the ordinary flow.

## Verification

- Unit tests prove the exact two-by-two lane map and that only `3 -> 2` after captured Convert content marks a hard stop.
- Browser tests prove all four labels and the ordinary default.
- Sentinel tests prove protected typed values appear in neither requests, terminal output, nor ContextDB review.
- Synthetic-microphone tests prove an ordinary/protected/ordinary held capture produces no transcription request.
- A frame-routed synthetic Convert capture proves `3 -> 2 -> 3` creates two ordered ordinary audio requests and one hard-stop draft boundary.
