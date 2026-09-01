# 0126 — Website release publication is separate from infrastructure state

## Status

Implemented in `onevar-platform` — 2026-09-01

## Decision

CloudFormation owns each stage's private website origin, CloudFront distribution, routes, headers, and permissions. It does not own the completion state of a release-specific CloudFront cache invalidation.

The immutable release workflow uploads the exact website bundle through the stack, lets CloudFormation finish, then creates and waits for one whole-site invalidation before deployed browser acceptance begins. The distribution description remains stable per stage so an application release does not manufacture a distribution configuration change.

An automated rollback recovery may skip only failed `Custom::CDKBucketDeployment` resources from the superseded invalidation-coupled design. Any other failed resource remains an operator-visible hard stop.

## Rationale

CDN invalidation is release propagation evidence, not durable infrastructure state. Coupling its waiter to a CloudFormation custom resource allowed a transient CloudFront invalidation-status regression to roll back otherwise healthy Lambda and website changes, and the same waiter could then prevent rollback from completing.

Separating the concerns retains the exact-release gate while making propagation safely retryable. An invalidation failure can fail the release workflow without corrupting or rolling back the deployed infrastructure contract.

## Evidence

- `onevar-platform/infra/lib/application-stack.ts` keeps the distribution stable and removes invalidation fields from the bucket-deployment resource.
- `onevar-platform/.github/workflows/deploy.yml` performs narrow legacy-stack recovery and explicit post-stack invalidation before acceptance.
- `onevar-platform/infra/test/application-stack.test.ts` proves the synthesized separation.
