# 0038 — Convert hard stops compose requirements outside Essence

Status: accepted

## Context

Convert and Essence share capture infrastructure, but they do not share semantic authority. The legacy transcription route could classify Convert speech as Essence, gather automatic ContextDB context, update lexical state, and commit pending graph mutations. Convert is instead how a user speaks requirements for creating or editing an entity. During one Convert hold, sliding to Essence and back marks a hard stop between requirements; it does not change the meaning of those words into a ContextDB operation.

## Decision

Convert requirement authoring uses a versioned `convertRequirements` envelope containing an ordered `requirementSegments` array and a derived `userRequest`. Each hard stop finalizes one nonempty segment. The segments are submitted once, in order, as one creation or edit request.

The envelope carries no implicit Essence, Path, word-map, or ContextDB evidence. Its `relevantItems` is empty. A future contextual reference must be selected explicitly and use its own typed attachment contract; it cannot silently restore automatic ContextDB gathering.

Compute capability discovery receives both the ordered segments and their combined request. The model treats every segment as a requirement for the same capability. Discovery produces a semantic capability contract; validated generation produces JPL; ArrayLogic and Shorthand materialize the entity through their existing governed boundaries.

Create and Edit share the same requirement composition mechanics. Create targets capability discovery/build. Edit adds an explicit target identity and follows the existing revision, validation, lineage, and replay lifecycle.

## Consequences

Requirement boundaries remain inspectable for prompt evaluation and repair instead of disappearing into punctuation. Convert cannot accidentally store an authoring instruction as a personal fact. A minimal headless test can supply segments directly without browser automation.

The browser now closes each ordinary Convert audio chunk at a channel excursion, preserves the nonempty transcripts as ordered requirement segments, and submits them once on final release. Ordinary Convert text and audio bypass Essence recording, word indexing, ContextDB mutation, and question replay. The durable browser build lifecycle preserves the v1 prompt across polling/reload, installs manifest-derived local Paths, and stops after installation because the authoring requirements are not an invocation. Edit remains on its separate explicit-target interception path and has not yet adopted the same multi-segment composer.

## Alternatives

- **Concatenate all speech into one sentence.** Rejected because hard-stop intent would be lost and prompt failures would be harder to diagnose.
- **Treat the temporary Essence position as an Essence submission.** Rejected because the gesture is a Convert boundary, not a change in semantic authority.
- **Automatically attach ContextDB to improve generation.** Rejected because it changes the user's prompt, risks unrelated/private context crossing the boundary, and conflates authoring with recall.

## Affected repositories

- `aws`: requirement-envelope composition, gesture/session routing for Create, durable build polling, local Path installation, and future shared multi-segment Edit authoring.
- `compute`: envelope validation, discovery prompting, capability generation, ArrayLogic, and Shorthand materialization.
- `testing`: reusable headless scenarios may provide the same segment array once lifecycle response capture is available.

## Security impact

This decision narrows data flow. Ordinary Convert requirements may reach Compute and the configured model, but implicit ContextDB rows and resolved remembered values do not. Protected-input rules remain separate and unchanged.

## Verification

- Preserve two or more nonempty segments exactly and in order.
- Derive one combined request and submit it once.
- Prove the discovery prompt receives the segment array with empty semantic evidence.
- Prove the generated capability contract retains all required inputs and clarifications.
- Prove validated JPL is materialized through active ArrayLogic and Shorthand implementations.
- Prove ordinary Convert speech emits the authoring contract without calling the Essence/ContextDB recording path.
- Keep a thin physical browser/microphone smoke test in the release checklist because simulated audio unit tests do not prove device gesture timing.
