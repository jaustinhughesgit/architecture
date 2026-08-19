# JPL, Shorthand, and ArrayLogic

## Purpose

JPL, Shorthand, and ArrayLogic are three distinct JSON-based representations in the current 1var execution and creation flow. They operate at different levels and must not be used as interchangeable names for “the logic.”

In one current Convert path, their relationship is:

```text
Natural request or structured build request
    ↓
ArrayLogic: describes the work or entity that should exist
    ↓ compiles to
Shorthand: composes, invokes, and updates entities through row operations
    ↓ may create or modify an entity containing
JPL: runs the entity's ordered executable actions when the entity is invoked
```

This is a flow, not a claim that each representation always passes through all three stages. Existing entities can execute JPL without ArrayLogic. Shorthand can transform an entity without creating JPL. ArrayLogic can also select or invoke an existing entity rather than create one.

For a completed Convert build, Compute returns a versioned `convertArtifacts` inspection object containing the accepted ArrayLogic plan, the compiled Shorthand rows, and the materialized JPL `{modules, actions}` stored on the created entity. The browser Convert module presents these as three read-only, independently scrollable fields. This is build evidence, not a second execution path or authorization token. The build coordinator retains a bounded typed copy so a final asynchronous poll for that exact build still returns `BUILT_AND_REGISTERED` and the same evidence. A separate capability-reuse result returns `CAPABILITY_REUSED` with null artifact fields rather than presenting the reused entity as newly generated work.

These representations also do not collapse 1var's execution planes. JPL is the governed server program executed by Compute. A dynamic JavaScript function carried by a local entity bundle executes through `fileWorker`, not as JPL and never on the browser main thread. The main thread remains the trusted coordinator for Paths, Essences, ContextDB, commands, and validated declarative rendering. Placement never bypasses the entity's identity, lineage, permissions, provenance, or protected-asset rules. See [File Worker isolation](capabilities/worker-isolation.md).

## Terminology summary

| Representation | Definition | Primary question | Typical lifetime |
| --- | --- | --- | --- |
| JPL | The sequential JSON action program stored at `published.actions`, using dependencies declared by `published.modules` and values from the execution context. | “What does this entity do when it runs?” | Persisted with an executable entity |
| Shorthand | A row-addressed JSON matrix interpreter for composing values, transforming entity documents, invoking registered routes or entities, and selecting the resulting published state. | “How do these existing values and capabilities get assembled or changed?” | Persisted in some entities or generated as an execution patch |
| ArrayLogic | A higher-level ordered JSON build/conversion plan accepted by Convert and compiled into Shorthand rows. | “What work or reusable entity should be found, created, or run?” | Usually request-scoped compiler input |

The codebase uses **JPL** as a proper name. This architecture does not assign an expansion to the initials because no canonical expansion is established in the current documentation or active implementation.

## JPL

### Definition

JPL is 1var's declarative JSON representation for the ordered executable behavior of a compute entity. The executable program is the array at `published.actions`. `published.modules` declares runtime dependencies that actions may target.

An entity bundle is not itself JPL. The bundle can also contain presentation, interaction, data, lineage, and capability-contract fields such as `blocks`, `templates`, `assignments`, `commands`, `calls`, `automation`, `moods`, `data`, and `computeCapability`. JPL is the executable action program inside that larger document.

The runtime currently processes actions sequentially. Representative action forms include:

- `set` to put values into the execution context;
- `target` plus `chain` to call an allowed object or module;
- `assign` to retain a result for later actions;
- `if`, `else`, and `while` for control flow;
- `nestedActions` and `return` for nested execution and function-like behavior;
- `promise` and `timeout` execution modifiers.

References use the current placeholder syntax, including:

- `{|req=>body.player|}` — read a nested request value;
- `{|effectivePasses|}` — read a named context value;
- `{|lookup=>data.count|}` — read a nested value from an earlier result;
- `{|res|}!` — target the executable response object in the current runtime.

The `!` and root/nested-context forms have runtime behavior today, but they are not yet governed by a canonical versioned language specification. Generators should use validated schemas and tested examples instead of extrapolating new syntax.

### Example

This entity reads two request values into context and returns a structured response:

