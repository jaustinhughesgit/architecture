# 0045 — Convert discovery receives bounded ordinary authoring context

Status: accepted

## Context

Button 3 is an explicit request to author a reusable capability, but Convert v1 forced `relevantItems: []` and Compute discarded all semantic evidence whenever `requirementSegments` existed. In a three-input sequence—an ordinary name assertion, an ordinary property assertion, then Convert authoring for that property—the browser held both recent inputs and the proven direct ContextDB row, while discovery saw only the last requirement. A semantic-plan mismatch correctly failed closed, but its correction had no evidence from which to recover. A later model response then chose `not_compute` because the value appeared inaccessible.

The broad Essence fallback context is not appropriate for Convert, and a full graph snapshot would be unnecessarily large and violate least disclosure. Protected entries must remain outside remote discovery. Completely hiding ordinary, user-intended working context, however, prevents the LLM from performing the generalization Convert exists to provide.

## Decision

The browser constructs `convertAuthoringContext` v1 at Button 3 submission time. It contains:

- up to the latest 20 non-protected ordinary input summaries;
- each input's bounded text, input kind, and selected semantic entity/operation when available; and
- up to 120 four-cell Essence rows already proven by the browser for those inputs.

The browser excludes zero-trust, sensitive, protected-containing, protected-answer, protected-reference, and authoring-only entries. It sends no graph snapshot. Convert's broad `relevantItems` remains empty so existing Essence fallback evidence cannot silently cross into authoring.

Compute independently bounds and sanitizes the new field, converts it to discovery-only semantic evidence, and persists it with background polling and correction. The model may use a current ordinary value to understand that an address is available and to infer the reusable subject/property contract. It must not place that value in a default, constant, utterance annotation, capability identity, or implementation literal.

Semantic reconciliation may discard a copied non-deictic example value when the frozen answer plan selects `contextdb`, the requirements themselves identify the same current-speaker property, and no explicit input declaration conflicts. Without that proof it continues to reject source changes. Convert authoring may return reuse, extend, build, or clarify, but not `not_compute` merely because the eventual input resolves from browser-local data.

## Consequences

- Discovery can reason across the user's immediate ordinary working context instead of treating every Convert request as isolated.
- The reusable entity still receives only a binding address; the browser resolves the current scalar at invocation.
- Model copies of current context are removed rather than published or treated as speech inputs.
- Background corrections receive the same evidence as the first attempt.
- Direct Convert textarea submissions without browser interaction history continue to work with an absent context field.

## Security impact

This deliberately expands remote model context for Button 3, but only to bounded ordinary data the browser has already classified as non-protected. Protected and zero-trust inputs remain excluded, no full graph is sent, and authoring evidence grants no execution, persistence, or decryption authority. Users who place sensitive material in an ordinary lane have not invoked the protected-data boundary; UI guidance and protected-lane policy remain important.

## Verification

- Prove the exact three-input sequence sends both prior ordinary texts and the direct speaker/property/value Essence row to discovery.
- Prove protected, sensitive, zero-trust, protected-answer, and authoring-only entries are absent.
- Prove server normalization enforces 20-input and 120-row bounds.
- Prove a copied current value is removed from an otherwise correct deictic ContextDB plan and the resulting JPL reads the invocation body.
- Prove an explicitly declared ordinary input or non-deictic example is not rewritten.
- Prove `not_compute` from a Convert authoring response receives correction instead of terminating creation.
