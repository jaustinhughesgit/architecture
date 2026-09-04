# 0130 — Inspector renders local state before progressive authorized discovery

## Status

Accepted

## Decision

The Inspector is a local-first presentation module over existing exact entities. Owned Context and installed app points render synchronously from browser state. Authorized public-context candidates and marketplace extensions load through separate bounded background requests and append when available.

Public-neighbor discovery uses compact derived facet postings in the shared canonical table. Every candidate is reloaded from its current Context publication and must still be public, current, and matched by current facets before it is returned. Profile labels and protected material are excluded from facets. A shared place, time, organization, or activity may establish relevance without establishing a connection or any new authority.

Inspector coordinates, color, point size, focus, and remote ranking are presentation evidence only. A person may drag a point temporarily while its exact visible edges follow. The browser does not persist coordinates. An event-driven spatial hash settles only nearby overlaps after drag, pan, reveal, or progressive append, then stops. Viewport-center distance scales visible points from 100% to a 60% floor. Only a bounded local node window and nearby unobstructed exact edges are materialized. These behaviors do not replace exact IDs, Paths, installation authority, protected grants, or action-specific authorization.

## Consequences

- Local data appears without waiting for network discovery.
- Remote failure cannot erase or block the owned graph.
- Stale derived postings cannot disclose retired or private Context.
- Millions of users do not require a physical table per topic.
- Marketplace and public-user discovery may evolve independently behind strict contracts.
- Browser work is bounded by the visible local neighborhood rather than total graph size, and stationary scenes consume no physics loop.
- The Inspector can be removed or replaced without changing platform behavior.
