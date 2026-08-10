# 0021: Publish ordinary Context through participant-scoped audiences

**Status:** Accepted

## Context

ContextDB has always created useful entities immediately in the browser, while older server synchronizers were no longer connected to the active transcription runtime. That made voice-created facts device-local: another named user could not hydrate a fact about themselves, and server-assigned identity could not replace temporary local identity. The repair crosses local persistence, API transport, Compute authorization, durable storage, identity resolution, and response-time behavior.

## Decision

- A committed ordinary ContextDB graph delta enters an encrypted browser-worker outbox. Local execution never waits for network publication.
- Publication, acknowledgement, and hydration use the versioned `context-graph-sync` v1 contract and preserve an idempotency key across retries.
- Compute authenticates the principal and verifies ownership of the workspace in the request path. Clients cannot choose an audience by supplying principal IDs.
- The current speaker resolves to a stable principal entity. The browser marks another user candidate only when a voice token is classified as a proper person and is also present in the executed Path's semantic bindings. Compute then resolves that candidate only through an exact, unique public handle; ambiguous names remain publisher-owned contextual entities and produce a warning.
- Every connected relation component is stored for the publisher and the uniquely resolved user participants in that component. Hydration reads only the authenticated principal's audience partition.
- Compute returns authoritative node and relation IDs. The browser durably records the mapping and replaces entity IDs throughout the graph, mentions, ContextDB state, message history, checkpoints, and Path translation state.
- Relations retain publisher and source provenance. Deletion or audience removal uses versioned tombstones.
- Protected input and protected graph markers remain local and never use this ordinary publication channel.

## Alternatives considered

- Creator-only export would not let participants retrieve facts about themselves without exposing a publisher's full graph.
- Merging by label would conflate unrelated people and ordinary nouns.
- Synchronous publication before local commit would violate the local-first interaction contract.
- Client-supplied recipient lists would turn an untrusted request field into authorization.

## Consequences

Ordinary voice statements can become shared hard data without converting them into compute capabilities. A participant can hydrate the server graph and use the same local Path/Essence machinery, including first-person queries. Exact-name ambiguity fails closed. Explicit grants, incoming-fact trust UX, and multi-device conflict arbitration remain separate capability work.

## Affected repositories

- `aws`: encrypted outbox, ID replacement, hydration, status UI, and browser contract tests.
- `aws-api`: transparent authenticated transport of versioned actions.
- `compute`: authorization, identity resolution, retained graph storage, versions, tombstones, and hydration.
- `architecture`: canonical contract, security boundary, flow, and capability status.

## Security impact

Compute derives participant visibility from authenticated and server-resolved identity. Hydration is identity-partitioned. The channel excludes protected material and does not weaken zero-trust asset handling. Publisher/source provenance is retained for future trust decisions.

## Migration

Existing local facts remain local until a new committed mutation republishes their relation component. Existing public account labels can be exact-resolved through the legacy word/subdomain indexes and are registered into the new profile index when that user next publishes or hydrates. The old browser synchronizers are not used by this contract.

## Verification

- Compute contract tests cover identity resolution, cross-user audience hydration, idempotent retry, ambiguity, and workspace authorization.
- Browser tests cover encrypted-state-compatible retry behavior, stable ID replacement, participant hydration, and protected-data exclusion.
- Cross-layer deployment verifies the retained Context graph table and Lambda environment before production browser testing.
