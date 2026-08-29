# Decision 0110: Advanced execution is signed, exact, and explicitly reversible

## Decision

JavaScript Compute escapes bounded JPL only through signed, independently reviewed, immutable adapter releases. Review freezes package version, content digest, execution class, broker authority, and allowed hosts. A fresh bounded worker or separately admitted container runs the artifact; invocation-time npm installation and ambient network/filesystem authority are forbidden.

Middleware transport binds every exact leaf-to-root entity node to browser, file, or Compute authority before execution. Authorization is per node and the first response or failure stops the chain.

ArrayLogic compensation is never inferred. `explicit_reverse` requires exact inverse capability/version/operation contracts for all forward steps and executes them in reverse commit order. Incomplete compensation remains explicit evidence.

Real provider writes require immutable reviewed catalog entries, protected user-owned credentials, provider idempotency or a separately reviewed recovery contract, and committed effect proof. The first admitted network write is Todoist task creation with invocation-scoped `X-Request-Id`. Unknown or unavailable packages and operations fail closed.
