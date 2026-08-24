# 0054: Worker-owned ordinary Context publishes exact deltas and hydrates authorized slices

**Status:** Accepted; clean implementation and local acceptance complete, deployment pending

## Context

The clean platform needs a durable input-to-response foundation before Compute, voice, protected assets, and marketplace behavior. Browser-local Essence and entity IDs differ between users, so global continuity cannot depend on copying another user's Path or treating words as identity. Known same-user questions must continue after reload and offline. An assertion that changes a current value must replace that value without deleting historical evidence or leaving multiple values current.

## Decision

Each primary identity has one worker-owned Context runtime persisted in IndexedDB. The state includes a SHA-256-addressed core semantic catalog, caller-local Paths, typed Interaction Evidence and Essence, local entities and relations, immutable current-value observations, hydrated slices, local-to-canonical mappings, and one durable publication receipt. The main browser thread coordinates and renders but does not own a second graph or Path implementation.

The Phase 2 core catalog is intentionally small and vocabulary-neutral. It supports profile names, owned-object declaration and identification, one current condition, self/named current-state questions, and an explicit ordinary audience change. A `single_current_value` relation is rewired with a monotonic relation version while an append-only observation retains previous and next object IDs.

Local mutation and response commit before network publication. Before network I/O, the worker durably separates one exact active snapshot and idempotency key from a coalesced newer pending revision. A timeout, offline transition, reload, or lost response retries the active request exactly instead of skipping to a newer expected revision. Online transient failures use bounded exponential backoff, while a later input or reconnect starts a fresh bounded retry window. Publication authenticates the owner from the host-only session, rejects foreign or hydrated rows, converts local temporary entity/relation IDs to canonical IDs, checks expected revisions and idempotency, and returns the exact mapping. A delayed acknowledgement remaps a newer local graph without overwriting its later mutation or pending request.

Canonical DynamoDB persistence uses compact metadata, entity, relation, observation, mapping, and receipt rows. One publication transaction writes only the changed rows, revision metadata, receipt, and public-name-index change. Phase 2 bounds one delta to the 100-item atomic transaction limit rather than rewriting a growing snapshot. A future bulk-import protocol must use a separate staged commit contract.

Ordinary Context is private by default. The Phase 2 `public` audience is an explicit whole-context read/hydration grant; it grants neither cross-user writes nor Compute, delegation, or protected-data access. A named remote query resolves one authorized exact normalized profile identity, fetches only the matching person/ownership/object/kind/current-condition slice with canonical versions, imports it as hydrated provenance, and executes the caller's own Path locally. Every named current-state query exact-refreshes before answering. Ambiguous profiles or objects, missing/revoked public audience, incomplete slices, stale revisions, duplicate IDs, and non-monotonic graphs fail closed.

The content-addressed catalog travels in the immutable worker bundle served through the private S3/CloudFront origin and cached by the Service Worker; it is persisted with the worker state for offline continuity. User-published Path templates remain future separately loaded compilation evidence and do not enlarge or activate inside every user's startup catalog.

## Consequences

- Local wording remains locally compiled while canonical graph identities connect authorized users.
- Known same-user Paths need no model, API, or startup Path-library download.
- Current facts have one direct current relation plus retained observation history.
- Cross-user answers render proven scalar labels, never opaque IDs.
- Publication cost grows with the changed delta, not the whole accumulated Context.
- Whole-context public read is deliberately coarse in Phase 2; finer participant and action grants require a new versioned contract.
- Compute, `using`, Invocation Frames, JPL, middleware, ArrayLogic, Convert, voice, and protected assets remain Phase 3/4 work.

## Affected repositories

- `onevar-platform`: contracts, pure runtime, worker/IndexedDB adapter, API, compact DynamoDB adapter, web surface, infrastructure, and acceptance.
- `architecture`: roadmap status, capability catalog, and this cross-layer decision.
- `onevar-operations`: existing promotion path only; no contract change.
- Proof-of-concept repositories remain read-only behavioral evidence.

## Security impact

The server derives owner identity from the session, limits publication to that owner's ordinary graph, enforces exact IDs and revisions, and only indexes an explicitly public profile. Hydration requires a valid caller session and returns the smallest public slice. Protected plaintext and arbitrary executable/model content are absent from all Phase 2 contracts, packages, storage, and diagnostics.

## Verification

- Pure runtime tests cover dirty/clean/dirty rewiring, a pet domain, ambiguity, clarification rollback, hydration continuation identity, delayed and lost publication acknowledgement, exact active-request retry, content hash, and local p95.
- API and persistence tests cover strict contracts, foreign graph rejection, idempotency, stale/non-monotonic writes, ambiguous public names, reset, compact delta rows, and snapshot reconstruction.
- Production-bundle Chromium acceptance starts with two fresh browser contexts; deliberately drops one publication request; proves exact retry, local input, online reload, offline query, denial before share, exact refreshed remote dirty/clean/dirty answers, revocation, review, and reset after completion.
- Startup JavaScript measures 107,740 gzip bytes against a 135,000-byte budget. Cached local query p95 is gated at 25 ms and local exact hydration at 3,000 ms.
- The final phase gate is the same clean-reset sequence against the deployed isolated and production environments, followed by another reset.
