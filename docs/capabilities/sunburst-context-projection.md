# Sunburst context projection and marketplace templates

**Status:** Partial — development foundation deployed, with the fixed-slot control and browser-local widget projection proven on the development release. The clean platform has automated contract, runtime, browser component/unit, local Chromium, repository, API-service, and deployed default-browser presentation proof. Authenticated signed-package interaction, durable activation and acknowledgement, cross-device topic-bank/widget state, live category-aware ContextDB selection, employer/group authority, topic/facet Position integration, and the complete shared-marketplace lifecycle remain pending.

## Purpose

The 1var sunburst is a compact projection of the user's changing world. Its colored rays group applications, entities, communications, completed work, data use, financial changes, alerts, access attempts, connection requests, and other activations without reducing that world to one notification count.

The current baseline uses the original twenty-color 1var palette: `#735099`, `#8a3b8e`, `#a7328a`, `#cb3089`, `#da3278`, `#dd5163`, `#e57d48`, `#efaa42`, `#e5bf47`, `#cad050`, `#9dc555`, `#6eb557`, `#37ab74`, `#1fac96`, `#18b0b9`, `#08b4d7`, `#0faadf`, `#3296d0`, `#3e80be`, and `#5766a9`. These are fixed rainbow slots, not editable topic properties. A ray is a user-facing category lens, not a canonical ontology partition. The trusted renderer owns slot colors; templates and local customization move topic occupants between those colors. Each visible category has one transparent placeholder dot, and additional full-color dots exist only for projected widgets. Dot size communicates bounded local activity: `1–3` small, `4–19` medium, and `20+` large. No presentation field changes entity identity, facts, permissions, or execution authority.

## Sunburst, ray-group, and widget-entity hierarchy

```text
Sunburst presentation entity/package
  -> twenty fixed-color ray-group entities
       -> one widget-space page per ray group
            -> five projectable entity positions
```

A widget position contains an entity reference, not arbitrary page-specific JSON. The referenced entity may be an application or calculator, an ordinary or shared document, a chart, a schedule, a notification/control entity, or another authorized projectable entity kind. The ray-group entity owns the ordered collection of at most five references for that installed Sunburst. Its widget page is the visual projection of that exact group and collection; it is not one global dashboard filtered after opening.

A Sunburst is the distributable collection of those groups. Personal and work lenses can cover broad worlds, while an employer or product publisher can distribute a focused world such as an Apple employee Sunburst or a game composed of capabilities across several groups. Installing or switching a Sunburst changes the presentation collection and its placements without copying the referenced entities, changing their grants, or changing their canonical identity.

**Partial:** the current browser proves twenty separately selectable group pages, five positions per page, app-backed local entity projections, trusted system controls, group-colored surfaces, and blank positions. The v1 package has exact category entity IDs and projectable-reference contracts, but does not yet persist an ordered five-reference collection for every ray-group entity across devices or populate every projectable entity kind.

## Permanent 1var system ray

Ray zero, initially aligned at the top and colored purple, is reserved for 1var. The trusted application shell injects it outside every marketplace template. A user, employer, publisher, template, overlay, or Compute entity cannot remove, hide, reorder, recolor, replace, or impersonate it. The complete wheel may rotate, so screen-top is the current selection coordinate rather than a permanent physical location for slot zero.

The system ray is the stable route for:

- 1var communications and important platform announcements;
- account, settings, sync, device, and passkey controls;
- permissions, protected-data requests, and failed-access evidence;
- credits, billing, marketplace installation, and publisher controls;
- platform status, updates, support, and other trusted 1var operations.

Tapping the ray opens the 1var control center. Holding it may open voice control for the same bounded settings and commands. Users may acknowledge events and govern eligible notification preferences, but cannot remove the ray. Template validation reserves its exact category ID, position, and color token and rejects any collision.

## Semantic membership is not color

An entity may have many simultaneous semantic facets. Useful facets include domain, activity, object, purpose, life or organizational context, and capability type. For example:

```text
"I went to school for biology"
  activity: education
  subject: biology
  context: personal history

car-wash capability
  domain: transportation
  activity: vehicle care
  capability type: service
  context: personal or fleet operations
```

Education and biology are therefore not competing single classifications. Exact graph relations remain canonical evidence. Topic and facet Position documents are derived candidates. Explicit user classification is a governed user preference. No embedding or color becomes an entity identity.

