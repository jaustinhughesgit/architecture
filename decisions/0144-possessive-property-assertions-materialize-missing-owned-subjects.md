# 0144 — Possessive property assertions materialize missing owned subjects

Status: accepted; implemented and live-proven in development release `a0fc528ecfbbcf6316d4e5235871678d73452333`.

## Context

The clean-room learned-Path foundation required users to declare an object before attaching a property. Natural assertions such as `my [subject] has [value] [property]` already contain explicit ownership evidence, yet isolated proof failed when the subject did not exist. Treating each noun or verb as a special phrase would not scale and would make archived language patterns the source of graph authority.

An independent failure also showed that a grounded numeric dotted version was rejected by the matcher as punctuation even though captured operands are data, not grammar.

## Decision

Trusted local compilation derives one narrow materialization permission from a verified template: the operation is assertive `property.set`, the scope is owned, and the literal immediately preceding the subject capture is exactly `my`. If resolution finds no subject, the runtime stages one ordinary object plus its owner/kind relations and the requested current property, then commits them in one local revision. The model cannot emit a materialization flag, IDs or rows.

If an owned subject is ambiguous, proof clarifies without changing state. If possessive evidence is absent, the subject remains missing. Read operations, removals, comparisons and adjustments cannot create subjects. Relation endpoints and rename remain excluded until separately justified.

The matcher admits a bounded captured numeric dotted value such as a semantic version while continuing to reject sentence punctuation inside captures and punctuation-bearing structural literals. Existing archived template bytes and hashes do not change.

## Consequences

The rule generalizes across object types, attributes and values without adding domain vocabulary. One assertion can create its implied subject and fact, while publication observes one atomic revision. Read paths remain mutation-free, and typos without explicit possessive evidence cannot silently create objects.

## Verification

Tests must prove the original missing-subject count assertion, a different subject/property pair, dotted-version assignment and readback, ambiguous-subject refusal, non-possessive refusal, read-only missing-subject refusal, one-revision publication and held-out local replay with no adviser request. Live evidence must be recorded separately and may not be replaced by fixture proposals.

Development workflow [33960113350](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33960113350) deployed the exact release without resetting test state. A fresh browser test passed 1/1 in 25.3 seconds across cold house and sensor constructions plus held-out greenhouse and router reuse; held-out executions made no additional adviser requests.
