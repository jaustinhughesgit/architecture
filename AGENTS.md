# Architecture Repository Instructions

This repository is the canonical cross-layer source for 1var. Read `README.md` and the relevant files in `docs/`, `contracts/`, and `decisions/` before changing it.

- Preserve the distinction between Implemented, Partial, Product intent, Proposed, and Unknown.
- Extend the catalog when capabilities are discovered; do not erase unknowns or compress general primitives into their current examples.
- Keep provider- or domain-specific details out of the core model unless they demonstrate a general contract.
- Cross-check architectural claims against implementation repositories and tests.
- Put stable mechanical semantics in specifications, machine boundaries in contracts, and durable choices in decision records.
- Update affected repository layer guides when ownership or boundaries change.
- Never reduce entities to compute capabilities. Include hard-data, structural, executable, and interaction entities plus their local/server publication lifecycle.
- Do not classify mindsets, thoughts, or moods as architectural legacy merely because an implementation is old.
- Keep recipient-specific zero-trust key wrapping distinct from trusted-server executor wrapping, and verify both cryptographic and authorization halves of sharing.
