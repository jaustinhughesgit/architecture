# Experience v2 local interaction foundation

Status: **Partial**, implemented and independently verified headlessly in
`onevar-v2`; browser and deployed qualification remain pending. This document
describes schema-v1 ordinary numeric interaction, not the full proposed
Director/Conductor/Object platform. See [decision 0233](../decisions/0233-v2-local-operation-and-working-set-proof.md) and the
[active plan](../../onevar-v2/PLAN.md).

## Shared data and operation boundary

The initial public contract is a typed projection of one current graph property:
exact subject entity, property entity, relation, immutable value entity, owner,
relation version, finite number, ordinary privacy and lifecycle. It is not a new
canonical persistence representation. IDs preserve `ent_`/`loc_ent_` and
`rel_`/`loc_rel_`; separate `bind_`, `run_`, `occ_`, `path_` and `int_` identities
name bindings, instances, visual occurrences, Paths and interactions.

The trusted host injects one exact canonical owner as session actor. Requests
cannot choose actor, payer, grant or protected plaintext. A binding names the
exact owner/subject/property/relation and `ordinary.number.adjust.v1`. Authority
is rechecked against current active ordinary data on every action and retry.
This local owner check is not account authentication, remote grant verification,
cryptographic custody or authorization for an arbitrary operation.

UI occurrence actions derive their binding from admitted instance membership.
Direct typed operation requests, typed utterances, transcribed speech and future
sanctioned automation callers reach the same adjustment boundary. Two Object
occurrences read the same property; neither creates a duplicate canonical fact.
The operation adds a finite delta, checks expected version and appends a new
immutable local value entity/version. It rejects overflow and a nonzero delta
that loses all effect to numeric precision. Zero produces an unchanged receipt.

## Warm local Path and transaction

Admitted Paths contain literal tokens and one numeric slot, with exact operation
and binding. They are bounded data, not code or model instructions. NFC/lowercase
normalization, whitespace and trailing sentence punctuation permit compatible
utterances; exactly one matching Path may execute. No match or overlap fails
without a write. This grammar deliberately does not yet cover the reference
platform's general semantic subpatterns, referents, learning, Essence or Convert.
Microphone/transcription is outside the boundary; warm voice begins after text.

Validated input is captured before asynchronous SHA-256 work. The synchronous
commit retains request, immutable history, response and private occurrence/Path
origin before notifying trusted host observers. Interaction IDs deduplicate
only exactly matching retries; another occurrence, utterance, modality, binding
or delta cannot borrow a receipt. Current authority still gates a retry. Concurrent
writes reject while interpretation is pending. This establishes local retry
coherence, not exactly-once mail, charges, jobs or provider effects.

## Working-set persistence boundary

Exports contain the complete **admitted working set**, not an owner's complete
graph. There is no server publication/replacement API. SHA-256 detects accidental
corruption; it grants no signature or authority. Restore admits plain data before
async work, verifies exact schema/owner/hash, all references and artifact hashes,
contiguous immutable history and every changed version's coherent receipt. It
does not use a hash as permission to trust fabricated owner facts; initial data
still requires a trusted-host source. Current restore supports active history.

Collections and instance binding lists are bounded at 256. The parser bounds
depth, nodes and string volume while admitting the full 256-by-256 membership
matrix. These small fixed bounds prove predictable local scope only. They do
not establish globally routed graph reads, cursor completeness, outbox conflict
resolution, cross-device authority or the 100-billion-entity design target.

Public contracts reject unknown fields, coercion, accessors, hidden data and
invalid identities and return detached frozen values. Runtime/snapshot admission
rejects incoherent references, cycles and malformed arrays. Fixed diagnostic
categories contain no rejected scalar/text/provider content. These are data
boundary checks; no hostile generated-code sandbox is claimed.

## Evidence and next boundary

Owning tests cover strict contract admission and runtime history, integrity,
retry, async capture, instance lifecycle, observer notification and size bounds.
Independent acceptance imports only the public v2 runtime/contracts and its own
wire fixtures. It runs typed/transcribed-voice/UI adjustment on two occurrences,
checks exact identities/history, saves JSON to a temporary directory, restores
and retries without another mutation. A fetch-denial sentinel observes zero
calls. Negative scenarios cover forged actor fields, stale/conflicting requests,
cross-instance substitution, ambiguity and numeric failure. No sibling runtime,
provider/model, old database or test-only authority bypass is used.

The next M2 boundary is a real browser host, persisted working-set adapter and
page-reload proof using the same runtime. General graph/results/effects, worker
containment, Director/Conductor definitions, middleware, Sunburst, audio/media,
protection, services and marketplace authority remain subsequent milestones.
Affected CI may pass this exact scope while complete integration/release fail
for the remaining declared evidence; it must not imply complete M1/M2 parity.
