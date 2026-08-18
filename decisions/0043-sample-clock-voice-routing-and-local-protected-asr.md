# 0043: Route held voice by sample clock and transcribe protected lanes locally

Status: accepted

## Context

The first segmented-input implementation changed trust by stopping one recorder or browser speech recognizer and starting another. Provider delivery could lag behind the pointer, and a short protected word could disappear before either recognizer produced text. Retaining a finite protected blob and replaying it through `SpeechRecognition.start(track)` did not work reliably across the supported browser runtime. More importantly, an unqualified browser `SpeechRecognition` implementation may use a remote service, so it could not prove the intended protected-audio boundary.

Four simultaneous microphone acquisitions do not solve this problem. They compete for the same device, create four independent clocks and permission/lifecycle states, and “muting” three tracks does not establish which delayed recognizer owns audio near a transition.

## Decision

Transcribe acquires one physical microphone stream per held press. One `AudioWorkletProcessor` receives that stream continuously and maintains one active logical lane:

- `essence`
- `essence-zero-trust`
- `convert`
- `convert-zero-trust`

The main thread posts entry into a protected lane in the pointer-transition event. Leaving a protected lane is intentionally asymmetric: a 100 ms privacy guard keeps routing audio to the protected lane, then posts the ordinary-lane change only if the pointer still requests ordinary capture. Returning to protected during the guard cancels the pending exit without opening an ordinary lane. The guard therefore may protect a small leading fragment intended as ordinary, but it must not expose a trailing fragment intended as protected. At a committed change the next audio render boundary flushes the prior lane, records its ending `currentFrame`, and opens the next lane at the same frame. PCM blocks carry lane, channel, protected status, sample rate, and start/end frames. Capture order comes from that sample clock; transcription completion time has no authority over order or trust.

Ordinary PCM remains in browser memory until release, is encoded as mono PCM WAV, and enters only the declared `/transcribe` route. The browser-local worker receives protected PCM through a transferable `Float32Array`, resamples it locally, and invokes the bundled Transformers.js Whisper/ONNX pipeline. It may download and cache version-selected model and runtime artifacts, but it has no protected-audio endpoint or remote-recognition fallback. The worker attests `local: true`; the coordinator rejects an unattested result, punctuation-only output, or local-runtime failure. Transferred PCM buffers are cleared after inference. If AudioWorklet, Worker, WebAssembly, the model, or local inference is unavailable, protected speech fails closed and reports the local error.

The browser may begin local-model preparation when the user first enters a protected lane and exposes preparation progress. The microphone does not wait or restart: protected PCM remains in memory until local inference is ready. Final release waits for protected inference and encryption before it sends the single ordered interaction to the Path/Essence flow. A tap, left-slide cancellation, pointer cancellation, or stale capture token discards every lane, cancels pending protected inference, and sends no ordinary audio.

The independent ordinary browser speech-preview recognizer is disabled on the continuous path. It could otherwise continue consuming microphone audio after the AudioWorklet boundary and silently weaken the protected lane even if its late text were ignored.

The live interaction card is a projection of the same sample-clock timeline, not a second transcript accumulator. Opening a capture segment reserves a presentation slot before recognition. An unresolved ordinary slot displays an ellipsis; a protected slot displays `***` immediately and never retains its plaintext. Recognition events carry the capture switch index and may settle only the matching slot. Callback completion order therefore cannot move text across a trust boundary or overwrite another segment. This makes trust and order visible immediately while leaving final recognized words authoritative.

## Security scope

This strengthens the existing zero-knowledge boundary: 1var servers, remote transcription services, and model hosts do not receive protected PCM or its transcript. Fetching model/runtime artifacts reveals an artifact request and ordinary network metadata, not input audio.

This is not a claim that a browser-delivered web application is immune to a malicious client release or compromised endpoint. The device, browser, local inference runtime, and client code delivered for that release are in the trusted computing base. Independently verifiable client delivery plus pinned or self-hosted inference artifacts is required before claiming resistance to a malicious future web server, and remains hardening work.

## Consequences

- Rapid switching no longer depends on transcription latency or recorder startup.
- Trust hysteresis is one-sided: entering protected is immediate, while exiting protected requires 100 ms of stable ordinary intent.
- There is one permission and device lifecycle, with four referencable logical lanes.
- Protected speech has no permissive compatibility fallback; unsupported clients must use protected typed input or fix the local runtime.
- First protected use may wait for a model download, so preparation progress and caching are part of the user experience.
- Exact ordinary words remain subject to recognition latency on the continuous path, but the live card exposes stable ordered/trust-classified slots immediately and authoritative transcripts settle those same slots in sample order.

## Affected repositories

- `aws`: continuous capture, lane routing, local ASR, presentation status, release/cancellation assembly, and tests.
- `architecture`: voice-capture and zero-knowledge claim scope.

## Verification

Unit tests prove the four lane map, contiguous start/end frames, `ordinary → protected → ordinary` order, immediate protected entry, cancellable 100 ms protected exit, out-of-order live transcript settlement by switch index, non-retention of protected plaintext in the display draft, WAV creation, transferable local-worker invocation, absence of a protected `/transcribe` call, cancellation, and existing press assembly. A real-browser check must load the AudioWorklet, produce contiguous non-empty sample ranges from a synthetic single stream, load the local model, and complete an inference with `local: true`. Physical-device rapid-crossing acceptance remains required after deployment.
