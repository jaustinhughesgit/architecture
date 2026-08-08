# 0012: Bounded Semantic Prerequisites Expand Through Typed Paths

- Status: Accepted
- Date: 2026-08-08

## Context

A user may name a specific entity in one statement and a broader type in a later question. ContextDB can store `honda civic` and its `color`, yet a query constrained to `car` cannot safely select that object unless the graph also contains a classification link. Treating the model name and broad type as interchangeable text would introduce fuzzy matching. Adding vehicle vocabulary to runtime code would repeat the domain-hardcoding failure the Path architecture exists to avoid.

Cold interaction also creates a dependency-order problem: a valid query Path may require semantic scaffolding that no earlier Path wrote. Repeatedly regenerating only the current query cannot repair the missing graph contract.

## Decision

1var represents classification as a versioned, vocabulary-neutral local semantic operation. `contextdb.entity-classification@1/assert` binds a specific entity and a general type, then stores the type as an additional `{prop:kind}` relationship on that entity. A sentence such as `X is a Y` supplies both bindings; the capability contains no nouns or domain taxonomy.

A catalog query may also declare a bounded semantic prerequisite through `repairSupport`. The initial contract supports property projection through a subject relationship and a broader object type:

```text
known subject -> any stored relationship -> specific object
specific object -> kind -> requested general type
specific object -> requested property -> answer
```

If the supporting statement stored the specific object and requested property but omitted the broader type, the query operation declares an `object_supertype` requirement. The deterministic Path Synthesis Compiler derives that value only from the current question's typed `object_type` binding and derives the object identity only from the selected supporting statement's executed Path bindings. It recompiles a paired historical statement repair and query from installed semantic entities.

The support contract may declare an `upgradeFrom` operation and binding-name mapping. When the model selects the simpler same-answer-role query, deterministic synthesis upgrades it to the prerequisite-aware operation before local testing. This prevents a needless model correction round while keeping the upgrade, role mapping, and priority in catalog data. If the question already names the supporting Path's stored exact kind, the prerequisite candidate is not activated.

A query-derived type must not leak into a broad structural statement Path. The support contract therefore declares which supporting bindings become entity-scoped literals for this prerequisite. Deterministic synthesis freezes the specific object identity and consequently produces a narrower exact supporting signature before adding the inferred general type. The existing broad Path remains available for other objects; it cannot classify an unrelated future object with the inferred type. Explicit classification statements remain the reusable route for learning general `X is a Y` syntax.

The compiled supporting proposal carries structured `semanticPrerequisite` metadata: prerequisite kind, specific entity, general type, evidence source sequences, and graph-contract ID. This is the inspectable response contract for review bundles and UI status; executable rows still come only from the installed catalog.

Supporting-source selection uses both normalized linguistic evidence and scalar executed Path-binding evidence. First-person pronouns normalize to the current-speaker role. Tied candidates remain unresolved; runtime code never chooses by vehicle, room, product, animal, or other domain vocabulary.

The browser tests the complete pair in an isolated worker-owned ContextDB. Only a passing transaction replaces the supporting statement's graph effects, saves the Paths, and executes the current question. The model never writes a classification fact or executable Essence directly.

This exception is deliberately narrow: a catalog must declare the prerequisite, the specific entity must come from a supporting statement, and the general type must come from the current request. It does not authorize the model to invent ordinary user facts, events, permissions, or protected data.

## Consequences

- Specific names and broader user-facing types can be stitched without fuzzy string matching.
- The same primitive supports products, rooms, animals, documents, equipment, and future vocabulary.
- A cold property question may repair its prerequisite and answer in one locally proven transaction.
- Query-derived classifications are scoped to the specific supporting entity rather than contaminating a broad object-capture Path.
- Explicit classification statements and query-derived prerequisites use the same ContextDB relationship.
- Broader ontology inference, transitive type closure, contradictions, confidence, and user confirmation policy remain future contracts.

## Alternatives considered

- **Add aliases such as Honda Civic → car in JavaScript.** Rejected because it is domain vocabulary in core code and cannot scale.
- **Let a query treat unmatched nouns as equivalent.** Rejected because fuzzy identity can return an unrelated object's property.
- **Let the model insert prerequisite graph rows directly.** Rejected because it bypasses browser-local canonical Essence, Path validation, and zero-trust boundaries.
- **Require the user to state every classification first.** Rejected as the only route because it makes ordinary cold interaction depend on manual ontology construction; explicit statements remain supported when the user wants control.

## Security impact

No protected plaintext or server-side graph authority is added. Model output selects catalog operations and typed bindings only. The browser-local isolated transaction remains the acceptance boundary. Ambiguous supporting sources fail rather than causing an inferred merge.

## Migration

Existing object records remain valid. A repaired supporting Path can add the additional kind during replay. Explicit classification Paths can add it independently. No domain-specific data migration is required.

## Verification

- A generic classification operation compiles to a single ContextDB kind relationship.
- A property query constrained to a broader type resolves a specifically named object after classification.
- Typed evidence identifies the unique supporting statement even when its specific object wording differs from the question's general type.
- The compiler derives `object_supertype` from the query, creates the paired replay proposal, and contains no scenario vocabulary.
- Existing exact-kind relationship and property queries continue to pass.

## Affected repositories

- `architecture`
- `aws`