Each account keeps three separate concepts:

1. **Semantic memberships:** the many topics and facets associated with an exact entity or activation, with provenance.
2. **Home category:** the user's default ray for presenting that entity under one installed template.
3. **Interaction category:** the temporary ray selected by focus, navigation, or an explicit wheel spin for the current input or activation. Legacy `vertical_drag` provenance remains readable for prior records.

The same entity may project into several category views without being copied. A single activation may have one primary and several secondary category projections. Several rays may animate with different emphasis, but one exact activation ID owns acknowledgement, so reading it in one view clears it everywhere.

## Placement and correction

The category resolver ranks evidence in this order:

1. explicit session category selected by the user;
2. an exact user placement or correction for the active template;
3. the focused app and its exact installed entities;
4. exact ContextDB relations matching a category lens;
5. an employer overlay where its governed policy applies;
6. publisher-declared ordinary topic metadata;
7. the versioned shared topic/facet catalog;
8. bounded lexical and Position candidates;
9. an LLM proposal only for unresolved ambiguity, constrained to supplied exact candidates.

Authority and classification remain separate. A focus, category, embedding, model result, employer template, or presentation placement grants no entity action.

If a new item has no reasonable category, it enters the template's neutral `new.unsorted` category. The platform does not silently create a permanent category for one entity. Repeated related items may produce a suggestion, such as creating a Transportation category, which the user may accept, rename, map, or reject. A user drag or spoken correction is durable, template-scoped evidence and outranks later inference. Inferred placements may decay or be recomputed; explicit placements do not silently move.

The old `i_<domain>` tables and breadcrumb embeddings may be imported as versioned seed knowledge for the shared topic/facet catalog. Their table-per-domain storage and forced single domain/subdomain result are not retained. New topic growth is records and derived postings behind the canonical persistence port, never new physical DynamoDB tables.

## Templates are marketplace entities

A sunburst template is a signed, immutable marketplace entity release, not a separate marketplace or a DynamoDB table. In the target product experience, the existing entity marketplace filters presentation entities as `Sunbursts` alongside applications, files, automations, and providers. The current source still exposes a Sunburst-specific route and record family behind that intended shared product surface.

The target immutable template package contains:

- exact template ID, release, schema, compatibility, publisher, and provenance;
- nineteen template-controlled ray definitions and stable category IDs;
- fixed slot assignments, animation policy references, and widget-layout policy;
- topic/facet lens rules and a neutral category;
- default focus and presentation policies;
- optional references to reviewed customization capabilities;
- bounded employer policy declarations.

The current v1 payload implements the template identity and metadata plus nineteen exact ray/category/color/lens definitions. Color fields remain parseable for package compatibility, but the renderer selects the trusted fixed slot color. Animation parameters, package-controlled widget layout, default focus/presentation policy, customization-capability references, and employer policy declarations remain target fields rather than accepted v1 package bytes.

## Active slots and topic bank

The twenty visible slots are bounded; the user's inactive topic bank is conceptually unbounded. The bank belongs to the user's identity rather than one template installation. A person can retain an exact visible group in the bank, activate another template, and swap that same group into the new template. A lossless swap moves a selected bank topic into an editable slot and moves the displaced occupant into the bank. It changes the active presentation lens only. It cannot delete a topic or widget, recolor a slot, change an entity, or grant authority. The trusted `system.1var` slot never participates.

The current implementation stores active assignments, one identity-level bank shared by local template installations, widget projections, and activity counts in identity-scoped browser storage. Publishing freezes the active slot assignments into an immutable user-owned package while excluding the bank and local activation history. Cross-device recovery and cursor-paged canonical bank storage remain pending; an implementation must not use one DynamoDB table per topic or one unbounded account item.

The package never contains the trusted purple system ray. Full immutable packages belong in the object/package plane and are addressed by content hash. In the target lifecycle, DynamoDB retains compact canonical release, listing, grant, installation, active-pointer, overlay, lifecycle, and routing records. The current slice stores the bounded release/listing/license/installation/transaction/library/active-pointer subset. Position postings remain derived and rebuildable.

