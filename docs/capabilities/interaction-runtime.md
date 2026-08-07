# Sentence, Essence, Path, Command, Menu, and Automation Runtime

**Status:** Implemented foundation; partial formal specification

These components form one interaction runtime. They let natural input become reusable local behavior instead of requiring a model call for every repeated request.

## Processing chain

```text
sentence or voice
  -> token and linguistic analysis
  -> exact or structural signature
  -> installed Path match, or required Path proposal/validation on a cold miss
  -> browser-local canonical Essence materialized from the installed Path
  -> ContextDB read/write, command, menu transition, automation, or entity call
  -> response and reusable learning evidence
```

## Terms

- **Sentence:** The user's original utterance. It remains evidence and repair context; it is not the durable executable representation by itself.
- **Essence:** A compact semantic operation over actors, relations, values, properties, modifiers, and questions. It is the bridge between language and ContextDB behavior.
- **Derived operation:** A read-only Essence row that combines values already bound by graph-query rows. Arithmetic uses `{op:add}`, `{op:subtract}`, `{op:multiply}`, or `{op:divide}` with a result variable and two operands. Identity aggregation uses `{op:count}` with one bound set operand. Neither form mutates ContextDB.
- **Signature:** The reusable match shape computed from an utterance, such as token lemmas/tags or a typed structural pattern with captures.
- **Path:** A tested mapping from a signature or semantic family to an executable transform. Its left side recognizes language; its right side performs a query, mutation, command, or capability invocation.
- **Command:** A named, declarative action and target published into the browser command registry. Commands provide safe entry points to entities, functions, routes, UI actions, or other registered behavior.
- **Menu:** A stateful set of available commands and calls. Menus expose contextual choices and transitions rather than requiring every action to be a globally active phrase.
- **Call:** A menu/state transition that can show, hide, run, go back, close, or expose options through the same command channel.
- **Automation:** A sequenced queue of delays, speech, commands, and related interaction events. It composes registered behavior; it does not replace Paths or the external task scheduler.
- **Sequence:** A composition of saved equations/operations into a reusable multi-step transform.
- **Function:** Executable implementation referenced by entity actions. Functions run within the entity/runtime trust boundary and require validation and policy controls.

## Why the whole chain matters

A correct Essence with a bad signature will not match later wording. A correct signature with a bad Path transform will retrieve or mutate the wrong data. A correct Path that invokes the wrong command or menu state still produces bad behavior. Editing therefore needs the sentence, Essence, ContextDB traverse, matching signatures, Path transforms, command/menu definitions, and relevant entity contract together.

## Builder behavior

