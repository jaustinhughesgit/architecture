# Addressable facets and atomic graph composition

Accepted 2026-09-11.

The clean-room ordinary graph introduces optional `ContextRelation.facetEntityId` and `ContextEntity.graphRole` (`facet` or `collection`). These are exact occurrence identities owned by the same ordinary authority, not global word IDs. Existing subject/property/value semantics remain intact. A facet can receive connections, be primary for subsequent input, or represent a counted collection without anonymous placeholder members. Descriptor facts remain addressable rather than being hidden in labels or Inspector detail.

The browser-local `graph.compose` primitive composes bounded grammatical constituents into one validated transaction. It uses supplied lexical data, exact owner/focus resolution, capacity checks and all-or-nothing mutation. It does not invoke Compute, grant server execution or expose protected values. Existing simple Paths remain available; supported composed facts bypass inactive archive selection, while intentional archive activation retains its existing policy.

Publication, canonical mappings, compact persistence, hydration and public discovery preserve facet identities and existing visibility. The Inspector projects compact equal-spaced intermediate points on straight chains, expands the whole chain for inspection/dragging, and preserves branch attachment. Focus and presentation do not create authority.

Implemented scope and tests are recorded in `onevar-platform/docs/decisions/0093-addressable-facets-and-atomic-graph-composition.md`. Overall language understanding remains **Partial**: the ten reported complex sentences and selected follow-ups are acceptance cases, not evidence for 95% arbitrary-language coverage. Broad model-proposed graph plans, multilingual coverage and unrestricted temporal/negative semantics require separate held-out evaluation and implementation. Domain examples must remain lexical/entity data rather than runtime conditionals.
