# 0013: Direct Entity Properties Are a Data-Defined Local Primitive

- Status: Accepted
- Date: 2026-08-08

## Context

Some statements establish a relationship between distinct objects, while others assign one property value directly to one affected subject. Forcing both shapes through the relationship-transition contract creates artificial object/reference roles, makes valid local compilation depend on empty placeholders, and encourages scenario-specific application branches.

## Decision

Add the versioned `contextdb.entity-property` semantic entity to the browser-local operation catalog. Its assertion records an establishing actor and activity, one identified subject, a bound property, and a bound value; optional roles retain subject kind, a post-noun numeric identifier, value kind, and observation time. Its query projects any bound property from any identified subject.

Use relationship-transition only when the resulting state relates distinct graph objects. Use entity-property when the adjudicated result is one direct subject-property-value row. The LLM selects and binds the operation, the deterministic compiler owns executable rows, and the browser must validate and replay the Path locally before ContextDB mutation or query.

A cardinal following a noun and not introducing another noun is typed as a subject identifier, not automatically as inventory quantity. This distinction is structural and vocabulary-neutral.

## Alternatives

- Extend relationship-transition with nullable placeholder roles. Rejected because required graph roles would no longer describe a coherent relationship contract.
- Add status-specific or device-specific parsing. Rejected because it cannot scale and violates data-defined vocabulary ownership.
- Store only an event descriptor and answer later with model inference. Rejected because the direct state would not be locally queryable or reusable without another model call.

## Consequences

Cold Path learning has a smaller sufficient primitive for arbitrary direct properties. Paths can generalize across subjects, properties, values, and establishing actions without application vocabulary. Operation selection must distinguish direct property state from cross-object transitions, and future contradiction/expiration semantics must cover direct properties.

## Security and trust

The trust boundary does not change. Tokens, bindings, Essence execution, and ContextDB remain browser-local. Model output is an untrusted semantic plan and never writes the graph directly.

## Migration and compatibility

Existing relationship-transition and activity Paths remain valid. A later repair may migrate an incorrectly modeled direct-property Path through the ordinary atomic repair transaction; no startup rewrite or domain-specific migration is introduced.

## Verification

- Catalog compilation tests prove both assertion and query operations.
- Graph tests use unrelated subject/property/value examples to prove vocabulary-neutral execution.
- Semantic-requirement tests distinguish post-noun identifiers from quantities.
- Full browser acceptance must prove the original cold statement and its property question after a hard reset.
