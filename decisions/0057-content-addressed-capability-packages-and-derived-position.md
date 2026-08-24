# 0057: Content-addressed capability packages are authoritative; Position is derived

**Status:** Accepted for Phase 3; clean-platform foundation implemented

## Context

Users need to share reusable capabilities without copying another browser's active Path. DynamoDB is well suited to compact routing and lifecycle records but is an expensive executable-blob store. Lexical words alone do not reliably retrieve semantic paraphrases, while embeddings are approximate, model-versioned, and unsuitable as execution identity.

## Decision

Every clean capability release is compiled into an immutable content-addressed package containing its exact manifest and bounded program. The package ID is its canonical SHA-256 payload hash. S3 stores the immutable package; DynamoDB stores the exact release identity, owner/lifecycle, package descriptor, bounded lexical postings, and an optional compact Position routing card. Downloads use an exact capability/version URL and include immutable cache metadata.

The browser downloads and verifies the package descriptor, content hash, capability ID, version, and byte size before installing. IndexedDB retains the verified package with the caller's installation and locally compiled Paths. Server invocation independently reloads and verifies the same package before execution. A creator's Path is never in the package and never activated by another user.

Position embeds sanitized capability routing text, quantizes the vector to signed eight-bit values, and derives bounded locality-sensitive band postings. Candidate search counts band collisions, reloads exact current release records, requires matching model and dimension versions, and reranks by cosine similarity. Lexical postings remain a low-cost fallback. Words and Position nominate candidates only; package, manifest, operation, dependency, installation, entity, and relation IDs control execution.

## Consequences

- Package bytes are inexpensive, immutable, cacheable, downloadable, and independently verifiable.
- Routing indexes are bounded projections that can be rebuilt or replaced without changing capability identity.
- A receiving browser creates its own Path and exact Entity Use Bindings from the shared contract.
- The first implementation retains a compatibility copy of the small manifest/program in the Dynamo record; removing that copy after parity/load proof remains an optimization, not a trust change.

## Alternatives

- **Store executable releases only in DynamoDB.** Rejected as the long-term blob authority because it raises storage/read cost and weakens package delivery.
- **Execute the highest-scoring embedding result.** Rejected because approximate retrieval cannot establish identity, version, permission, or integrity.
- **Download another user's Path package as active state.** Rejected because local wording, graph IDs, and authority were not proven by the receiver.
- **Use local RAG for normal installation.** Rejected because bounded lexical/Position candidate retrieval plus exact structural binding is cheaper and more exact.

## Affected repositories

- `architecture`: this decision, roadmap, capability catalog, and package/Position model.
- `onevar-platform`: package contracts/compiler, S3 artifact store, Dynamo routing records, API download/discovery/invocation, browser verification/cache, CDK, and tests.
- `onevar-operations`: later signing, promotion, revocation, retention, and release rollback controls.

## Security impact

Packages contain ordinary public capability definitions only—no local graph snapshot, protected plaintext, credentials, grant, raw audio, or caller binding. Package integrity and publisher provenance do not grant data access. Discovery requires a session and exact manifest reload; invocation effects remain inert until the caller's worker validates its exact installation binding.

## Migration

No proof-of-concept JPL file or Path library is imported. Phase 3 packages use compiler/runtime version 1. Existing clean compatibility records can be backfilled to S3 by recomputing and comparing the canonical package hash before any Dynamo payload retirement.

## Verification

- Change one program instruction and prove package verification fails.
- Prove a discovered browser verifies and persists the exact package before Path installation.
- Prove server invocation fails closed when the package is absent or mismatched.
- Retrieve a paraphrase through Position with no lexical overlap, then reload the exact release.
- Prove mismatched embedding models/dimensions cannot compare.
- Reset creator and installer state before and after browser acceptance.
