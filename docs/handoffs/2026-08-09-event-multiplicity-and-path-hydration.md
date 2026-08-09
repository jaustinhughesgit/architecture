# Event Multiplicity and Path Hydration Handoff

## Objective

Make quantified repeated events general and Path-driven. Given two existing pass events, `Amy had two more good passes to Mia.` must add a quantity of two, and the count query must return four. This must work through reusable semantic operations, Path signatures, and ContextDB—not soccer-specific code.

## Root cause found

The review bundle showed two separate problems:

1. The learned statement Path changed the established graph predicate from `observe_event` to `observe_activity`. It therefore stored the new fact in a graph the existing count query did not read.
2. Event counting counted records, not their multiplicity. A record representing “two more” contributed one instead of two.

## Completed and published

### AWS repository

- `14342518` — Aggregate quantified event multiplicity. `contextdb.event-observation@1/assert` accepts an optional quantity, and event counts use `sum_property_or_default`, treating explicit quantities as their value and ordinary records as one.
- `6374c450` — Preserve learned statement graph continuity. Candidate Paths that uniquely overlap an established statement must retain its literal graph predicate; ambiguous evidence fails open. This is vocabulary-independent.
- `a7a67758` — Accept current new-user response envelopes.
- `6aea826e` — Preserve queued input during Path hydration.
- `76e5f386` — Bound identity Path hydration reads with a 12-second timeout so local fallback can occur.

The AWS suite passes: **302/302 tests**.

### Architecture repository

- `36d58e0` — Document event multiplicity aggregation.
- `b61f2c8` — Document statement graph continuity.
- `5243cfc` — Document queued Path hydration lifecycle.
- `b7d9a44` — Document bounded Path hydration reads.

## Live-browser status and remaining blocker

### Follow-up resolution

Review bundle `path-context-review-2026-08-09T18-42-19-594Z.json` identified the concrete convergence loop: the foundation contract required `event_count_query` revision `semantic-entity-dataset-v2`, while the bundled equation still declared `semantic-entity-dataset-v1`. Consequently, two required Paths always appeared missing, all 25 processing Paths were repeatedly recompiled, and hydration readiness never became usable. AWS commit `dd19efc3` aligns the bundled revision, adds a contract test covering every required foundation revision, and advances the browser/worker asset revision. The targeted suite passes 64/64. Live deployment retesting remains pending.

A clean account was created at:

`https://1var.com/1v4rae3df79e-64b5-4a63-85e7-d89ce2bd7bf7`

Path Builder reported all 25 foundation processing Paths installed and passing. Asset phase `phase78-path-hydration-timeout-1` and the deployed 12-second timeout were confirmed. However, Message remained at “Loading the local Path foundation…”. The queued first input was preserved correctly, but after about 45 seconds it failed with:

`The local Path library did not finish loading.`

Therefore the generalized compute behavior is proven by tests, but the clean live four-message scenario has **not** yet been completed. Do not report it as live-verified.

The likely remaining issue is a hydration lifecycle race: Path Builder has the foundation, but Transcribe never receives or retains `hydrationReady: true` for the latest identity/revision.

## Next investigation

1. Trace `pathbuilder:hydration-status` and `pathbuilder:paths` payloads, including `primarySu`, hydration revision, `foundationReady`, and `hydrationReady`.
2. Check both server-hydration runs: the initial URL identity and the later primary-identity event. Determine which revision settles and publishes.
3. Ensure the latest successful/fallback hydration publishes readiness to Transcribe and cannot be overwritten by an older revision.
4. From a clean reset/account, test in order:
   - `Amy had a good pass to Sarah.`
   - `Amy had another good pass to Mia.`
   - `Amy had two more good passes to Mia.`
   - `How many effective passes did Amy have?` → `4`
5. Confirm diagnostics show the statement using `contextdb.event-observation@1/assert` with quantity `2` and predicate `observe_event`; the query must use `contextdb.event-observation@1/count` with `sum_property_or_default`.
6. Prove generalization with unrelated vocabulary, such as two ordinary review events followed by “three more,” expecting five.

## Retest hygiene

Old accounts can retain the previously learned `observe_activity` Path and incompatible protected graph data. Use Back to undo those inputs or use a clean reset/account. Deployment does not reinterpret existing browser-local protected state.
