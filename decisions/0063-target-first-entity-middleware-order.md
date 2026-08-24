# 0063: Entity middleware runs from the selected target to its owning ancestors

**Status:** Accepted; clean runtime implemented, active transport adoption pending

## Context

An entity child can specialize, intercept, or completely handle behavior inherited from an owning parent. The product rule is first response stops the chain. A root-first traversal would let a general parent answer before the selected child can specialize the request, which reverses that rule and makes derived entities unreliable as middleware.

Earlier middleware documentation froze root-to-target order before this product invariant was made explicit. The clean Phase 3 contract and runtime already implement the intended child-first behavior.

## Decision

- Resolve exactly one owning `extend` lineage for the selected target.
- Invoke the selected target first, followed by its owning ancestors from nearest parent to root.
- Authorize the current entity/version and exact handler before every invocation.
- Continue only after `pass`. The first `respond` or `fail` terminates the chain immediately.
- Reject cycles, ambiguous owning parents, inconsistent lineage, and depth overflow before execution.
- Exclude `map`, `link`, `use`, and `substitute` edges from middleware ancestry.

This decision supersedes only the root-to-target ordering language in decision 0027. Its composition, governance, lifecycle, audit, and Protected Asset boundaries remain accepted.

## Consequences

A derived child can act as an override or pre-handler without changing its parent. A parent remains a fallback shared by its children. First-response behavior is deterministic and does not require model arbitration. A caller-supplied lineage is never authority; a trusted resolver must build the exact target-to-root chain from current owning relations.

## Security impact

Child-first order does not allow a child to grant itself parent authority. Every node still requires a current exact `use` authorization and independently validated effect boundary. Non-owning references never become executable ancestry, and protected plaintext does not cross execution planes.

## Verification

The clean runtime validates target-first lineage and proves that a child `respond` stops before its parent, a child `pass` reaches its parent, a failure stops the chain, and malformed lineage fails closed. Browser, `fileWorker`, and server transport adoption remains a Phase 3 integration gate.

