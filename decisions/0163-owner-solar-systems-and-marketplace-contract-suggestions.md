# 0163 — Owner solar systems and marketplace contract suggestions

Date: 2026-09-12
Status: Accepted; bounded implementation verified and published to development

## Decision

Inspector V2 remains one canvas and one exact graph projection, partitioned visually by recording owner/publisher. Dotted white circles fit admitted full-size points and retain a physical gap during dragging, expansion and settling. Owner-local descriptions of another person stay local. Exact public records remain in their publisher's system. No namesake merging or persistent geometry is introduced. Boundary controls, a user navigator and Fit systems preserve the existing exact Filter pills.

Bundle proven cross-system connections into a portal with one numbered diamond at the focused boundary and a destination label. Its accessible popup lists exact evidence. Active recorded cross-owner references count by relation identity; verified installed-app publisher references count once per listing, not once per version. Queries, shared scalar values, similarity and recommendations count zero. A currently verified installation can expose signed publisher identity in a metadata-only system, without implying public graph hydration or permission. Revoked/unverified installs do not supply portal evidence.

Keep marketplace candidates outside the system whose admitted data matches their declared inputs or dependency property/current-state contract. The existing marketplace search optionally derives a bounded applicability summary from the verified root package; no local bindings, program code or protected requirement details are exposed. Filters run before local matching. Exact installed bindings to admitted owned data may keep an app visible under filters; installed listings remain one app point with a dashed marketplace ring. Details explain the match, changes, price and permissions. An explicit price confirmation routes installation through the existing exact-ID CLI lifecycle. Opening, moving and matching never execute or charge.

## Boundaries and proof

Verified root-package semantic tags can supply an explicitly labelled relevance hint when the input is more general than the object label. This does not claim binding compatibility and does not trust listing marketing tags. Installed provenance is rechecked on visible focus/return and every sixty seconds; uncertain or failed checks hide portal evidence while local app projection remains available.

This repairs reusable projection and search-contract primitives, not a car-wash-specific recommender or a second execution plane. Existing indexed retrieval and scene budgets remain bounded (96 points, 40 owned and 28 peer entities); larger graphs still use existing admission/overflow behavior. Circles accommodate the admitted window, not all data in storage. Synonym learning, complete marketplace recall, private-sharing writes and million-user layout/quality proof remain Partial or out of scope.

Product source/test details are in `onevar-platform/docs/decisions/0105-inspector-owner-systems-and-contract-suggestions.md`. Unit/API/browser checks must prove containment, disjoint owners during growth, exact connection count, revoked exclusion, contract matching under filters, same-name independence, popup keyboard behavior and mobile navigation. Deployment is reported only after the immutable release succeeds.

## Verification

Candidate `09afc89eaace720d6f299fe9d2143bcad36133f7` passed all 909 local unit/contract/infrastructure tests, type checks, build and bundle budgets. Its complete serial browser suite passed 77 scenarios without retries, with 18 explicitly gated live/paid scenarios skipped. Coverage includes multi-user disjoint circles, focus/navigation with retained filters, mobile navigation restoring readable zoom, exact installation-publisher portal evidence and keyboard inspection, declared-contract suggestions, declined installation without side effects, the full signed marketplace lifecycle and the original offline/public-refresh scenario. The offline scenario additionally passed three consecutive isolated runs with its test unchanged after removing a presentation-to-command-module dependency.

Final release `cf5271c34a26e6bf58cdb9aee3bfb9e05127f589` adds only a calendar-independent Journal browser fixture and fixed Sunday boundary coverage to the application candidate above. All 910 unit/contract/infrastructure tests, type checks, builds, bundle budgets and infrastructure synthesis passed in [CI 34731752282](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34731752282). The hosted browser suite passed 76 scenarios on first attempt and the remaining existing audio-relay scenario on retry, with 18 explicit live/paid gates skipped. The Journal fixture additionally passed locally under UTC. The original hosted attempt exposed a false test expectation across the UTC Sunday boundary; product calendar semantics were unchanged.

[Development deployment 34732361526](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34732361526) succeeded for the identical final release with resets, paid/live canaries and graph-account creation disabled. The public `/api/v1/health` endpoint reports `cf5271c34a26e6bf58cdb9aee3bfb9e05127f589`; the served entity HTML, entity JavaScript/CSS, Inspector JavaScript/CSS and shared API JavaScript match the verified local build byte-for-byte after CloudFront invalidation. An isolated read-only browser check loaded `/newentity1/` with HTTP 200, its creation control visible and no page errors, without creating an account. Production and existing development account data were unchanged. Existing users refresh their Inspector; no reset is required.

These results distinguish local/CI behavior proof and served-release verification from paid live acceptance. They do not claim unlimited marketplace recall or million-user layout quality.
