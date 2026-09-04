# 0133 — Selected-ray Context mutations add daily presence

## Status

Accepted

## Decision

When an accepted ordinary Essence interaction commits an exact ContextDB mutation, the browser records one content-free attention event for the exact Sunburst category selected on that interaction. The ray-level record is independent of app-widget attention because a Context fact may not belong to an app. It retains category identity, event classification, five local-day buckets, and an interaction-derived deduplication hash. It contains no input text, response text, Context value, protected material, or fabricated app/widget identity.

Reads, rejected inputs, clarification prompts, passive rendering, category selection, and restoration add no presence. The same exact interaction cannot increment the ray twice. Existing five-day aging and the 1–3, 4–19, and 20+ count tiers continue to apply.

The browser shell owns the current ray-activity projection as live UI state. A successful mutation updates that state from the same persisted, deduplicated aggregate returned by the recorder; the compact Sunburst also reloads it from device storage after mount or reload. A same-window event remains a compatibility refresh hint, not the only render trigger.

## Consequences

- A successful fact entered while People is selected immediately creates or grows today's People activity circle.
- Long-lived Inspector tabs cannot persist a ray event without repainting the compact Sunburst.
- Facts can register daily work without inventing an app widget.
- Content and protected values remain outside the attention record.
- App creation, explicit opens, and successful app execution retain their existing app-widget attention lifecycle.
