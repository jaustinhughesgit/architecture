# 0081: Local app menu and browser aggregate composition

**Status:** Accepted, implemented, and development-proven.

## Decision

Represent an app as immutable bundle releases and a user's access to it as a separate local menu projection. A bundle pins one root capability, supporting entities, optional ArrayLogic release, and view. A menu entry owns aliases, source, lifecycle, and permissions. Natural names may nominate a unique entry, but stored focus and execution use exact IDs.

Resolution is ordered: existing exact Path; matching open-app entities; the rest of the user's active menu; authorized global discovery. Focused ContextDB entity IDs may break an otherwise-equal lexical tie only after ownership and semantic compatibility are proved. Opening a view and invoking a capability are separate intents.

Natural app-surface commands are recognized before a currently selected Convert lane decorates text. `menu`, `open`, and inspection commands remain local navigation even when Convert is visible; an explicit `convert:` prefix remains capability authoring.

Compile declared event analytics into general browser-local `record_event` and `aggregate_events` capabilities. ArrayLogic sequences the root operation before recording, so prose cannot masquerade as a successful event. Aggregates support count, sum, exact filters, and grouping over exact app/stream identity. Browser-local descriptors execute only in the isolated Context worker; server JPL rejects them.

Builder entries receive local authoring authority. A shared app installed through first use is read/use-only. `fork <app name>` creates a user-owned composition over the same immutable root while excluding the source's supporting composition; direct collaborative write still needs a governed grant. Protected plaintext is excluded from focused authoring context. User-facing input Undo/Back is explicitly deferred.

Focused composition does not require a builder to invoke a new root capability first. If no installation exists, it creates an exact local root installation anchor with no bindings and pins it into the workflow. The anchor grants no data authority. The first matching invocation deterministically completes that same installation ID with one exact dependency binding, so workflow step identity remains stable and no hidden lifecycle action is required.

## Consequences

- People can say `open car wash app` rather than paste a capability ID.
- Convert double tap/hold and `improve app:` create the same typed intent.
- Focus affects candidate priority, not permissions.
- App releases, workflow releases, packages, and receipts remain immutable and inspectable.
- Removing a menu entry does not delete source entities or history.
- App-authored analytics replace fixed platform analytics.
- Builders can extend an app immediately after Convert without a synthetic first execution.
- Cross-device menu synchronization and direct collaborative write grants need independent authorized transport contracts.

## Evidence

Development release `9f8306b` passed GitHub run `33038391956`: 21 reset-gated deployed browser scenarios and one live `gpt-5.4-mini` Convert canary. The live proof used one provider response, registered the built app, advanced it to immutable app v2, committed the root transition before one browser-local event, and returned an exact aggregate count of one. The final private hard reset deleted 262 runtime records and 4 generated artifacts; a post-reset inventory observed zero of each.

Lifecycle repair release `3a2a528` passed 27 local browser scenarios, 21 reset-gated deployed scenarios, and the paid live `gpt-5.4-mini` authoring canary in GitHub run `33041544933`. The proof advanced a newly built app from v1 to v2 before its root capability had ever run, then completed the same pre-created installation anchor on the first matching utterance, committed the exact `dirty` to `clean` transition, and recorded one browser-local event. The final private hard reset deleted 129 runtime records and 2 generated artifacts; an independent dry-run inventory observed zero of each.
