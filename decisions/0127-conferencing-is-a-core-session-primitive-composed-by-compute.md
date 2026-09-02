# 0127 — Conferencing is a core session primitive composed by Compute

## Status

Accepted — development implementation candidate

## Decision

1var will not choose between “video as an app” and “video as a universal UI feature.” It will use a layered boundary: one persistent browser call surface, one provider-neutral conference-session capability, and user-authored Compute/ArrayLogic composition above it.

The first clean provider adapter is Amazon Chime SDK Meetings. Exact 1var session, invitation, and participant-grant IDs remain authoritative when a provider changes. The API may create/delete meetings and attendees under a narrow service role. It stores safe internal meeting placement, but returns each attendee token only to its exact authenticated participant and never persists, logs, synchronizes, or packages that token. Browsers and user-authored Compute receive no AWS credentials.

An authorized public profile label may nominate an invitee, but the API must resolve and freeze one exact entity ID before creating the invitation. Acceptance creates participant authority. A session ID, presence record, app focus, Path, or name cannot substitute for that authority. Only the organizer may terminate the complete session.

The browser call component remains mounted while app and Sunburst projections change. Compute entities may later schedule a consultation, invite a participant, charge for a service, or run post-call work by invoking reviewed conference operations; they do not regenerate signaling, credential, or media logic.

## Consequences

- The older Kinesis Video Streams master/viewer implementation remains POC reference rather than the clean runtime.
- The initial release is deliberately one organizer plus one invitee.
- Recording, transcription, captions, protected-media semantics, moderation, PSTN, pricing, multi-party rooms, and provider failover remain explicit later capabilities.
- Source conformance is not deployment or production proof; the capability catalog must advance status only after those gates pass.
