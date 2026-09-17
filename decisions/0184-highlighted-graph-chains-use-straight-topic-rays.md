# 0184: Highlighted graph chains use straight topic rays

Status: Implemented bounded slice; verified locally and live; deployed to development.

The clean browser Inspector generalizes its existing exact-edge branch layout.
The active, admitted owner graph has one deterministic presentation home per
entity. Primary chains form straight rays within their subject's Sunburst area;
secondary uses of an already placed entity use curved references. Facet points
remain addressable and independently draggable. Their colors and exact source
identities are unchanged, even when chain cohesion places a facet outside its
own category bearing. Branched facets remain junctions rather than being folded.

The day lens no longer repacks foreground nodes independently. Fork-aware spacing
preserves chains and avoids overlap; unrelated same-day activity remains closed
near the owner and inactive data remains peripheral. Existing attention,
permissions, filters, one-open-owner motion and temporary dragging remain.
Presentation parents confer no ownership, lifecycle, use or protected authority.
Only currently admitted exact relations draw either straight or curved links.

No server, Path, Compute, JPL, canonical identity, persistence or protected-data
contract changes. No LLM or label-specific layout rule is introduced. Pure and
browser tests prove the bounded rendering behavior. See clean-platform decision
0132 for implementation and acceptance evidence. Arbitrary graph optimality and
unbounded projection remain outside this slice.

## Compact-layout source refinement — 2026-09-16

Implemented locally; deployment of this refinement is pending. Per-chain displayed
radii and bounded lateral packing replace multiplicative fork stretching and global
scene scaling. Each fork can borrow lateral room around its preferred topic bearing;
shared-reference facet clearance adjusts only that arc. Straight chains, exact IDs,
camera position, attention and authority remain unchanged. See product decision
0132's compact-layout addendum for bounds and local test evidence. The deployment
evidence below applies to the earlier ray release, not this refinement.

## Acceptance evidence — 2026-09-16

Clean-platform release `3bb05218939f91ac4aa2f49372dae7f0f7582bd1` passed
`npm run verify` (1,115 unit tests, type checking, builds and unchanged bundle
budgets) and the complete local browser suite (93 passed, 20 live-only skips).
[Development deployment 35127609371](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35127609371)
published that exact release without resetting shared development data; the
deployed health endpoint reports the same SHA.

Two fresh-account deployed Chromium checks passed: `ray-chains.spec.ts` with
`ONEVAR_RUN_RAY_ACCEPTANCE=true` (straight facet chains, one shared value,
curved reuse, collision clearance, solar containment and temporary dragging),
and the existing Sunburst day-lens scenario with
`ONEVAR_RUN_DAY_LENS_ACCEPTANCE=true` (topic/day tiers, focus preservation,
collapsed same-day neighbors, older perimeter activity and reload). Screenshots
were visually inspected. This is the deployment evidence following the local
proof recorded in clean-platform decision 0132.

[GitHub CI 35127590405](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35127590405)
completed successfully for that exact release: 92 browser tests passed first
attempt, one audio-invitation scenario passed on retry, and 20 live-only checks
were skipped. The ray layout and Inspector regression scenarios passed.
