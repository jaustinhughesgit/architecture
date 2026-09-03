# Sound Module

**Status:** Implemented foundation

The sound module gives entities and the browser interaction runtime a shared way to produce, receive, inspect, and stop audio. It is a platform primitive for voice experiences, alerts, accessibility, media, learning, and other domains—not a feature tied to one scenario.

## Current capabilities

- Browser Web Audio context lifecycle and device-local persisted audio policy
- Origin-independent ordinary output: typed, spoken, automated, and incoming ordinary event announcements—including secretary relays and conference invitations—obey the same on/off and quiet/normal/loud setting
- Generated tones
- MP3 and base64/array-buffer playback
- Gesture-time preparation, `AudioBuffer` decoding, and transferable PCM delivery to a dedicated `AudioWorkletProcessor`
- Off-main-thread bounded PCM mixing, master-volume changes, stop, and completion events
- Two-phase ordinary response delivery: exact-text synthesis may begin before presentation work finishes, while playback remains gated on accepted result delivery
- Stop and cleanup behavior
- Analyzer access for visual or signal-driven experiences
- Event-bus integration with other front-end modules

## Platform fit

- `Turn audio on`, `off`, `up`, `down`, `to quiet`, and `to loud` are exact browser commands. `audio status` inspects the setting. The command may be typed or spoken; its origin never changes the resulting policy.
- Commands, menus, calls, incoming secretary relays, and automations can request sound behavior through registered interfaces.
- Entities may describe what should be played without taking ownership of global device state.
- Voice transcription and synthesis can share lifecycle and permission concepts while remaining distinct input/output capabilities.
- Public entities can package reusable sound behavior; private entities can keep recordings and compositions within their authorization boundary.

## Required work

The clean runtime uses three bounded layers instead of rebuilding one unbounded legacy audio-worker file:

1. The trusted browser coordinator owns the persisted device preference, authorization, ordinary-versus-protected routing, hosted-TTS billing identity, decoding, queue policy, and artifact requests.
2. A dedicated AudioWorklet owns real-time PCM mixing, master gain, stopping, and completion signals. It receives transferable samples but no credentials, network authority, ContextDB, DOM access, or protected plaintext from the ordinary route.
3. Future media workers may add reviewed WebCodecs decoding, procedural instruments, effects, blending, and encoding through typed contracts. They remain data processors rather than policy or storage authorities. Saving output must create a governed artifact through the file boundary; a worker cannot silently persist it.

The clean runtime proves the ordinary-response autoplay boundary by preparing one scoped reusable Web Audio context during any accepted user submission gesture. Once an exact ordinary answer exists, it may prepare transient hosted audio concurrently with remaining rendering, audit, and bookkeeping work. The audio cannot play until the same interaction releases an accepted result; a failed, clarified, cancelled, or interrupted interaction aborts and discards the prepared request. Immediate result and incoming-event playback are ephemeral post-commit projections and do not create retained Automation records; only user-requested delayed or sequenced audio uses the timing worker. Secretary relays and newly observed pending conference invitations use one ordered device queue and exact source-derived interaction identity, so replayed sync state cannot repeat an announcement. OpenAI speech is the normal ordinary route and device speech is the fallback. Protected synthesis remains local-only and never enters this hosted route. Active conference media is governed separately by the call surface's mute and device controls.

Remaining work is to formalize the complete multi-source contract, output-device selection, ducking and priority, streaming, analyzers, accessible visual equivalents, recording consent, encrypted local media, and reviewed synthesis/encoding operations. Entity code must receive scoped typed audio operations rather than direct unrestricted access to an audio context or worker port.
