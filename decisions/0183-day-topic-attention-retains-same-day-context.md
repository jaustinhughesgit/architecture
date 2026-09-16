# 0183: Day/topic attention retains same-day context

Status: Implemented bounded slice.

Verified locally and live; deployed to development as
`c28127d9269b39b600c74aaae8cafb6144111be8` (run `35116414096`, no reset).
Full verification passed with 1,108 tests, plus ten focused browser regressions
and a fresh-account live day/topic scenario.

The existing Sunburst day control now supplies two bounded exact-ID sets to
Inspector: selected-ray activity and all activity recorded for the same local
day/install. Topic points, their exact attached fact endpoints and their
deterministic owner path remain large/bright. Unrelated same-day points sit
nearby as closed 9-pixel dots at 65% opacity, and inactive admitted points sit
small at 30% on the perimeter. Effective category or recorded ray supplies topic
relevance only after same-day use is proven. Sibling branches cannot enter
through owner adjacency, and labels cannot create a chain.

Current admission, graph identity, protected boundaries, chosen owner, filters
and camera remain unchanged. Day selection supersedes stale manual emphasis and
outside dismissal but does not replace graph input focus. This extends existing
solar attention/layout, not a second history engine or model route. Managed
systems retain their own authority and do not inherit the actor's activity.
Missing historical activity remains unavailable rather than inferred from facts.

See product decision 0131, local recency/attention/layout tests and the multi-topic,
two-day Sunburst browser scenario.
