# 0131: Explicit app opens add daily Sunburst presence

**Status:** Accepted

## Context

The first Sunburst attention contract excluded all opens to ensure that navigation could not fabricate importance. The product now uses each ray's five circles as a recent daily-work signal as well as an unresolved-attention signal. A person who creates or deliberately opens an app has done work in that ray even when no mutation or notification follows.

## Decision

Admit an explicit person-initiated app open as a low-weight, content-free event for the exact user, app/version, and interaction. Creation and successful use remain stronger event kinds. Passive rendering, startup restoration, focus hydration, background synchronization, viewport movement, and downloads remain presentation operations and emit nothing.

The existing exact deduplication and five-local-calendar-day projection apply. Today occupies the first ray position, yesterday the second, and the prior three days follow; a zero bucket renders no circle. Event-count floors remain 1–3 small, 4–19 medium, and 20+ large. No event may carry input text, response text, protected values, filenames, or arbitrary payload.

## Alternatives

- Exclude all opens: rejected because a ray could appear empty after deliberate work.
- Count every focus or render: rejected because reloads and component behavior would manufacture importance.
- Store a transcript: rejected because Sunburst presence is bounded presentation evidence, not canonical history.

## Consequences

- Explicit create/open activity is visible in today's ray and ages by read-time projection.
- Retried interaction IDs cannot inflate a circle.
- Passive UI behavior remains free of semantic side effects.
- A later cross-device projector can consume the same constant-size source event.

## Affected repositories

- `onevar-platform`
- `architecture`

## Security impact

None. Events contain exact identity and classification only and grant no authority. Protected values remain structurally excluded.

## Migration

No historical opens are synthesized. New explicit opens begin contributing after the supporting browser release.

## Verification

Contract, runtime, and browser-store tests prove the new event kind, low weight, exact deduplication, local-day placement, aging, and count tiers.
