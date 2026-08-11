# 1var Architecture

This repository is the canonical, living description of how the 1var platform fits together. It exists because the browser application (`aws`), API boundary (`aws-api`), execution layer (`compute`), and headless acceptance client (`testing`) are separate repositories but form one system.

The purpose of this documentation is not to freeze the design. It preserves the big picture while leaving room to discover, document, and implement capabilities that have not yet been discussed.

## Product direction

1var makes data usable the moment it is created and software adaptable the moment a need appears. It is a general interaction and variable platform that lets people and organizations describe, connect, govern, execute, share, and eventually transact around reusable work. See [Product purpose](docs/product-purpose.md) for the user problem, differentiating outcomes, representative scenarios, and the architectural consequences of that direction.

The visible interaction may be as simple as “What is the weather today in New York?”, but the platform beneath it is intended to support reusable provider protocols, enterprise workflows, private knowledge, education, commerce, governance, automation, and other domains without rebuilding a bespoke application for each one.

The architecture should therefore improve the general system when a new scenario exposes a weakness. A weather failure should lead us to repair reusable input binding, provider contracts, entity execution, Paths, diagnostics, or protected-asset handling—not add a weather-only bypass. Domain-specific entities and public templates are expected; domain-specific exceptions inside the platform core are not.

## Documentation sizes

The architecture is available at three levels of detail so the same platform model can be loaded into a conversation, design review, or implementation session without changing its meaning:

- [Small: 1var in fewer than 200 words](docs/onevar-small.md) is the compact memory aid.
- [Medium: 1var in fewer than 2,000 words](docs/onevar-medium.md) preserves the major primitives, flows, trust boundaries, and scaling model.
- **Large:** this README and the canonical documents in the reading order below are the detailed source of truth. The short forms summarize them; they do not replace contracts, status evidence, capability specifications, or decisions.

## Repository map

| Repository | Primary responsibility | Detailed guide |
| --- | --- | --- |
| `aws` | Browser experience, trusted local runtime, Path/Essence processing, ContextDB interaction, `fileWorker` execution, and user-facing controls | `../aws/docs/layer.md` |
| `aws-api` | Browser-facing API boundary and controlled transport to compute | `../aws-api/docs/layer.md` |
| `compute` | Entity/JPL execution, server persistence, capability lifecycle, protected assets, and provider interaction | `../compute/docs/layer.md` |
| `testing` | Command-based cross-layer acceptance, test-device setup, mailbox verification, and guarded test-environment reset | `../testing/docs/layer.md` |
| `architecture` | Cross-layer model, vocabulary, contracts, decisions, and capability status | This repository |

## Reading order

1. [Small overview](docs/onevar-small.md)
2. [Medium overview](docs/onevar-medium.md)
3. [Product purpose](docs/product-purpose.md)
4. [Platform model](docs/platform-model.md)
5. [Engineering principles](docs/engineering-principles.md)
6. [JPL, Shorthand, and ArrayLogic](docs/execution-representations.md)
7. [Intent routing and entity evolution](docs/intent-routing-and-entity-evolution.md)
8. [Cross-layer flows](docs/cross-layer-flows.md)
9. [Headless acceptance testing](docs/headless-acceptance-testing.md)
10. [Security and trust](docs/security-and-trust.md)
11. [Capability catalog](docs/capability-catalog.md)
12. Capability specifications:
   - [Scheduled entity tasks](docs/capabilities/scheduled-tasks.md)
   - [Account, device identity, and protected assets](docs/capabilities/identity-encryption.md)
   - [Sentence, Essence, Path, command, menu, and automation runtime](docs/capabilities/interaction-runtime.md)
   - [File Worker isolation](docs/capabilities/worker-isolation.md)
   - [Sound module](docs/capabilities/sound.md)
   - [Real-time audio and video streaming](docs/capabilities/realtime-streaming.md)
   - [Email platform](docs/capabilities/email-platform.md)
   - [Distributed entities and Context publication](docs/capabilities/distributed-entities.md)
   - [Recipient-specific zero-trust sharing](docs/capabilities/recipient-protected-sharing.md)
13. [Shared contracts](contracts/README.md)
14. [Architecture decisions](decisions/README.md)

## How this stays useful

- Update the product-purpose document when the core problem, differentiating outcomes, or architectural consequences change; do not use product intent as evidence of implementation.
- Update the capability catalog whenever an existing capability is discovered, its maturity changes, or a missing capability is identified.
- Update the platform model when the meaning or relationship of core primitives changes.
- Add an architecture decision record when choosing a durable cross-layer approach.
- Keep executable schemas and protocol contracts in `contracts/` as those boundaries stabilize.
- Keep implementation details in the owning repository. This repository explains connections and invariants rather than duplicating source code.
- When assembling a multi-repository checkout, copy or link `workspace/AGENTS.md` to the workspace root so agent sessions inherit the cross-layer instructions.

## Evidence and status

The documentation distinguishes among:

- **Implemented:** present in the current source and supported by evidence or tests.
- **Partial:** meaningful implementation exists, but the intended capability is incomplete or unreliable.
- **Product intent:** an established direction supplied by the product owner, not a claim of completion.
- **Proposed:** a design option awaiting approval or implementation.
- **Unknown:** insufficient evidence; inspect before depending on it.

These labels let the architecture grow without confusing the intended platform with its current implementation.
