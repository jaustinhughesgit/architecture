# 0040 — Browser-resolved Compute inputs are not providers

Status: accepted

## Context

A Compute capability can consume an ordinary input whose manifest binding hint tells the browser how to resolve it from ContextDB, the current utterance, the environment, or a declared default. The generic EntityPlan builder previously required at least one provider request and forced web research. For a capability that only presents or transforms such an input, that pressure caused the model to invent an HTTP endpoint such as `contextdb.local`. Network validation correctly rejected the private hostname, but the capability could never be built.

## Decision

An EntityPlan request list may be empty. Binding hints are browser input-resolution metadata, not server destinations. Compute must never translate `contextdb`, `utterance`, `environment`, or `default` into a provider request.

When all declared outputs can be produced from ordinary inputs or literals, the plan maps those values directly into its response. The deterministic compiler emits the response JPL action without Axios or provider hosts. Background generation may search official provider documentation when external information is actually required, but initial research is optional. A correction following provider validation must also permit removing an unnecessary request instead of forcing a replacement provider.

This does not send ContextDB to Compute during Convert authoring. Convert still carries only the spoken capability requirements. At later invocation, the browser resolves the manifest's typed input from its local graph and sends the minimum ordinary value required by the selected operation.

## Consequences

Input-only presentation and transformation entities become valid reusable Compute capabilities. ContextDB remains local-first, and no server gains graph access. External provider entities retain the existing public-HTTPS, allow-list, protected-injection, and deterministic validation gates.

## Affected repositories

- `compute`: EntityPlan schema/compiler, builder prompting, background research choice, and tests.
- `aws`: no contract change; it continues to resolve bindings locally before invocation.
- `testing`: command-prompt scenarios can prove that a changed local value changes the next invocation result without rebuilding the entity.

## Security impact

The change narrows network authority. Browser-local binding sources cannot be converted into URLs, and input-only entities contain no HTTP client module or allowed provider host.

## Verification

- Compile an EntityPlan with `requests: []` and a response sourced from a required `contextdb` input.
- Prove the resulting JPL contains only the response action, no Axios module, and no allowed hosts.
- Prove builder instructions forbid fetching browser-local binding sources and do not force initial web research.
- Preserve required-input consumption, declared-output validation, and all provider/protected-asset gates.
- Run a command-prompt lifecycle that stores a value locally, builds the input-only entity, invokes it, changes the local value, and invokes the same entity again.
