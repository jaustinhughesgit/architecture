# 0179 — Committed mutations drive visual attention

Date: 2026-09-15

Inspector's existing local exploration projection consumes exact ordinary Context
mutation receipts, not response prose. Changed entities and changed relation
endpoints remain readable; untouched admitted entities become small 30%-opacity
dots. The unchanged owner center stays geometrically fixed. A newer receipt
replaces the spotlight; manual exploration, day/ray selection, owner navigation
and outside-click quiet mode take precedence. Reads, failed requests, background
refresh and old-session receipts do not manufacture new attention. Canonical
mapping retains receipt identity and updates exact IDs.

Managed workspaces emit only ephemeral owner/receipt/affected IDs after successful
authorized publication. They do not persist private graphs under the person or
send data to an LLM. Existing scene/filter admission, protected boundaries,
permissions and mutation/publication contracts are unchanged. UI-only operations
without ordinary mutation receipts do not claim changed facts.

Implementation and verification are recorded in `onevar-platform` decision 0127.
Status: Implemented and development-verified on 2026-09-16. Source release
`ebf8262b7396ab15819604cadae234f176f57632`, deployment `35102637076` succeeded
without a reset; personal and managed fresh-account live acceptance both passed.
Local verification passed 1,096 code tests and 25 focused browser tests (one
opt-in live-AI canary skipped). Full CI was still running when recorded; this
status does not claim a complete browser-suite pass or production deployment.
