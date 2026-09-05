# 0141 — Sunburst days navigate current entities

Status: Accepted

Wheel commit selects today's category activity in Inspector V2. Center taps cycle yesterday through four days ago and back to today. Five thin white orbit lines and a selected-day label expose the navigation state without changing spin, hold or drag semantics.

Use a disposable five-day browser-local reference index (maximum 2,000 owner-scoped entries), not historical entity snapshots or retained conversation text. Exact mutation receipts, current relation endpoints, app events and explicit point opens provide evidence. Publication remaps IDs. Up to 24 newest references prioritize only currently owned or currently authorized candidates; missing references fail closed. Category colors and real connections remain independent of the navigation lens. `entity.opened` is low-weight daily presence; passive navigation is not an event.

Cross-device history, old-count backfill and inferred targets for ordinary answers without exact IDs are not implemented by this slice.
