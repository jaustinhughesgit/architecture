# 0008: Semantic Operations and Vocabulary Are Data-Defined

- Status: Accepted
- Date: 2026-08-06

## Context

Procedural parsers for words such as `have`, `sold`, `received`, `pass`, or `correction` can make a demonstration pass, but every new domain then requires another JavaScript branch. Runtime rewrites of named Path families create the same problem: the saved Path is no longer the executable source of truth.

## Decision

The browser runtime owns only generic mechanics: tokenize, match, bind, compile a declared operation, materialize Essence rows, execute graph transactions and queries, and validate results.

Semantic behavior is versioned data:

- a local semantic entity declares operations, required bindings, effects, and row templates;
- each query operation declares its projected `answerRole` so Path learning selects actor, object, descriptor, participant, count, or quantity by semantic role and binds only the known constraints;
- query selection must also preserve graph compatibility with supporting evidence: the operation's declared predicates must traverse the same stored relation family rather than substituting a prose-similar activity, event, or quantity model;
- on a cold query miss, the validator may identify a unique supporting statement by structural token overlap and compare declared relation predicates; ties remain unresolved rather than authorizing a guessed traversal;
- a vocabulary-neutral activity-observation entity supplies reusable actor, activity, object, participant, object-owner/descriptor, directly entailed result-relation, modifier, measurement, and observation-time roles for model-built Paths without turning those roles into a universal parser;
- a vocabulary-neutral relationship-transition entity records an observed transition separately from the resulting subject-predicate-object state and from an independent reference relationship used to identify the object; the learned Path supplies the predicates as declarative data;
- ownership, custody, control, responsibility, assignment, and location are not collapsed into one built-in relation. A Path may assert a resulting state only when the model can justify it from the utterance, and the reference/state predicates remain distinct;
- owner-qualified result-subject questions traverse the stored owner/object/result graph through a declared query operation; the model selects predicates and bindings from meaning, while the installed operation supplies the executable traversal;
- a query operation may declare a `repairSupport` graph contract naming the supporting semantic entity operation and bindings that must have been materialized; this dependency is versioned catalog data, not a verb, noun, or scenario branch in runtime code;
- overlapping repair-support contracts declare a numeric catalog priority. For the same uniquely matched evidence, validation requires the highest-priority graph contract and reports its exact semantic operation instead of repeatedly accepting a legacy but less complete traversal;
- repair precedence is scoped to a declared answer-role group. A subject-projection repair cannot outrank an object-property query merely because both touch the same historical evidence;
- ContextDB query templates may bind a predicate as a join variable. This lets one property projection traverse whichever direct relationship is actually stored between a known subject and constrained object without runtime code guessing ownership, custody, assignment, or another relation;
- grammatical surface forms such as possessives are normalized by generic Path binding before ContextDB entity resolution;
- identity hydration, worker-bridge readiness handshakes, and complete foundation readiness gate input execution so module ordering or a partial library cannot manufacture an unnecessary exact Path;
- primary ownership identity is available separately from full entity-payload readiness and is retrieved through a request/response handshake as well as the initial event, preventing late-loaded Path Builder instances from hydrating or persisting against an empty owner;
- same-operation vocabulary equivalences are explicit, tested Path-family aliases whose bindings target the existing semantic operation;
- conditional graph constraints are ordered before generic aggregate operators during materialization;
- numeric answer validation checks the typed result contract and does not override the Path/entity's declared operation based on question wording;
- personal possession and qualified-owner inventory quantities use the same signed quantity-observation entity; pronoun versus named-owner grammar changes the Path binding, not the ContextDB operation or storage model;
- when a learned exact Path declares typed token bindings, the browser promotes those bound ranges into structural quantity/entity slots before validation and installation while retaining literal operation words as Path data;
- replay of a held cold-miss input replaces its prior sentence-aggregation context so the installed Path executes one copy of the utterance rather than appending the utterance to itself;
- Path signatures declare vocabulary and syntax, then bind captures to one declared operation;
- typed slot constraints may declare excluded leading lemmas to keep overlapping syntax in the correct sibling Path; the matcher enforces this reusable constraint without knowing the domain or item vocabulary;
- the local compiler combines those two records into an ordinary deterministic Path;
- ContextDB stores distinct observations, relationships, provenance, and revisions;
- generic graph operations perform joins, distinct counts, signed sums, and selected relation rewires for declared correction transactions.
- historical replay replaces Path provenance together with graph effects: semantic entity reference, bindings, materialized values, mode, and repair marker must describe the repaired Path rather than the superseded one.

