# 0022: Hydrate public self-context by exact profile name

**Status:** Accepted

## Context

Participant-scoped publication lets a user hydrate facts in which the server resolved that user as a participant, but it cannot answer a third-party question such as `How many cats does Austin have?` when Austin first said `I have three cats`. The quantity fact is connected to Austin's current-speaker node, while another browser knows only the spoken public name. A label cannot become an identity without a server-owned exact resolution step, and a remote user's `speaker` label must not be imported as the requesting browser's current speaker.

The phrase `My name is Austin` also exposed a reusable language gap. A failed model-selected classification did not create a local relationship, so there was no executed graph evidence from which the server could authorize a profile alias.

## Decision

- Pattern Schema v4 includes a vocabulary-neutral composed self-property statement: `my <property> <copula> <value>`. It compiles through `contextdb.entity-property`; the name example is one use, not a runtime sentence branch.
- A public workspace may register its current principal's exact public profile name only from an executed graph relation whose subject resolves to the authenticated current speaker and whose predicate is the identity profile property `name`, `display name`, or `full name`. Raw transcript text and client-supplied principal IDs have no profile authority.
- Ordinary, non-protected relation components connected to the authenticated current-speaker node also receive a server-owned `public:<principal>` audience when the publishing workspace is public. Unrelated components remain publisher/participant scoped.
- A signed-in browser may request named hydration with an exact proper-person label. Compute verifies the requester's workspace, resolves exactly one public profile, chooses the target public audience server-side, and returns only that audience's graph page. Zero or multiple matches return no graph.
- Before a non-protected question runs its local Path tournament, Transcribe extracts bounded proper-person labels from local tokens and attempts named hydration. Failure to hydrate does not bypass local proof or give the server authority to answer.
- The browser installs the resolved target's public display name on its stable node, while stripping remote current-speaker aliases. Only the authenticated requesting principal maps to local `speaker`.
- Publication remains asynchronous. Profile registration and named question hydration require no manual sync control.

## Alternatives considered

- Loading every publisher graph into every browser would violate authorization and scale poorly.
- Treating `Austin` as a global entity ID would conflate duplicate names and let labels grant access.
- Sending the question to the LLM with the server graph would move hard-data retrieval and answer authority out of the local Path/Essence runtime.
- Publishing every component authored by a public-workspace user would expose unrelated participant facts under that user's public profile.

## Consequences

One browser can publish self-context, assert its public profile name, and another authenticated browser can hydrate that exact public profile before answering with an existing local Path. Duplicate names fail closed. The public audience is explicit and server-derived, but richer delegated grants, profile disambiguation, and user-facing publication policy controls remain future work.

## Affected repositories

- `aws`: composed self-property Path, proper-person question extraction, named hydration, cache revision, and local query proof.
- `aws-api`: opaque transport of the named hydration action under the existing authenticated proxy contract.
- `compute`: graph-grounded profile registration, public self-component audiences, exact-name resolution, and named hydration.
- `architecture`: public-profile trust boundary and cross-layer flow.

## Security impact

Protected inputs and protected-marker nodes remain excluded. The client supplies only a name label, never a target principal or audience. Compute derives the target from an exact unique public profile and returns only a public-workspace audience. Remote speaker aliases are removed before local installation, preventing identity confusion.

## Migration

New self-connected mutations in public workspaces receive the public audience automatically. Existing participant-only records remain participant-only until a later committed mutation republishes that component; the system does not silently broaden historical visibility. Existing workspace-derived public handles continue to resolve, while a graph-declared profile name takes precedence and survives later hydration.

## Verification

- Compute tests publish `I have three cats`, publish `My name is Austin`, hydrate Austin from a second authenticated workspace, and verify exact profile resolution plus public graph rows.
- Browser tests extract Austin only from proper-person syntax, prevent the remote user from becoming local `speaker`, call the exact-name action, and run the existing quantity Essence query over the hydrated graph to reproduce `3`.
- Ambiguous names, unrelated components, workspace ownership, idempotency, and protected-input exclusion retain contract coverage.
