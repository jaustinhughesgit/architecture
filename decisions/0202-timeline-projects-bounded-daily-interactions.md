# 0202 — Timeline projects bounded daily interactions over current entities

Status: Implemented as a bounded source slice in the clean platform, locally
verified and deployed to development.

Development release `c98f7d9f3b5e89b09bb4c0996288b4657a481aa4` was published by
[workflow 36319007723](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/36319007723).
Read-only live checks verified the exact API release, matching hashes for eleven
served frontend documents/assets, and the public homepage. No shared data reset,
paid authoring or production deployment was performed.

This includes the tablet header overflow correction found by the first release's
full browser CI and a Timeline fixture hydration wait. The corrected targeted
suite passed fourteen cases under UTC/CI settings, plus three consecutive runs
of the historical resize/detail test. The complete local Chromium suite then
passed 131 tests without retries, with 21 expected opt-in skips; the existing
WebKit worker regression also passed. All used UTC and CI-mode settings. Full remote
validation remains separate from publication and live asset identity checks.

Timeline is another browser presentation of the existing Sunburst interaction
reference primitive. An occurrence means that the person interacted with that
exact entity on a recorded local calendar day. It does not assert the entity's
creation date, a date described by its facts, or a historical version of its data.
One entity may appear on several days. Within each day, its latest interaction
sets its position, newest first; its known interaction count sets its size using
the Sunburst count tiers. Current labels, colors, facts and actions resolve through
the existing Inspector data and rendering boundaries. No lines connect Timeline
entities.

The selected solar border expands into five finite vector rings. Side anchors
reach the viewport edges, after which the top arches flatten into horizontal
date boundaries. Older occurrences travel downward first and newer occurrences
settle last. Today rests near the bottom with a little content visible, leaving
space above it. Five describes only the transition; the scroll surface has as
many retained activity days and explicitly requested empty days as needed.
Timeline starts at a standard readable zoom, supports further zoom and scrolling,
and preserves the independently maintained solar camera. Sunburst's existing
five-day selector scrolls the Timeline to its requested day. Reduced motion skips
the warp and animated navigation.

Extend the existing owner/installation/category/source/day reference index rather
than adding a transcript, canonical event history or new server service. Keep at
most 2,000 daily records and 1,000,000 serialized characters. Older days are no
longer discarded solely because they fall outside the compact wheel's five-day
window; that wheel remains a five-day projection. New records retain their known
count, latest timestamp and recorded zone. A legacy reference establishes one
known interaction only; no old counts, missing days or old values are invented.
Recorded civil days remain stable across browser timezone changes.

At most 64 recent interaction keys per daily reference deduplicate accepted
mutation/app retries. Exact publication remapping merges duplicate source/day
references and known shared interaction keys. The daily display projection also
deduplicates known keys across rays. This is bounded retry evidence, not an
unbounded activation ledger or complete historical audit.

History never grants authority. The current selected owner and filters admit
ordinary owned records, including those outside the solar canvas's 40-point
layout budget. Public occurrences require the exact source to remain in the
currently authorized peer scene; public data is not copied into the history
index. Protected summaries, managed interiors and unavailable references are
excluded. Passive rendering, scroll, zoom and day selection add no interactions.
Opening an entity continues the existing explicit-open behavior.

No Path, Essence, Context entity identity, API transport, Compute/JPL, canonical
persistence, protected-asset or grant contract changes. The altered retention and
count contract belongs to browser-local navigation metadata. It does not provide
cross-device activity, lifetime history or historical entity snapshots. This
extends decision 0141's day-navigation index and leaves the standalone social-media
prototype paused.

Implementation and verification details are in
[clean-platform decision 0150](../../onevar-platform/docs/decisions/0150-timeline-projects-bounded-daily-interactions.md).
