# File Worker Isolation

**Status:** Implemented operational isolation and envelope foundation; partial security hardening

`fileWorker` is 1var's local dynamic-script execution plane. It moves entity loading and execution away from the browser's trusted main UI thread. The primary runtime and child entities communicate with a dedicated worker using structured messages and transferable results. See [decision 0024](../../decisions/0024-dynamic-local-entity-code-runs-in-fileworker.md).

## Execution-plane contract

| Plane | Owns | Must not silently own |
| --- | --- | --- |
| Browser main thread | trusted Path/Essence processing, ContextDB, command and navigation coordination, permission prompts, and validated rendering | evaluation of dynamic entity or user-authored script source |
| `fileWorker` | dynamic local entity functions, bounded entity bundle loading, worker-safe transformations, and approved local network work | DOM access or direct authority to render, navigate, communicate, automate, or use protected assets |
| Compute/JPL | authorized server execution, provider interaction, persistence, shared jobs, and governed server capabilities | plaintext local-only or zero-knowledge data that the user did not release |

The planes are composable. A Path can invoke an entity, the entity middleware can select a local worker function or server capability, and the result can return through the same authorized response contract. Placement changes the executor, not the entity's identity, lineage, permissions, provenance, or audit requirements.

[Execution-envelope v1](../../contracts/execution-envelope.v1.schema.json) now freezes the common invocation/result/effect fields. A `file-worker` result may carry only requested effects back to the trusted coordinator; it cannot label an effect applied. The envelope forbids executable source, so dynamic entity code remains in the existing isolated entity/file loading channel rather than crossing as an effect payload.

## Why it exists

- Entity work should not freeze rendering, input, audio controls, or other main-page behavior.
- The page should interact with a narrow worker protocol rather than directly sharing every internal execution object.
- Worker failure and heartbeat state can be observed independently from the UI.
- A future hardened runtime can preserve this boundary while replacing the implementation behind it.

The worker loads entity bundles, resolves modules/actions/functions, performs allowed network work, and returns data to the main runtime. Parent/child composition therefore remains possible without compiling all entity behavior on the UI thread.

Worker output may contain structured values, transferable binary data, or declarative requests for presentation and platform effects. HTML/CSS, commands, navigation, automation, communication, and protected-asset requests do not execute merely because a worker returned them. A trusted main-thread module must validate the output schema and authorize the requested effect. Presentation must reject scripts, event-handler attributes, unsafe URLs, and other executable markup before insertion.

**Current evidence:** the browser creates a worker for entity execution, sends root/child entity messages, dynamically compiles supported functions inside that worker, validates optional v1 invocations, and correlates structured results plus requested effects. This proves the operational and contract seam, not a complete policy boundary.

## Security boundary

A same-origin Web Worker is useful isolation, but it is **not a complete sandbox**. The current worker can run dynamically constructed functions and can access ambient same-origin network capabilities. It shares the application's origin unless explicitly restricted. Current presentation paths also require stronger sanitization and Content Security Policy enforcement before arbitrary declarative output can be treated as hostile-input safe.

Do not describe `fileWorker` as protection against malicious entity code until the platform adds a hardened execution boundary such as a strictly declarative interpreter, capability-scoped worker protocol, isolated origin, process boundary, or equivalent controls.

## Required invariants

- Messages must use versioned, validated schemas.
- Entity code receives explicit capabilities, not ambient access to all browser resources.
- Network hosts, credentials, storage, protected assets, and UI commands require separate grants.
- Every request and response needs correlation, timeout, cancellation, and bounded payload behavior.
- Worker crashes must fail the current invocation without corrupting main-page state.
- The main thread must never evaluate function source returned by an entity or worker.
- Declarative HTML/CSS and platform-effect requests must be sanitized, schema-validated, and separately authorized.
- Dynamic code generation should be eliminated or constrained by a versioned JPL interpreter and policy.
