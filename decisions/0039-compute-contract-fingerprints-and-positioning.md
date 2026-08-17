# 0039: Compute contracts use exact fingerprints plus authorized semantic positioning

**Status:** Accepted — implementation foundation

## Context

Compute discovery previously scanned the capability table, retained at most 100 authorized manifests, and sent at most 30 unique definitions to a model. A live cold-start test proved that two accounts could request the same two-number addition behavior with different wording and receive unrelated model-generated identifiers (`math_addition` and `calculate_sum`). The first definition was not positioned by the approved compute-build path and was not authorized for public use, so the second account could not even consider it. This approach cannot support a catalog measured in millions.

A model-generated label is not stable identity. Conversely, an embedding is intentionally approximate and cannot prove contract equality, lifecycle, ownership, or permission.

## Decision

Every validated compute manifest receives a versioned signature bundle with two distinct products:

1. An exact SHA-256 contract fingerprint is calculated from canonical semantic manifest fields while excluding entity address, owner, status, release number, and timestamps. It identifies exact contract content, not the entity itself.
2. A sanitized semantic document is built from capability and operation descriptions, typed inputs and outputs, binding sources/resolvers, freshness, and protected-requirement purpose metadata. Example values, protected values, defaults, and answer prose are excluded. Its embedding is written through the existing sharded Position substrate.

Convert and the capability discovery endpoint query Search first. Search returns a bounded candidate set, reloads current canonical address records, and reports whether the caller has `use`. Interactive Search keeps its narrower default band window; capability discovery uses a bounded 512-band window because short behavior paraphrases can sit outside that default. Both retain sharded partition limits and a top-K cap, so the recall adjustment does not become a catalog scan. The capability registry then reloads and validates the exact manifests and their action-specific grants before the model may choose reuse, repair, fork, or build. Once indexed Search is available, an empty result is authoritative and never expands into a table scan. A bounded scan remains only as compatibility for isolated environments where Search is unavailable.

Public visibility remains read/discovery authority only. A public compute definition becomes executable across accounts through an explicit canonical `pub` grant containing `use`; public visibility alone does not imply execution. Convert-created public compute definitions seed that grant alongside the owner grant. User installations, bindings, data, settings, Paths, and Protected Assets remain separate and user-scoped.

Deterministic two-operand arithmetic is represented as a typed calculation contract (`operator`, two input/literal operands, and declared output). The server compiles that contract into trusted Math JPL without a provider or a second model generation pass. This prevents example literals from becoming an implementation.

## Alternatives

- Treat the model-generated `capabilityIdHint` as a universal signature. Rejected because paraphrases already produced different identifiers for the same behavior.
- Use embedding proximity as identity. Rejected because proximity can confuse behavior with similar shape and cannot establish authority.
- Continue scanning manifests and ask the model to compare all of them. Rejected because cost, latency, payload size, and DynamoDB work grow with the catalog.
- Make every public entity executable. Rejected because visibility and action authorization are distinct contracts.

## Consequences

- Candidate retrieval scales with bounded anchor windows rather than catalog size.
- Exact contract fingerprints and semantic Positions have different names and responsibilities; neither replaces canonical entity identity.
- Existing capabilities need a bounded signature/index/public-grant backfill before they participate in cross-account reuse.
- Stale postings may reduce recall but cannot grant access or override the current manifest.
- First-class installation records, exact semantic reranking, backfill operations, and production-scale cost/load proof remain unfinished.

## Affected repositories

- `compute`: signature generation, Position posting, Search candidate loading, public-use grants, deterministic calculation compilation, and tests.
- `architecture`: platform model, capability status, and lifecycle documentation.
- `testing`: live cold-start/reuse acceptance uses separate account profiles; durable job-capture automation remains follow-up work.

## Security impact

The semantic document excludes example values and protected values. Private definitions receive tenant-scoped postings; public definitions may also receive global postings. Search still reloads canonical state. Execution requires owner authority, a caller grant, or an explicit `pub` use grant. Retrieval proximity never authorizes execution.

## Migration

New and edited manifests are signed and positioned during registration. Existing active manifests require a bounded backfill that recomputes the fingerprint, writes current v2 postings, and creates a public-use grant only where product policy explicitly marks the compute definition reusable. Old postings remain rebuildable compatibility data until stale-removal operations are available.

## Verification

- Fingerprints ignore ownership/release metadata and change when semantic behavior changes.
- Semantic Position text excludes utterance example values.
- Public definitions write tenant and global v2 postings; private definitions do not gain a global posting.
- Indexed discovery reloads only authorized Search candidates and does not scan after an indexed miss.
- Capability discovery supplies the 512-band bounded recall window while ordinary Search retains its 160 default.
- A `pub` grant authorizes `use` while public visibility without that grant does not.
- Typed calculations compile to Math JPL using both runtime inputs and do not call a provider or builder model.
- Live pre-fix evidence: account B paraphrased account A's addition request and received `build/calculate_sum`; direct execution of the generated entity failed. A deployed post-fix rerun is still required.
