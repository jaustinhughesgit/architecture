# 0123: Journal subjects use exact local bindings and resumable clarification

**Status:** Accepted and implemented.

## Context

A Journal sentence often omits the subject because humans carry it through discourse: “I drove 10 miles today.” ContextDB may contain a generic object shell, a later named identity, several legitimate objects of the same kind, or historical duplicate shells. Re-running word matching on every fact can drift between exact entity IDs. Returning a clarification without retaining the original Journal command also causes the next answer to fall into unrelated Path or capability discovery.

## Decision

Give each local owner/Journal-app pair one exact `journal_subject_binding`, equivalent to applying `using` to the Journal subject parameter. A valid existing binding wins. Without one, the browser runtime considers only owned objects matching the package's bounded subject vocabulary, then ranks exact focused-app evidence, recent graph mutations, and strictly more-specific identities. A unique winner is frozen as the binding.

An equal exact-ID tie fails closed. The Context worker persists the original typed Journal command, original interaction ID, app version, and at most five exact candidate IDs. An ordinal, exact ID, or unique name resumes the same command and then installs the binding. A label that still matches multiple IDs produces another bounded clarification. Display-name equality never merges entities or grants authority.

Bindings, pending choices, Journal records, and parsing remain browser-local. Reset removes all four. Rebuilding the same Journal lineage retains a compatible subject binding but a changed subject kind requires a new selection.

## Alternatives rejected

- Bind by name on every request: names are neither unique nor stable authority.
- Merge same-labeled Context entities automatically: two real objects can legitimately share a name.
- Ask a question without storing the original command: the answer cannot safely resume the intended mutation.
- Use an LLM to pick the subject: unnecessary cost and no authority to choose an exact ID.

## Consequences

- A selected Journal subject does not drift as more owned objects are added.
- Generic shells lose to a clearly more-specific named identity without hard-coded domains.
- Genuine same-name ambiguity remains visible and safely selectable.
- Clarified mutations keep the original interaction ID, so retries cannot duplicate records.

## Affected repositories

- `onevar-platform`
- `architecture`

## Security impact

The binding proves only local selection among already owned ContextDB entities. It grants no new read, write, marketplace, protected-data, or server authority. Protected plaintext and remote identity data do not enter this resolver.

## Verification

Contract tests bound the binding and pending-selection envelopes. Runtime tests prove specificity, exact binding priority, same-label ambiguity, and ordinal selection. Browser regression proves duplicate vehicle shells resolve once, the record commits, the binding survives reload, and a later owned vehicle does not move the Journal.
