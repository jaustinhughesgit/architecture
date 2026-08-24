# 0052: Build the replacement as a clean-room platform with a separate domain cutover

**Status:** Accepted

## Context

The proof-of-concept repositories established the platform primitives but accumulated multiple overlapping runtimes, representations, deployment paths, and large coordination modules. Preserving them inside a replacement would retain the same iteration and regression costs.

The public homepage must remain available, while the new route contract is `/newentity1` for primary-entity creation and `/<entityId>` for one command-first entity operating surface. Legacy `/portal`, `/newuser`, and `/main` routes are not new-platform contracts.

## Decision

Create `onevar-platform` as a clean-room TypeScript product monorepo containing the website, framework-independent runtime, canonical contracts, browser-facing API, application AWS infrastructure, and acceptance tests. Create `onevar-operations` as the separate account-level authority for attaching `1var.com`, promoting environments, and rolling back the domain.

The legacy `aws`, `aws-api`, `compute`, and `testing` repositories remain intact as behavioral evidence and test oracles. The replacement does not import or execute their runtime code. Behavior is ported through explicit contracts and scenarios.

The entity page begins as a command surface. A command may enable a graphical projection over that same runtime; the projection does not acquire separate state or execution authority.

Production uses the newest Lambda-supported active-LTS Node release and pinned modular AWS SDK v3 packages. At acceptance this is Node.js 24.

## Alternatives

- Incrementally reorganize the existing repositories: rejected because obsolete implementations and implicit compatibility contracts would remain on the active path.
- Split every layer into another repository: rejected because cross-layer contract changes would again require coordinated releases.
- Attach the production domain inside the product stack: rejected because routine product deployment should not automatically receive apex-domain cutover authority.

## Consequences

- Product, contract, infrastructure, and proof changes can be atomic.
- Domain cutover remains a separately reviewed and reversible operation.
- Existing capabilities retain their documented implementation status in the POC until they are independently implemented and proven in the replacement.
- No new-platform capability may be described as deployed merely because its POC equivalent exists.

## Affected repositories

- `architecture`
- `onevar-platform`
- `onevar-operations`
- `aws`, `aws-api`, `compute`, and `testing` as read-only migration evidence

## Security impact

The clean stack starts with a same-origin API, an opaque `__Host-1var_session` cookie, private S3 origins, exact route/entity identifiers, and a separately controlled production domain. The decision does not transfer protected assets or legacy credentials.

## Migration

1. Prove the replacement under an isolated distribution.
2. Port capabilities in bounded vertical slices using legacy acceptance cases as evidence.
3. Attach `1var.com` only after homepage, entity creation, entity command routing, API health, security headers, and browser acceptance pass.
4. Retain the prior distribution target as the rollback record.

## Verification

- Clean repository import checks and review.
- Unit and contract tests for routes, sessions, exact IDs, and command effects.
- AWS CDK synthesis proving Node.js 24, private S3, CloudFront, same-origin HTTP API, and on-demand DynamoDB.
- Thin browser acceptance from `/newentity1` through exact entity navigation and `ui on`.
- Deployed isolated-distribution acceptance before domain cutover.

