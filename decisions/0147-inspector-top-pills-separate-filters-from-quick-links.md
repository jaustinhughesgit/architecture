# 0147: Inspector top pills separate filters from Quick Links

## Status

Accepted

## Decision

Inspector V2 has one monochrome, border-only top-left purpose control that switches one pill row between independently retained Filter and Quick Link collections. Pills are bounded device-local presentation references to exact owned entity or app IDs; labels are not identity.

An active Filter collection compiles a strict exact-relationship subgraph containing the primary person, every direct neighbor of that person, exact shortest connector paths from the person to each filter and between filters, and outward descendants rooted at each filter. Material outside that subgraph is neither rendered nor selectable by the Inspector workbench. Filtering changes neither canonical Context nor authorization, and empty Filter mode restores the normal bounded scene.

Quick Links do not change scene membership. Selecting one makes its exact entity or app the focus dot. Add and remove are explicit, the two collections remain independent, and each is limited to sixteen references. Inspector version selection moves to the bottom-left while credits stay top-right.

## Consequences

- Filters express exact structural scope rather than a label, embedding, color, coordinate, or permission rule.
- Quick Links recover the useful outcome of the legacy entity menu without importing its mutable menu/call runtime.
- Public proximity, marketplace relevance, protected summaries and unconnected apps cannot leak into a filtered scene.
- This is browser-local presentation state and requires no canonical migration or cross-device claim.

Product ownership and tests are recorded in `onevar-platform` decision 0089 and the Inspector layer guide.
