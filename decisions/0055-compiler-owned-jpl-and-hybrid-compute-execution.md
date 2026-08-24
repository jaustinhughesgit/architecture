# 0055: Compiler-owned JPL and approved adapters form the clean Compute boundary

**Status:** Accepted for Phase 3; clean-platform foundation implemented

## Context

The proof-of-concept proved that JSON programs can make stored entities executable, but it also asked a model to reproduce a private language and sometimes installed npm packages into an otherwise empty runtime. That combined semantic proposal, program authorship, dependency installation, authorization, and execution in one high-variance path. A malformed program could fail late, and two similarly named dependencies could be confused even though names are not identities.

The clean platform needs fast known-path invocation, deterministic installation against browser-local ContextDB, sequential composition, and a controlled escape hatch for capabilities that a bounded declarative program cannot express. It must do so without exposing local graph snapshots to Compute or granting downloaded JavaScript ambient Lambda authority.

## Decision

Models and Convert produce a versioned `CapabilityBuildPlan`, not JPL source, Shorthand rows, entity IDs, permissions, or executable JavaScript. A trusted compiler validates the plan and emits a content-hashed `JplProgram` from a closed, versioned instruction set. The interpreter validates the exact capability, release, operation, declared inputs, program hash, step limit, outputs, and requested effects before returning a typed result.

An installer compiles its own local invocation Path from a published Invocation Frame and owns exact Entity Use Bindings separately. Execution addresses capability, release, operation, installation, dependency, target entity, and target relation by ID. Words nominate discovery candidates only. Compute returns requested effects; the browser verifies the installation binding and atomically applies an allowed ordinary Context transition. Compute never receives or mutates the browser graph directly.

ArrayLogic v1 is a sequential workflow contract. Every step names an exact capability release and operation, and later inputs may reference typed earlier outputs. It is not parallel execution and does not use language matching between steps. Shorthand remains an internal build/patch representation and is not part of the public invocation protocol.

When a capability cannot be expressed by bounded JPL, it may reference an approved JavaScript adapter artifact. Adapters are reviewed, immutable, digest-addressed, prebuilt outside invocation, and classified by authority (`pure`, `network_read`, `file`, or `native`). Runtime installation of arbitrary npm packages and install scripts is forbidden. Network access is host-brokered, file access is scoped, native code uses a separately isolated execution class, and revoked or digest-mismatched artifacts fail closed. Adapter provenance does not grant data access or effect authority.

Capability publication and lexical/Position routing metadata are server-visible ordinary definitions. Discovery must reload the exact authorized manifest before invocation. Publication, discovery, execution, and effect application remain separate receipts.

## Consequences

- The model reasons about user intent and contracts while deterministic code owns executable syntax.
- Known installed invocations require no model call and no capability discovery call.
- A dependency named `current_status` cannot cross-bind between unrelated apps.
- JPL remains useful as a portable, inspectable, low-cost execution representation without becoming arbitrary code.
- Approved adapters broaden capability coverage without making npm a live trust decision.
- New JPL instructions, adapter authorities, workflow policies, or protected references require versioned contracts and conformance tests.
- Rich generation, Position reranking, middleware, voice, durable workflows, and production adapter infrastructure remain Phase 3 work; this decision does not mark Phase 3 complete.

## Alternatives

- **Let the model author JPL directly.** Rejected because syntax reliability and authorization cannot depend on the model learning a private language in every prompt.
- **Store and execute arbitrary generated JavaScript.** Rejected because it collapses program generation, package supply chain, network/file authority, and data authorization.
- **Build every capability as a Lambda.** Rejected because deployment latency and per-capability infrastructure would undermine local-first iteration and low-cost composition.
- **Use names to bind local data.** Rejected because names are ambiguous relevance signals, not stable execution identities.
- **Copy a creator's Path.** Rejected because the creator did not prove the installer's wording, local graph, or authority.

## Affected repositories

- `architecture`: this decision, execution representations, capability catalog, and clean-room roadmap.
- `onevar-platform`: contracts, deterministic compiler/interpreter, browser-local installation/effect application, API publication/discovery/invocation, workflow runtime, adapter boundary, and reset-gated acceptance.
- `onevar-operations`: later artifact signing, promotion, revocation, and deployment policy.
- POC repositories remain behavioral evidence and are not runtime dependencies.

## Security impact

Ordinary capability definitions and routing cards contain no protected plaintext. Exact session identity controls publication and invocation; visibility never grants mutable Context access. Requested effects are inert until the browser validates the exact installation binding and current value. Adapter code receives only declared inputs and explicit brokers, never ambient credentials or an unrestricted filesystem/network. Phase 3 contracts reject protected references.

## Migration

The clean platform starts with schema version 1 and imports no POC JPL, Shorthand, Paths, or npm installation state. A future migration may translate an inspected POC capability into a build-plan proposal, but the clean compiler, release, installation, and tests must recreate and validate every artifact.

## Verification

- Compile a car-wash plan into deterministic hash-pinned JPL and reject malformed plans.
- Discover the published capability from a second clean identity, synthesize a caller-local Path, bind its exact current-condition relation, invoke it, and atomically change `dirty` to `clean`.
- Repeat the same phrase without discovery or a model call.
- Prove two equal dependency display names with different IDs cannot cross-bind.
- Run sequential workflow steps through exact typed output references.
- Test approved CommonJS, ESM, async, transitive, file, network, and native/negative adapter classes; reject install scripts, digest mismatch, undeclared hosts/effects, and state leakage.
- Reset capability definitions, installations, Paths, Context, and receipts before and after browser acceptance.
