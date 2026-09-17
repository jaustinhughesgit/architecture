# 0191 — Open-entity double-click extends bounded context

Status: Implemented browser-local slice; verified locally; deployed to development.

Selection-ring refinement (deployed in `6205009a5ee93d83ae24c1589bbd8efc89eb97c0`,
workflow `35263320384`): exact detail-ready focus now
shares its predicate with a white circular selection ring. Open but unfocused
dots, quiet/departing/collapsed states and active review selection do not advertise
the popup gesture. Node geometry and double-click expansion remain unchanged.

The focus-first single-click refinement is deployed to development in release
`a7ddc753448bf01c62c9c72185b64217ffbf5e63` by workflow `35261912130`.
Live health and byte-identical entity/Inspector assets prove publication;
exact-commit validation continues after publication in the same workflow.
Double-click context expansion remains unchanged, and no shared-state reset ran.

Release `fccebad233bb5741d4ec6a201a13a51b6c72a6c1` was published by
[workflow 35258724778](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35258724778).
Live health identifies the release; served entity, Inspector and review-star
JavaScript match the locally verified build byte-for-byte. The same workflow
tracks extensive validation after publication. No shared-state reset was run.

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

Single clicks on an unfocused entity focus it without a popup, even when open.
A separate single click on the exact focused entity opens details; keyboard
activation retains immediate detail access. The shared pointer arbitration captures
focus before the delayed single-click action and openness at
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
no transient popup, focus-then-details single clicks/taps and prior quiet gestures.
