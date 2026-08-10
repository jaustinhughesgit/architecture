# 0019: Semantic Role Plans Use Catalog-Owned Binding Schemas

- Status: Accepted
- Date: 2026-08-10

## Context

Semantic Plan v1 narrowed model authority over matcher and executable rows, but still asked the model to emit low-level binding value modes such as `nounLemma`, `number`, and `resolvedEntity`. A model could correctly identify an actor, activity, quantity, unit, and object yet have the proposal rejected because a compiler-created dependent binding had no value mode. Sending that deterministic defect through additional interpretation rounds did not change the correctly understood roles.

The model should interpret novel language. It should not need to reproduce runtime adapter details that are fixed by the selected versioned semantic operation.

## Decision

Semantic Plan v2 separates semantic role interpretation from runtime binding compilation.

For a catalog operation that publishes `bindingSchemas`, the model supplies:

- the selected versioned semantic operation;
- role names;
- grounded source kinds, token spans, literals, or references to another role;
- the adjudicated answer or intended graph effects; and
- a short explanation.

The model does not select runtime value modes for those roles. Each operation's versioned `bindingSchemas` declares its allowed sources and the canonical value mode for each source. Catalog defaults, binding dependencies, and binding policies then derive request-time roles, co-varying roles, and unambiguous source spans before catalog-owned Essence rows are compiled.

This is a compiler pipeline, not a replacement for Essence or Paths:

`sentence + local evidence -> model Semantic Plan -> catalog binding compilation -> Essence transform -> exact Path signature -> browser-local proof -> install/replay`

The initial v2 adapter supports gradual catalog migration. Operations with binding schemas use explicit role-only plans. Legacy catalog operations may continue through Semantic Plan v1 until their binding contracts are published. Declarative non-catalog Essence, menu, and sequence proposals use no v2 role plan and retain their existing local validation boundaries.

Generic source policies belong to the operation catalog. A measurement assertion policy may bind the single typed token immediately following a quantity and require a declared following grammatical tag. A measurement query policy may reduce a model-supplied phrase span to its one typed unit token before matching the local graph. The policies apply equally to durations, mass, distance, or another compatible measurement; application code may not branch on `minute`, `kilogram`, or other example vocabulary.

Repair rejection also carries ownership:

- `interpretation` failures may be returned to the model with their exact evidence;
- `compiler` failures stop model correction and identify a local compiler contract defect;
- `catalog` failures stop model correction and identify a missing installed capability contract; and
- browser runtime failures retain their existing isolated-test correction lifecycle.

A compiler or catalog failure remains visible with the saved interpretation and capability-gap detail. Repeated model calls are not a repair for deterministic local ownership failures.

## Consequences

- Correct semantic interpretation no longer fails because the model guessed or omitted a runtime value mode.
- Dependency-created bindings are canonicalized by the same operation schema as directly supplied roles.
- Catalog policy can promote a model-recognized literal unit to its exact local source token without domain vocabulary in core code.
- LLM correction capacity is spent on semantic ambiguity, missing roles, or wrong operation selection rather than compiler defects.
- Essence remains the canonical executable semantic representation, and exact Path signatures remain the reusable local recognition mechanism.
- Catalog migration is incremental; complete binding-schema coverage and automatic versioned capability induction remain future work.

## Alternatives considered

- **Continue asking the model for runtime value modes.** Rejected because a correct interpretation can still fail on a deterministic adapter detail and retries do not make that contract reliable.
- **Infer value modes from role names in core code.** Rejected because it creates an unversioned hidden ontology and prevents each semantic operation from declaring its own contract.
- **Replace Essence and exact Paths with direct model execution.** Rejected because it removes local determinism, browser-local proof, reusable recognition, and the zero-trust execution boundary.

## Security impact

The model's authority is reduced. Role plans remain untrusted proposals, catalog operations remain versioned local code/data, and browser-local compilation and isolated proof remain mandatory before ContextDB mutation or Path persistence. No protected plaintext is added to the server contract.

## Migration

Catalog operations opt into v2 by publishing binding schemas. The activity-observation assertion and quantity query were the first migrated operation pair and retain v1 compatibility for existing saved or in-flight responses. Event counting and entity classification now also declare their role modes after diagnostics showed correct role plans arriving without `actor` and `specific_entity` runtime modes. Other operations continue using v1 bindings until their allowed sources and value modes are declared and tested. Saved Paths remain ordinary compiled Essence transforms and require no representation migration.

## Verification

- A v2 role plan for `I watched thirty minutes of television` compiles quantity, unit, object, and dependent object-kind bindings without model-provided value modes.
- Its paired quantity query compiles `object`, `object_kind`, and `unit`, reduces the proposed `minutes of` span to the `minutes` unit token, and reproduces the locally stored answer.
- The same compiler path handles an unrelated `five kilograms of rice` measurement.
- Compiler-owned binding-contract failures are labeled non-retryable by the model.
- The complete AWS application suite passes.

## Affected repositories

- `architecture`
- `aws`