Compute entities remain the correct artifact for reusable executable behavior, provider calls, compound workflows, or external effects. Ordinary facts, events, deltas, corrections, and queries remain local semantic operations and do not become remote Compute applications.

A new synonym extends or adds a Path. A new graph operation versions or forks the semantic entity contract. Neither change adds domain vocabulary to `app.js`, a worker, or a compiler.

Model assistance selects a declared operation and proposes its typed bindings, or proposes a new declarative operation for explicit review. When an installed semantic operation is selected, its versioned local entity—not model-authored rows—is the executable contract. Proposal ingress resolves the operation reference and replaces executable fields from the catalog before low-level row validation; therefore an invented row cannot create a retry loop. The browser independently repeats that compilation from its installed entity, resolves local-only bindings such as the current speaker and request time, runs an isolated graph test against the current local ContextDB, installs the compiled Path, and replays the input. Model retries receive the browser's actual failed checks through a resumable background job; they do not gain authority to execute an Essence directly.

## Consequences

- Known inputs execute locally without an LLM call.
- A reset can reinstall foundation semantic entities and Paths from versioned datasets.
- The foundation manifest lists every required signature. Dataset persistence preflights the complete batch before writing so one invalid equation cannot leave a misleading partial installation.
- The manifest may require a specific revision for a signature whose transform contract changed; signature presence alone cannot certify that a cached Path implements the current behavior.
- Foundation startup requests its local command-registry dependency explicitly and converges without a page reload. A user-triggered refresh repeats authoritative hydration and missing-foundation installation rather than repainting cached state.
- Worker readiness and hydration completion trigger a bounded idempotent convergence check, so an empty or partial local library is repaired automatically despite module-order races.
- The module loader publishes registered application targets independently of user entity/menu data. Foundation processing Path validation therefore cannot deadlock while waiting for an optional module or an empty newly reset account.
- Foundation-required application aliases are declared with the module target and published atomically; command Path quality cannot vary according to whether a richer optional registry source loaded first.
- Path Builder modules and their classifier/processing datasets share one cache revision. Runtime assets are network-first with prepared offline fallback, preventing a new matcher from accepting an obsolete cached foundation as current.
- Bundled foundation Paths that pass local compilation and quality gates install into the browser before server replication. Compute unavailability may delay shared persistence, but it must not prevent deterministic local execution; the UI reports pending synchronization and retries it separately.
- Message readiness follows completeness of that approved local foundation, not completion of server hydration. Hydration remains observable synchronization and may add authorized Paths later, but it is not a prerequisite for executing the bundled/local library.
- Multiple validated input structures may be foundation Paths in one semantic family. They bind the same entity operation instead of adding syntax or domain branches to application code.
- A model proposal is not considered reusable merely because it joined an existing family. Its dynamic values must be represented as typed slots, and the promoted structural Path must pass the ordinary local tournament before persistence.
- A model proposal that selects a versioned semantic operation cannot amend that operation by supplying extra executable rows. The browser recompiles the operation locally before both testing and persistence.
- Catalog-backed proposal validation also compiles the selected operation before evaluating executable references. Only operation selection and typed bindings remain model-controlled; the browser compilation remains the final semantic authority.
- Catalog-backed query validation treats runtime predicate references as bindings, never string literals. When a selected query has an incomplete `repairSupport` match in recent provenance, the query and supporting statement repair are required and tested as one transaction.
- Bindings not declared by that operation are discarded. Their source tokens remain fixed Path grammar unless another retained binding consumes them; they do not survive as unconstrained structural slots.
- An operation may instead declare `discardPolicy: reject_undeclared_bindings` when silently dropping a proposed semantic role would make that operation incapable of preserving the statement. This produces an operation-selection failure and directs repair toward a compatible catalog entity.
- Family compatibility compares conditional rows, transactions, and relational operation as well as base rows. A candidate with different optional constraints or repair semantics forks to a revision family instead of being aligned into a misleading alias.
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
