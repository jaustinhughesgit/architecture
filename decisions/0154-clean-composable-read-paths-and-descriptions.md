# 0154: Clean composable read Paths describe exact current facts

- Status: Accepted
- Date: 2026-09-11

## Decision

The clean-room platform implements a bounded versioned sentence-subpattern network and data-defined response templates for ordinary descriptions. This advances the direction of decisions 0020 and 0016 without importing the legacy runtime. General trusted code validates acyclic dependencies, grounded and retained bindings, bounded full-sentence composition, and unambiguous typed read meaning. Library data owns the supported wording, ownership/reference grammar and rendering. Partial matches cannot execute.

`graph.describe` reads exact current owner-local ordinary facts. It returns a bounded multi-fact answer with exact subject/object/relation IDs and relation versions; nested descriptors retain their actual subject. Missing or ambiguous subjects never cause construction. Explicit fields restrict projection, unavailable fields are identified, and bounded omission is reported. The read changes neither Context, publication nor discourse. Pending canonical acknowledgements remap query plans and witnesses without losing newer local changes.

The bounded adviser adds a description operation with one complete subject-reference capture. Trusted compilation turns its capture-free wording into opening/suffix subpatterns composed with the existing subject/projection network. Successful local proof installs the existing content-addressed learned template; archive offers remain explicit and contain no captured personal facts. Reusing an opening with another subject, owner chain or field projection does not require another model call. The adviser never owns final answer prose, graph identity, permissions or graph mutation.

Explicit read-language installation is device-local and versioned. A data-only alternate-language fixture verifies the parser/evaluator separation; a public language-package editor, distribution lifecycle and unrestricted multilingual learning are not implemented. Existing clean mutation and reverse-query English matchers remain unmigrated. This is an **Implemented bounded description slice**, while broad compositional natural-language coverage remains **Partial**, not a measured 95% claim.

## Ownership and verification

`onevar-platform/packages/contracts` owns strict schemas; `packages/runtime` owns composition, exact reads, proof and deterministic rendering; `apps/web` owns worker installation/persistence, selection and adviser coordination; `services/api` owns stateless ordinary advice and verified capture-free archive transport. There are no changes to Compute/JPL or protected execution authority.

Deterministic tests cover paraphrases, nested references, field selection, no partial execution, ambiguity, exact current facts, canonical remapping, bounded output, new opening reuse, archive/reload and alternate-language data. Browser tests cover the actual composer, saved state and no-network warm reads. Live release evidence belongs in the capability catalog after successful deployment.
