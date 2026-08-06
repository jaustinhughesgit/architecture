# ADR 0006: Headless acceptance before website integration

- Status: Accepted
- Date: 2026-08-05

## Context

Cross-layer development currently depends on manually using the website to establish accounts, receive verification email, enroll encryption, invoke capabilities, and reset test data. This delays feedback and makes the product owner the integration-test runner. Copying the website into another interface would create divergent behavior, while direct private-module tests alone would not prove the API and Compute contract.

## Decision

Create a separate `testing` repository that behaves as a deterministic headless platform client. It calls the same public API actions, persists a test-device session, uses real test-mail capture, registers test-device public keys, runs declarative acceptance scenarios, and requests resets only for isolated test environments.

New cross-layer behavior follows this order: acceptance scenario, owning-layer tests and implementation, headless API/Compute verification, website integration, then a thin browser-only check.

Database reset is authorized by Compute, not by possession of the testing client. Compute requires an explicit test-stack enable flag, exact environment identity, and an authenticated user. Deployments default to an explicit user allow-list, but a shared disposable test stack may deliberately enable any authenticated test user. Client checks add protection against mistakes but are not a security boundary.

## Consequences

- Agents and CI can prove most feature behavior without waiting for manual browser work.
- The website becomes an adapter over already-tested contracts instead of the first place integration is attempted.
- Public API contracts become easier to identify and stabilize.
- A dedicated test mailbox and isolated deployment must be provisioned.
- WebAuthn, IndexedDB, rendering, accessibility, media permissions, workers, and browser cookie behavior still require narrow browser tests.
- Reset configuration defaults to disabled, so existing unguarded portal reset attempts now fail until a test deployment is explicitly configured.
