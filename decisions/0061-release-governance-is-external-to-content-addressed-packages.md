# 0061: Release governance is external to content-addressed packages

**Status:** Accepted for Phase 3; owner revocation implemented

## Context

Content addressing makes package bytes immutable. Revocation, review, staged rollout, and marketplace policy are mutable decisions. Encoding revocation inside a package would require a new package identity, while trusting a cached package would let local possession outlive authority.

## Decision

Every clean capability release has a separate governance record. Compiler-bounded JPL v1 is approved under review policy v1 during publication. Owner revocation changes that record without modifying or deleting the package. Discovery excludes revoked releases, while package download and every invocation reject them. A cached Path and verified package remain evidence, never current authorization.

The ordinary Phase 3 endpoint permits only the authenticated owner to revoke. Package signing, independent review, marketplace enforcement, and protected-asset governance remain Phase 4 additions to this record.

## Consequences

- Revocation takes effect for the next invocation even after browser install and reload.
- Compact release status and timestamps coexist with immutable artifact provenance.
- Artifact retention remains suitable for audit and rollback analysis without making revoked code executable.
