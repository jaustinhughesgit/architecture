# Decision 0114: Ordinary artifacts separate bytes, authority, and execution

**Status:** Accepted and implemented candidate in `onevar-platform`; deployment and reset-gated browser proof pending.

Ordinary files use stable artifact identities and immutable versions. Bounded metadata, hashes, actor pointers, grants, and execution receipts live in canonical runtime persistence; bytes live in a dedicated private S3 plane reached through short checksum-bound presigned requests. A filename or profile name can nominate a candidate but never grants access or selects bytes. Durable sharing freezes one exact recipient entity and bounded permissions.

Protected files remain browser-encrypted and cannot enter ordinary artifact APIs. Executable capability packages remain content-addressed in their independent bucket and cannot become user downloads. An artifact access grant grants neither protected authority nor app execution.

The first admitted artifact operation is deterministic text-to-PDF. It requires one exact active UTF-8 text version and exact read/use authority, then records the root interaction, actor, source/output IDs, both content hashes, operation, and authorization. Retry resumes the same pending write or returns the same receipt; it cannot allocate another output version under the same idempotency key.

This proves ordinary upload, download, immutable versioning, direct recipient distribution, revocation, and governed PDF creation. Public CDN distribution, paid artifact marketplace listings, OCR, arbitrary binary transforms, templates, and protected-file server Compute remain incomplete and fail closed.
