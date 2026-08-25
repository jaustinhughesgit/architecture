# 0071: Minimize protected requirements and execute browser-local Compute by exact ID

**Status:** Accepted. The bounded clean owner-local Phase 4C candidate is implemented and locally verified; deployment evidence is pending. Trusted-server protected execution remains incomplete and fails closed.

## Context

Some capabilities genuinely need a protected value, while others can operate on ordinary surrounding facts without it. A cat-food calculation needs a protected cat count. An activity recommendation based on an unnamed friend's age and interests does not need that friend's protected name. Passing all protected context to an LLM, Path, or server would violate data minimization and become more dangerous and expensive as protected assets grow into the millions.

Semantic wording is appropriate for capability discovery and first local reconciliation, but it is not stable execution identity. The clean Compute design already separates word/Position relevance from exact IDs. Protected Compute must preserve that rule and cannot make the model the author of JPL, IDs, grants, or cryptographic routing.

## Decision

Every operation names an execution plane. The initial protected plane is `owner_local_protected`. Convert's two structured model stages may propose only safe typed protected requirement metadata and one bounded numeric formula; protected values are absent. Trusted code freezes semantic meaning, turns first-stage invocation phrases into compiler-owned zero-slot frames, allocates requirement IDs, rejects protected inputs that are unused, slotted, nonnumeric, effects, or direct outputs, and compiles hash-pinned arithmetic JPL.

On first use, each compiler-owned requirement selector resolves to exactly one active browser-local protected Context binding. The installation stores a versioned protected Compute binding containing exact capability/version/operation/requirement, protected binding/version, asset/version, and program-hash identity. Repeat execution follows that exact binding ID. A rotated fact permits one unique selector reconciliation to a replacement exact ID; missing or ambiguous state fails closed.

A direct owner invocation creates one exact one-use grant. Only the protected worker decrypts selected assets, injects their typed values into the verified JPL program, executes, and formats the response. The response is transient protected presentation. Durable ordinary Compute receives only a value-free receipt. The API rejects local protected operations, and it also rejects `trusted_server_protected` because executor key wrapping and a server-use grant do not yet exist. There is no fallback between planes.

## Consequences

- Protected input minimization is compiler-enforced, not merely requested in a prompt.
- Word/Position relevance still finds capabilities; exact IDs and hashes control protected use.
- Unrelated local protected assets are not bound or decrypted.
- Existing ordinary content-addressed packages retain their original hash and default server semantics when the new optional fields are absent.
- The first slice is owner-only, local, transient, numeric, and directly invoked. It does not yet authorize protected workflows, schedules, effects, files, provider calls, arbitrary JavaScript, cross-user service execution, text derivation, or hardware-gated use.
- Trusted-server use requires a separate executor wrap, exact provider/host/action/purpose grant, isolated plaintext lifetime, and value-safe audit. It cannot be enabled by changing a local mode field.

## Verification

Compiler, generator, API, and package tests cover deterministic formula continuity, no model-authored IDs/JPL, no unused or direct protected output, server rejection, finite arithmetic, value-free receipts, and legacy package compatibility. A clean Chromium proof authors and runs a protected cat-food calculator while an unrelated protected best-friend value also exists. It asserts zero protected/derived values in requests or durable review, zero server invocation calls, exact binding reuse on the second run, and one exact binding rotation after a replacement protected assertion.
