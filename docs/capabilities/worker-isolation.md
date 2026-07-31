# File Worker Isolation

**Status:** Implemented operational isolation; partial security hardening

`fileWorker` moves entity loading and execution away from the browser's main UI thread. The primary runtime and child entities communicate with one dedicated worker using structured messages and transferable results.

## Why it exists

- Entity work should not freeze rendering, input, audio controls, or other main-page behavior.
- The page should interact with a narrow worker protocol rather than directly sharing every internal execution object.
- Worker failure and heartbeat state can be observed independently from the UI.
- A future hardened runtime can preserve this boundary while replacing the implementation behind it.

The worker loads entity bundles, resolves modules/actions/functions, performs allowed network work, and returns data to the main runtime. Parent/child composition therefore remains possible without compiling all entity behavior on the UI thread.

## Security boundary

A same-origin Web Worker is useful isolation, but it is **not a complete sandbox**. The current worker can run dynamically constructed functions and can access allowed browser network and storage capabilities. It shares the application's origin and authority unless explicitly restricted.

Do not describe `fileWorker` as protection against malicious entity code until the platform adds a hardened execution boundary such as a strictly declarative interpreter, capability-scoped worker protocol, isolated origin, process boundary, or equivalent controls.

## Required invariants

- Messages must use versioned, validated schemas.
- Entity code receives explicit capabilities, not ambient access to all browser resources.
- Network hosts, credentials, storage, protected assets, and UI commands require separate grants.
- Every request and response needs correlation, timeout, cancellation, and bounded payload behavior.
- Worker crashes must fail the current invocation without corrupting main-page state.
- Dynamic code generation should be eliminated or constrained by a versioned JPL interpreter and policy.

