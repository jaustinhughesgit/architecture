# 0050: Fresh browser identity bootstrap owns cookie rotation

**Status:** Accepted

## Context

A canonical test reset deletes server account and cookie records, but a browser can retain HttpOnly `accessToken` cookies. Historical deployments may have installed both an API-host cookie and the current domain-scoped cookie. The website cannot remove the API-host cookie from JavaScript or from a response served by the website host.

Calling the ordinary `newGroup/newUser/newUser` route while either retained cookie is still valid can authenticate the old principal and return or create a workspace that does not belong to the identity later selected from the cookie. Context publication and hydration then correctly reject that workspace with `CONTEXT_WORKSPACE_FORBIDDEN`. Headless tests did not expose the mismatch because each profile stores one explicit token and workspace together.

## Decision

- `/newuser` sends `freshBrowserIdentity: true` only to the exact `newGroup/newUser/newUser` bootstrap route.
- Compute recognizes that flag only on that exact route. It expires host-only and `.1var.com` `accessToken` cookies, removes incoming token material from the request, and invokes the ordinary account/group creation primitive anonymously.
- The replacement cookie is propagated into both the mutable request context and the dispatch metadata used by the `newGroup` action before the workspace is created. The returned workspace and replacement cookie therefore belong to the same principal; a pre-middleware cookie snapshot has no action authority.
- Compute installs the same replacement token as both an API-host and `.1var.com` HttpOnly cookie. A browser that retains the host-only cookie despite its expiry therefore still selects the same principal regardless of duplicate-cookie ordering; the token is never returned in response JSON.
- Ordinary `newGroup` calls, Context actions, and every other route retain normal authentication and cannot opt into identity replacement.
- `/newuser?reset=1` continues expiring the website-visible domain cookie as defense in depth, but correctness no longer depends on the browser having only that cookie scope.

## Consequences

Opening `/newuser` intentionally starts a new browser identity even when the browser has a valid prior session. This matches the page's purpose and makes cold-reset and multi-browser tests repeatable. Matching host/domain rotation prevents an acknowledged workspace from being separated from its principal by retained-cookie ordering. Navigating to ordinary workspaces never rotates identity. Context workspace verification remains fail closed.

## Affected repositories

- `aws`: requests the fresh identity handshake from the new-user page and retains the post-reset defensive cookie expiry.
- `compute`: scopes token removal and dual-cookie expiry to the exact bootstrap route.
- `testing`: keeps independent profile tokens and adds browser/publication seam scenarios.
- `architecture`: records the identity/workspace bootstrap invariant.

## Security impact

The flag grants no access to an existing account and cannot weaken another route's authorization. It creates a new anonymous identity by explicit navigation to the new-user surface. Existing identity cookies are expired, and both replacement scopes are HttpOnly, hold the same value, and are never logged or returned in response JSON.

## Verification

- Unit tests reject the flag outside the exact bootstrap path, prove both cookie scopes are expired, and prove recovered identity replaces the stale dispatch-metadata cookie consumed by action handlers.
- Website contract tests require `/newuser` to send the explicit flag. Compute unit tests prove the fresh route expires both old scopes, propagates one replacement principal into workspace creation, and installs that same token in both replacement scopes.
- Browser acceptance starts with a canonical reset, creates a browser publisher and a separately authenticated reader, then verifies named Context hydration and exact-ID local Path execution.
