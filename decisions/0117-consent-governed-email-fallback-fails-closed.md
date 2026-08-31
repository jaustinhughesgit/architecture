# Decision 0117: Consent-governed email fallback fails closed

**Status:** Accepted, implemented, and development-verified.

Email remains a delayed fallback for authenticated durable notification state. It is not an authority-bearing notification channel. An exact contact must be separately verified, active, consented, and enabled. The delayed delivery transaction condition-checks that contact while claiming one reminder for the owner's unresolved set. The isolated worker decrypts the address only after that claim succeeds and a final exact-contact eligibility read. Preference changes, unsubscribe, bounce, complaint, acknowledgement, resolution, retry, and stale-contact replacement therefore fail closed before contact material is disclosed.

Verification applies two distinct bounded controls: at most five verification sends per account in 24 hours and at most five incorrect guesses per 15-minute code. Guess counters update conditionally on the exact pending contact. A locked code cannot activate later, including when its correct value is subsequently supplied.

SES feedback may use direct configuration-set records or SNS-wrapped notification records. The feedback worker normalizes both `eventType` and `notificationType`, requires exact owner and contact tags, records one idempotent event, and suppresses the exact contact for bounce or complaint. It has persistence authority but no contact-decryption or sending authority. RFC 8058 one-click unsubscribe and authenticated owner unsubscribe converge on the same disabled contact state.

Reminder content stays fixed and value-free. Protected values, questions, answers, labels derived from plaintext, arbitrary user content, and executable instructions cannot enter email.

This decision extends [decision 0115](0115-durable-notifications-precede-generic-email.md) without changing its channel hierarchy.
