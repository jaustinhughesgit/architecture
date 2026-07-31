# Sound Module

**Status:** Implemented foundation

The sound module gives entities and the browser interaction runtime a shared way to produce, receive, inspect, and stop audio. It is a platform primitive for voice experiences, alerts, accessibility, media, learning, and other domains—not a feature tied to one scenario.

## Current capabilities

- Browser Web Audio context lifecycle
- Generated tones
- MP3 and base64/array-buffer playback
- Stop and cleanup behavior
- Analyzer access for visual or signal-driven experiences
- Event-bus integration with other front-end modules

## Platform fit

- Commands, menus, calls, and automations can request sound behavior through registered interfaces.
- Entities may describe what should be played without taking ownership of global device state.
- Voice transcription and synthesis can share lifecycle and permission concepts while remaining distinct input/output capabilities.
- Public entities can package reusable sound behavior; private entities can keep recordings and compositions within their authorization boundary.

## Required work

Formalize the audio-source contract, device selection, autoplay/user-gesture requirements, mixing and interruption policy, streaming/buffering, accessibility controls, recording consent, encrypted local media, retention, and safe cleanup. Entity code should receive scoped audio operations rather than direct unrestricted access to the audio context.

