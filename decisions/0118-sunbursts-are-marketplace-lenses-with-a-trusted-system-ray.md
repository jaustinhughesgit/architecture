# 0118: Sunbursts are marketplace lenses with a trusted system ray

**Status:** Accepted decision; capability maturity is Partial. Automated source tests cover contracts, deterministic runtime, browser modules, repository, and API service. Deployed browser proof, durable activation feeds, live category-aware Context retrieval, employer/group authority, and the complete shared-marketplace lifecycle remain pending.

## Context

The legacy sunburst demonstrates a dynamic 100-circle projection, but its old domain indexing can force one domain/subdomain and may use one physical `i_<domain>` table per domain. That cannot represent an entity that is simultaneously biology, education, personal history, and work context, and physical tables cannot scale with topics, users, employers, or marketplace templates.

Users and organizations need interchangeable sunburst templates distributed through the existing entity marketplace. One user may receive many employer templates and switch among them without changing or duplicating the entities being displayed. 1var also requires one universally recognizable, non-removable control and communication surface.

## Decision

A sunburst is a signed, immutable marketplace presentation-entity package plus a caller-local installation and optional governed overlays. It is not a separate marketplace, canonical ontology, authority source, or physical DynamoDB table. The current v1 package defines nineteen template-controlled rays, exact category lenses, and colors. Animation and widget layout remain trusted renderer behavior; allowing a package to control either requires a later reviewed schema version and compatibility rules. S3 or the package object plane stores immutable package bytes; bounded canonical records store releases, listings, grants, installations, overlays, and one active-template pointer. The target product lifecycle reuses existing marketplace signing, license, group distribution, upgrade, revocation, user-selected release/version rollback, fork, refund, and attribution behavior. The current source implements a Sunburst-specific contract, repository, and API family and reuses shared account/publisher, billing, signing-root, and product-neutral attestation primitives; it does not yet implement every target lifecycle operation or a unified marketplace feed.

The trusted application shell always injects ray zero at the top in purple with stable category key `system.1var` and exact reserved category entity ID `ent_10000000-0000-4000-8000-000000000000`. No marketplace package, employer, user overlay, or Compute entity may remove, hide, reorder, recolor, replace, or impersonate it. It opens 1var communications, settings, governance, security, billing, device, sync, marketplace, status, and support controls. User preferences may govern eligible events, but not the presence or identity of the ray.

Canonical semantic evidence is multi-facet and independent of presentation. An exact entity may have many topic, activity, object, purpose, context, and capability-type memberships. Each installed template maps those facets into user-facing category lenses. The account may retain a template-scoped home category and a temporary interaction category without changing global entity identity. One activation may project into several categories but retains one exact activation and acknowledgement.

Explicit user placement outranks focus, exact graph evidence, employer defaults, publisher metadata, shared catalog candidates, Position, and bounded model proposals. A missing match enters a neutral unsorted category; the platform does not silently create a category. Position and imported legacy taxonomy embeddings nominate candidates only. Old `i_<domain>` contents may seed a versioned topic/facet catalog, but their table-per-domain layout and forced singular classification are retired.

The input surface is visually neutral unless an exact focused app or selected category supplies a tint. Purpose/trust lane semantics remain independent of color. Entities without requested UI inherit the dark transparent 1var surface; an explicit style request creates a separately versioned authored presentation on an opaque or white canvas.

## Consequences

- The same car-wash entity may be Transportation, Operations, or Fleet Maintenance under different templates without being copied.
- Education and biology can both project one exact fact; neither must defeat the other.
- Employers distribute one immutable package and group grant rather than copying templates per employee.
- Users can retain thousands of installations while downloading only active or recent packages.
- Switching the active installation is an exact pointer update and local reprojection, not a model or RAG operation.
- Paid install and upgrade attempts have one mutually exclusive durable receipt: either the exact installation committed or a terminal rollback marker owns that idempotency key. A compensated charge can never later produce a free installation; the user must begin a new attempt with a new key.
- Colors, focus, embeddings, and templates never grant data or execution authority.
- Sunburst behavior requires a versioned subsystem spanning contracts, resolver, renderer, marketplace lifecycle, canonical records, and derived indexes; scattered page scripts are rejected.

## Alternatives rejected

- **One physical DynamoDB table per topic or template.** Rejected because infrastructure topology cannot represent unbounded user content and multi-topic membership.
- **Force every entity into one global category.** Rejected because many semantic facets are simultaneously true and user contexts differ.
- **Copy one template for every employee.** Rejected because immutable packages and group grants provide bounded shared distribution.
- **Let templates define every ray.** Rejected because 1var needs a trusted, permanent control and communication surface.
- **Run local RAG on every interaction.** Rejected because local exact memberships and active lens rules are cheaper; Position is reserved for candidate discovery and is never authority.

## Security impact

Template packages contain presentation definitions and sanitized ordinary routing metadata only. They contain no protected plaintext, keys, grants, local Context snapshot, user placement history, or activation contents. The purple system ray is trusted-shell code, not marketplace content. Employer policy and user overlays cannot broaden action grants. Canonical records and action-specific authority are reloaded before any displayed candidate can be used or executed.

## Migration

Legacy topic lists, breadcrumbs, and reference embeddings may be reviewed and imported into a versioned shared topic/facet seed package. Legacy tables and singular numeric placement are not runtime dependencies of the clean platform. Marketplace release schemas must add an explicit presentation-template kind rather than disguising a sunburst as a Compute capability.

## Implementation snapshot

`onevar-platform` source supplies strict Sunburst and presentation-marketplace contracts, the pure resolver and authorized 100/10/100/100 selector over caller-supplied focused, recent, general, and category candidate buckets, trusted 20-by-5 browser renderer, tap/hold/left-drag/vertical-drag gesture state, local active/recent package cache, neutral input tint, immutable user-overlay materialization, typed marketplace commands and API clients, local signature/package verification, immutable S3 package storage, bounded DynamoDB metadata, signed publication, zero-cost owner installation, paid buyer installation, search, upgrade, exact package fetch, cursor-paged libraries, and an exact active pointer that carries the release version for constant-time same-account hydration. The selector authorizes and deduplicates exact IDs, but its category bucket has no typed installation, selected-category, or provenance input yet; live category-aware ContextDB retrieval remains pending. Automated tests cover these source boundaries; this is not deployed-browser evidence.

The implemented authenticated routes are `POST /api/v1/marketplace/sunbursts`, `/search`, `/installations`, `/upgrades`, `/package`, and `/library`, plus `GET|PUT /api/v1/marketplace/sunbursts/active`. Cryptographic release verification reuses the product-neutral `verifyMarketplaceReleaseAttestation` primitive. That primitive verifies canonical payload hash, active pinned trust root, key identity, algorithm, and signature only; a Sunburst or app must be strictly parsed and pass its product-specific review, compatibility, provenance, package, license, and authority rules before the verifier is called.

The initial server authority intentionally admits marketplace installations only. It rejects arbitrary built-in, fork, and employer pointers. Canonical activation persistence and acknowledgement, live category-aware ContextDB candidate selection, derived topic/facet Position integration, and employer/group template delivery remain separate implementation gates and must not be inferred from the existence of their schemas or pure rules.

## Verification

The required behavioral proof is specified in [Sunburst context projection and marketplace templates](../docs/capabilities/sunburst-context-projection.md).
