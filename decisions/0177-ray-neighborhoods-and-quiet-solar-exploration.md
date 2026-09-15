# 0177 — Ray neighborhoods and quiet solar exploration

Date: 2026-09-15

## Decision

Inspector's existing solar projection places people near the active People ray,
promoted owners near their source entity's effective ray, and marketplace
suggestions near their exact applicability match's ray. Proximity has no graph
or execution authority. White suggestion stars enlarge for black readable labels;
installed apps remain one dot with a star badge and exact lifecycle controls.

Remove inter-system canvas lines/diamonds/counts, retaining the recorded
connection details in solar navigation. Whole-system dragging uses temporary
exact-owner coordinates; no camera, ContextDB or durable location write occurs.
Navigation still performs the existing collapse and supernova animation.

Explicit entity focus keeps its exact owner path and adjacent detail readable,
with active lines at full opacity. Other admitted interior points move outward
within their category sectors and become compact at 30%. Outside clicks reset
manual exploration: the owner center stays prominent, other interior dots are
small at 50%. Bounded near-clicks restore readable neighborhoods at full opacity.
Default day/ray attention retains its previous depth and 20% line behavior.

This supersedes only the affected presentation choices in decisions 0163–0166
and 0176. One-open-owner rendering, filters, exact ownership, authorization,
revocation, protected keys and marketplace execution authority are unchanged.
No server or local fact schema changes. See product decision 0119 for mechanics
and test evidence. General unbounded rendering and production scale proof remain
outside this bounded presentation slice.

## Status

Release `2a53e232a5f81483fc8496e366d8de88be865b5f` is deployed to development.
Final verification includes all 354 web unit tests and the full local browser
suite: 85 passed, 18 gated live-only scenarios skipped, with retries disabled.
Twenty repeated drag/focus checks passed. The deployed managed-wormhole scenario
passed without retries in 23.4
seconds using fresh synthetic accounts. The health release and website asset
names match the tested build. No shared-state reset or production deployment
was performed.

[Development deployment](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34999325844)
completed successfully. The broader
[hosted CI rerun](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34999315075)
is still in progress at handoff, separately from these completed proofs. The
prior full run exposed an outdated 20% focused-line assertion and drag flakes;
the follow-up corrects the expectation, freezes the painted layout during a grab,
and checks stable pointer targeting without relaxing timing/distance assertions.
