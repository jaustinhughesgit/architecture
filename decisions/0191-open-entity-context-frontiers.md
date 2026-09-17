# 0191 — Open-entity double-click extends bounded context

Status: Implemented browser-local slice; verified locally; not deployed.

The current Inspector presentation primitive gains progressive exact-chain
exploration, not another graph or execution capability. Double-click/double-tap
on an open ordinary point traverses its currently visible forward and incoming
branches independently, stopping at the first closed point on each. Newly revealed
points cannot seed more traversal in that gesture. Facet links count individually;
cycles and unavailable/other-owner IDs stay bounded. Repetition advances again;
an admitted chain end does nothing and does not query additional records.

Preserve the visible foreground in a transient exact-ID mask, rather than letting
generic owner-path completion unfold additional ancestors or unrelated siblings.
Prune current admission, remap publication IDs and clear on new response/day/owner/
focus or explicit exploration. Existing solar geometry and finite animation handle
the extra context without moving the camera or persisting coordinates.

Single clicks on any open ordinary entity and keyboard activation open details.
Selection is not required. The shared pointer arbitration captures openness at
the first tap and cancels the single-click details action on double gestures;
double-click expansion never opens a popup, even at a chain end. Small dots,
special app/protected/wormhole surfaces, review selection, quiet scans, drag/drop
and empty-space depth peeling keep their existing behavior. Browser-local changes
do not modify entity composition, request/response schemas, Path/Essence/Compute,
persistence, permissions or protected-data authority. No LLM or network fetch.

Implementation and proof: `onevar-platform` decision 0139,
`exploration-gestures.test.ts` and `tests/browser/solar-exploration.spec.ts`.
Local proof passed 410 web unit tests, web typecheck and build/bundle budget. The
corrected single/double gesture and review-star suites passed eight browser
scenarios (one paid live canary explicitly skipped), including real mouse/touch,
no transient popup, unselected-open single-click details and prior quiet gestures.
