# 0010: Confirmed Path Foundation Promotion

- Status: Accepted
- Date: 2026-08-07

## Context

Identity-scoped Path rows are intentionally deleted during a hard test database reset. That is useful for clean acceptance testing, but it also erases locally proven wording coverage that a foundation author wants every future account to receive. Editing the bundled dataset for every learned sentence would make warm-up slow and would confuse one user’s saved library with the reviewed platform foundation.

The originating sentence is also necessary evidence. A signature alone is difficult to review and does not show which concrete interaction produced the learned grammar and bindings.

## Decision

Path Builder exposes canonical equations and exact family aliases as separately reviewable rows. Each row displays its originating sentence. A foundation author may explicitly confirm an equation only when:

- the exact signature has passed the browser candidate tournament or an approved dataset quality gate;
- the exact left-side grammar and its own typed bindings are preserved;
- a non-empty originating sentence is stored with the promotion; and
- the authenticated caller has explicitly enabled foundation-author authority.

Confirmation materializes that exact syntax as a standalone, validated Path in the same semantic family. It does not generate a new operation and does not copy model-authored executable rows. The promoted artifact retains its proof summary, origin, confirmer, source identity, and timestamps.

Confirmed artifacts are stored in a retained platform-foundation table separate from identity-scoped `paths`. Test reset clears identity Paths and ContextDB state but does not clear this reviewed foundation table. Initial Path hydration merges the confirmed foundation into every identity’s library, publishes the complete set to the local worker, and marks confirmed rows as foundation-managed.

Confirmation is an explicit promotion action, never an automatic consequence of model generation or local success. The current test deployment may authorize all authenticated testers through its explicitly enabled test-author policy; production governance can narrow this to designated publishers without changing the artifact contract.

## Consequences

- A hard reset can prove cold account/data behavior without discarding reviewed warm Path coverage.
- One confirmed exact wording becomes available to every account on first hydration.
- Learned aliases no longer remain hidden behind a canonical family count; reviewers can see and confirm the exact sentence they tested.
- The platform foundation can compound through reviewed interactions without adding domain conditionals to JavaScript.
- Revocation, approval roles, immutable release bundles, and staged promotion remain lifecycle work; the retained table is an implemented foundation, not a complete marketplace governance system.

## Alternatives considered

- **Keep confirmation as a flag on the identity Path row.** Rejected because hard reset deletes that row and because a personal save is not a shared publication lifecycle.
- **Append every confirmation directly to the bundled JSON dataset.** Rejected for interactive warm-up because it requires a code commit and deployment per sentence. Bundled releases remain useful for curated offline defaults.
- **Automatically promote every passing learned Path.** Rejected because local success is evidence, not global publication authority; explicit review and provenance are required.

## Security impact

The confirmed library is executable local routing data shared with every account. Promotion therefore requires authentication, explicit author authority, strict Path validation, local proof, and a preserved source sentence. Confirmed artifacts contain no ContextDB facts or protected plaintext. Listing is a read-only distribution operation. Production publisher roles, revocation, and staged rollout need further hardening before treating this as an open ecosystem.

## Migration

Existing identity Paths and bundled foundation Paths continue to work unchanged. New confirmations are stored as standalone exact artifacts. On hydration, a confirmed artifact with the same signature is platform-managed and supersedes the identity copy for execution. Existing aliases without per-alias proof remain visible but require a new successful local validation before confirmation.

## Verification

- Promotion rejects an equation without an origin sentence or passing proof.
- An alias promotion preserves the alias signature, structural grammar, and bindings while reusing the canonical semantic transform.
- Initial hydration installs retained confirmed Paths for another identity.
- `resetDB` does not enumerate or clear the retained foundation table.

## Affected repositories

- `architecture`
- `aws`
- `compute`
