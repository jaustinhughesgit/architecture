# 0033: Provider request inputs are execution dependencies

Status: Accepted

Date: 2026-08-13

## Context

A generated capability could declare an ordinary input as optional while its declarative provider request always referenced that input. The browser therefore had no reason to collect the value, and the provider received an incomplete request. This is a contract mismatch, not a provider- or weather-specific error.

## Decision

- An ordinary input referenced by a provider request parameter is an execution dependency.
- The operation must mark that input required or provide a non-null default before publication.
- Provider research may strengthen an existing optional input to required. It may not silently replace the input type or binding contract.
- A required utterance input must retain a clarification and at least one annotated, learnable utterance example.
- EntityPlan compilation and legacy declarative-action validation both reject unresolved optional provider placeholders.
- The Compute implementation policy advances to version 12 so older incompatible entities fail closed and are rebuilt.

Protected values remain separate Protected Asset requirements; this decision does not permit credentials in ordinary inputs.

## Consequences

The browser asks for a missing provider argument before execution, then replays with the collected value. Optional inputs remain valid for response-only or semantic uses, and provider requests can still use a stable non-null default. The invariant applies equally to weather, payments, search, and other provider protocols.
