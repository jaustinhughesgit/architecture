# Shared Contracts

This directory holds versioned, machine-readable contracts shared by the repositories.

## Active contracts

- [`canonical-substrate.v1.schema.json`](canonical-substrate.v1.schema.json) freezes logical Word, entity, address, group, relation, version, grant, capability, installation, local-mapping, retrieval-posting, and mutation records. It deliberately does not freeze DynamoDB table names or short legacy attributes. Representative records are in [`examples/canonical-substrate.v1.examples.json`](examples/canonical-substrate.v1.examples.json).
- [`entity-middleware.v1.schema.json`](entity-middleware.v1.schema.json) freezes root-to-target invocation and `pass`/`respond`/`fail` result envelopes.
- [`canonical-governance.v1.schema.json`](canonical-governance.v1.schema.json) freezes action decisions, optimistic lifecycle transitions, and sanitized audit evidence.
- [`context-graph-sync.v1.schema.json`](context-graph-sync.v1.schema.json) remains the active browser publication, acknowledgement, and hydration transport during migration. Compute must compile it into the canonical substrate; the transport schema does not declare the sidecar canonical.
- [`llm-template-selection.v1.schema.json`](llm-template-selection.v1.schema.json) identifies server-owned model request templates.
- [`model-cost-trace.v1.schema.json`](model-cost-trace.v1.schema.json) carries sanitized model usage metadata.
- [`test-system-reset.v1.schema.json`](test-system-reset.v1.schema.json) freezes the explicit canonical reset request, pending one-time legacy-purge status, and phased result inside the existing Compute envelope.

Position/Search/RAG records use the canonical `retrieval-posting` contract: they are derived candidates with `authorizationMode: candidate-only`, never identity, fact, or permission records.

Candidates include:

- Browser-to-API request and response envelopes
- Durable background job states and error schemas
- Path and Essence interchange schemas
- Compute capability manifests and typed inputs/outputs
- JPL document schemas and version migration rules
- Protected-asset references, consent scopes, and sanitized diagnostics
- Entity lineage and relationship-operation contracts
- Intent-jurisdiction decisions for data mutation, query, invocation, composition, clarification, and capability work
- Capability contract identity, compatible implementation releases, user-scoped installations, fork lineage, promotion, deprecation, and dependency ranges
- Scheduled task, occurrence, retry, and result contracts
- Command registry, menu transition, automation event, and sequence schemas
- Main-page-to-worker request, result, heartbeat, cancellation, and capability-grant messages
- Sound source/control and streaming presence/invitation/session contracts
- Email entity address, consent, delivery, bounce, complaint, suppression, and unsubscribe events
- Account verification, device enrollment, WebAuthn assertion, key rotation, and recovery states
- Local graph-delta outbox, server entity publication acknowledgement, ID mapping, version, tombstone, and hydration contracts
- Recipient/device grants, public-key versions, salted key wraps, envelope retrieval, rewrap, re-encryption, and revocation contracts
- Sanitized model usage traces used for browser-local request cost estimates
- Trusted LLM request-template selection propagated through model-backed request stages

`context-graph-sync.v1.schema.json` defines the active graph publication delta, acknowledgement, and hydration-page shapes. Its authorization is intentionally outside client-controlled fields: Compute authenticates the principal, verifies the workspace, and derives participant audiences from resolved server identities.

`model-cost-trace.v1.schema.json` is the executable observability contract. Producers may expose only provider/model identifiers, service tier, response identity, stage name, and aggregate token counts. Prompt text, generated content, hidden reasoning, credentials, protected values, and request headers are forbidden from this trace.

`llm-template-selection.v1.schema.json` validates the template ID carried as `llmTemplateId`. Unknown or omitted values fail safe to `original-v1` in each trusted server registry; clients cannot select raw models or reasoning parameters.

Do not copy an evolving schema independently into all three repositories without a compatibility strategy. When a contract becomes executable, give it a schema version, fixtures, producer tests, consumer tests, and a migration policy. Record compatible repository versions or commits until releases share a unified versioning mechanism.

These schemas centralize the logical boundary; producer/consumer adoption and physical migration remain capability-specific and must use the documented status vocabulary.
