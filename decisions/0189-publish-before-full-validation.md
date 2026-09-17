# 0189 — Pre-launch publication precedes full validation

Status: Implemented in source, 2026-09-17; first deployment pending.

At the product owner's request, development and pre-launch production use two
release stages. The pinned product commit is built, deployed and published through
CloudFront first; the full reusable CI suite runs automatically afterward against
that same commit in local fixtures. Publication status and validation status are
separate. Test failure does not undo publication automatically; it supplies evidence
for a corrective release or explicit rollback. Publication retains its stage lock,
while ongoing validation does not block the next release.

Pull-request CI and manual standalone CI remain available. Main pushes await a
release dispatch rather than launching a duplicate test suite. Optional shared
environment canaries retain their existing explicit controls and may observe a
newer deployment; exact-commit validation uses isolated fixtures. Reset-gated live
acceptance defaults off. Runtime authority and protected boundaries are unchanged.

This is a pre-launch delivery policy, not a claim that an unvalidated release is
verified. Reconsider gating at public launch. Product decision 0137 and workflows
`.github/workflows/deploy.yml` and `ci.yml` own the implementation.
