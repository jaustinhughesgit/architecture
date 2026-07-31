# Cross-Layer Flows

This document describes intended responsibility boundaries. Exact endpoint names remain implementation details in the owning repositories unless promoted to a shared contract.

## Local ContextDB interaction

```text
Message or voice input
  → browser tokenization and signature matching
  → installed local Path
  → deterministic Essence query or mutation
  → local ContextDB
  → immediate answer or graph update
```

No `aws-api`, compute Lambda, provider, or OpenAI call belongs on this path. Refresh must reload persisted facts and installed Paths before the input is evaluated.

## New local semantic operation

```text
Input misses local Paths
  → gather bounded relevant history and graph evidence
  → model proposes generalized candidates
  → isolated local validation tournament
  → execute/store the current input safely
  → install a tested Path or retain inactive evidence
  → later compatible inputs run locally
```

Path-learning conflicts should be resolved at the family/alias/transform level. They should not automatically discard a valid deterministic mutation or route an ordinary graph query into external compute.

## External compute capability

```text
Input cannot be answered by local graph semantics
  → discover an approved capability contract
  → resolve explicit utterance bindings and authorized context
  → obtain protected-asset consent or reference when required
  → build or reuse a validated entity and JPL implementation
  → install tested compute Paths
  → invoke through aws-api and compute
  → validate typed output and render the answer
```

Discovery should happen once per missing reusable capability, not once per wording. Provider protocol knowledge should live in reusable, versioned entities or public templates rather than be regenerated in every end-user entity.

## Entity and Path repair

```text
User selects an entity, data item, or previous message
  → browser gathers the selected target plus related Paths and graph evidence
  → compute diagnoses entity, Path, context binding, or combined fault
  → model proposes strict structured patches
  → schema, safety, JPL, semantic, and isolated runtime validation
  → durable background job applies an authorized revision
  → regenerate or revise linked Paths
  → replay the selected example
  → publish sanitized result and diagnostics
```

The model should receive the relevant entity/JPL, manifest, original message, Essence, ContextDB bindings, captures, linked Path family, and failure trace. ContextDB facts are not rewritten merely because entity code needs correction; data changes require explicit scope and authorization.

## Protected provider execution

### Trusted-server mode

The user deliberately permits a server-side broker to resolve and use a protected credential for an allowed provider and operation. The system enforces host, operation, owner, consent, audit, and output policies. This is encrypted and controlled, but not zero-knowledge.

### Local zero-knowledge mode

The browser asks a local companion runtime to execute an approved provider protocol. The companion decrypts the protected asset locally, performs the network request, filters or encrypts the result according to user policy, and returns only the permitted result. Platform servers never receive plaintext secrets.

The local companion is managed through the web experience; it need not expose a separate everyday UI. Sensitive approvals and terms are presented in the browser, while cryptographic use remains local.

## Background work

```text
Browser submits idempotent operation
  → API returns a durable job id
  → queue/worker continues across Lambda invocations
  → browser polls or subscribes using the job id
  → worker checkpoints model response and validation stages
  → terminal result is applied once or returned with repairable diagnostics
```

Retries must not create duplicate entities, Paths, facts, provider charges, or protected-asset actions.

## Scheduled entity execution

```text
Portal creates an entity-targeted recurrence in the user's time zone
  → compute persists the task and occurrences
  → EventBridge Scheduler wakes compute
  → worker selects the due occurrence and re-checks authority
  → normal parent/child entity execution runs once
  → result, retry, and audit state attach to the occurrence id
```

See [scheduled entity tasks](capabilities/scheduled-tasks.md).

## Account and protected-device enrollment

```text
Create account/group
  → verify email channel
  → enroll WebAuthn authenticator
  → generate device-held encryption/signing keys
  → register public material and key version
  → require a fresh assertion when protected-use policy demands it
```

The last step is an intended guarantee that is not yet complete in the current implementation. See [identity and encryption](capabilities/identity-encryption.md).

## Commanded interaction and media

An utterance becomes an Essence and Path transform; that transform may read or write ContextDB, invoke a registered command, change a menu state, enqueue an automation, schedule an entity, play sound, or begin a governed streaming session. All branches retain the same entity and authorization model. See [the interaction runtime](capabilities/interaction-runtime.md), [sound](capabilities/sound.md), and [streaming](capabilities/realtime-streaming.md).

## Entity email

Inbound or outbound email targets an entity identity, enters a channel-specific safety boundary, and then invokes ordinary entity/Path behavior. Consent, unsubscribe, suppression, rate, reputation, attachment, and retry rules are transport requirements around—not replacements for—the entity runtime. See [the email platform](capabilities/email-platform.md).