- Canonical Essence is materialized in the browser from an installed, validated Path. A cold miss has no executable Essence: a model may propose a Path, but that proposal must be compiled, tested, installed, and replayed locally before ContextDB is touched. A server or model-generated Essence is never the semantic authority for the request.
- Missing required Path coverage and optional coverage expansion are separate lifecycles. The current wording's required Path is built, validated, saved, installed, and replayed even when **Auto-build Path signatures with OpenAI** is disabled.
- Reusable semantic operations such as event observation, signed quantity observation, distinct counting, and summation are declared as versioned data. Language such as “sold,” “restocked,” or “received” belongs to Path definitions that bind those operations; it is not procedural vocabulary in the browser runtime.
- Ordinary clauses that describe an occurrence may bind the vocabulary-neutral activity-observation entity. Its stable graph contract separates actor, normalized activity, optional object and kind, descriptor, modifier, quantity/unit, and browser-local observation time, with projections for actor, object, descriptor, and quantity. A model chooses and binds the declared roles; runtime code does not branch on verbs or example domains. Safe token bindings become typed structural slots by binding type before installation.
- **Auto-build Path signatures with OpenAI** controls only additional ways the same canonical interaction could have been expressed. When enabled, OpenAI may propose extra paraphrase Paths with their own explicit source text, local Essence equivalence, signatures, and tests. When disabled, only the required current Path is requested.
- A model proposal may broaden cross-browser wording coverage, but it cannot replace or amend the canonical local Essence. This keeps identical installed Path versions semantically consistent across browsers and preserves the zero-trust execution boundary.
- When the browser promotes a learned exact-token proposal into a reusable structural Path, it owns an atomic schema-v3 compilation of both sides: typed structural recognition on the left and the versioned deterministic semantic transform on the right. Model output that uses an older or incomplete proposal shape is normalized and locally retested before persistence; it is never stored as the execution contract verbatim.
- If the proposal selects an installed semantic-entity operation, the model supplies only the operation reference and typed bindings. The browser discards model-authored executable rows, conditions, transactions, and answer templates and regenerates them from the installed entity version before the local tournament. The tested browser-compiled transform is the transform persisted with the Path.
- The worker hydrates the versioned semantic-entity catalog independently of Path installation. Existing cached Paths do not eliminate the definitions needed to compile a later cold-miss candidate.
- Candidate bindings outside the selected operation contract are removed before compilation. A source token promoted only for a removed binding is restored as fixed Path grammar and the structural signature is recomputed, preventing an unused model binding from becoming a wildcard.
- Structural family aliases execute with their own signature, pattern, and extraction bindings while reusing the canonical transform. The alias signature participates in the same v3 integrity check as a canonical Path.
- Startup hydration is a versioned handoff: cached Paths may provide an immediate fallback, the authoritative identity-scoped result must supersede them, and stale responses for a prior identity must be ignored. Worker readiness requires the installed Path identities—not merely a nonzero count—to match the latest published set.
- Every browser-local semantic artifact is identity-scoped, including graph snapshots, ContextDB state, word maps, transcription history, translations, and their local encryption keys. Navigating to another primary identity must start from that identity's state and cannot inherit graph identifiers from the previous account.
- A linguistic signature match is not sufficient for question success. The materialized Path must resolve a non-empty answer against the current identity's graph; an empty projection is rejected as a stale or incomplete Path and becomes repair evidence.
- Model output is candidate Path-learning evidence, never a successful Essence fallback for browser execution.
- Candidate Paths must be tested in the same local runtime that will execute them, against the worker-authoritative current ContextDB rather than a graph copy captured before a resumable model round trip.
- Required Path generation and every correction round use resumable background model jobs. The browser polls with the complete opaque job descriptor and carries locally observed candidate failures into the next proposal; an API timeout must not decide whether an input can be learned.
- A locally validated learned Path may activate while retryable server replication is unavailable. It remains marked pending and is retried separately. Durable Path persistence stores bounded validation summaries; full graph and candidate diagnostics remain in the browser review bundle rather than being duplicated into every Path record.
- Typed captures must preserve distinct inputs such as actor, location, time reference, quantity, and projection.
- Statement Paths and question Paths have different safety rules: mutations require replay/idempotency controls; read-only queries can be tested without changing ContextDB.
- A Path signature recognizes and binds an intent; it does not justify creating executable behavior. If a typed Essence transaction fully represents a statement such as a fact, correction, or quantity delta, the Path must keep it on the local graph-mutation path.
- A rate, ratio, or “per” question must preserve both operands and its arithmetic operation. A candidate that merely projects one stored operand is semantically incomplete and must not be promoted.
- Wording aliases should share a canonical semantic transform when they truly mean the same thing.
- Conflicting canonical transforms must enter explicit repair/versioning rather than silently blocking the user's input or overwriting unrelated behavior.
- Corrections that refer to a recent role, event, or value are evaluated against the complete authorized browser-local graph. A bounded language-model context is not sufficient evidence for repair when it omits the relation being replaced.

## Commands, menus, and automations

Entities publish commands into a registry. Menus determine which commands are meaningful in the current state; calls move between states or execute registered behavior. Automations emit into that same interaction channel, allowing a voice/menu experience to compose ordinary entity behavior instead of maintaining a second command system.

## Derived arithmetic query rows

The browser-local query runtime supports deterministic binary arithmetic after ordinary ContextDB rows bind numeric variables. The row shape is:

```json
["*", "{result}", "{op:divide}", ["{numerator}", "{denominator}"]]
```

The operation is read-only, rejects unresolved or non-finite operands, and produces no result for division by zero. `{ask}` is used as the result variable when the derived value is the requested answer. Correlation remains an identity concern: operands should come from one record when possible, or from separately bound records constrained by the same owner and explicit modifiers when the stored facts are split. The runtime must not merge entities merely because their labels match.

## Required formalization

Versioned schemas are still needed for Essence operations, signature types, Path transforms, command targets, menu transitions, automation events, and sequences. The schemas must include permissions, side-effect classification, test fixtures, migration rules, and observable failure stages.
