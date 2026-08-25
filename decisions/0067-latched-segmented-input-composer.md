# 0067: Latch the command composer and preserve partial protection as ordered segments

**Status:** Accepted; the clean Phase 3.5 composer and command controls are implemented. Protected segment sealing and governed use remain Phase 4A.

## Context

The four-lane input surface correctly separates semantic purpose (`essence | convert`) from trust (`ordinary | protected`), but one trust value for an entire typed input cannot represent a sentence with protected words embedded in ordinary structure. A closed-by-default text drawer also adds unnecessary interaction before every command-line test.

The proof-of-concept contains useful evidence: tap-latched and slide-ephemeral Message behavior, sample-clock trust transitions within held speech, separate semantic/masked/reference forms, one-use and timed protected-access approval, and distinct Speak/Reveal presentation policy. The clean platform must reproduce the general contracts without importing legacy runtime coupling.

## Decision

The clean entity page opens a persistent, focused ordinary Essence composer by default. A button tap cancels provisional capture and latches the composer at that lane until explicit close. A decisive left slide cancels capture and opens an ephemeral composer that closes after its submission or an outside pointer action. Every completed persistent submission clears its draft and restores focus.

One typed or held interaction has one semantic purpose and an ordered array of trust segments. Positions `2 <-> 1` change trust within Essence and `3 <-> 4` change trust within Convert. A nonempty draft cannot cross semantic purpose. The Convert voice gesture `3 -> 2 -> 3` remains the explicit hard-stop boundary rather than a protected segment transition.

Pointer and command controls share one state. `input 1` through `input 4` latch the corresponding lane, semantic aliases are accepted, and `input close` discards and closes the draft. Inline `/1`, `/2`, `/3`, and `/4` tokens commit the preceding tail and change the lane of the next tail without becoming input text.

Each protected span ultimately has three representations:

1. transient semantic plaintext, available only in the authorized browser-local protected runtime;
2. masked display text, normally `***`;
3. a stored opaque, versioned Protected Asset reference.

Ordinary spans retain ordinary text. Before Phase 4A, any protected span keeps the complete interaction out of ordinary ContextDB, remote transcription, authoring, models, Paths, logs, and the network. Phase 4A must locally transcribe protected voice spans, encrypt each coalesced protected span, substitute exact references, and then execute the assembled input. A partially protected fact may publish ordinary relations plus an owner-validated generic protected marker, never plaintext.

Protected request, use, and presentation policy remain independent. Ask and Don't ask are non-authorizing request/presentation states. A direct Approve click defaults to one use with no clock expiry and `remainingUses: 1`; consumption ends it. Other owner grant choices are 15 minutes, 1 hour, 1 day, and forever. A grant binds exact actor, asset/version, capability/operation, purpose, delivery scope, and lifecycle. Speak and Reveal windows are device-local presentation authority and cannot authorize Compute or provider use.

## Consequences

- The command OS is immediately usable with no preliminary pointer action.
- A sentence can keep ordinary structure while protecting one or many values.
- The slider, slash controls, command registry, and future voice assembly cannot drift into separate input authorities.
- Multiple protected spans can receive separate asset identity, grants, rotation, and revocation.
- The existing no-leak boundary remains stricter than the future Phase 4A execution path until reference sealing is available.

## Affected repositories

- `onevar-platform`: local segment model, latched/ephemeral composer lifecycle, command effects, focus behavior, masking, and tests.
- `architecture`: platform model, roadmap boundary, security policy, and this decision.
- `aws`: unchanged behavioral evidence for the proof-of-concept approval, presentation, local ASR, and partial-protection contracts.

## Verification

Pure tests cover segment order, masking, coalescing, inline commands, tap classification, and semantic-purpose separation. Browser tests cover default focus, focus restoration, tap persistence, left-slide ephemerality, button and slash trust switching, masked partial display, and protected sentinel absence from requests and ordinary review.