The target product lifecycle reuses marketplace publisher identity, signing, review, pricing, licensing, collaboration, deprecation, user-selected release/version rollback, revocation, upgrade, refund, and attribution rather than creating a second marketplace. The current clean-platform slice is narrower: Sunbursts have a separate strict release/listing/license/installation/transaction contract family and Sunburst-specific repository/API routes, while reusing account, publisher, billing, signing-root, and product-neutral attestation primitives. Collaboration, deprecation, user-selected release/version rollback, revocation, refund, employer/group delivery, and a unified polymorphic marketplace feed remain later lifecycle work. The implemented terminal rollback marker is payment-saga compensation after a failed install or upgrade; it is not user-facing release/version rollback. A receiving browser verifies the exact package and creates a caller-local installation. It never receives another user's active Paths, Context, protected data, placements, or notification history.

## Employer distribution and switching

In the target employer lifecycle, an employer can acquire or publish one template release and grant it to an exact organization group. Employees share the immutable package; the platform does not copy the package per employee. Each employee retains a small installation record and permitted overlay. An employer may pin a version, stage an upgrade, revoke a grant, require governed categories, or allow a user fork without mutating the source release. This authority is not implemented in the current server slice.

An account may own or receive thousands of template installations. The browser loads the active package and caches only active or recent packages on demand. A cached marketplace body is not offline authority: startup must revalidate the exact account pointer, signed release, pinned trust root, and content address before activation. When that evidence is unavailable or invalid, the browser opens its deterministic code-shipped Individual lens. One exact, version-checked active-installation pointer selects the current marketplace sunburst. Switching templates changes the lens, not the underlying entities or semantic memberships, and therefore requires no new classification or model request.

Rendering layers are applied in order:

1. trusted 1var system ray;
2. immutable marketplace template;
3. governed employer overlay;
4. permitted user overlay;
5. current session and interaction emphasis.

An entity can consequently appear green under an Individual Transportation lens, blue under a Business Operations lens, and orange under a Fleet Maintenance lens while retaining one exact entity ID.

## Gesture and widget behavior

- **Default:** show a compact Sunburst on the right while the four-button slider is retracted.
- **Wheel surface:** a one-percent-opacity black circular grabber sits behind the burst. Circular movement beginning on that surface or through any pointer-transparent activity dot rotates the complete wheel.
- **Top-ray selection:** the ray nearest twelve o'clock is the exact preview/selection source. Its fixed slot color drives the center, while a temporary white-on-dark pill above the burst names that group only during active spin motion.
- **Release:** commit the same top ray, preserve the nearest equivalent exact wheel rotation, and remove the pill without resetting the wheel or flashing the prior group.
- **Activity dots:** display category, widget, and activity state only; they do not own clicks, action drags, keyboard-button behavior, identity, or authority.
- **Center control:** the enlarged circle adopts the previewed or selected group color, projects the canonical vector 1var logo with a bounded margin, and is the only action surface. The compact control has no explanatory caption below it; accessible names carry the instructions.
- **Center tap:** open the selected top ray's widget-space page. There are twenty independently selectable pages, including the trusted 1var group, and each page contains exactly five entity positions.
- **Center stationary hold:** start ordinary Essence speech; release or cancellation stops the same capture. Customizing the selected category remains an explicit action within its widget page.
- **Center drag left:** retract the ray dots, open the input, and transition the right-side control into the four-button slider with Essence button 2 at its center.
- **Close or ephemeral submit:** animate back to the Sunburst.
- **Center drag up:** open the full Sunburst management surface. This is where the person edits the active draft, retains and swaps ray groups through the identity-level bank, browses installed templates, searches the signed Sunburst marketplace, and reviews create/publish/install/activate operations.

The widget surface is a full-page, scrollable responsive grid for one exact ray-group entity. Its header is the ray-group name—never the template name or a generic `Sunburst` title. Its border uses the fixed ray-slot color and its dark background carries a transparent tint of that same color. It renders five baseline square or rectangular entity cards: exact app-backed widgets first and blank placeholders for unused positions. The cards use the same group color for their borders and transparent tint. A click on a non-placeholder widget submits that widget's exact registered menu command immediately through the normal command runtime; it does not merely fill a hidden composer and wait for a second Run action. The same entity may be referenced from more than one group without being copied. When Convert successfully registers a newly authored app while a ray group is selected for that input, the browser must immediately create or refresh that exact app's local projection in the selected group; the first unused position becomes the first app-backed card without requiring the user to open the app. Menu registration without the corresponding selected-group projection is an incomplete successful build. The selected group remains presentation placement only and grants no access. The current browser also records exact app focus as bounded local widget/activity projection; a durable ordered five-entity group record and cross-device activation feed do not yet populate this behavior cross-layer.

