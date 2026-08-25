# 0069: Compile exact owner-local protected Context and govern presentation independently

**Status:** Accepted, implemented, and deployed for the clean typed browser-only Phase 4A boundary in release `a73dcd6dfe44c5038ed3270ae3ab29b666ed66e9`.

## Context

Decision 0068 encrypted typed protected spans and replaced them with exact opaque references. That prevented leakage but did not make the protected fact useful: `I have *** cats` could be stored, while `How many cats do I have?` fell through to ordinary capability discovery. Copying plaintext into ordinary ContextDB, an LLM prompt, a Path, terminal history, or a server request would violate the boundary. Addressing encrypted facts by generated names would also reintroduce the cross-binding failures eliminated by exact Compute installations.

## Decision

The clean Protected Asset worker compiles a bounded ordinary sentence shape around one exact protected reference into a versioned owner-local Context binding. The binding contains exact owner, input, operation, ordinary concept, value kind, and asset/version identity, never the value. The first vocabulary-neutral operations are owner quantity and owner self-property. Queries resolve deterministically by operation and normalized ordinary concept; ambiguous and unsupported inputs fail closed without asking an LLM to inspect protected data.

A later assertion for the same operation and concept rotates the binding and revokes grants on the replaced binding. Decryption stays inside the protected worker and is possible only for an exact owner-local presentation grant whose binding, asset/version, presentation kind, purpose, actor, and delivery scope all match.

Reveal and Speak are independent presentation authorities. A direct one-time action has one consumable use and no clock expiry. Timed choices are 15 minutes, 1 hour, 1 day, and always. Ask and Don't ask grant no use. Reveal returns one ephemeral formatted response to a separate non-terminal presentation surface and expires it after 30 seconds. Speak sends one ephemeral response directly to device speech synthesis without storing it in React state or the DOM. Neither presentation kind authorizes provider execution.

Safe audit records contain opaque IDs, versions, event kind, presentation kind, and time only. Exact revocation disables a binding and its grants. Reset deliberately removes ciphertext, reference envelopes, bindings, grants, preferences, audit events, and the device wrapping key. Prompt commands address the same transitions as the controls.

This Phase 4A contract is browser-only and owner-local. Recipient ECDH delivery is Phase 4B. Trusted-server/provider injection is Phase 4C. Neither can be enabled by changing a mode field on the local contract. Protected voice remains fail-closed until the browser can prove segmented on-device recognition with no remote fallback; experimental or server-backed Web Speech behavior is insufficient for a zero-knowledge claim.

The command/action `userActivation` field is interaction evidence, not hardware authority. A non-extractable IndexedDB key still does not defend against arbitrary same-origin code. Policies promising hardware authorization require a fresh WebAuthn assertion in a later contract.

## Consequences

- Protected facts are useful in an exact local query while plaintext remains absent from ordinary ContextDB, models, Compute, the network, terminal history, diagnostics, and durable UI state.
- Exact asset/version identity, not words, governs decryption and grant use.
- The protected grammar expands through reviewed operation schemas and deterministic compilers, not a generic decrypt command.
- Recipient and server work cannot accidentally inherit owner-local authority.
- Individual browser bundle limits increase narrowly for the measured feature; the aggregate startup ceiling does not increase.

## Verification

Strict contract and pure runtime tests cover owner/reference identity, model-free compilation/query, ambiguity, grant expiry and consumption, and prompt command parsing. Clean Chromium acceptance covers zero-network masked query, one-use Reveal, timed Reveal across reload, device-local Speak without DOM plaintext, rotation, grant invalidation, revocation, safe audit review, reset, and ordinary/Compute regressions.

Development workflow [32814141108](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32814141108) deployed the exact release and passed 17 reset-gated deployed browser scenarios in 1.2 minutes. Production workflow [32814455645](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/32814455645) promoted the same commit and passed the same 17 scenarios in 58 seconds. A separate fresh `1var.com` entity proved `I have *** cats` → masked local query → one-use Reveal while terminal lines remained masked, then reset and review proved zero protected assets, inputs, bindings, grants, and audit events.

## Affected repositories

- `onevar-platform`: contracts, protected worker, exact compiler/resolver, grants, audit, UI/command presentation, tests, and bundle budgets.
- `architecture`: Phase 4 status, security model, capability catalog, and this decision.
