# Execution Envelopes and Governed Interaction

**Status:** Implemented foundation. The v1 contract and initial producers/consumers exist; complete legacy and effect adoption remains migration work.

## One shape, three authorities

The [execution envelope v1](../contracts/execution-envelope.v1.schema.json) gives the platform one traceable shape:

```text
execution-invocation
  → one declared plane and target
  → execution-result
      → bounded output/error
      → typed effects with requested/authorized/applied/denied state
```

It does not merge authority:

- `browser-main` owns trusted local coordination, validated Paths/Essences, ContextDB, commands, and presentation. Trusted browser workers may implement this plane without becoming dynamic entity-code hosts.
- `file-worker` runs dynamic local entity functions away from the main thread. It may return requested effects, but cannot claim that navigation, communication, governance, or other effects were applied.
- `compute-jpl` runs governed server entities/JPL. It rechecks server authorization and reports server-side effects independently of browser authority.

Executable source is forbidden inside the envelope. Dynamic script remains in the existing entity/file loading channel and runs only in `fileWorker`; JPL remains structured server data.

## Intent jurisdiction

The [intent-jurisdiction v1](../contracts/intent-jurisdiction.v1.schema.json) decision records the speech act, lowest sufficient effect class, artifact decision, evolution outcome, reason code, and target evidence. Browser Path execution distinguishes graph reads, fact writes, local commands, Compute invocation, Path repair, and clarification. Compute discovery distinguishes reuse, compatible repair, fork, and new build. The legacy `extend` response remains during migration, but its typed `evolution.outcome` removes ambiguity: a failure inside an existing operation is `repair`; adding an operation is `fork`.

## Interaction convergence

Browser-local execution currently emits:

- applied `read`/`write` effects for proven ContextDB work;
- requested `presentation` effects consumed by Message;
- requested `communication:speak` effects consumed by Message and queued to Automation;
- requested `navigation` or `automation` effects consumed by the registered main-thread command path.

Legacy fields remain as compatibility fallbacks. A consumer prefers the governed effect and uses the legacy field only when an older producer has no v1 envelope.

## Shared and collected data

Cross-person collection is a graph operation, not a new Compute capability. A coordinated referent such as “Austin and I” compiles to a bounded entity set. Each named person is hydrated through exact-profile resolution and server authorization; `speaker` remains the authenticated caller. The local query can aggregate only records already returned through those authorized partitions.

The quantity catalog now owns a vocabulary-neutral group-current operation. Its bound owner set joins each authorized owner's observation records and sums distinct record identities. Thus Austin's two dogs plus the caller's one dog yields three without a dog-specific rule. The bound set cannot broaden hydration, invent a grant, read protected plaintext, or turn candidate-only Position/Search postings into facts.

## Remaining migration

- carry v1 through every legacy entity/file/Convert/Shorthand call;
- inventory and declare all JPL and worker effects before application;
- complete immutable repair/fork releases, installations, promotion, and dependency compatibility;
- migrate all communication, streaming, email, sound, menus, and navigation consumers;
- add durable cross-plane traces without storing prompts, protected values, or arbitrary payloads.
