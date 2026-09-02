# Real-Time Audio and Video Conferencing

**Status:** Clean-room source implementation candidate; legacy POC reference remains available

The current 1var design separates conferencing into three layers:

1. a persistent browser call surface for camera, microphone, video, screen share, and visible lifecycle controls;
2. provider-neutral exact session, invitation, participant-grant, join, leave, and end contracts; and
3. Compute and ArrayLogic composition that may invoke those primitives without implementing media transport itself.

Amazon Chime SDK Meetings is the first reviewed provider adapter in `onevar-platform`. The older repositories contain a Kinesis Video Streams WebRTC master/viewer foundation. That code remains useful POC evidence, but it is not the authority model for the clean platform and is not silently imported.

## Current clean flow

1. An organizer addresses an authorized public profile by name.
2. The API freezes the exact invitee entity ID, creates one provider-neutral `conf_` session and exact `cinv_` invitation, and creates a Chime meeting under a narrow service role.
3. Sync carries only safe invitation/session state.
4. Acceptance creates exact participant authority.
5. Each authenticated participant requests a distinct short-lived attendee token. The token is returned only in that response and is never persisted, synchronized, put in ContextDB, or given to Compute.
6. The persistent browser surface joins both participants to the same media placement and survives app/Sunburst navigation.
7. Leave deletes that participant's provider attendee; organizer-only end deletes the meeting and closes the session.

## Platform fit

- Conferencing is a reusable raw capability beneath support, consultation, class, game, collaboration, and other user-authored apps.
- Compute may create invitations or sequence pre/post-call actions only through reviewed exact operations.
- A name, presence record, Path, app installation, or discovered session ID is not join authority.
- Provider replacement does not replace 1var session identity.

## Required invariants

- Camera and microphone use require browser permission and visible controls.
- Browsers and user-authored apps never receive AWS credentials.
- Attendee tokens are ephemeral and exact-participant scoped.
- Unauthorized users cannot mint join material even if they learn a session ID.
- Recording, transcription, protected media, moderation, retention, dial-in, billing, and multi-party rooms require separate versioned contracts.
- WebRTC transport encryption must not be described as application-level end-to-end encryption.

Source tests prove the initial two-user lifecycle and authorization boundary. Development deployment and real two-browser media acceptance are the next status gates; broad production reliability remains incomplete.
