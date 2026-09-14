# 0169 — Scoped read policy and atomic use grants

Date: 2026-09-14
Status: Implemented bounded slice; verified locally and live; deployed to development

The clean-room platform extends its existing exact principal/resource/grant and
reservation concepts rather than importing the old runtimes or executing dynamic
policy code. Product decision 0111 and `packages/contracts` are the executable
boundary for this slice.

Ordinary Context sharing policy version 2 adds entity-root branches, exact person
exclusions and UTC windows. Ownership and relation facets define traversal; shared
scalar values do not spread scope into unrelated branches. All enclosing explicit
restrictions constrain a read, denials override allows, and global pause denies
outward reads. Owner access remains. Canonical publication remaps roots and rejects
old-client policy downgrades. One evaluator drives server hydration and owner previews.
Public discovery omits person-excluded facts; authenticated exact-person checks may
admit them. The Sharing universe uses normal category colors and preserves membership
when excluding a person from one branch. Group previews are nominal; individual
previews apply their complete effective access.

Ordinary use grants are separate from read visibility and protected/marketplace
authority. Exact indexed group/member/exclusion rows support bounded ancestry and
child exclusions without parent-member deletion. Exact issuer-owned resources carry
capacity; grants carry shared quotas/time/status. Check is informational, reserve
holds capacity/use, commit revalidates, and release returns a still-held allocation
once. Redeem atomically commits one use. Expired holds cannot commit and require
explicit release. Receipts record entitlement accounting, never an app/payment or
provider effect. No model, ordinary claim or name can mint authority.

Strong canonical reloads follow owner/recipient indexes. A single Dynamo transaction
conditions all consulted record revisions/absence and canonical Context revision,
then commits quota, capacity, reservation and actor-scoped idempotency evidence.
Names nominate; strict schemas/exact IDs/current state authorize. Replayed receipts
are explicitly historical and cannot replace reauthorization. No TTL deletion is
relied upon for locking or accounting.

Language is versioned composable Path-library data, evaluated for complete coverage
with existing ordinary reference equations. New language can reuse trusted operations;
new operations still require reviewed implementation. Unknown conditions fail closed.

Status limitations: the embedded ordinary sharing roster remains bounded and separate
from indexed action groups. Large-roster CLI navigation, recipient group discovery,
automatic hold reclamation, provider/payment integration and hot-resource scaling
remain Partial. There is no ten-million-user load certification or measured 95%
language coverage. Protected plaintext and key wrapping do not enter this subsystem.

Tests cover ten Path-driven permission sequences, real service read projections,
expiry, descendant inheritance, canonical remapping, 100 competing last-use claims,
idempotency races, child-group exclusion and exact transaction conditions. Browser
acceptance covers reload, Sharing previews, CLI accounting and independent recipient
races. Development canaries use isolated new accounts, never reset the existing demo.

Release `2f3a0f0fbe1048795da95165aaa1516a739903f6` passed 964 core checks and
the final local browser suite (81 passed, 18 explicit optional/live gates skipped,
no retries). Development deployment
[34880767649](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34880767649)
succeeded with resets disabled; live health confirmed that exact release. The
isolated live governance canary passed: actual recipient dinner exclusion/restore,
unchanged Family membership, persistent effective UI preview, quota accounting,
reservation release and revocation. Twelve concurrent last-use claims produced
one success. The existing Austin/Gavin demo was preserved, and only the temporary
test owner was paused afterward. See product decision 0111 for detailed evidence.

Hosted CI 34880768210 passed core verification but hit its former 15-minute job
limit in the full browser suite; the Inspector drag-to-app case passed only on
retry. Broader hosted acceptance is not yet clean. The product CI follow-up keeps
all individual test limits/assertions, increases the whole-suite time envelope,
and retains progress and failure artifacts for diagnosis.
