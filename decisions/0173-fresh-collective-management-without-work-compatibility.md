# Fresh collective management without work compatibility

Date: 2026-09-14
Status: Implemented; verified locally and live; deployed and reset in development.

## Decision

Keep domain-neutral promotion of ordinary entities in place, exact accepted
membership, separately delegated management, last-manager protection, independent
acyclic parent links and archive/restore. Company, family, team and department are
ordinary entity labels, not different built-in business systems. Business features
remain user-authored through normal Path/Compute/ArrayLogic composition.

Remove the organization/work compatibility layer rather than carrying it into a
fresh development data generation. The strict `collectives` package export and
`POST /api/v1/collectives` API use their own version 1 contracts and canonical
`ent_` identities. Records and value-free receipts use the `COLLECTIVE` namespace.
Members have an explicit boolean management flag. The composable
`collective-language.json` library uses existing subject-reference rules and
contains only current management operations.

There is no old `/api/v1/work` route or package export, `org_` codec, alias
translation, migration operation, old receipt normalization, work-command alias,
retirement catch-all or legacy device-draft recovery. Current management state
uses `1var.collectives.v1`; old client state cannot become a pending current
request. Unrelated capability, protected-data and billing formats are not removed
merely because they are versioned.

## Cutover and reset

This is an intentional breaking development cutover, not an automatic migration.
Do not deploy it to production or claim old managed memberships are retained.
An explicitly authorized full development hard reset must accompany the release.

Use the existing private MFA-gated reset workflow, not ad hoc table or bucket
deletion. First close test clients, publish and verify the new release with
automatic reset-gated acceptance disabled, and run the fresh-account live canary.
Then execute the authorized reset and confirm its completed inventory. Do not
reseed the demo universe or run account-creating tests afterward: the user wants
to begin at `/newentity1` themselves.

The reset erases all development runtime accounts, sessions, facts, management,
sharing, installations, generated apps, credit/ledger state and reset-target
artifacts. It advances the external-event cutoff and purges the configured queues.
Infrastructure, deployed code, secrets, pricing configuration, core catalog and
inactive value-free learned grammar archives remain. External Stripe history and
device-local protected files are not deleted by a server reset. Production is not
in scope. A browser must not republish old data under a new account.

The initial preflight was blocked by expired operator authentication. The user
subsequently confirmed the full development scope and renewed the IAM session;
publication, live acceptance and the private reset then completed as recorded below.

## Verification

`npm run verify` passed locally, including typechecks, all tests, builds and bundle
budgets. Twelve API tests retain promotion, ownership, acceptance, delegation,
revocation, concurrency, parent and archive guarantees, while rejecting old IDs,
operations and envelopes. Dynamo tests prove current-namespace pagination,
strict receipt parsing and unchanged exact Context/record transaction conditions.

Thirty browser-module tests cover current Path data, old-rule absence, normal
capability-request non-interception, no legacy local restoration and exact current
request retries. The three-account browser canary passed locally without retries
(16.2 seconds), including company/family promotion, invitation/management controls,
parent non-inheritance, reload, archive/restore, removed-route 404 and rejected
old API requests. Existing governance tests also pass.

## Development publication and reset evidence

Completed on 2026-09-15 UTC (2026-09-14 America/New_York).

- Release: `100ccc63de833447626dfd3c8290f616e2eae5bc`.
- [GitHub CI](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34921465616)
  passed verification and all 82 enabled browser scenarios; 18 optional live gates
  were skipped. The previously failing delayed-paint drag scenario passed in this
  run and in a separate local rerun.
- [Development deployment](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34922362420)
  succeeded with automatic reset-gated acceptance disabled. Health and the served
  website entrypoint were verified.
- The opt-in three-account live collective browser canary passed without retries
  in 23.7 seconds. All its browser contexts closed before reset.
- The user explicitly confirmed the full development reset and authenticated the
  IAM operator. The existing MFA-gated workflow
  `reset-20260915T025111Z-89686` succeeded: 3,589 runtime records and 3 generated
  artifacts deleted; external-event epoch advanced; configured queues purged;
  63 inactive value-free grammar archives preserved.
- A probe session authenticated before reset. Its entity and account-passkey reads
  both returned 401 afterward. Its cookie remained in process memory only.
- A subsequent non-destructive inventory,
  `reset-20260915T025258Z-89826`, reported zero runtime records and zero
  reset-target artifacts, with all 63 inactive grammar archives still present.
- No accounts were created or demo data seeded after reset. Production was not
  deployed or reset. The user starts at
  [Create your first entity](https://d3byneo87fybgf.cloudfront.net/newentity1/).

Cross-layer source: `onevar-platform/docs/decisions/0115-fresh-collective-management-without-work-compatibility.md`.
Supersedes the compatibility retention in decision 0172 for the authorized development cutover.
