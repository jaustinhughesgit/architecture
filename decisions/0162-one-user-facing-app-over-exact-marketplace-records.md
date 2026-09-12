# One user-facing app over exact marketplace records

Status: Implemented in the clean platform; deployment evidence belongs to its delivery record.

The user manages one app through Inspector and CLI. Its stable app/menu identity
composes, rather than replaces, publisher listing, immutable signed release,
recipient installation/license, local Paths, bindings and workflows. Exact IDs
join these records; names and version numbers alone never merge them.

Inspector suppresses the installed app's duplicate listing and marks the app with
a dashed marketplace ring/badge. Current worker lifecycle determines presence;
attention caches only supply placement. Publisher detail and management controls
live on that one entity. App placement, focus and Quick Links retain stable app
identity when its selected version changes.

Recipient CLI status, known versions, current-license usage, updates, rollback and
removal use the same local resolver as Open. A bounded optional target version in
the existing upgrade contract selects a signed approved release after exact
account, current license, revision, rollout and price checks. It does not change
the publisher release pointer. Publisher-wide rollback has explicit `published`
wording and its independent authorization.

Library delta hints include optional exact license identity as well as release
identity, so same-release reinstalls on another device receive fresh installation
authority rather than reusing a retired license from cached release bytes.

Removing an app retires only the caller's installation through the existing
revisioned preference contract. Server execution rejects its removed authority;
local Paths, pending attempts and dependent workflows retire. Facts, immutable
definitions and purchase/usage evidence remain. Reinstall requires fresh licensed
authority and normal signed pricing; removal grants neither refund nor publisher
delete authority. Future scheduled execution rechecks installation authority;
already committed effects are not undone.

Implemented evidence: clean-platform contract/unit tests and marketplace browser
acceptance cover exact joins/namesakes, one dot and publisher detail, stable
identity, recipient rollback isolation, removal denial, reload and repurchase.
Known-version history and current-license usage are bounded reports; a complete
all-device lifetime analytics product is not implied.

See `onevar-platform/docs/decisions/0104-one-app-surface-over-exact-marketplace-authority.md`.

## Development delivery evidence — 2026-09-12

- Product release: `05617a435e5f9fca5f0d7673ace8c7b37abd35ee`.
- [CI](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34714820244)
  passed verification, infrastructure synthesis and the complete browser suite:
  77 passed, 18 environment-gated skips. Local verification and the same browser
  suite also passed. Coverage includes native sync/provider-status command
  precedence and immediate focused-version display after switching/removal.
- [Development deployment](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34714822196)
  succeeded with reset-gated acceptance disabled. Existing development data was
  not reset. Live API health reports the exact release; the create/sign-in page
  and app-management, entity and Inspector assets match the tested build bytes.
- Browser acceptance here used isolated local/CI fixtures. This delivery did not
  run the optional paid live-authoring canary against existing shared dev state.
- Test entry: https://d3byneo87fybgf.cloudfront.net/newentity1/ — use the existing
  account's passkey to inspect its installed apps.
