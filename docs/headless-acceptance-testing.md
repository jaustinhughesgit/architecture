# Headless Acceptance Testing

## Purpose

The browser currently combines product interaction with account bootstrap, verification, device enrollment, transport, and operational controls. That makes every cross-layer feature wait for manual clicking before its API and Compute behavior can be proven. The `testing` repository exposes those same public contracts as deterministic commands so agents and CI can test the platform before website integration.

This repository is a platform client for verification, not a fourth runtime with alternate semantics. Product behavior remains owned by `aws`, `aws-api`, and `compute`.

## Browser-to-command mapping

| Website operation | Headless equivalent | Boundary that remains browser-specific |
| --- | --- | --- |
| Establish an account/session | `account bootstrap` captures the issued test cookie and account identifiers | Cookie policy in an actual browser |
| Call an API/Compute capability | `api call <action> [path...]` | Rendering and browser worker behavior |
| Receive and open verification email | `email request` plus `email verify` through a test mailbox | Visual email-client behavior |
| Generate and register device keys | `encryption setup` with Node WebCrypto | Real WebAuthn user activation and authenticator assertions |
| Repeat a feature flow | `scenario run <file>` with stable subset assertions | Thin end-to-end UI wiring |
| Submit statements and questions | `message run <file>` calls the published classifier/Essence routes and published local graph runtime | Worker lifecycle, encrypted IndexedDB persistence, Path learning, and rendering |
| Clear a test database | `db reset --confirm reset:<environment>` | None; the destructive authority remains on the server |

## Verification flow

```text
Acceptance scenario fails
        ↓
Owning repository receives focused unit/contract test
        ↓
Reusable primitive is implemented or repaired
        ↓
Headless scenario crosses aws-api → compute → persistence
        ↓ only after success
Website binds the proven contract to interaction and rendering
        ↓
Thin browser test proves browser-only seams
```

Headless acceptance reduces browser work; it does not eliminate browser testing. A worker-safe library can be executed in Node when the test loads the exact published asset instead of copying its semantics. WebAuthn activation, IndexedDB integration, worker lifecycle boundaries, DOM rendering, accessibility, camera/microphone permissions, and browser cookie behavior still require browser evidence.

## Identity, email, and encryption

The client persists an issued access token and test-only private key material in a gitignored, mode-`0600` profile. It must never ingest production credentials.

Verification is not disabled. The preferred adapter polls a test mailbox such as a local SMTP sink or a dedicated non-production SES capture path, extracts the same link a user would receive, and invokes the normal verification action. Returning verification secrets in normal API responses should be removed as the mail-capture contract matures; a production response must never become a verification bypass.

Node WebCrypto can reproduce P-256 ECDH and ECDSA key generation and public-key registration. It represents a test device, not a proof of WebAuthn behavior or production private-key custody.

## Reset safety contract

A database-reset switch in a client is convenience, not authorization. Reset therefore requires both layers:

1. The client rejects empty or production-like environments, requires an exact host allow-list, requires `allowDatabaseReset`, requires the reset environment ID to match the profile, and requires the exact confirmation `reset:<environment>`.
2. Compute fails closed unless `TEST_RESET_ENABLED=true`, the configured environment ID is non-production and exactly matches the request, and the authenticated user's ID appears in `TEST_RESET_ALLOWED_USER_IDS`.

Reset is intended for isolated or ephemeral test stacks. Per-run namespaces or disposable stacks are preferable when parallel tests become common because a global reset creates interference even when it is authorized.

## Scenario contract

A scenario is declarative JSON with ordered public actions or message inputs and stable expected outcomes. API scenarios assert public response subsets. Message scenarios preserve a local graph across turns, apply graph mutations before fact ingestion in browser transaction order, and may assert speech-act kind, final `{ask}` values, and required deterministic operations. They must load the graph runtime from the deployment under test rather than reimplementing Essence or ContextDB semantics. Exact ordering is appropriate when it is part of the public contract; volatile trace data and generated identifiers should not be copied into expected output.

## Capability status

- Headless API transport, local session capture, test-device keys, mailbox parsing, API scenarios, published-runtime message scenarios, and client reset guards: **implemented foundation** in `testing`.
- Compute reset authorization: **implemented foundation**; deployment must explicitly provide an isolated environment ID and allowed test users.
- A provisioned test stack and mailbox sink: **deployment work required**.
- Full automated account/encryption acceptance against a live isolated stack: **partial** until those resources are configured.
- Browser automation for browser-only seams: **proposed**.
