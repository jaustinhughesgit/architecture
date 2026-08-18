# 0035: Segment input continuously and declare the protected use boundary

Status: accepted

## Context

The microphone slider previously ended an utterance when a pointer crossed into Zero Trust. That made partial protection impossible: “I have three cats” could not keep only “three” protected. Protected Asset approval modes also described consent timing without stating whether plaintext use was local or in the trusted server.

## Decision

One held input is an ordered sequence of ordinary audio/text and browser-encrypted Protected Asset references. It has three simultaneous representations: browser-worker semantic text for immediate local matching, masked display text such as `I have *** dogs.`, and stored text containing opaque Protected Asset references. The semantic form is never sent to a model, server, log, history, Cost, or main-thread presentation. Middle-button capture starts provisionally on pointer-down; confirming a quick tap cancels and discards that press instead of making speech wait behind the tap/hold timer. Crossing between an ordinary control and its nearest protected control changes the segment mode immediately but does not submit. The pointer transition records a monotonic, press-scoped capture boundary and starts the replacement capture pipeline without a fixed dwell timer. Every recorder or recognizer session reserves its ordered segment and context identity before transcription completes; asynchronous completion cannot reorder, reclassify, or attach speech to a newer press. A superseded recorder owns its own stop lifecycle and cannot clear a newer recorder. A protected recognizer stops gracefully so a delayed final result retains the original protected capture's identity. Its finite audio slice is also retained ephemerally in browser memory through completion, with no Base64/server flush callback. If live recognition produced no text, a supported client replays only that slice through speech recognition before encryption; cancellation discards it. Mid-press protected recognition, retained-audio fallback, and encryption may continue after ordinary capture resumes, while final release waits for closing protected recognizers and every protected asset before assembling and processing the sequence once. If typed full-sentence Path context disambiguates an isolated protected capture, such as `for` becoming numeric `four` in `I have *** dogs`, the worker asks the trusted browser coordinator to rotate that same local-only protected-speech asset before graph execution. Rotation is limited to the speech asset's existing `private_note`, local-zero-knowledge contract and preserves its opaque reference; plaintext remains browser-local. Moving left cancels the active capture and opens Message beside the controls. Message remains pinned through microphone use and closes only by its X or a pointer action outside Message and Transcribe. Starting capture preempts Automation, pending or active TTS/Sound, and browser-local synthesis so platform output cannot become user input. The last three sanitized inputs are visible only while Message is focused or a transcribe control is held.

Local ContextDB may retain the protected value inside its encrypted worker-owned snapshot so an installed local Path can execute. Main-thread graph views mask value entities while retaining ordinary connections. Query provenance marks direct and derived answers that used a protected entity; those answers remain masked, skip model and Automation speech routes, and are held only ephemerally in the worker for an authorized local presentation. Publication removes relations and nodes that disclose the protected value, then may publish the remaining ordinary graph delta. A protected input never initiates model learning, repair, compute discovery, or remote classification.

Protected Asset metadata declares one of three user-facing policies:

1. `local_only`: `local-zero-knowledge`, approval per local use, and no executor wrap.
2. `server_ask`: `trusted-server`, approval for each use, with an executor wrap.
3. `server_preapproved`: `trusted-server`, preapproved use, with an executor wrap.

All three declare `plaintextRetention: never`. ContextDB exposes policy changes. Changing policy decrypts and re-encrypts in the browser; the server accepts only a new ciphertext envelope bound to the new metadata. Removing protection decrypts locally and deletes the server asset. The temporary local display is masked and cleared after a bounded interval.

Presentation permission is separate from provider-use policy. Each asset/device records only a local setting and expiry:

- Speak: ask, don't ask, 15 minutes, 1 hour, 1 day, or always.
- Reveal: ask, don't ask, once, 15 minutes, 1 hour, 1 day, or always.

Enabling a presentation window requires a direct user action and successful local envelope decryption on that device. Every dropdown change starts a fresh window. While a Speak or Reveal window is active, each later protected answer automatically uses that standing device-local authorization; it does not require another stop-gate click. The corresponding Message button is hidden until the window expires, then reappears as an explicit one-time authorization that does not alter the dropdown policy. Reveal-once is consumed after one successful reveal. A masked protected answer presents the same controls in Message; Protected Assets and ContextDB keep manual controls visible. Authorized plaintext travels from the worker to Message only for that local reveal or speech action. Protected speech uses local browser synthesis and never the server text-to-speech boundary. These controls do not add server-use authority or change asset ciphertext metadata.

Ask opens Message and may queue only the fixed, non-protected approval notice. The opened Message panel retains the Speak and Reveal dropdowns plus their one-time authorization buttons; the notice never replaces those controls. A successful reference-bearing protected answer renders this request area even if a redundant legacy protection marker is absent. A protected input reference by itself is not an answer and cannot render the approval area or queue the notice. Don't ask keeps an actual protected answer masked without that notice. A microphone press interrupts the notice under the same capture-preemption rule.

The server broker rejects `local-zero-knowledge` assets before decryption. This preserves the boundary while the generic browser/local provider execution plane remains incomplete.

## Alternatives

- Submitting each mode transition lost the user's single conversational turn.
- Sending every protected value through Compute made option 1 falsely zero-knowledge.
- Updating metadata without browser re-encryption would break authenticated AAD and leave stale wraps usable.

## Security impact

Protected segments and answers are masked in history cards, Cost, graph presentation, diagnostics, and ordinary speech, and are excluded from word indexes and learning. Timed presentation settings contain no plaintext. Trusted-server modes expose plaintext only inside the bounded provider execution call and require `plaintextRetention: never`; local-only assets fail closed at Compute.

## Migration

Existing provider-use assets without `trustMode` retain their earlier server execution behavior. New assets select an explicit policy, and policy changes rotate the encrypted envelope/version rather than mutating metadata in place.

## Consequences

Partial protected speech preserves one conversational input and prevents protected segments from entering word indexes, model repair, diagnostics, or ordinary presentation. Contextual speech correction rotates provisional ciphertext before execution, so local reveal and local semantics cannot disagree. Server-use consent and technical plaintext access can no longer be confused. Policy rotation invalidates old version-bound recipient grants until the existing rewrap lifecycle is completed.

## Affected repositories

- `aws`: slider, Message hosting, deferred input assembly, local re-encryption, ContextDB controls.
- `compute`: canonical policy normalization, envelope binding, rotation, and broker rejection.
- `architecture`: interaction and trust contracts.

## Verification

Unit tests cover provisional-capture cancellation, mode selection, exact `ordinary → protected → ordinary` ordering when recognition completes out of order, retained protected-audio replay, recent-input redaction, release-time assembly markers, policy mapping, executor-wrap selection, and server policy validation. Browser QA covers rapid crossings, the slide-out panel, and the conditional recent-input overlay.