## Input and app presentation

The four input lanes retain their purpose and trust meanings, but permanent lane colors must not compete with category colors. Neutral input presentation uses white, black, gray, and transparent tokens. When an app or interaction category is focused, transparent tint, border, and focus tokens use that category's color. Color is presentation context and never indicates protected status or permission.

An entity has two presentation modes:

- **Inherited mode:** when no custom UI was requested, it uses the standard dark, mostly transparent 1var surface with category tinting.
- **Authored mode:** once the user explicitly requests visual styling, it receives an opaque or white authoring canvas and versioned presentation definition so requested typography, layout, and colors do not have to conform to the transparent inherited surface.

The underlying capability, data, and grants do not change when presentation mode changes.

## Context selection

The implemented pure bounded selector keeps focused exact app entities first and consumes four caller-prepartitioned candidate buckets:

- up to 100 permitted focused entities;
- up to 10 recent permitted inputs;
- up to 100 generally related permitted entities;
- up to 100 additional permitted entities selected through the active category lens.

Candidates are deduplicated by exact ID and the lists refill after authorization filtering. These numbers are versioned retrieval-policy parameters, not identity or security boundaries. The current selector's `categoryCandidates` bucket carries only exact entity IDs and ranks; it does not yet carry a typed installation, selected category, or category-evidence provenance. Its caller must therefore prepartition that bucket, and no source claim treats that partition as authoritative category retrieval. The pure selector has automated runtime tests; live ContextDB candidate retrieval does not yet call it. Local compact category memberships should eventually answer ordinary category filtering without local RAG. Global lexical/Position retrieval is intended for new discovery and unresolved placement, followed by canonical reload and action-specific authorization.

## Ownership boundaries

- **Contracts:** template, ray, lens, installation, overlay, placement, activation projection, and system-ray invariants.
- **Shared deterministic runtime (`@1var/runtime`):** category resolution, overlay composition, bounded authorization/deduplication over caller-prepartitioned context buckets, and inherited/authored surface selection.
- **Browser state and coordination:** local membership cache, active pointer, focus, gesture state, acknowledgement, and interaction-envelope integration.
- **Browser presentation:** sunburst renderer, widget page, input tint, inherited/authored entity surfaces, and accessible non-color indicators.
- **Marketplace/API target:** signed template releases, listings, group grants, licenses, upgrades, revocation, refund, and bounded delta sync. The current slice implements publication, search, installation, upgrade, exact package retrieval, paged library reads, and exact active-pointer reads/writes.
- **Canonical persistence:** exact entity, release, installation, group, overlay, and explicit preference records through the persistence port.
- **Derived retrieval:** shared topic/facet and template Position postings; never fact, placement, or permission authority.

The feature should be implemented as a removable, versioned subsystem with shared contracts and pure resolution rules, not as unrelated scripts distributed across input, notification, marketplace, and entity pages.

## Clean-platform implementation snapshot

`onevar-platform` now contains the strict shared contracts, deterministic resolver and authorized 100/10/100/100 selector over prepartitioned candidate buckets, trusted fixed-slot browser renderer, Sunburst/slider transition, wheel gesture, full dashboard, a full-page template/topic manager, an identity-level cross-template local bank, immediate selected-group projection of newly registered Convert apps, activity-sized widget dots and neutral input-tint integration, browser-local active/recent cache, immutable active-assignment materialization, typed marketplace command/API clients, local signature and package verification, immutable S3 artifact store, metadata-only Dynamo repository, signed publication, exact zero-cost owner installation, paid buyer installation, search, upgrade, package fetch, cursor paging, exact `listingId` lookup, and an active pointer carrying release and package identity for constant-time same-account hydration. Marketplace UI actions prepare exact governed commands for review instead of charging or publishing on an accidental click. Automated tests prove these source boundaries; they are not a substitute for authenticated deployed Sunburst interaction proof.

The current authenticated API surface is:

- `POST /api/v1/marketplace/sunbursts` for publication;
- `POST /api/v1/marketplace/sunbursts/search`;
- `POST /api/v1/marketplace/sunbursts/installations`;
- `POST /api/v1/marketplace/sunbursts/upgrades`;
- `POST /api/v1/marketplace/sunbursts/package` for exact package retrieval;
- `POST /api/v1/marketplace/sunbursts/library` for cursor-paged metadata;
- `GET|PUT /api/v1/marketplace/sunbursts/active` for the exact active pointer.

