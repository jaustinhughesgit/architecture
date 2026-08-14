# Durable Notifications and Email Fallback

**Status:** Implemented foundation; deployment and cross-browser acceptance pending

Notifications are persistent interaction records, not transient alerts. The authenticated recipient's browser polls a generic inbox, renders supported records in the interaction rail, and acknowledges only records a trusted surface accepted. Acknowledgement means delivery; it does not resolve an approval request. Requests remain available across reloads until approved or denied. Informational confirmations remain until dismissed.

Protected-access notifications contain only opaque request, principal, notification, and Protected Asset references. They never contain the protected value, the requesting question, an answer, labels derived from plaintext, model content, or hidden reasoning. Approval does not send plaintext to Compute: the owner's browser unwraps the existing content key locally, creates a recipient-specific wrap for the requester's current public-key version, and submits that wrap with a version-matched `use` grant.

Every email-eligible notification enters a delayed SQS queue for one minute. If the browser has acknowledged it by then, no email is sent. Otherwise Compute claims one per-principal reminder latch and sends only: “You have request(s) pending to approve at 1var.” Further notifications do not send email while the latch is outstanding. A later browser acknowledgement clears the latch.

The account record continues to store only the email hash. Email verification also stages the normalized address as KMS ciphertext in a dedicated contact table; the ciphertext becomes active only when the same hash is verified. Reminder processing decrypts it only inside the SES delivery boundary and observes global bounce/suppression records. Existing verified accounts cannot be backfilled from a hash and must verify again before fallback email is available.

The v1 executable boundary is [notification lifecycle](../../contracts/notification-lifecycle.v1.schema.json). Future notification kinds must add a bounded payload schema; arbitrary HTML, text, URLs, and client-authored recipient publication are not accepted.

## Remaining work

- Deployed two-user approval, denial, reload, suppression, bounce, and SQS/DLQ acceptance.
- Semantic discovery of a requestable protected fact when a requester does not already hold its opaque reference.
- Device/key rotation and multi-device rewrap UX.
- Rate limits, abuse reporting, organization approval queues, and push transport beyond polling.
