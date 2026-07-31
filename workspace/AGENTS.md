# 1var Workspace Instructions

This workspace contains several repositories that together implement one 1var platform. Do not treat `aws`, `aws-api`, or `compute` as independent products.

Before making architectural or behavioral changes, read:

1. `architecture/README.md`
2. `architecture/docs/platform-model.md`
3. `architecture/docs/engineering-principles.md`
4. The `AGENTS.md` and `docs/layer.md` belonging to every repository the change touches

## Required reasoning

- Prefer a reusable 1var primitive or a repair to a reusable primitive over a domain-specific workaround.
- Weather, addresses, inventory, and similar scenarios are test cases for the platform. They are not permission to hard-code those domains into the core.
- Consider the complete flow: user interaction, browser-local interpretation and state, Path/Essence behavior, entity composition, API transport, compute/JPL execution, persistence, permissions, protected assets, and response rendering.
- Search the capability catalog and code before proposing a new subsystem. A capability may already exist under a different name or may need to be generalized.
- Treat `map`, `extend`, `link`, `use`, and `substitute` as general composition primitives. Never reduce them to one example use.
- Preserve local-first and zero-trust boundaries. A server feature must not silently gain access to plaintext protected data.
- Do not claim an architectural capability is implemented merely because it is documented as product intent. Use the status vocabulary in `architecture/docs/capability-catalog.md`.

## Change discipline

- If a change alters a cross-layer request, response, identity, persistence, security, or lifecycle contract, update the canonical architecture documents and the affected layer documents in the same work.
- Add or update tests at the lowest layer that can prove the reusable behavior. Add cross-layer contract tests when boundaries change.
- Record consequential architectural decisions in `architecture/decisions/`.
- If implementation contradicts these documents, inspect the history and intended behavior. Correct the documentation, implementation, or both; do not conceal the mismatch.

