# 0193 — Witnessed phrase-level discourse references

Status: Implemented bounded slice; verified locally; deployed to development.

Product release `0659449b20d0f8fb84ea174feb301986b1cf1a98` is live, with health
and served asset digest verification. Publication job in
[35268133633](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35268133633)
passed; separate post-release validation was queued/running at evidence capture.

The clean platform extends existing local conversation frames and assertion traces
instead of introducing domain-specific event handlers or a second memory store.
Temporal phrases are recognized before reference lookup. Lexical event inflections
only nominate exact witnessed occurrences; they never merge similar labels.
Repeated events stay separate and ambiguous/expired/unauthorized references refuse.

The reusable mutation algebra gains optional `resolve.scope=statement` for a
recent assertion's facet/occurrence; `event` also accepts singular references.
Whole-situation qualifiers do not mutate the speaker or scalar value. Existing
member scope and composition primitives remain authoritative. Frames/traces stay
device-local and their IDs are remapped, not transmitted, during publication.
No change to transport endpoints, protected assets, permissions, Compute/JPL or
provider effects. Old semantic definitions/hashes are unchanged.

Review freezes prior traces and may add facts to a locally proven original-input
antecedent only while its incident facts remain unchanged. Unrelated rewrites stay
forbidden. Saved records are not automatically merged or migrated. Response
witnesses are refreshed after same-transaction facet materialization.

See product decision 0141 for implementation and test evidence. English coreference
is bounded: supported inflections/phrases, exact recent evidence and existing
semantic learning are implemented; unrestricted language and live-model accuracy
remain Partial/Unknown. Local tests and browser adviser fixtures do not establish
universal interpretation accuracy.
