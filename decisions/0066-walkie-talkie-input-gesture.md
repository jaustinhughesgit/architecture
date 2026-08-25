# 0066: Operate the clean four-lane input surface as one walkie-talkie gesture

**Status:** Accepted; implemented and deployed in `onevar-platform`

## Context

The clean four-lane trust foundation initially projected the correct semantic/trust matrix through conventional selectors plus separate record/stop, Convert-build, and draft-discard actions. The product owner rejected that interaction because the proof-of-concept's four-position dumbbell was already a successful product primitive: press to speak, move while held to choose protection or a hard stop, and slide away to type. Preserving that muscle memory does not require preserving the proof-of-concept runtime.

## Decision

`onevar-platform` reimplements the visual and gesture as a small clean-room state machine. Physical top-to-bottom positions are Protected Convert (4), Convert (3), Essence (2), and Protected Essence (1). Pointer down begins provisional capture and owns the pointer; vertical drag routes the same session; release automatically dispatches an ordinary request. Convert `3 -> 2 -> 3` creates one ordered hard-stop boundary. Typed `[hard stop]` has the same meaning and typed Convert submits immediately. There are no separate Build or Discard actions.

A horizontally dominant left drag of at least 34 pixels cancels the complete provisional capture before transcription or authoring, clears transient Convert state, and opens the text composer in the current lane. Left Arrow provides the composer action for keyboards; Space or Enter provides hold-to-talk.

AudioWorklet remains authoritative for sample-clock lane routing. A transient segmented MediaRecorder runs only for ordinary capture as a compatibility source when an embedded browser exposes microphone media but its worklet produces no samples. Canonical worklet output always wins. Protected entry stops the compatibility recorder immediately, clears all fallback segments, and preserves the existing whole-session fail-closed rule. If the browser denies the media device itself, the page reports that boundary rather than pretending it can transcribe.

## Alternatives

- **Keep conventional selectors and separate record/build/discard buttons.** Rejected because it adds interaction states and abandons an established product primitive.
- **Import the proof-of-concept Transcribe runtime.** Rejected because it would reintroduce legacy state into the clean platform.
- **Use MediaRecorder as the only capture path.** Rejected because it cannot own the exact sample-clock trust boundary as precisely as AudioWorklet.
- **Retry protected audio through MediaRecorder.** Rejected because compatibility cannot weaken protection.

## Consequences

- A normal request requires one hold and release.
- Moving away cancels rather than leaving a draft to manage.
- The same visual control selects purpose, signals trust, and places Convert boundaries.
- The gesture state machine, audio capture, dispatcher, and composer remain separate testable modules.
- Embedded-browser compatibility improves for ordinary speech; protected capture remains intentionally unavailable until Phase 4A.

## Affected repositories

- `onevar-platform`: gesture component/state machine, voice compatibility path, automatic dispatch, message drawer, and browser acceptance.
- `architecture`: platform status, roadmap, capability catalog, and decisions 0065/0066.

## Security impact

Left-drag cancellation invalidates the capture token before asynchronous recorder startup can finish. Pointer cancellation also terminates capture. Any protected intent stops and clears the ordinary compatibility recorder before later processing, and no mixed-trust held session can reach remote transcription.

## Migration

The interim clean selector UI is deleted. The four lane values and existing ordinary/protected routing contracts do not change, so no ContextDB, capability package, Path, or API migration is required.

## Verification

Pure gesture tests prove physical routing, hard-stop travel, and left cancellation. Browser tests prove visual positions, no Build/Discard controls, composer reveal without transcription, immediate typed and voice Convert dispatch, protected sentinel exclusion, mixed-trust failure, and unchanged two-browser Context/Compute behavior. Release `620f51b72ac525475317590ffa7a2875aee7dc90` passed complete repository verification, development workflow [32802829791](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32802829791), production workflow [32803142123](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32803142123), and their deployed voice gates. A fresh live `1var.com` entity then exposed the restored four-position rail and opened its focused Message composer from that control.
