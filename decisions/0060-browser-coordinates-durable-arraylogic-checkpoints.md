# 0060: Browser coordinates durable ArrayLogic checkpoints

**Status:** Accepted for Phase 3; clean-platform foundation implemented

## Context

ArrayLogic is sequential composition, not parallel execution. A server-only or in-memory loop cannot atomically combine remote Compute results with browser-local ordinary Context effects. Reloads, lost responses, retries, and cancellation would otherwise risk duplicated work or success without committed data.

## Decision

An installed ArrayLogic release maps every exact step to one exact local capability installation. The browser worker durably records workflow/version, interaction, next step, invocation ID, attempt, completed result, effect receipts, failure evidence, outputs, cancellation state, and timestamps.

The main thread sends only the current saved invocation to the API. The worker checks exact result identity, validates and applies declared effects, and commits the Context plus workflow checkpoint in one IndexedDB transaction. Retry reuses the invocation ID. Cancellation uses `stop_before_next_step`; an already-running step may finish and commit. Compensation is an explicit policy and v1 supports only `none`.

References may use workflow inputs, literals, or typed outputs from strictly earlier steps. Cycles, forward references, type mismatches, undeclared fields, and installation identity mismatches fail before installation.

## Consequences

- A reload can resume a pending workflow without rediscovery or regenerated logic.
- Each step has independent effect evidence and publication can follow each committed local mutation.
- Rich visual authoring and explicit compensation workflows remain open; the command OS accepts the canonical JSON contract now.
