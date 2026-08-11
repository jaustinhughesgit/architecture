# 0002: Entities Are Distributed Assets

- Status: Accepted
- Date: 2026-07-31

## Context

Browser ContextDB creates entities for ordinary facts, while compute persists server entities and also builds executable compute-capability entities. Treating the latter as the whole entity model disconnects local facts from sharing and incorrectly classifies stored data and interaction primitives as secondary or legacy.

## Decision

An entity is the common addressable unit for hard data, structure, execution, interaction, presentation, and compute. Compute is an optional behavior of an entity.

Local-first ContextDB remains the immediate execution layer. When the owner permits publication, local graph deltas publish asynchronously to server entities and relations. The server returns authoritative IDs and versions; the browser persists local/server mappings. Other users and devices retrieve only public or explicitly delegated graph data and hydrate it into their own authorized local context.

Mindsets, thoughts, and moods remain first-class entity authoring and interaction primitives regardless of the age of their current UI implementation.

## Alternatives

- Keep local ContextDB entities permanently separate from server entities. Rejected because facts cannot become reusable governed assets.
- Publish only compute entities. Rejected because ordinary stored knowledge would require unnecessary functions or model calls.
- Block local mutation until server creation completes. Rejected because it breaks offline/local-first behavior.

## Consequences

- The platform needs a durable local sync outbox, idempotent server publication, acknowledgements, persisted ID mappings, versions, tombstones, conflicts, and hydration.
- Names cannot be treated as global identity.
- Stored facts and executable entities share governance while retaining typed representations.
- Words remain shared lexical addresses rather than entity identity; published entities retain independent lifecycle and authorization. See [decision 0023](0023-words-are-lexical-addresses.md).
- The active Context graph sidecar and older entity/link synchronizers must converge behind the shared contract while preserving proven outbox, mapping, audience, tombstone, and hydration behavior.

## Security and trust

Publication is opt-in/policy-bound. Local-only and zero-trust plaintext never enter the ordinary outbox. Public/private and action-level authorization are checked for every server read and traversal; a creator ID is not an authorization token.

## Migration and compatibility

Existing local `ent_<n>` identifiers remain local. Existing server entity/subdomain identifiers remain server IDs. A mapping layer connects them without rewriting either namespace. Legacy links can be imported with provenance and version state before enabling general cross-user queries.

## Verification

Test local immediate execution, offline publication retry, duplicate submission, refresh-safe mappings, typed literal preservation, update/delete conflicts, multi-device hydration, public/delegated reads, denied reads, and cross-user questions over hard stored facts.
