# 0150 — Descriptive possessions create nested objects

## Context

The replacement runtime's first direct named-owner grammar treated every two-token complement after `has` as `value property`. That correctly represents `April has two cats` as `cats = two`, but flattened `April has a big house` into `house = big`. No house object existed, so a later fact about `the big house` could not resolve a subject and entered inactive Path discovery.

## Decision

An explicit indefinite article is a bounded structural object-declaration cue. `resolved possessor has a|an descriptor object-kind` materializes one exact object, connects the resolved possessor to it with `owns`, keeps the final noun as the object's label and `kind`, and records the modifier through a separate `descriptor` relation. Inspector V2 folds the terminal kind and descriptor values into the object's detail surface while retaining the noun-labelled object itself as a dot.

The possessor must resolve uniquely inside the primary person's authorized object set. Later references may combine the object's noun, active descriptor and exact incoming `owns` subject as lexical evidence. This permits both `The big house has nine rooms` and `April's house ...` to reach the same exact house without making `big` part of its identity. An owner-qualified copular assertion such as `April's car is red` must match the exact April-to-car possession edge before the semantic catalog can interpret `red` as a color and commit that property. The new object's owner and publisher identities remain the primary person; a nested semantic `owns` edge supplies resolution evidence but transfers no authority.

The core form accepts exactly one descriptor token and one object-kind token. Longer or ambiguous noun phrases remain governed Path discovery. Article-free `subject has value property` stays the scalar operation, and missing or ambiguous possessors do not create anything. Object declaration remains syntactic; bounded value domains such as common colors remain catalog data.

## Consequences

- A connected Essence chain may contain independently addressable noun-labelled nested possessions instead of flattening every phrase into a property or making a modifier part of identity.
- `April has a big car` records `descriptor = big`; `April's car is red` then records `color = red` on that exact car, while `April has red hair` remains a scalar fact.
- Exact-ID ownership and publication authority remain with the primary person even when a semantic possession edge begins at another owned object.
- Tests must distinguish object identity from descriptor facts, prove descriptor and exact-owner resolution plus refusal, and verify the Inspector projection.
