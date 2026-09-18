# 0197 — Anchored ordinary date-clock values

Status: Implemented bounded slice; focused local verification. Development
publication evidence is maintained in product `docs/testing/anchored-date-clocks.md`.

Extend the existing ordinary temporal value primitive, not a domain-specific
parser, a timeline subsystem or a scheduling path. Complete date + `at` + clock
phrases normalize locally into optional strict `{kind: "dateTime", date,
localTime, timeZone}` metadata. Existing day-part metadata and ISO date-only
scalars remain readable. Human wording stays evidence, never temporal identity.

Paths bind semantic roles; the deterministic temporal primitive resolves relative
dates once against the original input clock/zone. Bounded word/digit AM/PM, HH:mm,
noon/midnight and explicit UTC/IANA zones are supported. Ambiguous hours, invalid
clocks, DST gaps/folds and conflicts clarify atomically. Known Paths need no model.
Cold language learning continues through the existing untrusted proposal/proof
boundary. Clock colons must survive shared lexical capture.

Typed equality preserves one owner-scoped time value independently of its label
without merging independent events. Same-zone date containment is a query
predicate, not identity. Cross-zone instant equivalence and day-part-to-clock
containment are not inferred. Publication/IndexedDB/Dynamo retain validated
metadata through existing exact-ID contracts. No server reanchoring, endpoint,
permission expansion, protected plaintext, Compute/JPL or Journal change occurs.

Inspector relative labels age while data stays fixed; one time circle retains
date/clock/zone details and existing exact-story browsing. Historical unanchored
values remain untouched; no automatic repair from today's clock and no reset.
See product decision 0145 for implementation bounds and measured bundle impact.
