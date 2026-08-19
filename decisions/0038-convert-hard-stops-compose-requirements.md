# 0038 — Convert hard stops compose requirements outside Essence

Status: accepted

Amended by [decision 0045](0045-convert-discovery-receives-bounded-ordinary-authoring-context.md): `relevantItems` remains unavailable to Convert, but the browser now supplies a separate bounded `authoringContext` containing up to 20 non-protected recent inputs and their browser-proven Essence rows.

## Context

Convert and Essence share capture infrastructure, but they do not share semantic authority. The legacy transcription route could classify Convert speech as Essence, gather automatic ContextDB context, update lexical state, and commit pending graph mutations. Convert is instead how a user speaks requirements for creating or editing an entity. During one Convert hold, sliding to Essence and back marks a hard stop between requirements; it does not change the meaning of those words into a ContextDB operation.

## Decision

Convert requirement authoring uses a versioned `convertRequirements` envelope containing an ordered `requirementSegments` array and a derived `userRequest`. Each Button 3 ↔ Button 2 hard stop finalizes one nonempty segment, adds a terminal period when the segment has no sentence punctuation, and inserts exactly one line break before the next segment. The segments are submitted once, in order, as one creation or edit request.

For a press that began on Button 3, entering Button 2 is the physical boundary event. It closes the current Convert recorder immediately rather than waiting for the ordinary delayed channel-switch commitment. Button 2 is parked as a delimiter for that authoring press; returning to Button 3 resumes another ordered Convert segment. The press-scoped authoring marker must travel in the actual worker message, not only in presentation or diagnostic state.

The boundary is also a live presentation contract. The browser marks the current preview segment with its terminal punctuation and newline as soon as Button 2 is entered. Later provider transcripts may replace preview wording, but they must retain the boundary associated with the audio chunk; presentation must not flatten the segment list while the press remains active or after release.

The envelope does not reuse the broad Essence fallback payload: its `relevantItems` remains empty. Decision 0045 adds a narrower `authoringContext` contract containing bounded ordinary recent inputs and their already-proven Essence effects. It excludes protected entries and full graph snapshots, informs discovery only, and cannot attach a remembered value to the reusable entity.

Compute capability discovery receives both the ordered segments and their combined request. The model treats every segment as a requirement for the same capability. Discovery produces a semantic capability contract; validated generation produces JPL; ArrayLogic and Shorthand materialize the entity through their existing governed boundaries. Hard stops are enforceable requirements, not prompt suggestions: deterministic post-discovery validation must preserve invocation, response, and state-transition behavior expressed by a segment. In particular, an explicit transition cannot be approved as effect-free implementation text; it is repaired into an unambiguous bounded effect or the build fails closed.

Grammatical ownership and ordinary values remain separate in that contract. A deictic current-speaker form such as `my`, `me`, `I`, `self`, `user`, or `current user` identifies the canonical `speaker` side of a ContextDB binding address; it is not a second required input beside the property value resolved at that address. Discovery and EntityPlan generation are instructed accordingly. Generated-contract normalization may rename a model-confused deictic ContextDB value input from the owner label to its declared non-deictic property, merge it with an identical property binding, or discard a separately generated owner pseudo-input only when the speaker binding and deictic examples prove it redundant. An explicitly declared input name or a non-deictic person value is preserved.

An invocation phrase explicitly declared inside a requirement—for example, a bounded “when I ask/say/type …” clause—is authoritative authoring evidence. Compute deterministically preserves that phrase as an utterance example on the selected operation even when discovery proposes a different paraphrase. When a declared invocation family has one varying effect subject, generated normalization removes additional required or optional utterance inputs that the answer, effect, calculation, and explicit requirements do not use; an optional input explicitly named as an input/parameter remains. This prevents a model-invented field such as a second make/model value from changing the authored command contract or its retrieval Position. The browser compiles and tests every retained example before reporting the entity ready. This preserves user wording without making the complete Convert requirement envelope an invocation or giving server-authored text ownership of browser token signatures.

