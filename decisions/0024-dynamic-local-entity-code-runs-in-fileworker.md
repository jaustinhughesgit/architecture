# 0024: Dynamic Local Entity Code Runs in `fileWorker`

- Status: Accepted
- Date: 2026-08-11

## Context

1var entities can contain dynamic functions and presentation material while the browser main thread also owns reusable interpretation, local graph state, input, audio, navigation, and rendering. Executing entity-authored JavaScript directly on that thread would let a slow or faulty function block the interface and would mix dynamic code with the trusted coordinator. Compute/JPL is a separate server execution boundary and cannot replace local-first execution or receive local-only protected plaintext.

The current `fileWorker` proves an operational boundary: entity bundles and functions can execute in a Web Worker and exchange structured messages with the page. A same-origin worker with dynamic compilation and ambient network capabilities is not, by itself, a hardened malicious-code sandbox.

## Decision

1var uses three explicit execution planes:

1. The **browser main thread** executes trusted reusable 1var modules: Path and Essence processing, ContextDB, commands, navigation, permission coordination, and validated rendering.
2. **`fileWorker`** executes dynamic local entity or user-authored scripts. Dynamic script source never executes on the main thread and the worker has no direct DOM authority.
3. **Compute/JPL** executes authorized server work, provider interactions, persistence, and shared jobs.

Workers return structured values, transferable data, or declarative presentation and platform-effect requests. A trusted main-thread module validates schema, size, URLs, presentation safety, target capability, and action-level authorization before rendering or causing navigation, automation, communication, protected-asset use, or another effect.

Execution placement does not change entity identity, lineage, version, provenance, permissions, audit, or middleware semantics. Root-to-target middleware may invoke either local-worker or Compute behavior behind the declared entity contract.

## Alternatives considered

- **Evaluate dynamic entity JavaScript on the main thread.** Rejected because it mixes untrusted/dynamic work with the UI coordinator and risks responsiveness and state integrity.
- **Run every function on Compute.** Rejected because it breaks local-first/offline behavior and can violate zero-knowledge boundaries.
- **Call the current worker a security sandbox.** Rejected because same-origin authority, dynamic compilation, resource policy, output sanitization, and network restrictions are incomplete.
- **Forbid dynamic local functions immediately.** Rejected as an incompatible removal of an established capability; the boundary can be hardened or replaced behind the same protocol.

## Consequences

- The main thread remains responsive and does not compile dynamic entity functions.
- Worker crashes can be contained to an invocation when correlation, timeout, cancellation, and state-commit rules are followed.
- Entity HTML/CSS is declarative output, not automatic authority. Trusted presentation code must sanitize it and reject script, event-handler, unsafe URL, and equivalent executable content.
- Worker protocols need versions, schemas, capability grants, resource limits, cancellation, network policy, audit, and bounded payloads.
- Existing same-origin dynamic execution remains **Partial security hardening** until those controls are proven.

## Security impact

The decision narrows the main-thread trust boundary but does not claim hostile-code containment. Protected assets, credentials, storage, network hosts, commands, communication, and UI effects require separate grants. Content Security Policy, sanitization, isolated origins or a declarative interpreter, resource quotas, and removal or confinement of dynamic compilation remain required hardening options.

## Migration and compatibility

Preserve the current entity and worker message contracts while versioning them. Remove any main-thread fallback that evaluates function source. Route entity scripts through `fileWorker`, route server JPL through Compute, and adapt callers to structured/declarative results. Audit current rendering paths for unsafe HTML/CSS insertion before treating arbitrary entity output as hostile-input safe.

## Verification

Test that dynamic function source is never evaluated on the main thread; root/child middleware order and response bubbling; schema rejection; unsafe markup and URL rejection; permission denial; protected-asset isolation; timeout, cancellation, crash recovery, and payload limits; UI responsiveness; worker network policy; server/local placement equivalence for declared pure contracts; and CSP behavior.

## Affected repositories

- `architecture`
- `aws`
- `compute`
