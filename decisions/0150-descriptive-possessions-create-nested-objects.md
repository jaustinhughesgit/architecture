# 0150 — Descriptive possessions create nested objects

## Context

The replacement runtime's first direct named-owner grammar treated every two-token complement after `has` as `value property`. That correctly represents `April has two cats` as `cats = two`, but flattened `April has a big house` into `house = big`. No house object existed, so a later fact about `the big house` could not resolve a subject and entered inactive Path discovery.

## Decision

An explicit indefinite article is a bounded structural object-declaration cue. `resolved possessor has a|an descriptor object-kind` materializes one exact object, connects the resolved possessor to it with `owns`, records its final noun as `kind`, and keeps the complete descriptive phrase as the object's caller-local lexical label and address. Inspector V2 folds the terminal kind value into the object's detail surface while retaining the object itself as a dot.

The possessor must resolve uniquely inside the primary person's authorized object set. Later references may discard a grammatical leading `the` and resolve any exact object in that same owner-scoped set, including nested objects, permitting `The big house has nine rooms` to set `rooms = nine` on the house. The new object's owner and publisher identities remain the primary person; a nested semantic `owns` edge does not transfer authority.

The core form accepts exactly one descriptor token and one object-kind token. Longer or ambiguous noun phrases remain governed Path discovery. Article-free `subject has value property` stays the scalar operation, and missing or ambiguous possessors do not create anything. The boundary is syntactic and adds no domain vocabulary.

## Consequences

- A connected Essence chain may contain independently addressable nested possessions instead of flattening every phrase into a property.
- `April has a red car` creates a car object, while `April has red hair` remains a scalar fact.
- Exact-ID ownership and publication authority remain with the primary person even when a semantic possession edge begins at another owned object.
- Tests must distinguish the object and scalar forms, prove nested resolution and refusal, and verify the Inspector projection.
