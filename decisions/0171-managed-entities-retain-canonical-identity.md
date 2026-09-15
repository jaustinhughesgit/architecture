# 0171 — Managed entities retain canonical identity

Later clarification: [decision 0174](0174-managed-protected-assets-separate-policy-and-key-custody.md)
preserves source validation at promotion but removes the creator's personal
source shell as a lifetime dependency for managed membership and protected custody.

Work-feature implementation and tests below are historical and superseded by
[the removal decision](0172-promotion-is-management-not-business-features.md). Entity promotion and management remain;
the separate definition, record and approval engine is removed.

Date: 2026-09-14
Status: Implemented bounded foundation; locally and live verified; deployed to development

## Decision

Supersede 0170's separate organization creation and bundled employee templates.
An ordinary owned entity may acquire management capabilities while retaining its
canonical `ent_` identity. Team, family, department, company, school and other
classifications are entity data, not core type branches. Promotion is not creating
or impersonating a human account; the actual authenticated account remains the
actor. The existing dot and its graph are not recreated or copied.

The strict version-2 work contract proves canonical source ownership/existence,
Context revision and entity version. Account identities, values, hydrated foreign
entities and structural facets cannot be promoted. Every selected-entity operation
rechecks the source and atomically conditions its Context revision together with
management/membership, workflow permissions, content/source versions and history.
Removing the source suspends access; independent lifetime after the original owner's
Context deletion is not yet implemented.

Accepted exact-account membership and management are separate. Any current manager
can explicitly delegate management to an accepted member. Transactional manager
counts prevent concurrent departures from orphaning the entity. Changing a member's
management or membership version invalidates their old workflow permits and pending
approval witnesses. Management is trusted policy administration, not implicit
record-read permission or a bypass of independent author/reviewer/operator checks.

Managed entities can have a parent when the actor manages both. Parent links are
cycle-checked against a bounded chain; no membership, permission or ordinary sharing
inherits automatically. Changes do not scan all descendants. Archive suspends
workflows while preserving records and manager-controlled restore. There is no
destructive delete or whole-platform identity transfer in this release.

## Capabilities as data

Sentence Path data composes management commands and ordinary entity references.
The browser builds a custom definition draft: arbitrary label, up to sixteen
text/number/date fields, required flags, numeric bounds and optional approved-source
definition. Explicit preview/publish uses the same immutable executor contract.
No HR/domain templates are bundled in browser source. Language and field schemas
are data; trusted operations and validators remain reviewed reusable code. This
does not imply arbitrary effects or formulas can be learned safely without review.

Reuse the existing approval engine and WORK transaction repository. Three distinct
accounts, exact displayed revision, current member/permission witnesses, immutable
history, value-free retries and one bounded source level remain enforced.

## Migration and limits

Reject new `organization.create` and version-1 work requests. Retain historical
codecs and legacy partitions. The old administrator can bind one legacy organization
to one owned canonical entity. One exact alias preserves all definition, record,
and history IDs; authorized projections expose the new owner without rewriting
historical bytes. The initial manager's membership advances, requiring renewal of
their old permits. Other unchanged accepted memberships remain valid. Names never
authorize migration, and no accounts or sharing demo data are reset.

This is an ordinary server-readable simulation foundation, not real payroll,
benefits, protected-key management or external execution. Promotion does not grant
access to personal graph data, credentials, marketplace licenses or installations.
Shared Context authorship, collective-owned app installation, inherited row/field
policy, autonomous source ownership, a dedicated Inspector management surface,
generalized workflow state-machine authoring, production integrations and
ten-million-user scale proof remain Partial / Product intent.

## Evidence

Product decision 0113 and `docs/testing/managed-entities.md` specify the current
contract and test commands. Service tests cover canonical identity, stale/racing
source state, last-manager races, independent scopes, parent cycles, archive/restore,
legacy ID preservation, approval, source, revocation and Dynamo conditions.
The four-account browser test uses the real CLI, ordinary entity creation and
custom schemas, including delegation and archive/restore. Live acceptance creates
isolated private synthetic accounts without resetting the shared environment.

Product release `647b4d906b4134b4d6664180686194521259fe82` deployed successfully in
[run 34916459786](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34916459786),
and the live health endpoint verified that exact identity. All 1,011 local tests
plus type/build/budget gates passed. The four-account CLI scenario passed locally
and live (1.0 minute), including custom definitions, delegation, revocation and
archive/restore. The supplied DemoCompany was migrated through the authenticated
website; its three original workflow IDs were verified unchanged. Full independent
browser CI was still running at this checkpoint, not claimed green. No shared
environment reset occurred.
