# 0137: Inspector compacts exact connected components

## Status

Accepted

## Context

Inspector V2 initially placed points by relevance rings and then separated overlaps. Exact connected points could remain far apart, producing long lines across otherwise unrelated parts of the scene even though the renderer correctly masked incidental crossings.

## Decision

Every event-driven V2 layout settlement begins with three bounded connection-compaction passes over only the exact edges already admitted by the scene contract. Each pass accumulates every connected neighbor's pull and applies the average simultaneously, making the result deterministic and independent of edge iteration order. Higher-ranked exact edges exert more pull. The currently dragged or focused fixed point does not move; its connected neighbors may move toward it.

The spatially hashed collision pass runs after compaction. Both stages share a maximum-displacement bound and execute only after scene creation, progressive append, reveal, pan completion, or point drag completion. The browser runs no continuous physics loop, persists no coordinates, adds no similarity edges, and requests no model or server layout.

## Consequences

- Connected components normally require shorter lines and occupy less visual space.
- Disconnected points receive no attraction merely for semantic or ray similarity.
- Collision padding remains authoritative after attraction.
- Work remains bounded to three linear edge passes plus local-density collision separation.
- Arbitrary graphs may still contain crossings; the edge-specific moat masks continue to distinguish them.
