# 0007: Browser-Local Essence Is Canonical

- Status: Accepted
- Date: 2026-08-06

## Context

If a browser can silently replace a local Path miss with a model-generated Essence, identical users and Path versions can produce different semantic operations. That breaks repeatability, makes zero-trust behavior depend on a server, and lets a transient interpretation mutate ContextDB without first becoming a validated reusable Path.

## Decision

The browser generates the canonical Essence for every interactive request. An installed local Path materializes its validated transform. On a safe cold signature miss, a structural local compiler creates and executes the current Essence without a remote Essence interpreter.

After a cold miss, the system always asks the model to build the required Path for the actual current wording from the canonical local Essence, then compiles, validates, saves, and installs it. This required-Path lifecycle is not controlled by a checkbox.

The **Auto-build Path signatures with OpenAI** setting controls only expansion. When enabled, OpenAI may additionally propose other explicit phrasings of the same canonical interaction, together with equivalent Essence transforms and signatures. Model output never directly becomes the current request's canonical Essence and never directly mutates ContextDB.

## Alternatives

- Continue using a remote Essence fallback on every local miss. Rejected because it changes semantics and cost across sessions and cannot satisfy local zero-trust execution.
- Make required cold-miss Path construction depend on Auto-build. Rejected because the actual user input must work and become reusable independently of optional coverage expansion.
- Disable model-assisted learning entirely. Rejected because optional proposals can improve reusable wording coverage when locally validated.

## Consequences

Known Paths are deterministic, local, repeatable, and cost-free at execution. Safe uncovered wording is compiled locally, used immediately, and then gains a required saved Path. Auto-build increases the number of locally validated paraphrase Paths but does not change current-input correctness. Inputs outside safe local compiler coverage fail or ask for clarification rather than receiving a model-generated Essence.

## Security and trust

Requests do not cross a model boundary for canonical classification or Essence generation. A sanitized local-Essence learning package may cross the boundary to construct the required Path; Auto-build permits additional paraphrase proposals. Protected plaintext remains excluded, and ContextDB mutation remains browser-local in both modes.

## Migration and compatibility

The server `/essence` endpoint may remain for non-browser compatibility and bounded contract testing, but the browser interaction runtime no longer calls it as fallback. Existing installed Paths continue to materialize Essence locally. Invalid stored Paths are rejected and become repair evidence rather than triggering remote interpretation.

## Verification

- A local Path hit materializes Essence and makes no classification or Essence request.
- A safe local miss executes its local Essence and saves one required current Path with Auto-build disabled.
- The same miss with Auto-build enabled may save additional locally validated paraphrase Paths without changing the current Essence.
- Diagnostics identify `browser-local` as the canonical Essence source.

## Affected repositories

- `architecture`
- `aws`
