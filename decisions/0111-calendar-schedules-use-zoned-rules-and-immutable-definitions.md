# Decision 0111: Calendar schedules use zoned rules and immutable definitions

## Decision

A calendar schedule stores its IANA time zone, local wall-clock time, frequency, and the exact weekday or month-day constraint. It does not store an unexplained UTC interval. The scheduler derives each next UTC occurrence from that rule after the prior occurrence, preserving the person's local time across daylight-saving changes. A nonexistent local time is skipped rather than silently moved; a month without the selected day produces no occurrence for that month.

Editing a schedule never mutates the meaning under an existing definition number. The current schedule keeps a bounded ordered definition history; an edit appends a new definition containing the exact name, capability target, and trigger, then advances `definitionVersion`. Operational compare-and-swap `revision` remains separate and may advance when occurrences are claimed or lifecycle state changes. Every occurrence freezes both values.

Pause, resume, and cancel affect lifecycle only. Resume computes the next future occurrence from the current immutable definition. Exact capability, installation, package, program, inputs, permissions, price ceiling, and per-occurrence reauthorization remain unchanged.

This decision covers Phase 5.4's calendar and schedule-edit foundation. ArrayLogic scheduling, downstream result channels, and production load proof remain separate work and must not be inferred from calendar support.
