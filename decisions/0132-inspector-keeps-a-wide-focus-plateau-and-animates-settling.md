# 0132 — Inspector keeps a wide focus plateau and animates settling

## Status

Accepted

## Decision

Inspector point scale remains at 100% throughout the middle 48% of the viewport radius. Outside that plateau, scale eases continuously to a 20% minimum at every edge. Scale is presentation evidence only and does not change collision radii, graph identity, relevance, or authority.

After a point drag, background pan, nearby reveal, or progressive append, the bounded spatial-hash solver computes one finite target layout. The browser interpolates visible positions to that target over 320 milliseconds, updates attached edges on each frame, and then stops requesting frames. A new gesture cancels the active interpolation before taking control.

## Consequences

- Central points remain legible longer while peripheral context compresses more aggressively.
- Repulsion is visibly continuous instead of jumping directly to the solved layout.
- Stationary scenes still consume no animation loop, server request, or persisted coordinate write.
- The change remains replaceable presentation behavior over exact entities.

