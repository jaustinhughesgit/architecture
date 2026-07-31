# Sentence, Essence, Path, Command, Menu, and Automation Runtime

**Status:** Implemented foundation; partial formal specification

These components form one interaction runtime. They let natural input become reusable local behavior instead of requiring a model call for every repeated request.

## Processing chain

```text
sentence or voice
  -> token and linguistic analysis
  -> Essence operation(s)
  -> exact or structural signature
  -> Path match
  -> Path transform
  -> ContextDB read/write, command, menu transition, automation, or entity call
  -> response and reusable learning evidence
```

## Terms

- **Sentence:** The user's original utterance. It remains evidence and repair context; it is not the durable executable representation by itself.
- **Essence:** A compact semantic operation over actors, relations, values, properties, modifiers, and questions. It is the bridge between language and ContextDB behavior.
- **Signature:** The reusable match shape computed from an utterance, such as token lemmas/tags or a typed structural pattern with captures.
- **Path:** A tested mapping from a signature or semantic family to an executable transform. Its left side recognizes language; its right side performs a query, mutation, command, or capability invocation.
- **Command:** A named, declarative action and target published into the browser command registry. Commands provide safe entry points to entities, functions, routes, UI actions, or other registered behavior.
- **Menu:** A stateful set of available commands and calls. Menus expose contextual choices and transitions rather than requiring every action to be a globally active phrase.
- **Call:** A menu/state transition that can show, hide, run, go back, close, or expose options through the same command channel.
- **Automation:** A sequenced queue of delays, speech, commands, and related interaction events. It composes registered behavior; it does not replace Paths or the external task scheduler.
- **Sequence:** A composition of saved equations/operations into a reusable multi-step transform.
- **Function:** Executable implementation referenced by entity actions. Functions run within the entity/runtime trust boundary and require validation and policy controls.

## Why the whole chain matters

A correct Essence with a bad signature will not match later wording. A correct signature with a bad Path transform will retrieve or mutate the wrong data. A correct Path that invokes the wrong command or menu state still produces bad behavior. Editing therefore needs the sentence, Essence, ContextDB traverse, matching signatures, Path transforms, command/menu definitions, and relevant entity contract together.

## Builder behavior

- A successful model fallback is evidence, not automatically a safe reusable Path.
- Candidate Paths must be tested in the same local runtime that will execute them.
- Typed captures must preserve distinct inputs such as actor, location, time reference, quantity, and projection.
- Statement Paths and question Paths have different safety rules: mutations require replay/idempotency controls; read-only queries can be tested without changing ContextDB.
- Wording aliases should share a canonical semantic transform when they truly mean the same thing.
- Conflicting canonical transforms must enter explicit repair/versioning rather than silently blocking the user's input or overwriting unrelated behavior.

## Commands, menus, and automations

Entities publish commands into a registry. Menus determine which commands are meaningful in the current state; calls move between states or execute registered behavior. Automations emit into that same interaction channel, allowing a voice/menu experience to compose ordinary entity behavior instead of maintaining a second command system.

## Required formalization

Versioned schemas are still needed for Essence operations, signature types, Path transforms, command targets, menu transitions, automation events, and sequences. The schemas must include permissions, side-effect classification, test fixtures, migration rules, and observable failure stages.

