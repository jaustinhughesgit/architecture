# 0001: Canonical Cross-Layer Architecture Repository

- Status: Accepted
- Date: 2026-07-31

## Context

The `aws`, `aws-api`, and `compute` layers are separate Git repositories but implement one platform. Keeping a complete architectural explanation in each repository would create competing sources of truth. Keeping it only in their unversioned parent directory would make it easy to lose.

## Decision

Maintain a fourth `architecture` repository as the canonical description of cross-layer concepts, contracts, decisions, and capability maturity. Keep concise `AGENTS.md` and layer guides in each implementation repository. A workspace-level `AGENTS.md` routes development work to the canonical material.

The documentation is living and explicitly separates implemented behavior from product intent, proposals, and unknowns.

## Consequences

- Cross-layer changes must update the canonical documents and affected layer guides.
- Each implementation repository remains independently deployable.
- The architecture repository needs its own remote and normal review process.
- Repository-local instructions repeat only critical guardrails and references, not the full architecture.

