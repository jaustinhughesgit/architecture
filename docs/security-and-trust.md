# Security and Trust

## Trust modes

1var should make the trust mode visible for every protected operation.

### Local zero-knowledge

- Secrets are encrypted and decrypted on a user-controlled device.
- Provider requests that require plaintext secrets execute on that device.
- The server receives only opaque references, encrypted material, or policy-filtered results.
- Platform operators cannot technically retrieve or repurpose plaintext credentials.

### Trusted server

- The user explicitly authorizes server-side use for a defined provider, operation, and policy.
- Secrets are encrypted at rest and revealed only inside the controlled execution boundary.
- Access is authenticated, authorized, narrowly scoped, rate-limited, and audited.
- The product must not call this zero-knowledge because server code can technically access plaintext during use.

### Public/non-secret

- No protected asset is involved, but identity, permission, abuse, and data-integrity controls may still apply.

## Protected-asset invariants

- Never include plaintext protected values in model prompts, logs, diagnostics, Paths, entity source, URLs, ordinary ContextDB, analytics, or job records.
- A partially protected utterance has separate local semantic, masked display, and reference-bearing stored forms. The semantic form remains transient and browser-local through capture, Message handoff, and worker execution. If complete-sentence typed Path context corrects an isolated protected transcript, the browser may rotate only that browser-local protected-speech asset before graph execution; the reference remains stable and the server receives only replacement ciphertext bound to the next version. Remote classification, repair, learning, compute discovery, and server publication consume only masked or reference-bearing forms.
- Entities declare requirements by stable references and scopes.
- Protected provider fields store canonical `query`, `header`, or `body` injection locations; bounded generator wording aliases may normalize to those values but cannot add a destination or reveal a value.
- Model-generated requirement, provider, and field labels may be normalized into canonical non-secret identifiers only when every exact declarative protected placeholder is rewritten by the same mapping before validation. Persisted contracts remain strict.
- A missing duplicate field declaration may be recovered only from an exact protected placeholder already located at a literal declarative request parameter. This synchronizes non-secret metadata; it never supplies plaintext or expands the provider destination.
- A revision with exactly one incomplete requirement may also move exactly one undeclared provider request placeholder into that protected namespace. Multiple requirements or undeclared fields remain ambiguous and fail closed.
- If the placeholder was also emitted as an ordinary input, migration is allowed only when one input is uniquely credential-like from the requirement and input metadata; the ordinary input and example value are then removed. Competing candidates fail closed.
- Missing provider identity metadata may be derived only from the one literal request host that contains the exact protected placeholder. Multiple destinations fail closed, and the protected value is never inspected.
- Consent must identify the actor, asset, provider/host, action, duration or use count, and selected trust mode.
- A direct one-click protected-use approval is a one-use grant, not an unbounded approval and not a timed grant: it stores one remaining use with no clock expiration, and the first successful authorized retrieval or use consumes it. Timed owner choices are 15 minutes, 1 hour, 1 day, and forever. Ask and Don't ask grant no authority; they only control whether the matching approval surface is offered.
- An active device-local Speak or Reveal duration is standing presentation consent for matching protected answers until expiry, including after a page reload on that device. Message applies it automatically and hides the corresponding one-time button; after expiry, presentation again requires a new duration or a direct one-time action.
- Ask and Don't ask are both non-authorizing states. Ask may open Message and speak only the fixed approval notice; Don't ask suppresses the notice. Neither exposes protected plaintext.
- Every asset declares `plaintextRetention: never` and one explicit use policy: browser-only local zero-knowledge, trusted-server use with approval each time, or preapproved trusted-server use. Browser-only envelopes must not contain an executor wrap; trusted provider-use envelopes must contain one.
- Provider redirects, host changes, and dynamic URLs must be revalidated against policy.
- Results may themselves be sensitive and need local encryption or redaction.
- One interaction may contain several ordinary and protected spans. The browser preserves one semantic purpose and exact segment order; each protected span keeps separate transient semantic, masked display, and opaque reference-bearing forms. Same-purpose slider or command changes may start a new trust span, but cannot silently turn an Essence into Convert or vice versa. See [decision 0067](../decisions/0067-latched-segmented-input-composer.md).
- The clean browser-only typed-sealing foundation encrypts each protected span with an independent AES-256-GCM content key, authenticates the exact owner/asset/version reference as additional data, and wraps the content key under a non-extractable identity-scoped AES-256-KW key in a dedicated worker-owned database. References contain no plaintext hash or label. This protects the server, network, ordinary pipeline, and raw durable records from plaintext; it does not make arbitrary same-origin code unable to request key use and is not a WebAuthn assertion. See [decision 0068](../decisions/0068-browser-only-protected-span-sealing.md).
- The clean owner-local Context layer binds only an ordinary operation/concept to one exact protected asset/version. Queries resolve without decryption; the worker decrypts only after an exact owner/actor/binding/asset/version/purpose/presentation grant matches. A later assertion rotates the binding and revokes old grants. Reveal and Speak return only ephemeral formatted responses, never durable terminal or review content. See [decision 0069](../decisions/0069-exact-owner-local-protected-context-and-presentation.md).
- The clean recipient-sharing layer publishes only a safe owner/operation/concept/binding/version descriptor and a versioned ECDH public key. Owner approval rewraps the content key locally for the requester's exact key version; the server stores opaque ciphertext and the recipient wrap, evaluates an exact one-use or timed grant, and never receives plaintext, a content key, or a private key. Recipient decryption and transient presentation stay in the protected worker. Public ordinary Context enables exact profile discovery only and grants no protected use. See [decision 0070](../decisions/0070-clean-recipient-specific-zero-knowledge-sharing.md).
- The clean owner-local protected Compute layer admits only compiler-declared requirements that are consumed by a bounded formula. The first installation reconciles safe selector metadata to one exact protected binding; repeat runs use saved binding/asset IDs and program hash. Before decryption, the worker verifies a WebAuthn assertion and creates once/timed authority for the exact installation, capability/version, operation, requirements, protected bindings, program, and purpose. Binding rotation requires new authority. Only the protected worker decrypts, injects typed values, executes JPL, and formats a transient answer. Ordinary traces retain a value-free receipt; the server rejects the local execution plane. See [decisions 0071](../decisions/0071-minimized-owner-local-protected-compute.md) and [0072](../decisions/0072-hardware-gated-owner-local-protected-compute.md).
- The trusted provider-use layer promotes an exact browser-only binding into a separate trusted-server ciphertext plus a per-asset content-key wrap for one versioned executor key. A server-verified WebAuthn grant binds the owner, actor policy, asset/binding versions, executor key, capability/version/operation, protected requirement, compiler-owned program hash, reviewed adapter, exact destination/disclosure, and use duration. The browser-facing API can retrieve the public key and invoke the executor but cannot decrypt. The isolated executor can decrypt but cannot read DynamoDB or Secrets Manager; it accepts no dynamic destination or code. Its receipt and ordinary projection contain no credential or provider response beyond an explicitly reviewed sanitized field. See [decision 0075](../decisions/0075-protected-app-credentials-use-executor-wraps.md).
- An available protected asset is not implicit input authority. It may be selected only by an exact declared requirement and matching grant. The compiler rejects unused protected requirements, so an irrelevant protected value is not decrypted “just in case.”
- Provider-use authority and presentation authority are independent. Device-local Speak/Reveal durations do not authorize server use, and server-use policy does not authorize display or speech.
- Revocation must prevent future use without requiring the entity or Path to be deleted.
- Reset and deletion operations must cover primary records, audit retention policy, cached grants, and derived references deliberately.

