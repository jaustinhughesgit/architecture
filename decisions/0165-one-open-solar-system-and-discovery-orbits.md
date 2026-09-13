# 0165 — One open solar system and discovery orbits

Date: 2026-09-12
Status: Implemented as a bounded slice; verified locally and in CI, deployed to development

Only the selected exact owner/publisher system is expanded at the canvas origin.
Relevant marketplace candidates occupy the first outside orbit; collapsed owner
circles containing their names occupy a separated second orbit. Exact identities
and admitted relationship/install evidence remain available for navigation and
portal counts. Only connectors incident to the chosen system are drawn.

Inactive internal dots are excluded before branch layout, attention traversal,
collision settling, edge masks and DOM rendering. Existing bounded admission,
filtering and public authorization still run; this is not unlimited loading or
on-open-only revalidation. Marketplace hints do not grant installation, binding,
execution or protected authority. Installed apps retain one owner-local identity.

Explicit system switching opens its dots outward from the center for 600 ms,
respecting reduced motion. Day changes and background public refresh do not
replay this animation or change the selected owner. An outside background click
clears manually revealed points and restores the focused dot's default attention,
retaining focus, filters, day/ray controls and camera. Admitted filter peaks remain
readable even when their filtered branch is disconnected from the owner anchor.
Outside drags only pan. Revoked owners fall back without retaining a latent
selection that a later discovery could reopen.

This supersedes all-expanded geometry in decisions 0163/0164, not exact graph
provenance, memory-only bounded public display refresh, revocation, scene budgets
or marketplace lifecycle. No cross-layer API, persistence, permission or execution
contract changes. Product decision 0107 records source/test scope. Unit tests
cover both bounded discovery orbits, inactive-coordinate independence, exact-owner
projection, revoked fallback and portal evidence; browser checks cover navigation,
motion, reset, filters, refresh and revocation.

Local verification passed all 922 unit/contract/infrastructure tests, type checks,
builds and bundle budgets. The complete Chromium suite passed 78 applicable
scenarios without retries, with 18 explicit live-service/paid gates skipped.
Final browser coverage also verifies that overview fitting completes animation
instead of freezing a half-open cluster, and that public-filter admission is not
mistaken for revocation. Desktop and mobile captures were reviewed.

## Development release evidence

Hosted [CI 34736882776](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34736882776)
passed on the exact release: all 922 unit/contract/infrastructure tests, type
checks, builds, bundle budgets, infrastructure synthesis and 78 applicable
Chromium scenarios without retries. Eighteen explicitly gated live-service/paid
scenarios were skipped, not claimed as executed.

Release `d1ae7bb8ff7419d6cebf8fff5a74a250fc4a83d2` was published by successful
[development deployment 34736890520](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/34736890520)
on 2026-09-13. All reset-gated and optional paid/live acceptance flags were false;
existing user data was preserved. The live API health endpoint returned `ok` and
that exact release. All eight checked HTML/CSS/JS files, including the create-user
page, matched the local build byte-for-byte (including Inspector
JS SHA-256 `1757fb166033c88ab0d4cfedbb4798534f2f5a652df4d7e50d23e69be0cb4b50`).
A read-only Chromium check of `/newentity1/` returned HTTP 200, displayed
"Create and continue", and recorded no page errors; it created no account.

## Manual acceptance

Refresh an existing development account; no Context reset or migration is needed.
Use Fit systems to see the owner circles, then open one by circle or navigator.
Only that owner's interior should be present; the owner remains centered, with
marketplace suggestions in the nearer outside orbit and named owners farther out.
Observe one finite outward opening, or immediate placement with reduced motion.
Expand a relationship/nearby detail, click empty space outside the open circle,
and confirm the focused identity and filters survive while manual expansion clears.
Panning outside must not clear expansion. Change days and allow public refreshes
without replaying the opening or selecting another owner. Saved public filter
peaks must remain readable when switching systems, and denied access must still
remove the affected public display without substituting a namesake.
