# 0082: App collaboration and release revocation use exact verified authority

**Status:** Accepted; clean-room contract/runtime implemented and development-proven. Authenticated cross-user grant delivery and same-account menu synchronization remain partial.

## Decision

A user-local menu projection does not confer source-app authority. Shared apps begin with read/use only. Write collaboration requires a separately authenticated grant pinned to exact owner, grantee, app release anchor, and root capability/entity/version/operation. A grant may delegate read/use/write, never ownership, governance, or delete. Human labels, focus, public visibility, model output, and local menu mutation are ineligible authority sources.

The anchored app release may produce immutable local successor compositions while its exact root release remains unchanged. A different owner-published root release requires new authority. Revocation is a higher grant revision, not deletion; stale revisions fail closed. Verified revocation removes write but retains immutable packages, bundles, workflows, receipts, and event evidence.

Capability release revocation is also applied by exact release identity. Matching installations and Paths are disabled, workflows containing the release are revoked, affected menu entries become revoked, and affected focus/pending execution is cleared. Packages remain as evidence. Failed focused authoring is transactional: without a fully validated successor, the original state is unchanged.

Browser states remain independent until authorized synchronization explicitly delivers state. This proves multiple-device isolation, not same-account synchronization. User-facing Undo/Back is intentionally outside this decision.

## Consequences

- Collaboration authority is portable across a future API or synchronization transport without changing local app semantics.
- Public marketplace installation never implies write.
- Revocation cannot erase provenance or hide what previously executed.
- Exact root changes cannot silently inherit an older grant.
- The server transport must authenticate issuance and delivery before exposing natural collaboration commands.

See clean-room [decision 0028](../../onevar-platform/docs/decisions/0028-exact-app-collaboration-and-release-revocation.md).

## Evidence

Clean-room release `c53f49b` passed repository verification, 27 local browser scenarios, and all 21 runnable deployed scenarios in GitHub run `33039344684`. Deterministic package tests cover exact grant application, stale revision rejection, collaboration revocation, exact capability-release shutdown, independent-device isolation, and failed-edit rollback. The final private development reset removed 124 runtime records and 1 generated artifact; a separate inventory observed zero of each.
