# 0135: Inspector V2 compiles bounded semantic scenes

## Status

Accepted

## Context

Inspector V1 proved the spatial interaction model, but its projection admitted a storage-ordered slice, used label length to choose discovery anchors, and could visually connect a relevant installed app to an owned point without an exact relationship contract. That becomes misleading and cannot scale to people with thousands of entities or organizations with millions.

The product must preserve V1 for comparison and rollback while allowing a cleaner scene model to evolve without migrating canonical ContextDB, marketplace, protected-asset, or installation data.

## Decision

Inspector V2 is a separate browser scene compiler and renderer selected independently from V1. A strict shared `inspector_scene` contract identifies one optional exact focus, bounded nodes, relevance roles and reasons, exact relationship semantics, and collapsed counts.

V2 compiles owner-local entities by bounded graph distance from the exact focus. Authorized public candidates and marketplace candidates append progressively and independently. Semantic similarity, shared facets, category membership, and marketplace usefulness influence admission, rank, placement, or reveal only. They never create a relation line.

Every V2 line must cite either an exact active owner-local Context relation or an exact authorized public Context relation returned after current-record revalidation. Marketplace and collapsed points cannot be endpoints. Each edge is clipped with its own blocker mask so it terminates at its exact endpoint borders and leaves a black gap at unrelated points it crosses.

The initial scene admits at most 96 nodes and 160 edges, with explicit sub-budgets for local, peer, and marketplace material. Overflow is represented as a disconnected collapsed point and can be recompiled when focus changes. Coordinates, reveal, drag, pan, collision, and version preference remain browser presentation state.

## Consequences

- V1 remains available and unchanged as a rollback/comparison surface.
- V2 can change scene heuristics by version without canonical-data migration.
- Local state renders before remote discovery completes.
- A nearby or useful point can appear without implying a relationship.
- Exact line evidence is visually distinguishable even when lines cross unrelated points.
- The scene remains bounded regardless of total account or marketplace size.
