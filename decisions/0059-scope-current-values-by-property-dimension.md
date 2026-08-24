# 0059: Scope current values by property dimension

**Status:** Accepted for Phase 3; clean-platform foundation implemented

## Context

The proof of concept frequently represented an owned object's mutable scalar through one broad `condition` family. That is sufficient for a single example but not for a general entity substrate: cleanliness, damage, operating state, availability, and market condition can all be simultaneously true properties. Uniqueness by subject plus predicate would overwrite unrelated facts. Runtime name matching would also allow two Compute capabilities with similarly named dependencies to cross-bind.

## Decision

The clean Context contract adds a normalized property key to every current condition relation. `single_current_value` uniqueness is enforced over subject ID, predicate, and property key. The core semantic catalog may contain bounded mutually-exclusive value domains for model-free phrases. Explicit possessive property assertions and property queries address unfamiliar dimensions, and an unqualified query over more than one dimension returns clarification.

Compute authoring freezes a human property concept and allowed current values. Installation may use those semantics to nominate one structurally compatible relation, but the resulting versioned Entity Use Binding stores exact capability, operation, dependency, subject, and relation IDs. Binding Essence may explicitly select a property dimension. Invocation and effect commit dereference only those exact IDs and fail closed when versions or compatibility change.

This is not a universal ontology or local RAG system. An unknown implicit property requires explicit wording, a verified catalog extension, or bounded interpretation followed by deterministic validation. Protected data requires the separate Phase 4 binding and consent contract.

## Consequences

- An entity can be both `cleanliness=dirty` and `market condition=used`; changing one cannot replace the other.
- The compact Dynamo representation uses one optional relation attribute for the property key and reads older absent values as an unspecified legacy property.
- Content-addressed catalog packages, not JavaScript domain branches, own bounded value families.
- Tests cover independent dimensions, clarification, exact rewiring, compact round-trip persistence, and exact-ID Compute selection.
