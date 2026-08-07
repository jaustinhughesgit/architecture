# 0007: Browser-Local Essence Is Canonical

- Status: Accepted
- Date: 2026-08-06

## Context

If a browser can silently replace a local Path miss with a model-generated Essence, identical users and Path versions can produce different semantic operations. That breaks repeatability, makes zero-trust behavior depend on a server, and lets a transient interpretation mutate ContextDB without first becoming a validated reusable Path.

## Decision

The browser is the only runtime that materializes the canonical Essence for an interactive request. An installed local Path supplies the validated transform. On a cold signature miss there is no executable Essence yet: the model may propose a Path, but the browser must compile, test, install, and replay that Path locally before its transform may read or mutate ContextDB.

After a cold miss, the system asks the model to bind the actual wording to the smallest compatible installed semantic operation or to propose a new declarative Path contract. The proposal is untrusted data, not an Essence. This required-Path lifecycle is not controlled by a checkbox.

The **Auto-build Path signatures with OpenAI** setting controls only expansion. When enabled, OpenAI may additionally propose other explicit phrasings of the same canonical interaction, together with equivalent Essence transforms and signatures. Model output never directly becomes the current request's canonical Essence and never directly mutates ContextDB.

## Alternatives

- Continue using a remote Essence fallback on every local miss. Rejected because it changes semantics and cost across sessions and cannot satisfy local zero-trust execution.
- Make required cold-miss Path construction depend on Auto-build. Rejected because the actual user input must work and become reusable independently of optional coverage expansion.
- Disable model-assisted learning entirely. Rejected because optional proposals can improve reusable wording coverage when locally validated.

## Consequences

Known Paths are deterministic, local, repeatable, and cost-free at execution. Uncovered wording incurs Path-construction latency before its first execution. Auto-build increases the number of locally validated paraphrase Paths but does not change the semantic authority. Inputs whose candidate Path cannot be validated fail or ask for clarification rather than receiving a model-generated Essence.

## Security and trust

No model response is accepted as canonical Essence. A sanitized Path-learning package may cross the model boundary to construct a missing Path; Auto-build permits additional paraphrase proposals. Protected plaintext remains excluded, and only a browser-local replay of an installed Path may read or mutate protected ContextDB data.

## Migration and compatibility

The server `/essence` endpoint may remain for non-browser compatibility and bounded contract testing, but the browser interaction runtime no longer calls it as fallback. Existing installed Paths continue to materialize Essence locally. Invalid stored Paths are rejected and become repair evidence rather than triggering remote interpretation.

## Verification

- A local Path hit materializes Essence and makes no classification or Essence request.
- A cold miss performs no ContextDB mutation until one required current Path is compiled, validated, installed, and replayed with Auto-build disabled.
- The same miss with Auto-build enabled may save additional locally validated paraphrase Paths without changing the required Path's transform.
- Diagnostics identify `browser-local` as the canonical Essence source.

## Affected repositories

- `architecture`
- `aws`
