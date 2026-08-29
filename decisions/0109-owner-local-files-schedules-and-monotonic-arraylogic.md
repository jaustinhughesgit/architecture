# 0109: Owner-local files, schedules, and monotonic ArrayLogic

**Status:** Accepted

## Context

Protected files must become useful Compute inputs, and protected computations must participate in schedules and compound workflows, without making their plaintext or intermediate values server-readable.

## Decision

The protected worker owns exact file selection, decryption, bounded text-to-PDF transformation, result encryption, and local presentation. The server and model receive no filename, bytes, plaintext, ciphertext, or content key.

ArrayLogic may transition from an ordinary prefix to an owner-local protected suffix exactly once. Ordinary typed results may enter the protected suffix; protected outputs may not return to an ordinary or trusted-server step. Durable workflow state receives only a value-free receipt.

Owner-local scheduled operations store safe immutable identity server-side. A due occurrence waits for an authorized owner browser, which executes locally and commits an exact value-free receipt. Absence of an owner device causes deferral, not silent trusted-server promotion.

Natural recipient names are resolved through authorized ordinary Context and frozen to exact recipient entity IDs. Zero-knowledge recovery envelopes may recover exact group rosters and encrypted file chunks across devices.

## Consequences

This enables protected PDFs, protected schedules, and useful mixed workflows while preserving zero trust. It intentionally excludes protected-to-ordinary data release and autonomous owner-local execution while every authorized owner device is offline.

## Verification

Contract, compiler, browser-worker, recovery, workflow, and API tests prove exact identity, monotonic trust, encrypted local file output, server refusal to execute owner-local work, and value-free schedule completion.

