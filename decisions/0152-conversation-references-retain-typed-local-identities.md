# Conversation references retain typed local identities

Accepted 2026-09-11.

The clean-room ordinary graph's bounded composition primitive now retains one optional device-local conversational frame containing the successful interaction ID, local graph revision, and bounded subject/object/collection ID sets. This is interaction memory, not graph truth, a published Path, an authorization grant, or server data. It persists through the ordinary worker's local state and remaps exact IDs on canonical publication acknowledgement, including concurrent local edits.

Within-sentence antecedents take precedence, followed by explicit compatible selected focus, then the last successful revision-compatible frame. Failed interpretations preserve that frame; a successful composed statement replaces it and other graph revisions invalidate it. Resolution rechecks current ownership, role compatibility and uniqueness. A scalar count may nominate its exact incoming collection but never becomes a person or possessor; a shared value cannot arbitrarily choose between owners. Gender is not inferred from names.

Noun case handling is grammatical and language-package driven, not a special condition for one relative. Explicit naming boundaries preserve even lowercase names. Identifying a unique unnamed related object preserves its entity ID and attached facts; unknown proper phrases and namesake ambiguity still require clarification.

Implementation and regression scope are in `onevar-platform/docs/decisions/0094-typed-conversational-references-and-noun-case.md`. This is a repair to the **Partial** composed-language foundation, not proof of 95% arbitrary-language success. Tests must include complete dialogues, failures, explicit and absent focus, case variants, reload, canonical remapping, topic changes and ambiguous shared values in addition to isolated sentences.
