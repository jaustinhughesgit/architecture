# 0044 — Semantic answer plans precede Compute contracts

Status: accepted

## Context

Convert discovery previously asked one model response to classify the request and directly author the reusable capability contract. The model could describe the right behavior in English yet encode a different executable meaning. In one failure, “my register status” became an ordinary `user` input whose example value was `my`; the generated JPL returned that word instead of accepting the browser-resolved `speaker.register_status` value. The persisted operation also omitted `answerTemplate`, which server validation allowed but browser Compute Path validation rejected. The entity was therefore semantically wrong and un-installable even though the request was simple.

Sending the current value (`open`) to discovery would hide this contract defect, couple the reusable definition to one observation, and violate Convert's no-implicit-ContextDB boundary. The reusable entity needs the address and data flow, not private authoring-time data.

## Decision

Build discovery is semantic-first. Its strict structured response places an `answerPlan` before `capabilityRequest`. The plan declares the answer source, selected operation, input, output, a plain statement of what answers the request, and any ContextDB subject/property address. Non-build decisions use a null plan.

Compute treats that plan as a frozen semantic contract before EntityPlan or JPL construction. Every plan must select a declared operation and output; browser-resolved sources must select an input with the same source, and a calculation must select its declared calculation output. For a current-speaker ContextDB property, Compute locates the planned property input and may repair a generated deictic pseudo-input only when the requirements did not explicitly declare that input and its examples contain no non-deictic value. The repaired input is browser-resolved `contextdb` data at canonical subject `speaker`; model-authored annotations such as `my` are removed because they are grammatical evidence, not invocation values. Explicitly named inputs and actual person values remain ordinary inputs.

The plan never contains the current ContextDB value. At invocation, the browser resolves the address locally and sends only the scalar. The validated answer source travels with the internal build request: browser-resolved one-input/one-output contracts may use the deterministic local projection compiler, while a provider plan cannot be mistaken for a local copy merely because it has the same structural shape. No second model is needed to copy an unambiguous browser-resolved scalar into the declared output.

If background discovery JSON or semantic reconciliation fails, Compute starts one replacement background response containing the invalid JSON and sanitized validation feedback. The replacement job ID is opaque to the browser and remains resumable through the existing Convert polling contract. A second invalid result fails closed; correction cannot loop.

Every normalized Compute operation has a nonempty answer template. When generation omits it, Compute derives the lossless generic template from declared outputs. This aligns server acceptance with the browser worker's installability check.

## Consequences

- The model must commit to what answers the request before it designs executable structure.
- English intent and generated contracts have a machine-checkable agreement boundary.
- Grammatical ownership cannot silently become user-supplied data in the covered ContextDB plan.
- Simple browser-resolved projections compile deterministically into JPL.
- Background discovery can self-correct one contract mismatch without an unbounded retry loop.
- Existing structured-output consumers gain a required `answerPlan` field; background job IDs remain opaque strings.

## Security impact

The change preserves local-first and zero-trust boundaries. Discovery receives the requested binding address but no current ContextDB value or graph snapshot. Compute sees only the ordinary scalar sent during an authorized invocation. The correction response receives bounded requirements, its own prior JSON, and sanitized validation feedback; it receives no new private context.

## Verification

- Reproduce the malformed `user = my` contract and prove semantic reconciliation yields `status ← contextdb(speaker, register_status)`.
- Prove the resulting one-input projection emits JPL that returns the request body's resolved status without another model call.
- Prove explicit person inputs and explicitly named owner-like inputs are not rewritten.
- Prove strict discovery output requires `answerPlan`.
- Prove a background semantic mismatch starts exactly one correction with validation feedback and a second mismatch fails closed.
- Prove server-normalized operations always satisfy the browser's nonempty answer-template requirement.
