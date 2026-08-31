# 0121: Equivalent owner Convert builds advance one app lineage

**Status:** Accepted and implemented; development deployment proof pending.

## Decision

An equivalent repeated plain Convert build by the same owner creates a new immutable version of the existing app rather than another active app. Generated capability IDs and content-addressed packages remain distinct exact execution evidence. The app ID remains stable, bundle vN+1 points to the new root capability release, `supersedesVersion` records lineage, and the prior bundle remains inspectable.

Equivalence requires a root-only owner-built app and either normalized operation-contract plus Invocation Frame agreement or substantial retained requirement evidence from the repeated Convert request. This must never merge different publishers, marketplace installations, supporting compositions, ArrayLogic workflows, or unrelated requests.

The local lifecycle removes redundant menu and Sunburst projections, not packages or bundle history. Existing legacy duplicate roots resolve to the newest equivalent release on open and retire only their redundant local menu projections. Derived attention classifies the release as `app.updated`.

## Consequences

- People see and open one app after rebuilding the same thing.
- The exact capability release can change without changing the human-facing app identity.
- Version history, auditability, and rollback evidence remain intact.
- Unproven similarity remains ambiguity rather than an unsafe merge.
