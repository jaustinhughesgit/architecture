# 0076: Separate protected provider results, external effect proof, and test-credit settlement

**Status:** Accepted; implemented in `onevar-platform` Phase 4E.2 through 4E.4 and awaiting immutable deployment evidence.

## Context

A provider response can contain private data, claim an external write, and incur cost. Those are three independent concerns. Returning “appointment booked” does not prove that a provider committed one appointment, and neither response prose nor a provider call proves the correct user/publisher/platform settlement. Retrying an uncertain write under a new identity can duplicate the effect or charge.

## Decision

Provider result delivery, provider effect proof, and economic settlement use separate strict records.

A reviewed operation declares ordinary sanitized output or trusted ephemeral output. For trusted ephemeral output, the invoking browser contributes one exact active ECDH recipient key. The isolated protected executor encrypts the typed Compute result and rendered response inside the executor using ephemeral P-256 ECDH, HKDF-SHA-256, and AES-256-GCM. The API may persist the addressed ciphertext for exact replay, but receives no ordinary result or response text. Only the addressed protected worker decrypts and presents the value transiently.

A provider write declares an exact effect type, uses the Compute invocation ID as its provider idempotency key, permits cancellation only before execution begins, and supports exact-key recovery. The durable provider-operation record moves through `awaiting_authorization`, `executing`, `recovery_required`, and one terminal state. A write cannot commit without one adapter-owned provider-effect proof matching the declared type and idempotency key. Response prose is never effect evidence. An uncertain completion remains recoverable; a definitive no-effect result may fail and refund safely.

Phase 4E economics use non-cash `onevar_test_credit` micros. A reviewed operation freezes user price, provider cost, publisher earning, and platform revenue; the user price must equal the other three. Reservation is atomic with creation of the exact provider operation. Commit atomically saves delivery, effect proof, executor receipts, settlement, and credit deltas. Pre-execution cancellation and definitive no-effect failure release the full reservation. Exact replay cannot reserve, spend, earn, refund, or apply an effect twice.

The first write and paid operations are no-network conformance fixtures. A real network write, variable-price provider, or monetary payment requires a new reviewed adapter/protocol. Stripe purchase, cash earnings, publisher payouts, tax, disputes, and real financial ledgers remain Phase 5.

## Consequences

- The API may store protected-result ciphertext, but not protected-result plaintext.
- A browser key/entity/version mismatch fails locally without a weaker delivery fallback.
- One-use provider authority may be reused only for recovery of the same invocation/grant-use identity.
- Cancellation after execution may have begun is rejected; compensation requires a separate reviewed provider operation.
- Every terminal operation has one settlement receipt even when the charge is zero or fully refunded.
- Provider, publisher, and platform economics are inspectable separately without treating Phase 4 test credits as money.
- Millions of operations remain exact-key DynamoDB records; no RAG, asset scan, per-user KMS key, or per-user Secrets Manager entry is introduced.

## Verification

Strict contract tests reject mixed plaintext/ciphertext delivery, write commit without effect proof, unbalanced economics, and unbalanced accounts. Executor tests prove addressed encryption, deterministic exact retry effect identity, fixed provider cost, and definitive no-effect evidence. Repository/API tests prove pre-execution release, recovery with the same idempotency key, exactly-once settlement, full refund, and conserved test-credit balances. Browser acceptance proves transient decryption, ciphertext-only API responses, exact effect/status inspection, replay, economics separation, refund, and review without credential leakage.

