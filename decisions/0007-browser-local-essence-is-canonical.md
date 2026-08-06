# 0007: Browser-Local Essence Is Canonical

- Status: Accepted
- Date: 2026-08-06

## Context

If a browser can silently replace a local Path miss with a model-generated Essence, identical users and Path versions can produce different semantic operations. That breaks repeatability, makes zero-trust behavior depend on a server, and lets a transient interpretation mutate ContextDB without first becoming a validated reusable Path.

## Decision

The browser generates the canonical Essence for every interactive request by materializing an installed local Path. A local classifier or processing-Path miss does not call a remote classifier or Essence interpreter.

The **Auto-build Path signatures with OpenAI** setting authorizes model-assisted Path discovery only. OpenAI may propose additional signatures or Path candidates intended to cover wording found in other browsers. The browser must compile, validate, test, and install a candidate before locally materializing its Essence. Model output never directly becomes the current request's canonical Essence and never directly mutates ContextDB.

## Alternatives

- Continue using a remote Essence fallback on every local miss. Rejected because it changes semantics and cost across sessions and cannot satisfy local zero-trust execution.
- Allow model-generated Essence only when Auto-build is checked. Rejected because checking a learning control must not create a second semantic authority.
- Disable model-assisted learning entirely. Rejected because optional proposals can improve reusable wording coverage when locally validated.

## Consequences

Known Paths are deterministic, local, repeatable, and cost-free at execution. Uncovered wording cannot be silently interpreted: with Auto-build off it fails locally or asks for clarification; with Auto-build on it enters candidate Path learning and executes only after local validation. This makes Path coverage more visible and places more importance on robust local classifiers, reusable structural Paths, and actionable miss diagnostics.

## Security and trust

Unchecked requests and their ContextDB data do not cross a model boundary for classification or Essence generation. Enabling Auto-build explicitly permits the sanitized learning package to cross that boundary, subject to existing protected-data restrictions. ContextDB mutation remains browser-local in both modes.

## Migration and compatibility

The server `/essence` endpoint may remain for non-browser compatibility and bounded contract testing, but the browser interaction runtime no longer calls it as fallback. Existing installed Paths continue to materialize Essence locally. Invalid stored Paths are rejected and become repair evidence rather than triggering remote interpretation.

## Verification

- A local Path hit materializes Essence and makes no classification or Essence request.
- A local miss with Auto-build disabled returns a local miss code and makes no model request.
- A local miss with Auto-build enabled may request Path proposals, but does not mutate ContextDB until a candidate passes browser-local compilation, validation, installation, and replay.
- Diagnostics identify `browser-local` as the canonical Essence source.

## Affected repositories

- `architecture`
- `aws`
