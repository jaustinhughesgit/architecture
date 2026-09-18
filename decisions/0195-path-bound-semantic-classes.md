# 0195 — Shared semantic classes are Path data and presentation policy

Status: Implemented bounded slice, locally verified; development evidence recorded
in product `docs/testing/shared-classifiers.md`.

Extend ordinary semantic Path learning and the existing private immutable archive
with generic class definitions. A bounded alias lookup nominates accepted meanings;
the existing adviser selects an equivalent sense/role or proposes a new definition.
The compiler assigns a content-derived `cls_` ID and binds it to a fixed-concept
create register in the verified Path. A class ID is not an entity instance ID,
an access grant, a deduplication key, or an execution capability.

The compiler assigns verified specific occurrence classes a stable groupable
presentation default; model flags cannot turn the same class off between Paths.
Generic structural classes cannot group. Missing/value-bearing annotations return
the content-free `class_policy` repair category. Object/collection view policy
remains proposed data; no class policy merges or changes instance facts.

ContextEntity gains optional `{classId,label,consolidate}` metadata, retained by
ordinary local/server persistence. Instances remain independent exact entities.
Warm local Path execution copies the bound class without further advice/lookup.
Accepted class definitions and hashed alias postings use the semantic archive's
existing lifecycle; no separate provider or service is introduced. No protected
plaintext, private graph, names or captured instance values are required for
shared class discovery. Model proposals remain untrusted and bounded; semantic
accuracy and privacy are not proven merely by hashing or lexical checks.

Inspector may consolidate authorized instances within an owner into a browseable
view group while preserving focused/current-response stories and exact edges.
In the explicit group overview, instances stay folded: first click shows at most
three story previews, and the numbered dotted control counts/paginates remaining
stories, not their individual facts. A second separate single click lists one
preview per exact occurrence with its context. Selecting a preview or row opens
that occurrence's owner path, relationship facets, sibling facts and bounded
downstream context. The single class circle substitutes for the selected occurrence
at its exact chain position, rather than appearing as a separate navigation entity
beside an occurrence dot. Focus then second activation opens one detail surface
containing ordinary current-story facts and the story switcher. Other occurrences stay folded. Shared targets do not authorize
reverse expansion into another story. The group uses a solid ray-colored ring with an outside instance
count. Connectors with folded endpoints are witnessed browser display projections,
never canonical scene facts; the cluster-edge prohibition is unchanged. Stale
links and revoked managed-owner snapshots cannot be restored by a saved selection.
The group never replaces entities in ContextDB. CLI/Column retain exact instances.
Travel, running and processing are fixtures, not platform branches. Generic event
and person types and repeated names do not imply consolidation; parts of speech
alone cannot determine identity or presentation policy.

Old packages/facts remain valid and are not automatically reclassified. Bounded
lexical nomination can miss unseen synonyms, so universal ontology reconciliation
and historical migrations remain unimplemented. Product decision 0143 specifies
contracts, storage, validation and proof coverage.
