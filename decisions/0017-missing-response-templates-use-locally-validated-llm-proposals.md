# 0017: Missing Response Templates Use Locally Validated LLM Proposals

- Status: Accepted
- Date: 2026-08-09

## Context

A deterministic question Path can prove a canonical answer while lacking a human-readable `responseTemplate`. Returning only the scalar is safe but produces an incomplete conversational experience. Requiring users to edit Path JSON or teach one sentence per noun defeats reusable Path learning. Allowing a model to answer the question again would duplicate interpretation and could contradict the local graph.

The missing capability is presentation structure, not semantic truth. The browser already has the proven answer, query variables, request bindings, and installed Path identity needed to constrain a model proposal.

## Decision

1. Existing catalog or installed response templates always run locally and skip model generation.
2. When a successful ordinary question has no response template, the browser retains the locally proven `answer` and asks the model only for one declarative response-template proposal.
3. The request contains the original question, Path/family identity, canonical answer template, bounded display-safe response values, allowed variable names, and the proven result-variable names. It does not grant graph-query or mutation authority.
4. Response-template generation uses a resumable background Responses job. Token usage is returned to Cost under the original request identity.
5. A proposal may use only the bounded formatter vocabulary and supplied variables. Request-specific values cannot be copied as template literals, the template must reference a proven result variable, and rendering must reproduce the canonical answer.
6. The server performs deterministic admission. The browser repeats validation, and Path Builder repeats it again at the persistence boundary.
7. Only after those checks does Path Builder save the template on the existing Path, publish the updated Path library to Transcribe, and make it reusable for later compatible questions. A catalog template has precedence; a locally validated learned template may fill a catalog operation whose presentation is otherwise empty.
8. The held current response is rendered from its original local proof after installation. The model's example or explanation is never used as the answer.
9. Offline, failed, rejected, timed-out, protected, and interpretation-only requests retain the canonical answer and do not install a template. Protected values never enter the server-backed learning or text-to-speech boundary.

## Consequences

- “How many cats do I have?” can teach the generic possession Path `You have {{ask}} {{item|plural:ask}}.` once, then reuse it for cats, boats, or another compatible item.
- The first missing-template response may wait for a resumable model proposal and local installation; later responses remain local.
- Presentation learning cannot repair a wrong or absent answer. Semantic Path repair remains a separate lifecycle.
- The literal grammar allowlist is intentionally conservative and can be versioned as broader response forms are proven safe.

## Alternatives considered

- **Ask the model for final prose on every answer.** Rejected because it adds repeated cost and gives remote prose unproved factual authority.
- **Let the model write a response template directly into Path storage.** Rejected because it bypasses bounded variables, deterministic rendering, local validation, and Path persistence controls.
- **Require manual Path Builder editing.** Rejected because ordinary missing presentation coverage should follow the same learn-once/reuse-locally principle as language Paths.
- **Return the raw answer immediately and learn only in the background.** Not selected for the requested conversational lifecycle because the current response should use the newly installed template. Failure and offline paths still return the raw answer.

## Security impact

Only bounded ordinary display values already available to the authorized browser session are sent. Protected or zero-trust results are rejected before transport and again at the endpoint. The model receives no write capability, executable rows, hidden graph, credentials, or protected plaintext. Generated literal content is constrained and request-specific values must remain placeholders.

## Migration

Existing Paths with response templates are unchanged. Bundled direct question Paths and Paths carrying a versioned semantic-operation identity receive any now-declared catalog template during hydration; a nonblank learned template is not overwritten by the backfill. Paths without either source remain executable and fall back to their canonical answer when offline or generation fails. Once a learned template is locally persisted, hydration recompilation preserves it only when the current catalog operation still has no authoritative template.

## Verification

- Exact possession statement/question starter Paths still prove `3` locally.
- A missing template starts one resumable response-template job and reports usage.
- Memorized answers/items, unknown variables, malformed formatters, and templates without a result variable are rejected.
- Browser and Path Builder independently validate the accepted template.
- The installed template renders the held current answer and is republished for later local execution.
- Typed/voice rendering and Automation speech consume the rendered local result, not model-authored answer prose.

## Affected repositories

- `architecture`
- `aws`
