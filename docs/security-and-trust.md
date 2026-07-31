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
- Entities declare requirements by stable references and scopes.
- Consent must identify the actor, asset, provider/host, action, duration or use count, and selected trust mode.
- Provider redirects, host changes, and dynamic URLs must be revalidated against policy.
- Results may themselves be sensitive and need local encryption or redaction.
- Revocation must prevent future use without requiring the entity or Path to be deleted.
- Reset and deletion operations must cover primary records, audit retention policy, cached grants, and derived references deliberately.

## Local companion direction

**Product intent:** a background local application can hold protected personal data and provider credentials, navigate approved headless protocols, and execute provider APIs without revealing secrets to 1var servers. The browser remains the user's control and conversation surface.

The companion will need authenticated browser-to-local communication, origin binding, signed protocol packages, explicit approval UX, anti-replay controls, local audit history, safe update behavior, and a clear boundary between ordinary browser data and protected local data.

Automating account creation or terms acceptance requires explicit user approval and evidence of the terms shown. Voice confirmation can be an input mechanism; it must not weaken the consent record or allow silent acceptance.

## Authorization and visibility

Public/private determines discoverability or audience, not every permitted action. Authorization should independently govern actions such as execute, use, set, edit, delete, delegate, and permit. Parent/child execution and relationship traversal must evaluate authorization at each relevant boundary rather than inherit unlimited access accidentally.

