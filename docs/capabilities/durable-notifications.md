# Durable Notifications and Email Fallback

**Status:** Implemented and deployed in the development stage; cross-browser acceptance pending

Notifications are persistent interaction records, not transient alerts. The authenticated recipient's browser polls a generic inbox, renders supported records in the interaction rail, and acknowledges only records a trusted surface accepted. Acknowledgement means delivery; it does not resolve an approval request. Requests remain available across reloads until approved or denied. Informational confirmations remain until dismissed.

Protected-access notifications contain only opaque request, principal, notification, and Protected Asset references. They never contain the protected value, the requesting question, an answer, labels derived from plaintext, model content, or hidden reasoning. Approval does not send plaintext to Compute: the owner's browser unwraps the existing content key locally, creates a recipient-specific wrap for the requester's current public-key version, and submits that wrap with a version-matched `use` grant.

Every email-eligible notification enters a delayed SQS queue for one minute. If the browser has acknowledged it by then, no email is sent. Otherwise Compute claims one per-principal reminder latch and sends only: “You have request(s) pending to approve at 1var.” Further notifications do not send email while the latch is outstanding. A later browser acknowledgement clears the latch.

The account record continues to store only the email hash. Email verification also stages the normalized address as KMS ciphertext in a dedicated contact partition; the ciphertext becomes active only when the same hash is verified. Reminder processing decrypts it only inside the SES delivery boundary and observes global bounce/suppression records. SES feedback enters an encrypted SNS topic and buffered SQS worker directly, without consuming a general EventBridge rule. Existing verified accounts cannot be backfilled from a hash and must verify again before fallback email is available.

The clean v1 executable boundary is the strict communications contract in `onevar-platform/packages/contracts/src/communications.ts`; the earlier architecture schema remains historical design evidence. Future notification kinds must add a bounded payload schema; arbitrary HTML, text, URLs, and client-authored recipient publication are not accepted. Development release `aed5c4f2ac8c1f36f64972b75f5d2bbde48d97c9` deployed successfully through workflow run `33315680472` on 2026-08-30. See [decision 0115](../../decisions/0115-durable-notifications-precede-generic-email.md).

## Remaining work

- Deployed two-user approval, denial, reload, suppression, bounce, and SQS/DLQ acceptance.
- Semantic discovery of a requestable protected fact when a requester does not already hold its opaque reference.
- Device/key rotation and multi-device rewrap UX.
- Organization approval queues and push transport beyond the existing four-mode sync plane.
