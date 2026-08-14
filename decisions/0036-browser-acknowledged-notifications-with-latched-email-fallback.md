# 0036: Browser-Acknowledged Notifications with Latched Email Fallback

- Status: Accepted
- Date: 2026-08-14

## Context

Protected-access requests and their decisions must survive reloads and reach an inactive owner without emailing once per request. The account table intentionally stores only a one-way email hash, so delayed delivery cannot recover a destination from current records. Presence invitations expire quickly and acknowledgement currently deletes them, which is unsuitable for unresolved governance work.

## Decision

Use a generic authenticated notification inbox with separate delivery acknowledgement and lifecycle resolution. The browser polls, renders, then acknowledges. A pending approval stays in the inbox after acknowledgement until a decision resolves it.

Each email-eligible publication also schedules a one-minute delayed SQS message. The worker rechecks acknowledgement and global delivery suppression, then conditionally claims a per-principal email latch. It sends one generic message containing no notification or protected-data details. Further delayed messages do nothing until any later browser pickup clears the latch.

Email verification stages the normalized address as KMS ciphertext in a dedicated contact record and activates it only after the matching hash is verified. Plaintext exists only while sending through SES. Protected access approval rewraps the content key in the owner's browser; notification transport never grants use and never receives plaintext.

## Consequences

- Browser pickup suppresses email without losing unresolved work.
- Multiple pending requests produce one reminder until the user returns.
- Existing hash-only verified accounts require re-verification for fallback delivery.
- SES delivery is best-effort after a durable conditional latch; this favors duplicate suppression over claiming exactly-once external delivery.
- New notification kinds require explicit bounded schemas and trusted server producers.

## Alternatives considered

- Reusing presence invitations was rejected because their acknowledgement deletes short-lived delivery state.
- Emailing every request immediately was rejected because it leaks activity timing, creates notification storms, and ignores active browsers.
- Storing plaintext email on the user row was rejected because the existing identity contract intentionally retains only a hash.

## Affected repositories

- `compute`: durable inbox, delayed delivery, encrypted contacts, protected-access requests, decisions, grants, and reset coverage.
- `aws`: browser polling, rendering acknowledgement, request policy, owner-side rewrap, and interaction-rail controls.
- `architecture`: notification and protected-sharing contracts and trust boundaries.

## Security impact

Notification payloads contain only bounded lifecycle identifiers and opaque protected references. They never contain ciphertext plaintext, the protected question, a value, an answer, or a content key. Notification acknowledgement is not authorization. Approval requires the owner browser to use an existing local wrap, and the server receives only the requester wrap and version-bound grant. KMS encryption context binds each contact ciphertext to its principal.

## Migration

Existing verified accounts have no reversible delivery contact and therefore receive browser notifications only until they verify email again. Existing Protected Assets remain unchanged; recipient wraps and grants are added only after an approved request. Canonical test reset includes the new request, notification, and contact tables.

## Verification

- Contract tests reject unbounded or detail-bearing notification payloads.
- Lifecycle tests prove one-minute scheduling, render acknowledgement, reminder-latch clearing, generic email content, and idempotent publication.
- Protected-access tests prove owner-only decisions, local-wrap handoff, explicit version-bound grants, and retry after a committed decision.
- Browser tests prove fixed-text rendering, request-policy behavior, and acknowledgement only after rendering.
