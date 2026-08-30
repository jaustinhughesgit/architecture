# 0116 — Authorized referent positioning ranks complete paths before asking

Status: accepted — clean-platform foundation implemented

Names nominate candidates; they do not identify or authorize them. Cross-user resolution first constructs complete candidate paths for the request, such as `{profile -> owned vehicle -> condition}` or `{profile -> exact protected binding}`. Same-name profiles missing the requested path are removed before ranking. One surviving path executes without clarification after current authority is revalidated.

Identity-scoped local referent memory and recent hydrated exact IDs nominate candidates ahead of sharded same-name retrieval. Shared public connected entities may add relevance. No remembered ID, connection count, date, embedding, or Position score grants access. The server reloads canonical public records and the action-specific relation, binding, grant, or permission before returning data or executing an effect.

If multiple complete paths remain and no bounded deterministic winner exists, the server returns at most five choices described by safe distinguishing public connections. It never returns an unbounded global list of people with the same name. The selected exact ID is revalidated and retained only in the requesting identity's local referent memory. When no safe public description separates candidates, the system requests an identity exchange or public identifying connection and fails closed.

The clean implementation applies this contract to ordinary named Context hydration and protected recipient questions. Name lookup uses 64 deterministic DynamoDB owner shards with bounded reads plus a legacy migration partition; remembered exact IDs bypass the fan-out. Arbitrary multi-hop six-degree graph ranking, Position-backed shared-anchor postings, learned decay/correction weights, and generalized non-person target paths remain partial work.

This decision extends [0041](0041-path-scoped-referent-memory.md) without turning local memory into shared Path identity or authority.

