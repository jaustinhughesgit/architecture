# 0136: Inspector colors follow entity ray placement

## Status

Accepted

## Context

Inspector V2 initially painted every point with the ray currently selected at the top of the Sunburst. Spinning the wheel therefore changed the apparent meaning of the entire graph. The product model instead requires every entity to have a stable best-fit ray while allowing the person to deliberately correct one owned entity.

## Decision

Inspector V2 resolves a category independently for every visible point. An exact active person-owned `SunburstCategoryPlacement` for one owned Context entity or app in the active installation outranks automatic classification. Without that override, a bounded model-free browser-local Position pass scores safe labels, entity types, exact relation terms, and neighbor labels against the active ray definitions. Unresolved items fall into `new.unsorted`.

The active ray's fixed slot supplies the point color. Selecting or spinning to a ray filters and prioritizes context only; it cannot recolor the entire scene or mutate an entity placement. A person can place one owned point into the selected ray and revoke that placement to return it to automatic Position. Peer and marketplace points remain inferred presentation until separately owned or installed.

Category placement affects presentation and retrieval relevance only. It grants no permission, creates no relation, and changes no entity identity.

## Consequences

- A Toyota Camry remains Transport-colored while the person inspects Shopping.
- User corrections are exact, template-scoped, durable on the device, and reversible.
- Automatic categories may change only when the safe source facts or active template changes.
- Classification requires no model call, server request, protected plaintext, or continuously running process.
