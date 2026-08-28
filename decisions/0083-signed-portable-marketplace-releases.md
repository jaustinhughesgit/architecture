# 0083: Marketplace releases are signed portable definitions with caller-local installation

## Status

Accepted and deployed through the clean `onevar-platform` Phase 4 closure release.

## Context

Cross-user Compute must preserve the platform rule that each browser owns its Paths and exact `using` bindings. Copying a creator's local runtime would break identity continuity, while trusting a package label or capability name would permit cross-domain binding and package substitution. Apps also need collaboration, forks, upgrades, rollback, refunds, publisher attribution, and same-account device continuity without scanning millions of users.

## Decision

An app publisher exports only an immutable portable definition, exact capability package descriptors, and optional ArrayLogic definition. The service independently reloads or admits only reviewed compiler-owned packages, adds authenticated publisher identity, build provenance, review, compatibility, rollout, pricing, and lifecycle state, and signs the complete release with a stage-scoped KMS ECDSA P-256 key.

The receiving browser verifies the signature, definition/package/workflow hashes, compatibility, review state, and trust root, then creates fresh local Path, installation, binding, workflow-installation, and menu identities. Invocation carries exact marketplace attribution and is authorized against the current signed release, license, installation, publisher, package operation, and price ceilings.

An immutable capability package is marketplace-governed rather than owned by one listing. It may participate in another signed composition only through an active exact source license or a write collaboration grant. A collaborator-authored successor retains the original app and ArrayLogic owner while its provenance separately records the collaborator as author; collaboration does not silently transfer ownership. Forks instead create a new caller-owned app and record source listing IDs. Same-account device sync is an authenticated release delta using the separate discoverable account passkey from [decision 0084](0084-account-passkeys-are-not-protected-authority.md); publisher rollback reconciles lazily when each account next reads its library.

Collaboration changes exact use/write authority but never changes signed pricing. Free access must be an explicit zero price in the signed release. When a recipient learns another valid spoken Path for an installed app, the new caller-local installation retains the exact listing, release, marketplace installation, license, publisher, and price-ceiling attribution instead of falling back to raw public capability execution.

An approved refund revokes the current installation but does not turn its inactive library tombstone into a permanent install lock. A later purchase of an active listing receives new exact license, marketplace-installation, transaction, receipt, caller-local installation, binding, and Path identities. The server conditionally advances the current library projection only from the exact inactive revision while retaining prior refunded license, transaction, receipt, and revoked local-installation evidence. An active installation remains a conflict and uses the separate upgrade lifecycle.

Refund is governed rather than purchaser-executed. A request made inside the signed request window may be created after recorded use and leaves credits, license, installation, and local authority unchanged. Only the exact publisher account may deny the request or claim it for approval. Approval advances through a resumable `approving` state, idempotently returns the exact purchase transaction, then conditionally records approval and revokes the exact license/installation. Denial preserves the active purchase. Natural app/purchaser references nominate a request; its exact ID, revision, actors, and purchase identities authorize the decision. Platform dispute, appeal, chargeback, and forced-refund authority remains Phase 5 product intent.

Revocation retains a local menu tombstone so an utterance that exactly matches the former Invocation Frame produces an explicit revoked-app result rather than falling through to unrelated global discovery. The tombstone does not intercept unrelated language. Marketplace discovery tags are a bounded projection of portable aliases: publication trims, length-bounds, case-deduplicates, and caps the tag set without changing the immutable app definition. This keeps inherited fork metadata valid at the marketplace boundary.

## Consequences

- Foreign active Paths never cross the marketplace boundary.
- Package signing and publisher attribution do not grant Context, Protected Asset, or effect authority.
- Passkey-authenticated-account verification is explicit and must not be presented as email, legal, business, or human identity verification.
- Concurrent usage evidence compare-and-swaps the license count; losing paid-install races are compensated.
- Closure proof is a bounded correctness gate: concurrent exact installations, multi-account install/use/refund/reinstall, collaborator-authored successor release, fork independence, passkey device recovery, rollback, deprecation, revocation, and abuse intake. Projected million-DAU performance and chaos testing remain production-scale work.
- Real-money purchases, creator payout, advanced verification, and operational moderation remain Phase 5.
