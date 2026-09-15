# 0174: Managed protected assets separate policy and key custody

Status: Implemented bounded slice in `onevar-platform`; verified locally, in CI
and live; published to development on 2026-09-15. No reset or production change.

## Decision

Reuse the protected worker/recipient cryptography and revisioned collective
repository rather than introducing business workflows or a server plaintext vault.
A promoted canonical entity is the asset owner; a signed-in person is the actor.
Promotion proves current source ownership, but durable managed identity and accepted
membership govern later operations independently of the creator's personal Context.
This supersedes decision 0171's source-shell lifetime dependency, not its promotion
checks. Existing personal assets and ordinary facts are not transferred.

Separate general membership management, one protected steward, exact per-person
action permissions and one custodian per asset. General managers gain no keys.
The original promoting owner explicitly initializes stewardship while an active
manager. The steward governs creation and asset permissions, but metadata access
is not decryption. The creator is initial custodian; ownership stays with the
managed entity. Custodians hold read/share/update/retire/audit for their asset.
Other members receive scoped actions and optional expiry as data, not coded jobs.
Self-grants are refused. Permissions bind current membership revisions.
An exact asset action permits its non-sensitive metadata to be listed, not its
plaintext. Audit/retirement can be granted without read; update and key delivery
additionally require read permission and a current recipient wrap.

One bounded delegation hop cannot exceed the issuer's ceiling or pass share onward;
current parent revision, expiry and membership are rechecked. Parent revocation
invalidates child delivery. Steward/custodian grants persist as entity-issued policy
after handoff. Ordinary public/group/parent authority does not enter this plane.

## Key and delivery contract

Secret text is captured outside ordinary CLI/history and encrypted in the protected
worker with a fresh AES-GCM content key and exact owner/asset/version/type/length
AAD. P-256/HKDF recipient wraps bind exact binding and recipient-key versions.
No plaintext, plaintext hash, content key or private key reaches the server/model.
Labels, memberships, actions and audit metadata remain server-readable.

Each actor connects one independent device key per managed entity. Permission
alone is insufficient: an authorized current key holder must deliver a recipient
wrap. Updates preserve custody and generate new keys/versions, including wraps for
updater and custodian. Other recipients need new delivery. Fresh one-use local
WebAuthn binds actor, owner, action and frozen request; personal owner-only targets
stay unchanged. Reveal rechecks policy after decryption before transient release.
This browser/device/release remains trusted; local UV is not server attestation.
Revocation prevents future authorized delivery, not use of previously copied values.

`/api/v1/collective-assets` atomically conditions entity lifecycle, membership,
steward, keys, permissions/parents, ciphertext, wrap and custody evidence in the
existing COLLECTIVE store. Five-item indexed pages bound authority work. Successful
operations append value-free audit events with actor/action/asset/version/permission
details. Replay returns a historical receipt, never fresh content or authority.

Custody handoff requires current recipient delivery and an authenticated client
acknowledgment that the exact version opens. This is client evidence, not server
cryptographic proof. Atomic custody counters prevent removing an active custodian;
steward and last-general-manager removal are independently blocked. Once all three
jobs are handed off, creator departure does not strand the managed identity/assets.
Retirement stops delivery but retains encrypted records and audit history.
Only current ciphertext is retained; value-free audit tracks previous versions,
not recoverable historical plaintext/ciphertext values.

## User surface and limits

Versioned Sentence Path data maps `collective assets [entity_id]` to the same lazy
protected panel available from Inspector. Selection does not impersonate the owner.
No organization-specific capabilities are installed.

The bounded create/read/share/update/retire/handoff slice has local service,
cryptographic and three-account Chromium coverage. See product decision 0116 and
`onevar-platform/docs/testing/managed-protected-assets.md` for evidence/testing.
Managed key replacement/rotation, multi-device keys, backup/recovery, group roles,
quorum/threshold approvals, denied-attempt auditing, durable pending-operation
recovery, managed app execution and production scale/security assurance remain
Partial / Product intent. Clearing browser data can lose access; use synthetic
development data, not the sole copy of real organizational secrets.

## Release evidence

Runtime `ff8c15a03689b227751753ac56dd50221220c680` passed 1,024 core checks and
83 enabled local browser scenarios without retries (18 optional gates skipped).
[CI 34926529456](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34926529456)
passed with 82 first-attempt browser passes plus one existing delayed-frame
Inspector drag retry; the new protected-asset scenario passed first attempt.
[Development deployment 34927402662](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34927402662)
passed with reset-gated acceptance disabled/skipped; live health matched the exact
release. The three-account live canary passed in 37.9 seconds after its selection
assertion was synchronized with the panel's completed metadata refresh. Runtime
code was unchanged by that test repair. Product decision 0116 retains the earlier
test-environment failures, live wait failure and remaining limitations. Production
and existing user data were not reset; only isolated private test accounts were added.
