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

Product commit `1f7598869c3fc715f6a6ff8cc2cc19eef62dcfce` is pushed.
[CI run 34738311054](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34738311054)
and [development deployment 34738317819](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34738317819)
were dispatched with all reset/paid acceptance inputs disabled. Both remained
queued for GitHub-hosted runners at the initial handoff; this is not deployment
or CI success evidence. A thread follow-up will verify the served release and
asset bytes before recording publication.

On 2026-09-14, after almost 21 hours without an assigned runner, the user
authorized cancelling both queued first attempts and one controlled retry.
Both first attempts were cancelled before any step executed. CI attempt 2
received a runner and began verification at 01:30 UTC on the same commit.
Deployment remains cancelled until that CI attempt passes; a deployment rerun
must retain the original disabled reset/paid acceptance inputs.

## Manual acceptance

Refresh an existing account and use Fit systems to bring the owner circles into
view. Open another circle: the prior dots must contract and disappear while the
new dots launch in distance order, with no connecting lines until arrival and no
rectangular focus outline. The world transform and chosen circle center remain
unchanged, while neighboring circles move outward. Reverse the switch before it
finishes and check that the motion continues from the current positions. Pan or
use a non-default zoom before switching and confirm it is retained. Reset zoom
is the explicit way to center the selected owner. Repeat with reduced motion,
day changes, public refresh and saved filters; none may restore excluded data.
