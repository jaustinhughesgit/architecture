# 0004: Versioned LLM Request Templates

- Status: Accepted
- Date: 2026-08-04

## Context

1var uses models at several browser and compute stages. Replacing model strings independently would make rollback slow and could mix old and new routing inside one multi-stage request. Allowing the browser to choose raw models would also turn pricing, capability, and compatibility policy into an untrusted client input.

## Decision

Expose a Message-level dropdown that selects a versioned template ID. Keep `original-v1` as the fail-safe default and add `new-v1` as an explicit GPT-5.6 experiment. Propagate one immutable selection through the complete request lineage. Each model-owning server validates the ID and resolves it through its own trusted route registry.

The Cost module records the template alongside actual returned model traces. Template IDs are durable meanings: future experiments add a new ID rather than silently changing Original.

## Alternatives

- Replace every default model at once. Rejected because rollback and attribution would be poor.
- Let the browser send model names and reasoning fields. Rejected because untrusted clients must not control provider-cost and compatibility policy.
- Apply the selector to only classification. Rejected because a single request could then mix experimental and control treatments.

## Consequences

- Cross-layer requests carry one additional non-sensitive string.
- Background job state must preserve the selection.
- Unknown IDs safely run Original.
- The registry and template documentation must be updated together when a new template is introduced.
- Cost can be compared immediately; quality still requires representative evals and successful-task metrics.

## Affected repositories

`aws`, `aws-api`, `compute`, and `architecture`.

## Security impact

The selector contains no prompt or protected data. Raw client model names are ignored. Existing zero-trust and protected-asset boundaries remain unchanged.

## Migration and rollback

Existing clients omit the field and therefore run `original-v1`. Users can select Original at any time. Removing New from the UI does not require changing the Original route.

## Verification

- Unit-test normalization, fallback, route mapping, and endpoint-specific reasoning fields.
- Contract-test browser propagation through worker, Path, compute, and background state.
- Compare actual Cost rows and representative task outcomes for both templates.
