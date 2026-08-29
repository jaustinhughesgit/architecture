# 0107: Pre-launch resets advance an external-event cutoff

- Status: accepted
- Date: 2026-08-29

## Decision

The clean-room reset primitive may target development or an explicitly enabled pre-launch production stage. It is private, exact-stage scoped, MFA-gated, and physically removes mutable 1var runtime state and generated capability packages. Production requires both deployment-time pre-launch enablement and a distinct operator confirmation; publicly launched production must not synthesize this control plane.

Every executing reset first advances a durable stage reset epoch outside the erasable runtime store and purges pending Stripe and schedule queues. Verified Stripe events created before that cutoff are acknowledged but cannot enter the new runtime epoch. 1var never deletes or edits historical objects retained by Stripe.

## Why

Pre-launch testing needs the actual production topology, domain, live-money mode, and external integrations without carrying internal test identities or ledgers into launch. A table wipe alone is unsafe because delayed external delivery can cross the reset boundary and repopulate erased state.

## Consequences

- The first post-reset user begins with a clean 1var database while code, catalog, policies, secrets, infrastructure, and webhook destinations remain deployed.
- Old Stripe transactions remain visible at Stripe but their pre-cutoff deliveries cannot recreate 1var state.
- A reset is not a refund and creates no external money mutation.
- Reset epochs are immutable operational evidence for separating development, beta, and launch data generations.
- Removing the pre-launch deployment flag removes production reset authority before general availability.
