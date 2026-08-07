# 0008: Semantic Operations and Vocabulary Are Data-Defined

- Status: Accepted
- Date: 2026-08-06

## Context

Procedural parsers for words such as `have`, `sold`, `received`, `pass`, or `correction` can make a demonstration pass, but every new domain then requires another JavaScript branch. Runtime rewrites of named Path families create the same problem: the saved Path is no longer the executable source of truth.

## Decision

The browser runtime owns only generic mechanics: tokenize, match, bind, compile a declared operation, materialize Essence rows, execute graph transactions and queries, and validate results.

Semantic behavior is versioned data:

- a local semantic entity declares operations, required bindings, effects, and row templates;
- grammatical surface forms such as possessives are normalized by generic Path binding before ContextDB entity resolution;
- Path signatures declare vocabulary and syntax, then bind captures to one declared operation;
- the local compiler combines those two records into an ordinary deterministic Path;
- ContextDB stores distinct observations, relationships, provenance, and revisions;
- generic graph operations perform joins, distinct counts, signed sums, and selected relation rewires for declared correction transactions.

Compute entities remain the correct artifact for reusable executable behavior, provider calls, compound workflows, or external effects. Ordinary facts, events, deltas, corrections, and queries remain local semantic operations and do not become remote Compute applications.

A new synonym extends or adds a Path. A new graph operation versions or forks the semantic entity contract. Neither change adds domain vocabulary to `app.js`, a worker, or a compiler.

## Consequences

- Known inputs execute locally without an LLM call.
- A reset can reinstall foundation semantic entities and Paths from versioned datasets.
- The foundation manifest lists every required signature. Dataset persistence preflights the complete batch before writing so one invalid equation cannot leave a misleading partial installation.
- Foundation startup requests its local command-registry dependency explicitly and converges without a page reload. A user-triggered refresh repeats authoritative hydration and missing-foundation installation rather than repainting cached state.
- Multiple validated input structures may be foundation Paths in one semantic family. They bind the same entity operation instead of adding syntax or domain branches to application code.
- Simple user-declared trigger/effect policies are typed local graph operations over a generic policy entity. They become Compute entities only when their contract requires reusable executable work or external effects.
- The browser owns bounded Path-repair round state and advances it monotonically; model-returned project metadata cannot reset a correction loop.
- A cold miss can learn a Path without allowing model output to mutate ContextDB directly.
- The same signed-observation operation can support inventory, attendance, budgets, scores, and other quantities without knowing those nouns.
- Path and entity defects can be repaired and versioned independently of user data.

## Verification

- Compiler and runtime source contain no vocabulary from the scenarios they execute.
- Tests change owners, items, quantities, and event names while reusing the same Path and semantic operation.
- Aggregation is proven through generic ContextDB identity operations.
- Cold-miss tests prove the order: miss, candidate build, local validation/install, local replay, graph effect.

## Affected repositories

- `architecture`
- `aws`
- `compute` (boundary clarification only)
