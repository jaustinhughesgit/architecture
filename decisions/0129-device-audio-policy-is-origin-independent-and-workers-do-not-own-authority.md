# 0129 — Device audio policy is origin-independent and workers do not own authority

## Status

Accepted — implemented and development-live-proven

## Decision

Ordinary output audio is controlled by one browser-local device policy, not by whether the initiating input was typed or spoken. Audio defaults on at normal volume. The exact commands `Turn audio on`, `Turn audio off`, `Turn audio up`, `Turn audio down`, `Turn audio to quiet`, and `Turn audio to loud` change that policy whether they are typed or spoken; `audio status` reports it. The setting is scoped to the exact local entity and persists without becoming server profile data.

Every accepted ordinary response, short automation speech step, and incoming ordinary event announcement consults the current setting at release time. Those announcements include secretary relays and newly observed pending conference invitations. OpenAI speech remains the preferred ordinary renderer and browser synthesis remains its explicit fallback. A result cannot speak before it is accepted and required effects commit. Turning audio off cancels prepared and active ordinary playback. Incoming events are queued and deduplicated by exact source-derived interaction identity rather than matching their rendered words. Active conference media remains governed by its separate mute and device controls.

Immediate response and incoming-event playback are ephemeral post-commit projections and never create retained Interaction Automation state. Only explicitly requested delayed or sequenced audio uses the Automation timing worker. Speech delivery therefore cannot block command completion, ContextDB mutation, or the next input.

Protected plaintext is excluded from hosted synthesis regardless of the audio setting. It may be spoken only through the existing locally authorized protected presentation path.

The sound runtime separates authority from signal processing. The trusted browser coordinator owns policy, authorization, billing identity, queueing, decoding, and persistence requests. A dedicated `AudioWorkletProcessor` receives transferable PCM and owns only bounded real-time mixing, volume, stop, and completion. Future procedural sound, synthesis, decoding, blending, and encoding may use additional typed media-worker operations, but workers receive neither unrestricted network/storage authority nor direct ownership of entity state. Saved audio must cross the governed artifact boundary.

## Consequences

- Typed and spoken interactions now behave consistently under one explicit setting.
- Incoming ordinary events can be heard promptly without becoming chat, bypassing exact delivery, or coupling invitation announcements to active call-media state.
- Real-time sample work no longer needs to contend with React rendering on the main thread.
- The old proof-of-concept audio-worker idea is retained as a bounded module boundary, not copied as an accumulating script.
- Advanced instruments, game sounds, streaming, effects, and saved compositions require reviewed typed source/effect/artifact contracts rather than arbitrary worker messages.

## Evidence

- Platform release `f66525071d5fafbcb4829383217accb6290b0506` passed CI run `33704538009`, including the complete browser acceptance suite.
- Deployment run `33705100404` promoted that immutable release to the development CloudFront surface without resetting user state.
- Deployed browser acceptance proved persisted typed-response audio policy and exact queued incoming-relay audio.
