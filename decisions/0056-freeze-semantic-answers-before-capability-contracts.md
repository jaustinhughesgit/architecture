# 0056: Freeze semantic answers before capability contracts and compiler output

**Status:** Accepted for Phase 3; clean-platform foundation implemented; ordinary-transition second stage narrowed by decision 0078

## Context

The proof-of-concept sometimes asked one model response to infer the requested behavior, decide whether data was available, invent a capability schema, and author private executable representations. A syntactically valid result could therefore drift from an obvious user answer, while retries could produce a different effect. Capability authoring also outlives one Lambda request and must survive browser refreshes and duplicate polls.

## Decision

Convert submits ordered requirement segments plus at most 20 recent ordinary interaction summaries and 200 related ordinary entities. Protected evidence is not accepted. A versioned first structured response answers what useful behavior is requested, whether it is computable, its typed inputs, state effect, response intent, and generalized invocation phrases. The service freezes and fingerprints that semantic answer plan before requesting a second structured response.

For the supported ordinary current-property transition, decision 0078 now requires trusted code to derive the capability contract directly from this fingerprinted answer. Other supported shapes may use a separately validated human-readable contract proposal when their complete presentation contract is not represented in the first schema. Trusted code rejects effect, value-domain, required-input, or fingerprint drift; allocates all opaque IDs; materializes a typed build plan; and invokes the deterministic JPL compiler. No model response may contain JPL, Shorthand, ArrayLogic, JavaScript, permissions, provider credentials, packages, URLs, or entity/relation/capability IDs.

The lifecycle is a revision-checked durable job. Polling advances at most one state transition, short leases prevent duplicate model starts, provider response IDs allow fresh Lambda requests to resume background work, and publication is idempotent. A completed job is not proof of general model quality; representative evals and browser acceptance remain release gates.

## Consequences

- The model's strongest generalization ability is applied to the question before executable structure can distract it.
- A frozen answer is reviewable and stable across background polling, correction, and compilation.
- Strict JSON schemas improve syntax reliability, while deterministic semantic checks and isolated tests own correctness.
- The current clean compiler supports bounded current-property transitions; other answer intents remain explicit unsupported work rather than silently malformed programs.

## Alternatives

- **Generate JPL directly.** Rejected because it combines semantic and private-language failure modes.
- **Generate contract and answer together.** Rejected because a contract can rationalize away the user's obvious requested outcome.
- **Trust structured output without semantic validation.** Rejected because schema validity does not prove continuity or authority.

## Affected repositories

- `architecture`: this decision, roadmap, capability catalog, and execution model.
- `onevar-platform`: authoring contracts, generator, API job state, Convert UI, compiler, tests, and deployment configuration.

## Security impact

Only bounded ordinary evidence enters model requests. The server derives the owner from the session and hashes it for provider safety correlation. Model output never grants permission or selects an opaque execution identity. Provider keys remain Secrets Manager references and are absent from browser state, jobs, packages, and logs.

## Migration

No proof-of-concept prompt or generated JPL is imported. New clean builds begin at prompt/schema v1. Changing either stage's meaning requires a new prompt/schema version and eval comparison.

## Verification

- Prove answer-plan completion and fingerprint freeze precede contract generation.
- Reject a contract that cites another fingerprint or changes the frozen transition, value domain, or required inputs.
- Reject model-invented IDs and executable fields.
- Resume the job across fresh service calls and concurrent revision checks.
- Run reset-gated Convert and cross-user install/invocation acceptance.
