# 0166 — Continuous solar navigation preserves camera

Date: 2026-09-13
Status: Implemented bounded presentation slice; verified locally and in CI, deployed to development

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
public filters and revocation. Desktop/mobile captures were inspected. Corrected
immutable development release evidence follows; no data reset or migration was required.

Product commit `1f7598869c3fc715f6a6ff8cc2cc19eef62dcfce` is pushed.
[CI run 34738311054](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34738311054)
and [development deployment 34738317819](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34738317819)
were dispatched with all reset/paid acceptance inputs disabled. Both remained
queued for GitHub-hosted runners at the initial handoff; this is not deployment
or CI success evidence. The controlled retry and served-release verification
are recorded below.

On 2026-09-14, after almost 21 hours without an assigned runner, the user
authorized cancelling both queued first attempts and one controlled retry.
Both first attempts were cancelled before any step executed. CI attempt 2
received a runner and began verification at 01:30 UTC on the same commit.
CI attempt 2 completed with 77 browser scenarios passing, 18 optional gates
skipped and one drag-to-app preview failure (including its built-in retry).
Deployment stayed cancelled; the original commit is not approved for publication.

The failure was reproduced by holding animation callbacks while delivering
pointer movement and release. Hit testing had used the last painted source
position. The repair uses release-event coordinates relative to the grabbed
world-space center, keeping local-layout coordinates separate and preserving
zoom and off-center grabs. Only current admitted installed-app targets can
receive a preview; Apply/Run authority is unchanged. Normal and delayed-frame
drag/bind/run checks passed three times each without retries. Updated full core
verification passed 927 tests, builds and budgets. The updated full Chromium
suite passed 79 scenarios without retries, with 18 optional gates skipped.
Corrected product commit `7997b9524a38852785b4b979d75139e1c33e4d95` is pushed;
[CI run 34797737001](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34797737001)
received a runner on 2026-09-14 at 02:00 UTC and succeeded at 02:13:51 UTC.
Hosted verification passed all 927 core tests, typechecks, builds, budgets and
infrastructure synthesis; Chromium passed 79 scenarios without retries, with
18 explicit optional gates skipped.

After verifying remote main still identified that exact corrected commit,
[development deployment 34798766469](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34798766469)
was dispatched once with every optional reset/paid acceptance input explicitly
false. It succeeded at 2026-09-14 02:23:33 UTC, including exact release deployment
and CloudFront publication. The reset-gated and optional live/paid scenarios were
confirmed skipped; no existing development account or fact data was reset.

Post-deployment verification at 02:24 UTC confirmed `/api/v1/health` was healthy
and identified `7997b9524a38852785b4b979d75139e1c33e4d95`. The live signup HTML
and all seven matching Inspector/entity/API/newentity1 JS/CSS assets were
byte-identical to the tested local build. In particular, Inspector JS SHA-256
was `bcd2358c9fe117519d314fc52334e26fc5e898c06430b521b1e428adfac0831b`
and Inspector CSS SHA-256 was
`e0c9e4f900580201e6d332a3da280b3199ed585b723dcb12081afed4e5645c2c`.
A clean read-only Chromium check of
[the development entry page](https://d3byneo87fybgf.cloudfront.net/newentity1/)
returned HTTP 200, displayed Create and continue, and reported no page errors.
It did not create an account or modify facts. Interactive animation acceptance
is evidenced by the local and hosted deterministic browser scenarios above,
not by the anonymous live smoke check alone. Production was not changed.

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
