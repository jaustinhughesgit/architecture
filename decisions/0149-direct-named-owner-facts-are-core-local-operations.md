# 0149 — Direct named-owner facts are core local operations

## Context

After a person creates an exact named possession, a simple fact such as `April has two cats` already supplies an exact subject, one scalar value and one property. Sending that structure through cold Path discovery can surface an inactive archive offer even though the browser can prove the complete operation locally. The offer is correct for a genuine miss, but it is needless friction for this bounded form and leaves the expected entities and relation unapplied.

## Decision

Trusted core grammar accepts `named subject has [a|an] one-token value property` as one `current_state.set` operation. It removes only the optional article, resolves the complete subject reference against the caller's owned graph, and commits the value entity plus exact property relation locally. A missing or ambiguous subject does not materialize and cannot mutate. Core dispatch occurs before active learned templates and before inactive archive discovery.

Inactive archive templates remain interpretations rather than authority. This change does not auto-install or auto-run an archived Path, and broader, multi-effect or structurally different language still follows the existing governed discovery flow.

## Consequences

- `April has two cats` stores `cats = two` on the exact April entity.
- `April has a red car` stores `car = red` on that same entity; Inspector renders the resulting value points and exact edges.
- A malformed or unknown direct subject cannot create a person or owned object by implication.
- The primitive is vocabulary-neutral and introduces no people, animal, vehicle or color-specific branch.

