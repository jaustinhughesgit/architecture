# 0064: Phase 3 releases the governed non-protected JPL boundary

**Status:** Accepted for Phase 3 closeout

## Context

Phase 3 implemented strict contracts and deterministic foundations for JPL, JavaScript adapters, ArrayLogic, and target-first Entity Middleware. Those foundations do not yet have equal production authority. A reviewed adapter still needs a signed artifact plus an operating-system or container boundary. Active middleware still needs a trusted canonical lineage resolver and a current `use` decision at every node. Compensation still needs explicit inverse operations, grants, effect order, and audit. Those are Phase 4 governance capabilities. Enabling them before those controls exist would turn conformance evidence into an unsupported security claim.

## Decision

The Phase 3 production execution boundary is ordinary, non-protected, compiler-bounded JPL v1:

- Convert freezes an answer plan before proposing a typed fixed-transition contract.
- Trusted code owns IDs, direct Invocation Frames, JPL syntax, package hashing, installation, exact binding, and effect validation.
- Executable programs exist only in immutable content-addressed S3 packages. DynamoDB stores the bounded manifest, descriptor, routing metadata, release state, and expiring idempotency receipt. Discovery reloads and verifies S3 before returning executable content.
- ArrayLogic v1 sequences exact installed operations and durably checkpoints typed results and local effects. Its only released compensation policy is explicitly `none`.
- Ordinary voice crosses `getUserMedia`, AudioWorklet, a dedicated encoder worker, transient transcription, and the same typed dispatcher. Protected voice remains excluded.
- Model promotion requires the deployed 50-case authoring suite to pass at 98 percent or better with zero critical failures. Sanitized provider token receipts remain on the durable job so release evidence includes cost inputs without prompts, secrets, or protected data.

JavaScript adapter execution, non-`none` compensation, and active middleware transport remain fail-closed. Their Phase 3 schemas, fixtures, and pure runtimes are compatibility foundations, not callable production features. Phase 4 may enable them only with package signing and review, isolated execution cells, canonical lineage resolution, per-node grants, audit, and protected-reference rules as applicable.

This decision narrows the production timing in decisions 0055 and 0063; it does not remove their contracts or long-term architecture.

## Consequences

- Phase 3 can close without weakening the zero-trust model.
- npm package use cases remain tested, but no package is dynamically installed or executed during a production invocation.
- First-response child middleware semantics remain stable while caller-supplied lineage never becomes authority.
- Workflow compensation cannot be inferred from forward effects, prompts, or presentation text.
- The exact Phase 3 release can be promoted and rolled back independently of Phase 4 governance work.

## Security impact

The callable Phase 3 runtime receives only manifest-declared ordinary inputs and can request only compiler-declared ordinary fixed transitions. The browser remains the authority that verifies the exact installation binding and commits the allowed effect. Protected references, ambient credentials, arbitrary JavaScript, dynamic npm installation, caller-authored middleware chains, and inferred inverse effects are rejected.

## Verification

- Deterministic tests prove exact binding, effect application, S3 package verification, release revocation, workflow retry and reload behavior, adapter conformance, and middleware stop semantics.
- DynamoDB tests prove capability rows contain no executable program.
- A development-only paid evaluation runs all 50 cases through the normal durable API and deletes its releases afterward.
- A deployed ordinary-voice acceptance sends synthetic non-user speech through the browser media pipeline and verifies voice provenance in the local trace.
- Development and production promotion run reset-gated acceptance against the exact CloudFront output.

## Affected repositories

- `architecture`: this decision, roadmap, catalog, and execution representation status.
- `onevar-platform`: manifest-only Dynamo records, S3 round-trip verification, durable provider usage receipts, deployed model evaluation, voice acceptance, and release documentation.
- `onevar-operations`: production promotion, health evidence, and exact rollback target.

