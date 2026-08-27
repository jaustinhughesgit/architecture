# 0079: Browser-authoritative event synchronization has four cost modes

**Status:** Accepted for four-mode schedule delivery; the fixed publisher-analytics portion was removed by [decision 0080](0080-focus-exact-entities-and-evolve-arraylogic-immutably.md).

## Context

Browser ContextDB is authoritative for local Paths, exact entity/relation bindings, and local effects. Server schedules can commit while a browser is absent, and marketplace publishers need privacy-safe execution and economics evidence. Requiring `schedule results` leaves committed work undelivered. Polling every browser every minute would waste Lambda, DynamoDB, and network capacity at million-user scale. Sending graph data or protected values through push would violate local-first and zero-trust boundaries.

## Decision

One authenticated delta protocol carries pending schedule occurrences addressed to that owner. Schedule results still rejoin the exact browser installation, refresh only its already-bound relation ID, revalidate the effect, commit locally, and acknowledge separately. A notification is never a mutation and never contains user Context. Future entity-authored data delivery must define its own authorization and schema instead of being inferred from Compute completion.

Each device selects one mode:

- **light** synchronizes on load, after a completed input response, and after returning from at least ten minutes away;
- **medium** synchronizes on load, before an input request, and every five visible minutes;
- **heavy** synchronizes on load, after a completed input response, and every visible minute; and
- **real-time** keeps a short-lived-ticket WebSocket and pulls a cursor delta after a `sync_available` hint, with load/focus/reconnect catch-up.

Only one visible tab per primary entity owns the lease for intervals and WebSocket transport. Hidden tabs release leadership. A newly created schedule receives bounded due-time catch-up checks independent of the general mode. Network failure cannot block local input.

Real-time tickets are opaque, one-use, short-lived, session-authenticated capabilities. API Gateway connection rows expire and identify only recipient/transport. The WebSocket payload is a constant hint; the HTTP delta remains the authorization boundary.

Execution, credit, settlement, and provider receipts remain internal platform evidence. They are not projected into a fixed user-facing analytics entity. Analytics is built through explicit ordinary data/query capabilities and ArrayLogic composition.

## Consequences

- Users no longer request schedule delivery manually while an eligible browser is active.
- Light and medium avoid per-minute polling; heavy is explicit; WebSockets are reserved for real-time.
- Multiple tabs do not multiply periodic or socket traffic.
- Sync does not create undeclared publisher data on every invocation.
- A socket message cannot broaden authority, apply an effect, or carry plaintext.
- When every device is closed, browser-local effects wait durably for the next authorized sync.
