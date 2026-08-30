# Decision 0115: Durable notifications precede generic email fallback

**Status:** Accepted and implemented candidate in `onevar-platform`; deployment and two-user acceptance pending.

1var treats a notification as authenticated durable state, not as an email. A browser pulls the recipient's safe inbox through the ordinary sync plane, renders the already supported request projection, and then acknowledges the exact notification. Acknowledgement proves delivery only; it cannot approve, deny, reveal, speak, share, or execute anything.

Email is a delayed fallback over that record. An active version-consented contact may receive one fixed generic reminder after one minute only if the notification remains pending and no reminder latch exists for the owner's unresolved set. The delivery job contains owner, contact, and notification IDs, never the protected value, question, answer, label, model text, ciphertext, or key material. Opening the browser and acknowledging pending records clears the latch.

The API encrypts normalized contact material with a rotating stage KMS key but cannot decrypt it or send mail. One isolated delivery worker has decrypt and SES-send authority. A separate feedback worker has persistence authority but no decrypt authority. RFC 8058 one-click unsubscribe, authenticated owner preference, hard bounce, and complaint feedback all disable future sends idempotently.

This decision reuses lessons from the legacy double-opt-in, rate-limit, unsubscribe, configuration-set, and bounce controls without importing the legacy runtime. Arbitrary email composition, inbound email addressing, marketing campaigns, protected email content, attachment delivery, and notification-authored execution remain outside this boundary.
