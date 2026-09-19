# 0201 — One temporal primitive for admission, storage and story queries

Status: Implemented and locally verified in the clean platform; deployed to development in
`f6726fb0eefcc28a5826258c767bc51e5f220fc3` through [workflow 35414923608](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35414923608).

An absolute date exposed a gap in the single-property Path tier: an archived
broad property/fixed-value grammar consumed a date across both operands. The
existing typed calendar writer could not normalize a value never identified as
time. Calendar admission now defers that malformed shape to existing composition
using complete shared syntax, while retaining genuine whole temporal values and
literal identity names. Remote archive suggestions revalidate locally.

The clean runtime ships bounded calendar-story question equations through its
existing content-addressed query algebra. They join current exact actor,
occurrence and time evidence; normalize the query with the current request clock
and zone; and return independent witnessed stories. Exact date/time/zone identity
and date-only containment remain separate. Invalid calendar questions clarify
even without stored facts. Old unanchored relative strings cannot pass an anchored
date predicate merely by equal words.

Read results include bounded current occurrence details with relation/version
evidence and visible truncation, not historical response text or model-generated
answers. The user remains the owner of local interpretation; ordinary publication
and Inspector shared endpoint projection are unchanged. There is no new server
index, date database, authority, protected-data access, Compute behavior or bulk
historical repair. Fixture tests establish deterministic mechanics, not general
live-model quality. See clean-platform decision 0149 and calendar-stories test guide.
