# 0018: Catalog-Authorized Structural Evidence in Path Repair

- Status: Accepted
- Date: 2026-08-10

## Context

Typed semantic completeness normally requires every explicit participant, value, descriptor, and entity mention to survive as a Path binding. That rule correctly prevents a candidate from freezing meaningful data into its matcher. It becomes contradictory when a tokenizer labels a meaning-defining grammar marker as a descriptor even though the selected semantic operation represents its meaning through a separate typed effect binding. Requiring a fake descriptor binding causes the trusted operation compiler to discard the undeclared role, after which the repair loop asks the model to recreate the same impossible binding.

The platform also needs to distinguish safe wording expansion from semantic change. Morphological variants and equivalent quantity markers should extend an existing compatible Path family. Direction-sensitive transfer wording must not become an unconditional quantity alias when source or destination roles can reverse the effect.

## Decision

1. Typed token bindings remain the default semantic-completeness proof. Numeric values and ordinary participants, entities, and descriptors cannot be frozen into grammar.
2. A versioned semantic operation may declare `structuralTokenPolicies`. Each policy names a semantic requirement role, accepted grammar lemmas, and the operation bindings whose locally compiled literal effects authorize that grammar.
3. A structural policy is evidence only when the exact source token is fixed by the candidate matcher, the selected installed operation carries the policy, and every declared effect-binding condition is satisfied. The server proposal gate and browser candidate tournament enforce the same rule independently.
4. The bounded repair payload exposes matching structural alternatives before model selection. The model must select a compatible operation/effect or retain the token through a real declared binding; it must not invent an undeclared role to satisfy validation.
5. The trusted compiler preserves structural policies as operation metadata while continuing to discard undeclared model bindings. A discarded binding cannot create an unconstrained structural slot.
6. Compatible new wording reuses the installed operation family and is admitted as a tested family alias. A new family is reserved for an incompatible transform.
7. Morphological and marker vocabulary remains Path/catalog data. Direction-sensitive transfer forms are excluded from unconditional quantity aliases and must be interpreted with their supplied source, destination, or ownership roles.
8. Foundation Path tests include positive morphology/marker variants and negative directional collisions. Alternate word orders use sibling structural aliases over the same semantic family.
9. Deterministic repair failures receive a stable fingerprint. If a correction produces the same failure again, the server stops further model escalation and returns the interpretation and rejection evidence rather than repeating an impossible repair loop.

## Consequences

- “The hardware store added three more hammers” can compile to the existing signed quantity observation without storing `more` as a descriptor.
- “red bicycle” still requires `red` to survive through a compatible typed role.
- `add`, `added`, and `adds`, plus `more`, `additional`, `extra`, and the “another three” word order, can reuse one quantity family after local tests.
- Wording such as `send`, `deliver`, `return`, `transfer`, `ship`, or `give` does not update a ledger merely from its verb; the semantic plan must preserve direction-sensitive roles.
- An impossible selected contract becomes visible after a bounded correction instead of consuming repeated LLM attempts.

## Alternatives considered

- **Ignore all adjectives during semantic completeness.** Rejected because meaningful descriptors would disappear silently.
- **Add a generic descriptor binding to every operation.** Rejected because it changes graph contracts and stores grammar as data.
- **Hard-code marker words in runtime JavaScript.** Rejected because vocabulary belongs to versioned Path and semantic-operation data.
- **Treat every new surface form as a new family.** Rejected because it fragments compatible behavior and prevents reuse.
- **Treat every movement verb as a signed quantity update.** Rejected because direction depends on roles and context.

## Security impact

The model receives no new execution or write authority. Policies are installed versioned data, executable rows still come from the trusted catalog, and the browser remains the final local proof boundary. Protected plaintext and zero-trust boundaries are unchanged.

## Verification

- Server tests prove that an authorized fixed marker satisfies completeness while an ordinary descriptor does not.
- Browser compiler metadata carries the same structural policy used by candidate validation.
- Quantity foundation tests cover verb morphology, marker paraphrases, alternate word order, and directional negative collisions.
- Repeated deterministic failures normalize to one fingerprint and suppress another escalation.
- Full `aws` tests continue to pass.

## Affected repositories

- `architecture`
- `aws`
