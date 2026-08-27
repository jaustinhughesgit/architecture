# 0083: Marketplace releases are signed portable definitions with caller-local installation

## Status

Accepted; implemented in the clean `onevar-platform` Phase 4G candidate. Development deployment evidence is recorded separately after promotion.

## Context

Cross-user Compute must preserve the platform rule that each browser owns its Paths and exact `using` bindings. Copying a creator's local runtime would break identity continuity, while trusting a package label or capability name would permit cross-domain binding and package substitution. Apps also need collaboration, forks, upgrades, rollback, refunds, publisher attribution, and same-account device continuity without scanning millions of users.

## Decision

An app publisher exports only an immutable portable definition, exact capability package descriptors, and optional ArrayLogic definition. The service independently reloads or admits only reviewed compiler-owned packages, adds authenticated publisher identity, build provenance, review, compatibility, rollout, pricing, and lifecycle state, and signs the complete release with a stage-scoped KMS ECDSA P-256 key.

The receiving browser verifies the signature, definition/package/workflow hashes, compatibility, review state, and trust root, then creates fresh local Path, installation, binding, workflow-installation, and menu identities. Invocation carries exact marketplace attribution and is authorized against the current signed release, license, installation, publisher, package operation, and price ceilings.

An immutable capability package is marketplace-governed rather than owned by one listing. It may participate in another signed composition only through an active exact source license or a write collaboration grant. Fork provenance records source listing IDs. Same-account device sync is an authenticated release delta using the separate discoverable account passkey from [decision 0084](0084-account-passkeys-are-not-protected-authority.md); publisher rollback reconciles lazily when each account next reads its library.

Collaboration changes exact use/write authority but never changes signed pricing. Free access must be an explicit zero price in the signed release. When a recipient learns another valid spoken Path for an installed app, the new caller-local installation retains the exact listing, release, marketplace installation, license, publisher, and price-ceiling attribution instead of falling back to raw public capability execution.

Refund revokes the current installation but does not turn its inactive library tombstone into a permanent install lock. A later purchase of an active listing receives new exact license, marketplace-installation, transaction, receipt, caller-local installation, binding, and Path identities. The server conditionally advances the current library projection only from the exact inactive revision while retaining prior refunded license, transaction, receipt, and revoked local-installation evidence. An active installation remains a conflict and uses the separate upgrade lifecycle.

## Consequences

- Foreign active Paths never cross the marketplace boundary.
- Package signing and publisher attribution do not grant Context, Protected Asset, or effect authority.
- Passkey-authenticated-account verification is explicit and must not be presented as email, legal, business, or human identity verification.
- Concurrent usage evidence compare-and-swaps the license count; losing paid-install races are compensated.
- Real-money purchases, creator payout, advanced verification, and operational moderation remain Phase 5.
