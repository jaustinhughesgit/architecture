# 0120: Sunburst attention is event-derived, not navigation-derived

**Status:** Accepted

## Decision

Sunburst dots summarize meaningful activity requiring or deserving a person's attention; they do not count views. Opening, focusing, rendering, or downloading an entity is navigation and never creates an attention signal.

An admitted signal is a strict, content-free envelope addressing one exact user and one exact entity/version. It contains only a bounded event kind, severity, unresolved/resolved state, timestamps, protected-metadata marker, and deduplication hash. Source systems retain the authoritative message, schedule, request, alert, provider effect, billing record, or mutation. Protected values and arbitrary payloads never enter attention records.

Ingestion idempotently updates one compact aggregate per exact subject. Freshness decays at read/projection time rather than through scheduled rewrites. Each ray derives its presentation from no more than its five widget aggregates, so rendering is bounded independently of account history. High-severity unresolved work retains a visibility floor.

Durable sources should publish safe envelopes through their existing transactional outbox or stream boundary. The projector must update aggregates without duplicating complete source events or scanning users, entities, or ContextDB. Acknowledgement and resolution remain exact lifecycle operations against the source and aggregate, not inferred from opening the entity.

## Consequences

- Navigation cannot manufacture importance.
- Retry deduplication prevents inflated dots.
- No LLM, RAG query, history scan, or per-minute decay job is needed.
- Local app creation/update/effect projection can ship before the durable cross-device projector.
- Durable communication, schedule, automation, security, billing, and provider adapters remain explicit implementation gates.
