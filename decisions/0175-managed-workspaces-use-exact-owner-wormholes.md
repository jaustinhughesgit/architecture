# 0175 — Managed workspaces use exact-owner wormholes

Status: Implemented bounded clean-room slice; verified locally and live; deployed to development.

Promoted ordinary entities retain identity. Their personal Inspector shell is a
`~` wormhole into a separate, ordinary owner-rooted solar system, with a return
wormhole on its upper-right boundary. Navigation never switches authenticated
accounts, creates a login account or imports personal data.

The new plan reuses canonical Context storage/publication and the ordinary worker.
An explicit managed owner plus current active manager authority scopes access.
Context writes condition managed entity and member revisions atomically; reads
revalidate after fetching. Actor evidence remains distinct from data ownership.
The managed worker is memory-only and online-authorized in this bounded release.

People are chosen by permitted profile/membership names, with explicit ambiguity
selection, acceptance and paged management. Names still resolve to exact canonical
IDs before execution. Wording remains composable Sentence Path library data.
Protected assets reuse the existing actor/owner, permission, steward and key-custody
boundaries and protected worker; ordinary membership is not decryption authority.

Implemented scope is private manager-only ordinary Context, named administration,
wormhole navigation and entry to existing protected controls. Granular managed
ordinary sharing, offline delegated authority, scoped learned-package persistence,
company marketplace purchasing/licensing/billing and managed app execution remain
**Partial / Product intent**. Marketplace UI is explicitly browse-only while the
payer/purchasing contract is unresolved. No business-domain features are installed.

See the implementation decision
[`onevar-platform/docs/decisions/0117-managed-workspaces-use-exact-owner-wormholes.md`](../../onevar-platform/docs/decisions/0117-managed-workspaces-use-exact-owner-wormholes.md)
for contract, verification and rollout evidence. No reset or production update.

Development release `441ecdb35743b7ce0f474c969b0b131dc103ecac` passed 1,038 code
checks and a fresh-account two-scenario live canary: named promotion/invitations,
private accepted-member names, management, exact company-owned data, wormhole
return and revocation; plus three-account protected key/permission separation and
creator departure. Live testing found and repaired stale local identity after
sync and transient conditional-read contention. Reads retry only with fresh
authorization and a strict bound; permission changes are never auto-retried.
Hosted CI completion and full final browser totals are recorded in decision 0117.
