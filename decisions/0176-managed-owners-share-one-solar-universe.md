# 0176 — Managed owners share one solar universe

Status: Implemented bounded slice; verified locally and live; deployed to development including the drag repair. Final hosted regression verification in progress.

Correct the presentation in decision 0175: promoted entities are additional owner
solar systems in the same mounted Inspector universe. Entering does not replace
the universe, change the authenticated actor or merge ownership. Personal/public
neighbors remain collapsed in the same scene; camera, remembered positions and
solar collapse/supernova motion remain shared. Wormhole entry/return borders are
literal repeated `~` marks; the opened owner's solar boundary looks normal.

The scoped private Context controller supplies ordinary data and manager controls
to the existing renderer. A separate exact-owner render namespace preserves source
identity without pretending private data came from public discovery. Bounded
admission and current authority precede layout; revocation removes private points
including departing animations. Only one managed interior is retained, memory-only
and periodically revalidated. The personal composer/microphone are suppressed while
the managed data composer is active. Existing protected keys/permissions, scoped
publication and actor evidence do not change.

This is not managed marketplace purchasing, protected execution or a new permission
model. Those limitations in decision 0175 remain. No reset or production deployment.
See `onevar-platform/docs/decisions/0118-managed-systems-share-the-inspector-universe.md`
for source and release evidence.

Runtime `f3aa9ade2d174abac9a619f167dd7f325667331a` passed 1,044 core checks,
84 local browser scenarios, a final three-scenario rebuild and two live scenarios
without retries. Development deployment 34935773128 succeeded; health and website
entry were verified. Live coverage includes one persistent Inspector, literal tilde
borders, private quick links, delayed navigation, scoped data isolation, revocation
and three-account protected custody. Hosted CI 34935407066 passed core checks and
82 browser scenarios but failed two spatial app-drag variants: cancelling an
unfinished settle at grab time moved the drop target away from its painted
position. A follow-up freezes painted owner-local positions during the grab;
both drag variants, 343 web tests, typechecks and existing bundle budgets pass.
Full-suite and follow-up release verification remain in progress; the original
failed CI is retained as evidence.

Follow-up `0e8da8e891b720cb7bcfaedc2e7b2213fd028382` deployed successfully
(34944114989) and passed both fresh-account live checks without retries (58.4s).
The later local full rerun was stopped after 18 timing/focus failures (31 passed,
one interrupted, 11 skipped, 41 not run); it is not claimed as a clean suite.
Hosted CI 34944116413 passed core verification and finished with 82 browser passes,
18 skips, one flaky drag check and one failed Convert/install scenario. The latter
correctly rejected several public wash fixtures as ambiguous. Follow-up tests use
the existing exact-invocation contract to isolate that release and sample drag
positions in the pointerdown capture phase. Production ambiguity/authority guards
are unchanged; the next hosted regression remains pending.

Final local test isolation passes both drag variants and the cross-browser
author/install scenario, including the exact published capability identity (1.9m,
no retries). The two-account scenario has a 120-second total budget while individual
assertion/response bounds stay unchanged. Only tests/docs changed; the deployed
runtime remains the live-verified `0e8da8e`. The test-only push reruns hosted CI.
