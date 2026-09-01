# 0124: Interaction Automations are local runs and protected speech never leaves the device

**Status:** Accepted and implemented in the clean platform; deployment verification pending.

## Context

Immediate spoken replies, game clocks, countdowns, and cooking timers are too short-lived for the durable schedule dispatcher. The proof-of-concept Automation queue demonstrated their value, but it mutated completion flags inside reusable definitions and mixed playback with other interaction code. Speech also has two materially different trust paths: an ordinary response may use a high-quality hosted synthesizer, while a protected answer may not leave the owner browser.

## Decision

Introduce one browser-owned Interaction Automation module. An immutable typed definition contains at most 64 ordered steps with offsets from zero through fifteen minutes. The only admitted initial actions are ordinary response speech and submission of an ordinary input through the existing command/Path channel. Per-run step state, completion, failure, cancellation, and restart recovery are stored separately and executed one step at a time by a dedicated browser worker. Completed runs remain bounded local evidence; the definition is never marked used or rewritten. Longer work remains a governed schedule.

Voice-originated proven ordinary responses create an ephemeral zero-delay speech run. The ordinary speech endpoint has no privacy selector and accepts only strict ordinary text plus the exact root interaction ID. It uses the explicitly configured OpenAI speech model first, returns transient MP3 bytes with `retainedByOnevar: false`, records approximate configured model cost, and falls back to browser synthesis when unavailable. Typed responses remain silent. Starting microphone capture interrupts hosted playback and browser synthesis.

Protected presentation never calls that endpoint. It decrypts, renders, and synthesizes only in the browser under its existing presentation authority. Masking a protected value does not convert it into ordinary speech authority. Server-use, recipient-use, and presentation grants remain independent.

## Consequences

- Short sequencing does not create millions of server schedule rows or polling work.
- Refresh can resume pending local runs, and cancellation is explicit.
- A browser that is closed cannot execute an Interaction Automation; durable schedules remain the absent-browser mechanism.
- Ordinary hosted speech is metered under the same root before interaction pricing finalizes.
- Protected plaintext has no server TTS request schema, transport, log, or provider path.

## Verification

Contract tests reject unordered, oversized, and privacy-extended payloads. Browser tests prove persisted due-step execution, duration bounds, ordinary-first playback, interruption, fallback, and a server-call-free protected path. API tests prove the exact reviewed OpenAI endpoint and transient response contract.
