# 0120: Sunburst attention is event-derived, not navigation-derived

**Status:** Superseded by [0131](0131-explicit-app-opens-add-daily-sunburst-presence.md)

## Decision

Sunburst dots summarize meaningful activity requiring or deserving a person's attention; they do not count views. Opening, focusing, rendering, or downloading an entity is navigation and never creates an attention signal.

An admitted signal is a strict, content-free envelope addressing one exact user and one exact entity/version. It contains only a bounded event kind, severity, unresolved/resolved state, timestamps, protected-metadata marker, and deduplication hash. Source systems retain the authoritative message, schedule, request, alert, provider effect, billing record, or mutation. Protected values and arbitrary payloads never enter attention records.

Ingestion idempotently updates one compact aggregate and at most five local-calendar-day buckets per exact subject. A successful app execution produces one resolved attention event keyed by its exact invocation ID even when its declared effect is already satisfied; retrying that invocation cannot produce another event. Each ray merges at most five widget bucket sets and renders today through four days ago in that order. Empty days render no circle, and old days fall out at read/projection time rather than through scheduled rewrites. Event-count floors render 1–3 events small, 4–19 medium, and 20+ large. High-severity unresolved work may promote presentation sooner. The five daily circle positions are not the ray's five widget positions.

Durable sources should publish safe envelopes through their existing transactional outbox or stream boundary. The projector must update aggregates without duplicating complete source events or scanning users, entities, or ContextDB. Acknowledgement and resolution remain exact lifecycle operations against the source and aggregate, not inferred from opening the entity.

## Consequences

- Navigation cannot manufacture importance.
- Retry deduplication prevents inflated dots.
- No LLM, RAG query, history scan, or per-minute decay job is needed.
- Recent category input/response cards remain a bounded browser-local working-memory projection, not attention source authority, canonical Context, or a lifetime audit log.
- Local app creation/update/effect projection can ship before the durable cross-device projector.
- Durable communication, schedule, automation, security, billing, and provider adapters remain explicit implementation gates.
