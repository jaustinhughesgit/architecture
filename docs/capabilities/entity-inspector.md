# Entity Inspector

## Purpose

The Inspector is a replaceable visual projection over ContextDB, installed entities, protected summaries, authorized public context, and marketplace candidates. It is not a second graph, a transcript, or an authorization system. It turns the exact local state already used by Essence and Compute into a navigable spatial surface while remote relevance arrives progressively.

## Projection versions

Inspector V1 remains an intact selectable renderer for comparison and rollback. Inspector V2 is a separate scene compiler and renderer, not a progressive mutation of V1. The browser remembers the selected version locally and defaults new browsers to V2. Both versions share the same authoritative state, discovery APIs, Sunburst, input/feed, call dock, and permissions; neither version changes entity identity or authority.

V2 compiles a fresh bounded semantic scene around one exact focus entity. It assigns every admitted point a relevance role and reason, collapses overflow, and renders only exact relationship evidence. Semantic similarity, selected-ray membership, public-facet proximity, and marketplace usefulness may place points near one another, but they cannot create a line.

Every point also resolves its own ray category. An exact active user placement for one owned Context entity or installed app outranks a bounded browser-local Position candidate derived from safe labels, type, exact relation terms, and neighbor labels. The active slot supplies the category color. Spinning to another ray filters and prioritizes the scene; it never repaints all points. The person can explicitly place one owned point in the selected ray or clear that correction to resume automatic Position.

## Projection order

1. The browser renders the owner's current Context snapshot and installed Sunburst widgets immediately. These owned points require no discovery request and remain usable offline.
2. The browser submits a bounded set of non-protected ordinary anchors to authenticated discovery. The API searches compact hashed facet postings, reloads each current canonical public Context record, revalidates its current audience and revision, and returns a bounded one-hop slice.
3. Marketplace search runs independently from public-context discovery. Neither remote stream delays, clears, or repositions the owned graph merely because it is pending or unavailable.

Protected ciphertext, protected labels, keys, grants, and plaintext are never discovery anchors. The Inspector may show only a local protected summary and must route inspection through the existing protected authorization ceremony.

## Relevance and authority

A public peer candidate may be suggested by shared exact ordinary facets such as a place, recurring day, organization, or activity. This permits a nearby candidate such as another person using the same public soccer field on Monday without requiring a prior social connection. Relevance is not authority: all returned data must already be public and every later use still applies its own exact permission checks.

Within owner-local Context, V2 ranks by bounded breadth-first distance from the exact focus rather than label length or storage order. Direct relations are primary, second-degree relations are secondary, and farther or disconnected state is ambient or collapsed. Public peers and marketplace extensions arrive in independent streams after that local scene is usable.

Discovery is bounded and progressive. It is not a global people list, and profile names are not indexed as ambient matching facets. DynamoDB uses one shared facet-index record family rather than physical tables per topic or user. Stale derived postings are harmless because current canonical revision, audience, and facets are rechecked before response.

## Interaction model

- owned points are fully colored;
- authorized other-user points use a dark category tint with a solid category border;
- protected summaries use a solid lock presentation;
- marketplace candidates begin as small disconnected dashed points and reveal locally with nearby exploration;
- V1 relation lines use the target point's color and a global point-moat plus endpoint-stub treatment;
- V2 lines exist only for exact active local Context relations or exact authorized public Context relations, terminate at both endpoint borders, and use an edge-specific SVG mask to cut a black gap at every unrelated point without breaking the edge at either exact endpoint;
- background drag pans the world, while points themselves drag freely for the current session and never persist coordinates;
- points stay at 100% throughout a wide center plateau, then ease continuously to a 20% edge floor;
- three deterministic exact-neighbor ordering passes exchange only compatible positions inside the same relevance band during initial compilation or a graph-topology change, accepting only arrangements that shorten rank-weighted connections or route non-focus lines away from the center;
- pan, reveal, and point-drag completion run only spatially hashed collision separation, after which the browser animates to one target for 320 milliseconds and all layout work stops;
- opening a point expands it into a mobile-sized rounded work surface and moves attention to that entity;
- clicking the Sunburst center enters the Inspector for the selected ray instead of opening a separate widget page;
- the existing Sunburst, input composer, activity feed, and conference dock remain stable system surfaces above the projection.

Color, position, size, focus, reveal state, and candidate ranking never grant access or alter entity identity.

## Ownership and lifecycle

