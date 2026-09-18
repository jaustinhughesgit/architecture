# 0198 — Temporal phrase syntax participates in reusable Path binding

Status: Implemented bounded slice; locally verified, not deployed.

The clean platform shares lexical calendar syntax between semantic Path matching
and ordinary date normalization. A captured value explicitly consumed by a
temporal fact may border another variable capture if the entire utterance has
one binding. Exact proposed source spans must survive compilation. The matcher
does not read a clock or graph, split names globally, or invent timestamps;
the local atomic writer retains original request time, timezone, validation and
clarification authority. Existing package/schema identities remain unchanged.

Inferred properties on new connected entities use the existing composition
primitive without an existing-entity guard. Existing subject mutations retain
their guard; exact references, connectivity, permissions and local proof remain
mandatory. This permits separate start/end facts without domain-specific code.

Model instructions describe the same bounded primitive. Shared archive admission
and browser publication/reload use existing contracts. No endpoint, persistence,
compute/JPL, protected-data, scheduling or cross-user authority change occurs.

Product decision 0146 and `docs/testing/temporal-phrase-boundaries.md` record
runtime/API and desktop/mobile evidence, including offline warm reuse and safety
regressions. General language/model interpretation, arbitrary interval inference
and automatic repair of historical flattened values remain Partial/Unknown.
