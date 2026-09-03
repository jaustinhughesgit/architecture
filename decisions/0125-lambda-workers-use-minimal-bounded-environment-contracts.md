# 0125: Lambda workers use minimal bounded environment contracts

**Status:** Accepted, implemented, and verified in the clean platform development deployment; amended on 2026-09-03.

## Context

The browser API accumulated versioned model, server-rate, credit-pack, payout, provider, artifact, protected-execution, communications, and speech configuration. Reusing its complete service bootstrap in narrowly scoped Stripe workers duplicated that configuration, granted irrelevant authority, and exceeded AWS Lambda's 4 KiB environment-variable limit after CloudFormation resolved physical resource names. Removing one setting would only defer the same failure and preserve unnecessary privilege.

## Decision

Every Lambda worker receives the smallest configuration and service graph required for its declared job. Large immutable structured policies that several workers genuinely share cross deployment as one versioned, strict, compressed envelope compiled into each affected Lambda artifact. Runtime code bounds decompression, validates the complete schema, and rejects unknown fields before creating a service.

Stripe money-event and publisher-withdrawal workers construct a billing-only service. Their runtime environment contains the canonical entity table, exact Stripe secret reference, and billing mode; their build artifact contains the immutable billing policy envelope. They do not receive OpenAI, artifact, protected-executor, communications, capability-package, or browser-sync configuration or IAM authority.

Infrastructure measures configured environment bytes during synthesis and rejects a function above 3,584 bytes. The remaining 512 bytes are reserved beneath Lambda's 4 KiB limit for CloudFormation-resolved names and bounded future runtime keys. The compiled envelope changes the function artifact hash whenever policy changes, preserving immutable promotion without a runtime configuration fetch. Compression is a transport optimization, not secrecy; secrets remain references to Secrets Manager and never enter the envelope.

## Consequences

- A new API feature does not silently expand billing-worker authority or deployment size.
- Versioned pricing behavior remains identical across the API and billing workers, while pack growth no longer consumes Lambda environment space.
- Invalid, oversized, or authority-bearing configuration fails before money processing begins.
- Other narrow workers should adopt the same minimal-bootstrap pattern instead of importing the general API service graph.

## Verification

Contract tests prove strict policy validation. API tests prove bounded round-trip decoding and rejection of unknown authority. Infrastructure tests inspect the minimal worker bootstrap environments and IAM grants and prove synthesis fails when a configured environment crosses the reserved budget. Deployment synthesis bundles the exact policy into every billing-capable artifact.
