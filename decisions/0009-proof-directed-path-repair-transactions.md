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
- a selected query operation's declarative `repairSupport` contract may additionally identify missing supporting graph roles, including directly entailed relationships that are not reducible to token-type coverage;
- the support contract may name older compatible source operations that require migration. A unique provenance- and anchor-matched historical Path can therefore be replaced with the declared supporting operation instead of retrying a query against its incomplete graph shape;
- when multiple contracts match that evidence, versioned `repairPriority` selects the preferred migration. A lower-priority query proposal fails operation selection before its supporting repair is requested, preventing correction rounds from repeating the obsolete route;
- priority comparison occurs only within the same declared answer-role group. Repair evidence for “who?” cannot redirect “what property?” into a subject query;
- a historical Path with every required binding name but an empty materialized value is still incomplete and must participate in the coordinated repair transaction;
- an unambiguous reference to an earlier semantic role is encoded as a binding-to-binding source so a pronoun is not persisted as a new entity; ambiguous antecedents are never guessed;
- a correction round retains the graph contract diagnosed by the preceding failure. The model cannot avoid the required historical repair by switching to an unrelated query operation that merely returns a nonempty value;
- the model must propose the repaired historical statement and current query together;
- the browser recompiles both from installed semantic entities;
- the worker removes the historical block's recorded relations in an isolated snapshot, replays the repaired statement, and tests the query against that repaired graph;
- every required proposal must pass before any Path is persisted;
- the superseded exact alias is retired, both Paths are installed, and live historical replay occurs only after the isolated proof passes;
- a failed save or replay rolls the coordinated change back.

Auto-build authorizes additional paraphrase proposals only. It does not control or truncate required repair proposals.

The implemented semantic-coverage invariants cover explicit numeric/cardinal values, supplied people/proper nouns and descriptors, plus query-selected supporting roles declared by semantic-operation graph contracts. Additional invariants must be added as declarative contracts, not domain vocabulary branches. Inferred support beyond a directly entailed relationship remains partial: future implementation must distinguish model inference from user assertion, record provenance and confidence, and obtain any policy-required confirmation.

Query operations can also declare source-predicate grounding bindings. A candidate is rejected when such a binding is imported from earlier context rather than grounded in the current question's typed predicate. The resulting failure carries the preferred graph-support contract into correction, so a retry repairs the coordinated statement/query transaction instead of escaping through any unrelated nonempty traversal.

Answer-role compatibility is likewise declared by semantic-operation interrogative metadata. The validator applies it before selecting or locking a support repair, preventing a subject traversal from being retained for a property question (or the reverse) without introducing domain-specific runtime branches.

Optional semantic bindings are normalized at the catalog boundary. An empty optional binding can inherit the same role's concrete value from executed supporting-Path evidence; otherwise it is removed before conditional rows are activated. Required bindings remain non-negotiable. This distinguishes incomplete optional model syntax from a broken semantic contract and avoids repeated cold-start retries.

## Consequences

- A candidate cannot hide a discarded value in its grammar and still score as semantically complete.
- Query repair addresses the layer that lost the data instead of repeatedly changing a read Path.
- New vocabulary can reuse versioned occurrence, quantity, event, and other semantic entities without adding word-specific application code.
- A semantic entity that cannot represent required roles produces a precise capability limitation instead of an unbounded retry loop.
- A strict semantic entity cannot silently discard model-proposed object or relationship roles; the candidate must select or create a compatible declarative capability.
- Review bundles can attribute failure to recognition, semantic binding, historical replay, query outcome, persistence, or installation.
- Replayed history reports the new semantic operation and bindings, preventing later planners from repairing against stale provenance even when the graph rows were already replaced correctly.

## Verification

- Reject a statement candidate whose explicit cardinal is not retained by a `number` token binding after local semantic compilation.
- Accept the same syntax with different nouns, people, activities, and numeric surfaces when the declared roles remain compatible.
- Detect a relevant historical statement that discarded a typed value and require its `sourceSeq` in the proposal set.
- Select a query whose catalog operation declares `repairSupport`, identify the unique related historical statement through semantic provenance and structural anchors, and reject a query-only proposal when required supporting bindings are absent.
- Ignore runtime predicate-binding objects during literal predicate compatibility checks; they must never become the text `[object object]`.
- Remove the old statement's graph relations, replay the repaired Path, and answer the current query in one isolated test.

Semantic coverage is not limited to numbers. Supplied people/proper nouns and descriptors are typed evidence too. If a learned occurrence Path omitted a participant or adjective, the repair transaction must bind and materialize those roles before the current query can pass. Directly entailed result relationships use the vocabulary-neutral activity contract; no action verb or example domain is dispatched in runtime code.
- Commit neither Path when either proposal, persistence step, worker installation, or live replay fails.
- With Auto-build disabled, retain both required transaction proposals while generating no optional paraphrases.
