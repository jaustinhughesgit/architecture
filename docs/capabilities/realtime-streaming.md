# Real-Time Audio and Video Streaming

**Status:** Implemented foundation

The streaming capability lets users launch real-time audio/video interactions through 1var entities and browser commands. It combines browser media capture with compute-managed presence, invitations, scoped credentials, and Amazon Kinesis Video Streams WebRTC signaling.

## Current flow

1. A user becomes present through the streaming service.
2. Another participant or entity creates an invitation.
3. The browser requests microphone/camera access with `getUserMedia`.
4. Compute returns short-lived, scoped AWS credentials and channel information.
5. Browsers connect as WebRTC master/viewer peers and exchange media.
6. Presence, heartbeat, invitation, and live state are maintained separately from media packets.

## Platform fit

- An entity can represent a room, event, support session, class, consultation, or other governed interaction.
- Parent/child lineage can assemble organizational policy, participant experience, and room-specific behavior.
- Commands and menus can expose join, accept, mute, camera, leave, and related actions.
- Public/private and authenticator rules govern discovery and participation.
- Sound is the device/audio primitive; streaming is the multi-party real-time transport and session lifecycle.

## Required invariants

- Camera and microphone use requires clear browser consent and visible live-state controls.
- AWS credentials must be short-lived and limited to the exact channel actions required.
- Presence is not authorization; joining and publishing require separate checks.
- Session identity, invitations, revocation, recording, retention, moderation, and audit need versioned contracts.
- Media encryption claims must distinguish WebRTC transport encryption from application-level end-to-end encryption.

Current implementation establishes the foundation, but comprehensive authorization, moderation, recording policy, recovery, observability, and end-to-end encryption options remain incomplete.

