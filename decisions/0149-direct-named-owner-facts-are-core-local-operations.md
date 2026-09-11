# 0149 — Direct named-owner facts are core local operations

## Context

After a person creates an exact named possession, a simple fact such as `April has two cats` already supplies an exact subject, one scalar value and one property. Sending that structure through cold Path discovery can surface an inactive archive offer even though the browser can prove the complete operation locally. The offer is correct for a genuine miss, but it is needless friction for this bounded form and leaves the expected entities and relation unapplied.

## Decision

Trusted core grammar accepts the article-free shape `named subject has one-token value property` as one `current_state.set` operation. It resolves the complete subject reference against the caller's owned graph and commits the value entity plus exact property relation locally. A missing or ambiguous subject does not materialize and cannot mutate. Core dispatch occurs before active learned templates and before inactive archive discovery.

An explicit indefinite article changes the structural meaning. `Subject has a|an descriptor object-kind` declares an addressable related object rather than flattening the noun into a scalar property. That amendment is specified by [decision 0150](0150-descriptive-possessions-create-nested-objects.md).

Inactive archive templates remain interpretations rather than authority. This change does not auto-install or auto-run an archived Path, and broader, multi-effect or structurally different language still follows the existing governed discovery flow.

## Consequences

- `April has two cats` stores `cats = two` on the exact April entity.
- `April has a big car` creates an exact noun-labelled `car` with a separate descriptor rather than storing `car = big` on April.
- A malformed or unknown direct subject cannot create a person or owned object by implication.
- The primitive is vocabulary-neutral and introduces no people, animal, vehicle or color-specific branch.
