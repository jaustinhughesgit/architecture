# Entity Inspector

## Purpose

The Inspector is a replaceable visual projection over ContextDB, installed entities, protected summaries, authorized public context, and marketplace candidates. It is not a second graph, a transcript, or an authorization system. It turns the exact local state already used by Essence and Compute into a navigable spatial surface while remote relevance arrives progressively.

## Projection order

1. The browser renders the owner's current Context snapshot and installed Sunburst widgets immediately. These owned points require no discovery request and remain usable offline.
2. The browser submits a bounded set of non-protected ordinary anchors to authenticated discovery. The API searches compact hashed facet postings, reloads each current canonical public Context record, revalidates its current audience and revision, and returns a bounded one-hop slice.
3. Marketplace search runs independently from public-context discovery. Neither remote stream delays, clears, or repositions the owned graph merely because it is pending or unavailable.

Protected ciphertext, protected labels, keys, grants, and plaintext are never discovery anchors. The Inspector may show only a local protected summary and must route inspection through the existing protected authorization ceremony.

## Relevance and authority

A public peer candidate may be suggested by shared exact ordinary facets such as a place, recurring day, organization, or activity. This permits a nearby candidate such as another person using the same public soccer field on Monday without requiring a prior social connection. Relevance is not authority: all returned data must already be public and every later use still applies its own exact permission checks.

Discovery is bounded and progressive. It is not a global people list, and profile names are not indexed as ambient matching facets. DynamoDB uses one shared facet-index record family rather than physical tables per topic or user. Stale derived postings are harmless because current canonical revision, audience, and facets are rechecked before response.

## Interaction model

- owned points are fully colored;
- authorized other-user points use a dark category tint with a solid category border;
- protected summaries use a solid lock presentation;
- marketplace candidates begin as small disconnected dashed points and reveal locally with nearby exploration;
- visible relation lines use the target point's color, remain attached during point drag, and disappear when another visible point occludes the segment;
- background drag pans the world, while points themselves drag freely for the current session and never persist coordinates;
- points stay at 100% throughout a wide center plateau, then ease continuously to a 20% edge floor;
- a bounded spatially hashed collision pass computes one target after a drag, pan, reveal, or progressive append; the browser animates to it for 320 milliseconds and then stops;
- opening a point expands it into a mobile-sized rounded work surface and moves attention to that entity;
- clicking the Sunburst center enters the Inspector for the selected ray instead of opening a separate widget page;
- the existing Sunburst, input composer, activity feed, and conference dock remain stable system surfaces above the projection.

Color, position, size, focus, reveal state, and candidate ranking never grant access or alter entity identity.

## Ownership and lifecycle

Shared strict contracts own the discovery request and response. Context publication derives bounded facets. The canonical repository owns current public records and derived facet postings. The API owns authentication and exact revalidation. The browser Inspector module owns projection, panning, transient point position, collision settling, reveal, level-of-detail, and detail presentation. It materializes at most one bounded visual window and only nearby exact edges. Canonical Context and marketplace records remain authoritative.

See [decision 0130](../../decisions/0130-inspector-renders-local-state-before-progressive-authorized-discovery.md) and [decision 0132](../../decisions/0132-inspector-keeps-a-wide-focus-plateau-and-animates-settling.md).
