# 0028: Order the Legacy Purge Before Canonical Test Resets

- Status: Accepted
- Date: 2026-08-11

## Context

The Reset Test System button called one undifferentiated table-clearing route. After canonical persistence was introduced, that route could not say whether it had removed historical residue or which stores belonged to the recurring active system. Simply renaming the old list would also strand data in compatibility stores that still receive dual writes.

## Decision

- Define test-system reset v1 with one client-selectable mode: `canonical`.
- Keep a server-owned marker per exact test-environment identity.
- When the marker is absent, purge old authorization, embedding, and Context-sidecar stores first. Do not begin the canonical phase if that purge reports a failure.
- Clear active canonical, identity, interaction, communication, protected-asset, projection, and audit stores on every reset.
- Continue clearing active compatibility outputs and legacy counters on every reset until their writers are retired.
- Write the migration marker after the legacy purge succeeds and before canonical deletion begins. A purge or marker failure blocks canonical deletion; a later canonical failure retries only canonical work.
- Clear identity/session stores last so an earlier table failure normally leaves the authorized caller able to retry. Never include the marker table or confirmed Path foundation in the deletion profile.
- Run deletion as a durable control-table job: start quickly, then delete one 25-item table page or reset one counter per continuation request.
- Bind each continuation to the exact environment and job with a server signature and monotonically increasing step. A stale retry returns current progress instead of advancing twice; the signed job remains usable after cookie deletion.
- Keep enablement, non-production identity, caller, and exact-environment checks as server authority.

## Alternatives

- **Treat every compatibility cleanup as a migration.** Rejected because it obscures whether the ordered migration completed. Active compatibility stores still require recurring cleanup until their writers retire.
- **Reset only newly named tables.** Rejected because canonical records use established Words/entities/groups/links/versions tables and the active system still dual-writes compatibility stores.
- **Let the browser remember completion.** Rejected because local storage is deleted by reset and is not trusted migration authority.
- **Scan every table in one Lambda request.** Rejected because API Gateway can return 504 while deletion is still running, leaving the browser unable to distinguish timeout from completion.

## Consequences

The first reset after deployment may require more continuation requests, but no individual request scans an unbounded table. A failed legacy attempt is safely repeatable; after the marker is written, a canonical retry cannot depend on pre-migration data. The marker and job are test operational state, not entity data or authorization evidence. The Context sidecar and other compatibility stores remain recurring cleanup through their cutover because active writers can still repopulate them.

## Affected repositories

- `architecture`: reset schema, lifecycle decision, capability status, and flow documentation.
- `compute`: ordered phases, control marker, table profiles, authorization, and infrastructure.
- `aws`: explicit canonical request and pending-purge presentation.
- `testing`: the guarded headless reset sends the same explicit canonical v1 mode as the portal.

## Security impact

No reset capability is enabled by the marker. Production-like environments remain denied, and an unavailable marker store fails closed before deletion. Continuations are HMAC-bound to the active environment/job and are never returned by status; they do not authorize a new reset. Protected data is deleted only inside the already authorized isolated reset boundary; no protected plaintext is read or exposed.

## Migration

Deploy the control table and server/UI changes together. On the next button click, absence of the marker forces the legacy purge, records its completion, and then starts the canonical reset. Future clicks skip the migration phase, not active compatibility cleanup.

## Verification

Compute tests prove first-run ordering, marker creation, bounded pages, signed continuation after cookie loss, stale-step idempotency, later legacy-skip behavior, fail-closed gates, current table coverage, and retained foundation exclusion. Browser contract tests prove explicit canonical mode, progress continuation, transient gateway retry, pending-purge messaging, two confirmations, and post-success local cleanup.
