# 0194 — Ordinary calendar-day facts use local canonical values

Status: Implemented bounded slice; verified locally; deployed to development.

## Decision

Extend the ordinary reusable fact writer with deterministic calendar normalization,
not a travel-specific parser or a new event subsystem. Recognized English dates
become validated `YYYY-MM-DD` scalar values. Date-only precision does not imply an
instant/timezone. Exact relative days anchor in the original caller's local calendar.
Bounded tense evidence permits visible missing-year inference; ambiguity and invalid
calendar days refuse atomic writes rather than silently rolling over dates.

The implementation reuses ordinary values, facets, relation versions, original
interaction evidence, publication/remapping and read witnesses. It adds no API
or persistence schema, no remote plaintext access and no new protected permission.
Review freezes the original date clock/timezone; a later re-proof cannot reinterpret
the relative day/year. Old records are not automatically repaired or migrated.

Journal's past-history parser and zoned schedule triggers retain their distinct
contracts. Date ranges, recurrence, clock-time parsing, generalized temporal types,
calendar indexes and new Compute date operations are not claimed. Unknown temporal
precision stays textual. General temporal understanding remains Partial.

## Evidence

Product decision 0142 documents the shared lazy primitive, lower-level executor
injection contract, seven runtime tests, and a focused Chromium publication/reload
and local-query test using package fixtures with zero adviser calls. Production
web build and unchanged startup-size budgets pass. Live model quality is Unknown.
Release `b3d11892777524eb472aac129aae5f24b1bf74e5` was published by
[run 35357576327](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35357576327).
Live health and served asset digests matched; post-release validation was running
at evidence capture. No data reset or historical migration was performed.
