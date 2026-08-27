# 0087 — Protected speech and recipient-key rotation fail closed

**Status:** Accepted

Protected speech may run only when the browser proves local recognition for the exact installed language pack and accepts `processLocally: true`. Protected audio never enters the ordinary transcription endpoint. Unsupported, unavailable, downloading, timed-out, or unverifiable local processing fails closed.

Recipient-key rotation persists a new non-extractable browser key together with exact prior public-key evidence until the server conditionally replaces that key/version. Reload retries the same transition; acknowledgement removes prior evidence. Grants pinned to the former key stop matching. Rotation is not multi-device recovery and does not silently rewrap old content.
