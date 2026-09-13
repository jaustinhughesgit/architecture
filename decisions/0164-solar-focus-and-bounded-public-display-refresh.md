# 0164 — Solar focus and bounded public display refresh

Date: 2026-09-12
Status: Implemented; local verification complete, development deployment pending

Inspector entity focus, selected owner system, day/ray attention and camera are
independent presentation state. Explicit entity/pill/system selection chooses the
exact recording owner; a new answered public query may choose its exact publisher.
Day navigation and refresh cannot select a publisher. Owner-rooted topic geometry
uses the active Sunburst template's unrotated slot bearings. Selected circles use
100% white strokes, others 25%; exact connection lines use 20% opacity.

Attention seeds are large, one semantic graph hop is medium, two are small and
three or more are hidden. Addressable fact-chain points remain compact unless
explicitly expanded. Owners and discovery/workbench controls remain available.
Existing filters and bounded admission run first; no attention operation expands
authority, rewrites the graph or fabricates a relationship. Foreign systems retain
their own owner-rooted overview, not an invented foreign activity history.

Ordinary public display may retain its last successfully authorized memory-only
view during a pending exact refresh, bounded to ten seconds. Successful refresh
atomically replaces the publisher's view; explicit denial, malformed response,
identity mismatch, failure, timeout, query expiry, account change or filter removal
removes it. Generation guards discard late replies. Rechecking does not create
a new query activation. Initial/reloaded disclosure still requires authorization.
Display retention is not query, binding, execution or protected authority; those
contracts continue to revalidate independently. Marketplace provenance retains
its existing stricter recheck behavior. This supersedes hide-at-start presentation
in decisions 0160/0161, not canonical authorization or fresh-read requirements.

See product decision 0106 for implementation and tests. This is a bounded browser
projection repair, not persistent coordinates, historical snapshots, new graph
semantics, or an unlimited layout service. Local verification passed 915 tests,
build/type/bundle gates and all 77 applicable Chromium cases (18 explicit live
gates skipped); final public-query/filter/day checks passed again. Hosted CI
and development deployment evidence remain pending.
