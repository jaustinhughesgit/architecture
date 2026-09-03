# Real-Time Audio and Video Conferencing

**Status:** Implemented and live-proven in development; legacy POC reference remains available

The current 1var design separates conferencing into three layers:

1. a persistent browser call surface for camera, microphone, video, screen share, and visible lifecycle controls;
2. provider-neutral exact session, invitation, participant-grant, join, leave, and end contracts; and
3. Compute and ArrayLogic composition that may invoke those primitives without implementing media transport itself.

Amazon Chime SDK Meetings is the first reviewed provider adapter in `onevar-platform`. The older repositories contain a Kinesis Video Streams WebRTC master/viewer foundation. That code remains useful POC evidence, but it is not the authority model for the clean platform and is not silently imported.

## Current clean flow

1. An organizer addresses an authorized public profile by name.
2. The API freezes the exact invitee entity ID, creates one provider-neutral `conf_` session and exact `cinv_` invitation, and creates a Chime meeting under a narrow service role.
3. Sync carries only safe invitation/session state. A newly observed pending invitation is rendered once and enters the ordinary incoming-event audio queue when that device's audio policy is on; replayed sync state is deduplicated by exact invitation ID.
4. Acceptance creates exact participant authority.
5. Each authenticated participant requests a distinct short-lived attendee token. Issuing it records `authorized`, not presence. The token is returned only in that response and is never persisted, synchronized, put in ContextDB, or given to Compute.
6. Only after the browser media session starts does an exact acknowledgment advance that participant to `joined`. The server stores value-free liveness—not media, device details, or provider credentials—and the call surface may read it on a bounded in-call cadence when WebRTC callbacks are unavailable.
7. The persistent browser surface joins both participants to the same media placement and survives app/Sunburst navigation.
8. Leave deletes that participant's provider attendee; organizer-only end deletes the meeting and closes the session.
9. Leave, organizer end, remote end, failure, and page teardown converge on one idempotent browser cleanup. It stops bound tracks and explicitly awaits the selected camera and microphone inputs before the browser reports completion. Cleanup repeats after an in-flight device-selection promise settles so a late permission result cannot reacquire media.

## Platform fit

- Conferencing is a reusable raw capability beneath support, consultation, class, game, collaboration, and other user-authored apps.
- Compute may create invitations or sequence pre/post-call actions only through reviewed exact operations.
- The spoken invitation announcement obeys the ordinary device audio policy; active call audio remains under the conference surface's dedicated mute and device controls.
- A name, presence record, Path, app installation, or discovered session ID is not join authority.
- Presence is evidence that an already-authorized participant started its media session; it never grants authority.
- Provider replacement does not replace 1var session identity.

## Required invariants

- Camera and microphone use require browser permission and visible controls.
- Stopping the provider session is not device cleanup. Every terminal browser path must release selected video/audio inputs, bound streams, observers, and media elements before it discards ephemeral join material.
- Browsers and user-authored apps never receive AWS credentials.
- Attendee tokens are ephemeral and exact-participant scoped.
- Unauthorized users cannot mint join material even if they learn a session ID.
- Recording, transcription, protected media, moderation, retention, dial-in, billing, and multi-party rooms require separate versioned contracts.
- WebRTC transport encryption must not be described as application-level end-to-end encryption.

Source tests prove the initial two-user lifecycle and authorization boundary. Development release `47e0d4f40767119b7561e5c575515b9589cb9754` and workflow [33596790583](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33596790583) live-prove two exact browsers joining one Chime meeting, remote-presence projection, third-user denial, call-surface persistence across a UI projection change, and organizer termination. A later browser proof additionally requires every captured organizer and invitee track to reach `ended` after termination; hiding the dock alone is not success. Broad production reliability remains incomplete.
