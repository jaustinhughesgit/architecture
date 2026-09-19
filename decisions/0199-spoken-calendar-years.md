# 0199 — Spoken years reuse the shared calendar primitive

Status: Implemented bounded slice; locally verified and deployed to development in
`f6726fb0eefcc28a5826258c767bc51e5f220fc3` through [workflow 35414923608](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/35414923608).

Product decision 0147 extends shared lexical calendar syntax with complete spoken
century-pair and hundreds/thousands years and clock-on-date ordering. Source spans
remain intact. Numeric `and` is admitted only in complete typed temporal fact or
query captures; other coordination and ambiguous bindings retain existing checks.
The atomic local writer validates and anchors the same dateTime contract.

Ordinary model advice, shared definition discovery and browser-local execution
reuse the existing Path lifecycle. There is no new subsystem, domain conditional,
identity merge, transport/schema change, protected access, Compute execution or
historical migration. Runtime/API and desktop/mobile fixtures prove the bounded
behavior; general natural speech and live-model reliability remain Partial.
Product `docs/testing/spoken-calendar.md` records observed unsupported forms.
