# 0041 — Paths retain identity-scoped referent memory after governed resolution

Status: accepted — direct qualified-referent and minimum-question foundation implemented

## Context

A surface name is not an entity identity. “Turn on the lights at John's house” may have thousands of globally positioned John candidates, several graph-connected Johns, a recently discussed John, and a frequently intended household John. Selecting the first database row, one globally nearest embedding, or one permanent name alias would discard the connected sentence structure and eventually act on the wrong entity. Asking the user on every recurrence is also a failure to learn.

The same separation appears in “What is Austin's register status report?” The reusable behavior is the register-status-report capability. Austin is a concrete invocation referent whose authorized connected data supplies an input. Austin must not become part of the capability's identity or cause an Austin-specific compute entity to be built.

## Decision

Referent resolution is a browser-owned, identity-scoped process over complete candidate paths. It proceeds silently through the strongest available evidence before clarification:

1. local ContextDB identities and connected-path constraints;
2. resolved entity evidence from the latest 20 inputs and responses;
3. referent memory attached to the matched identity-scoped Path equation;
4. current interaction, device, location, panel, and discourse context;
5. authorized exact lookup and Position/Search candidates;
6. bounded model adjudication over only those canonical authorized candidates;
7. one minimum distinguishing question only when the remaining candidates do not safely separate or effect policy requires confirmation.

The unit being ranked is the complete role binding or connected path, not the name alone. A future device command may therefore remember `{owner, location, target, operation}` rather than only John. Structural compatibility, authorization, successful prior use, explicit correction, recency, frequency, and current context are separate evidence. Explicit correction is strong negative evidence; uncorrected repetition grows preference gradually. Effect risk sets the confidence and margin required for silent execution.

After a referent is resolved and a Path is locally proved, the identity-scoped Path may retain a bounded `referentMemory` array. Each entry identifies the semantic role, normalized spoken mention, canonical entity ID, affected input names, successful-use evidence, and correction evidence. The equation also retains the resolved ContextDB subject ID for the input it supplies. The shared Path family and compute manifest remain generic.

On a later match, the browser validates the remembered entity against current ContextDB, graph connections, lifecycle, and authority. If already present locally, no candidate Search or question is needed. An explicit named cross-user question still exact-refreshes that profile's currently authorized public component before local execution because remembered identity does not prove data freshness. The browser may present the remembered canonical ID to the server; the server must verify that the ID still denotes the exact public profile for the spoken label and return only its currently authorized audience. An invalid or stale memory falls back to ordinary candidate resolution rather than becoming authority.

For compute discovery, the browser separates the concrete invocation referent from a sanitized capability query. Position/Search receives the reusable behavior phrase, such as “register status report,” while discovery receives bounded evidence that Austin is invocation data. Position remains candidate retrieval only. Canonical entity records, graph edges, manifest contracts, and action-specific grants remain authoritative.

Path referent memory is an identity-scoped overlay. It must not enter a shared foundation Path, public capability signature, another user's installation, or semantic Position document. It contains canonical entity IDs but no protected plaintext. Connectivity and repetition never grant access.

## Current implementation boundary

The implemented foundation covers one unambiguous qualified possessive referent, including “Austin's register status report.” Exact authorized profile hydration installs the canonical entity in ContextDB; a name-property value node is not counted as a second person candidate; recent successful compute referent evidence can break a local same-name tie; the original compute equation persists its referent memory and ContextDB subject ID; and later local execution prefers that ID while revalidating the graph. Every explicit named cross-user question refreshes that profile's authorized public component, using the remembered ID for exact validation when available, so newer facts arrive without another candidate search or clarification.

Decision 0116 adds deterministic complete-path filtering, 64-shard same-name retrieval, identity-scoped browser referent memory for ordinary and protected cross-user queries, public-anchor ranking, and two-to-five-choice minimum questions. Arbitrary multi-hop Position-backed tournaments, learned frequency/decay and correction updates, generalized non-person referents, and effect-risk thresholds remain incomplete.

## Consequences

- Repeated equations become personalized without changing shared compute identity.
- Capability Search is less polluted by names that belong only to one invocation.
- A name can retain several candidate entity IDs with evidence instead of becoming one global alias.
- Local execution remains fast after the first governed resolution.
- Clarification becomes a late fallback rather than the default disambiguation mechanism.

## Affected repositories

- `aws`: qualified-referent extraction, recent-history resolution, named hydration reuse, Path compilation, persisted referent memory, and local ContextDB input resolution.
- `compute`: exact remembered-profile validation, sanitized capability-query routing, discovery instructions, and Path persistence validation.
- `architecture`: entity, Position, Path, ContextDB, compute-input, and status contracts.

## Security impact

The server receives a remembered canonical entity ID only to validate an exact public profile and reload its currently authorized public audience. It does not trust the ID as a grant. The model receives the mention and resolution class but not the canonical entity ID. Protected values remain excluded. Revocation, ambiguity, deletion, or a mismatched name invalidates reuse.

## Verification

- Prove a first request resolves a qualified Austin through authorized hydration and keeps Austin out of the reusable capability query.
- Prove the installed Path persists Austin's canonical entity ID and its affected ContextDB input in bounded referent memory.
- Prove a manifest defaulting to `speaker.RegisterStatus` resolves Austin's current value through the Path-specific subject rather than user 2's value.
- Prove a repeated request skips candidate search and clarification but refreshes Austin's current authorized public component even when his identity is already present locally.
- Prove refresh can exact-validate a remembered Austin ID without another name candidate search.
- Prove recent resolved Path evidence can break a same-name local tie but an unresolved tie fails closed.
- Prove a remembered ID cannot bypass current profile-name validation, graph authority, use grants, or Protected Asset policy.
