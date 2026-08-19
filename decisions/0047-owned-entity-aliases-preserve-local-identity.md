# 0047: Owned-entity aliases preserve browser-local identity

- **Status:** Accepted
- **Date:** 2026-08-19
- **Affected repositories:** `architecture`, `aws`, `testing`

## Context

Separate utterances can describe one ordinary object by type, compound name, make, model, or another user-spoken label. Ingesting each sentence as an independent graph assertion creates a fresh node for the repeated noun phrase. A later Compute capability can then read or update a different node from the one the user meant, even though every individual sentence was classified successfully.

The browser owns ContextDB identity. The model may infer that two phrases are coreferential, but it cannot safely merge graph nodes or write an alias without a locally validated, ambiguity-safe operation.

## Decision

The semantic catalog exposes a vocabulary-neutral `contextdb.entity-alias` operation. Its Path recognizes a possessive identity statement with an indefinite naming complement, resolves the possessed subject to an existing node, proves a direct speaker-to-object relation independently of the predicate node's local or authoritative identity, and applies a declarative `entity:addLexeme` transaction to that relation's object. The transaction fails closed when the selector is missing or ambiguous and never creates a second subject.

Once Context publication acknowledges a graph, later Path materialization supplies authoritative `usr_…`, `ctx_…`, and `term_…` identities as ordinary string cells. The graph runtime must recognize any identity present in its installed snapshot as identity during query matching and Essence ingestion; restricting identity handling to temporary `ent_<number>` values turns acknowledged IDs into invented lemmas and breaks the next local transaction. Temporary IDs are immutable allocation identities until acknowledgement. Loading a snapshot or applying an acknowledgement map must reserve every historical temporary entity and relation ID before another allocation; remapping must never reset the allocator and reuse an acknowledged local ID for a new semantic object. The graph store is the sole ordinal allocator for explicit browser-created entity IDs. Compute effects and other local materializers must request an ID from it rather than scan a canonicalized snapshot and infer that a missing `ent_1` is available. The server independently rejects a local-ID publication that conflicts with the already persisted node's semantic identity.

A compound alias registers both the complete normalized name and each non-article component as mention keys for the same entity. Component lookup retains all candidates, so ordinary mention resolution remains ambiguity-safe. Alias-only lexical changes are synchronization changes even when no relation ID changes; the publication outbox carries one incident relation so the canonical node receives its new labels.

Possessive scalar assertions carry a separate `existingRelatedEntity` binding. When the possessive phrase uniquely names one existing graph node already connected as an object from the speaker, the assertion records the node's condition. Ownership-aware selection returns that one related instance rather than a category or another globally matching lemma. When it does not, the same grammar remains an ordinary property assertion on the speaker, preserving inputs such as `My register status is open` even after that predicate exists in ContextDB. Declarative `whenNone` conditional rows select that fallback; browser editing, local compilation, and server persistence all validate the same negative guard contract. Possession creates a distinct instance and kind/category identity instead of a self-classification loop. No domain vocabulary is embedded in runtime code.

Generic status and binary-choice question Paths resolve the owned entity by any installed alias and project its condition through the existing entity-property query operation.

## Consequences

- `I have a device`, `My device is a ThinkPad X1`, and later references to `device`, `ThinkPad`, or `X1` address one ContextDB entity.
- Compute effects can resolve the same subject through type, compound alias, or alias component without receiving the browser graph.
- Alias creation requires an existing uniquely matched relationship and cannot silently merge independently created entities.
- The initial possessive scalar composition models the described value as the entity's current condition. Richer explicit property grammar can extend the same catalog contract later.

## Security impact

All identity selection and mutation remain browser-local. Compute and model services receive neither graph identifiers nor graph snapshots. Protected values are not accepted as alias lexemes.

## Verification

- Matcher fixtures cover unrelated devices and animals as well as the carwash acceptance wording.
- Graph tests prove compound and component mentions all resolve to the original object ID.
- Allocation, explicit Compute-effect materialization, and server-publication tests prove an acknowledged temporary ID cannot be reused or overwrite an unrelated canonical node.
- Activity-assertion tests prove the possessed object instance remains distinct from its kind/category.
- The command-repository flow performs possession, aliasing, condition assertion, and both queries through published semantic Paths before exercising the Compute effect.
