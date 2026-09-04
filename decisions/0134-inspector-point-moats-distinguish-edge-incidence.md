# 0134 — Inspector point moats distinguish edge incidence

## Status

Accepted

## Decision

The Inspector paints each bounded visible edge as a base relation beneath every point. It then paints an opaque black moat slightly larger than each point and restores only the short endpoint portions of edges genuinely incident to that point. The point surface is painted last.

The moat follows the current viewport-scaled point radius. An unrelated line passing behind a point receives a visible black interruption; a genuine relation crosses that point's moat and meets its edge. This is presentation evidence only. It cannot infer, add, delete, or authorize a canonical relationship.

## Consequences

- Accidental spatial crossings do not look like relationships.
- Genuine edges remain continuous at their own endpoints.
- Dragging, panning, perspective scaling, and finite collision settling recompute the three layers locally without persistence or network activity.
- Existing bounded distance and degree rules still limit rendered edges.
