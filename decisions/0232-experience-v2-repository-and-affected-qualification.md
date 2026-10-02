# 0232 — Experience v2 repository and affected qualification

Date: 2026-10-02. Status: Accepted development direction; runtime implementation proposed.

## Context

The product owner requests entity Experiences, frontend v2, CLI 2.0 and Inspector 3.0, preserving the existing site as a versioned reference. Blanket full-repository tests on small changes impede iteration. A hard database/runtime reset and fresh acceptance are requested; the exact reset environment is pending and must not be inferred.

## Decision

Create private `onevar-v2` as the new product implementation repository. Preserve `onevar-platform`, original layers and canonical architecture history. Architecture remains the cross-layer source of truth; `onevar-operations` retains account/domain ownership. Proven primitives may be deliberately extracted with provenance/contracts/tests; the new product must not depend on sibling runtime checkouts or silently import the complete old suite.

The active detailed plan is `../../onevar-v2/PLAN.md`. Director handles reuse-oriented authoring; optional scoped Conductor coordinates deterministic behavior; Objects expose typed reusable presentation/action interfaces. Exact entities/bindings/grants and existing general composition semantics govern execution. Models propose and deterministic compiler/trusted host admit. Local Path equations remain the warm typed/spoken/UI execution route. Proposed broader runtime roles do not become implemented by adopting these names.

Fresh iteration gates select affected checks and compact implemented invariants from explicit dependency/contract impact. Unknown/shared changes expand qualification. Independent acceptance consumes public contracts and the exact runtime; it does not duplicate semantics or bypass authority. Complete integration/release qualification remains mandatory at corresponding gates, before publication/promotion. Missing promised evidence cannot pass.

Hard reset is a separately scoped MFA-authorized lifecycle operation, verified by workflow and post-reset evidence. Routine acceptance uses isolated run data and does not erase shared environments. Existing protected/local-first, exact identity, every-node authorization, payment idempotency and projection-completeness boundaries remain intact.

## Consequences and evidence

The new repository starts with bootstrap documents/tooling; v2 runtime, fleet scale and module parity are not implemented or qualified. Existing capability catalog retains reference statuses. This decision authorizes development architecture/repository boundaries, not a production domain cutover or a guessed reset environment. Setup evidence and remaining access are maintained in the active plan and reference-baseline document.
