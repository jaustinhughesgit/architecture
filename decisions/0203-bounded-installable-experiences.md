# 0203 — Experience presentation does not own data or execution authority

Status: Accepted; bounded clean-platform R0–R4 implemented, locally verified and
deployed to development as `8b2c2af080db462643a61aad457196ec24258eca`.

## Context

System Experiences arrange entities; Entity Experiences are compact or expanded
surfaces over them. The original platform already has entity UI, composition,
Compute and communication behavior. Clean-room replacement must generalize those
capabilities without importing the original implementation or making one-off
domain stores for competitions, telemetry or games.

## Decision

Keep Inspector as the default and universal fallback. Extend the existing signed
marketplace with a versioned presentation-only release family alongside legacy
executable apps. It can declare System and Entity entry points without a fake
Compute root. A definition is immutable portable layout and requirements; an
installation is current marketplace authority; a local instance is that release
bound to exact permitted source entities. None is interchangeable with a fact,
license, protected grant or executable operation.

Reuse three existing boundaries:

1. S3 archival packages with optional paid-code database acceleration and bounded
   process caching. Current invocation authority precedes execution regardless of
   cache tier. Compact install receipts retain original financial/release evidence.
2. Browser-local Context and Journal data with bounded versioned projections,
   source provenance, revocation and expiring cursors. A partial read projection
   cannot become a complete snapshot publication. No protected server plaintext.
3. Trusted host-owned presentation, input and raster leases. Authored layout does
   not execute scripts, fetch URLs or cover the reserved Sunburst control area.

Installation makes an entry point available, not active. App-first and data-first
opening converge on exact source selection with missing/ambiguous inputs exposed.
Inspector inspects the current subject; Back returns to the prior navigation
session. Activity time lenses do not silently become business-data time filters.
Standalone visual apps reuse install/upgrade/rollback/refund/revoke machinery.

## Consequences and alternatives

Data stays reusable across compatible apps and views. Visual duplication does not
duplicate facts. The initial renderer is deliberately declarative; arbitrary
creator code, broadcast video and game loops require later resource and behavior
contracts. We reject fake execution roots, domain-specific schema shortcuts,
eager whole-history reads, per-surface polling, cache-as-authority and protected
plaintext promotion. Native Inspector/Timeline/Column stay trusted adapters.

The bounded first scene is embedded in the immutable signed release; source data
and opaque artifact leases are not. Large scene asset graphs remain a later
versioned extension. Code acceleration uses publisher promotion quotas and
rebuildable expiry, not new customer fees or canonical archive deletion.

## Affected layers, migration and evidence

Affected implementation: `onevar-platform/packages/contracts`, `compute`,
`runtime`, browser worker/host/navigation, API artifact/marketplace adapters and
application infrastructure. Original `aws`, `aws-api`, `compute`, and `testing`
are behavioral references only and remain unchanged.

Legacy signed release bytes stay valid. Readers precede new receipt writers;
Journal indexes migrate without deleting records; no historical receipt backfill
or shared-state reset runs with deployment. Production admission/acceleration
remain separately disabled by default. Disable activation without deleting user
facts or purchases, and retain readers for already-written formats on rollback.

Exact implementation, controls, limits, tests and development release evidence:
[clean-platform decision 0151](../../onevar-platform/docs/decisions/0151-bounded-installable-experiences.md).
Million-user concurrency, cloud performance/cost targets and lower-end physical
device performance remain Unknown until separately measured and authorized.
