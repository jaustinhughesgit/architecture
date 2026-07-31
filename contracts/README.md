# Shared Contracts

This directory is the future home of versioned, machine-readable contracts shared by the repositories.

Candidates include:

- Browser-to-API request and response envelopes
- Durable background job states and error schemas
- Path and Essence interchange schemas
- Compute capability manifests and typed inputs/outputs
- JPL document schemas and version migration rules
- Protected-asset references, consent scopes, and sanitized diagnostics
- Entity lineage and relationship-operation contracts
- Scheduled task, occurrence, retry, and result contracts
- Command registry, menu transition, automation event, and sequence schemas
- Main-page-to-worker request, result, heartbeat, cancellation, and capability-grant messages
- Sound source/control and streaming presence/invitation/session contracts
- Email entity address, consent, delivery, bounce, complaint, suppression, and unsubscribe events
- Account verification, device enrollment, WebAuthn assertion, key rotation, and recovery states
- Local graph-delta outbox, server entity publication acknowledgement, ID mapping, version, tombstone, and hydration contracts
- Recipient/device grants, public-key versions, salted key wraps, envelope retrieval, rewrap, re-encryption, and revocation contracts

Do not copy an evolving schema independently into all three repositories without a compatibility strategy. When a contract becomes executable, give it a schema version, fixtures, producer tests, consumer tests, and a migration policy. Record compatible repository versions or commits until releases share a unified versioning mechanism.

This directory currently documents the contract program; it does not claim these schemas are already centralized.
