# 0051: Owner-published Compute delegates bounded Context effects

- **Status:** Accepted — implemented foundation; deployed two-browser proof pending
- **Date:** 2026-08-20
- **Affected repositories:** `architecture`, `aws`, `compute`, `testing`

## Context

An ordinary `use` grant lets another user run a reusable Compute capability, but it must not make every public Context relation writable. At the same time, a service is useful only when a caller can invoke behavior against the service owner's data: `my car` and `Austin's car` differ in grammatical identity, not in the underlying operation.

Normal Context publication authenticates the publisher as the relation owner. Letting the caller republish Austin's relation would either be rejected correctly or create a conflicting caller-owned fact. Treating public visibility as edit authority would be an unacceptable privilege escalation.

## Decision

A possessive invocation carries two identities through Path creation and execution:

- the exact owner identity resolved by authorized local or named hydration; and
- the exact owned target reached through one unambiguous ownership relation.

The owner ID constrains identity and response perspective. The owned target ID constrains the Compute dependency and effect subject. Possessive morphology is normalized only for structural matching; the captured surface remains available for presentation. The shared manifest, Position, and creator Path do not acquire either caller-specific ID.

Possessive-reference evidence is required for commands as well as questions. An imperative has no clause subject, but `Wash Austin's car` still carries the structural owner/object edge `Austin -> car`; the browser resolves that edge after named hydration and sends its exact IDs with discovery. If a qualified remote invocation selects an operation with entity dependencies but discovery does not return one exact `use` binding per dependency, the browser must fail before Path installation. It may not silently install an unbound Path that mutates only the caller's hydrated copy.

The worker result for an ordinary recognized Path miss must therefore carry the current post-hydration graph together with its local syntax. Named hydration happens before the local Path tournament; dropping that graph at the miss boundary would erase the exact owner, owned target, and relation evidence before discovery even though the browser had already resolved it. Transcribe uses that snapshot only as bounded discovery evidence and still requires Compute to return exact validated IDs. Protected input remains outside this route.

An owner-published, user-owned Compute capability may delegate only its own declared `contextdb.replace_object` effects. The app's public or caller-specific `use` grant is authority to invoke that exact entity/version/operation; it is not a direct grant to edit arbitrary Context. Before committing an effect, Compute verifies all of the following server-side:

1. the caller owns the active workspace and may `use` the exact capability entity and version;
2. the operation is writable and the source dependency identifies its exact declared effect;
3. the supplied subject, property, relation, publisher, and relation version equal the browser-bound IDs;
4. the capability owner equals the target relation publisher;
5. the relation is visible to the caller through its server-derived public or participant audience;
6. the current object carries the declared old value and no endpoint is protected; and
7. the replacement is exactly the manifest-declared new value.

The server updates the existing owner relation ID, increments its version, preserves its audiences, records the caller and capability provenance, and returns the canonical replacement value ID. Idempotency and optimistic relation versions make retries bounded and stale bindings fail closed. The browser then materializes the already-declared scalar label under that acknowledged canonical ID, applies the ID to the same local rewire, proves the postcondition, and suppresses that relation from ordinary caller publication. The remap cannot leave an unlabeled canonical node that would render as an opaque ID while hydration catches up. Later owner and named hydration observe the same canonical relation version.

The capability owner's identity is the delegation boundary in this first contract. A third-party app cannot mutate another publisher's data merely because the app is reusable or the data is public. Broader service-provider, organization, or explicitly delegated data-owner policies require a separate versioned authorization contract.

Protected Assets are excluded. Their recipient grants, consent, cryptographic delivery, and provider-use contracts remain separate.

## Alternatives considered

- Treat public Context as world-writable. Rejected because visibility is not mutation authority.
- Publish the change as the caller. Rejected because it creates a competing fact and falsifies provenance.
- Copy the owner's Path to the caller. Rejected because Paths contain identity-scoped wording, graph bindings, and installation state.
- Let the browser alone decide that the app owner may edit the relation. Rejected because another client could forge that conclusion; the server must reload and verify every exact contract and ID.

## Consequences

- One user can run an owner-published service against that owner's ordinary public data without gaining general edit rights.
- `my <object>` and `<name>'s <object>` use the same operation while retaining different exact identity bindings and response perspectives.
- Compute execution remains exact-ID based after lexical discovery; app names and property names never become authorization.
- A service owner who wants another party's data changed must receive a separate explicit delegation in a future contract.

## Security impact

The new endpoint is narrower than ordinary relation editing: it accepts only one manifest-declared transition on one exact visible relation owned by the capability publisher. It rechecks `use`, ownership, version, old value, target IDs, visibility, and protected-data exclusion on every request. Audit/source evidence records the actor and exact capability contract.

## Migration

Existing local effects and owner-invoked capabilities continue through browser-local mutation and ordinary owner publication. Only an effect bound to a named-hydrated foreign relation uses delegated application. Existing Paths without publisher/version evidence fail closed and must be rebuilt from current hydration. Qualified remote Paths with writable dependencies but no exact entity-use binding are invalid and must never be installed as local-only fallbacks.

## Verification

- Discovery tests prove a possessive owner ID and owned target ID remain distinct and bind the target relation.
- Browser tests prove question and imperative possessive syntax compile, named ownership resolves one exact target, every qualified writable dependency is bound before installation, response perspective remains named, and delegated relations are excluded from caller publication.
- Server tests prove an authorized caller can apply the exact app-owner transition idempotently and that an app owned by a different publisher cannot mutate the relation.
- The disposable two-browser acceptance resets first, builds and publishes with User 1, invokes `Wash Austin's car` as User 2, verifies both users observe the same new status, and resets again.
