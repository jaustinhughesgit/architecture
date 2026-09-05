# 0145 — Identity properties address owned objects

Status: accepted.

## Context

An owned object could retain `name` as an ordinary current property but the local resolver considered only the object's label, mention keys, and kind. A later natural fact using that recorded name therefore failed even though the exact relationship was already present in ContextDB. Copying each observed name into ad hoc sentence handlers would duplicate identity state and would not repair existing graphs.

## Decision

The browser-local owned-object resolver treats the active value of `name`, `nickname`, `alias`, or `callsign` as a bounded lexical address for that same exact object. The relation does not replace the canonical object ID or ownership edge. It grants no authority, never merges equal names, and never turns unrelated property values into aliases. Multiple equally ranked objects still require clarification.

The Path adviser contract explicitly keeps a bare named owned-object subject eligible for local proof. A declarative description, tendency, preference, habit, or ability about one subject may be represented by one grounded `property.set`. Seasonal, situational, and date phrases inside the captured value remain literal facts rather than inferred schedules or time arithmetic. Unsupported external actions, multiple effects, conditions, and missing non-possessive subjects still fail closed.

## Consequences

Existing Context graphs require no migration because resolution derives the address from the active identity relation. Replacing an identity property naturally retires its former value from current addressing while retaining ordinary observation history. Successful learned templates contain capture roles and grammar but no stored person, animal, name, habit, or other user value.

Tests cover the reported named-subject habit, an unrelated held-out object/name/description, a non-identity property value that must not address an object, and duplicate identity values that must remain ambiguous and mutation-free.
