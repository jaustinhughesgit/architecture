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

Do not copy an evolving schema independently into all three repositories without a compatibility strategy. When a contract becomes executable, give it a schema version, fixtures, producer tests, consumer tests, and a migration policy. Record compatible repository versions or commits until releases share a unified versioning mechanism.

This directory currently documents the contract program; it does not claim these schemas are already centralized.

