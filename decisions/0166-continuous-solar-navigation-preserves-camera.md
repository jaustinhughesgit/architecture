# 0166 — Continuous solar navigation preserves camera

Date: 2026-09-13
Status: Implemented bounded presentation slice; verified locally, deployment pending

An owner opens at its last displayed world center rather than replacing the
previous owner at the canvas origin. Pan and zoom remain unchanged. Growing
systems move collapsed neighbors outward along remembered bearings, keeping
marketplace suggestions in the nearer discovery layer and named owners farther
out. Only explicit Reset zoom/Fit systems controls change the camera.

The existing browser projection now owns one finite, interruptible visual
transition: the previous dots collapse into their moving owner circle over
420 ms; new dots launch farthest-first, cruise at the same world-space speed and
brake only near arrival. Relationship and portal lines appear after the 1,280 ms
switch finishes. Reduced motion lands immediately. SVG focus is circular, not
rectangular, and keyboard/detail focus cannot scroll the canvas.

Departing points are inert, bounded, memory-only painted geometry, intersected
with current admitted exact IDs. They grant no inspection/execution authority and
disappear immediately on exclusion or revocation. They do not perform layout,
discovery or a new query. Rapid switches reuse the last painted frame; refreshes
do not restart opening. No API, persistence, permission or lifecycle schema changes.

This supersedes decision 0165's forced origin and simultaneous 600 ms opening,
not single-open-system filtering, exact public provenance, outside-click reset
or marketplace identity. Product decision 0108 specifies the implementation.

## Evidence

Pure tests prove launch ordering, equal cruising speed, near-target braking,
exact arrival, continuous outgoing shrink and fixed-center neighbor displacement.
Targeted Chromium checks sample actual positions, outgoing dots, hidden in-flight
lines, final wiring, invariant camera/scroll, public refresh/filter and revocation.
Full local verification passed 926 unit/contract/infrastructure tests, type checks,
builds and bundle budgets. The full Chromium suite passed 78 applicable scenarios
without retries, with 18 explicit live-service/paid gates skipped. Final focused
checks cover rapid reversal, late wiring, camera/scroll stability, reduced motion,
public filters and revocation. Desktop/mobile captures were inspected. Immutable
development release evidence will follow; no data reset or migration is required.