```json
{
  "published": {
    "modules": {},
    "actions": [
      {
        "set": {
          "player": "{|req=>body.player|}",
          "effectivePasses": "{|req=>body.effectivePasses|}"
        }
      },
      {
        "target": "{|res|}!",
        "chain": [
          {
            "access": "send",
            "params": [
              {
                "player": "{|player|}",
                "effectivePasses": "{|effectivePasses|}"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

The first action binds values. The second action sends them. If the entity queried a provider, `published.modules` could declare an approved module and an earlier action could assign the provider result for the response action to reference.

### Boundary

JPL is data, not JavaScript source. A generated implementation must not contain functions, imports, comments, code fragments, or arbitrary module names. Execution still has real authority: a target can call a provider, send a response, or perform another allowed effect. Schema validity alone is therefore insufficient. Module allowlists, target and host validation, input/output contract checks, authorization, protected-asset policy, and isolated execution tests remain required.

JPL access to governed server entities is not blanket access to browser-local ContextDB. For a manifest-declared fixed ContextDB effect, JPL returns the typed response output while the browser proves and applies the separately declared current-to-new local relation mutation. The graph snapshot and browser entity identifiers never become JPL execution context. See [decision 0046](../decisions/0046-browser-applied-compute-context-effects.md).

### Status

**Implemented / partial spec.** The compute runtime executes current action shapes, and the generic capability path validates a deliberately restricted subset. A canonical versioned schema covering the complete runtime, reference syntax, effects, errors, and compatibility rules is incomplete.

## Shorthand

### Definition

Shorthand is 1var's row-based composition and transformation representation. Its input is a two-dimensional JSON matrix. Each row produces a row result; later rows can address earlier results or cells. A keyword in a row applies an operation such as transforming JSON, doing arithmetic, routing to a registered action, or choosing the final result.

Current reference forms include:

- `000!!` — the result produced by row `000`;
- `000~~` — the complete row;
- `000@@` — a run reference;
- cell references such as `000AA` or numeric-column variants;
- mutation and expansion forms such as `000++`, `000%!`, `000%%`, `000<<`, and `000>>`.

The active runtime currently recognizes operations including `ROUTE`, `GET`, `NESTED`, `ADDPROPERTY`, `MERGE`, `ARRAY`, `APPEND`, `PREPEND`, `USE`, `SUBSTITUTE`, `CONDITION`, `ITE`, `SUM`, `AVG`, `ROWRESULT`, `MATRIX`, and `TREE`. This list describes current implementation evidence, not a frozen public vocabulary.

Shorthand input can be divided into two kinds of segment:

- `physical` rows remain in the matrix and represent durable source or result structure;
- `virtual` rows execute against that structure and are then removed from the matrix, allowing a generated patch to affect the retained result without becoming retained source rows.

`ROWRESULT` can replace a selected row result. Convert uses that behavior to make an updated entity document become row `000`, which Shorthand then returns as the new `published` value.

### Example

This example starts with a physical `published` document, creates one event in a virtual row, writes it into the document, and makes the updated document the result:

```json
{
  "input": [
    {
      "physical": [
        [
          {
            "data": {}
          }
        ]
      ]
    },
    {
      "virtual": [
        [
          {
            "eventType": "pass",
            "fromPlayer": "Amy",
            "toPlayer": "Sarah",
            "effective": true
          }
        ],
        [
          "NESTED",
          "000!!",
          "data",
          "latestEvent",
          "001!!"
        ],
        ["ROWRESULT", "000", "002!!"]
      ]
    }
  ]
}
```

The physical `published` value is row `000`. The event is row `001`. `NESTED` produces the updated document at row `002`. `ROWRESULT` replaces result `000` with that update. The virtual rows can then be discarded while the changed physical result remains.

### Boundary

Shorthand is not merely a JSON convenience syntax or a spreadsheet formula format. `ROUTE` can invoke registered compute actions, including entity retrieval, execution, creation, and persistence paths. Entity references can load and recursively execute other Shorthand input. Authorization, side-effect classification, idempotency, recursion limits, validation, and audit therefore belong at its execution boundary.

### Status

**Implemented / partial spec.** The active Convert path uses `compute/app/routes/modules/shorthand.js`. Other numbered, older, and alternate Shorthand implementations remain in the repository, so the active module—not filename similarity—is the present source of truth. The representation lacks a canonical version, complete schema, formal keyword contracts, and comprehensive contract tests.

## ArrayLogic

### Definition

ArrayLogic is a higher-level ordered JSON representation used by Convert to describe requested work before it becomes Shorthand. It is closer to a build plan or intermediate representation than to a general-purpose runtime language.

The current parser accepts ArrayLogic directly or can ask a model to produce it from a prompt. Elements can currently represent:

- literal values or JSON-schema-derived values;
- an operation identified by a semantic or breadcrumb-like key, with `input` and `schema` fields;
- an approved `computeEntity` build specification;
- an `appEntity` specification for a visible entity;
- a final `conclusion` marker.

The parser recognizes `__$ref(n)` references to earlier ArrayLogic elements and can resolve a nested path after a reference. During compilation, it also creates the numeric row references required by Shorthand.

ArrayLogic expresses intent at a higher level than either downstream representation. It can say that a capability with certain inputs and outputs is needed without spelling out every entity mutation row. The compiler can then find or invoke an existing entity, compile an approved entity plan, create an entity, build Shorthand rows to modify it, and return creation details.

### Example

This simplified operation asks Convert to record a pass using a capability with a declared output contract:

```json
[
  {
    "soccer.analytics.pass.record": {
      "input": {
        "fromPlayer": "Amy",
        "toPlayer": "Sarah",
        "effective": true
      },
      "schema": {
        "type": "object",
        "properties": {
          "recorded": { "type": "boolean" },
          "eventId": { "type": "string" }
        }
      },
      "output": "Record pass"
    }
  },
  {
    "conclusion": true
  }
]
```

Depending on the surrounding Convert request, the current implementation may run a supplied entity, create a new entity for the operation, or use the approved compute-capability build path. The resulting Shorthand rows perform the concrete routing, document updates, and result selection. Generated entity creation uses `ROUTEGET` to select named values through registered direct or relayed route envelopes; ordinary `GET` remains exact object traversal. A generated child capability may execute those rows over an empty published seed when its parent workspace document is not readable; its own entity identity, save, manifest validation, registry write, and leased build finalization still must succeed.

An explicit visible-entity build uses a different element shape:

```json
[
  {
    "appEntity": {
      "name": "Passing Review",
      "kind": "dashboard",
      "userRequest": "Show the coach's recorded pass and scoring events."
    }
  }
]
```

### Boundary

ArrayLogic is not an authorization grant and should not be treated as trusted because it is structured JSON. A plan can lead to entity creation, route execution, persistence, indexing, or permission records. Each compiled operation must be validated and authorized at the layer where its effect occurs.

The current `parseArrayLogic` implementation also performs or coordinates some side effects while compiling, including anchor indexing and owner-grant setup. That coupling is implementation evidence, not the desired definition of a pure compiler. Future versioning should separate validation and planning from authorized application so plans can be inspected, tested, approved, retried, and audited before effects occur.

### Status

**Implemented / partial spec.** Convert uses the active `compute/app/routes/parseArrayLogic.js` implementation. Several older numbered parsers and an alternate converter remain in the repository. There is no canonical versioned ArrayLogic schema, and several element types have different validation strength. The approved `computeEntity` path is more constrained than the legacy operation path.

## The soccer coaching example across the representations

For the coaching scenario, the representations answer different questions:

1. **ArrayLogic:** “We need a reusable operation that records a pass with players, time, and effectiveness, then returns the saved event.”
2. **Shorthand:** “Invoke or create the correct capability, connect Amy and Sarah to the event, update the retained entity data, save it, and expose the result.”
3. **JPL:** “When the recording entity runs, bind the spoken inputs, call the allowed storage or analytics capability, assign its result, and return the declared event fields.”

The durable coaching facts should live as governed entity and ContextDB data, not inside ArrayLogic, Shorthand rows, or an LLM conversation. These representations make the data usable; they are not substitutes for the data model.

## Architectural rules

1. Do not call an entire entity bundle JPL. Identify `published.actions` as JPL and the surrounding object as the entity bundle.
2. Do not describe ArrayLogic as an alternative spelling of JPL. It is an upstream plan that may cause JPL to be created or selected.
3. Do not describe Shorthand as only a compiler output. It is an executable composition layer with references, transformations, route invocation, and side effects.
4. Do not let any of the three representations bypass permissions, protected-asset policy, or provider restrictions.
5. Treat model output as a proposal. Validate it into an approved representation before execution or persistence.
6. Prefer structured, versioned contracts between the representations. Preserve provenance from request to ArrayLogic element, Shorthand row, entity mutation, and JPL action so failures can be attributed and repaired.
7. Keep domain nouns such as soccer passes out of the core language. They belong in entity data and capability contracts built from general composition and execution primitives.
8. Keep dynamic local entity script in `fileWorker`; do not use JPL, Shorthand, or ArrayLogic terminology to imply that arbitrary generated JavaScript may execute on the main thread.

## Current implementation evidence

- Active Convert orchestration: `compute/app/routes/modules/convert.js`
- Active ArrayLogic parser/compiler: `compute/app/routes/parseArrayLogic.js`
- Active Shorthand runtime used by Convert: `compute/app/routes/modules/shorthand.js`
- JPL runtime execution: `compute/app/app.js`
- Restricted compute-entity validation and compilation: `compute/app/routes/capabilityBlueprints.js`
- Entity-plan contract tests: `compute/tests/entity-plan-compiler.test.js`
- Generic compute-capability contract tests: `compute/tests/generic-capability-contract.test.js`
