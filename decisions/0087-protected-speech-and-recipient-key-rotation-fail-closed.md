# 0087 — Protected speech and recipient-key rotation fail closed

**Status:** Accepted

Protected speech may run only after the user explicitly enables it on that device with `protected speech install`, and only when the browser then proves local recognition for the exact installed language pack and accepts `processLocally: true`. Before that device-local opt-in, held protected input must not probe an advertised experimental recognition surface; it returns the safe discard receipt. Protected audio never enters the ordinary transcription endpoint. Unsupported, unavailable, downloading, timed-out, crashing, or unverifiable local processing fails closed.

Recipient-key rotation persists a new non-extractable browser key together with exact prior public-key evidence until the server conditionally replaces that key/version. Reload retries the same transition; acknowledgement removes prior evidence. Grants pinned to the former key stop matching. Rotation is not multi-device recovery and does not silently rewrap old content.
