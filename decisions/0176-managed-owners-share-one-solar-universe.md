# 0176 — Managed owners share one solar universe

Status: Implemented bounded slice; verified locally and live; deployed to development. CI drag repair locally verified; follow-up release in progress.

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
