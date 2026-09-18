# 0196 — Anchored day parts and connected-story navigation

Status: Implemented bounded slice, locally verified; deployment evidence is in
product `docs/testing/anchored-day-parts.md`.

Extend the ordinary local calendar-value primitive with optional validated
ContextEntity `temporal: {date, dayPart, timeZone}` metadata. Recognized English
relative day parts and supported explicit dates plus day parts anchor at the
original browser request clock/zone, including frozen review checkpoints. Equal
anchored values reuse an owner-scoped scalar; date or zone differences remain
distinct. A morning is a stated part of day, not an invented exact interval.
Unknown/recurring language stays literal. Warm Paths and typed query filters use
local normalization, not new model calls. Original wording is evidence, not an
evergreen identity alias. Historical unanchored values are not guessed/migrated.

The optional field traverses existing ordinary local persistence, publication,
canonical remapping and API/Dynamo storage. No new service, authority, calendar
index, protected-data exposure, scheduler or Compute/JPL operation is introduced.

Inspector derives aging labels in the recorded zone without changing the stored
identity. Multiple authorized current story subjects referencing one period get
an outside distinct-story count and the existing solid-ring/list/preview controls.
The time entity itself remains in the chain; a chosen story exposes its exact
context. Duplicate edges count once, and foreign/inactive links cannot contribute.
Temporal browsing temporarily unfolds overlapping activity classes. Double tap
returns to story overview; the popup combines date/part/zone with story switching.
CLI/Column retain canonical labels. This is an incoming-story view, not class-based
merging of time values or canonical synthetic graph edges.

See product decision 0144 for schema, rendering bounds, bundle measurement and
runtime/scene/persistence/browser evidence. Live-model general language accuracy
remains Partial/Unknown; deterministic fixture success does not establish it.