Changing the use policy is a browser cryptographic rotation: the browser retrieves the authorized recipient envelope, decrypts locally, creates a new envelope bound to the new policy, and sends ciphertext plus metadata back. Removing protection likewise decrypts locally before deleting the server record. Neither operation sends plaintext to Compute. Version-bound recipient grants require rewrap after rotation.

Speak and Reveal presentation windows are stored locally as asset reference, choice, expiry, and remaining-use count. Enabling a window begins with direct user activation and successful local envelope decryption; changing the dropdown restarts the timer. During an unexpired window, a later matching answer—including one produced after page reload—may retrieve and decrypt that same envelope without another activation solely for the selected local presentation kind. The window does not authorize policy changes, sharing, provider execution, server plaintext use, or a different presentation kind. A protected reference in an input statement does not imply that the statement produced a protected answer, so it cannot open approval UI or queue the spoken approval notice. ContextDB query provenance propagates protection to direct and derived answers, which are masked until Message verifies the local setting and requests one ephemeral presentation from the worker. If hydration contains only a protected placeholder, approved plaintext may cross the browser's Message-to-Transcribe worker boundary for one isolated query against a cloned graph; it must not enter ContextDB, history, diagnostics, or persistent worker state. Protected speech uses browser-local synthesis. This is device-key possession plus prior user activation, not yet a verified WebAuthn assertion.

