# Entity promotion does not install business features

Compatibility retention below is historical for release `af36650`. Decision 0173
removed it in the authorized fresh development cutover. Release `100ccc6` and
the private development reset are complete; see that decision for evidence.

Date: 2026-09-14
Status: Implemented bounded foundation; verified locally and live; deployed to development.

## Decision

Retain canonical entity promotion, accepted membership, separately delegated
management, last-manager protection, bounded acyclic parent links and archive/restore.
Families, teams, companies, departments and other groups use the same primitive.
The authenticated human remains the actor. No personal facts are copied and no
sharing, app license, execution or protected-key authority is implicitly acquired.

Remove the separate work-definition, typed-field editor, workflow-permission,
record, approval and simulated advancement subsystem. Configurable fields around
a source-coded business workflow do not make it a standard Compute capability.
User-authored features must use ordinary entities, caller-local Paths, exact
capability installations and Compute/ArrayLogic composition. This removal neither
adds new compiler operations nor claims arbitrary capability generation.

## Compatibility and data

The existing WORK persistence namespace, canonical managed IDs, member identities
and legacy organization-to-entity aliases stay unchanged. The historical
POST /api/v1/work endpoint now exposes only management operations. Retained
version 2 requests remain retry-compatible; new requests/responses use version 3
and current responses contain no simulation-mode field. All retired operations
fail schema validation before receipt replay or mutation, including direct API
calls from an authorized manager.

The repository admits only managed-entity, legacy-organization and membership
storage keys. Old definitions, permissions, records and history remain stored,
but are not fetched, decoded, listed or executed. Pagination continues across
old pointer pages, including empty current pages; it is not a global scan.
No database reset or physical data deletion occurs. Migration to future authored
apps is separate work, not an implicit conversion or authority grant.

Historical receipts contain no records; the compatibility codec can normalize
their old envelope without making them current authorization. Client selection
survives. Retired local drafts and pending requests are retained as inactive
recovery references; retry never submits a removed operation. Legacy management
aliases remain, and unsupported work-prefixed commands explain retirement.
Normal Convert requests are not classified by business-domain nouns.

## Verification

Local verification on 2026-09-14 passed `npm run verify` (1,008 tests,
typechecks, builds and bundle budgets) and the three-account browser canary
`npx playwright test tests/browser/work.spec.ts` (one passing scenario).

API tests cover promotion across eight entity labels, exact sessions and
membership, manager delegation/revocation, concurrent last-manager safety,
source-revision races, independent nesting, archive/restore, removal and
value-free receipt replay. Negative tests reject every old workflow operation.
Memory/Dynamo tests prove legacy membership preservation, no retired-row reads,
safe pagination, old empty receipts and unchanged transaction preconditions.

Browser-module tests cover data-defined wording, management commands, retired
commands, capability-request non-interception and stale pending recovery.
The three-account browser canary covers company and family promotion, membership,
delegation/revocation, nesting without inherited authority, reload, archive/restore,
retired CLI/API rejection and value-free replay after removal.

No protected, Compute, marketplace, ordinary-sharing or action-entitlement
contracts are broadened. Dedicated collective-owned app installations and shared
Context editing remain Partial.

Cross-layer source: `onevar-platform/docs/decisions/0114-entity-promotion-does-not-install-business-features.md`.
Supersedes the work-feature portions of decisions 0170 and 0171; entity promotion remains.

## Development release evidence

Release `af36650f2b7268cfc3973635066737dd0753bbc6` was published by successful
[deployment 34919184167](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34919184167)
with shared-state reset disabled. Health and website asset checks independently
verified the exact release. The fresh-account three-browser acceptance test passed
live without retries (22.9 seconds).

The existing signed-in owner's DemoCompany retained canonical ID
`ent_8adecdd6-fcd7-4d80-9d82-df45f71fc585` and its manager membership at revision 2.
Its current `collective show` result contained management records and no retired
workflow features. Existing entities, sharing state and historical records were not
reset or physically deleted. Broader GitHub browser CI is separate from this
targeted acceptance evidence.
