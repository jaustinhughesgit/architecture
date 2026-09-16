# 0187 — Selectable context for failed ordinary requests

Status: implemented bounded slice in the clean-room monorepo; not deployed.

Extend bounded ordinary review, not graph authority. Failed inputs and zero-match
queries nominate tentative owned ordinary nodes. Users can star additional nodes
and explicitly request review. Typo similarity never resolves identity; tentative
trace refs remain separate from actual response witnesses.

The existing no-retention adviser receives the failed input, failure diagnostic,
bounded pseudonymous triples/selections and recent ordinary conversation. It
proposes existing query/mutation programs, not free-form graph edits. Reads stay
read-only; writes are limited to selected existing subjects and introduced objects,
with compiler/local proof, freshness and unchanged governance. Only proved portable
definitions can be shared. Stars neither publish facts nor grant authority.

Managed, protected and peer data remain excluded. Unsupported or ambiguous intent
still clarifies. Product decision 0135 and its runtime/API/browser tests document
local evidence; this is not a 95% accuracy claim.
