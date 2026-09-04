# 0138: Inspector optimizes relevance-preserving slots

## Status

Accepted

## Context

Inspector V2 assigned relevance rings correctly but initially chose directions from stable list order. Exact connected subgraphs could therefore occupy opposite sides of the scene and send lines through the center. A continuous force or attraction pass shortened some lines by changing point geometry, but also weakened the meaning and stability of the relevance rings.

## Decision

The semantic scene compiler first assigns every point to its focus, primary, secondary, or ambient relevance band. It then performs at most three deterministic slot-ordering passes over only the exact edges already admitted by the bounded scene. A pass computes the angular direction of each point's exact neighbors and considers cyclic assignments to the positions already available inside the same compatible slot group. It accepts an assignment only when the combined rank-weighted line length and non-focus center-intrusion score improves.

Owner-local Context points exchange slots only with owner-local points in the same relevance role. Authorized peer detail points exchange slots only inside the same peer cluster. The optimizer never moves a point to a more or less important ring, creates an edge, changes a Sunburst category, persists a coordinate, or calls a model or server layout.

The discrete ordering runs on initial scene compilation and graph-topology changes. Pan, reveal, and point-drag completion run only spatially hashed collision separation, so ordinary navigation does not repeatedly reorganize the graph. A topology change animates from current positions to the newly compiled slots.

## Consequences

- Connected entities normally occupy the same angular neighborhood and require shorter lines.
- Non-focus connections are discouraged from crossing the center.
- Relevance remains visually authoritative because positions are permuted inside a band instead of attracted across space.
- Work remains bounded to three passes over the current V2 scene window and stops after compilation.
- Arbitrary graphs may still contain crossings; edge-specific moat masks continue to distinguish them.
