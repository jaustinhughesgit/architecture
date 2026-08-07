# 0009: Path Repair Is a Proof-Directed Semantic Transaction

- Status: Accepted
- Date: 2026-08-07

## Context

A Path could previously receive a perfect local score when it covered every source token but discarded part of the sentence's meaning. For example, a quantity word could be frozen into signature grammar while the selected event operation stored no quantity. A later quantity question then retried query Paths against data that could never answer it. Although the model could return a corrected historical statement, the browser's non-expansion branch retained only the current `sourceSeq 0` proposal.

This was not a vocabulary problem. It was a missing proof obligation and a non-atomic repair lifecycle.

## Decision

Path learning and repair distinguish three proofs:

1. **Recognition proof:** the left side covers every meaningful source token and has no unsafe wildcard.
2. **Semantic coverage proof:** explicit typed source values required by the interaction survive browser-local semantic-entity compilation as compatible typed bindings.
3. **Outcome proof:** the locally compiled transform produces the required graph effect or answer in an isolated worker-owned ContextDB.

When a current query reveals that a supporting historical statement failed semantic coverage, the system creates one repair transaction:

- relevant history is selected using typed linguistic anchors and graph/source provenance, not an arbitrary last-message assumption;
- the request identifies the owning source block, superseded Path signature, and missing typed requirement;
- the model must propose the repaired historical statement and current query together;
- the browser recompiles both from installed semantic entities;
- the worker removes the historical block's recorded relations in an isolated snapshot, replays the repaired statement, and tests the query against that repaired graph;
- every required proposal must pass before any Path is persisted;
- the superseded exact alias is retired, both Paths are installed, and live historical replay occurs only after the isolated proof passes;
- a failed save or replay rolls the coordinated change back.

Auto-build authorizes additional paraphrase proposals only. It does not control or truncate required repair proposals.

The initial implemented semantic-coverage invariant covers explicit numeric/cardinal values. Additional typed-role invariants must be added as declarative contracts, not domain vocabulary branches. Implied support facts remain partial: future implementation must distinguish model inference from user assertion, record provenance and confidence, and obtain any policy-required confirmation.

## Consequences

- A candidate cannot hide a discarded value in its grammar and still score as semantically complete.
- Query repair addresses the layer that lost the data instead of repeatedly changing a read Path.
- New vocabulary can reuse versioned occurrence, quantity, event, and other semantic entities without adding word-specific application code.
- A semantic entity that cannot represent required roles produces a precise capability limitation instead of an unbounded retry loop.
- Review bundles can attribute failure to recognition, semantic binding, historical replay, query outcome, persistence, or installation.

## Verification

- Reject a statement candidate whose explicit cardinal is not retained by a `number` token binding after local semantic compilation.
- Accept the same syntax with different nouns, people, activities, and numeric surfaces when the declared roles remain compatible.
- Detect a relevant historical statement that discarded a typed value and require its `sourceSeq` in the proposal set.
- Remove the old statement's graph relations, replay the repaired Path, and answer the current query in one isolated test.

Semantic coverage is not limited to numbers. Supplied people/proper nouns and descriptors are typed evidence too. If a learned occurrence Path omitted a participant or adjective, the repair transaction must bind and materialize those roles before the current query can pass. Directly entailed result relationships use the vocabulary-neutral activity contract; no action verb or example domain is dispatched in runtime code.
- Commit neither Path when either proposal, persistence step, worker installation, or live replay fails.
- With Auto-build disabled, retain both required transaction proposals while generating no optional paraphrases.
