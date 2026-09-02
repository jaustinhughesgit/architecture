# 0128 — Ordinary relays are expiring secretary events, not chat

## Status

Accepted — development live-proven

## Decision

1var will interpret “Tell Austin that I have arrived” as a request for the system to inform one exact person. It will not create direct-message conversations, permanent peer transcripts, or a second messaging database.

The sender is authenticated and named. An authorized public profile label nominates a recipient, but the shared referent-positioning primitive must resolve and freeze one exact recipient entity ID. Safe contextual ranking or structured clarification handles same-name candidates; names never become authority. Trusted code performs a bounded first-person-to-third-person rewrite, so routine delivery does not require an LLM.

An ordinary relay is a closed durable-notification variant containing exact sender/recipient identity, one ordinary source statement, deterministic rendered text, lifecycle state, and a seven-day expiry. A sender-created exact relay ID makes retries idempotent. Persistence atomically enforces 30 relays per sender per minute. The recipient's existing real-time socket receives only a constant change hint and retrieves the relay through the authenticated sync delta. Rendering followed by acknowledgement resolves the delivery, while protected approval notifications retain their independent acknowledged/unresolved lifecycle.

Ordinary relays cannot use protected-request email fallback and carry no conversation, reply chain, participant list, broadcast, arbitrary HTML, attachment, or protected-value channel.

## Consequences

- The interaction feels like a trusted secretary without committing 1var to permanent chat storage.
- The primitive composes with four sync modes and future notification cards.
- Delivery is exact, bounded, retry-safe, expiring, and independent of models.
- Protected relays, group announcements, replies, files, and arbitrary outbound email require separate governed contracts.
