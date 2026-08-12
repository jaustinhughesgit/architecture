# 0030: Reclassify Unclassified Path Failures Through Capability Jurisdiction

- Status: Accepted
- Date: 2026-08-12

## Context

An unanswered question may require either a missing local Essence Path or a fresh external capability. The browser first attempts the local contract, but some cold misses carry no reliable local-graph classification. Treating every such failure as local can make the Path LLM describe a provider operation that the deterministic local compiler cannot represent. Treating every failure as external could incorrectly create compute entities for stored user data.

## Decision

An explicitly classified local graph miss remains in Path repair and Edit. When an otherwise compute-eligible cold question has no local classification, the browser asks capability jurisdiction before starting its required local Path build. A `not_compute` decision marks the check complete and resumes that local build exactly once. Legacy misses that already entered local repair may send their preserved evidence through jurisdiction once with `localRepairExhausted`.

Capability discovery may build or reuse an external entity. If it returns `not_compute`, the browser restores the original local failure and offers the existing scoped Edit repair. Background repair-status polling uses HTTP success for a completed poll and carries deterministic acceptance or rejection in the JSON lifecycle result.

## Consequences

- Provider-backed cold misses can reach generic compute construction without domain vocabulary or wasted local compiler rounds in the browser.
- Classified local data misses cannot escape into external capability creation.
- Failed jurisdiction does not discard the LLM interpretation, rejected candidates, or Edit recovery path.
- A terminal candidate rejection is no longer confused with a failed status transport request.

## Verification

Test the local classification guard, the one-time exhausted-repair handoff, compute build/reuse continuation, `not_compute` restoration to Edit, and successful polling with a JSON rejection result.
