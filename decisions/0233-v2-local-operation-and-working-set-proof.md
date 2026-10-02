# 0233 — V2 local operation and working-set proof

Date: 2026-10-02. Status: Accepted; bounded headless implementation verified,
broader M1/M2 and browser qualification Partial.

## Context

The new Experience runtime needs a concrete local-first foundation before UI,
generated behavior or provider integration. Existing exact numeric Experience
adjustment and immutable entity history provide a narrow reusable precedent.
Reusing that behavior should not transplant the old application or falsely claim
the proposed Director/Conductor/Object framework already exists.

## Decision

Start with versioned public data contracts and one owner-local ordinary numeric
operation. Exact bindings, instance membership and visual occurrences stay
distinct. Typed/transcribed-voice Paths, direct operations and UI occurrence
actions reach the same trusted mutation. Paths are admitted bounded literal/slot
data; unrecognized/ambiguous language fails without effects. No model, network,
generated code or domain-specific dispatcher participates in warm execution.

Capture asynchronous inputs before hashing. Commit the exact request, immutable
value/history and full private origin receipt before notifying host observers.
Retries recheck current local authority and deduplicate only matching identity,
arguments, modality and source. Close releases one instance's occurrences.

Serialize a coherent complete working set with corruption hash and checked
history/receipts. This is neither a full owner snapshot nor a signed grant; it
has no server replacement behavior. Keep admission/parser limits consistent so
every admitted membership matrix can reload. Protected, remote and signed data
need their own authority/custody contracts rather than widening this ordinary wire.

## Consequences and evidence

`onevar-v2/packages/contracts` and `packages/runtime` contain a dependency-free
ES-module implementation. Independent public acceptance verifies shared exact
identity across modalities/occurrences, immutable history, temporary JSON
save/restore, idempotency, denial and zero fetch calls. Separate owning regressions
cover strict input, async mutation, observer persistence and maximum membership.
See [the specification](../docs/experience-v2-local-runtime.md) for exact limits.

The foundation is implemented headlessly; the overall M1/M2 status remains
Partial. Browser persistence/rendering, general semantic Paths/Essence,
worker/middleware/effect isolation, authentication, protected custody, external
idempotency, signed marketplace and scale are unqualified. Integration/release
gates retain their missing-evidence failures. The preserved site and database
are unaffected; hard-reset scope still requires exact operator selection.
