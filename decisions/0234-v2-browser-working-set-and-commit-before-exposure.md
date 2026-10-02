# 0234 — V2 browser working set and commit before exposure

Date: 2026-10-02. Status: Accepted; narrow M2 ordinary browser proof implemented
and verified in native Chromium. Overall frontend/persistence remain Partial.

## Context

Decision 0233 establishes headless exact local numeric behavior. The next seam
must prove actual browser storage, fresh JavaScript page reload and shared views,
without importing the old application or using a mock IndexedDB success path.
The preserved Context worker waits for transaction completion but writes an
owner record unconditionally; it is not a multi-tab concurrency precedent.

## Decision

Store only an admitted ordinary working set in a versioned IndexedDB envelope
keyed by exact trusted actor and workspace. Validate snapshots/current records
outside native transactions. In one readwrite transaction, compare current bytes
and revision with the validated prior read, then write the next storage revision.
Resolve only on transaction completion. Concurrent/stale saves fail without an
automatic rebase, corrupt-record overwrite, fallback or repeated operation.

The trusted browser host stages actions in a detached validated runtime and
exposes changes only after storage commit. Failed writes preserve exposed data;
another tab's newer save requires explicit reload. Keep storage revision separate
from immutable fact version. Exact UI retries retain their original expected
version and occurrence origin; utterance retries retain source provenance.

Inspector and Experience switch presentation over the same two occurrences of
one property. The example is explicitly created; startup never silently reseeds
corrupt/unsupported/foreign data. Generated local owner metadata is only a host
namespace, not passkey authentication or server authority. Ordinary same-origin
storage is not encrypted protected custody.

The local allowlisted preview server sends restrictive CSP. Warm actions run
offline after static modules load; models/providers are absent. Pagehide closes
the host/store, closed reads/actions deny, and persisted pageshow reloads fresh
state. No generated behavior or media lifetime contract is established here.

## Evidence and limits

Owning Node checks prove storage admission/error/closure and preview server
boundaries. Independent native Chromium acceptance proves actual IDB save/reload,
offline UI/typed/transcribed-voice parity, immutable IDs/history and exact retries;
two pages sharing one context/origin prove stale writes cannot overwrite; native
transaction abort leaves both stored and exposed state unchanged. Additional
cases prove native races, namespaces, foreign snapshot/corrupt row denial and
visible startup failure. A mobile viewport layout is inspected.

Persisted-pageshow recovery is synthetically signaled, not native BFCache proof.
Real microphones, WebAuthn, protected custody, remote grants/sync/outbox/cursors,
workers, Sunburst, media, external effects, signed releases, deployed parity and
fleet scale remain unqualified. This completes the narrow ordinary M2 scenario,
not the broader M1/M3/M5 framework. CI prepares Chromium only for gates selecting
browser acceptance; missing full integration/release evidence still fails.
