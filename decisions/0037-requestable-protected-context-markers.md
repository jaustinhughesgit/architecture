# 0037: Publish requestable protected Context markers without plaintext

**Status:** Accepted

## Context

A partially protected statement such as `I have *** dogs` can be interpreted locally because the owner's browser temporarily knows the protected value. The prior publication filter removed both the protected value node and every new relation touching it. Another user could hydrate Austin's dog observation, but no value edge or protected-asset reference remained. The existing quantity Path therefore looked broken and the Request owner workflow had no reference to submit.

Publishing plaintext, a plaintext alias, ciphertext as a graph value, or a client-asserted owner would violate the protected-asset boundary. Requiring the requester to obtain an unknown opaque reference out of band would make semantic access requests impossible.

## Decision

- The owner browser keeps its full semantic graph locally and masks presentation as before.
- For server publication, each protected value node becomes a generic `protected_asset` placeholder carrying only its opaque `protected_asset:pa_*` reference. Plaintext lemmas, names, mention keys, and derived values are removed.
- Relations to the placeholder remain in the ordinary participant/public-self graph. This publishes that a requestable value occupies a semantic role, not the value itself.
- Compute validates every published reference against the active Protected Asset record and accepts it only when `ownerId` matches the authenticated publisher. A forged, revoked, deleted, or missing reference fails closed.
- Canonical entity records, the Context sidecar, and hydration preserve the opaque reference. The browser stores hydrated references separately from graph lexemes.
- A local question tournament may select the one Path whose complete non-derived relation prefix reaches a protected marker. It returns `PROTECTED_ASSET_ACCESS_REQUIRED`, emits the existing `protected-access:needed` event, and does not invoke Path repair, interpretation, or Compute discovery.
- The existing protected request, owner notification, local key rewrap, versioned recipient `use` grant, and recipient-wrap retrieval remain the authority path. The marker itself grants nothing.

## Consequences

Users can discover and request access to a protected fact through ordinary voice and existing Path/Essence structure. The server learns the surrounding ordinary semantic structure and that one role is protected; users who need the entire sentence hidden must protect the entire sentence rather than only one segment. Post-approval automatic replay and presentation remain separate lifecycle work.

## Alternatives considered

- Removing the value edge preserves secrecy but makes the existing semantic Path indistinguishable from missing or corrupt data.
- Publishing ciphertext as the value would mix storage and semantic identity, expose unstable encrypted material to indexing, and still provide no request authority.
- Asking an LLM to infer the missing value or owner would violate local proof and protected-data boundaries.
- Requiring out-of-band reference exchange would preserve secrecy but fail the voice-first discovery goal.

## Affected repositories

- `aws`: protected publication view, reference hydration, local Path access-boundary selection, and Request owner routing.
- `compute`: owner validation, canonical/sidecar persistence, and hydration of opaque references.
- `architecture`: protected sharing, Context publication, and trust-boundary documentation.

## Security impact

The server and authorized graph readers learn that a protected value occupies a particular ordinary relation and receive a high-entropy opaque reference. They do not receive plaintext, aliases, recipient wraps, or use authority. Compute performs an active owner check before accepting the reference, and every later request/read still passes Protected Asset grant and version checks.

## Migration

Previously published partially protected facts lack their protected value relation and reference. They remain safe but not requestable. Re-speaking or otherwise committing the fact under the new browser revision publishes the marker through the ordinary idempotent path. No historical ciphertext is copied into Context records.

## Verification

- Browser tests prove publication contains the generic marker and relation but no protected alias.
- Publication/hydration tests prove the opaque reference survives ID and named-user boundaries.
- Compute tests accept an active owner reference, return it through named hydration, and reject another owner's reference.
- The full two-browser flow remains a deployment acceptance test: owner publishes a partially protected quantity and name; requester asks the named question; Request owner appears; approval installs the recipient wrap and grant.