The cryptographic envelope check is intentionally product-neutral: `verifyMarketplaceReleaseAttestation` validates the canonical payload hash, active pinned trust root, key identity, algorithm, and P-256 signature for any payload that its caller has already strictly parsed. App and Sunburst callers must still apply their own schemas, review state, compatibility, provenance, package, license, and authority checks. A valid marketplace signature alone does not admit a product.

The current server intentionally accepts marketplace installation authority only. It rejects arbitrary built-in, fork, and employer pointers. Employer/group delivery, durable activation records and acknowledgement, live category-aware ContextDB candidate retrieval, and topic/facet Position integration remain explicit later gates. Documentation must not describe those later gates as deployed merely because their contracts or pure rules exist.

## Development release evidence

Release `1bab807c3eb97e80b64ea50049bdcf7c48ae6afa` reached the development CloudFront site through immutable GitHub Actions run `33367354061`. The complete local browser matrix passed with 30 tests and 10 environment-gated skips. A post-deployment Chromium inspection of a fresh entity measured the default Sunburst mode with no open composer, a 192-pixel control at an 8-pixel right inset, twenty transparent category placeholders, and a scrollable dashboard containing five placeholder cards. This is deployed default-browser presentation proof; authenticated signed-template delivery, durable activation, and cross-device bank/widget recovery remain unproven.

Release `d7c3ff4217aba35891ec0c59c9954fce7d27d3cf` reached that site through immutable GitHub Actions run `33397109521` without resetting test state. The complete repository verification and the applicable 15-test local Chromium input-trust suite passed. The live content-addressed assets expose the circular grabber and center-control contract while making ray groups pointer-transparent. A stale entity session correctly fails closed, so this evidence proves deployed artifact integrity rather than authenticated account-scoped widget behavior.

Release `4d100ac9e496a13fb935910bbe359e2962129e13` reached that site through immutable GitHub Actions run `33402077585` without resetting test state. Complete repository verification, 149 web unit tests, all 32 runnable local Chromium tests, the four focused Sunburst gesture tests, and the 28 KB entity-startup budget passed before promotion. The deployed content-addressed assets expose the upward center-drag manager, reviewed publishing, identity-level bank controls, and the signed-template marketplace projection. This proves immutable delivery of the management surface; authenticated install, activation, and cross-template bank behavior remain user/browser acceptance gates.

Release `37521c0378bdb81882c48b4d4ed93e23843ff381` reached that site through immutable GitHub Actions run `33405973098` without resetting test state. Complete repository verification, the exact legacy twenty-color palette regression, ray-group widget-space rendering tests, and all sixteen applicable local Chromium input-trust checks passed before promotion. The deployed release makes center tap open the exact selected ray group's five-position page, labels the page with that group rather than the template, and derives the page border and transparent background tint from the fixed slot color. This is presentation proof; durable cross-device ordered five-entity membership remains Partial.

Paid installation and upgrade use a durable, mutually exclusive saga receipt. The exact idempotency key can resolve to a successful installation receipt or to terminal rollback evidence, never both. A retry of terminal rollback evidence completes any interrupted idempotent compensation and remains failed; only a new idempotency key may begin another charged attempt. Publishers may always install, activate, and upgrade their own exact approved release at zero price even while a private or staged rollout excludes buyers.

## Required proof before the capability moves from Partial to Implemented

- A car-wash app is projected into a reasonable existing category or neutral unsorted without creating a domain-specific core rule.
- One biology-education fact appears through both category lenses while retaining one entity and one acknowledgement.
- A user correction persists, survives reload, and outranks Position.
- Switching among Individual, employer, and custom templates reprojects the same exact entities without a model call.
- An employer grant installs one shared package, supports a governed overlay, and revokes or upgrades without scanning all users.
- Thousands of installed template records do not require loading thousands of packages at startup.
- A marketplace template cannot alter, cover, reorder, recolor, or impersonate the purple logical-slot-zero 1var system ray; wheel rotation may move that ray away from the screen-top selection coordinate.
- Category selection changes neither protected-data handling nor any action-specific grant.
- Protected values, another user's placements, and notification contents never enter public template packages or Position documents.
