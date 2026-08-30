# Decision 0112: Scheduled ArrayLogic retains browser Context authority

## Decision

Phase 5.4 may schedule one immutable ordinary ArrayLogic workflow, but a time trigger does not transfer ownership of browser-local installations, `using` bindings, Paths, or ContextDB to the server. At creation, the browser resolves one unique active workflow name or exact ID and supplies only its immutable workflow/version/content hash, exact step capability/version/operation/package/program identities, ordinary typed inputs, aggregate price ceiling, and trigger. No local relation value or Path is uploaded.

The shared dispatcher creates a deterministic occurrence and marks it `awaiting_browser_execution`. An eligible owner browser receives that occurrence through the existing authenticated delta, verifies its exact active workflow installation and content hash, and runs the pinned steps sequentially through the normal ArrayLogic engine. Browser-local primitives commit locally; server steps retain their normal governed invocation path. The occurrence interaction ID is also the workflow interaction ID, so refresh and retry recover an already-completed local run instead of executing it twice.

Completion sends only a value-free receipt containing the exact occurrence, schedule definition, workflow installation, workflow/version/hash, and local run identities. Protected or credential-bearing workflow scheduling remains rejected until an exact per-occurrence authority contract exists. If no authorized owner browser is active, ordinary scheduled ArrayLogic waits rather than silently changing execution plane.

Schedule names are human addresses, not authority. Creation may assign a name, while pause, resume, cancel, and move may resolve one unique normalized name. Zero or multiple matches fail closed. Every lifecycle mutation uses the resolved exact schedule ID, and moving a schedule appends an immutable definition version.
