# LLM Request Templates

## Status

**Implemented foundation.** Message requests can select one of two trusted, versioned model-routing templates. The browser preserves the selection through required cold-miss Path construction, optional Auto-build paraphrase expansion, compute discovery/build, ordinary-input interpretation inside sanctioned server capabilities, failure diagnosis, answer verification, and background polling. Browser-local canonical Essence generation does not use either template. The Cost module labels the request with the selected template and shows the actual returned models and token costs.

This capability is an experiment and rollback control. It does not make a model name or prompt supplied by the browser authoritative.

## Template contract

The cross-layer field is `llmTemplateId`, validated by [`llm-template-selection.v1.schema.json`](../../contracts/llm-template-selection.v1.schema.json).

- `original-v1` is the default for omitted, invalid, or unknown values. It preserves the pre-template routing and effective reasoning behavior.
- `new-v1` is an explicit opt-in to the GPT-5.6 evaluation routing.

Every server owns a trusted registry that converts the ID into model and reasoning settings. Clients never send raw model names or prompts. A request keeps one template ID through retries, correction passes, replays, and durable background polling so one measured request does not mix treatments.

## Current mapping

| Model-backed step | Original v1 | New v1 |
| --- | --- | --- |
| Input classification | Existing `gpt-5-mini` route, `minimal` | `gpt-5.6-luna`, `none` |
| Essence interpretation | `gpt-5-mini`, `minimal` | `gpt-5.6-luna`, `none` |
| Grounded Essence repair | `gpt-5-mini`, `low` | `gpt-5.6-luna`, `low` |
| Path repair | Existing `gpt-5-mini` route, `minimal` | `gpt-5.6-terra`, `low` |
| Compute input interpretation | Existing `gpt-4o-mini` route, omitted reasoning | `gpt-5.6-luna`, `none` |
| Compute discovery | Existing `gpt-4o-mini` route, omitted reasoning | `gpt-5.6-terra`, `low` |
| Compute entity generation | Existing `gpt-5.6-terra` route, omitted reasoning | `gpt-5.6-terra`, `low` |
| Failure diagnosis and answer verification | Existing `gpt-4o-mini` routes, omitted reasoning | `gpt-5.6-terra`, `low` |

Deployment operators may pin the server-owned route through the documented environment configuration, but that does not change which client values are accepted.

## Evaluation

Compare representative requests using the same input and product toggles. Measure completion correctness, structured-output validity, retries and correction rounds, latency, token usage, estimated cost, and cost per successful request. A cheaper failed attempt is not a win, and a more expensive treatment should remain only when it materially reduces failures or repeated work.

The browser persists only the current selector preference. Request labels and the Cost ledger remain session-local, and no prompt, output, hidden reasoning, credential, or protected value is added to model-cost traces.
