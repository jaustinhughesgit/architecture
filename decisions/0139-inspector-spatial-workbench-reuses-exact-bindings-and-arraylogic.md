# 0139: Inspector spatial workbench reuses exact bindings and ArrayLogic

Status: Accepted

## Decision

Inspector V2 translates spatial arrangement into explicit authoring proposals. A data-to-app drop proposes an existing Entity Use Binding; an app-to-app drop proposes a separate sequential ArrayLogic composition. Proximity, color, names and opening a surface never execute or confer authority. Apply binding, Create composition and Run are separate actions with keyboard/touch alternatives.

Strict browser-worker intents pin app release and, for binding, installation/dependency/subject/relation identity and current versions. The compute layer validates ownership and semantic compatibility and reuses existing persistent installation, binding, app and workflow contracts. It cannot mint missing marketplace authority. Compositions clone the caller's exact bindings and preserve licensed attribution without copying publisher data or mutating original apps. Non-dependency outputs connect only by declared name/type; remaining inputs are explicit per-step fields.

Zoom exposes progressively richer local presentation: dot, label, summary and an opened mobile-sized live surface. Owned facts come from ContextDB and peer facts only from the authorized discovery slice. Ordinary app surfaces contain declared inputs, exact bound data and latest workflow status/results. Run uses the normal coordinator, billing, effect commit, audio and failure lifecycle through an exact workflow ID. No generated renderer code, new server execution plane or persistent coordinate model is introduced.

## Scope and proof

The implemented slice handles two plain ordinary apps and owner-local ordinary data. Protected/provider operations use their existing dedicated authorization surface. Nested visual composition, peer-authorized spatial writes, visual edge editing, custom generated renderers and specialized surfaces for every entity class remain future work. V1, Sunburst, input/feed and the persistent conference dock remain independent. Scene edges continue to mean proven Context relations; spatial affinity cannot fabricate one.

Pure tests cover exact/versioned selection, no-op reads, stale/unowned/revoked rejection, typed input validation, repeated-run definition reuse, real effect commit, independent composition targets and original-app routing. Browser proof covers drag preview, Apply then Run, live updated facts, keyboard controls, zoom and phone sizing. Product implementation and release evidence live in `onevar-platform` decision 0082 and its entity-inspector layer guide.
