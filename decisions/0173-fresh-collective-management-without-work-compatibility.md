# Fresh collective management without work compatibility

Date: 2026-09-14
Status: Implemented in source; locally verified. Deployment and authorized reset pending.

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

No reset has occurred as of this source verification: the operator AWS session
expired during the non-destructive preflight. Scope confirmation and renewed
operator authentication are required before deleting development data.

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

Deployment, live acceptance and actual reset evidence must be appended separately;
local test success is not evidence that the live environment has been cleared.

Cross-layer source: `onevar-platform/docs/decisions/0115-fresh-collective-management-without-work-compatibility.md`.
Supersedes the compatibility retention in decision 0172 for the authorized development cutover.
