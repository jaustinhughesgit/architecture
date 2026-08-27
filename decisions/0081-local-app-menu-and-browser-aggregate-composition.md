# 0081: Local app menu and browser aggregate composition

**Status:** Accepted, implemented, and development-proven.

## Decision

Represent an app as immutable bundle releases and a user's access to it as a separate local menu projection. A bundle pins one root capability, supporting entities, optional ArrayLogic release, and view. A menu entry owns aliases, source, lifecycle, and permissions. Natural names may nominate a unique entry, but stored focus and execution use exact IDs.

Resolution is ordered: existing exact Path; matching open-app entities; the rest of the user's active menu; authorized global discovery. Focused ContextDB entity IDs may break an otherwise-equal lexical tie only after ownership and semantic compatibility are proved. Opening a view and invoking a capability are separate intents.

Compile declared event analytics into general browser-local `record_event` and `aggregate_events` capabilities. ArrayLogic sequences the root operation before recording, so prose cannot masquerade as a successful event. Aggregates support count, sum, exact filters, and grouping over exact app/stream identity. Browser-local descriptors execute only in the isolated Context worker; server JPL rejects them.

Builder entries receive local authoring authority. A shared app installed through first use is read/use-only. `fork <app name>` creates a user-owned composition over the same immutable root while excluding the source's supporting composition; direct collaborative write still needs a governed grant. Protected plaintext is excluded from focused authoring context. User-facing input Undo/Back is explicitly deferred.

## Consequences

- People can say `open car wash app` rather than paste a capability ID.
- Convert double tap/hold and `improve app:` create the same typed intent.
- Focus affects candidate priority, not permissions.
- App releases, workflow releases, packages, and receipts remain immutable and inspectable.
- Removing a menu entry does not delete source entities or history.
- App-authored analytics replace fixed platform analytics.
- Cross-device menu synchronization and direct collaborative write grants need independent authorized transport contracts.

## Evidence

Development release `9f8306b` passed GitHub run `33038391956`: 21 reset-gated deployed browser scenarios and one live `gpt-5.4-mini` Convert canary. The live proof used one provider response, registered the built app, advanced it to immutable app v2, committed the root transition before one browser-local event, and returned an exact aggregate count of one. The final private hard reset deleted 262 runtime records and 4 generated artifacts; a post-reset inventory observed zero of each.
