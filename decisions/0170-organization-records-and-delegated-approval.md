# 0170 — Organization records and delegated human approval

Date: 2026-09-14
Status: Implemented bounded simulation slice; local targeted verification; broader Inspector regression remains; deployment pending

## Decision

Extend the reusable governance primitives with a separate organization principal,
accepted account memberships, immutable field definitions and workflow-scoped
submit/review/advance permissions. Organizations do not impersonate a personal
account or inherit its graph. The creator is the initial administrator, not a
verified legal business. Administration can assign permissions but does not itself
authorize reading every record or bypass the independent approval sequence.

Use the clean-room governance repository's revisioned transaction primitive with
separate WORK keys and codecs. Current heads, immutable revision history and
actor-idempotency receipts commit with every read authority/version. Read/list
results condition authority too. Historical receipts exclude record values and
never become a new authorization. Paged pointer indexes nominate canonical records;
there is no global scan or million-person embedded member row.

An author submits a validated record, a different reviewer approves the exact
content/revision and a third operator advances it. Editing clears approval.
Current author permission, exact reviewer membership/permission revisions and all
direct approved source versions are checked again. Removed/reinvited memberships
cannot revive old permission generations. A workflow may require up to eight
approved records from one exact source definition; one source level is admitted.

This is a reusable lifecycle and validation engine, not payroll-specific code.
Attendance, timesheet, payroll draft, benefits election and generic request are
browser-side field templates. Sentence Path library data maps CLI wording to
strict intents. No code or model output supplies authority; language-data changes
do not automatically add trusted effects.

## Trust and limits

Only simulation mode is admitted. Company-private records are ordinary,
server-readable synthetic data, not zero-knowledge assets. No real employee,
bank, tax, medical or retirement data belongs in this prototype. Existing protected
keys, provider execution, billing and marketplace licenses remain independent.
No money moves, provider runs, payroll tax is calculated or real benefit election
changes. Actual integrations require reviewed provider/jurisdiction contracts and
exact approval, credential, idempotency and confirmation boundaries.

The current scope is per-workflow individual permissions. Department/row/field
policies, company key lifecycle, legal verification, administrator succession,
bulk imports, Journal ingestion and company Inspector projection remain Partial.
This is not ten-million-user proof or 95% language coverage. Existing personal
graphs and sharing demo accounts are preserved.

## Evidence

See product decision 0112, the company-workflows test guide, work-service tests,
existing governance transaction regression tests and the four-session browser
scenario. Local targeted tests cover all four employee templates, approval races,
revocation, cross-company denial, source changes and value-free retry. Deployment
and live acceptance are separate gates, not inferred from documentation.

Local full verification passed 993 core tests and build/type/budget gates. The full
browser run passed 81 and skipped 18 optional scenarios; one unrelated existing
delayed-frame Inspector dialog-position assertion failed. The new four-account
company workflow scenario passed. Full-browser and hosted CI success are not claimed.
