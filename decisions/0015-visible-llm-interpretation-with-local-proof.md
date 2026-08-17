# 0015: Show LLM Interpretation Without Granting It Local Authority

- Status: Accepted
- Date: 2026-08-09

## Context

Path repair already asks a language model to adjudicate a failed question, explain the interpretation, and propose reusable corrections. The browser then validates those corrections locally. When every candidate failed, however, the browser retained only status text and candidate failures. The model answer, explanation, sanitized response, and token usage disappeared from Message and from the Path review export. Users could not tell whether the model understood the question, proposed the wrong role, or produced a correction that merely failed local execution.

Displaying the model answer as if it were a successful ContextDB result would weaken the local-first trust boundary. Hiding it entirely makes repair opaque and prevents useful diagnosis.

## Decision

1. Every completed Path-repair response, including a rejected response, carries a versioned `interpretation` envelope derived from the structured adjudication.
2. The envelope contains the model's input kind, answer, explanation, summary, information-sufficiency signal, and correction lifecycle. It distinguishes server rejection, pending browser validation, browser rejection, and applied correction.
3. Transcribe retains a bounded history of sanitized repair responses and interpretations for the request. Raw credentials, headers, hidden reasoning, and protected plaintext remain excluded.
4. Message includes `interpretation` in `msgResult`. When no local answer exists, `msgAnswer` may show `interpretation.answer` only with an explicit LLM/unverified status and explanation. The authoritative `message.answer` field remains empty until local execution returns an answer. Compact interaction history rails do not have room for that provenance label and therefore must not promote `interpretation.answer` into their ordinary Response item.
5. Path Builder stores the latest bounded repair evidence in the review export. Cost correlates the sanitized model-attempt usage with the original voice or typed request.
6. Model-proposed ContextDB or Path corrections retain no direct write authority. A correction is marked applied only after deterministic server admission, browser-local isolated testing, installation, required historical replay, and current-input execution succeed.

## Consequences

- A user can immediately see what the model thought the question meant and why local repair failed.
- Model mistakes and local compiler/runtime defects are distinguishable in one request record.
- An unverified interpretation may be useful but can be wrong; the UI must keep its label and validation status visible.
- Locally verified answers remain deterministic and reusable on the next compatible request.

## Alternatives considered

- **Hide the model response until local proof succeeds.** Rejected because it makes failed repair opaque and discards paid diagnostic work.
- **Copy the model answer into the ordinary answer field.** Rejected because downstream UI and callers would be unable to distinguish inference from locally proven ContextDB execution.
- **Let the model apply its correction directly.** Rejected because it bypasses typed compilation, graph provenance, permissions, and local proof.

## Security impact

The change exposes only the already-sanitized structured model response to the authorized browser session. It does not broaden model context, transmit protected plaintext, or grant remote mutation authority. Bounded evidence retention avoids turning the review export into an unbounded response log.

## Migration

Older responses without `interpretation` are normalized from their latest sanitized `openAiAttempts[].parsedResponse.adjudication` when available. Missing interpretation evidence remains `null` rather than being invented.

## Verification

- Success and rejection responses include the same model interpretation fields.
- Message renders an unverified interpreted answer without populating the local answer field.
- Browser candidate failure preserves response and usage evidence in `msgResult` and the review export.
- A passing correction changes the lifecycle to applied and still replays the current input locally.
- A model answer for a superseded graph role is not used as the local proof target.

## Affected repositories

- `architecture`
- `aws`
