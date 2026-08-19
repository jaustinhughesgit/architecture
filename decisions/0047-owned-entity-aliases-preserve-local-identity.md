# 0047: Owned-entity aliases preserve browser-local identity

- **Status:** Accepted
- **Date:** 2026-08-19
- **Affected repositories:** `architecture`, `aws`, `testing`

## Context

Separate utterances can describe one ordinary object by type, compound name, make, model, or another user-spoken label. Ingesting each sentence as an independent graph assertion creates a fresh node for the repeated noun phrase. A later Compute capability can then read or update a different node from the one the user meant, even though every individual sentence was classified successfully.

The browser owns ContextDB identity. The model may infer that two phrases are coreferential, but it cannot safely merge graph nodes or write an alias without a locally validated, ambiguity-safe operation.

## Decision

The semantic catalog exposes a vocabulary-neutral `contextdb.entity-alias` operation. Its Path recognizes a possessive identity statement with an indefinite naming complement, resolves the possessed subject to an existing node, proves a direct speaker-to-object relation independently of the predicate node's local or authoritative identity, and applies a declarative `entity:addLexeme` transaction to that relation's object. The transaction fails closed when the selector is missing or ambiguous and never creates a second subject.

A compound alias registers both the complete normalized name and each non-article component as mention keys for the same entity. Component lookup retains all candidates, so ordinary mention resolution remains ambiguity-safe.

Possessive scalar assertions carry a separate `existingRelatedEntity` binding. When the possessive phrase uniquely names an existing graph node already connected as an object from the speaker, the assertion records the node's condition. When it does not, the same grammar remains an ordinary property assertion on the speaker, preserving inputs such as `My register status is open` even after that predicate exists in ContextDB. Declarative `whenNone` conditional rows select that fallback; browser editing, local compilation, and server persistence all validate the same negative guard contract. No domain vocabulary is embedded in runtime code.

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
- The command-repository flow performs possession, aliasing, condition assertion, and both queries through published semantic Paths before exercising the Compute effect.