The ordinary interaction rail retains the submitted Convert request as a browser-owned authoring-history item. Worker Essence-history refreshes merge around that item rather than replacing it. The item is presentation history only: retaining it does not send the request through Essence, write ContextDB, or authorize replay. A Path-learning replay with the same input context replaces the failed visible exchange instead of appearing as a second user utterance.

Create and Edit share the same requirement composition mechanics. Create targets capability discovery/build. Edit adds an explicit target identity and follows the existing revision, validation, lineage, and replay lifecycle.

## Consequences

Requirement boundaries remain inspectable for prompt evaluation and repair instead of disappearing into punctuation. Convert cannot accidentally store an authoring instruction as a personal fact. A minimal headless test can supply segments directly without browser automation.

The browser now closes each ordinary Convert audio chunk at a channel excursion, preserves the nonempty transcripts as ordered requirement segments, and submits them once on final release. Ordinary Convert text and audio bypass Essence recording, word indexing, ContextDB mutation, and question replay. The durable browser build lifecycle preserves the v1 prompt across polling/reload and compiles manifest-derived local Paths. Installation becomes successful only after the Transcribe worker acknowledges a request-correlated library revision containing every new signature. Convert then stops because the authoring requirements are not an invocation; an Essence-originated discovery may replay only after the same acknowledgement. Edit remains on its separate explicit-target interception path and has not yet adopted the same multi-segment composer.

## Alternatives

- **Concatenate all speech into one sentence.** Rejected because hard-stop intent would be lost and prompt failures would be harder to diagnose.
- **Treat the temporary Essence position as an Essence submission.** Rejected because the gesture is a Convert boundary, not a change in semantic authority.
- **Automatically attach ContextDB to improve generation.** Rejected because it changes the user's prompt, risks unrelated/private context crossing the boundary, and conflates authoring with recall.

## Affected repositories

- `aws`: requirement-envelope composition, gesture/session routing for Create, durable build polling, local Path installation, and future shared multi-segment Edit authoring.
- `compute`: envelope validation, discovery prompting, capability generation, ArrayLogic, and Shorthand materialization.
- `testing`: reusable headless scenarios may provide the same segment array once lifecycle response capture is available.

## Security impact

This decision originally excluded all implicit ContextDB evidence. Decision 0045 permits bounded ordinary recent-input/Essence authoring evidence while retaining the protected-input exclusion and browser-local invocation-value boundary.

## Verification

- Preserve two or more nonempty segments exactly and in order.
- Add a terminal period at each unpunctuated hard stop, join segments with one line break, derive one combined request, and submit it once.
- Prove the discovery prompt receives the segment array with empty semantic evidence.
- Prove a deictic current-speaker owner becomes the ContextDB subject rather than a required `user`/`speaker` input, while an explicitly declared or non-deictic person input remains ordinary data.
- Prove the generated capability contract retains all required inputs and clarifications.
- Prove validated JPL is materialized through active ArrayLogic and Shorthand implementations.
- Prove ordinary Convert speech emits the authoring contract without calling the Essence/ContextDB recording path.
- Prove a quick Button 3 → Button 2 → Button 3 gesture splits capture without a dwell delay and that the deferred worker message retains the Convert-authoring marker.
- Prove the live preview and authoritative recognized-audio replacement both render the hard stop as terminal punctuation followed by one newline.
- Prove build completion does not unlock invocation replay until the worker acknowledges every installed compute Path signature; missing signatures and acknowledgement timeouts fail closed.
- Prove an explicitly declared invocation phrase survives model paraphrasing, compiles locally, and is included in the acknowledged installed set.
- Prove a one-slot declared invocation family removes model-invented required and optional utterance inputs while preserving an explicitly named optional input.
- Prove an explicit state-transition hard stop becomes a validated mutation effect even when discovery omits it, and ambiguous mutation requirements fail instead of producing a read-only app.
- Prove Convert authoring remains visible after worker history refresh without entering Essence/ContextDB, and one repaired replay does not create a duplicate user card.
- Keep a thin physical browser/microphone smoke test in the release checklist because simulated audio unit tests do not prove device gesture timing.
