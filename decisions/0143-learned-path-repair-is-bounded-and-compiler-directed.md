# 0143 — Learned Path repair is bounded and compiler-directed

Status: accepted; implemented and live-proven in development.

## Context

The first clean-room acceptance corpus proved its thirty known constructions but did not prove natural-language generalization. Independent user inputs exposed two systemic failures: compiler v1 treated a finite word list as complete English grammar, and one rejected model proposal surfaced a local diagnostic instead of being repaired before responding.

## Decision

Compiler v1 remains immutable for existing content addresses. Compiler v2 accepts normalized lowercase structural words within strict length and character bounds. Digits, identifiers, URLs, paths, punctuation-bearing values and later uncovered capitalized words cannot enter that channel. Names, entity references, explicit properties, values and relation targets remain grounded captures. Required roles, operator evidence, negation, complete matching and isolated effect proof remain authoritative. For a two-endpoint relation, the compiler rejects an endpoint bridge or leading action verb captured instead of a separately introduced link label, and rejects a label introducer absorbed into its following label; meaningful spatial relation phrases remain valid.

One ordinary cold miss may make at most three sequential structured advisory requests. After local rejection, the next request receives only an attempt number and one coarse category such as capture, grounding, speech act or operator evidence. Detailed local errors, graph state and prior provider content never cross that boundary. Each attempt has independent transient idempotency while all actual usage meters join the original pricing root.

The browser renders no intermediate compiler or provider diagnostics. Only a successfully compiled and isolated-proven interpretation can atomically activate and commit. Exhaustion produces one safe clarification with no mutation.

## Consequences

Natural structural wording is no longer limited by a hand-authored grammar vocabulary, and declarative clefts can contain question words without being misclassified. Rejected first attempts can add bounded latency and model cost. This still supports only the twelve typed fact operations; temporal reasoning, external actions, multiple effects and genuine ambiguity remain separate capability work.

The archive stores the exact capture-free syntax shell, not the full utterance or captured operands. It remains content-addressed, hash-verified, offer-only and authority-free.

## Verification

The independent failure phrases and held-out value variants must pass compiler, matching and graph-effect proof. A browser fault-injection test must reject attempt one, send only the coarse category on attempt two, display one successful result and expose no intermediate diagnostic. A real-model evaluation must also treat a semantically empty but structurally valid relation label as repairable rather than accepting it. Live model evaluation is reported separately and must never be replaced by oracle proposals.

Development release `a992f66c2907ba011e8302c52b90063a127bbd42` passed all ten cold real-model generations and all ten held-out local replays in workflow [33946643764](https://github.com/jaustinhughesgit/onevar-platform/actions/runs/33946643764). Eight cold inputs were independently reported failures; two were post-corpus expansions. Two earlier 9/10 runs were retained as failures during correction rather than reclassified as passes.
