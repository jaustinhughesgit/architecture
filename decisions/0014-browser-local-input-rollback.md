# 0014: Browser-local input rollback uses exact coordinated checkpoints

**Status:** Accepted  
**Date:** 2026-08-09

## Context

Cold database resets make iterative Path and ContextDB testing expensive. A single message can change several browser-owned stores: graph and ContextDB state, transcription history, local translations and word mappings, and the learned Path library. Corrections and historical replay can also remove or rewire prior relationships, so an “undo” based only on rows added by the latest result is incomplete.

## Decision

Before an ordinary Message input executes, the browser records its pre-input state in both state owners. The transcription worker checkpoints graph/ContextDB, history, translations, word map, and effective context. Path Builder checkpoints the identity-scoped equation library and its confirmed-foundation membership view. Message input is serialized until completion. Back restores both checkpoints and reports success only after both owners acknowledge restoration.

The stack is browser-session-local, identity-scoped, exact, and bounded to 20 completed inputs. Restored Paths are republished to the worker immediately. Identity-scoped server Path creation/deletion is reconciled asynchronously after local restoration.

Back reverses input-derived browser semantic state. It does not compensate an external command or provider effect, reverse protected-asset use, remove request-cost accounting, or delete a retained shared foundation record.

## Alternatives

- Invert the latest graph delta. Rejected because a delta of added rows cannot reconstruct deleted or rewired prior state.
- Reset the complete test environment. Retained as a hard-reset tool, but too broad and slow for iterative testing.
- Store checkpoints on the server. Rejected for the initial capability because browser plaintext and zero-trust state must remain local.

## Consequences

- Users can repeatedly return to a known local test point without recreating an account or foundation.
- The browser uses bounded memory for up to 20 checkpoints.
- A page reload clears the rollback stack; durable cross-session history is a separate capability.
- Server Path reconciliation can briefly lag behind the locally restored library and must remain observable/retryable.

## Affected repositories

- `aws`: implementation and local verification.
- `architecture`: canonical lifecycle and capability documentation.

## Security impact

Checkpoint contents remain in the browser worker/main-page trust boundaries and use the active identity's existing encrypted persistence when restored. A checkpoint never authorizes server or model access to protected plaintext.

## Migration

No stored-data migration is required. Asset revisioning loads the coordinated Message, Transcribe, Path Builder, and worker implementation together.

## Verification

- Restore graph and ContextDB exactly after statements, questions, corrections, and learned Paths.
- Restore transcription history, translations, and word map with the same checkpoint.
- Remove Paths introduced by the undone input and restore Paths modified by it.
- Repeated Back walks backward through completed inputs and stops safely when empty.
- Identity changes clear all checkpoints.