The Phase 4A slice originally stopped at exact owner-local presentation. Phase 4B added recipient-specific zero-knowledge sharing, Phase 4C added hardware-gated owner-local protected calculation, and Phase 4D adds the distinct trusted-server provider-use contract above. None of these grants can substitute for another trust mode.

Starting microphone capture cancels Automation speech, pending or active TTS playback, and browser-local synthesis before recording begins, preventing platform greetings or approval prompts from being re-ingested as user speech.

Ordinary and protected speech are separate trust paths. A voice-originated proven ordinary response may send only its bounded ordinary response text and exact interaction ID to the configured speech provider; returned audio is transient and is not persisted by 1var. If that provider fails, the browser may synthesize the same ordinary text locally. Protected plaintext can never enter that request because the server request schema has no privacy selector or protected variant. An authorized protected presentation decrypts and synthesizes only inside the owner's or recipient's browser. Typed ordinary requests do not speak automatically.

## Recipient-specific sharing

Zero-trust sharing requires both a cryptographic recipient wrap and an authorization grant. The creator's device may encrypt the payload once and create an independent ECDH/HKDF wrap for each recipient's public-key version. Salts and ephemeral public keys may be stored with ciphertext; recipient private keys and plaintext may not.

- Recipients may retrieve envelopes, but do not automatically receive owner powers such as edit, rotate, delete, delegate, or view the owner's full audit trail.
- Adding an executor/KMS wrap makes server decryption technically possible and must be labeled trusted-server mode.
- Removing a recipient cannot revoke ciphertext they already downloaded; future confidentiality requires a new content key and version.
- Organization membership is resolved to explicit recipient/device grants and key versions rather than treated as a decryption key itself.
- A protected-access request grants nothing. Approval becomes effective only when the owner's browser creates a recipient-specific content-key wrap and Compute atomically installs the matching versioned `use` grant.
- Owner approval selects one use, 15 minutes, 1 hour, 1 day, or forever. Compute enforces expiry and one-use consumption before returning a recipient envelope; the requester checks an active grant before creating another request.
- An approved recipient question decrypts only on the recipient device and replays through the retained installed Path against a temporary graph. The proven plaintext response may be spoken locally for that requested use but cannot enter ContextDB, notifications, history, diagnostics, or server persistence.
- Notification records and email may contain only opaque lifecycle identifiers and fixed presentation. Protected values, questions, answers, semantic labels, and model content are forbidden. Browser acknowledgement suppresses fallback delivery but does not resolve a pending approval.
- Verified notification email contacts are separate KMS ciphertext records activated by the matching email hash. Plaintext may exist only inside the bounded SES send operation and may not enter logs or notification records.

See [recipient-specific zero-trust sharing](capabilities/recipient-protected-sharing.md).

## Local companion direction

**Product intent:** a background local application can hold protected personal data and provider credentials, navigate approved headless protocols, and execute provider APIs without revealing secrets to 1var servers. The browser remains the user's control and conversation surface.

