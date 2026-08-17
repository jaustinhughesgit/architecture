# 0040 — Browser-resolved Compute inputs are not providers

Status: accepted

## Context

A Compute capability can consume an ordinary input whose manifest binding hint tells the browser how to resolve it from ContextDB, the current utterance, the environment, or a declared default. The generic EntityPlan builder previously required at least one provider request and forced web research. For a capability that only presents or transforms such an input, that pressure caused the model to invent an HTTP endpoint such as `contextdb.local`. Network validation correctly rejected the private hostname, but the capability could never be built.

## Decision

An EntityPlan request list may be empty. Binding hints are browser input-resolution metadata, not server destinations. Compute must never translate `contextdb`, `utterance`, `environment`, or `default` into a provider request.

When all declared outputs can be produced from ordinary inputs or literals, the plan maps those values directly into its response. The deterministic compiler emits the response JPL action without Axios or provider hosts. Background generation may search official provider documentation when external information is actually required, but initial research is optional. A correction following provider validation must also permit removing an unnecessary request instead of forcing a replacement provider.

This does not send ContextDB to Compute during Convert authoring. Convert still carries only the spoken capability requirements. At later invocation, the browser resolves the manifest's typed input from its local graph and sends the minimum ordinary value required by the selected operation.

A Path-specific qualified referent may replace a deictic manifest subject such as `speaker` for one identity-scoped equation. The Path retains the canonical entity ID and bounded referent evidence, revalidates that entity locally, and preserves the manifest property. This does not fork the shared capability or send the graph to Compute. See [decision 0041](0041-path-scoped-referent-memory.md).

Context binding addresses compare through a syntax-neutral identifier key: camelCase, snake_case, kebab-case, and spaced forms are equivalent at this boundary. This accommodates harmless formatting differences between a generated manifest and an Essence property without adding domain aliases, merging graph entities, or changing the persisted spelling.

For a direct subject/property binding with multiple observations, the browser resolves the newest matching relation as the current value. Older observations remain graph history; they do not shadow a later update during Compute invocation.

The Path's execution mode, not only the utterance's surface speech act, determines whether the result is answer-producing. A validated Compute Path may recognize a command-shaped request such as “Give me…” while retaining `mode: question`; Transcribe preserves its successful typed answer. The same rule applies to a locally validated, read-only Essence question Path reached through a command-shaped alias: its rows remain query templates and its proven result may be presented. A Path whose executed mode is `command` or `statement` still cannot inject an answer.

## Consequences

Input-only presentation and transformation entities become valid reusable Compute capabilities. ContextDB remains local-first, and no server gains graph access. External provider entities retain the existing public-HTTPS, allow-list, protected-injection, and deterministic validation gates.

## Affected repositories

- `compute`: EntityPlan schema/compiler, builder prompting, background research choice, and tests.
- `aws`: resolves bindings locally and may apply an identity-scoped, Path-proven qualified referent before invocation.
- `testing`: command-prompt scenarios can prove that a changed local value changes the next invocation result without rebuilding the entity.

## Security impact

The change narrows network authority. Browser-local binding sources cannot be converted into URLs, and input-only entities contain no HTTP client module or allowed provider host.

## Verification

- Compile an EntityPlan with `requests: []` and a response sourced from a required `contextdb` input.
- Prove the resulting JPL contains only the response action, no Axios module, and no allowed hosts.
- Prove builder instructions forbid fetching browser-local binding sources and do not force initial web research.
- Preserve required-input consumption, declared-output validation, and all provider/protected-asset gates.
- Run a command-prompt lifecycle that stores a value locally, builds the input-only entity, invokes it, changes the local value, and invokes the same entity again.
- Prove the second invocation resolves the newest matching direct-property observation rather than the first historical value.
- Prove harmless identifier formatting differences cannot make a declared ContextDB property unreachable.
- Prove a command-shaped invocation of an answer-producing Compute Path reaches browser presentation.
- Prove a command-shaped alias of a locally validated question Path queries rather than mutates ContextDB and presents only its proven result.
- Prove a Path-specific canonical referent resolves a deictic ContextDB input without changing the shared manifest or reading the caller's value instead.