Shared strict contracts own the discovery request and response. Context publication derives bounded facets. The canonical repository owns current public records and derived facet postings. The API owns authentication and exact revalidation. The browser Inspector module owns projection, panning, transient point position, collision settling, reveal, level-of-detail, and detail presentation. It materializes at most one bounded visual window and only nearby exact edges. Canonical Context and marketplace records remain authoritative.

The V2 scene contract admits at most 96 nodes and 160 edges. Its compiler currently budgets up to 40 owner-local entities, 28 authorized peer entities, and 16 marketplace candidates, leaving room for protected and collapsed-summary points. A collapsed point is a resumable retrieval boundary, not a synthetic relation. These budgets can evolve in later scene-contract versions without changing ContextDB or migrating canonical entity data.

## Spatial workbench and semantic surfaces

V2 now implements a bounded ordinary workbench over the existing entity model. A local zoom control reveals dot, label and summary levels; an opened point displays current owned or authorized-public facts in a scrollable keyboard-accessible phone-sized surface. Ordinary app surfaces show declared inputs, exact data bindings and the latest workflow result.

Dropping owned data onto an app only proposes a binding. Apply rechecks exact app/installation identity, dependency compatibility, owner and subject/relation versions. Dropping one plain app onto another proposes a two-step composition; Create produces a separate app bundle with independently cloned caller-local bindings and preserved marketplace attribution. Run remains explicit and uses the existing workflow coordinator, costs, effect commit, audio and failure behavior. Repeated single-app runs reuse the executable definition. Source-app rebinding cannot retarget a composed app, and opening a plain source app cannot accidentally run the composition.

No coordinate, name, public proximity or protected placeholder is authority. Protected/provider actions stay in their dedicated surface; nested visual workflows, peer writes, arbitrary renderer generation and specialized surfaces for all entity classes remain outside this slice. See [decision 0139](../../decisions/0139-inspector-spatial-workbench-reuses-exact-bindings-and-arraylogic.md).

## Verified releases

Release `b6cc1e09a5778f0850665c26b0986f4770b91a37` passed the complete repository gate and 44 applicable browser scenarios (12 live-only scenarios intentionally skipped) in [CI workflow 33928738271](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33928738271). [Development deployment 33929331674](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33929331674) published the identical release without a reset or paid live canaries. The public development health endpoint reports that release, and the served entity assets match the verified build. Proof covers exact data-to-app drag preview, explicit binding and normal workflow execution, updated facts/results, duplicate-name selection, independent two-app composition bindings, stale/revoked authority rejection, semantic zoom, keyboard access and mobile sizing. Production was unchanged.

Release `227388bc4c3a8cb27c24a6267c57b560da89bfb6` passed the complete repository gate and 43 applicable browser scenarios in [CI workflow 33916536587](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33916536587). [Development deployment 33917296242](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33917296242) published that exact immutable release through CloudFront without resetting user data. The regression proof covers stable automatic Transport placement while the selected ray changes, exact user placement precedence, reversible return to automatic Position, and correct selected-ray filtering after an override.

Release `c644b8ed04de2081947710ad6cf3e5fbd99c6feb` passed the complete repository gate and browser suite in [CI workflow 33922870364](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33922870364). [Development deployment 33923532678](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33923532678) published that exact immutable release through CloudFront without resetting user data. Its neighbor-attraction layout was subsequently superseded by relevance-preserving slot optimization because attraction changed graph geometry during ordinary navigation.

Release `d00b21622646d2c4e95ee194c2e9e54d8e20608d` passed the complete repository gate and 43 applicable browser scenarios in [CI workflow 33925111110](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33925111110). [Development deployment 33925746697](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33925746697) published that exact immutable release through CloudFront without resetting user data. The proof covers deterministic same-band slot exchange, preserved focus and relevance depth, improved exact-edge length, topology-gated reordering, collision-only interaction settling, bundle budgets, and the default Inspector browser surface.

See [decision 0130](../../decisions/0130-inspector-renders-local-state-before-progressive-authorized-discovery.md), [decision 0132](../../decisions/0132-inspector-keeps-a-wide-focus-plateau-and-animates-settling.md), [decision 0134](../../decisions/0134-inspector-point-moats-distinguish-edge-incidence.md), [decision 0135](../../decisions/0135-inspector-v2-compiles-bounded-semantic-scenes.md), [decision 0136](../../decisions/0136-inspector-colors-follow-entity-ray-placement.md), and [decision 0138](../../decisions/0138-inspector-optimizes-relevance-preserving-slots.md).
