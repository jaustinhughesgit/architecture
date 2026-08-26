# 0074: Private development hard reset

- Status: accepted
- Date: 2026-08-25

## Decision

1var development environments expose a private, MFA-gated Step Functions control plane for global test resets. A local operator script assumes the reset role and starts the workflow. No public API route or Lambda Function URL can start it, and production does not contain the reset resources.

The workflow erases all rows in the environment's runtime DynamoDB table and all generated capability packages under their dedicated S3 prefix. It uses bounded, repeated pages and continues until both stores return empty. It preserves the deployed web application, secrets, infrastructure, and the code-bundled, content-addressed core semantic catalog.

## Why

A user-scoped Context reset is not a clean-system test: identities, sessions, public Context, compute releases, authoring jobs, grants, and other users remain. Recreating the whole CloudFormation stack is slow and risks conflating infrastructure drift with runtime behavior. The private workflow creates a repeatable baseline suitable for measuring cold Convert authoring and preventing functional leftovers from masking regressions.

## Consequences

- The operation is destructive and development-only.
- Operators must supply MFA and an exact stage confirmation.
- A dry run reports the number of targeted rows and generated packages.
- A successful reset invalidates every browser session. The next test begins at `/newentity1`.
- Protected plaintext is not a reset target because it never entered AWS; device-local ciphertext remains unreachable from the deleted identity and can be removed with local browser storage controls.
- The core catalog is preserved because it is a verified software artifact, not mutable user state.