The companion will need authenticated browser-to-local communication, origin binding, signed protocol packages, explicit approval UX, anti-replay controls, local audit history, safe update behavior, and a clear boundary between ordinary browser data and protected local data.

Automating account creation or terms acceptance requires explicit user approval and evidence of the terms shown. Voice confirmation can be an input mechanism; it must not weaken the consent record or allow silent acceptance.

## Trusted provider executor

App credentials such as a user's weather-provider key are Protected Assets. They are not core 1var platform secrets and must not be stored as per-user AWS Secrets Manager records. The clean executor uses one asymmetric KMS key per stage or execution cell and millions of ordinary ciphertext/material records. AWS Secrets Manager remains reserved for 1var-operated secrets such as OpenAI and Stripe.

Trusted-server execution is an explicit alternative to local zero-knowledge execution. The isolated executor necessarily observes the credential briefly, so the UI and receipts must identify that trust mode honestly. One-use authority is consumed before decryption and fails closed on executor failure. Real provider adapters that can produce non-idempotent effects require a reviewed idempotency or reservation/commit protocol before admission.

Provider credential requests must also identify the issuer honestly. Catalog-owned safe metadata supplies the provider display name, canonical domain, credential kind, environment, scope, local entry label, and optional HTTPS help URL. These fields help a person choose among credentials but do not choose a network destination or grant access. Execution still follows the exact reviewed adapter, operation, protected requirement, binding, asset version, and grant.

## Device and runtime distinctions

- Creating a WebAuthn credential enrolls an authenticator; it grants nothing. Owner-local protected Compute now verifies a fresh assertion before creating exact once/timed authority. Other protected operation classes are hardware-authorized only after their own policy performs an equivalent exact assertion check.
- A non-exportable IndexedDB `CryptoKey` reduces accidental extraction but does not prove that application code cannot request its use.
- Dynamic local entity or user-authored script source runs in `fileWorker`, never on the browser main thread. Worker output is untrusted until a main-thread module validates and authorizes it.
- `fileWorker` separates entity work from the main UI thread, but a same-origin Web Worker with dynamic compilation and ambient network authority is not a malicious-code sandbox.
- WebRTC encrypts transport between peers; application-level end-to-end encryption and recording policy are separate guarantees.
- Email reputation and consent controls require both code and verified SES/domain deployment state.

See [identity and encryption](capabilities/identity-encryption.md), [worker isolation](capabilities/worker-isolation.md), [streaming](capabilities/realtime-streaming.md), and [email](capabilities/email-platform.md).

## Authorization and visibility

Public/private determines discoverability or audience, not every permitted action. Authorization independently governs actions such as use, set, edit, delete, delegate, and govern. Returning a value and invoking logic are both `use`; `execute` is retained only as a legacy request alias. Parent/child use and relationship traversal must evaluate authorization at each relevant boundary rather than inherit unlimited access accidentally.

A Word, alias, normalized form, or lemma is only a lexical address. Resolving it to entity candidates grants no visibility or action authority. Candidate retrieval must apply the entity, relationship, version, workspace, owner, and action-specific policy before returning or aggregating data. Protected plaintext must not become globally discoverable lexical material without explicit publication authority.

Ordinary Context graph publication uses participant-scoped visibility. The browser supplies only proper-person voice references grounded in the executed Path's semantic bindings, and Compute derives the audience from the authenticated publisher plus exact unique public user identities resolved from those labels; a client-supplied recipient ID is not authority. Hydration can read only the authenticated principal's audience partition, and workspace ownership is rechecked for both publish and hydrate. Protected plaintext, aliases, and derived values are excluded. A partially protected fact may publish its ordinary relation skeleton plus a generic protected-value marker carrying an opaque asset reference, but only after Compute verifies that the authenticated publisher owns the active referenced asset. The marker grants no use or reveal authority; it only lets an authorized graph reader request access through the separate protected-asset workflow. Server records retain publisher and source provenance so later trust and moderation policy can distinguish another user's assertion from the participant's own statement.
